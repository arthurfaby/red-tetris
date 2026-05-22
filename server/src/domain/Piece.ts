import { Tetromino, TetrominoType } from '@red-tetris/shared/tetrominos'

export class Piece {
    private listPlayerNumber: Map<string, number> = new Map()
    private tetrominos: TetrominoType[] = []

    constructor(listPlayers: string[]) {
        listPlayers.forEach((player) => {
            this.listPlayerNumber.set(player, 0)
        })
        this.addNewTetrominos()
    }

    public updateListPlayerNumber(player: string) {
        const newValue = this.listPlayerNumber.get(player) ?? 0
        this.listPlayerNumber.set(player, newValue + 1)
    }

    public getTetromino(player: string) {
        const indexTetromino = this.listPlayerNumber.get(player) ?? 0
        if (indexTetromino >= this.tetrominos.length) {
            this.addNewTetrominos()
        }
        this.updateListPlayerNumber(player)
        return this.tetrominos[this.listPlayerNumber.get(player) ?? 0]
    }

    public addNewTetrominos() {
        this.tetrominos = [...this.tetrominos, ...this.getSequenceTetrominos()]
    }

    private getSequenceTetrominos(): TetrominoType[] {
        //TODO il y a mieux
        const tetrominosSequence = [
            Tetromino.J,
            Tetromino.I,
            Tetromino.S,
            Tetromino.L,
            Tetromino.O,
            Tetromino.T,
            Tetromino.Z,
        ]
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * (i + 1))
            ;[tetrominosSequence[i], tetrominosSequence[randomIndex]] = [
                tetrominosSequence[randomIndex],
                tetrominosSequence[i],
            ]
        }
        return tetrominosSequence
    }
}
