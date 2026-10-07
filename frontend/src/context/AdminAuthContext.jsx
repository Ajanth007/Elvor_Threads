import { createContext, useReducer, useEffect, useState } from "react";

// Deliberately separate from your customer AuthContext — different
// localStorage key ("adminToken"), different token payload (role: "admin"),
// so a customer session and an admin session never collide or leak into
// each other, even in the same browser.
export const AdminAuthContext = createContext();

const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return { admin: action.payload };
    case "ADMIN_LOGOUT":
      return { admin: null };
    default:
      return state;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, { admin: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.role !== "admin") {
          throw new Error("Not an admin token");
        }

        dispatch({
          type: "ADMIN_LOGIN",
          payload: { token, username: payload.username, id: payload.id },
        });
      } catch (error) {
        console.error("Invalid admin token");
        localStorage.removeItem("adminToken");
        dispatch({ type: "ADMIN_LOGOUT" });
      }
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <AdminAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};