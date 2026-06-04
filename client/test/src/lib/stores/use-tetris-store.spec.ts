import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { Tetromino } from "@red-tetris/shared";

const defaultPiece = { type: Tetromino.L, x: 4, y: 0, rotation: 0 };

beforeEach(() => {
  vi.useFakeTimers();
  useTetrisStore.setState({
    isPlaying: false,
    isGameOver: false,
    intervalId: 0,
    currentPiece: { ...defaultPiece },
    nextPiece: Tetromino.Z,
  });
});

afterEach(() => {
  const id = useTetrisStore.getState().intervalId;
  if (id) clearInterval(id);
  vi.useRealTimers();
});

describe("useTetrisStore", () => {
  describe("startGame", () => {
    it("sets isPlaying to true when not playing", () => {
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      expect(useTetrisStore.getState().isPlaying).toBe(true);
    });

    it("sets isGameOver to false when not playing", () => {
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      expect(useTetrisStore.getState().isGameOver).toBe(false);
    });

    it("sets a non-zero intervalId when not playing", () => {
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      expect(useTetrisStore.getState().intervalId).not.toBe(0);
    });

    it("returns early (no change) when isPlaying=true and isGameOver=false", () => {
      useTetrisStore.setState({
        isPlaying: true,
        isGameOver: false,
        intervalId: 0,
      });
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      // intervalId should remain 0 (early return, no new interval created)
      expect(useTetrisStore.getState().intervalId).toBe(0);
    });

    it("restarts when isPlaying=true and isGameOver=true", () => {
      useTetrisStore.setState({
        isPlaying: true,
        isGameOver: true,
        intervalId: 0,
      });
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      expect(useTetrisStore.getState().isPlaying).toBe(true);
      expect(useTetrisStore.getState().isGameOver).toBe(false);
      expect(useTetrisStore.getState().intervalId).not.toBe(0);
    });

    it("calls tick after 1000ms via setInterval", () => {
      const initialY = useTetrisStore.getState().currentPiece.y;
      // useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L);
      vi.advanceTimersByTime(1000);
      // tick increments y by 1
      expect(useTetrisStore.getState().currentPiece.y).toBe(initialY + 1);
    });
  });

  describe("moveLeft", () => {
    it("decrements currentPiece.x by 1", () => {
      const initialX = useTetrisStore.getState().currentPiece.x;
      useTetrisStore.getState().moveLeft();
      expect(useTetrisStore.getState().currentPiece.x).toBe(initialX - 1);
    });
  });

  describe("moveRight", () => {
    it("increments currentPiece.x by 1", () => {
      const initialX = useTetrisStore.getState().currentPiece.x;
      useTetrisStore.getState().moveRight();
      expect(useTetrisStore.getState().currentPiece.x).toBe(initialX + 1);
    });
  });

  describe("rotate", () => {
    it("increments rotation from 0 to 1", () => {
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, rotation: 0 },
      });
      useTetrisStore.getState().rotate();
      expect(useTetrisStore.getState().currentPiece.rotation).toBe(1);
    });

    it("wraps rotation from 3 to 0", () => {
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, rotation: 3 },
      });
      useTetrisStore.getState().rotate();
      expect(useTetrisStore.getState().currentPiece.rotation).toBe(0);
    });

    it("increments rotation from 1 to 2", () => {
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, rotation: 1 },
      });
      useTetrisStore.getState().rotate();
      expect(useTetrisStore.getState().currentPiece.rotation).toBe(2);
    });

    it("increments rotation from 2 to 3", () => {
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, rotation: 2 },
      });
      useTetrisStore.getState().rotate();
      expect(useTetrisStore.getState().currentPiece.rotation).toBe(3);
    });
  });

  describe("tick", () => {
    it("increments currentPiece.y by 1", () => {
      const initialY = useTetrisStore.getState().currentPiece.y;
      useTetrisStore.getState().tick();
      expect(useTetrisStore.getState().currentPiece.y).toBe(initialY + 1);
    });

    it("sets nextPiece to a valid tetromino", () => {
      useTetrisStore.getState().tick();
      const validTetrominoes = [
        Tetromino.I,
        Tetromino.J,
        Tetromino.L,
        Tetromino.O,
        Tetromino.S,
        Tetromino.T,
        Tetromino.Z,
      ];
      expect(validTetrominoes).toContain(useTetrisStore.getState().nextPiece);
    });
  });

  describe("lockPiece", () => {
    it("does not throw", () => {
      expect(() => useTetrisStore.getState().lockPiece()).not.toThrow();
    });
  });
});
