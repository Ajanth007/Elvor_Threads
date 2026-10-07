import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product, quantity, selectedSize) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.log("User is not logged in");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/cart",
        {
          userId: userId,
          productId: product.id,
          quantity: quantity,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Backend response:", response.data);
      console.log(cartItems)

      setCartItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id && item.size === selectedSize,
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id && item.size === selectedSize
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  size: selectedSize,
                }
              : item,
          );
        }

        return [
          ...currentItems,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            size: selectedSize,
            quantity: quantity,
            stock: product.stock,
          },
        ];
      });
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message,
      );
    }
  };

  // const removeFromCart = (id, size) => {
  //   setCartItems((currentItems) =>
  //     currentItems.filter(
  //       (item) => !(item.id === id && item.size === size)
  //     )
  //   );
  // };

  const removeFromCart = async (id, size) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("User is not logged in");
        return;
      }

      const response = await axios.delete(`http://localhost:8000/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Remove from cart response:", response.data);

      // Update frontend cart after successful backend deletion
      setCartItems((currentItems) =>
        currentItems.filter((item) => !(item.id === id && item.size === size)),
      );
    } catch (error) {
      console.error(
        "Remove from cart error:",
        error.response?.data || error.message,
      );
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await axios.put(
        `http://localhost:8000/cart/${id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(newQuantity, item.stock),
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(
        "Update cart error:",
        error.response?.data || error.message,
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartItems([]);
        return;
      }

      const response = await axios.get("http://localhost:8000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedCart = response.data.map((item) => ({
        id: item.product_id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        stock: item.stock,
      }));

      setCartItems(formattedCart);
    } catch (error) {
      console.error("Fetch cart error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
