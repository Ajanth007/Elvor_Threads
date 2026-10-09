import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Check, PackageSearch } from "lucide-react";
import { useCart } from "../context/CartContext";
import { apiURL } from "../config/env";

const api = apiURL.Url

/**
 * Shop grid — premium/editorial styling on top of your existing /shop fetch.
 *
 * Optional fields this now looks for on each product (all safely optional —
 * nothing breaks if your API doesn't send them yet):
 *   item.tag           -> string badge, e.g. "New" or "Sale"
 *   item.originalPrice -> number; shown struck through next to item.price when higher
 *   item.colors        -> array of hex strings, e.g. ["#2F3A25", "#8B9A6E", "#EAE2D6"]
 *
 * If your /shop response doesn't include these yet, the UI just quietly
 * skips that part of the card — no crash, nothing missing-looking.
 */

const SKELETON_COUNT = 8;

const Shop = () => {
  const { addToCart } = useCart();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null); // tracks which card's "Add to Cart" just fired

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${api}/shop`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ASSUMPTION: adjust the endpoint/body to match your real cart route
  // (your existing controller reads the cart from the DB by user, so this
  // likely needs { product_id, quantity } against POST /cart).
 const handleAddToCart = async (e, item) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    setAddedId(item.id);

    await addToCart(
      item,
      quantity,
      selectedSizes[item.id] || "M"
    );

    window.setTimeout(() => setAddedId(null), 1500);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div
      className="max-w-full px-6 py-10 mt-5 sm:px-10 overflow-x-hidden"
      style={{ backgroundColor: "#F7F2EB" }}
    >
      {/* Editorial header */}
      <div className="mb-10 flex flex-col  pb-6">
        <h1
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ color: "#2F3A25" }}
        >
          Shop
        </h1>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-xl"
              style={{ backgroundColor: "#EAE2D6" }}
            >
              <div
                className="h-80 w-full"
                style={{ backgroundColor: "#DCD2C0" }}
              />
              <div className="space-y-3 p-5">
                <div
                  className="h-4 w-2/3 rounded"
                  style={{ backgroundColor: "#DCD2C0" }}
                />
                <div
                  className="h-4 w-1/3 rounded"
                  style={{ backgroundColor: "#DCD2C0" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && details.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <PackageSearch
            className="h-10 w-10"
            style={{ color: "#8B9A6E" }}
            strokeWidth={1.5}
          />
          <p className="text-lg font-medium" style={{ color: "#2F3A25" }}>
            No products to show right now
          </p>
          <p className="text-sm" style={{ color: "#3A362F" }}>
            Check back soon — new pieces are added regularly.
          </p>
        </div>
      )}

      {/* Product grid */}
      {!loading && details.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item) => {
            const hasDiscount =
              item.originalPrice &&
              Number(item.originalPrice) > Number(item.price);
            const justAdded = addedId === item.id;

            return (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="group relative block min-w-0 overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#EAE2D6" }}
              >
                {/* Badge */}
                {item.tag && (
                  <span
                    className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor:
                        item.tag.toLowerCase() === "sale"
                          ? "#B3432C"
                          : "#2F3A25",
                      color: "#F7F2EB",
                    }}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Product Image */}
                <div className="relative w-full overflow-hidden">
                  <img
                    src={`${api}${item.image}`}
                    alt={item.name}
                    className="block h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Quick Add */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-center bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        backgroundColor: justAdded ? "#8B9A6E" : "#F7F2EB",
                        color: justAdded ? "#F7F2EB" : "#2F3A25",
                      }}
                    >
                      {justAdded ? (
                        <>
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {/* Product Name */}
                  <h3
                    className="line-clamp-1 text-lg font-semibold capitalize tracking-tight"
                    style={{ color: "#2F3A25" }}
                  >
                    {item.name}
                  </h3>

                  {/* Color Swatches */}
                  {Array.isArray(item.colors) && item.colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      {item.colors.map((color, i) => (
                        <span
                          key={i}
                          className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex justify-between">
                    <div className="mt-4 flex items-baseline gap-2">
                      <p
                        className="text-lg font-semibold"
                        style={{ color: "#2F3A25" }}
                      >
                        ₹{item.price}
                      </p>

                      {hasDiscount && (
                        <p
                          className="text-sm line-through"
                          style={{ color: "#8A8275" }}
                        >
                          ₹{item.originalPrice}
                        </p>
                      )}
                    </div>

                    {/* Sizes */}
                    <div className="mt-4">
                      <div className="flex gap-2">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.id]: size,
                              }));
                            }}
                            className={`flex h-8 w-9 items-center justify-center rounded-md border text-xs font-medium transition-all duration-200 ${
                              selectedSizes[item.id] === size
                                ? "border-[#2F3A25] bg-[#2F3A25] text-white"
                                : "border-[#D4CEC3] bg-[#F7F2EB] text-[#2F3A25] hover:border-[#2F3A25]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;
