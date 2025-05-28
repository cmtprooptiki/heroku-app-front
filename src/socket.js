import { io } from "socket.io-client";
import apiBaseUrl from "./apiConfig"; // same as used in OnlineUsers

const socket = io(apiBaseUrl, {
  autoConnect: true,  
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  withCredentials: true,
});

export default socket;
