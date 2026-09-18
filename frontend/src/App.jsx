import {  Route,  Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/home.jsx";
import Contact from "./pages/contact.jsx";
import Shop from "./pages/shop.jsx";
import About from './pages/about.jsx'
import Product from './pages/product.jsx'
import Cart from './pages/cart.jsx'

import MainLayout from "./layout/mainLayout.jsx";

function App() {
  return (
    <>

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            {/* <Route path="/collection" element={<Collections />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>

    </>
  );
}

export default App;
