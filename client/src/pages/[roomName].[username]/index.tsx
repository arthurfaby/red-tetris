import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { TetrisGame } from "@/components/game/layout/tetris-game.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { JOIN_GAME_STATUS, type PlayerListData } from "@red-tetris/shared";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";
import { PlayerList } from "@/components/room/player-list.tsx";
import { LaunchGameButton } from "@/components/room/launch-game-button.tsx";
import { toast } from "sonner";
import {useEffect} from 'react'

export default function Room() {
  const { players, leaderId, roomName, errorMessage } = useSocketLobby();
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const isPlayerDead = useTetrisStore((state) => state.isPlayerDead);
  const winner = useTetrisStore((state) => state.winner);
  const isSoloGame = useTetrisStore((state) => state.isSoloGame);
  const socketId = useSocket((state) => state.socketId);

  useEffect(() => {
    if (!socketId) return;

    if (roomName) {
      setRoom(roomName);
    }

    listen("start_piece", (startPiece, nextPiece) => {
      startGameStore(startPiece, nextPiece);
    });

    listen("set_leader", (newLeaderId) => {
      console.log({
        newLeaderId,
        socketId,
        leaderId,
      });
      if (newLeaderId === socketId && leaderId !== socketId) {
        console.log("SEND TOASTE");
        toast.info("You are now leader of this game");
      }
      setLeaderId(newLeaderId);
    });

    listen("player_list", (player_list) => {
      setPlayers(player_list);
    });

    listen("join_game", (status) => {
      console.log("RECEIVE JOIN GAME STATUS");
      switch (status) {
        case JOIN_GAME_STATUS.JOINED:
          toast.success("Game joined successfully");
          break;
        case JOIN_GAME_STATUS.CREATED:
          toast.success("Game created successfully");
          break;
        case JOIN_GAME_STATUS.ALREADY_LAUNCHED:
          toast.error("Game is already launched");
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
      emit("leave_game", roomName);
    };
  }, [
    roomName,
    setRoom,
    username,
    startGameStore,
    listen,
    emit,
    off,
    socketId,
    leaderId,
  ]);

  if (isPlaying) {
    return (
      <section className="h-screen w-screen">
        <TetrisGame />
      </section>
    );
  }

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
              {!isSoloGame && winner && (
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
