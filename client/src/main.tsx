import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes } from "@generouted/react-router";
import {socket} from "@/socket.ts";

socket.connect()

createRoot(document.getElementById("root")!).render(<Routes />);
