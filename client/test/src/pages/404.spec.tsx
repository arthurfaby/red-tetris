import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PageNotFound from "@/pages/404.tsx";

describe("404 Page", () => {
  afterEach(() => cleanup());

  it("renders the 404 page", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist."),
    ).toBeInTheDocument();
  });

  it("renders the go back home button", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText("Go back to Home")).toBeInTheDocument();
  });

  it("home link navigates to /", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    const link = screen.getByText("Go back to Home");
    expect(link.closest("a")?.getAttribute("href")).toBe("/");
  });
});
