import {useTetrisStore} from "@/lib/stores/use-tetris-store.tsx";
import {TetrisCell} from "@/components/game/tetris-cell.tsx";
import { TETROMINOS } from "@red-tetris/shared"
import {useEffect} from "react";

export function TetrisBoard() {
    const board = useTetrisStore(state => state.board);
    const currentPiece = useTetrisStore(state => state.currentPiece);
    const isPlaying = useTetrisStore(state => state.isPlaying);
    const isGameOver = useTetrisStore(state => state.isGameOver);
    const tick = useTetrisStore(state => state.tick);

    const displayBoard = board.map(row => [...row]);

    useEffect(() => {
        if (!isPlaying || isGameOver) return;

        const interval = setInterval(() => {
            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, isGameOver, tick]);

    if (currentPiece) {
        const shape = TETROMINOS[currentPiece.type].shape[currentPiece.rotation];
        shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value !== 0) {
                    const boardY = currentPiece.y + dy;
                    const boardX = currentPiece.x + dx;
                    if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
                        displayBoard[boardY][boardX] = currentPiece.type;
                    }
                }
            });
        });
    }

    return (
        <div className="grid grid-cols-[repeat(10,32px)] grid-rows-[repeat(20,32px)]">
            {displayBoard.map((row, y) => (
                row.map((cellType, x) => (
                    <TetrisCell key={`${y}-${x}`} type={cellType} />
                ))
            ))}
        </div>
    );}