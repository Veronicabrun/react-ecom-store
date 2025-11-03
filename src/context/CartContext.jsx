import React, { createContext, useState, useContext } from "react";

// 1️⃣ Opprett Context
const CartContext = createContext();

// 2️⃣ Opprett en "Provider"-komponent
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Legg til et produkt i handlekurven
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Fjern et produkt fra handlekurven
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Tøm handlekurven
  const clearCart = () => {
    setCartItems([]);
  };

  // Totalt antall varer i handlekurven
  const cartCount = cartItems.length;

  // Returner "Provider" slik at alle barn får tilgang
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ En liten "custom hook" for enklere bruk i komponenter
export const useCart = () => useContext(CartContext);
