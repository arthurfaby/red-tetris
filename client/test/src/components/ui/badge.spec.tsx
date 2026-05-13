import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => cleanup());

import { Badge, badgeVariants } from "@/components/ui/badge.tsx";

describe("Badge", () => {
  it("renders with default variant", () => {
    const { container } = render(<Badge>Default</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe("span");
    expect(screen.getByText("Default")).toBeDefined();
  });

  it("renders with variant secondary", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(screen.getByText("Secondary")).toBeDefined();
  });

  it("renders with variant destructive", () => {
    const { container } = render(
      <Badge variant="destructive">Destructive</Badge>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(screen.getByText("Destructive")).toBeDefined();
  });

  it("renders with variant outline", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(screen.getByText("Outline")).toBeDefined();
  });

  it("renders with variant ghost", () => {
    const { container } = render(<Badge variant="ghost">Ghost</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(screen.getByText("Ghost")).toBeDefined();
  });

  it("renders with variant link", () => {
    const { container } = render(<Badge variant="link">Link</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(screen.getByText("Link")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Badge className="my-custom-class">Custom</Badge>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-custom-class");
  });

  it("badgeVariants is a function", () => {
    expect(typeof badgeVariants).toBe("function");
  });
});
