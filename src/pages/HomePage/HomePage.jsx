
import React from "react";
import useApi from "../../hooks/useApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./HomePage.module.scss";

const URL = "https://v2.api.noroff.dev/online-shop";

export default function HomePage() {
  const { data: products, isLoading, isError } = useApi(URL);

  if (isLoading) return <div>Loading products…</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Products</h1>
      <div className={styles.grid}>
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
