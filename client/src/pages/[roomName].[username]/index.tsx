import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
import { useParams } from "@/router.ts";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TetrisGame } from "@/components/game/layout/tetris-game.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { JOIN_GAME_STATUS, type PlayerListData } from "@red-tetris/shared";
import { Crown } from "lucide-react";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";
import { toast } from "sonner";
import {useEffect} from 'react'
import { PlayerList } from "@/components/room/player-list.tsx";
import { LaunchGameButton } from "@/components/room/launch-game-button.tsx";

export default function Room() {
  const { roomName, username } = useParams("/:roomName/:username");
  const [players, setPlayers] = useState<PlayerListData[]>([]);
  const [leaderId, setLeaderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const startGameStore = useTetrisStore((state) => state.startGame);
  const { players, leaderId, roomName, emit } = useSocketLobby();
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const winner = useTetrisStore((state) => state.winner);
  const isPlayerDead = useTetrisStore((state) => state.isPlayerDead);
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const setRoom = useTetrisStore((state) => state.setRoom);
  const socketId = useSocket((state) => state.socketId);
  const { emit, listen, off } = useSocket.getState();
  const { socketId } = useSocket();

  useEffect(() => {
    if (!socketId) return;

    listen("start_piece", (startPiece, nextPiece) => {
      startGameStore(startPiece, nextPiece);
    });

    listen("set_leader", (newLeaderId) => {
      setLeaderId((prevLeaderId) => {
        if (newLeaderId === socketId && prevLeaderId !== socketId) {
          toast.info("You are now leader of this game");
        }
        return newLeaderId;
      });
    });

    listen("player_list", (player_list) => {
      setPlayers(player_list);
    });

    listen("join_game", (status) => {
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
    });

    emit("join_game", { gameId: roomName, username: username });

    return () => {
      off("start_piece");
      off("set_leader");
      off("player_list");
      off("join_game");
      emit("leave_game", roomName);
    };
  }, [emit, listen, off, roomName, socketId, startGameStore, username]);

  useEffect(() => {
    if (!socketId) return;

    if (roomName) {
      setRoom(roomName);
    }

    return () => {};
  }, [roomName, setRoom, socketId]);

  if (isPlaying || (isPlayerDead && !isGameOver)) {
    return (
      <section className="h-screen w-screen">
        <TetrisGame />
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center h-screen w-screen ">
      <Card className={"w-full max-w-md p-8"}>
        <CardHeader className="text-2xl ">Red Tetris - {roomName}</CardHeader>
        <CardContent className="">
          {players.length > 0 && !isPlaying && (
            <>
              {winner && (
                <p className="text-green-400 mb-4">
                  {winner.id === socketId
                    ? "You have "
                    : winner.username + " has"}{" "}
                  won !
                </p>
              )}
              <div className="grid grid-cols-3 gap-4 justify-center">
                <PlayerList players={players} leaderId={leaderId} />
                <LaunchGameButton
                  leaderId={leaderId}
                  socketId={socketId}
                  roomName={roomName}
                />
              </div>
            </>
          )}
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        </CardContent>
      </Card>
    </section>
  );
}
