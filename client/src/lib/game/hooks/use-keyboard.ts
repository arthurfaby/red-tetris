import { useEffect, useRef } from "react";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { getGameModeConfig } from "@/lib/game/config/game-mode-config.ts";

export function useKeyboard() {
  const moveLeft = useTetrisStore((state) => state.moveLeft);
  const moveRight = useTetrisStore((state) => state.moveRight);
  const rotate = useTetrisStore((state) => state.rotate);
  const softDrop = useTetrisStore((state) => state.softDrop);
  const hardDrop = useTetrisStore((state) => state.hardDrop);
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const gameMode = useTetrisStore((state) => state.gameMode);
  const swapPieces = useTetrisStore((state) => state.swapPieces);

  const actionsRef = useRef({
    moveLeft,
    moveRight,
    softDrop,
    hardDrop,
    rotate,
    isPlaying,
    isGameOver,
    gameMode,
    swapPieces,
  });

  useEffect(() => {
    actionsRef.current = {
      moveLeft,
      moveRight,
      hardDrop,
      softDrop,
      rotate,
      isPlaying,
      isGameOver,
      gameMode,
      swapPieces,
    };
  }, [
    moveLeft,
    moveRight,
    softDrop,
    rotate,
    hardDrop,
    isPlaying,
    isGameOver,
    gameMode,
    swapPieces,
  ]);

  useEffect(() => {
    const pressedKeys = new Set<string>();
    let animationFrameId: number;
    let lastTick = 0;

    const MINIMUM_TIME_BETWEEN_TWO_UPDATES_IN_MS = 100;

    const handleKeyDown = (event: KeyboardEvent) => {
      const { isPlaying, isGameOver, rotate } = actionsRef.current;
      if (!isPlaying || isGameOver) return;

      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (gameKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Unique case : rotation (ArrowUp) – We want to rotate only once per press
      if (event.key === "ArrowUp" && !pressedKeys.has("ArrowUp")) {
        rotate();
      }
      if (event.key === " " && !pressedKeys.has(" ")) {
        hardDrop();
      }
      const gameModeConfig = getGameModeConfig(actionsRef.current.gameMode);
      const modeHandler = gameModeConfig.onKeyDown?.[event.key];
      if (modeHandler) {
        modeHandler({ swapPieces: actionsRef.current.swapPieces });
      }

      pressedKeys.add(event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key);
    };

    const loop = (timestamp: number) => {
      const { isPlaying, isGameOver, moveLeft, moveRight, softDrop } =
        actionsRef.current;

      if (isPlaying && !isGameOver) {
        if (timestamp - lastTick >= MINIMUM_TIME_BETWEEN_TWO_UPDATES_IN_MS) {
          if (pressedKeys.has("ArrowLeft")) moveLeft();
          if (pressedKeys.has("ArrowRight")) moveRight();
          if (pressedKeys.has("ArrowDown")) softDrop();

          lastTick = timestamp;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
