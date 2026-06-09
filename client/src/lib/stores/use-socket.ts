import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@red-tetris/shared";
import { toast } from "sonner";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000/",
  {
    autoConnect: false,
  },
);

export interface SocketStore {
  socketId: string | undefined;
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
  socket.on("connect", () => {
    set({ socketId: socket.id });
  });

  socket.on("disconnect", () => {
    set({ socketId: undefined });
  });

  return {
    socketId: socket.id,
    connect: () => {
      try {
        socket.connect();
      } catch (_e: unknown) {
        toast.error("Failed to connect to socket");
      }
    },
    emit: (event, ...args) => {
      try {
        socket.emit(event, ...(args as never));
      } catch (_e: unknown) {
        toast.error("Failed to connect to socket");
      }
    },
    listen: (event, handler) => {
      try {
        socket.on(event, handler as never);
      } catch (_e: unknown) {
        toast.error("Failed to connect to socket");
      }
    },
    off: (event, handler) => {
      try {
        socket.off(event, handler as never);
      } catch (_e: unknown) {
        toast.error("Failed to connect to socket");
      }
    },
  };
});
