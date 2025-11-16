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
  if (error || !data)
    return <div className={styles.state}>Could not load product.</div>;

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
  const discountPct = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  function handleAdd() {
    addToCart({
      id: pid,
      title,
      price: discountedPrice,
      imageUrl: image?.url || null,
      qty: 1,
    });

    // Vis toast-melding
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  const fallbackImg = "https://via.placeholder.com/600x400?text=No+Image";
  const src = image?.url || fallbackImg;
  const alt = image?.alt || title;

  return (
    <div className={styles.page}>
      {/* ✅ Toast med moderne handlekurv-ikon */}
      {showToast && (
        <div className={styles.toast}>
          <div className={styles.toastIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
          {hasDiscount && (
            <span className={styles.badge}>-{discountPct}%</span>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.prices}>
            <span className={styles.now}>{discountedPrice.toFixed(2)} kr</span>
            {hasDiscount && (
              <span className={styles.before}>{price.toFixed(2)} kr</span>
            )}
          </div>

          <p className={styles.desc}>{description}</p>

          <button className={styles.btn} onClick={handleAdd}>
            Add to cart
          </button>
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
