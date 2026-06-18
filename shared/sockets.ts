import type {TetrominoType} from "./tetrominos";
import {Server, Socket} from "socket.io";
import type {JoinGameStatus} from "./status";
import type {GameMode} from "./game-mode";

export type PlayerListData = {
    username: string,
    id: string,
    ko: boolean
}

export interface ServerToClientEvents {
    player_list: (players: PlayerListData[]) => void
    next_piece: (tetromino: TetrominoType) => void
    join_game: (joinStatus: JoinGameStatus, gameMode: GameMode) => void
    start_piece: (start_piece: TetrominoType, next_piece: TetrominoType) => void
    set_leader: (playerId: string) => void
    player_spectrum: (id: string, spectrum: number[]) => void
    penalty_lines: (numberOfPenaltyLines: number) => void
    game_over: (payload: {id: string, username: string}) => void
    game_mode_changed: (gameMode: GameMode) => void
    ko: (playerId: string) => void
}

export interface ClientToServerEvents {
    join_game: (payload: { username: string; gameId: string }) => void
    leave_game: (gameId: string) => void
    next_piece: (gameId: string) => void
    start_game: (gameId: string, gameMode: GameMode) => void
    new_spectrum: (spectrum: number[]) => void
    finish_lines: (numberOfLines: number) => void
    change_game_mode: (gameMode: GameMode) => void
    death: () => void
}

export interface SocketData {
    gameId: string
}

export type SocketServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData
>
export type SocketPlayer = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData
>
