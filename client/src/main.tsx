import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes } from "@generouted/react-router";
import { useSocket } from "@/lib/stores/use-socket.ts";

useSocket.getState().connect();

createRoot(document.getElementById("root")!).render(<Routes />);
