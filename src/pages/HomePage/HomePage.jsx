import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { PRODUCTS_ENDPOINT } from "../../config/api"; // 👈 NYTTER CONFIG
import styles from "./HomePage.module.scss";

function normalize(str = "") {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function HomePage() {
  const { data: products, isLoading, isError } = useApi(PRODUCTS_ENDPOINT);
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
