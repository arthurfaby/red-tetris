import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router";

afterEach(() => cleanup());

vi.mock("@/components/theme-provider.tsx", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import App from "@/pages/_app.tsx";

describe("App (_app.tsx)", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container).toBeDefined();
  });

  it("renders the outlet (MemoryRouter provides a matched route)", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeDefined();
  });
});
