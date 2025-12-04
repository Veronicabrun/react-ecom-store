// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Brand / logo */}
        <div className={styles.brand}>
          <span className={styles.brandLeft}>Nordic</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span className={styles.brandRight}>Ecom</span>
        </div>

        {/* Kontakt-seksjon */}
        <div className={styles.contact}>
          <Link to="/contact" className={styles.contactLink}>
            Contact us
          </Link>

          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              {/* Enkel “mail”-ikon */}
              <span className={styles.contactIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <polyline points="4,7 12,12.5 20,7" />
                </svg>
              </span>
              <a
                href="mailto:support@nordicecom.com"
                className={styles.contactText}
              >
                support@nordicecom.com
              </a>
            </div>

            <div className={styles.contactItem}>
              {/* Enkel telefon-ikon */}
              <span className={styles.contactIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8.5 3.5 6 5.5c0 6.2 4.8 11 11 11l2-2.6-2-4.1-3.3.9a8.4 8.4 0 0 1-3.1-3.1l.9-3.3-4-1.8Z" />
                </svg>
              </span>
              <a href="tel:+4768900202" className={styles.contactText}>
                +47 68 900 202
              </a>
            </div>
          </div>
        </div>

        {/* Sosiale medier (placeholder-knapper foreløpig) */}
        <div className={styles.social}>
          <span className={styles.socialLabel}>Follow us</span>
          <div className={styles.socialIcons}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Instagram (coming soon)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17" cy="7" r="1.3" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Twitter (coming soon)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 5.5L9.8 5l3.2 4.6L16.8 5 19 5.4l-5 6.1 5.3 7.1-3.8.4-3.3-4.8-3.6 4.5L5 19.3 10 13 6 5.5Z" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Facebook (coming soon)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M13.5 21v-6h2.1l.4-3H13.5V9.5c0-.9.3-1.5 1.5-1.5h1.2V6.1C15.7 6 14.9 6 14 6c-2.2 0-3.5 1.3-3.5 3.7V12H8v3h2.5v6h3Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <small className={styles.copy}>
          © {new Date().getFullYear()} Nordic Ecom. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
