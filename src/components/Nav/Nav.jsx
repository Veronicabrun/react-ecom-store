import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
