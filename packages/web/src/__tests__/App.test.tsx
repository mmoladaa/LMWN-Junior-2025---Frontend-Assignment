import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App", () => {
  it("should render RestaurantPage when navigating to /restaurants/:restaurantId", () => {
    // Mock window.location to simulate navigation
    Object.defineProperty(window, "location", {
      value: { pathname: "/restaurants/567051" },
      writable: true,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Since RestaurantPage is rendered, we can verify it's in the document
    expect(screen.getByTestId("restaurant-page")).toBeInTheDocument();
  });
});
