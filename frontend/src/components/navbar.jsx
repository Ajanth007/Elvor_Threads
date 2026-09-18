import React, { useState } from "react";
import { Link } from "react-router-dom";

import search from "../assets/search.svg";
import cart from "../assets/shopping-cart.svg";
import user from "../assets/user.svg";

const Navbar = () => {
  const { cartCount } = useState(0);

  return (
    <div className="flex items-center justify-between px-8 py-5 bg-[#F7F2EB]">
      {/* Logo */}
      <div className="text-2xl font-light tracking-wide text-[#3A362F] cursor-pointer">
        <Link to="/"> Elvor Threads </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8 text-sm font-medium tracking-wide text-[#2F3A25]">
        <span className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200">
          <Link to="/"> Home </Link>
        </span>

        <span className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200">
          <Link to="/shop"> Shop </Link>
        </span>

        <span className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200">
          <Link to="/about"> About Us </Link>
        </span>

        <span className="cursor-pointer hover:text-[#8B9A6E] transition-colors duration-200">
          <Link to="/contact"> Contact </Link>
        </span>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5">
        <img
          src={search}
          alt="Search"
          className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
        />

        <Link to="/cart" className="relative">
          <img src={cart} alt="Cart" className="h-6 w-6" />

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2F3A25] text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>

        <img
          src={user}
          alt="User"
          className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default Navbar;
