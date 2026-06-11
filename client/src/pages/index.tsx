import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator.tsx";

type LeaderboardEntry = {
  id: number;
  name: string;
  score: number;
};

export default function Index() {
  const [roomName, setRoomName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data: LeaderboardEntry[]) =>
        setLeaderboard(data.sort((a, b) => b.score - a.score).slice(0, 10)),
      )
      .catch(() => {});
  }, []);

  function handleJoin() {
    const errors: string[] = [];

    if (!username) {
      errors.push("Username is required");
    }
    if (!roomName) {
      errors.push("Room name is required");
    }
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    const url = `/${roomName}/${username}`;
    navigate(url);
  }

  return (
    <section className="flex items-center justify-center h-screen w-screen gap-6">
      <Card className={"w-full max-w-md p-8"}>
        <CardHeader className="text-2xl ">Red Tetris - Join room</CardHeader>
        <CardContent className="">
          <Input
            type="text"
            placeholder="Room name*"
            className="mb-4"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username*"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleJoin}>Join</Button>
          {errors.length > 0 && <Separator className="mt-2 mb-2"></Separator>}
          {errors.map((error) => (
            <p key={error} className="text-red-400">
              {error}
            </p>
          ))}
        </CardContent>
      </Card>

      {leaderboard.length > 0 && (
        <Card className={"w-full max-w-sm p-8"}>
          <CardHeader className="text-2xl">Leaderboard</CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="pb-2 w-8">#</th>
                  <th className="pb-2">Player</th>
                  <th className="pb-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="border-t border-border">
                    <td className="py-1 text-muted-foreground">{index + 1}</td>
                    <td className="py-1">{entry.name}</td>
                    <td className="py-1 text-right font-mono">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
