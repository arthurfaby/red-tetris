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

  return (
    <div className="flex flex-col gap-6 w-full h-full lg:w-64">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-widest text-center">
            Suivante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted/50 rounded-md border flex items-center justify-center">
            <TetrisNextPiece type={nextPiece} />
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardContent className="pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Score
            </span>
            <span className="text-2xl font-mono text-primary font-bold">
              000000
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-end">
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Lignes
            </span>
            <span className="text-xl font-mono">0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
