import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { apiURL } from "../config/env";

const api = apiURL.Url;  // ASSUMPTION: match your real API base

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api}/admin/users`, { headers: authHeaders() });
        if (!res.ok) throw new Error("Could not load users");
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This can't be undone.")) return;

    try {
      const res = await fetch(`${api}/admin/users/${id}`, { method: "DELETE", headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not delete user");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "#2F3A25" }}>Users</h1>

      {error && <p className="mt-4 text-sm" style={{ color: "#B3432C" }}>{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ backgroundColor: "#EAE2D6" }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "#D9CFBE", color: "#3A362F" }}>
              <th className="px-5 py-3 font-medium">Username</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-5 py-6" colSpan={4} style={{ color: "#3A362F" }}>Loading…</td></tr>
            ) : users.length === 0 ? (
              <tr><td className="px-5 py-6" colSpan={4} style={{ color: "#3A362F" }}>No users yet.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b last:border-b-0" style={{ borderColor: "#D9CFBE" }}>
                  <td className="px-5 py-3 font-medium" style={{ color: "#2F3A25" }}>{user.username}</td>
                  <td className="px-5 py-3" style={{ color: "#3A362F" }}>{user.email || "—"}</td>
                  <td className="px-5 py-3" style={{ color: "#3A362F" }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(user.id)} className="rounded-lg p-2 transition-colors hover:bg-white/50">
                      <Trash2 className="h-4 w-4" style={{ color: "#B3432C" }} />
                    </button>
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