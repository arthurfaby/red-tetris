import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import {
  DEFAULT_TETROMINO_POSITION,
  GRID_HEIGHT,
  GRID_WIDTH,
  Tetromino,
} from "@red-tetris/shared";
import { createEmptyBoard } from "@/lib/game/logic/create-empty-board.ts";

const { mockEmit } = vi.hoisted(() => ({ mockEmit: vi.fn() }));

vi.mock("@/lib/stores/use-socket.ts", () => ({
  useSocket: {
    getState: () => ({ socketId: "socket-1", emit: mockEmit }),
  },
}));

const defaultPiece = { type: Tetromino.L, x: 4, y: 0, rotation: 0 };

beforeEach(() => {
  vi.useFakeTimers();
  mockEmit.mockClear();
  useTetrisStore.setState({
    isPlaying: false,
    isGameOver: false,
    isPlayerDead: false,
    intervalId: 0,
    currentPiece: { ...defaultPiece },
    nextPiece: Tetromino.Z,
    board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH),
    opponents: [],
    room: null,
    winner: null,
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
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
      expect(useTetrisStore.getState().isPlaying).toBe(true);
    });

    it("sets isGameOver to false when not playing", () => {
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
      expect(useTetrisStore.getState().isGameOver).toBe(false);
    });

    it("sets a non-zero intervalId when not playing", () => {
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
      expect(useTetrisStore.getState().intervalId).not.toBe(0);
    });

    it("returns early (no change) when isPlaying=true and isGameOver=false", () => {
      useTetrisStore.setState({
        isPlaying: true,
        isGameOver: false,
        intervalId: 0,
      });
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
      // intervalId should remain 0 (early return, no new interval created)
      expect(useTetrisStore.getState().intervalId).toBe(0);
    });

    it("restarts when isPlaying=true and isGameOver=true", () => {
      useTetrisStore.setState({
        isPlaying: true,
        isGameOver: true,
        intervalId: 0,
      });
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
      expect(useTetrisStore.getState().isPlaying).toBe(true);
      expect(useTetrisStore.getState().isGameOver).toBe(false);
      expect(useTetrisStore.getState().intervalId).not.toBe(0);
    });

    it("builds the opponents list, excluding the current player by socketId", () => {
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, [
        { id: "socket-1", username: "Me", ko: false },
        { id: "socket-2", username: "Other", ko: false },
      ]);
      const { opponents, isSoloGame } = useTetrisStore.getState();
      expect(opponents).toHaveLength(1);
      expect(opponents[0]).toMatchObject({ id: "socket-2", username: "Other" });
      expect(isSoloGame).toBe(false);
    });

    it("calls tick after 1000ms via setInterval", () => {
      const initialY = useTetrisStore.getState().currentPiece.y;
      useTetrisStore.getState().startGame(Tetromino.I, Tetromino.L, []);
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

    it("does not move when blocked at the left edge", () => {
      useTetrisStore.setState({ currentPiece: { ...defaultPiece, x: 0 } });
      useTetrisStore.getState().moveLeft();
      expect(useTetrisStore.getState().currentPiece.x).toBe(0);
    });
  });

  describe("moveRight", () => {
    it("increments currentPiece.x by 1", () => {
      const initialX = useTetrisStore.getState().currentPiece.x;
      useTetrisStore.getState().moveRight();
      expect(useTetrisStore.getState().currentPiece.x).toBe(initialX + 1);
    });

    it("does not move when blocked at the right edge", () => {
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, x: GRID_WIDTH - 3 },
      });
      useTetrisStore.getState().moveRight();
      expect(useTetrisStore.getState().currentPiece.x).toBe(GRID_WIDTH - 3);
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

    it("does not rotate when the rotated shape would go out of bounds", () => {
      useTetrisStore.setState({
        currentPiece: { type: Tetromino.I, x: GRID_WIDTH - 1, y: 0, rotation: 0 },
      });
      useTetrisStore.getState().rotate();
      expect(useTetrisStore.getState().currentPiece.rotation).toBe(0);
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

    it("locks the piece instead of moving it when it cannot go further down", () => {
      const lockPieceSpy = vi
        .spyOn(useTetrisStore.getState(), "lockPiece")
        .mockImplementation(() => {});
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, y: GRID_HEIGHT - 1 },
      });
      useTetrisStore.getState().tick();
      expect(lockPieceSpy).toHaveBeenCalled();
      expect(useTetrisStore.getState().currentPiece.y).toBe(GRID_HEIGHT - 1);
      lockPieceSpy.mockRestore();
    });
  });

  describe("softDrop", () => {
    it("moves the piece down and resets the interval", () => {
      const initialY = useTetrisStore.getState().currentPiece.y;
      const initialIntervalId = useTetrisStore.getState().intervalId;
      useTetrisStore.getState().softDrop();
      // softDrop moves the piece down once, then tick() moves it down again
      expect(useTetrisStore.getState().currentPiece.y).toBe(initialY + 2);
      expect(useTetrisStore.getState().intervalId).not.toBe(initialIntervalId);
    });

    it("does not move the piece down when it is already at the bottom", () => {
      const lockPieceSpy = vi
        .spyOn(useTetrisStore.getState(), "lockPiece")
        .mockImplementation(() => {});
      useTetrisStore.setState({
        currentPiece: { ...defaultPiece, y: GRID_HEIGHT - 1 },
      });
      useTetrisStore.getState().softDrop();
      expect(useTetrisStore.getState().currentPiece.y).toBe(GRID_HEIGHT - 1);
      expect(lockPieceSpy).toHaveBeenCalled();
      lockPieceSpy.mockRestore();
    });
  });

  describe("hardDrop", () => {
    it("drops the piece to the lowest valid position then locks it", async () => {
      vi.useRealTimers();
      const lockPieceSpy = vi
        .spyOn(useTetrisStore.getState(), "lockPiece")
        .mockImplementation(() => {});
      await useTetrisStore.getState().hardDrop();
      expect(lockPieceSpy).toHaveBeenCalled();
      expect(useTetrisStore.getState().currentPiece.y).toBeGreaterThan(0);
      lockPieceSpy.mockRestore();
    });
  });

  describe("lockPiece", () => {
    it("does not throw", () => {
      expect(() => useTetrisStore.getState().lockPiece()).not.toThrow();
    });

    it("clears multiple lines, emits finish_lines and spawns the next piece", () => {
      const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
      board[GRID_HEIGHT - 2] = board[GRID_HEIGHT - 2].map((_, x) =>
        x < 2 ? Tetromino.NONE : Tetromino.I,
      );
      board[GRID_HEIGHT - 1] = board[GRID_HEIGHT - 1].map((_, x) =>
        x < 2 ? Tetromino.NONE : Tetromino.I,
      );

      useTetrisStore.setState({
        board,
        currentPiece: { type: Tetromino.O, x: 0, y: GRID_HEIGHT - 2, rotation: 0 },
        nextPiece: Tetromino.Z,
        room: "test-room",
      });

      useTetrisStore.getState().lockPiece();

      expect(mockEmit).toHaveBeenCalledWith("finish_lines", 2);
      expect(mockEmit).toHaveBeenCalledWith("next_piece", "test-room");
      const state = useTetrisStore.getState();
      expect(state.isGameOver).toBe(false);
      expect(state.isPlayerDead).toBe(false);
      expect(state.currentPiece).toEqual({
        type: Tetromino.Z,
        ...DEFAULT_TETROMINO_POSITION,
        rotation: 0,
      });
    });

    it("does not emit next_piece when no room is set", () => {
      const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
      board[GRID_HEIGHT - 1] = board[GRID_HEIGHT - 1].map((_, x) =>
        x < 2 ? Tetromino.NONE : Tetromino.I,
      );

      useTetrisStore.setState({
        board,
        currentPiece: {
          type: Tetromino.O,
          x: 0,
          y: GRID_HEIGHT - 2,
          rotation: 0,
        },
        nextPiece: Tetromino.Z,
        room: null,
      });

      mockEmit.mockClear();
      useTetrisStore.getState().lockPiece();

      expect(mockEmit).not.toHaveBeenCalledWith(
        "next_piece",
        expect.anything(),
      );
      expect(useTetrisStore.getState().isPlayerDead).toBe(false);
    });
  });

  describe("resetInterval", () => {
    it("clears the previous interval before creating a new one", () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval");
      useTetrisStore.setState({ intervalId: 999 });
      useTetrisStore.getState().resetInterval();
      expect(clearIntervalSpy).toHaveBeenCalledWith(999);
      expect(useTetrisStore.getState().intervalId).not.toBe(0);
      clearIntervalSpy.mockRestore();
    });

    it("starts a new interval that ticks every 1000ms", () => {
      useTetrisStore.getState().resetInterval();
      const initialY = useTetrisStore.getState().currentPiece.y;
      vi.advanceTimersByTime(1000);
      expect(useTetrisStore.getState().currentPiece.y).toBe(initialY + 1);
    });
  });

  describe("setGameOver", () => {
    it("marks the game as over, stops play and clears the interval", () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval");
      useTetrisStore.setState({ intervalId: 42, isPlaying: true });
      useTetrisStore.getState().setGameOver({ id: "p1", username: "Winner" });
      const state = useTetrisStore.getState();
      expect(state.isPlayerDead).toBe(true);
      expect(state.isPlaying).toBe(false);
      expect(state.isGameOver).toBe(true);
      expect(state.winner).toEqual({ id: "p1", username: "Winner" });
      expect(clearIntervalSpy).toHaveBeenCalledWith(42);
      clearIntervalSpy.mockRestore();
    });
  });

  describe("setKo", () => {
    it("marks only the matching opponent as KO", () => {
      useTetrisStore.setState({
        opponents: [
          { id: "p1", username: "Player 1", ko: false, spectrum: [] },
          { id: "p2", username: "Player 2", ko: false, spectrum: [] },
        ],
      });
      useTetrisStore.getState().setKo("p1");
      const opponents = useTetrisStore.getState().opponents;
      expect(opponents.find((o) => o.id === "p1")?.ko).toBe(true);
      expect(opponents.find((o) => o.id === "p2")?.ko).toBe(false);
    });
  });

  describe("setOpponent", () => {
    it("updates the spectrum of only the matching opponent", () => {
      useTetrisStore.setState({
        opponents: [
          { id: "p1", username: "Player 1", ko: false, spectrum: [0] },
          { id: "p2", username: "Player 2", ko: false, spectrum: [0] },
        ],
      });
      useTetrisStore.getState().setOpponent("p2", [1, 2, 3]);
      const opponents = useTetrisStore.getState().opponents;
      expect(opponents.find((o) => o.id === "p1")?.spectrum).toEqual([0]);
      expect(opponents.find((o) => o.id === "p2")?.spectrum).toEqual([1, 2, 3]);
    });
  });

  describe("setNextPiece", () => {
    it("replaces the next piece", () => {
      useTetrisStore.getState().setNextPiece(Tetromino.T);
      expect(useTetrisStore.getState().nextPiece).toBe(Tetromino.T);
    });
  });

  describe("setBoard", () => {
    it("replaces the board", () => {
      const newBoard = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
      useTetrisStore.getState().setBoard(newBoard);
      expect(useTetrisStore.getState().board).toBe(newBoard);
    });
  });

  describe("setRoom", () => {
    it("sets the room name", () => {
      useTetrisStore.getState().setRoom("my-room");
      expect(useTetrisStore.getState().room).toBe("my-room");
    });
  });

  describe("addPenaltyLines", () => {
    it("appends penalty lines at the bottom and shifts the current piece up", () => {
      useTetrisStore.setState({
        board: createEmptyBoard(GRID_HEIGHT, GRID_WIDTH),
        currentPiece: { ...defaultPiece, y: 5 },
      });
      useTetrisStore.getState().addPenaltyLines(2);
      const state = useTetrisStore.getState();
      expect(state.board).toHaveLength(GRID_HEIGHT);
      expect(
        state.board[GRID_HEIGHT - 1].every((cell) => cell === Tetromino.PENALTY),
      ).toBe(true);
      expect(
        state.board[GRID_HEIGHT - 2].every((cell) => cell === Tetromino.PENALTY),
      ).toBe(true);
      expect(state.currentPiece.y).toBe(3);
      expect(mockEmit).toHaveBeenCalledWith("new_spectrum", expect.any(Array));
    });

    it("keeps the current piece in place when the shifted position would be invalid", () => {
      const board = createEmptyBoard(GRID_HEIGHT, GRID_WIDTH);
      board[17][0] = Tetromino.I;

      const currentPiece = { type: Tetromino.O, x: 0, y: 17, rotation: 0 };
      useTetrisStore.setState({ board, currentPiece });

      useTetrisStore.getState().addPenaltyLines(2);

      expect(useTetrisStore.getState().currentPiece).toEqual(currentPiece);
    });
  });
});
