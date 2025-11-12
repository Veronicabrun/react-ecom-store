import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";

export default function SearchBar({ products = [] }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(p => p.title?.toLowerCase().includes(q))
      .slice(0, 8); // begrens treff
  }, [products, query]);

  function onSubmit(e) {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/product/${results[0].id}`);
    }
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} role="search" aria-label="Product search">
        <input
          className={styles.input}
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
      </form>

      {query && results.length > 0 && (
        <ul id="search-suggestions" className={styles.list} role="listbox">
          {results.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image?.url || "https://via.placeholder.com/60x60?text=No+Img"}
                  alt={item.image?.alt || item.title}
                />
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && (
        <div className={styles.empty}>No matches</div>
      )}
    </div>
  );
}
