// src/pages/CheckoutSuccessPage/CheckoutSuccessPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CheckoutSuccessPage.module.scss";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- viktig: tom dependency-array

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Order successful 🎉</h1>
      <p>Your cart has been cleared.</p>
      <Link to="/" className={styles.back}>Back to store</Link>
    </section>
  );
}

