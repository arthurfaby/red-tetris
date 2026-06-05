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
import { Crown } from "lucide-react";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";

export default function Room() {
  const { players, leaderId, roomName, emit } = useSocketLobby();
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const socketId = useSocket((state) => state.id);

  const handleStartGame = () => {
    emit("start_game", roomName);
  };

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
