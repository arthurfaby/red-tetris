import {
  render,
  screen,
  cleanup,
  act,
  renderHook,
} from "@testing-library/react";
import type { Context } from "react";
import { ThemeProvider, useTheme } from "@/components/theme-provider.tsx";

let useContextOverride: boolean = false;

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useContext: (context: Context<unknown>) => {
      if (useContextOverride) {
        useContextOverride = false;
        return undefined;
      }
      return actual.useContext(context);
    },
  };
});

describe("ThemeProvider", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  beforeEach(() => {
    useContextOverride = false;
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>child content</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("uses defaultTheme light when no localStorage value", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <div>child</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("uses defaultTheme dark when no localStorage value", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>child</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("uses localStorage value over defaultTheme", () => {
    localStorage.setItem("vite-ui-theme", "dark");
    render(
      <ThemeProvider defaultTheme="light">
        <div>child</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies system theme (dark) when theme is system and prefers dark", () => {
    render(
      <ThemeProvider defaultTheme="system">
        <div>child</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies system theme (light) when theme is system and prefers light", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    render(
      <ThemeProvider defaultTheme="system">
        <div>child</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("setTheme updates the theme and localStorage", () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <button onClick={() => setTheme("dark")}>set dark</button>
        </div>
      );
    };

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");

    act(() => {
      screen.getByText("set dark").click();
    });

    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
  });

  it("setTheme with custom storageKey", () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return <button onClick={() => setTheme("dark")}>set dark</button>;
    };

    render(
      <ThemeProvider defaultTheme="light" storageKey="custom-key">
        <TestComponent />
      </ThemeProvider>,
    );

    act(() => {
      screen.getByText("set dark").click();
    });

    expect(localStorage.getItem("custom-key")).toBe("dark");
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    useContextOverride = false;
  });

  it("returns context when used within ThemeProvider", () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <span>{theme}</span>;
    };

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("light")).toBeInTheDocument();
  });

  it("uses default initialState setTheme (returns null) when called outside provider", () => {
    // createContext provides initialState as default, so useTheme() outside a provider
    // returns initialState. This covers the initialState.setTheme: () => null function.
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
    result.current.setTheme("dark");
  });

  it("throws error when context is undefined (direct call outside React)", () => {
    // Calling a hook directly (outside React) is not the typical usage,
    // but since useTheme() just calls useContext() and checks the result,
    // we can call it directly in a non-React context. With useContextOverride=true,
    // our mock returns undefined, triggering the guard throw.
    useContextOverride = true;
    expect(() => useTheme()).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });
});
