import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/PortfolioScene", () => () => (
  <div data-testid="portfolio-scene" />
));
jest.mock("./components/AmbientBackground", () => () => (
  <div data-testid="ambient-background" />
));

test("renders portfolio heading", () => {
  render(<App />);
  const headingElement = screen.getByRole("heading", {
    level: 1,
    name: /Taha Akber/i,
  });
  expect(headingElement).toBeInTheDocument();
  expect(screen.getByTestId("portfolio-scene")).toBeInTheDocument();
  expect(screen.getByTestId("ambient-background")).toBeInTheDocument();
});
