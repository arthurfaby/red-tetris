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
  return (
    <div className="w-full h-full lg:w-72 max-h-full ">
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 shrink-0">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
            Adversaires
          </CardTitle>
          <Badge variant="secondary">6 en vie</Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 ">
            {opponents.map((opponent) => (
              <div
                key={opponent.id}
                className="group relative rounded-md border bg-muted/30 p-2 transition-colors hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium truncate">
                    Joueur {opponent.username}
                  </span>
                </div>
                <div className="aspect-1/2 w-full bg-background rounded-sm border shadow-inner flex items-center justify-center">
                  <TetrisSpectrum spectrum={opponent.spectrum} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
