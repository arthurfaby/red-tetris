export const JOIN_GAME_STATUS = {
    CREATED: 0,
    JOINED: 1,
    ALREADY_LAUNCHED: 2,
    ERROR: 3
} as const

export type JoinGameStatus = typeof JOIN_GAME_STATUS[keyof typeof JOIN_GAME_STATUS];
