import { render, cleanup } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import App from "@/pages/_app.tsx";

vi.mock("@/components/theme-provider.tsx", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App (_app.tsx)", () => {
  afterEach(() => cleanup());

  it("renders without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });
});
