import { render, cleanup, act } from "@testing-library/react";
import { useKeyboard } from "@/lib/game/hooks/use-keyboard.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";

afterEach(() => cleanup());

function TestComponent() {
  useKeyboard();
  return null;
}

const mockMoveLeft = vi.fn();
const mockMoveRight = vi.fn();
const mockRotate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  useTetrisStore.setState({
    isPlaying: true,
    isGameOver: false,
    moveLeft: mockMoveLeft,
    moveRight: mockMoveRight,
    rotate: mockRotate,
    currentPiece: { type: Tetromino.L, x: 4, y: 0, rotation: 0 },
  });
});

describe("useKeyboard", () => {
  it("does not call any action for ArrowDown", () => {
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", cancelable: true }),
    );
    expect(mockMoveLeft).not.toHaveBeenCalled();
    expect(mockMoveRight).not.toHaveBeenCalled();
    expect(mockRotate).not.toHaveBeenCalled();
  });

  it("does not call any action for non-game keys", () => {
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "a", cancelable: true }),
    );
    expect(mockMoveLeft).not.toHaveBeenCalled();
    expect(mockMoveRight).not.toHaveBeenCalled();
    expect(mockRotate).not.toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowLeft", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowRight", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowUp", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", {
      key: "ArrowUp",
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowDown", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls rotate only once while ArrowUp is held down", () => {
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", cancelable: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", cancelable: true }),
    );
    expect(mockRotate).toHaveBeenCalledTimes(1);
  });

  it("calls hardDrop only once while space is held down", () => {
    const mockHardDrop = vi.fn();
    useTetrisStore.setState({ hardDrop: mockHardDrop });
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", cancelable: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", cancelable: true }),
    );
    expect(mockHardDrop).toHaveBeenCalledTimes(1);
  });

  it("does NOT call preventDefault for non-game keys", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", { key: "a", cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("does not call any action when isPlaying=false", () => {
    useTetrisStore.setState({ isPlaying: false, isGameOver: false });
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }),
    );
    expect(mockMoveLeft).not.toHaveBeenCalled();
  });

  it("does not call any action when isGameOver=true", () => {
    useTetrisStore.setState({ isPlaying: true, isGameOver: true });
    render(<TestComponent />);
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }),
    );
    expect(mockMoveLeft).not.toHaveBeenCalled();
  });

  it("removes a key from pressedKeys on keyup so the loop stops calling its action", () => {
    let loop: ((timestamp: number) => void) | undefined;
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        loop = cb;
        return 1;
      });
    const cafSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    render(<TestComponent />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keyup", { key: "ArrowLeft", cancelable: true }),
    );

    loop!(0);
    loop!(150);

    expect(mockMoveLeft).not.toHaveBeenCalled();

    rafSpy.mockRestore();
    cafSpy.mockRestore();
  });

  it("calls moveLeft, moveRight and softDrop from the animation frame loop once enough time elapsed", () => {
    let loop: ((timestamp: number) => void) | undefined;
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        loop = cb;
        return 1;
      });
    const cafSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    const mockSoftDrop = vi.fn();
    useTetrisStore.setState({ softDrop: mockSoftDrop });

    render(<TestComponent />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", cancelable: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", cancelable: true }),
    );

    // First tick establishes lastTick, second one (>= 100ms later) triggers the actions
    loop!(0);
    loop!(150);

    expect(mockMoveLeft).toHaveBeenCalled();
    expect(mockMoveRight).toHaveBeenCalled();
    expect(mockSoftDrop).toHaveBeenCalled();

    rafSpy.mockRestore();
    cafSpy.mockRestore();
  });

  it("does not trigger loop actions when not enough time has elapsed or the game is not playing", () => {
    let loop: ((timestamp: number) => void) | undefined;
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        loop = cb;
        return 1;
      });
    const cafSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    render(<TestComponent />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }),
    );

    // Not enough time elapsed between the two ticks
    loop!(0);
    loop!(50);
    expect(mockMoveLeft).not.toHaveBeenCalled();

    // Game over: loop should skip the action block entirely
    act(() => {
      useTetrisStore.setState({ isGameOver: true });
    });
    loop!(200);
    expect(mockMoveLeft).not.toHaveBeenCalled();

    rafSpy.mockRestore();
    cafSpy.mockRestore();
  });

  it("removes event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });
});
