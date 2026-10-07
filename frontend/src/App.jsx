// import { Route, Routes } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import "./App.css";
// import Home from "./pages/home.jsx";
// import Contact from "./pages/contact.jsx";
// import Shop from "./pages/shop.jsx";
// import About from "./pages/about.jsx";
// import Product from "./pages/product.jsx";
// import Cart from "./pages/Cart.jsx";
// import Search from "./pages/Search.jsx";
// import Checkout from "./pages/checkout.jsx";
// import Login from "./pages/login1";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile.jsx";
// import Preloader from "./components/preloader.jsx";
// import { AuthContext } from "./context/AuthContext";
// import MainLayout from "./layout/mainLayout.jsx";

// //admin
// import AdminLogin from "./pages/adminlogin.jsx";
// import AdminDashboard from "./pages/adminDashboard.jsx";

// function App() {
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);
//   if (loading) {
//     return <Preloader />;
//   }
//   return (
//     <Routes>
//       {" "}
//       <Route element={<MainLayout />}>
//         {" "}
//         <Route path="/" element={<Home />} />{" "}
//         <Route path="/shop" element={<Shop />} />{" "}
//         <Route path="/contact" element={<Contact />} />{" "}
//         <Route path="/product/:id" element={<Product />} />{" "}
//         <Route path="/about" element={<About />} />{" "}
//         <Route path="/cart" element={<Cart />} />{" "}
//         <Route path="/checkout" element={<Checkout />} />{" "}
//         <Route path="/login" element={<Login />} />{" "}
//         <Route path="/register" element={<Register />} />{" "}
//         <Route path="/search" element={<Search />} />{" "}
//         <Route path="/profile" element={user ? <Profile /> : <Login />} />{" "}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//       </Route>{" "}
//     </Routes>
//   );
// }
// export default App;


import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/home.jsx";
import Contact from "./pages/contact.jsx";
import Shop from "./pages/shop.jsx";
import About from "./pages/about.jsx";
import Product from "./pages/product.jsx";
import Cart from "./pages/Cart.jsx";
import Search from "./pages/Search.jsx";
import Checkout from "./pages/checkout.jsx";
import Login from "./pages/login1";
import Register from "./pages/Register";
import Profile from "./pages/Profile.jsx";
import Preloader from "./components/preloader.jsx";

import { AuthContext } from "./context/AuthContext";
import MainLayout from "./layout/mainLayout.jsx";

// Admin
import AdminLogin from "./pages/adminlogin.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import AdminLayout from "./layout/adminLayout.jsx";

function App() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Routes>

      {/* ================= USER ROUTES ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Login />}
        />
      </Route>


      {/* ================= ADMIN ROUTES ================= */}

      {/* Admin Login - NO sidebar */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Admin Dashboard/Layout */}
      <Route element={<AdminLayout />}>

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Later you can add */}
        {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
        {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
        {/* <Route path="/admin/users" element={<AdminUsers />} /> */}

      </Route>

    </Routes>
  );
}

export default App;