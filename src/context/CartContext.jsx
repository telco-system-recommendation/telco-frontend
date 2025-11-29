import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_KEY = "telcoreco_cart_v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) return [];

      // pastikan setiap item punya id unik
      return parsed.map((p) => ({
        ...p,
        id: p.id ?? p.product_id,
        quantity: p.quantity ?? 1,
      }));
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
      return [];
    }
  });

  // simpan ke localStorage setiap berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const key = product.id ?? product.product_id;
      if (!key) {
        console.warn("Product without id/product_id added to cart:", product);
        return prev;
      }

      const existing = prev.find((p) => p.id === key);

      if (existing) {
        // kalau produk dengan id yang sama sudah ada → tambah quantity
        return prev.map((p) =>
          p.id === key ? { ...p, quantity: p.quantity + qty } : p
        );
      }

      // item baru
      return [
        ...prev,
        {
          id: key,
          product_id: product.product_id ?? product.id ?? key,
          name: product.name,
          price: product.price,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      window.localStorage.removeItem(CART_KEY);
    } catch (err) {
      console.error("Failed to clear cart from localStorage", err);
    }
  };

  const totalItems = items.reduce((sum, p) => sum + (p.quantity || 1), 0);
  const subtotal = items.reduce(
    (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
