import { useSocket } from "@/lib/stores/use-socket.ts";
import { useEffect, useRef, useState } from "react";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import {
  JOIN_GAME_STATUS,
  type JoinGameStatus,
  type PlayerListData,
  type ServerToClientEvents,
  type TetrominoType,
} from "@red-tetris/shared";
import { useParams } from "@/router.ts";
import { toast } from "sonner";

export function useSocketLobby() {
  const { roomName, username } = useParams("/:roomName/:username");

  const listen = useSocket((state) => state.listen);
  const emit = useSocket((state) => state.emit);
  const off = useSocket((state) => state.off);
  const socketId = useSocket((state) => state.socketId);

  const startGameStore = useTetrisStore((state) => state.startGame);
  const setRoom = useTetrisStore((state) => state.setRoom);
  const setGameOver = useTetrisStore((state) => state.setGameOver);

  const [players, setPlayers] = useState<PlayerListData[]>([]);
  const [leaderId, setLeaderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    const onSetLeader = (newLeaderId: string) => {
      setLeaderId((prevLeaderId) => {
        if (newLeaderId === socketId && prevLeaderId !== socketId) {
          toast.info("You are now leader of this game");
        }
        return newLeaderId;
      });
    };

    const onPlayerList = (playerList: PlayerListData[]) => {
      setPlayers(playerList);
      playersRef.current = playerList;
    };

    const onJoinGame = (status: JoinGameStatus) => {
      switch (status) {
        case JOIN_GAME_STATUS.JOINED:
          toast.success("Game joined successfully");
          break;
        case JOIN_GAME_STATUS.CREATED:
          toast.success("Game created successfully");
          break;
        case JOIN_GAME_STATUS.ALREADY_LAUNCHED:
          toast.error("Game is already launched");
          setErrorMessage("Game is already launched");
          break;
        default:
          toast.error("Error has occurred");
      }
    };

    const onGameOver = (
      payload: Parameters<ServerToClientEvents["game_over"]>[0],
    ) => {
      setGameOver(payload);
    };

    listen("start_piece", onStartPiece);
    listen("set_leader", onSetLeader);
    listen("player_list", onPlayerList);
    listen("join_game", onJoinGame);
    listen("game_over", onGameOver);

    emit("join_game", { gameId: roomName, username: username });

    return () => {
      off("start_piece", onStartPiece);
      off("set_leader", onSetLeader);
      off("player_list", onPlayerList);
      off("join_game", onJoinGame);
      emit("leave_game", roomName);
    };
  }, [
    roomName,
    username,
    setRoom,
    startGameStore,
    listen,
    emit,
    off,
    socketId,
    setGameOver,
  ]);

  return { players, leaderId, roomName, emit, errorMessage, setErrorMessage };
}
