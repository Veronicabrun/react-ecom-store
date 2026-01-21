// src/config/api.js

const API_BASE = process.env.REACT_APP_API_BASE || "https://v2.api.noroff.dev";

// List of all products
export const PRODUCTS_ENDPOINT = `${API_BASE}/online-shop`;

// A single product (used with id)
export const PRODUCT_ENDPOINT = (id) => `${API_BASE}/online-shop/${id}`;
