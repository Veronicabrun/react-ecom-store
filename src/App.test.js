// src/App.test.js
import { render, screen } from "@testing-library/react";
import ContactPage from "./pages/ContactPage/ContactPage";

test("renders Contact heading", () => {
  render(<ContactPage />);

  // Checks that <h1>Contact</h1> exists
  const heading = screen.getByRole("heading", { name: /contact/i });
  expect(heading).toBeInTheDocument();
});
