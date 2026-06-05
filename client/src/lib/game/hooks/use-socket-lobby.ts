import { useSocket } from "@/lib/stores/use-socket.ts";
import { useEffect, useRef, useState } from "react";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import type { PlayerListData, TetrominoType } from "@red-tetris/shared";
import { useParams } from "@/router.ts";

export function useSocketLobby() {
  const { roomName, username } = useParams("/:roomName/:username");

  const listen = useSocket((state) => state.listen);
  const emit = useSocket((state) => state.emit);
  const off = useSocket((state) => state.off);

  const startGameStore = useTetrisStore((state) => state.startGame);
  const setRoom = useTetrisStore((state) => state.setRoom);

  const [players, setPlayers] = useState<PlayerListData[]>([]);
  const [leaderId, setLeaderId] = useState("");
  const playersRef = useRef<PlayerListData[]>([]);

  useEffect(() => {
    if (!roomName) return;

    setRoom(roomName);

    const onStartPiece = (
      startPiece: TetrominoType,
      nextPiece: TetrominoType,
    ) => {
      startGameStore(startPiece, nextPiece, playersRef.current);
    };

    const onSetLeader = (id: string) => {
      setLeaderId(id);
    };

    const onPlayerList = (playerList: PlayerListData[]) => {
      setPlayers(playerList);
      playersRef.current = playerList;
    };

    listen("start_piece", onStartPiece);
    listen("set_leader", onSetLeader);
    listen("player_list", onPlayerList);

    emit("join_game", { gameId: roomName, username: username });

    return () => {
      off("start_piece", onStartPiece);
      off("set_leader", onSetLeader);
      off("player_list", onPlayerList);
      emit("leave_game", roomName);
    };
  }, [roomName, username, setRoom, startGameStore, listen, emit, off]);

  return { players, leaderId, roomName, emit };
}
