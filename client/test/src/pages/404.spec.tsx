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
});
