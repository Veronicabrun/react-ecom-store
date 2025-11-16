// src/pages/ProductPage/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { useCart } from "../../context/CartContext";

const BASE = "https://v2.api.noroff.dev/online-shop";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let active = true;

    async function getProduct() {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`${BASE}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const json = await res.json();
        if (active) setData(json.data ?? json);
      } catch (e) {
        console.error(e);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    getProduct();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className={styles.state}>Loading product…</div>;
  if (error || !data) return <div className={styles.state}>Could not load product.</div>;

  const {
    id: pid,
    title,
    description,
    image,
    price,
    discountedPrice,
    reviews = [],
  } = data;

  const hasDiscount = discountedPrice < price;
  const discountPct = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  function handleAdd() {
    addToCart({
      id: pid,
      title,
      price: discountedPrice,
      imageUrl: image?.url || null,
      qty: 1,
    });

    // Vis toast-melding i 2.5s
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  const fallbackImg = "https://via.placeholder.com/600x400?text=No+Image";
  const src = image?.url || fallbackImg;
  const alt = image?.alt || title;

  return (
    <div className={styles.page}>
      {/* Toast øverst til høyre – bruker samme shopping bag-ikon som CartIcon.jsx */}
      {showToast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <div className={styles.toastIcon} aria-hidden="true">
            <svg
              className={styles.icon}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
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
              {/* Nagler */}
              <circle cx="9" cy="10.2" r="0.7" fill="currentColor" />
              <circle cx="15" cy="10.2" r="0.7" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.toastText}>
            <strong>Added to cart</strong>
            <span>Item successfully added</span>
          </div>
        </div>
      )}

      <div className={styles.wrap}>
        <div className={styles.media}>
          <img src={src} alt={alt} />
          {hasDiscount && <span className={styles.badge}>-{discountPct}%</span>}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.prices}>
            <span className={styles.now}>{discountedPrice.toFixed(2)} kr</span>
            {hasDiscount && <span className={styles.before}>{price.toFixed(2)} kr</span>}
          </div>

          <p className={styles.desc}>{description}</p>

          <button className={styles.btn} onClick={handleAdd}>Add to cart</button>
        </div>
      </div>

      <section className={styles.reviews}>
        <h2 className={styles.h2}>Reviews</h2>
        {reviews.length === 0 ? (
          <p className={styles.muted}>No reviews yet.</p>
        ) : (
          <ul className={styles.reviewList}>
            {reviews.map((r, i) => (
              <li key={i} className={styles.reviewItem}>
                <div className={styles.reviewHead}>
                  <strong>{r.username ?? "Anon"}</strong>
                  {typeof r.rating === "number" && <span>★ {r.rating}</span>}
                </div>
                <p>{r.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
