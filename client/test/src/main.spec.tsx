import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() })),
}));

vi.mock("@generouted/react-router", () => ({
  Routes: () => null,
}));

vi.mock("@/index.css", () => ({}));

describe("main.tsx", () => {
  beforeEach(() => {
    vi.resetModules();
    const root = document.getElementById("root");
    if (!root) {
      const div = document.createElement("div");
      div.id = "root";
      document.body.appendChild(div);
    }
  });

  it("calls createRoot with #root element and renders Routes", async () => {
    const { createRoot } = await import("react-dom/client");
    await import("@/main.tsx");

    expect(createRoot).toBeDefined();
  });
});
