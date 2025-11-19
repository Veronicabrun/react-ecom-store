// src/components/Header/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import CartIcon from "../CartIcon/CartIcon";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Go to homepage">
          <span className={styles.brandLeft}>Nordic</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span className={styles.brandRight}>Ecom</span>
        </Link>

        {/* Nav-plass (grid area) */}
        <div className={styles.navContainer}>
          <Nav />
        </div>

        {/* Cart-ikon – holder seg øverst til høyre */}
        <div className={styles.cartContainer}>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

