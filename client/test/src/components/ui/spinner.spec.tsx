import { render, cleanup } from "@testing-library/react";
import { Spinner } from "@/components/ui/spinner.tsx";

describe("Spinner", () => {
  afterEach(() => cleanup());

  it("renders with role status and accessible label", () => {
    const { container } = render(<Spinner />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("role")).toBe("status");
    expect(el.getAttribute("aria-label")).toBe("Loading");
  });

  it("applies the default spin classes", () => {
    const { container } = render(<Spinner />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("class")).toContain("animate-spin");
    expect(el.getAttribute("class")).toContain("size-4");
  });

  it("merges a custom className with the defaults", () => {
    const { container } = render(<Spinner className="text-red-500" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("class")).toContain("text-red-500");
    expect(el.getAttribute("class")).toContain("animate-spin");
  });
});
