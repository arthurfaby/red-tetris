export const GAME_MODES = {
    DEFAULT: 'DEFAULT',
    ACCELERATED_GRAVITY: 'ACCELERATED_GRAVITY',
    SWAP_PIECES: 'SWAP_PIECES',
} as const

export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES]