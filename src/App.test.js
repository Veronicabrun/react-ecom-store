// src/App.test.js
import { render, screen } from "@testing-library/react";
import ContactPage from "./pages/ContactPage/ContactPage";

test("renders Contact heading", () => {
  render(<ContactPage />);

  // Sjekker at <h1>Contact</h1> finnes
  const heading = screen.getByRole("heading", { name: /contact/i });
  expect(heading).toBeInTheDocument();
});
