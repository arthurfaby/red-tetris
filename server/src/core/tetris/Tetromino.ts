import { Matrix } from './types/Matrix'
import { Position } from './types/Position'
import { TetrominoType } from './enums/TetrominoType'

export abstract class Tetromino {
    #matrix: Matrix
    #position: Position
    #type: TetrominoType
    #matrixSize: number

    public get matrix() {
        return this.#matrix
    }

    public get position() {
        return this.#position
    }

    public get type() {
        return this.#type
    }

    //TODO Change default position to actual top middle in the grid
    constructor(
        type: TetrominoType,
        matrix: Matrix,
        position: Position = { x: 0, y: 0 }
    ) {
        this.#type = type
        this.#matrix = matrix
        this.#matrixSize = matrix.length
        this.#position = position
    }

    public rotateRight() {
        this._transposeMatrix()
        this._reverseMatrix()
    }

    public rotateLeft() {
        this._reverseMatrix()
        this._transposeMatrix()
    }

    private _reverseMatrix() {
        for (let i = 0; i < this.#matrixSize; i++) {
            this.#matrix[i].reverse()
        }
    }

    private _transposeMatrix() {
        for (let i = 0; i < this.#matrixSize; i++) {
            for (let j = i; j < this.#matrixSize; j++) {
                const temp = this.#matrix[i][j]
                this.#matrix[i][j] = this.#matrix[j][i]
                this.#matrix[j][i] = temp
            }
        }
    }
}
