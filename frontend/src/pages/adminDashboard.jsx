import { useEffect, useState } from "react";
import { IndianRupee, ShoppingBag, Users, Shirt } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; // npm i recharts
import { apiURL } from "../config/env";

const api =apiURL.Url // ASSUMPTION: match your real API base

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const STATUS_STYLES = {
  pending: "bg-[#F3E3C7] text-[#8A6A1F]",
  shipped: "bg-[#DCE6F4] text-[#3A5A8C]",
  delivered: "bg-[#DCE7CD] text-[#526044]",
  cancelled: "bg-[#F3D8D3] text-[#B3432C]",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api}/admin/dashboard/stats`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Could not load dashboard stats");
        setStats(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-sm" style={{ color: "#3A362F" }}>Loading dashboard…</p>;
  if (error) return <p className="text-sm" style={{ color: "#B3432C" }}>{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "#2F3A25" }}>
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<IndianRupee className="h-5 w-5" />} label="Revenue" value={`₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`} />
        <StatCard icon={<ShoppingBag className="h-5 w-5" />} label="Orders" value={stats.totalOrders} />
        <StatCard icon={<Users className="h-5 w-5" />} label="Users" value={stats.totalUsers} />
        <StatCard icon={<Shirt className="h-5 w-5" />} label="Products" value={stats.totalProducts} />
      </div>

      {/* Revenue trend */}
      <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#EAE2D6" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#3A362F" }}>
          Revenue — last 7 days
        </h2>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.revenueByDay}>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#3A362F" }} />
              <YAxis tick={{ fontSize: 11, fill: "#3A362F" }} />
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
              <Line type="monotone" dataKey="revenue" stroke="#8B9A6E" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#EAE2D6" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#3A362F" }}>
          Recent Orders
        </h2>
        <div className="mt-4 space-y-2">
          {stats.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-lg bg-white/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium" style={{ color: "#2F3A25" }}>
                  #{order.id} · {order.customer_name}
                </p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[order.status] || ""}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#2F3A25" }}>
                ₹{Number(order.total_amount).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#EAE2D6" }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#8B9A6E" }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "#3A362F" }}>{label}</p>
        <p className="text-xl font-semibold" style={{ color: "#2F3A25" }}>{value}</p>
      </div>
    </div>
  );
}