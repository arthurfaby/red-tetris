import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
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
  it("calls moveLeft when ArrowLeft is pressed and isPlaying=true", () => {
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }));
    expect(mockMoveLeft).toHaveBeenCalledTimes(1);
  });

  it("calls moveRight when ArrowRight is pressed and isPlaying=true", () => {
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", cancelable: true }));
    expect(mockMoveRight).toHaveBeenCalledTimes(1);
  });

  it("calls rotate when ArrowUp is pressed and isPlaying=true", () => {
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", cancelable: true }));
    expect(mockRotate).toHaveBeenCalledTimes(1);
  });

  it("does not call any action for ArrowDown", () => {
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", cancelable: true }));
    expect(mockMoveLeft).not.toHaveBeenCalled();
    expect(mockMoveRight).not.toHaveBeenCalled();
    expect(mockRotate).not.toHaveBeenCalled();
  });

  it("does not call any action for non-game keys", () => {
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a", cancelable: true }));
    expect(mockMoveLeft).not.toHaveBeenCalled();
    expect(mockMoveRight).not.toHaveBeenCalled();
    expect(mockRotate).not.toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowLeft", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowRight", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight", cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowUp", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", { key: "ArrowUp", cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("calls preventDefault for ArrowDown", () => {
    render(<TestComponent />);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
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
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }));
    expect(mockMoveLeft).not.toHaveBeenCalled();
  });

  it("does not call any action when isGameOver=true", () => {
    useTetrisStore.setState({ isPlaying: true, isGameOver: true });
    render(<TestComponent />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", cancelable: true }));
    expect(mockMoveLeft).not.toHaveBeenCalled();
  });

  it("removes event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
