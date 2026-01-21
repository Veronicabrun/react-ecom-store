// src/components/ProductCard/ProductCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

//  Tell Jest: "This module is virtual ONLY, not available in node_modules"
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

    // Title
    expect(
      screen.getByRole("heading", { name: product.title })
    ).toBeInTheDocument();

    // Current price
    expect(
      screen.getByText(`${product.discountedPrice.toFixed(2)} kr`)
    ).toBeInTheDocument();

    // Preliminary price
    expect(
      screen.getByText(`${product.price.toFixed(2)} kr`)
    ).toBeInTheDocument();
  });

  test("shows discount badge when discountedPrice is lower than price", () => {
    renderProductCard({
      price: 200,
      discountedPrice: 100,
    });

    // 50 % 
    expect(screen.getByText("-50%")).toBeInTheDocument();
  });

  test("does not show discount badge when there is no discount", () => {
    renderProductCard({
      price: 200,
      discountedPrice: 200,
    });

    // No text matching "-XX%"
    expect(screen.queryByText(/-%/)).not.toBeInTheDocument();
  });

  test("links to the correct product page", () => {
    const { product } = renderProductCard();

    // The links in the card:
    const titleLink = screen.getByRole("link", { name: product.title });

    expect(titleLink).toHaveAttribute("href", `/product/${product.id}`);
  });
});
