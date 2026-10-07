import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Shirt, ShoppingBag, Users, LogOut } from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Shirt },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { admin, dispatch } = useContext(AdminAuthContext);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch({ type: "ADMIN_LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F7F2EB" }}>
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col justify-between px-4 py-6" style={{ backgroundColor: "#2F3A25" }}>
        <div>
          <div className="px-2 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#8B9A6E" }}>
              Elvor Threads
            </p>
            <p className="text-sm font-medium" style={{ color: "#F7F2EB" }}>Admin Panel</p>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "" : "hover:bg-white/5"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#8B9A6E" : "transparent",
                  color: "#F7F2EB",
                })}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-3 px-2">
          <p className="truncate text-xs" style={{ color: "#C9CFC0" }}>
            Signed in as {admin?.username}
          </p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: "#F3D8D3" }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}