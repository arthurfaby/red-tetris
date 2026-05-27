import { io, Socket } from "socket.io-client";
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
} from "@red-tetris/shared";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000/",
  {
    autoConnect: false,
  },
);
