from fastapi import FastAPI, APIRouter, HTTPException, Header, UploadFile, File
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
import logging
import re
import shutil
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOADS_DIR = ROOT_DIR / 'uploads' / 'products'
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'cambiaresta123')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tlsCAFile=certifi.where())
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


def check_admin(x_admin_password: Optional[str] = Header(default=None)):
    if x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = (
        text.replace("á", "a").replace("é", "e").replace("í", "i")
        .replace("ó", "o").replace("ú", "u").replace("ñ", "n")
    )
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or str(uuid.uuid4())[:8]


class ProductColor(BaseModel):
    name: str
    hex: str = "#211e1c"
    images: List[str] = Field(default_factory=list)


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    category: str
    price: float
    image: str
    description: Optional[str] = None
    colors: List[ProductColor] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    description: Optional[str] = None
    colors: List[ProductColor] = Field(default_factory=list)


class Coupon(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    code: str
    percent: float
    active: bool = False
    categories: List[str] = Field(default_factory=list)  # vacío = aplica a toda la tienda
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CouponCreate(BaseModel):
    code: str
    percent: float
    active: bool = False
    categories: List[str] = Field(default_factory=list)


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/admin/verify")
async def verify_admin(x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)
    return {"ok": True}


@api_router.get("/products", response_model=List[Product])
async def list_products():
    products = await db.products.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return products


@api_router.post("/products", response_model=Product)
async def create_product(payload: ProductCreate, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)

    base_slug = slugify(payload.name)
    slug = base_slug
    suffix = 2
    while await db.products.find_one({"id": slug}, {"_id": 0}):
        slug = f"{base_slug}-{suffix}"
        suffix += 1

    first_image = (
        payload.colors[0].images[0]
        if payload.colors and payload.colors[0].images
        else ""
    )

    product = Product(
        id=slug,
        name=payload.name.strip(),
        category=payload.category,
        price=payload.price,
        image=first_image,
        description=payload.description,
        colors=payload.colors,
    )

    doc = product.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.products.insert_one(doc)
    return product


@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, payload: ProductCreate, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)

    existing = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    first_image = (
        payload.colors[0].images[0]
        if payload.colors and payload.colors[0].images
        else ""
    )

    update_fields = {
        "name": payload.name.strip(),
        "category": payload.category,
        "price": payload.price,
        "image": first_image,
        "description": payload.description,
        "colors": [c.model_dump() for c in payload.colors],
    }

    await db.products.update_one({"id": product_id}, {"$set": update_fields})
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return updated


@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"ok": True}


@api_router.get("/coupons/active")
async def get_active_coupon():
    """Endpoint público: devuelve el cupón activo (si hay uno) para mostrarlo en el carrito."""
    coupon = await db.coupons.find_one({"active": True}, {"_id": 0})
    if not coupon:
        return None
    return coupon


@api_router.get("/coupons", response_model=List[Coupon])
async def list_coupons(x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)
    coupons = await db.coupons.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return coupons


@api_router.post("/coupons", response_model=Coupon)
async def create_coupon(payload: CouponCreate, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)

    code = payload.code.strip().upper()
    if not code:
        raise HTTPException(status_code=400, detail="El código no puede estar vacío")
    if await db.coupons.find_one({"code": code}, {"_id": 0}):
        raise HTTPException(status_code=400, detail="Ya existe un cupón con ese código")

    if payload.active:
        await db.coupons.update_many({}, {"$set": {"active": False}})

    coupon = Coupon(code=code, percent=payload.percent, active=payload.active, categories=payload.categories)
    doc = coupon.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.coupons.insert_one(doc)
    return coupon


@api_router.put("/coupons/{coupon_id}", response_model=Coupon)
async def update_coupon(coupon_id: str, payload: CouponCreate, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)

    existing = await db.coupons.find_one({"id": coupon_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Cupón no encontrado")

    code = payload.code.strip().upper()
    duplicate = await db.coupons.find_one({"code": code, "id": {"$ne": coupon_id}}, {"_id": 0})
    if duplicate:
        raise HTTPException(status_code=400, detail="Ya existe un cupón con ese código")

    if payload.active:
        await db.coupons.update_many({"id": {"$ne": coupon_id}}, {"$set": {"active": False}})

    update_fields = {
        "code": code,
        "percent": payload.percent,
        "active": payload.active,
        "categories": payload.categories,
    }
    await db.coupons.update_one({"id": coupon_id}, {"$set": update_fields})
    updated = await db.coupons.find_one({"id": coupon_id}, {"_id": 0})
    return updated


@api_router.delete("/coupons/{coupon_id}")
async def delete_coupon(coupon_id: str, x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)
    result = await db.coupons.delete_one({"id": coupon_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cupón no encontrado")
    return {"ok": True}


@api_router.post("/upload")
async def upload_image(file: UploadFile = File(...), x_admin_password: Optional[str] = Header(default=None)):
    check_admin(x_admin_password)

    ext = Path(file.filename or "").suffix.lower() or ".png"
    if ext not in (".png", ".jpg", ".jpeg", ".webp", ".gif"):
        raise HTTPException(status_code=400, detail="Formato de imagen no soportado")

    filename = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOADS_DIR / filename
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/api/uploads/products/{filename}"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)
app.mount("/api/uploads", StaticFiles(directory=str(ROOT_DIR / "uploads")), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
