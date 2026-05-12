import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useParams } from "@/router.ts";
import { TetrisGame } from "@/components/game/tetris-game.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export default function Room() {
  const { roomName, username } = useParams("/:roomName/:username");
  const [users, setUsers] = useState<string[]>([
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
  ]);
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const startGame = useTetrisStore((state) => state.startGame);

  const addPlayer = (usernameToAdd: string) => {
    if (!users.includes(usernameToAdd)) {
      setUsers([...users, usernameToAdd]);
    }
  };

  addPlayer(username);

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
          {users.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 justify-center">
              {users.map((user) => {
                const userSplit = user.toUpperCase().split(" ");
                const userFallback =
                  (userSplit[0].at(0) ?? "") + (userSplit[1]?.at(0) ?? "");
                return (
                  <div key={user} className="flex items-center ">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarBadge className="bg-green-500"></AvatarBadge>
                        <AvatarFallback>{userFallback}</AvatarFallback>
                      </Avatar>
                      <p>{user}</p>
                    </div>
                  </div>
                );
              })}
              <Button className="col-span-3" onClick={() => startGame()}>
                Start game
              </Button>
            </div>
          ) : (
            <p className="text-red-400">ERROR. SHOULD NOT HAPPEN.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
