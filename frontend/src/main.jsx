import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import AuthContextProvider from "./context/AuthContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter><AdminAuthProvider>
      <AuthContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContextProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);