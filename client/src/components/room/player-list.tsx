import type { PlayerListData } from "@red-tetris/shared";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { Crown } from "lucide-react";

interface PlayerListProps {
  players: PlayerListData[];
  leaderId: string;
}

export function PlayerList({ players, leaderId }: PlayerListProps) {
  return players.map((user) => {
    const userSplit = user.username.toUpperCase().split(" ");
    const userFallback =
      (userSplit[0].at(0) ?? "") + (userSplit[1]?.at(0) ?? "");
    return (
      <>
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
      </>
    );
  });
}
