import {describe, expect, it} from "vitest";
import {TetrominoType} from "../../../../../src/core/tetris/enums/TetrominoType";

describe("TetrominoType", () => {
    it("should have right values", () => {
        expect(TetrominoType.I).toBe(1)
        expect(TetrominoType.J).toBe(2)
        expect(TetrominoType.L).toBe(3)
        expect(TetrominoType.O).toBe(4)
        expect(TetrominoType.S).toBe(5)
        expect(TetrominoType.T).toBe(6)
        expect(TetrominoType.Z).toBe(7)
    })
})