// src/components/ProductCard/ProductCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

// 🔹 Si til Jest: "Denne modulen er KUN virtuell, ikke let i node_modules"
jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ children, to, ...rest }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
  }),
  { virtual: true }
);

function renderProductCard(overrides = {}) {
  const product = {
    id: "test-id-123",
    title: "Test product",
    description: "A very nice thing",
    price: 200,
    discountedPrice: 150,
    image: {
      url: "https://via.placeholder.com/800x600?text=Test+Image",
      alt: "Test image alt",
    },
    ...overrides,
  };

  render(<ProductCard product={product} />);

  return { product };
}

describe("ProductCard", () => {
  test("renders title and prices", () => {
    const { product } = renderProductCard();

    // Tittel
    expect(
      screen.getByRole("heading", { name: product.title })
    ).toBeInTheDocument();

    // Nåpris (discountedPrice)
    expect(
      screen.getByText(`${product.discountedPrice.toFixed(2)} kr`)
    ).toBeInTheDocument();

    // Førpris (price)
    expect(
      screen.getByText(`${product.price.toFixed(2)} kr`)
    ).toBeInTheDocument();
  });

  test("shows discount badge when discountedPrice is lower than price", () => {
    renderProductCard({
      price: 200,
      discountedPrice: 100,
    });

    // 50 % rabatt → -50%
    expect(screen.getByText("-50%")).toBeInTheDocument();
  });

  test("does not show discount badge when there is no discount", () => {
    renderProductCard({
      price: 200,
      discountedPrice: 200,
    });

    // Ingen tekst som matcher "-XX%"
    expect(screen.queryByText(/-%/)).not.toBeInTheDocument();
  });

  test("links to the correct product page", () => {
    const { product } = renderProductCard();

    // Lenkene i kortet:
    const titleLink = screen.getByRole("link", { name: product.title });

    expect(titleLink).toHaveAttribute("href", `/product/${product.id}`);
  });
});
