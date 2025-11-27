// src/components/Loader/Loader.jsx
import React from "react";
import styles from "./Loader.module.scss";

export default function Loader({ label = "Loading…" }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>{label}</span>
    </div>
  );
}
