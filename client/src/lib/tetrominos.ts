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
    shape: number[][][];
    classes: string;
}> = {
    [Tetromino.NONE]: {
        shape: [[[0]]],
        classes: "bg-gray-800 border-gray-900"
    },

    [Tetromino.I]: {
        classes: "bg-cyan-400 border-4 border-t-cyan-300 border-l-cyan-300 border-b-cyan-700 border-r-cyan-700",
        shape: [
            [
                [0, 0, 0, 0],
                [Tetromino.I, Tetromino.I, Tetromino.I, Tetromino.I],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, Tetromino.I, 0],
                [0, 0, Tetromino.I, 0],
                [0, 0, Tetromino.I, 0],
                [0, 0, Tetromino.I, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [Tetromino.I, Tetromino.I, Tetromino.I, Tetromino.I],
                [0, 0, 0, 0]
            ],
            [
                [0, Tetromino.I, 0, 0],
                [0, Tetromino.I, 0, 0],
                [0, Tetromino.I, 0, 0],
                [0, Tetromino.I, 0, 0]
            ]
        ]
    },

    [Tetromino.J]: {
        classes: "bg-pink-400 border-4 border-t-pink-300 border-l-pink-300 border-b-pink-700 border-r-pink-700",
        shape: [
            [
                [Tetromino.J, 0, 0],
                [Tetromino.J, Tetromino.J, Tetromino.J],
                [0, 0, 0]
            ],
            [
                [0, Tetromino.J, Tetromino.J],
                [0, Tetromino.J, 0],
                [0, Tetromino.J, 0]
            ],
            [
                [0, 0, 0],
                [Tetromino.J, Tetromino.J, Tetromino.J],
                [0, 0, Tetromino.J]
            ],
            [
                [0, Tetromino.J, 0],
                [0, Tetromino.J, 0],
                [Tetromino.J, Tetromino.J, 0]
            ]
        ]
    },

    [Tetromino.L]: {
        classes: "bg-orange-400 border-4 border-t-orange-300 border-l-orange-300 border-b-orange-700 border-r-orange-700",
        shape: [
            [
                [0, 0, Tetromino.L],
                [Tetromino.L, Tetromino.L, Tetromino.L],
                [0, 0, 0]
            ],
            [
                [0, Tetromino.L, 0],
                [0, Tetromino.L, 0],
                [0, Tetromino.L, Tetromino.L]
            ],
            [
                [0, 0, 0],
                [Tetromino.L, Tetromino.L, Tetromino.L],
                [Tetromino.L, 0, 0]
            ],
            [
                [Tetromino.L, Tetromino.L, 0],
                [0, Tetromino.L, 0],
                [0, Tetromino.L, 0]
            ]
        ]
    },

    [Tetromino.O]: {
        classes: "bg-yellow-400 border-4 border-t-yellow-300 border-l-yellow-300 border-b-yellow-700 border-r-yellow-700",
        shape: [
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]],
            [[Tetromino.O, Tetromino.O], [Tetromino.O, Tetromino.O]]
        ]
    },

    [Tetromino.S]: {
        classes: "bg-red-400 border-4 border-t-red-300 border-l-red-300 border-b-red-700 border-r-red-700",
        shape: [
            [
                [0, Tetromino.S, Tetromino.S],
                [Tetromino.S, Tetromino.S, 0],
                [0, 0, 0]
            ],
            [
                [0, Tetromino.S, 0],
                [0, Tetromino.S, Tetromino.S],
                [0, 0, Tetromino.S]
            ],
            [
                [0, 0, 0],
                [0, Tetromino.S, Tetromino.S],
                [Tetromino.S, Tetromino.S, 0]
            ],
            [
                [Tetromino.S, 0, 0],
                [Tetromino.S, Tetromino.S, 0],
                [0, Tetromino.S, 0]
            ]
        ]
    },

    [Tetromino.T]: {
        classes: "bg-purple-400 border-4 border-t-purple-300 border-l-purple-300 border-b-purple-700 border-r-purple-700",
        shape: [
            [
                [0, Tetromino.T, 0],
                [Tetromino.T, Tetromino.T, Tetromino.T],
                [0, 0, 0]
            ],
            [
                [0, Tetromino.T, 0],
                [0, Tetromino.T, Tetromino.T],
                [0, Tetromino.T, 0]
            ],
            [
                [0, 0, 0],
                [Tetromino.T, Tetromino.T, Tetromino.T],
                [0, Tetromino.T, 0]
            ],
            [
                [0, Tetromino.T, 0],
                [Tetromino.T, Tetromino.T, 0],
                [0, Tetromino.T, 0]
            ]
        ]
    },

    [Tetromino.Z]: {
        classes: "bg-green-400 border-4 border-t-green-300 border-l-green-300 border-b-green-700 border-r-green-700",
        shape: [
            [
                [Tetromino.Z, Tetromino.Z, 0],
                [0, Tetromino.Z, Tetromino.Z],
                [0, 0, 0]
            ],
            [
                [0, 0, Tetromino.Z],
                [0, Tetromino.Z, Tetromino.Z],
                [0, Tetromino.Z, 0]
            ],
            [
                [0, 0, 0],
                [Tetromino.Z, Tetromino.Z, 0],
                [0, Tetromino.Z, Tetromino.Z]
            ],
            [
                [0, Tetromino.Z, 0],
                [Tetromino.Z, Tetromino.Z, 0],
                [Tetromino.Z, 0, 0]
            ]
        ]
    }
};