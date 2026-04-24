import { Tetromino } from '../../../../../src/core/tetris/Tetromino'
import { TetrominoType } from '../../../../../src/core/tetris/enums/TetrominoType'
import { Matrix } from '../../../../../src/core/tetris/types/Matrix'
import { checkMatrix } from './check-matrix'
import { beforeEach, describe, expect, it } from 'vitest'
import { TetrominoS } from '../../../../../src/core/tetris/tetrominos/TetrominoS'
import { TetrominoI } from '../../../../../src/core/tetris/tetrominos/TetrominoI'
import { TetrominoJ } from '../../../../../src/core/tetris/tetrominos/TetrominoJ'
import { TetrominoL } from '../../../../../src/core/tetris/tetrominos/TetrominoL'
import { TetrominoO } from '../../../../../src/core/tetris/tetrominos/TetrominoO'
import { TetrominoT } from '../../../../../src/core/tetris/tetrominos/TetrominoT'
import { TetrominoZ } from '../../../../../src/core/tetris/tetrominos/TetrominoZ'

interface TetrominoTestData {
    name: string
    createInstance: () => Tetromino
    expectedType: TetrominoType
    expectedSize: number
    positions: [Matrix, Matrix, Matrix, Matrix] // all rotated positions
}

const testCases: TetrominoTestData[] = [
    {
        name: 'I',
        createInstance: () => new TetrominoI(),
        expectedType: TetrominoType.I,
        expectedSize: 4,
        positions: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
        ],
    },
    {
        name: 'J',
        createInstance: () => new TetrominoJ(),
        expectedType: TetrominoType.J,
        expectedSize: 3,
        positions: [
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
        ],
    },
    {
        name: 'L',
        createInstance: () => new TetrominoL(),
        expectedType: TetrominoType.L,
        expectedSize: 3,
        positions: [
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'O',
        createInstance: () => new TetrominoO(),
        expectedType: TetrominoType.O,
        expectedSize: 2,
        positions: [
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
        ],
    },
    {
        name: 'S',
        createInstance: () => new TetrominoS(),
        expectedType: TetrominoType.S,
        expectedSize: 3,
        positions: [
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'T',
        createInstance: () => new TetrominoT(),
        expectedType: TetrominoType.T,
        expectedSize: 3,
        positions: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'Z',
        createInstance: () => new TetrominoZ(),
        expectedType: TetrominoType.Z,
        expectedSize: 3,
        positions: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
        ],
    },
]

describe.each(testCases)(
    'Tetromino $name',
    ({ createInstance, expectedType, expectedSize, positions }) => {
        let tetromino: Tetromino

        beforeEach(() => {
            tetromino = createInstance()
        })

        it('should have correct type', () => {
            expect(tetromino.type).toBe(expectedType)
        })

        it('should have default position', () => {
            expect(tetromino.position.x).toBe(0)
            expect(tetromino.position.y).toBe(0)
        })

        it('should have correct matrix size', () => {
            expect(tetromino.size).toBe(expectedSize)
        })

        it('should have correct initial matrix data', () => {
            checkMatrix(tetromino, positions[0])
        })

        it('should rotate right correctly through all states', () => {
            tetromino.rotateRight()
            checkMatrix(tetromino, positions[1])
            tetromino.rotateRight()
            checkMatrix(tetromino, positions[2])
            tetromino.rotateRight()
            checkMatrix(tetromino, positions[3])
            tetromino.rotateRight()
            checkMatrix(tetromino, positions[0])
        })

        it('should rotate left correctly through all states', () => {
            tetromino.rotateLeft()
            checkMatrix(tetromino, positions[3])
            tetromino.rotateLeft()
            checkMatrix(tetromino, positions[2])
            tetromino.rotateLeft()
            checkMatrix(tetromino, positions[1])
            tetromino.rotateLeft()
            checkMatrix(tetromino, positions[0])
        })
    }
)
