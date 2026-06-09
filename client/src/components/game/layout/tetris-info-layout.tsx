import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { TetrisNextPiece } from "@/components/game/tetris-next-piece.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useTetrisStore } from "@/lib/stores/use-tetris-store.ts";

export function TetrisInfoLayout() {
  const nextPiece = useTetrisStore((state) => state.nextPiece);
  const score = useTetrisStore((state) => state.score);
  const linesCleared = useTetrisStore((state) => state.linesCleared);

  return (
    <div className="flex flex-row gap-3 w-full lg:flex-col lg:w-64 lg:h-[640px] lg:gap-6">
      <Card className="flex-1 lg:flex-none">
        <CardHeader className="pb-2 pt-3 px-3 lg:pb-3 lg:pt-6 lg:px-6">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-widest text-center">
            Suivante
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 lg:px-6 lg:pb-6">
          <div className="h-20 bg-muted/50 rounded-md border flex items-center justify-center overflow-hidden lg:h-40">
            <div className="[zoom:0.7] lg:[zoom:1]">
              <TetrisNextPiece type={nextPiece} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1 lg:flex-1">
        <CardContent className="pt-4 px-3 pb-3 flex flex-col gap-2 lg:pt-6 lg:px-6 lg:pb-6 lg:gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Score
            </span>
            <span className="text-xl font-mono text-primary font-bold lg:text-2xl">
              {score}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-end">
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Lignes
            </span>
            <span className="text-lg font-mono lg:text-xl">{linesCleared}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
