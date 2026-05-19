import {ClientToServerEvents, SocketServer} from '../../types';
import {Socket} from "socket.io";

export function handlerSocketConnection(socket:  Socket<ClientToServerEvents>, io: SocketServer) {
    socket.on('join_room', async (payload) => {
        socket.data.username = payload.username;
        socket.join(payload.room);
        const socketPlayerList = await io.in(payload.room).fetchSockets()
        const playerList: string[] = socketPlayerList.map((player) => player.data.username)
        io.in(payload.room).emit('player_list', playerList);
    })

    socket.on('disconnecting', async () => {
        for (const room of socket.rooms) {
            const socketOldPlayerList = await io.in(room).fetchSockets()
            const playerList: string[] = socketOldPlayerList
                .filter((player) => player.id !== socket.id)
                .map((player) => player.data.username)

            io.in(room).emit('player_list', playerList);
        }
    })
}