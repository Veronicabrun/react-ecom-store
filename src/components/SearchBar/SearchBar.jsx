// src/components/SearchBar/SearchBar.jsx
import React from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products…",
  ariaControls,
}) {
  return (
    <div className={styles.wrap}>
      {/* Dekorativt ikon */}
      <svg
        className={styles.icon}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M11 19a8 8 0 1 1 5.293-13.707A8 8 0 0 1 11 19zm9.5 2-4.35-4.35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        aria-autocomplete="list"
        aria-controls={ariaControls}
      />

      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label="Clear search"
          title="Clear"
        >
          ×
        </button>
      )}
    </div>
  );
}
