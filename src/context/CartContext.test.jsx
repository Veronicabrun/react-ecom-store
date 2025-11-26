// src/context/CartContext.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

// 🔹 Testkomponent for å lese verdier
const TestReader = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
  } = useCart();

  return (
    <div>
      <div data-testid="items-length">{cartItems.length}</div>
      <div data-testid="count">{cartCount}</div>
      <div data-testid="total">{cartTotal}</div>
    </div>
  );
};

// 🔹 Testkomponent for å trigge handlinger
const TestActions = () => {
  const {
    addToCart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div>
      <button
        data-testid="add"
        onClick={() =>
          addToCart({ id: 1, title: "Sofa", price: 1000, imageUrl: "img.jpg" })
        }
      >
        add
      </button>

      <button
        data-testid="increase"
        onClick={() => increase(1)}
      >
        increase
      </button>

      <button
        data-testid="decrease"
        onClick={() => decrease(1)}
      >
        decrease
      </button>

      <button
        data-testid="remove"
        onClick={() => removeFromCart(1)}
      >
        remove
      </button>

      <button data-testid="clear" onClick={clearCart}>
        clear
      </button>
    </div>
  );
};

describe("CartContext – Advanced tests", () => {

  test("initial state is empty", () => {
    render(
      <CartProvider>
        <TestReader />
      </CartProvider>
    );

    expect(screen.getByTestId("items-length")).toHaveTextContent("0");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  test("adds product to cart", () => {
    render(
      <CartProvider>
        <TestReader />
        <TestActions />
      </CartProvider>
    );

    act(() => screen.getByTestId("add").click());

    expect(screen.getByTestId("items-length")).toHaveTextContent("1");
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("total")).toHaveTextContent("1000");
  });

  test("increases quantity", () => {
    render(
      <CartProvider>
        <TestReader />
        <TestActions />
      </CartProvider>
    );

    act(() => screen.getByTestId("add").click());
    act(() => screen.getByTestId("increase").click());

    expect(screen.getByTestId("count")).toHaveTextContent("2");
    expect(screen.getByTestId("total")).toHaveTextContent("2000");
  });

  test("decreases quantity and removes if qty = 0", () => {
    render(
      <CartProvider>
        <TestReader />
        <TestActions />
      </CartProvider>
    );

    act(() => screen.getByTestId("add").click());
    act(() => screen.getByTestId("decrease").click()); // skal fjerne item

    expect(screen.getByTestId("items-length")).toHaveTextContent("0");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("removes item completely", () => {
    render(
      <CartProvider>
        <TestReader />
        <TestActions />
      </CartProvider>
    );

    act(() => screen.getByTestId("add").click());
    act(() => screen.getByTestId("remove").click());

    expect(screen.getByTestId("items-length")).toHaveTextContent("0");
  });

  test("clears entire cart", () => {
    render(
      <CartProvider>
        <TestReader />
        <TestActions />
      </CartProvider>
    );

    act(() => screen.getByTestId("add").click());
    act(() => screen.getByTestId("add").click()); // qty blir 2

    act(() => screen.getByTestId("clear").click());

    expect(screen.getByTestId("items-length")).toHaveTextContent("0");
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

});
