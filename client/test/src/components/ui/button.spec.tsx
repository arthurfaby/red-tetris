import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button.tsx";

describe("Button", () => {
  afterEach(() => cleanup());

  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with variant outline", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("renders with variant secondary", () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders with variant ghost", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("renders with variant destructive", () => {
    const { container } = render(
      <Button variant="destructive">Destructive</Button>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("renders with variant link", () => {
    const { container } = render(<Button variant="link">Link</Button>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
  });

  it("renders with size sm", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size lg", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size xs", () => {
    const { container } = render(<Button size="xs">XSmall</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size icon", () => {
    const { container } = render(<Button size="icon">I</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByText("Click");
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("buttonVariants is a function", () => {
    expect(typeof buttonVariants).toBe("function");
  });
});
