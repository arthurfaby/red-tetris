import {TetrominoType} from "./tetrominos";
import {Server, Socket} from "socket.io";

export type PlayerListData = {
    username: string,
    id: string
}

export interface ServerToClientEvents {
    player_list: (players: PlayerListData[]) => void
    next_piece: (tetromino: TetrominoType) => void
    start_piece: (start_piece: TetrominoType, next_piece: TetrominoType) => void
    set_leader: (playerId: string) => void
    player_spectrum: (playerName: string, spectrum: number[]) => void
    penalty_lines: (numberOfPenaltyLines: number) => void
}

export interface ClientToServerEvents {
    join_game: (payload: { username: string; gameId: string }) => void
    leave_game: (gameId: string) => void
    next_piece: (gameId: string) => void
    start_game: (gameId: string) => void
    new_spectrum: (spectrum: number[]) => void
    finish_lines: (numberOfLines: number) => void
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
