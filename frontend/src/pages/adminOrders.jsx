import { useEffect, useMemo, useState } from "react";
import { apiURL } from "../config/env";

const api = apiURL.Url; // ASSUMPTION: match your real API base
const STATUSES = ["pending", "shipped", "delivered", "cancelled"];

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

const STATUS_STYLES = {
  pending: "bg-[#F3E3C7] text-[#8A6A1F]",
  shipped: "bg-[#DCE6F4] text-[#3A5A8C]",
  delivered: "bg-[#DCE7CD] text-[#526044]",
  cancelled: "bg-[#F3D8D3] text-[#B3432C]",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api}/admin/orders`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Could not load orders");
        setOrders(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredOrders = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${api}/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Could not update status");

      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "#2F3A25" }}>Orders</h1>

      {/* Status filter tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors"
            style={{
              backgroundColor: filter === s ? "#2F3A25" : "#EAE2D6",
              color: filter === s ? "#F7F2EB" : "#3A362F",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm" style={{ color: "#B3432C" }}>{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ backgroundColor: "#EAE2D6" }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "#D9CFBE", color: "#3A362F" }}>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-5 py-6" colSpan={5} style={{ color: "#3A362F" }}>Loading…</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td className="px-5 py-6" colSpan={5} style={{ color: "#3A362F" }}>No orders found.</td></tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0" style={{ borderColor: "#D9CFBE" }}>
                  <td className="px-5 py-3 font-medium" style={{ color: "#2F3A25" }}>#{order.id}</td>
                  <td className="px-5 py-3" style={{ color: "#2F3A25" }}>{order.customer_name}</td>
                  <td className="px-5 py-3" style={{ color: "#2F3A25" }}>
                    ₹{Number(order.total_amount).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3" style={{ color: "#3A362F" }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status] || ""}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}