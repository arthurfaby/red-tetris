import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => cleanup());

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card.tsx";

describe("Card", () => {
  it("renders with default size", () => {
    const { container } = render(<Card>Card content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card");
    expect(el.getAttribute("data-size")).toBe("default");
  });

  it("renders with size sm", () => {
    const { container } = render(<Card size="sm">Card SM</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-size")).toBe("sm");
  });

  it("applies custom className to Card", () => {
    const { container } = render(<Card className="my-card">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-card");
  });
});

describe("CardHeader", () => {
  it("renders correctly", () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-header");
    expect(screen.getByText("Header")).toBeDefined();
  });
});

describe("CardTitle", () => {
  it("renders correctly", () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-title");
    expect(screen.getByText("Title")).toBeDefined();
  });
});

describe("CardDescription", () => {
  it("renders correctly", () => {
    const { container } = render(<CardDescription>Description</CardDescription>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-description");
    expect(screen.getByText("Description")).toBeDefined();
  });
});

describe("CardAction", () => {
  it("renders correctly", () => {
    const { container } = render(<CardAction>Action</CardAction>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-action");
    expect(screen.getByText("Action")).toBeDefined();
  });
});

describe("CardContent", () => {
  it("renders correctly", () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-content");
    expect(screen.getByText("Content")).toBeDefined();
  });
});

describe("CardFooter", () => {
  it("renders correctly", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("card-footer");
    expect(screen.getByText("Footer")).toBeDefined();
  });
});
