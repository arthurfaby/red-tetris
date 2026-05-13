import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";

afterEach(() => cleanup());

import PageNotFound from "@/pages/404.tsx";

describe("404 Page", () => {
  it("renders the 404 page", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("404 - Page Not Found")).toBeDefined();
  });

  it("renders the error message", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Oops! The page you're looking for doesn't exist.")).toBeDefined();
  });

  it("renders the go back home button", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Go back to Home")).toBeDefined();
  });

  it("home link navigates to /", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    const link = screen.getByText("Go back to Home");
    expect(link.closest("a")?.getAttribute("href")).toBe("/");
  });
});
