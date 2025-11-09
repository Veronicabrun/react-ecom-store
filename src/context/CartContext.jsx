import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Hver vare: { id, title, price, imageUrl, qty }
  const [cartItems, setCartItems] = useState([]);

  // Legg til produkt (slår sammen på id og øker qty)
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const increase = (id) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Badge-tall = sum av qty
  const cartCount = cartItems.reduce((sum, p) => sum + p.qty, 0);
  // Total (nyttig i oppsummering)
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increase,
        decrease,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
