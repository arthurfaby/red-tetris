import { useEffect } from 'react';
import {useTetrisStore} from "@/lib/stores/use-tetris-store.tsx";

export function useKeyboard() {
    const moveLeft = useTetrisStore(state => state.moveLeft);
    const moveRight = useTetrisStore(state => state.moveRight);
    const rotate = useTetrisStore(state => state.rotate);
    const isPlaying = useTetrisStore(state => state.isPlaying);
    const isGameOver = useTetrisStore(state => state.isGameOver);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isPlaying || isGameOver) return;

            const gameKeys = ['ArrowUp', 'ArrowDown','ArrowLeft', 'ArrowRight'];

            if (gameKeys.includes(event.key)) {
                event.preventDefault();
            }

            switch (event.key) {
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowUp':
                    rotate();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, isGameOver, moveLeft, moveRight, rotate]);
}