export const Tetromino = {
    NONE: 0,
    I: 1,
    J: 2,
    L: 3,
    O: 4,
    S: 5,
    T: 6,
    Z: 7
} as const;

export type TetrominoType = typeof Tetromino[keyof typeof Tetromino];

export const TETROMINOS: Record<TetrominoType, {
    shape: TetrominoType[][][];
}> = {
    [Tetromino.NONE]: {
        shape: [[[Tetromino.NONE]]],
    },

    [Tetromino.I]: {
        shape: [
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.I, Tetromino.I, Tetromino.I, Tetromino.I],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.I, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.I, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.I, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.I, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.I, Tetromino.I, Tetromino.I, Tetromino.I],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.I, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.I, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.I, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.I, Tetromino.NONE, Tetromino.NONE]
            ]
        ]
    },

    [Tetromino.J]: {
        shape: [
            [
                [Tetromino.J, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.J, Tetromino.J, Tetromino.J],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.J, Tetromino.J],
                [Tetromino.NONE, Tetromino.J, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.J, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.J, Tetromino.J, Tetromino.J],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.J]
            ],
            [
                [Tetromino.NONE, Tetromino.J, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.J, Tetromino.NONE],
                [Tetromino.J, Tetromino.J, Tetromino.NONE]
            ]
        ]
    },

    [Tetromino.L]: {
        shape: [
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.L],
                [Tetromino.L, Tetromino.L, Tetromino.L],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.L, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.L, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.L, Tetromino.L]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.L, Tetromino.L, Tetromino.L],
                [Tetromino.L, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.L, Tetromino.L, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.L, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.L, Tetromino.NONE]
            ]
        ]
    },

    [Tetromino.O]: {
        shape: [
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]]
        ]
    },

    [Tetromino.S]: {
        shape: [
            [
                [Tetromino.NONE, Tetromino.S, Tetromino.S],
                [Tetromino.S, Tetromino.S, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.S, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.S, Tetromino.S],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.S]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.S, Tetromino.S],
                [Tetromino.S, Tetromino.S, Tetromino.NONE]
            ],
            [
                [Tetromino.S, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.S, Tetromino.S, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.S, Tetromino.NONE]
            ]
        ]
    },

    [Tetromino.T]: {
        shape: [
            [
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE],
                [Tetromino.T, Tetromino.T, Tetromino.T],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.T, Tetromino.T],
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.T, Tetromino.T, Tetromino.T],
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE],
                [Tetromino.T, Tetromino.T, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.T, Tetromino.NONE]
            ]
        ]
    },

    [Tetromino.Z]: {
        shape: [
            [
                [Tetromino.Z, Tetromino.Z, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.Z, Tetromino.Z],
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.Z],
                [Tetromino.NONE, Tetromino.Z, Tetromino.Z],
                [Tetromino.NONE, Tetromino.Z, Tetromino.NONE]
            ],
            [
                [Tetromino.NONE, Tetromino.NONE, Tetromino.NONE],
                [Tetromino.Z, Tetromino.Z, Tetromino.NONE],
                [Tetromino.NONE, Tetromino.Z, Tetromino.Z]
            ],
            [
                [Tetromino.NONE, Tetromino.Z, Tetromino.NONE],
                [Tetromino.Z, Tetromino.Z, Tetromino.NONE],
                [Tetromino.Z, Tetromino.NONE, Tetromino.NONE]
            ]
        ]
    }
};