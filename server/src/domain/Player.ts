import { GRID_WIDTH } from '@red-tetris/shared'

export class Player {
    public spectrum: number[] = new Array(GRID_WIDTH).fill(0)

    constructor(
        readonly socketId: string,
        readonly username: string,
        public host: boolean
    ) {}
}
