// src/config/api.js

const API_BASE = process.env.REACT_APP_API_BASE || "https://v2.api.noroff.dev";

// Liste med alle produkter
export const PRODUCTS_ENDPOINT = `${API_BASE}/online-shop`;

// Ett enkelt produkt (brukes med id)
export const PRODUCT_ENDPOINT = (id) => `${API_BASE}/online-shop/${id}`;
