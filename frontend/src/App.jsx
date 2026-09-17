import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/home.jsx";
// import Collections from "./pages/collections.jsx";
import Contact from "./pages/contact.jsx";
import Shop from "./pages/shop.jsx";
import About from './pages/about.jsx'
import Product from './pages/product.jsx'

import MainLayout from "./layout/mainLayout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            {/* <Route path="/collection" element={<Collections />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
