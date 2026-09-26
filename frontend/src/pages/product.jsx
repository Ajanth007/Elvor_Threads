import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddtocartButton from "../components/addToCart_button"

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const api = "http://localhost:8000";

  useEffect(() => {
    fetch(`${api}/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, [id]);

  // Wait until product data is loaded
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center">
        <p className="text-[#2F3A25]">Loading product...</p>
      </div>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl bg-[#EAE2D6]">
            <img
              src={`${api}${product.image}`}
              alt={product.name}
              className="h-150 w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="text-sm uppercase tracking-[0.2em] text-[#6F7D58]">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-4xl font-semibold text-[#2F3A25]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 text-2xl font-medium text-[#2F3A25]">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-700">
                  In Stock — {product.stock} available
                </p>
              ) : (
                <p className="text-sm font-medium text-red-600">Out of Stock</p>
              )}
            </div>

            {/* Size */}
            <div className="mt-7">
              <p className="mb-3 font-medium text-[#2F3A25]">Select Size</p>

              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 w-14 rounded-lg border text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-[#2F3A25] bg-[#2F3A25] text-white"
                        : "border-gray-300 bg-white text-[#2F3A25] hover:border-[#2F3A25]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-3 font-medium text-[#2F3A25]">Quantity</p>

              <div className="flex h-11 w-32 items-center justify-between rounded-lg border border-gray-300 bg-white">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 text-lg text-[#2F3A25] hover:opacity-60"
                >
                  −
                </button>

                <span className="text-sm font-medium">{quantity}</span>

                <button
                  onClick={increaseQuantity}
                  className="px-4 text-lg text-[#2F3A25] hover:opacity-60"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <AddtocartButton
              disabled={product.stock === 0}
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="mt-8 h-14 w-full rounded-xl bg-[#2F3A25] text-base font-medium text-white transition hover:bg-[#526044] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </AddtocartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
