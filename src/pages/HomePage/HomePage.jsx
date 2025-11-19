// src/pages/HomePage/HomePage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./HomePage.module.scss";

const URL = "https://v2.api.noroff.dev/online-shop";

function normalize(str = "") {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function HomePage() {
  const { data: products, isLoading, isError } = useApi(URL);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const normQuery = normalize(query);

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!normQuery) return products;
    return products.filter((p) => normalize(p.title).includes(normQuery));
  }, [products, normQuery]);

  const suggestions = useMemo(() => {
    if (!normQuery) return [];
    return (products || [])
      .filter((p) => normalize(p.title).includes(normQuery))
      .slice(0, 8);
  }, [products, normQuery]);

  if (isLoading) {
    return <div className={styles.state}>Loading products…</div>;
  }

  if (isError) {
    return <div className={styles.state}>Error loading products.</div>;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Products</h1>

      {/* Look-ahead søk (nå via SearchBar-komponenten) */}
      <div className={styles.searchWrap}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search products…"
          ariaControls="suggestions"
          ariaExpanded={suggestions.length > 0}
        />

        {query && suggestions.length > 0 && (
          <ul id="suggestions" className={styles.suggestList} role="listbox">
            {suggestions.map((s) => (
              <li key={s.id} role="option">
                <button
                  type="button"
                  className={styles.suggestItem}
                  onClick={() => navigate(`/product/${s.id}`)}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && suggestions.length === 0 && (
          <div className={styles.noSuggest}>No matches</div>
        )}
      </div>

      {/* Grid med (filtrerte) produkter */}
      {filtered.length === 0 ? (
        <p className={styles.muted}>No products to show.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
