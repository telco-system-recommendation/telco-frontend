import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "../services/authApi";

const CartContext = createContext();

// kunci utama di localStorage
const CART_STORE_KEY = "telcoreco_cart_by_user_v1";

// dapatkan key user saat ini (userId atau 'guest')
const getCurrentUserKey = () => {
  const session = getSession();
  const userId = session?.user?.id;
  return userId || "guest";
};

// baca store dari localStorage
const loadCartStore = () => {
  if (typeof window === "undefined") return { byUser: {} };

  try {
    const raw = window.localStorage.getItem(CART_STORE_KEY);
    if (!raw) return { byUser: {} };

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.byUser) {
      return parsed;
    }

    return { byUser: {} };
  } catch (err) {
    console.error("Failed to parse cart store from localStorage", err);
    return { byUser: {} };
  }
};


const saveCartStore = (store) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORE_KEY, JSON.stringify(store));
  } catch (err) {
    console.error("Failed to save cart store to localStorage", err);
  }
};

export const CartProvider = ({ children }) => {
  // key user saat ini (userId atau 'guest')
  const [userKey, setUserKey] = useState(() => getCurrentUserKey());

  // items di cart untuk userKey saat ini
  const [items, setItems] = useState(() => {
    const store = loadCartStore();
    const key = getCurrentUserKey();
    const list = store.byUser[key];
    return Array.isArray(list)
      ? list.map((p) => ({
          ...p,
          id: p.id ?? p.product_id,
          quantity: p.quantity ?? 1,
        }))
      : [];
  });

  // setiap items berubah → simpan ke store[userKey]
  useEffect(() => {
    const store = loadCartStore();
    const key = userKey;

    store.byUser[key] = (items || []).map((p) => ({
      ...p,
      id: p.id ?? p.product_id,
      quantity: p.quantity ?? 1,
    }));

    saveCartStore(store);
  }, [items, userKey]);

  
  const syncCartUser = () => {
    const newKey = getCurrentUserKey();

    setUserKey((prevKey) => {
      if (prevKey === newKey) return prevKey;

      const store = loadCartStore();
      const list = store.byUser[newKey];

      setItems(
        Array.isArray(list)
          ? list.map((p) => ({
              ...p,
              id: p.id ?? p.product_id,
              quantity: p.quantity ?? 1,
            }))
          : []
      );

      return newKey;
    });
  };

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const key = product.id ?? product.product_id;
      if (!key) {
        console.warn("Product without id/product_id added to cart:", product);
        return prev;
      }

      const existing = prev.find((p) => p.id === key);
      if (existing) {
        return prev.map((p) =>
          p.id === key ? { ...p, quantity: p.quantity + qty } : p
        );
      }

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
    const store = loadCartStore();
    store.byUser[userKey] = [];
    saveCartStore(store);
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
        syncCartUser, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
