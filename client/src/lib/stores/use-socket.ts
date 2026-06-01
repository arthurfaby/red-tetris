import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@red-tetris/shared";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000/",
  {
    autoConnect: false,
  },
);

export interface SocketStore {
  id: string | undefined;
  connect: () => void;
  emit: <K extends keyof ClientToServerEvents>(
    event: K,
    ...args: Parameters<ClientToServerEvents[K]>
  ) => void;
  listen: <K extends keyof ServerToClientEvents>(
    event: K,
    handler: ServerToClientEvents[K],
  ) => void;
  off: <K extends keyof ServerToClientEvents>(
    event: K,
    handler?: ServerToClientEvents[K],
  ) => void;
}

export const useSocket = create<SocketStore>((set) => {
  socket.on("connect", () => set({ id: socket.id }));
  socket.on("disconnect", () => set({ id: undefined }));

  return {
    id: socket.id,
    connect: () => socket.connect(),
    emit: (event, ...args) => {
      socket.emit(event, ...(args as never));
    },
    listen: (event, handler) => {
      socket.on(event, handler as never);
    },
    off: (event, handler) => {
      socket.off(event, handler as never);
    },
  };
});
