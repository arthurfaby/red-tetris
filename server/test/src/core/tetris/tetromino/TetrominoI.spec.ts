import {beforeEach, describe, expect, it} from "vitest";
import {TetrominoI} from "../../../../../src/core/tetris/tetrominos/TetrominoI";
import {TetrominoType} from "../../../../../src/core/tetris/enums/TetrominoType";

describe("TetrominoI", () => {
    let tetronimo: TetrominoI;

    beforeEach(() => {
        tetronimo = new TetrominoI();
    })

    it("should have correct type", () => {
        expect(tetronimo.type).toBe(TetrominoType.I)
    })

    it("should have correct matrix size", () => {
        expect(tetronimo.matrix.length).toBe(4)
        for (const row of tetronimo.matrix) {
            expect(row.length).toBe(4)
        }
    })

    it ("should have correct matrix data", () => {
        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([1, 1, 1, 1])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 0, 0])
    })

    it ("should rotate right", () => {
        tetronimo.rotateRight()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 1, 0])

        tetronimo.rotateRight()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([1, 1, 1, 1])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 0, 0])

        tetronimo.rotateRight()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 1, 0, 0])

        tetronimo.rotateRight()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([1, 1, 1, 1])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 0, 0])
    })

    it ("should rotate left", () => {

        tetronimo.rotateLeft()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 1, 0, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 1, 0, 0])

        tetronimo.rotateLeft()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([1, 1, 1, 1])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 0, 0])

        tetronimo.rotateLeft()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 0, 1, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 1, 0])

        tetronimo.rotateLeft()

        expect(tetronimo.matrix[0]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[1]).toStrictEqual([1, 1, 1, 1])
        expect(tetronimo.matrix[2]).toStrictEqual([0, 0, 0, 0])
        expect(tetronimo.matrix[3]).toStrictEqual([0, 0, 0, 0])

    })
})