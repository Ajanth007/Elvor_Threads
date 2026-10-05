import { useEffect, useMemo, useState } from "react";
import { Truck, ShoppingBag } from "lucide-react";
import axios from "axios";

/**
 * Checkout page wired to the provided Express/MySQL order endpoints:
 *   GET  /api/cart    -> list of cart rows (see assumption below)
 *   POST /api/orders  -> createOrder (reads the cart server-side, ignores request body)
 *
 * No payment step — this page only collects shipping info, then places the order.
 *
 * IMPORTANT — read before wiring this up, because it changes what "works" means here:
 *
 * 1. `createOrder` takes NO body. It rebuilds the order entirely from the cart
 *    rows already in the database for req.user.id. So "Place order" is a bare
 *    authenticated `POST /api/orders` — it can't send items or shipping even
 *    if it wanted to, under the current controller.
 *
 * 2. `totalAmount` on the server is strictly `sum(price * quantity)` from the
 *    cart. It does NOT add shipping or tax. The subtotal/shipping/tax/total
 *    shown in this UI are an ESTIMATE for the shopper; the authoritative
 *    number is whatever `POST /api/orders` returns.
 *
 * 3. The `orders` table (per the controller) only has user_id, total_amount,
 *    status, created_at — there's nowhere to persist a shipping address yet.
 *    This page still collects it so the UX is complete, but as the code
 *    stands it isn't sent anywhere. See the BACKEND TODO comment near the
 *    submit handler for the minimal schema/controller change to store it.
 *
 * 4. GET /api/cart isn't in the controller you shared (only createOrder,
 *    getOrders, getOrderById). This assumes a sibling endpoint that returns
 *    cart rows shaped like the ones `createOrder` itself reads:
 *      { id, product_id, name, price, image, stock, size, quantity }
 *    Adjust CART_ENDPOINT / the mapping below if your actual route or shape differs.
 */

const API_BASE_URL = "http://localhost:8000"; // BACKEND: point at your real API origin (or use an env var)
const CART_ENDPOINT = `${API_BASE_URL}/cart`;
const ORDERS_ENDPOINT = `${API_BASE_URL}/order`;

const SHIPPING_FLAT_RATE = 8; // BACKEND: estimate only — server total doesn't include this yet
const TAX_RATE = 0.0825; // BACKEND: estimate only — server total doesn't include this yet

// BACKEND: match however your auth middleware expects the token (header name, cookie, etc.)
function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartStatus, setCartStatus] = useState("loading"); // loading | ready | error
  const [cartError, setCartError] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [orderResult, setOrderResult] = useState(null); // { orderId, totalAmount } from the server

  // 1. Load the cart from the server on mount.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(CART_ENDPOINT, { headers: authHeaders() });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Could not load your cart");
        }
        const data = await res.json();
        if (!cancelled) {
          setCartItems(data);
          setCartStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setCartError(err.message);
          setCartStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0,
      ),
    [cartItems],
  );
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const estimatedTotal =
    subtotal + (cartItems.length ? SHIPPING_FLAT_RATE : 0) + tax;

  const updateShipping = (field) => (e) =>
    setShipping((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    // if (!shipping.fullName.trim()) next.fullName = "Enter your full name";
    // if (!/^\S+@\S+\.\S+$/.test(shipping.email)) next.email = "Enter a valid email";
    // if (!shipping.address.trim()) next.address = "Enter your street address";
    // if (!shipping.city.trim()) next.city = "Enter your city";
    // if (!shipping.state.trim()) next.state = "Enter your state";
    // if (!/^\d{5}(-\d{4})?$/.test(shipping.zip)) next.zip = "Enter a valid ZIP code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) return; // mirrors the server's "Cart is empty" check
//     if (!validate()) return;

//     setStatus("submitting");

//     try {
//       const response = await axios.post(
//         ORDERS_ENDPOINT,
//         {
//           shippingAddress: shipping,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             ...authHeaders(),
//           },
//         },
//       );

//       const body = response.data;

//       setOrderResult({
//         orderId: body.orderId,
//         totalAmount: body.totalAmount,
//       });

//       setStatus("success");

//       // Backend already clears the cart
//       setCartItems([]);
//     } catch (err) {
//       setStatus("error");

//       setErrors((prev) => ({
//         ...prev,
//         submit:
//           err.response?.data?.message || err.message || "Error creating order",
//       }));
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("===== CREATE ORDER START =====");
  console.log("Cart items:", cartItems);

  if (cartItems.length === 0) {
    console.log("Order stopped: Cart is empty");
    return;
  }

  if (!validate()) {
    console.log("Order stopped: Validation failed");
    return;
  }

  setStatus("submitting");

  console.log("Order status: submitting");
  console.log("Orders endpoint:", ORDERS_ENDPOINT);

  const token = localStorage.getItem("token");
  console.log("Token exists:", !!token);

  try {
    console.log("Sending POST request to:", ORDERS_ENDPOINT);

    const response = await axios.post(
      ORDERS_ENDPOINT,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      }
    );

    console.log("Order request successful");
    console.log("Status:", response.status);
    console.log("Response data:", response.data);

    const body = response.data;

    console.log("Order ID:", body.orderId);
    console.log("Total amount:", body.totalAmount);

    setOrderResult({
      orderId: body.orderId,
      totalAmount: body.totalAmount,
    });

    setStatus("success");

    console.log("Order status: success");
    console.log("Clearing cart...");

    setCartItems([]);

    console.log("===== CREATE ORDER END =====");

  } catch (err) {
    console.error("===== CREATE ORDER FAILED =====");
    console.error("Error:", err);
    console.error("Error message:", err.message);
    console.error("Response status:", err.response?.status);
    console.error("Response data:", err.response?.data);
    console.error("Request URL:", err.config?.url);

    setStatus("error");

    setErrors((prev) => ({
      ...prev,
      submit:
        err.response?.data?.message ||
        err.message ||
        "Error creating order",
    }));
  }
};

  if (status === "success" && orderResult) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{ backgroundColor: "#F7F2EB" }}
      >
        <div className="max-w-md text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "#8B9A6E" }}
          >
            <ShoppingBag
              className="h-6 w-6"
              style={{ color: "#F7F2EB" }}
              strokeWidth={2}
            />
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: "#2B3324" }}>
            Order placed
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#5B6653" }}>
            Order #{orderResult.orderId} · $
            {Number(orderResult.totalAmount).toFixed(2)}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#5B6653" }}>
            A confirmation is on its way to {shipping.email || "your inbox"}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-8"
      style={{ backgroundColor: "#F7F2EB", color: "#2B3324" }}
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        {cartStatus === "error" && (
          <p
            className="mt-4 rounded-lg px-4 py-3 text-sm"
            style={{ backgroundColor: "#F3E3D8", color: "#B3532C" }}
          >
            {cartError}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]"
        >
          {/* Left column: shipping */}
          <div className="space-y-10">
            <section>
              <h2
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#5B6653" }}
              >
                <Truck className="h-4 w-4" />
                Shipping address
              </h2>
              <p className="mt-1 text-xs" style={{ color: "#5B6653" }}>
                Not yet saved to the order — the backend has no column for it
                yet (see file header).
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  error={errors.fullName}
                  className="sm:col-span-2"
                >
                  <input
                    value={shipping.fullName}
                    onChange={updateShipping("fullName")}
                    className={inputClass(errors.fullName)}
                    placeholder="Jordan Avery"
                  />
                </Field>
                <Field
                  label="Email"
                  error={errors.email}
                  className="sm:col-span-2"
                >
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={updateShipping("email")}
                    className={inputClass(errors.email)}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field
                  label="Address"
                  error={errors.address}
                  className="sm:col-span-2"
                >
                  <input
                    value={shipping.address}
                    onChange={updateShipping("address")}
                    className={inputClass(errors.address)}
                    placeholder="Street address"
                  />
                </Field>
                <Field label="Apt / suite (optional)">
                  <input
                    value={shipping.apt}
                    onChange={updateShipping("apt")}
                    className={inputClass()}
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input
                    value={shipping.phone}
                    onChange={updateShipping("phone")}
                    className={inputClass()}
                  />
                </Field>
                <Field label="City" error={errors.city}>
                  <input
                    value={shipping.city}
                    onChange={updateShipping("city")}
                    className={inputClass(errors.city)}
                  />
                </Field>
                <Field label="State" error={errors.state}>
                  <input
                    value={shipping.state}
                    onChange={updateShipping("state")}
                    className={inputClass(errors.state)}
                  />
                </Field>
                <Field label="ZIP code" error={errors.zip}>
                  <input
                    value={shipping.zip}
                    onChange={updateShipping("zip")}
                    className={inputClass(errors.zip)}
                    placeholder="94110"
                  />
                </Field>
              </div>
            </section>
          </div>

          {/* Right column: order summary, sourced from the real cart */}
          <aside
            className="h-fit rounded-2xl p-6"
            style={{ backgroundColor: "#EAE2D6" }}
          >
            <h2
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: "#5B6653" }}
            >
              Order summary
            </h2>

            {cartStatus === "loading" && (
              <p className="mt-4 text-sm" style={{ color: "#5B6653" }}>
                Loading your cart…
              </p>
            )}

            {cartStatus === "ready" && cartItems.length === 0 && (
              <p className="mt-4 text-sm" style={{ color: "#5B6653" }}>
                Your cart is empty.
              </p>
            )}

            <ul className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-12 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div
                      className="h-14 w-12 shrink-0 rounded-md"
                      style={{ backgroundColor: "#F7F2EB" }}
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs" style={{ color: "#5B6653" }}>
                      Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 space-y-2 border-t pt-4 text-sm"
              style={{ borderColor: "#D9CFBE" }}
            >
              <Row label="Subtotal" value={subtotal} />
              <Row
                label="Shipping (est.)"
                value={cartItems.length ? SHIPPING_FLAT_RATE : 0}
              />
              <Row label="Tax (est.)" value={tax} />
              <div
                className="flex items-center justify-between border-t pt-2 text-base font-semibold"
                style={{ borderColor: "#D9CFBE" }}
              >
                <span>Estimated total</span>
                <span>${estimatedTotal.toFixed(2)}</span>
              </div>
              <p
                className="pt-1 text-[11px] leading-snug"
                style={{ color: "#8A8275" }}
              >
                The amount actually charged by the server is subtotal only —
                shipping and tax aren't added server-side yet.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                status === "submitting" ||
                cartStatus !== "ready" ||
                cartItems.length === 0
              }
              className="mt-6 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#2B3324", color: "#F7F2EB" }}
            >
              {status === "submitting"
                ? "Placing order…"
                : `Place order · $${subtotal.toFixed(2)}`}
            </button>

            {status === "error" && (
              <p className="mt-3 text-xs" style={{ color: "#B3532C" }}>
                {errors.submit}
              </p>
            )}
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium" style={{ color: "#2B3324" }}>
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs" style={{ color: "#B3532C" }}>
          {error}
        </span>
      )}
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ color: "#5B6653" }}
    >
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

function inputClass(error) {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-colors",
    "focus:ring-2 focus:ring-offset-0",
    error
      ? "border-[#B3532C] focus:ring-[#B3532C]/30"
      : "border-[#D9CFBE] focus:ring-[#8B9A6E]/40",
  ].join(" ");
}
