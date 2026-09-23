import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import search from "../assets/search.svg";
import cart from "../assets/shopping-cart.svg";
import userIcon from "../assets/user.svg";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  // Get login state from AuthContext
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between px-8 py-5 bg-[#F7F2EB]">
      
      {/* Logo */}
      <div className="text-2xl font-light tracking-wide text-[#3A362F] cursor-pointer">
        <Link to="/">Elvor Threads</Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8 text-sm font-medium tracking-wide text-[#2F3A25]">
        
        <Link
          to="/"
          className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200"
        >
          Home
        </Link>

        <Link
          to="/shop"
          className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200"
        >
          Shop
        </Link>

        <Link
          to="/about"
          className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200"
        >
          About Us
        </Link>

        <Link
          to="/contact"
          className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200"
        >
          Contact
        </Link>

      </div>

      {/* Icons */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <img
          src={search}
          alt="Search"
          className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
        />

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={cart}
            alt="Cart"
            className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-200"
          />

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2F3A25] text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Login / Profile */}
        {user ? (
          <Link to="/profile">
            <img
              src={userIcon}
              alt="Profile"
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-[#2F3A25] hover:text-[#8B9A6E] transition-colors duration-200"
          >
            Login
          </Link>
        )}

      </div>
    </div>
  );
};

export default Navbar;