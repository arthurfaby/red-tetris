import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { TetrisSpectrum } from "@/components/game/tetris-spectrum.tsx";

export function TetrisSpectrumsLayout() {
  return (
    <div className="w-full h-full lg:w-72 max-h-full ">
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 sticky">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
            Adversaires
          </CardTitle>
          <Badge variant="secondary">6 en vie</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 h-140 overflow-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <div
                key={id}
                className="group relative rounded-md border bg-muted/30 p-2 transition-colors hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium truncate">
                    Joueur {id}
                  </span>
                </div>
                <div className="aspect-1/2 w-full bg-background rounded-sm border shadow-inner flex items-center justify-center">
                  <TetrisSpectrum spectrum={[5, 4, 12, 3, 1, 0, 18, 3, 4, 2]} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
