import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const api = "http://localhost:8000";

const Shop = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${api}/shop`);
        const data = await response.json();
        console.log("Frontend");
        console.log(details);
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <div className="max-w-full px-10 py-6 mt-5 ml-6 mr-5 rounded-2xl overflow-x-hidden">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full">
          {details.map((item) => (
            <div
              key={item.id}
              className="group min-w-0 rounded-xl bg-[#EAE2D6] transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              {/* Image */}
              <div className="w-full overflow-hidden">
                <img
                  src={`${api}${item.image}`}
                  alt={item.name}
                  className="block w-full h-80 object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold capitalize text-[#2F3A25]">
                  {item.name}
                </h3>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-base font-medium text-[#2F3A25]">
                    ₹{item.price}
                  </p>

                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm font-medium text-[#2F3A25] underline underline-offset-4 transition hover:opacity-60"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
