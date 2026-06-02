import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
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

export default function Room() {
  const { players, leaderId, roomName, emit } = useSocketLobby();
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const { socketId } = useSocket();

  const handleStartGame = () => {
    emit("start_game", roomName);
  };

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

  return (
    <section className="flex items-center justify-center h-screen w-screen ">
      <Card className={"w-full max-w-md p-8"}>
        <CardHeader className="text-2xl ">Red Tetris - {roomName}</CardHeader>
        <CardContent className="">
          {!isGameOver && players.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 justify-center">
              {players.map((user) => {
                const userSplit = user.username.toUpperCase().split(" ");
                const userFallback =
                  (userSplit[0].at(0) ?? "") + (userSplit[1]?.at(0) ?? "");
                return (
                  <div key={user.id} className="flex items-center ">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        {leaderId === user.id && (
                          <AvatarBadge className=" ring-1 bg-secondary">
                            <Crown className="size-24 text-amber-400" />
                          </AvatarBadge>
                        )}
                        <AvatarFallback>{userFallback}</AvatarFallback>
                      </Avatar>
                      <p>{user.username}</p>
                    </div>
                  </div>
                );
              })}
              {leaderId === socketId ? (
                <Button
                  className="col-span-3"
                  onClick={() => handleStartGame()}
                >
                  Start game
                </Button>
              ) : (
                <Button className="col-span-3" disabled variant="outline">
                  Waiting for launch...
                </Button>
              )}
            </div>
          ) : isGameOver ? (
            <p className="text-red-400">GAME OVER.</p>
          ) : (
            <p className="text-red-400">ERROR. SHOULD NOT HAPPEN.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
