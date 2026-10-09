import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, ChevronRight, LogOut, Lock, UserRound } from "lucide-react";
// ASSUMPTION: adjust this import path to wherever AuthContext.jsx actually lives.
import { AuthContext } from "../context/AuthContext";
import { apiURL } from "../config/env";

/**
 * ELVOR THREADS — Profile page.
 *
 * Wired to your real AuthContext: it has no `useAuth()` hook or `logout()`
 * function, so this reads { user, dispatch } straight from AuthContext via
 * useContext, and logs out by clearing localStorage + dispatch({ type: "LOGOUT" })
 * the same way your reducer expects. `user` is { token, username, id } —
 * decoded from the JWT payload, so it has NO email. Email still comes from
 * /users/profile below.
 *
 * Built from the two real endpoint shapes you shared:
 *   GET /order  -> [{ id, user_id, total_amount, status, created_at }, ...]
 *   GET /cart   -> [{ id, product_id, size, quantity, name, price, image, stock }, ...]
 * Plus /users/profile for the logged-in user's email (per your spec's
 * "reuse existing endpoints" list) — I don't have its real response shape,
 * so the mapping below is a best guess; adjust PROFILE field names if your
 * API returns something different (e.g. { user: { ... } } instead of flat).
 *
 * Gap you should know about: GET /order returns only order summaries —
 * no product names. To show "Product name(s)" per the spec's example, this
 * fetches each recent order's detail (GET /order/:id, i.e. your existing
 * getOrderById) in parallel, limited to just the latest few orders so it
 * doesn't fan out requests for the whole history.
 */

const api = apiURL.Url    // ASSUMPTION: replace with your real API base / axios instance
const RECENT_ORDERS_LIMIT = 3;

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const STATUS_STYLES = {
  pending: "bg-[#F3E3C7] text-[#8A6A1F]",
  shipped: "bg-[#DCE6F4] text-[#3A5A8C]",
  delivered: "bg-[#DCE7CD] text-[#526044]",
  cancelled: "bg-[#F3D8D3] text-[#B3432C]",
};

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [recentOrderItems, setRecentOrderItems] = useState({}); // { [orderId]: items[] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ASSUMPTION: a route guard elsewhere already keeps logged-out users off
    // this page. This is just a safety net so it doesn't crash if not.
    if (!user?.token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        // Profile, orders, and cart can all load in parallel — none depend on each other.
        const [profileRes, ordersRes, cartRes] = await Promise.all([
          fetch(`${api}/users/profile`, { headers: authHeaders(user.token) }),
          fetch(`${api}/order`, { headers: authHeaders(user.token) }),
          fetch(`${api}/cart`, { headers: authHeaders(user.token) }),
        ]);

        if (!profileRes.ok) throw new Error("Could not load your profile");
        if (!ordersRes.ok) throw new Error("Could not load your orders");
        if (!cartRes.ok) throw new Error("Could not load your cart");

        const profileData = await profileRes.json();
        const ordersData = await ordersRes.json();
        const cartData = await cartRes.json();

        if (cancelled) return;

        // ASSUMPTION: /users/profile returns { id, name, email, ... } directly.
        // If it's nested (e.g. { user: {...} }), change this one line.
        setProfile(profileData);
        setOrders(ordersData);
        setCartItems(cartData);

        // Fetch item details only for the orders we're about to show, so we
        // can display product names without pulling the whole order history.
        const latest = [...ordersData]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, RECENT_ORDERS_LIMIT);

        const detailResults = await Promise.all(
          latest.map((order) =>
            fetch(`${api}/order/${order.id}`, { headers: authHeaders(user.token) })
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          )
        );

        if (cancelled) return;

        const itemsByOrderId = {};
        latest.forEach((order, i) => {
          // getOrderById responds with { order, items } — see your controller.
          itemsByOrderId[order.id] = detailResults[i]?.items ?? [];
        });
        setRecentOrderItems(itemsByOrderId);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.token]);

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, RECENT_ORDERS_LIMIT),
    [orders]
  );

  // ASSUMPTION: "cart item count" = total quantity across cart rows, not
  // just the number of distinct line items. Swap to cartItems.length if you
  // want "2 line items" instead of "2 units" semantics.
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Prefer a "name" field from /users/profile if it has one; otherwise fall
  // back to the username already decoded from the JWT by AuthContext, so
  // the header never sits blank while the profile fetch is in flight.
  const displayName = profile?.name || user?.username || "";

  const handleLogout = () => {
    // Matches your reducer exactly: it only ever reads "token" from
    // localStorage, so clearing that + dispatching LOGOUT is all that's
    // needed to fully log out and reset AuthContext's state.
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login"); // ASSUMPTION: adjust to your real login/home route.
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center">
        <p className="text-[#3A362F] text-sm">Loading your profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-4">
        <p className="text-[#B3432C] text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* 1. Profile header */}
        <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8B9A6E] text-lg font-semibold text-[#F7F2EB]">
              {displayName ? displayName.charAt(0).toUpperCase() : <UserRound className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3A362F]">My Profile</p>
              <h1 className="text-xl font-semibold text-[#2F3A25]">{displayName}</h1>
              {/* email isn't in the JWT payload, so it only appears once /users/profile resolves */}
              <p className="text-sm text-[#3A362F]">{profile?.email || "—"}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile/edit")} // ASSUMPTION: adjust to your real edit-profile route
            className="rounded-full border border-[#8B9A6E] px-5 py-2 text-sm font-medium text-[#2F3A25] transition-colors hover:bg-[#8B9A6E] hover:text-[#F7F2EB]"
          >
            Edit
          </button>
        </section>

        {/* 2. Statistics cards */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard icon={<Package className="h-5 w-5" />} label="Orders" value={orders.length} />
          <StatCard icon={<ShoppingCart className="h-5 w-5" />} label="Cart" value={cartCount} />
        </section>

        {/* 3. Recent orders */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#3A362F]">Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-[#EAE2D6] px-5 py-6 text-center text-sm text-[#3A362F]">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentOrders.map((order) => {
                const items = recentOrderItems[order.id] || [];
                const productLabel =
                  items.length === 0
                    ? "—"
                    : items.length === 1
                    ? items[0].product_name
                    : `${items[0].product_name} + ${items.length - 1} more`;

                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-[#EAE2D6] px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#3A362F]">#{order.id}</p>
                      <p className="truncate text-sm font-medium text-[#2F3A25]">{productLabel}</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          STATUS_STYLES[order.status] || "bg-[#E4DCCF] text-[#3A362F]"
                        }`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="text-sm font-semibold text-[#2F3A25]">
                        {formatCurrency(order.total_amount)}
                      </span>
                      <button
                        onClick={() => navigate(`/orders/${order.id}`)} // ASSUMPTION: adjust to your real order-detail route
                        className="rounded-full border border-[#8B9A6E] px-4 py-1.5 text-xs font-medium text-[#2F3A25] transition-colors hover:bg-[#8B9A6E] hover:text-[#F7F2EB]"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {orders.length > RECENT_ORDERS_LIMIT && (
            <button
              onClick={() => navigate("/orders")} // ASSUMPTION: only call this if a full orders page/route exists
              className="mt-4 w-full rounded-xl border border-[#8B9A6E] py-2.5 text-sm font-medium text-[#2F3A25] transition-colors hover:bg-[#8B9A6E] hover:text-[#F7F2EB]"
            >
              View All
            </button>
          )}
        </section>

        {/* 4. Account settings */}
        <section className="mt-10 mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#3A362F]">Account Settings</h2>
          <div className="mt-4 overflow-hidden rounded-2xl bg-[#EAE2D6]">
            <SettingsRow
              icon={<UserRound className="h-4 w-4" />}
              label="Personal Information"
              onClick={() => navigate("/profile/edit")} // ASSUMPTION: adjust to your real route
            />
            <SettingsRow
              icon={<Lock className="h-4 w-4" />}
              label="Change Password"
              onClick={() => navigate("/profile/change-password")} // ASSUMPTION: adjust to your real route
            />
            <SettingsRow
              icon={<LogOut className="h-4 w-4" />}
              label="Logout"
              onClick={handleLogout}
              danger
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#EAE2D6] px-5 py-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B9A6E] text-[#F7F2EB]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-[#3A362F]">{label}</p>
        <p className="text-xl font-semibold text-[#2F3A25]">{value}</p>
      </div>
    </div>
  );
}

function SettingsRow({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 border-b border-[#D9CFBE] px-5 py-4 text-left text-sm transition-colors last:border-b-0 hover:bg-[#E4DCCF] ${
        danger ? "text-[#B3432C]" : "text-[#2F3A25]"
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-[#3A362F]" />
    </button>
  );
}