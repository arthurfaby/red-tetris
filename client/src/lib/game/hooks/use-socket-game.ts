import { useEffect } from "react";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import type { TetrominoType } from "@red-tetris/shared";

export function useSocketGame() {
  const listen = useSocket((state) => state.listen);
  const off = useSocket((state) => state.off);

  const setOpponent = useTetrisStore((state) => state.setOpponent);
  const setNextPiece = useTetrisStore((state) => state.setNextPiece);
  const addPenaltyLines = useTetrisStore((state) => state.addPenaltyLines);
  const setKo = useTetrisStore((state) => state.setKo);

  useEffect(() => {
    const onPlayerSpectrum = (id: string, spectrum: number[]) => {
      setOpponent(id, spectrum);
    };

    const onNextPiece = (nextPiece: TetrominoType) => {
      setNextPiece(nextPiece);
    };

    const onPenaltyLines = (numberOfPenaltyLines: number) => {
      addPenaltyLines(numberOfPenaltyLines);
    };

    const onKo = (playerId: string) => {
      setKo(playerId);
    };

    listen("player_spectrum", onPlayerSpectrum);
    listen("next_piece", onNextPiece);
    listen("penalty_lines", onPenaltyLines);
    listen("ko", onKo);

    return () => {
      off("player_spectrum", onPlayerSpectrum);
      off("next_piece", onNextPiece);
      off("penalty_lines", onPenaltyLines);
      off("ko", onKo);
    };
  }, [listen, off, setOpponent, setNextPiece, addPenaltyLines, setKo]);
}
