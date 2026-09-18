import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const api = "http://localhost:8000";

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] px-6 py-10">
        <div className="mx-auto max-w-6xl">

          <h1 className="text-4xl font-semibold text-[#2F3A25]">
            Your Cart
          </h1>

          <div className="mt-10 rounded-2xl bg-white p-10 text-center">
            <p className="text-lg text-gray-600">
              Your cart is empty.
            </p>

            <button
              onClick={() => (window.location.href = "/shop")}
              className="mt-6 rounded-xl bg-[#2F3A25] px-8 py-3 text-white hover:bg-[#526044]"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] px-6 py-10">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-semibold text-[#2F3A25]">
          Your Cart
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Products */}
          <div className="space-y-5 lg:col-span-2">

            {cartItems.map((item) => (

              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-5 rounded-2xl bg-white p-5"
              >

                {/* Image */}
                <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-[#EAE2D6]">

                  <img
                    src={`${api}${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">

                  <div>

                    <h2 className="text-lg font-semibold text-[#2F3A25]">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>

                    <p className="mt-2 font-medium text-[#2F3A25]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    {/* Quantity */}
                    <div className="flex h-10 items-center rounded-lg border border-gray-300">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="px-3 text-lg text-[#2F3A25]"
                      >
                        −
                      </button>

                      <span className="px-3 text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= item.stock}
                        className="px-3 text-lg text-[#2F3A25] disabled:text-gray-300"
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size)
                      }
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6">

            <h2 className="text-xl font-semibold text-[#2F3A25]">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-gray-600">
              <span>Shipping</span>

              <span>
                Free
              </span>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex justify-between text-lg font-semibold text-[#2F3A25]">

              <span>Total</span>

              <span>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>

            <button
              onClick={() => (window.location.href = "/checkout")}
              className="mt-6 h-14 w-full rounded-xl bg-[#2F3A25] text-white transition hover:bg-[#526044]"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;