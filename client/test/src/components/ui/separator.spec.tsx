import { render, cleanup } from "@testing-library/react";
import { Separator } from "@/components/ui/separator.tsx";

describe("Separator", () => {
  afterEach(() => cleanup());

  it("renders with default orientation (horizontal)", () => {
    const { container } = render(<Separator />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-slot")).toBe("separator");
  });

  it("renders with orientation horizontal explicitly", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-slot")).toBe("separator");
  });

  it("renders with orientation vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-slot")).toBe("separator");
  });

  it("applies custom className", () => {
    const { container } = render(<Separator className="my-separator" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-separator");
  });
});
