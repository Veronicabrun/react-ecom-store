// src/components/BannerHome/BannerHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./BannerHome.module.scss";

export default function BannerHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Venstre: tekstkort */}
        <article className={styles.textCard}>
          <p className={styles.eyebrow}>Fresh picks</p>
          <h2 className={styles.title}>
           Find what fits your everyday.
          </h2>
          <p className={styles.lead}>
           Shop clothing, beauty, tech and home essentials — all in one place.
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.primaryBtn}>
              Browse products
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Contact us
            </Link>
          </div>
        </article>

        {/* Høyre: bilde-kort */}
        <figure className={styles.imageCard}>
          <img
            src="https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg"
            alt="People working from home with laptops"
          />
        </figure>
      </div>
    </section>
  );
}
