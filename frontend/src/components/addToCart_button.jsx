import { useState } from "react";
import { ShoppingCart, ArrowRight, Check } from "lucide-react";

/**
 * Premium "Add to Cart" button, built for this palette:
 *   --cream : #F7F2EB  (page background)
 *   --sand  : #EAE2D6  (card / section background)
 *   --sage  : #8B9A6E  (brand CTA green)
 *   --ink   : #2B3324  (dark neutral, footer-adjacent — used as the idle button color)
 *
 * Sequence on click (two distinct beats, not simultaneous):
 *   1. CENTERING — the cart glides from the left edge to dead-center.
 *      Nothing else changes yet; the arrow simply fades out of the way.
 *   2. FILL + CONFIRM — once the cart has arrived at center, it "fills"
 *      (outline -> solid), the background morphs to sage green, and the
 *      label swaps to "Added to Cart".
 *   Then it resets to idle after a short hold.
 *
 * Usage:
 *   <AddToCartButton onAdd={() => addItemToCart(product)} />
 */
export default function AddToCartButton({ onAdd, label = "Add to Cart" }) {
  // idle -> centering -> filled -> idle
  const [status, setStatus] = useState("idle");

  const CENTER_MS = 450; // beat 1: cart travel time
  const HOLD_MS = 1200; // how long "Added to Cart" stays up

  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("centering");

    // beat 1 finishes -> begin beat 2 (fill + green + label)
    window.setTimeout(() => {
      setStatus("filled");
      onAdd?.();
    }, CENTER_MS);

    // reset back to idle
    window.setTimeout(() => setStatus("idle"), CENTER_MS + HOLD_MS);
  };

  const isCentering = status === "centering";
  const isFilled = status === "filled";
  const isBusy = isCentering || isFilled;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBusy}
      aria-live="polite"
      className={[
        "group relative isolate flex h-14 w-64 items-center overflow-hidden rounded-2xl px-5",
        "font-semibold tracking-tight shadow-lg shadow-black/10",
        "transition-colors duration-500 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2","mt-4"
      ].join(" ")}
      style={{
        backgroundColor: isFilled ? "#8B9A6E" : "#2B3324",
        color: "#F7F2EB",
      }}
    >
      {/* sage wash that sweeps in from the center — only once beat 2 starts */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 rounded-2xl transition-transform duration-500 ease-out",
          isFilled ? "scale-100" : "scale-0",
        ].join(" ")}
        style={{ backgroundColor: "#8B9A6E", transformOrigin: "center" }}
      />

      {/* cart icon: beat 1 slides it to center, beat 2 fills it in */}
      <span
        className={[
          "absolute z-10 flex items-center justify-center transition-all ease-out",
          isBusy ? "left-1/2 -translate-x-1/2 duration-500" : "left-5 translate-x-0 duration-300",
        ].join(" ")}
      >
        {isFilled ? (
        //   <Check className="h-5 w-5 text-current" strokeWidth={3} />
        <p> </p>
        ) : (
          <ShoppingCart
            className={[
              "h-5 w-5 text-current transition-transform duration-300 ease-out",
              isCentering ? "scale-110" : "scale-100",
            ].join(" ")}
            // fills itself only once it has arrived at center
            fill={isFilled ? "currentColor" : "none"}
            strokeWidth={2}
          />
        )}
      </span>

      {/* idle label */}
      <span
        className={[
          "z-10 mx-auto text-[15px] transition-all duration-300 ease-out",
          isBusy ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        {label}
      </span>

      {/* confirmation label — only fades in during beat 2 */}
      <span
        className={[
          "pointer-events-none absolute inset-0 z-10 flex items-center justify-center pl-6",
          "text-[15px] transition-all duration-300 ease-out",
          isFilled ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-1",
        ].join(" ")}
      >
        Added to Cart
      </span>

      {/* arrow: fades out as soon as beat 1 starts */}
      <span
        className={[
          "absolute right-5 z-10 transition-all duration-300 ease-out",
          isBusy ? "opacity-0 translate-x-1" : "opacity-100 translate-x-0 group-hover:translate-x-0.5",
        ].join(" ")}
      >
        <ArrowRight className="h-5 w-5 text-current" strokeWidth={2} />
      </span>
    </button>
  );
}