import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CartPage.module.scss";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    increase,
    decrease,
    removeFromCart,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout-success");
  };

  if (cartItems.length === 0) {
    return (
      <section className={styles.page}>
        <h1 className={styles.h1}>Your Cart</h1>
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/" className={styles.back}>
            Go back to store
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.h1}>Your Cart</h1>

      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <img className={styles.thumb} src={item.imageUrl} alt={item.title} />

            <div className={styles.info}>
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.unitPrice}>{item.price.toFixed(2)} kr pr stk</div>
            </div>

            <div className={styles.qtyControls}>
              <button
                className={styles.qtyBtn}
                onClick={() => decrease(item.id)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                –
              </button>
              <span className={styles.qtyValue}>{item.qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => increase(item.id)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <div className={styles.line}>
              {(item.price * item.qty).toFixed(2)} kr
            </div>

            <button
              className={styles.remove}
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.title} from cart`}
              title="Remove item"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v7M14 11v7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <div className={styles.total}>
          Total: <strong>{cartTotal.toFixed(2)} kr</strong>
        </div>

        <button className={styles.checkout} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
}
