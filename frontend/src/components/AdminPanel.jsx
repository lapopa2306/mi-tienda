import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import {
  Plus,
  Trash2,
  ImagePlus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Pencil,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const uid = () =>
  window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

const emptyColor = () => ({ name: "", hex: "#211e1c", images: [] });

function getPassword() {
  return sessionStorage.getItem("admin_pass") || "";
}

function PasswordGate({ onOk }) {
  const [pass, setPass] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError(false);
    try {
      await axios.post(
        `${API}/admin/verify`,
        {},
        { headers: { "X-Admin-Password": pass } },
      );
      sessionStorage.setItem("admin_pass", pass);
      onOk();
    } catch {
      setError(true);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper text-ink px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 border border-ink/15 rounded-2xl p-8"
      >
        <h1 className="text-xl font-semibold">Panel de productos</h1>
        <p className="text-sm text-ink/60">Ingresá la contraseña para continuar.</p>
        <Input
          type="password"
          autoFocus
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError(false);
          }}
          placeholder="Contraseña"
        />
        {error && <p className="text-sm text-red-500">Contraseña incorrecta.</p>}
        <Button type="submit" className="w-full" disabled={checking}>
          {checking ? "Verificando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(() => !!getPassword());

  if (!unlocked) return <PasswordGate onOk={() => setUnlocked(true)} />;
  return <ProductForm onAuthFail={() => setUnlocked(false)} />;
}

function CouponsSection({ authHeaders, onAuthFail }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [categories, setCategories] = useState([]); // [] = toda la tienda
  const [expiresAt, setExpiresAt] = useState(""); // valor crudo del input datetime-local
  const [minAmount, setMinAmount] = useState(""); // opcional — compra mínima para que aplique
  const [saving, setSaving] = useState(false);

  const toggleCategory = (cat) =>
    setCategories((cs) =>
      cs.includes(cat) ? cs.filter((c) => c !== cat) : [...cs, cat],
    );

  const handleAuthError = (err) => {
    if (err?.response?.status === 401) {
      toast.error("La contraseña ya no es válida, ingresá de nuevo");
      sessionStorage.removeItem("admin_pass");
      onAuthFail();
      return true;
    }
    return false;
  };

  const loadCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/coupons`, { headers: authHeaders });
      setCoupons(data);
    } catch (err) {
      if (!handleAuthError(err)) toast.error("No se pudieron cargar los cupones");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const createCoupon = async () => {
    if (!code.trim()) return toast.error("Poné un código para el cupón");
    if (!percent || Number(percent) <= 0 || Number(percent) > 90)
      return toast.error("Poné un porcentaje válido (1 a 90)");
    if (expiresAt && new Date(expiresAt) <= new Date())
      return toast.error("La fecha de fin tiene que ser en el futuro");
    if (minAmount && Number(minAmount) <= 0)
      return toast.error("La compra mínima tiene que ser mayor a 0");

    setSaving(true);
    try {
      await axios.post(
        `${API}/coupons`,
        {
          code: code.trim(),
          percent: Number(percent),
          active: coupons.length === 0,
          categories,
          expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
          min_amount: minAmount ? Number(minAmount) : null,
        },
        { headers: authHeaders },
      );
      toast.success("Cupón creado");
      setCode("");
      setPercent("");
      setCategories([]);
      setExpiresAt("");
      setMinAmount("");
      loadCoupons();
    } catch (err) {
      if (!handleAuthError(err))
        toast.error(err?.response?.data?.detail || "No se pudo crear el cupón");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (coupon) => {
    try {
      await axios.put(
        `${API}/coupons/${coupon.id}`,
        {
          code: coupon.code,
          percent: coupon.percent,
          active: !coupon.active,
          categories: coupon.categories || [],
          expires_at: coupon.expires_at || null,
          min_amount: coupon.min_amount || null,
        },
        { headers: authHeaders },
      );
      loadCoupons();
    } catch (err) {
      if (!handleAuthError(err)) toast.error("No se pudo actualizar el cupón");
    }
  };

  const removeCoupon = async (id) => {
    if (!window.confirm("¿Eliminar este cupón?")) return;
    try {
      await axios.delete(`${API}/coupons/${id}`, { headers: authHeaders });
      toast.success("Cupón eliminado");
      setCoupons((cs) => cs.filter((c) => c.id !== id));
    } catch (err) {
      if (!handleAuthError(err)) toast.error("No se pudo eliminar el cupón");
    }
  };

  return (
    <div className="border border-ink/15 rounded-2xl p-6 space-y-5">
      <div>
        <h2 className="font-medium flex items-center gap-2">
          <Tag className="h-4 w-4" /> Cupones de descuento
        </h2>
        <p className="text-sm text-ink/60 mt-1">
          Solo puede haber un cupón activo a la vez. El activo se muestra automáticamente
          en el carrito de la página y se aplica al total — no hace falta que el cliente
          escriba ningún código.
        </p>
      </div>

      <div className="grid sm:grid-cols-[1fr_140px_auto] gap-3 items-end">
        <div className="space-y-1.5">
          <label className="text-xs text-ink/60">Código</label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej: VERANO10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-ink/60">% off</label>
          <Input
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="Ej: 10"
          />
        </div>
        <Button type="button" onClick={createCoupon} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-ink/60">
          ¿Dónde aplica? Dejá todo sin marcar para que valga en toda la tienda.
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const on = categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ink/60 hover:border-ink/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-ink/60">
            Fecha y hora de fin (opcional — si la dejás vacía, no vence solo)
          </label>
          <Input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-ink/60">
            Compra mínima (opcional — si la dejás vacía, aplica sin importar el monto)
          </label>
          <Input
            type="number"
            min="0"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Ej: 20000"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Cargando...</p>
      ) : coupons.length === 0 ? (
        <p className="text-sm text-ink/50">Todavía no creaste ningún cupón.</p>
      ) : (
        <ul className="divide-y divide-ink/10">
          {coupons.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {c.code} <span className="text-ink/50 font-normal">— {c.percent}% off</span>
                </p>
                <p className="text-xs text-ink/50">
                  {c.active ? "Activo — visible en el carrito ahora" : "Inactivo"}
                  {" · "}
                  {c.categories && c.categories.length
                    ? `Solo en: ${c.categories.join(", ")}`
                    : "Toda la tienda"}
                  {" · "}
                  {c.expires_at
                    ? `Termina: ${new Date(c.expires_at).toLocaleString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Sin fecha límite"}
                  {c.min_amount ? ` · Mínimo: $${Number(c.min_amount).toLocaleString("es-AR")}` : ""}
                </p>
              </div>
              <Switch checked={c.active} onCheckedChange={() => toggleActive(c)} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCoupon(c.id)}
                aria-label="Eliminar cupón"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductForm({ onAuthFail }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([emptyColor()]);
  const [isNew, setIsNew] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const authHeaders = { "X-Admin-Password": getPassword() };

  const loadProducts = useCallback(async () => {
    setLoadingList(true);
    try {
      const { data } = await axios.get(`${API}/products`);
      setProducts(data);
    } catch {
      toast.error("No se pudo cargar la lista de productos");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateColor = (idx, patch) =>
    setColors((cs) => cs.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  const addColor = () => setColors((cs) => [...cs, emptyColor()]);
  const removeColor = (idx) =>
    setColors((cs) => (cs.length > 1 ? cs.filter((_, i) => i !== idx) : cs));

  // Agrega fotos nuevas a las que ya tenía ese color (no las reemplaza)
  const handleFiles = (idx, fileList) => {
    const newItems = Array.from(fileList || []).map((file) => ({
      id: uid(),
      kind: "new",
      file,
    }));
    if (newItems.length === 0) return;
    setColors((cs) =>
      cs.map((c, i) => (i === idx ? { ...c, images: [...c.images, ...newItems] } : c)),
    );
  };

  const moveImage = (colorIdx, imgIdx, dir) => {
    setColors((cs) =>
      cs.map((c, i) => {
        if (i !== colorIdx) return c;
        const target = imgIdx + dir;
        if (target < 0 || target >= c.images.length) return c;
        const images = [...c.images];
        [images[imgIdx], images[target]] = [images[target], images[imgIdx]];
        return { ...c, images };
      }),
    );
  };

  const removeImage = (colorIdx, imgIdx) => {
    setColors((cs) =>
      cs.map((c, i) =>
        i === colorIdx
          ? { ...c, images: c.images.filter((_, fi) => fi !== imgIdx) }
          : c,
      ),
    );
  };

  const reset = () => {
    setEditingId(null);
    setName("");
    setCategory(CATEGORIES[0]);
    setPrice("");
    setDescription("");
    setColors([emptyColor()]);
    setIsNew(false);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setName(p.name || "");
    setCategory(p.category || CATEGORIES[0]);
    setPrice(p.price != null ? String(p.price) : "");
    setDescription(p.description || "");
    setIsNew(!!p.is_new);
    setColors(
      p.colors && p.colors.length
        ? p.colors.map((c) => ({
            name: c.name || "",
            hex: c.hex || "#211e1c",
            images: (c.images || []).map((url) => ({
              id: uid(),
              kind: "existing",
              url,
            })),
          }))
        : [emptyColor()],
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthError = (err) => {
    if (err?.response?.status === 401) {
      toast.error("La contraseña ya no es válida, ingresá de nuevo");
      sessionStorage.removeItem("admin_pass");
      onAuthFail();
      return true;
    }
    return false;
  };

  const save = async () => {
    if (!name.trim()) return toast.error("Poné un nombre para el producto");
    if (!price || Number(price) <= 0) return toast.error("Poné un precio válido");
    if (colors.some((c) => !c.name.trim()))
      return toast.error("Cada color necesita un nombre");
    if (colors.every((c) => c.images.length === 0))
      return toast.error("Subí al menos una foto");

    const normalized = name.trim().toLowerCase();
    const isDuplicate = [...products, ...PRODUCTS].some(
      (p) => p.id !== editingId && p.name.trim().toLowerCase() === normalized,
    );
    if (isDuplicate) {
      const confirmed = window.confirm(
        `Ya existe un producto con este nombre ("${name.trim()}"). ¿Querés publicarlo igual?`,
      );
      if (!confirmed) return;
    }

    setPublishing(true);
    try {
      // 1. Subimos las fotos nuevas y respetamos las que ya estaban
      const colorsPayload = [];
      for (const c of colors) {
        const urls = [];
        for (const item of c.images) {
          if (item.kind === "existing") {
            urls.push(item.url);
            continue;
          }
          const form = new FormData();
          form.append("file", item.file);
          const { data } = await axios.post(`${API}/upload`, form, {
            headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
          });
          urls.push(`${BACKEND_URL}${data.url}`);
        }
        colorsPayload.push({ name: c.name.trim(), hex: c.hex, images: urls });
      }

      const payload = {
        name: name.trim(),
        category,
        price: Number(price),
        description: description.trim() || null,
        colors: colorsPayload,
        is_new: isNew,
      };

      // 2. Creamos o actualizamos el producto según corresponda
      if (editingId) {
        await axios.put(`${API}/products/${editingId}`, payload, {
          headers: authHeaders,
        });
        toast.success("Producto actualizado.");
      } else {
        await axios.post(`${API}/products`, payload, { headers: authHeaders });
        toast.success("Producto publicado. Ya está visible en la página.");
      }

      reset();
      loadProducts();
    } catch (err) {
      if (!handleAuthError(err))
        toast.error(
          editingId ? "No se pudo actualizar el producto" : "No se pudo publicar el producto",
        );
    } finally {
      setPublishing(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("¿Eliminar este producto de la página?")) return;
    try {
      await axios.delete(`${API}/products/${id}`, { headers: authHeaders });
      toast.success("Producto eliminado");
      setProducts((ps) => ps.filter((p) => p.id !== id));
      if (editingId === id) reset();
    } catch (err) {
      if (!handleAuthError(err)) toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">
            {editingId ? "Editar producto" : "Cargar producto nuevo"}
          </h1>
          <p className="text-sm text-ink/60 mt-1">
            {editingId
              ? "Modificá los datos o las fotos y tocá \"Guardar cambios\"."
              : "Completá los datos y las fotos, tocá \"Publicar\" y el producto aparece en la página al instante. No hace falta tocar ningún código."}
          </p>
        </div>

        <div className="space-y-5 border border-ink/15 rounded-2xl p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nombre</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Billetera Chica Trendy"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Precio</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej: 17000"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Categoría</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Descripción <span className="text-ink/40">(opcional)</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Mide 18x33, fabricada en cordura."
              rows={2}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3">
            <div>
              <label className="text-sm font-medium">Nuevo ingreso</label>
              <p className="text-xs text-ink/50">
                Lo muestra en la sección "Nuevos ingresos" antes del catálogo.
              </p>
            </div>
            <Switch checked={isNew} onCheckedChange={setIsNew} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Colores / variantes</label>
              <Button type="button" size="sm" variant="outline" onClick={addColor}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Agregar color
              </Button>
            </div>

            {colors.map((c, idx) => (
              <div
                key={idx}
                className="border border-ink/10 rounded-xl p-4 space-y-3 bg-ink/[0.02]"
              >
                <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
                  <div className="space-y-1.5">
                    <label className="text-xs text-ink/60">Nombre del color</label>
                    <Input
                      value={c.name}
                      onChange={(e) => updateColor(idx, { name: e.target.value })}
                      placeholder="Ej: Negro"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-ink/60">Hex</label>
                    <input
                      type="color"
                      value={c.hex}
                      onChange={(e) => updateColor(idx, { hex: e.target.value })}
                      className="h-9 w-14 rounded-md border border-input cursor-pointer"
                    />
                  </div>
                  {colors.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColor(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-ink/60">
                    Fotos de este color (podés elegir varias)
                  </label>
                  <label className="flex items-center gap-2 border border-dashed border-ink/25 rounded-lg px-3 py-2 cursor-pointer text-sm text-ink/60 hover:border-ink/40 transition-colors">
                    <ImagePlus className="h-4 w-4" />
                    {c.images.length
                      ? `${c.images.length} foto(s) — tocá para agregar más`
                      : "Elegir fotos"}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        handleFiles(idx, e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {c.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap pt-1">
                      {c.images.map((img, i) => (
                        <div key={img.id} className="relative group/thumb">
                          <img
                            src={
                              img.kind === "existing"
                                ? img.url
                                : URL.createObjectURL(img.file)
                            }
                            alt=""
                            className="h-16 w-16 object-cover rounded-md border border-ink/10"
                          />
                          {i === 0 && (
                            <span className="absolute -top-1.5 -left-1.5 rounded-full bg-ink text-paper text-[9px] px-1.5 py-0.5 leading-none">
                              portada
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(idx, i)}
                            aria-label="Quitar foto"
                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-paper opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-0.5 pb-0.5 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                            <button
                              type="button"
                              disabled={i === 0}
                              onClick={() => moveImage(idx, i, -1)}
                              aria-label="Mover a la izquierda"
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-paper/90 text-ink disabled:opacity-30"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              disabled={i === c.images.length - 1}
                              onClick={() => moveImage(idx, i, 1)}
                              aria-label="Mover a la derecha"
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-paper/90 text-ink disabled:opacity-30"
                            >
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={save} disabled={publishing}>
              {publishing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {editingId ? "Guardando..." : "Publicando..."}
                </>
              ) : editingId ? (
                "Guardar cambios"
              ) : (
                "Publicar producto"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={reset} disabled={publishing}>
              {editingId ? "Cancelar edición" : "Limpiar"}
            </Button>
          </div>
        </div>

        <div className="border border-ink/15 rounded-2xl p-6 space-y-4">
          <h2 className="font-medium">
            Productos cargados desde el panel{" "}
            {!loadingList && <span className="text-ink/40">({products.length})</span>}
          </h2>
          {loadingList ? (
            <p className="text-sm text-ink/50">Cargando...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-ink/50">
              Todavía no publicaste ningún producto desde acá.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {products.map((p) => (
                <li
                  key={p.id}
                  className={`flex items-center gap-3 py-3 ${
                    editingId === p.id ? "bg-ink/[0.03] -mx-2 px-2 rounded-lg" : ""
                  }`}
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 object-cover rounded-md border border-ink/10 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate flex items-center gap-2">
                      {p.name}
                      {p.is_new && (
                        <span className="shrink-0 rounded-full bg-blush px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink">
                          Nuevo
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ink/50">
                      {p.category} · $ {Number(p.price).toLocaleString("es-AR")}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(p)}
                    aria-label="Editar producto"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProduct(p.id)}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CouponsSection authHeaders={authHeaders} onAuthFail={onAuthFail} />
      </div>
    </div>
  );
}



