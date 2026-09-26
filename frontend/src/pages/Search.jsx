import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import axios from "axios";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const BASE_URL = "http://localhost:8000";

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/shop`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  //   const filteredProducts = products.filter((product) => {
  //     const search = searchText.toLowerCase().trim();

  //     if (!search) {
  //       return false;
  //     }

  const filteredProducts = products.filter((product) => {
    const search = searchText.toLowerCase().trim();

    const matchesCategory =
      !category || product.category?.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      !search ||
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });
  return (
    <div className="min-h-screen bg-[#F7F2EB] px-6 py-10 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        {/* <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#2F3A25]">
          Search
        </h1> */}

        <p className="text-4xl md:text-5xl font-light tracking-wide text-[#2F3A25]">
          Find something you love.
        </p>

        {/* Search Box */}
        <div className="relative mt-8">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[#D8D2C8] bg-white px-6 py-4 pr-14 text-[#2F3A25] outline-none transition focus:border-[#8B9A6E]"
            autoFocus
          />

          {/* Search Icon */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-[#2F3A25]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.5-4.5m0 0A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.5 10.5Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto mt-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : searchText.trim() === "" && !category ? (
          <p className="text-center text-gray-500">
           
          </p>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-[#2F3A25]">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching for another product or category.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-[#EAE2D6]">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      {product.category}
                    </p>

                    <h2 className="mt-1 text-lg font-medium text-[#2F3A25]">
                      {product.name}
                    </h2>

                    <p className="mt-2 font-medium text-[#3A362F]">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
