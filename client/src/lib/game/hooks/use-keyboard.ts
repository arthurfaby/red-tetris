import { useEffect, useRef } from "react";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export function useKeyboard() {
  const moveLeft = useTetrisStore((state) => state.moveLeft);
  const moveRight = useTetrisStore((state) => state.moveRight);
  const rotate = useTetrisStore((state) => state.rotate);
  const softDrop = useTetrisStore((state) => state.softDrop);
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);

  const actionsRef = useRef({
    moveLeft,
    moveRight,
    softDrop,
    rotate,
    isPlaying,
    isGameOver,
  });

  useEffect(() => {
    actionsRef.current = {
      moveLeft,
      moveRight,
      softDrop,
      rotate,
      isPlaying,
      isGameOver,
    };
  }, [moveLeft, moveRight, softDrop, rotate, isPlaying, isGameOver]);

  useEffect(() => {
    const pressedKeys = new Set<string>();
    let animationFrameId: number;
    let lastTick = 0;

    const MINIMUM_TIME_BETWEEN_TWO_UPDATES_IN_MS = 100;

    const handleKeyDown = (event: KeyboardEvent) => {
      const { isPlaying, isGameOver, rotate } = actionsRef.current;
      if (!isPlaying || isGameOver) return;

      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (gameKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Unique case : rotation (ArrowUp) – We want to rotate only once per press
      if (event.key === "ArrowUp" && !pressedKeys.has("ArrowUp")) {
        rotate();
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
