import { Button } from "@/components/ui/button.tsx";
import { useSocket } from "@/lib/stores/use-socket.ts";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

interface LaunchGameButtonProps {
  leaderId: string;
  socketId?: string;
  roomName: string;
}

export function LaunchGameButton({
  leaderId,
  socketId,
  roomName,
}: LaunchGameButtonProps) {
  const handleStartGame = () => {
    useSocket
      .getState()
      .emit("start_game", roomName, useTetrisStore.getState().gameMode);
  };

  return leaderId === socketId ? (
    <Button className="col-span-3" onClick={() => handleStartGame()}>
      Start game
    </Button>
  ) : (
    <Button className="col-span-3" disabled variant="outline">
      Waiting for launch...
    </Button>
  );
}
