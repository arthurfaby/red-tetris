import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { TetrisGame } from "@/components/game/layout/tetris-game.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { useSocketLobby } from "@/lib/game/hooks/use-socket-lobby.ts";
import { PlayerList } from "@/components/room/player-list.tsx";
import { LaunchGameButton } from "@/components/room/launch-game-button.tsx";

export default function Room() {
  const { players, leaderId, roomName, errorMessage } = useSocketLobby();
  const isPlaying = useTetrisStore((state) => state.isPlaying);
  const isGameOver = useTetrisStore((state) => state.isGameOver);
  const isPlayerDead = useTetrisStore((state) => state.isPlayerDead);
  const winner = useTetrisStore((state) => state.winner);
  const socketId = useSocket((state) => state.socketId);

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
