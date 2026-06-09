import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { TetrisSpectrum } from "@/components/game/tetris-spectrum.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export function TetrisSpectrumsLayout() {
  const opponents = useTetrisStore((state) => state.opponents);
  const notDeadOpponents = opponents.filter((op) => !op.ko).length;

  return (
    <div className="w-24 sm:w-44 md:w-56 lg:w-72 h-full lg:h-160 max-h-full min-w-0">
      <Card className="flex flex-col h-full py-2 lg:py-4">
        <CardHeader className="pb-2 lg:pb-3 px-2 lg:px-4 flex flex-row items-center justify-between space-y-0 sticky gap-1">
          <CardTitle className="text-muted-foreground text-[10px] lg:text-xs font-bold uppercase tracking-widest truncate">
            Adversaires
          </CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 text-[10px] lg:text-xs px-1.5 py-0"
          >
            {notDeadOpponents} en vie
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto min-h-0 px-2 lg:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3">
            {opponents.map((opponent) => (
              <div
                key={opponent.id}
                className="group relative rounded-md border bg-muted/30 p-1.5 lg:p-2 transition-colors hover:bg-muted/50"
              >
                <div className="mb-1 lg:mb-2 flex items-center justify-between">
                  <span className="text-[9px] lg:text-[10px] font-medium truncate">
                    {opponent.username}
                  </span>
                </div>
                <div className="aspect-1/2 w-full bg-background rounded-sm border shadow-inner flex items-center justify-center">
                  <TetrisSpectrum
                    spectrum={opponent.spectrum}
                    ko={opponent.ko}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
