import {Piece} from "../../domain/Piece";

export class RoomsManager {
    private rooms: Map<string, Piece> = new Map()

    public newRoom(room: string, listPlayer: string[]) {
        if (this.rooms.has(room)) {
            return;
        }
        else {
            this.rooms.set(room, new Piece(listPlayer));
        }
    }

    public getPiece(room: string) {
        return this.rooms.get(room);
    }
}