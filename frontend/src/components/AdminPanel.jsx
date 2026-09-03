import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

function ProductForm({ onAuthFail }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([emptyColor()]);
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
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setName(p.name || "");
    setCategory(p.category || CATEGORIES[0]);
    setPrice(p.price != null ? String(p.price) : "");
    setDescription(p.description || "");
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
                    <p className="text-sm font-medium truncate">{p.name}</p>
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
      </div>
    </div>
  );
}




