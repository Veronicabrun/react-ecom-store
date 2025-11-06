import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product }) {
  const { id, title, image, price, discountedPrice } = product;

  const hasDiscount = discountedPrice < price;
  const discountPct = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  const fallbackImg = "https://via.placeholder.com/800x600?text=No+Image";
  const src = image?.url || fallbackImg;
  const alt = image?.alt || title;

  return (
    <article className={styles.card}>
      <Link to={`/product/${id}`} className={styles.media} aria-label={`Open ${title}`}>
        <img src={src} alt={alt} loading="lazy" />
        {hasDiscount && <span className={styles.badge}>-{discountPct}%</span>}
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>

        <div className={styles.prices}>
          <span className={styles.now}>{discountedPrice.toFixed(2)} kr</span>
          {hasDiscount && <span className={styles.before}>{price.toFixed(2)} kr</span>}
        </div>

        <div className={styles.actions}>
          <Link to={`/product/${id}`} className={styles.btn}>
            View product
          </Link>
        </div>
      </div>
    </article>
  );
}
