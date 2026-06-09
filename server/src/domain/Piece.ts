import { Tetromino, TetrominoType } from '@red-tetris/shared/tetrominos'
import { Player } from './Player'

export class Piece {
    private listPlayerNumber: Map<string, number> = new Map()
    private tetrominos: TetrominoType[] = []

    constructor(listPlayers: Player[]) {
        this.resetState(listPlayers)
    }

    public resetState(listPlayers: Player[]) {
        this.tetrominos = []
        this.listPlayerNumber = new Map()
        listPlayers.forEach((player) => {
            this.listPlayerNumber.set(player.id, 0)
        })
        this.addNewTetrominos()
    }

    public addPlayer(playerId: string) {
        if (this.listPlayerNumber.has(playerId)) return
        this.listPlayerNumber.set(playerId, 0)
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
        const piece = this.tetrominos[indexTetromino]
        this.updateListPlayerNumber(player)
        return piece
    }

    public addNewTetrominos() {
        this.tetrominos = [...this.tetrominos, ...this.getSequenceTetrominos()]
    }

    private getSequenceTetrominos(): TetrominoType[] {
        const tetrominosSequence = Object.values(Tetromino).filter(
            (v): v is TetrominoType =>
                v !== Tetromino.NONE && v !== Tetromino.PENALTY
        )
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
