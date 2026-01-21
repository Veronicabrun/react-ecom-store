// src/components/BannerHome/BannerHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./BannerHome.module.scss";

//  Local banner image
import heroImg from "../../images/bannerHome.jpg";

export default function BannerHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* RIGHT: large image (takes up a little more than half) */}
        <div className={styles.media} aria-hidden="true">
          <img src={heroImg} alt="Selection of lifestyle products" />
        </div>

        {/* LEFT: text + buttons */}
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
