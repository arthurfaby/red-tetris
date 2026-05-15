import { render, cleanup } from "@testing-library/react";
import { Input } from "@/components/ui/input.tsx";

describe("Input", () => {
  afterEach(() => cleanup());

  it("renders basic input", () => {
    const { container } = render(<Input />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-slot")).toBe("input");
  });

  it("renders with type text", () => {
    const { container } = render(<Input type="text" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("type")).toBe("text");
  });

  it("renders with type email", () => {
    const { container } = render(<Input type="email" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("type")).toBe("email");
  });

  it("applies custom className", () => {
    const { container } = render(<Input className="my-input-class" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-input-class");
  });
});
