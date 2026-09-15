import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#2F3A25] px-10 py-12">

      <div className="flex justify-between gap-16">

        {/* Brand */}
        <div className="flex flex-col max-w-xs">
          <span className="text-2xl font-semibold tracking-wide text-[#F7F2EB]">
            Elvor Threads
          </span>

          <span className="mt-3 text-sm tracking-wide text-[#C9C2B2]">
            Everyday, Elevated.
          </span>

          <p className="mt-5 text-sm leading-6 text-[#A8A192]">
            Timeless essentials designed for everyday comfort and effortless style.
          </p>
        </div>


        {/* Shop */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-2 font-semibold uppercase tracking-wider text-[#F7F2EB]">
            Shop
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Men
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Women
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            New Arrivals
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Best Sellers
          </span>
        </div>


        {/* Help */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-2 font-semibold uppercase tracking-wider text-[#F7F2EB]">
            Help
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Track Orders
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Returns
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Shipping
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            FAQs
          </span>
        </div>


        {/* Company */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-2 font-semibold uppercase tracking-wider text-[#F7F2EB]">
            Company
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            About Us
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Contact Us
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Privacy Policy
          </span>

          <span className="cursor-pointer text-[#C9C2B2] transition hover:text-[#8B9A6E]">
            Terms & Conditions
          </span>
        </div>

      </div>

    </div>
  );
};

export default Footer;