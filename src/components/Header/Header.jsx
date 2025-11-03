import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import CartIcon from "../CartIcon/CartIcon";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Go to homepage">
          <span className={styles.brandLeft}>Nordic</span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span className={styles.brandRight}>Ecom</span>
        </Link>

        <Nav />

        <CartIcon />
      </div>
    </header>
  );
}
