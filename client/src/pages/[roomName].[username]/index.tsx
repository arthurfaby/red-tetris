import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useParams } from "@/router.ts";
import { TetrisGame } from "@/components/game/layout/tetris-game.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import type { PlayerListData } from "@red-tetris/shared";
import { Crown } from "lucide-react";

export default function Room() {
  const { roomName, username } = useParams("/:roomName/:username");
  const [players, setPlayers] = useState<PlayerListData[]>([]);
  const [leaderId, setLeaderId] = useState("");
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const startGameStore = useTetrisStore((state) => state.startGame);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const setRoom = useTetrisStore((state) => state.setRoom);
  const socketId = useSocket((state) => state.id);
  const { emit, listen, off } = useSocket.getState();

  const handleStartGame = () => {
    emit("start_game", roomName);
  };

  useEffect(() => {
    if (roomName) {
      setRoom(roomName);
    }
    listen("start_piece", (startPiece, nextPiece) => {
      startGameStore(startPiece, nextPiece);
    });
    listen("set_leader", (leaderId) => {
      setLeaderId(leaderId);
    });
    listen("player_list", (player_list) => {
      setPlayers(player_list);
    });
    emit("join_game", { gameId: roomName, username: username });

    return () => {
      off("start_piece");
      off("set_leader");
      off("player_list");
      emit("leave_game", roomName);
    };
  }, [roomName, setRoom, username, startGameStore, listen, emit, off]);

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
