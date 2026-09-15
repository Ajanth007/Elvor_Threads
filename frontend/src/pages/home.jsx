import image from "../assets/hero8.png";
import pquality from "../assets/user.svg";
import tdesigns from "../assets/user.svg";
import aprice from "../assets/user.svg";
import csatisfac from "../assets/user.svg";

import saleMen from "../assets/saleMen.png";
import saleWomen from "../assets/saleWomen2.png";

import Bestseller from './bestSeller.jsx'
import Sale from './sale.jsx'

import img from "../assets/user.svg";
import payment_protection from "../assets/payment-protection.png"
import transport from "../assets/transport.png"
import support from "../assets/24-hours-support.png"
import easyreturn from "../assets/return.png"

const details = [
  {
    img: transport,
    text1: "Free Shipping",
    text2: "Orders over ₹100",
  },
  {
    img: easyreturn,
    text1: "Easy Returns",
    text2: "30-day return policy",
  },
  {
    img: payment_protection,
    text1: "Secure Payment",
    text2: "100% protected",
  },
  {
    img: support,
    text1: "24/7 Support",
    text2: "We're here to help",
  },
];

import React from "react";

import premqlty from "../assets/icons/premium_quality.png"
import tdesign from "../assets/icons/Trendy_design.png"
import afprice from "../assets/icons/affordable.png"
import cs from "../assets/icons/customer-review.png"
const detail = [
  {
    img: premqlty,
    text1: "Premium Quality",
    text2: "Fresh Fabrics",
    text3: "Lasting Comfort",
  },
  {
    img: tdesign,
    text1: "Trendy Designs",
    text2: "Stay ahead with",
    text3: "latest styles",
  },
  {
    img: afprice,
    text1: "Affordable Price",
    text2: "Best styles with",
    text3: "the best price",
  },
  {
    img: cs,
    text1: "Customer Satisfaction",
    text2: "Thousands of happy",
    text3: "customers",
  },
];

const home = () => {
  return (
    <>
<div className=" overflow-hidden" >
        {/* //hero */}

      <div className="bg-[#F7F2EB] w-full min-h-165 overflow-hidden flex flex-col md:flex-row items-stretch">
        {/* Text column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 px-8 sm:px-14 md:px-20 py-16 order-2 md:order-1 ml-20">
          <p className="text-xs tracking-[0.3em] text-[#8B9A6E] font-medium">
            Shop the collection
          </p>

          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-[#3A362F] leading-[1.1]">
            Elvor Threads
          </h1>

          <p className="text-lg tracking-wide text-[#5C5750]">
            Effortless. Refined. Yours.
          </p>

          <p className="text-base tracking-wide text-[#7A756D] max-w-sm leading-relaxed">
            Timeless clothing designed for everyday confidence.
          </p>

          <button className="w-fit bg-[#8B9A6E] text-white px-8 py-3 mt-2 text-sm tracking-[0.15em] hover:bg-[#7a8960] transition-colors duration-200">
            Explore Collection
          </button>
        </div>

        {/* Image column */}
        <div className="w-full md:w-1/2 h-95 md:h-auto order-1 md:order-2">
          <img
            src={image}
            alt="Elvor Threads seasonal collection"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>


        {/* why you choose us */}
      <div className=" px-10 py-10">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-wide text-[#2F3A25]">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {details.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F2EB]">
                <img
                  src={item.img}
                  alt={item.text1}
                  className="h-7 w-7 object-contain"
                />
              </div>

              <span className="text-lg font-semibold tracking-wide text-[#2F3A25]">
                {item.text1}
              </span>

              <span className="mt-2 text-sm tracking-wide text-[#6B6558]">
                {item.text2}
              </span>

              <span className="text-sm tracking-wide text-[#6B6558]">
                {item.text3}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* men,Women */}
      <div className="w-full px-6">
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* MEN */}
          <div className="bg-[#F7F2EB] rounded-xl h-80 overflow-hidden flex">
            {/* Text */}
            <div className="w-1/2 flex flex-col justify-center px-8">
              <p className="text-sm tracking-[0.2em] text-[#8B9A6E] mb-2">
                ELVOR THREADS
              </p>

              <h2 className="text-3xl font-semibold text-[#2F3328]">
                Men's Collection
              </h2>

              <p className="text-[#55584F] mt-3 text-sm leading-6">
                Clean silhouettes and timeless essentials designed for everyday
                confidence.
              </p>

              <button className="mt-5 bg-[#8B9A6E] text-white px-6 py-2.5 rounded-full w-fit hover:bg-[#74845A] transition">
                Shop Men
              </button>
            </div>

            {/* Image */}
            <div className="w-1/2 h-full overflow-hidden">
              <img
                src={saleMen}
                alt="Elvor Threads men's collection"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* WOMEN */}
          <div className="bg-[#EAE2D6] rounded-xl h-80 overflow-hidden flex">
            {/* Image */}
            <div className="w-1/2 h-full overflow-hidden">
              <img
                src={saleWomen}
                alt="Elvor Threads women's collection"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="w-1/2 flex flex-col justify-center px-8">
              <p className="text-sm tracking-[0.2em] text-[#8B9A6E] mb-2">
                ELVOR THREADS
              </p>

              <h2 className="text-3xl font-semibold text-[#2F3328]">
                Women's Collection
              </h2>

              <p className="text-[#55584F] mt-3 text-sm leading-6">
                Effortless styles and refined pieces made for your everyday
                wardrobe.
              </p>

              <button className="mt-5 bg-[#8B9A6E] text-white px-6 py-2.5 rounded-full w-fit hover:bg-[#74845A] transition">
                Shop Women
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* product listing */}

      <Bestseller />
      
      {/* Sale Section */}

      <Sale />

      
      {/* fastdelivery,material */}
      <div className="w-full px-10 py-8 mt-5 ">
        <div className="grid grid-cols-4 ">
          {detail.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-8 text-center"
            >
              {/* Icon */}
              {item.img && (
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F2EB]">
                  <img
                    src={item.img}
                    alt={item.text1}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}

              {/* Heading */}
              <span className="text-base font-semibold tracking-wide text-[#2F3A25]">
                {item.text1}
              </span>

              {/* Description */}
              <span className="mt-1 text-sm tracking-wide text-[#6B6558]">
                {item.text2}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NewsLetter */}

      <section className="w-[98%] bg-[#F7F2EB] px-10 py-6 mt-5 ml-5 mr-10 mb-8 rounded-2xl">
  <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-2xl bg-[#EAE2D6] px-6 py-12 text-center">

    <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#3A362F]/60">
      Stay Updated
    </span>

    <h2 className="mt-3 text-3xl font-semibold tracking-wide text-[#2F3A25]">
      Join the Elvor Threads Newsletter
    </h2>

    <p className="mt-3 max-w-xl text-sm leading-6 text-[#3A362F]/70">
      Be the first to know about new collections, exclusive offers,
      seasonal drops, and special updates from Elvor Threads.
    </p>

    <div className="mt-7 flex w-full max-w-lg overflow-hidden rounded-full border border-[#2F3A25]/20 bg-[#F7F2EB]">

      <input
        type="email"
        placeholder="Enter your email address"
        className="min-w-0 flex-1 bg-transparent px-6 py-3 text-sm text-[#2F3A25] outline-none placeholder:text-[#3A362F]/50"
      />

      <button className="m-1 rounded-full bg-[#8B9A6E] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#2F3A25]">
        Subscribe
      </button>

    </div>

    <p className="mt-4 text-xs text-[#3A362F]/50">
      No spam. Just fashion, updates, and exclusive offers.
    </p>

  </div>
</section>

    
</div>
    </>
  );
};

export default home;
