// src/components/Nav/Nav.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <>
      {/* "Vanlig" nav inne i headeren */}
      <nav className={styles.nav} aria-label="Primary">
        {/* Desktop-liste */}
        <ul className={styles.listDesktop}>
          <li>
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={getLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Toggle-knapp – vises kun på mobil via CSS */}
        <button
          type="button"
          className={styles.menuToggleButton}
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* FULLSKJERMS-meny som dekker hele siden */}
      {isOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <div className={styles.mobileMenuInner}>
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Menu</span>
              <button
                type="button"
                className={styles.close}
                aria-label="Close menu"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <ul className={styles.mobileMenuList}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={getLinkClass}
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
