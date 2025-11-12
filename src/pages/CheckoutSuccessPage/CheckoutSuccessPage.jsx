import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CheckoutSuccessPage.module.scss";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.iconWrap} aria-hidden="true">
        <svg
          className={styles.icon}
          width="80"
          height="80"
          viewBox="0 0 48 48"
          role="img"
        >
          {/* Sirkel med kun stroke (ingen fyll) */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#16a34a"
            strokeWidth="4"
          />
          {/* Hake med kun stroke (ingen fyll) */}
          <path
            d="M14 24l6 6 14-14"
            fill="none"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className={styles.title}>Order Confirmed!</h1>
      <p className={styles.lead}>
        Thank you for your purchase. You will soon receive a confirmation email
        with your order details.
      </p>

      <div className={styles.actions}>
        <Link to="/" className={styles.ctaBtn}>
          SHOP MORE
        </Link>
      </div>
    </section>
  );
}

