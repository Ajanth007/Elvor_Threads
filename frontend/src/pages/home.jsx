import React from "react";

import image from "../assets/hero8.png";
import transport from "../assets/transport.png";
import support from "../assets/24-hours-support.png";
import easyreturn from "../assets/return.png";
import payment_protection from "../assets/payment-protection.png";

import saleMen from "../assets/saleMen.png";
import saleWomen from "../assets/saleWomen2.png";

import premqlty from "../assets/icons/premium_quality.png";
import tdesign from "../assets/icons/Trendy_design.png";
import afprice from "../assets/icons/affordable.png";
import cs from "../assets/icons/customer-review.png";

import Bestseller from "./bestSeller.jsx";
import Sale from "./sale.jsx";

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
    <div className="w-full overflow-x-hidden">

      {/* ================= HERO ================= */}

      <section className="w-full bg-[#F7F2EB]">

        <div className="flex min-h-[600px] flex-col md:min-h-[650px] md:flex-row">

          {/* Text */}
          <div className="order-2 flex w-full flex-col justify-center gap-5 px-6 py-12 sm:px-10 md:order-1 md:w-1/2 md:px-12 lg:px-20">

            <p className="text-xs font-medium tracking-[0.3em] text-[#8B9A6E]">
              Shop the collection
            </p>

            <h1 className="text-4xl font-light leading-tight tracking-wide text-[#3A362F] sm:text-5xl lg:text-6xl">
              Elvor Threads
            </h1>

            <p className="text-base tracking-wide text-[#5C5750] sm:text-lg">
              Effortless. Refined. Yours.
            </p>

            <p className="max-w-sm text-sm leading-relaxed tracking-wide text-[#7A756D] sm:text-base">
              Timeless clothing designed for everyday confidence.
            </p>

            <button className="mt-2 w-fit bg-[#8B9A6E] px-7 py-3 text-sm tracking-[0.15em] text-white transition-colors duration-200 hover:bg-[#7a8960] sm:px-8">
              Explore Collection
            </button>

          </div>

          {/* Image */}
          <div className="order-1 h-[350px] w-full sm:h-[450px] md:order-2 md:h-auto md:w-1/2">

            <img
              src={image}
              alt="Elvor Threads seasonal collection"
              className="h-full w-full object-cover object-center"
            />

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="w-full px-5 py-12 sm:px-8 md:px-10">

        <h2 className="mb-10 text-center text-2xl font-semibold tracking-wide text-[#2F3A25] sm:text-3xl">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {details.map((item, index) => (

            <div
              key={index}
              className="flex flex-col items-center text-center"
            >

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F2EB]">

                <img
                  src={item.img}
                  alt={item.text1}
                  className="h-7 w-7 object-contain"
                />

              </div>

              <span className="text-base font-semibold tracking-wide text-[#2F3A25] sm:text-lg">
                {item.text1}
              </span>

              <span className="mt-2 text-sm tracking-wide text-[#6B6558]">
                {item.text2}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* ================= MEN / WOMEN ================= */}

      <section className="w-full px-5 sm:px-8 md:px-10">

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* MEN */}

          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-xl bg-[#F7F2EB] sm:min-h-[400px] md:flex-row lg:min-h-[350px]">

            {/* Text */}

            <div className="flex w-full flex-col justify-center px-6 py-8 sm:px-8 md:w-1/2">

              <p className="mb-2 text-xs tracking-[0.2em] text-[#8B9A6E] sm:text-sm">
                ELVOR THREADS
              </p>

              <h2 className="text-2xl font-semibold text-[#2F3328] sm:text-3xl">
                Men's Collection
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#55584F]">
                Clean silhouettes and timeless essentials designed for
                everyday confidence.
              </p>

              <button className="mt-5 w-fit rounded-full bg-[#8B9A6E] px-6 py-2.5 text-sm text-white transition hover:bg-[#74845A]">
                Shop Men
              </button>

            </div>

            {/* Image */}

            <div className="h-[280px] w-full overflow-hidden sm:h-[350px] md:h-auto md:w-1/2">

              <img
                src={saleMen}
                alt="Elvor Threads men's collection"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />

            </div>

          </div>


          {/* WOMEN */}

          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-xl bg-[#EAE2D6] sm:min-h-[400px] md:flex-row lg:min-h-[350px]">

            {/* Image */}

            <div className="order-1 h-[280px] w-full overflow-hidden sm:h-[350px] md:order-1 md:h-auto md:w-1/2">

              <img
                src={saleWomen}
                alt="Elvor Threads women's collection"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />

            </div>

            {/* Text */}

            <div className="order-2 flex w-full flex-col justify-center px-6 py-8 sm:px-8 md:w-1/2">

              <p className="mb-2 text-xs tracking-[0.2em] text-[#8B9A6E] sm:text-sm">
                ELVOR THREADS
              </p>

              <h2 className="text-2xl font-semibold text-[#2F3328] sm:text-3xl">
                Women's Collection
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#55584F]">
                Effortless styles and refined pieces made for your everyday
                wardrobe.
              </p>

              <button className="mt-5 w-fit rounded-full bg-[#8B9A6E] px-6 py-2.5 text-sm text-white transition hover:bg-[#74845A]">
                Shop Women
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BESTSELLER ================= */}

      <section className="w-full">
        <Bestseller />
      </section>


      {/* ================= SALE ================= */}

      <section className="w-full">
        <Sale />
      </section>


      {/* ================= FEATURES ================= */}

      <section className="w-full px-5 py-10 sm:px-8 md:px-10">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

          {detail.map((item, index) => (

            <div
              key={index}
              className="flex flex-col items-center justify-center px-4 text-center"
            >

              {item.img && (
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F2EB]">

                  <img
                    src={item.img}
                    alt={item.text1}
                    className="h-5 w-5 object-contain"
                  />

                </div>
              )}

              <span className="text-base font-semibold tracking-wide text-[#2F3A25]">
                {item.text1}
              </span>

              <span className="mt-1 text-sm tracking-wide text-[#6B6558]">
                {item.text2}
              </span>

              <span className="text-sm tracking-wide text-[#6B6558]">
                {item.text3}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* ================= NEWSLETTER ================= */}

      <section className="mx-4 mb-8 mt-5 w-auto rounded-2xl bg-[#F7F2EB] px-4 py-6 sm:mx-6 sm:px-6 md:mx-10 md:px-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-2xl bg-[#EAE2D6] px-5 py-10 text-center sm:px-8 sm:py-12">

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#3A362F]/60 sm:text-sm">
            Stay Updated
          </span>

          <h2 className="mt-3 text-2xl font-semibold tracking-wide text-[#2F3A25] sm:text-3xl">
            Join the Elvor Threads Newsletter
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#3A362F]/70">
            Be the first to know about new collections, exclusive offers,
            seasonal drops, and special updates from Elvor Threads.
          </p>


          {/* Newsletter input */}

          <div className="mt-7 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#2F3A25]/20 bg-[#F7F2EB] p-1 sm:flex-row sm:rounded-full">

            <input
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-[#2F3A25] outline-none placeholder:text-[#3A362F]/50 sm:px-6"
            />

            <button className="rounded-xl bg-[#8B9A6E] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#2F3A25] sm:rounded-full">
              Subscribe
            </button>

          </div>


          <p className="mt-4 text-xs text-[#3A362F]/50">
            No spam. Just fashion, updates, and exclusive offers.
          </p>

        </div>

      </section>

    </div>
  );
};

export default home;