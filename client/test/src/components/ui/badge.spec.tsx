import { render, screen, cleanup } from "@testing-library/react";
import { Badge, badgeVariants } from "@/components/ui/badge.tsx";

describe("Badge", () => {
  afterEach(() => cleanup());

  it("renders with default variant", () => {
    const { container } = render(<Badge>Default</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.tagName.toLowerCase()).toBe("span");
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders with variant secondary", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders with variant destructive", () => {
    const { container } = render(
      <Badge variant="destructive">Destructive</Badge>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("renders with variant outline", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("renders with variant ghost", () => {
    const { container } = render(<Badge variant="ghost">Ghost</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("renders with variant link", () => {
    const { container } = render(<Badge variant="link">Link</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
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
