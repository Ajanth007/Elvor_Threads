import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext.jsx";
import { apiURL } from "../config/env.js";

const api = apiURL.Url; // ASSUMPTION: match your real API base

export default function AdminLogin() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AdminAuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${api}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      dispatch({
        type: "ADMIN_LOGIN",
        payload: { token: data.token, username: payload.username, id: payload.id },
      });

      navigate("/admin"); // ASSUMPTION: adjust to your real dashboard route
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: "#2F3A25" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-8 shadow-xl"
        style={{ backgroundColor: "#F7F2EB" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#8B9A6E" }}>
          Elvor Threads
        </p>
        <h1 className="mt-1 text-2xl font-semibold" style={{ color: "#2F3A25" }}>
          Admin Login
        </h1>

        <label className="mt-6 block text-sm">
          <span className="mb-1.5 block font-medium" style={{ color: "#2F3A25" }}>Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
            style={{ borderColor: "#D9CFBE" }}
            autoFocus
          />
        </label>

        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block font-medium" style={{ color: "#2F3A25" }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
            style={{ borderColor: "#D9CFBE" }}
          />
        </label>

        {error && (
          <p className="mt-4 rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "#F3D8D3", color: "#B3432C" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "#2F3A25" }}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}