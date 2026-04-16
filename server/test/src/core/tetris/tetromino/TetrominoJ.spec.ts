import {beforeEach, describe, expect, it} from "vitest";
import {TetrominoJ} from "../../../../../src/core/tetris/tetrominos/TetrominoJ";
import {TetrominoType} from "../../../../../src/core/tetris/enums/TetrominoType";

describe("TetrominoJ", () => {
    let tetromino: TetrominoJ;

    beforeEach(() => {
        tetromino = new TetrominoJ();
    })

    it("should have correct type", () => {
        expect(tetromino.type).toBe(TetrominoType.J)
    })

    it("should have correct matrix size", () => {
        expect(tetromino.matrix.length).toBe(3)
        for (const row of tetromino.matrix) {
            expect(row.length).toBe(3)
        }
    })

    it ("should have correct matrix data", () => {
        expect(tetromino.matrix[0]).toStrictEqual([1, 0, 0])
        expect(tetromino.matrix[1]).toStrictEqual([1, 1, 1])
        expect(tetromino.matrix[2]).toStrictEqual([0, 0, 0])
    })

    it ("should rotate right", () => {
        tetromino.rotateRight()

        expect(tetromino.matrix[0]).toStrictEqual([0, 1, 1])
        expect(tetromino.matrix[1]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[2]).toStrictEqual([0, 1, 0])

        tetromino.rotateRight()

        expect(tetromino.matrix[0]).toStrictEqual([0, 0, 0])
        expect(tetromino.matrix[1]).toStrictEqual([1, 1, 1])
        expect(tetromino.matrix[2]).toStrictEqual([0, 0, 1])

        tetromino.rotateRight()

        expect(tetromino.matrix[0]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[1]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[2]).toStrictEqual([1, 1, 0])

        tetromino.rotateRight()

        expect(tetromino.matrix[0]).toStrictEqual([1, 0, 0])
        expect(tetromino.matrix[1]).toStrictEqual([1, 1, 1])
        expect(tetromino.matrix[2]).toStrictEqual([0, 0, 0])
    })

    it ("should rotate left", () => {

        tetromino.rotateLeft()

        expect(tetromino.matrix[0]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[1]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[2]).toStrictEqual([1, 1, 0])


        tetromino.rotateLeft()

        expect(tetromino.matrix[0]).toStrictEqual([0, 0, 0])
        expect(tetromino.matrix[1]).toStrictEqual([1, 1, 1])
        expect(tetromino.matrix[2]).toStrictEqual([0, 0, 1])

        tetromino.rotateLeft()

        expect(tetromino.matrix[0]).toStrictEqual([0, 1, 1])
        expect(tetromino.matrix[1]).toStrictEqual([0, 1, 0])
        expect(tetromino.matrix[2]).toStrictEqual([0, 1, 0])


        tetromino.rotateLeft()

        expect(tetromino.matrix[0]).toStrictEqual([1, 0, 0])
        expect(tetromino.matrix[1]).toStrictEqual([1, 1, 1])
        expect(tetromino.matrix[2]).toStrictEqual([0, 0, 0])

    })
})