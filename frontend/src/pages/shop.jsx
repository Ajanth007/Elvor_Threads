import React from "react";

import cdimg from "../assets/hero8.png";
import card1 from "../assets/card1.png"
import card2 from "../assets/card2.jpg"

const details ={
  
}

const cardDetails = [
  {
    img: card1,
    product_name: "leather hoodie",
    price: 59,
  },
  {
    img: cdimg,
    product_name: "grey hoodie",
    price: 59,
  },
  {
    img: card2,
    product_name: "white hoodie",
    price: 59,
  },
  {
    img: cdimg,
    product_name: "black hoodie",
    price: 59,
  },
   {
    img: card1,
    product_name: "leather hoodie",
    price: 59,
  },
  {
    img: cdimg,
    product_name: "grey hoodie",
    price: 59,
  },
  {
    img: card2,
    product_name: "white hoodie",
    price: 59,
  },
  {
    img: cdimg,
    product_name: "black hoodie",
    price: 59,
  },
];

const shop = () => {
  return (
    <>
 <div className="w-full px-10 py-6 mt-5 ml-5 mr-10 rounded-2xl">

  {/* Product Grid */}
  <div className="grid grid-cols-4 gap-6">

    {cardDetails.map((item, index) => (

      <div
        key={index}
        className="group overflow-hidden rounded-xl bg-[#EAE2D6] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={item.img}
            alt={item.product_name}
            className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>


        {/* Product Details */}
        <div className="p-5">

          <h3 className="text-lg font-semibold capitalize text-[#2F3A25]">
            {item.product_name}
          </h3>

          <div className="mt-3 flex items-center justify-between">

            <p className="text-base font-medium text-[#2F3A25]">
              ₹{item.price}
            </p>

            <button className="text-sm font-medium text-[#2F3A25] underline underline-offset-4 transition hover:opacity-60">
              View Product
            </button>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
    </>
  );
};

export default shop;
