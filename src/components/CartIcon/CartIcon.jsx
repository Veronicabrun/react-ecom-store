import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartIcon.module.scss";
import { useCart } from "../../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();        // ⬅️ henter antall varer
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Open cart"
      onClick={() => navigate("/cart")}
    >
      <svg
        className={styles.icon}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M6 6h15l-1.5 9h-12L5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <span className={styles.badge} aria-live="polite">{cartCount}</span>
    </button>
  );
}

