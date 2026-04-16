import {Matrix} from "./types/Matrix";

export class Board {
    #grid: Matrix;

    public get grid() {
        return this.#grid;
    }

    constructor() {
        this.#grid = Array(20).fill(null).map(_ => Array(10).fill(0));
    }

}