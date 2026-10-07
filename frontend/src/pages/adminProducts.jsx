import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const api = "http://localhost:8000"; // ASSUMPTION: match your real API base

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

const EMPTY_FORM = { name: "", price: "", originalPrice: "", stock: "", image: "", tag: "", description: "" };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = creating
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/admin/products`, { headers: authHeaders() });
      if (!res.ok) throw new Error("Could not load products");
      setProducts(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      originalPrice: product.original_price || "",
      stock: product.stock,
      image: product.image || "",
      tag: product.tag || "",
      description: product.description || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const isEditing = editingId !== null;
    const url = isEditing ? `${api}/admin/products/${editingId}` : `${api}/admin/products`;

    try {
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not save product");

      setModalOpen(false);
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This can't be undone.")) return;

    try {
      const res = await fetch(`${api}/admin/products/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "#2F3A25" }}>Products</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: "#2F3A25" }}
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {error && <p className="mt-4 text-sm" style={{ color: "#B3432C" }}>{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ backgroundColor: "#EAE2D6" }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "#D9CFBE", color: "#3A362F" }}>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Tag</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-5 py-6" colSpan={5} style={{ color: "#3A362F" }}>Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr><td className="px-5 py-6" colSpan={5} style={{ color: "#3A362F" }}>No products yet.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0" style={{ borderColor: "#D9CFBE" }}>
                  <td className="flex items-center gap-3 px-5 py-3">
                    {product.image && (
                      <img src={`${api}${product.image}`} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                    )}
                    <span className="font-medium" style={{ color: "#2F3A25" }}>{product.name}</span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#2F3A25" }}>₹{product.price}</td>
                  <td className="px-5 py-3">
                    <span style={{ color: product.stock === 0 ? "#B3432C" : "#2F3A25" }}>
                      {product.stock === 0 ? "Out of stock" : product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#3A362F" }}>{product.tag || "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="rounded-lg p-2 transition-colors hover:bg-white/50">
                        <Pencil className="h-4 w-4" style={{ color: "#2F3A25" }} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="rounded-lg p-2 transition-colors hover:bg-white/50">
                        <Trash2 className="h-4 w-4" style={{ color: "#B3432C" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md rounded-2xl p-6"
            style={{ backgroundColor: "#F7F2EB" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={{ color: "#2F3A25" }}>
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="h-5 w-5" style={{ color: "#3A362F" }} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <FormField label="Name">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Price (₹)">
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
                </FormField>
                <FormField label="Original price (optional)">
                  <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className={inputClass} />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Stock">
                  <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
                </FormField>
                <FormField label="Tag (optional)">
                  <input placeholder="New / Sale" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} />
                </FormField>
              </div>
              <FormField label="Image path">
                <input placeholder="/uploads/product.jpg" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} />
              </FormField>
              <FormField label="Description (optional)">
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
              </FormField>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#2F3A25" }}
            >
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create Product"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const inputClass = "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2";

function FormField({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium" style={{ color: "#2F3A25" }}>{label}</span>
      {children}
    </label>
  );
}