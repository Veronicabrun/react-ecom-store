// src/components/CartIcon/CartIcon.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartIcon.module.scss";
import { useCart } from "../../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Open cart"
      onClick={() => navigate("/cart")}
    >
      {/* Moderne shopping bag-ikon */}
      <svg
        className={styles.icon}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Posekropp */}
        <path
          d="M5 8.5h14l-1.2 11a2 2 0 0 1-2 1.5H8.2a2 2 0 0 1-2-1.5L5 8.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Håndtak */}
        <path
          d="M8.5 8.5V7.6a3.5 3.5 0 0 1 7 0v0.9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Små nagler under håndtaket – valgfritt, gir “luksus”-følelse */}
        <circle cx="9" cy="10.2" r="0.7" fill="currentColor" />
        <circle cx="15" cy="10.2" r="0.7" fill="currentColor" />
      </svg>

      <span className={styles.badge} aria-live="polite">{cartCount}</span>
    </button>
  );
}

