import { useEffect, useRef } from "react";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export function useKeyboard() {
  const moveLeft = useTetrisStore((state) => state.moveLeft);
  const moveRight = useTetrisStore((state) => state.moveRight);
  const rotate = useTetrisStore((state) => state.rotate);
  const softDrop = useTetrisStore((state) => state.softDrop);
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);

  // On utilise des refs pour éviter de recréer la boucle d'animation à chaque render
  const actionsRef = useRef({
    moveLeft,
    moveRight,
    softDrop,
    rotate,
    isPlaying,
    isGameOver,
  });

  // On met à jour les refs à chaque changement pour que la boucle ait toujours les fonctions fraîches
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
    // Un Set pour stocker les touches actuellement enfoncées
    const pressedKeys = new Set<string>();
    let animationFrameId: number;
    let lastTick = 0;

    // Configuration de la vitesse de répétition (en millisecondes)
    const MOVE_DELAY = 100; // Vitesse du déplacement latéral et du soft drop

    const handleKeyDown = (event: KeyboardEvent) => {
      const { isPlaying, isGameOver, rotate } = actionsRef.current;
      if (!isPlaying || isGameOver) return;

      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (gameKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Cas particulier : La rotation (ArrowUp)
      // On veut qu'elle ne se déclenche QU'UNE SEULE FOIS par appui physique
      if (event.key === "ArrowUp" && !pressedKeys.has("ArrowUp")) {
        rotate();
      }

      // On enregistre que la touche est enfoncée
      pressedKeys.add(event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key);
    };

    // La boucle magique qui tourne en tâche de fond à ~60fps
    const loop = (timestamp: number) => {
      const { isPlaying, isGameOver, moveLeft, moveRight, softDrop } =
        actionsRef.current;

      if (isPlaying && !isGameOver) {
        // On limite la vitesse de répétition pour que le bloc ne fonce pas à la vitesse de l'éclair
        if (timestamp - lastTick >= MOVE_DELAY) {
          if (pressedKeys.has("ArrowLeft")) moveLeft();
          if (pressedKeys.has("ArrowRight")) moveRight();
          if (pressedKeys.has("ArrowDown")) softDrop();

          lastTick = timestamp;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Écouteurs d'événements
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Lancement de la boucle
    animationFrameId = requestAnimationFrame(loop);

    // Nettoyage complet au démontage du hook
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Tableau de dépendances vide, tout passe par les refs pour une stabilité maximale
}
