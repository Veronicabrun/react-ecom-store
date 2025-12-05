// src/components/BannerHome/BannerHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./BannerHome.module.scss";

// 🔹 Lokalt banner-bilde
import heroImg from "../../images/bannerHome.jpg"; // endre til .jpeg/.png hvis det er det du har

export default function BannerHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* HØYRE: stort bilde (tar litt mer enn halvparten) */}
        <div className={styles.media} aria-hidden="true">
          <img src={heroImg} alt="Selection of lifestyle products" />
        </div>

        {/* VENSTRE: tekst + knapper */}
        <div className={styles.text}>
          <p className={styles.eyebrow}>Fresh picks</p>

          <h1 className={styles.title}>Find what fits your everyday.</h1>

          <p className={styles.lead}>
            Shop clothing, beauty, tech and home essentials — all in one place.
          </p>

          <div className={styles.actions}>
            <a href="#products" className={styles.primaryBtn}>
              Browse products
            </a>

            <Link to="/contact" className={styles.secondaryBtn}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
