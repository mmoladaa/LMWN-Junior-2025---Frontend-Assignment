import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../components/Header", () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock("../components/MenuList", () => {
  return function MockMenuList() {
    return <div data-testid="menu-list">MenuList Component</div>;
  };
});

jest.mock("../components/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

jest.mock("../api", () => ({
  getRestaurant: jest.fn().mockResolvedValue({
    name: "Test Restaurant",
    coverImage: "test.jpg",
    activeTimePeriod: {
      open: "09:00",
      close: "22:00",
    },
    menus: [],
    shortMenus: [],
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    restaurantId: "test-restaurant",
  }),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
}));

describe("App Component", () => {
  it("renders without crashing", async () => {
    render(<App />);

    await screen.findByTestId("header");

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("menu-list")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
