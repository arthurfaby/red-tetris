import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

afterEach(() => cleanup());

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar.tsx";

describe("Avatar", () => {
  it("renders with default size", () => {
    const { container } = render(<Avatar />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("avatar");
    expect(el.getAttribute("data-size")).toBe("default");
  });

  it("renders with size sm", () => {
    const { container } = render(<Avatar size="sm" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-size")).toBe("sm");
  });

  it("renders with size lg", () => {
    const { container } = render(<Avatar size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-size")).toBe("lg");
  });

  it("applies custom className", () => {
    const { container } = render(<Avatar className="my-avatar" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-avatar");
  });
});

describe("AvatarImage", () => {
  it("renders inside Avatar context", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="test avatar" />
      </Avatar>,
    );
    expect(container.firstChild).toBeDefined();
    const img = container.querySelector("[data-slot='avatar-image']");
    expect(img).toBeDefined();
  });
});

describe("AvatarFallback", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    const el = container.querySelector("[data-slot='avatar-fallback']");
    expect(el).toBeDefined();
  });
});

describe("AvatarBadge", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Avatar>
        <AvatarBadge />
      </Avatar>,
    );
    const el = container.querySelector("[data-slot='avatar-badge']");
    expect(el).toBeDefined();
    expect(el?.getAttribute("data-slot")).toBe("avatar-badge");
  });
});

describe("AvatarGroup", () => {
  it("renders correctly", () => {
    const { container } = render(<AvatarGroup />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("avatar-group");
  });

  it("applies custom className", () => {
    const { container } = render(<AvatarGroup className="my-group" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-group");
  });
});

describe("AvatarGroupCount", () => {
  it("renders correctly", () => {
    const { container } = render(<AvatarGroupCount>+3</AvatarGroupCount>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDefined();
    expect(el.getAttribute("data-slot")).toBe("avatar-group-count");
  });
});
