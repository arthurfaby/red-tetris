import { TetrisBoard } from "@/components/game/tetris-board.tsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge.tsx";
import {TetrisNextPiece} from "@/components/game/tetris-next-piece.tsx";
import {useTetrisStore} from "@/lib/stores/use-tetris-store.tsx";
import {TetrisSpectrum} from "@/components/game/tetris-spectrum.tsx";
import {useKeyboard} from "@/lib/game/hooks/use-keyboard.ts";

export function TetrisGame() {
    useKeyboard()

    const nextPiece = useTetrisStore(state => state.nextPiece)

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">

            <div className="flex flex-col h-160 lg:flex-row items-start gap-6 lg:gap-10">

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
                                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Score</span>
                                <span className="text-2xl font-mono text-primary font-bold">000000</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-end">
                                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Lignes</span>
                                <span className="text-xl font-mono">0</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col items-center justify-center border-4 h-full">
                        <TetrisBoard />
                </div>

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
                                    <div key={id} className="group relative rounded-md border bg-muted/30 p-2 transition-colors hover:bg-muted/50">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-[10px] font-medium truncate">Joueur {id}</span>
                                        </div>
                                        <div className="aspect-1/2 w-full bg-background rounded-sm border shadow-inner flex items-center justify-center">
                                            {/*<span className="text-muted-foreground text-[8px]">K.O.</span>*/}
                                            <TetrisSpectrum spectrum={[5, 4, 12, 3, 1, 0, 18, 3, 4, 2]} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}