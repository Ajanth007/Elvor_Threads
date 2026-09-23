import { Route, Navigate, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/home.jsx";
import Contact from "./pages/contact.jsx";
import Shop from "./pages/shop.jsx";
import About from "./pages/about.jsx";
import Product from "./pages/product.jsx";
import Cart from "./pages/cart.jsx";

import Login from "./pages/login1";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import MainLayout from "./layout/mainLayout.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={user ? <Profile /> : <Login />} />
      </Route>
    </Routes>
  );
}

export default App;
