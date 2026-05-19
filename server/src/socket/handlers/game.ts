import {SocketPlayer} from "../../types";
import {RoomsManager} from "../managers/RoomsManager";

export function handlerGame(socket: SocketPlayer, roomManager: RoomsManager ) {
    socket.on("next_piece", async (room: string) => {
        if(!socket.rooms.has(room)){
            return;
        }
        const piece = roomManager.getPiece(room)
        if(piece === undefined){
            return;
        }
        piece.updateListPlayerNumber(socket.id)
        console.log(piece.getTetromino(socket.id))
    })
}