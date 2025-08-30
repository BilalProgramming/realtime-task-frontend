import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(URL, { autoConnect: false }); // don't auto-connect

export const UseSocketConnection = (userId) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // connect socket once
    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    return () => {
      // cleanup listeners only, don't disconnect globally here
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    socket.emit("joinRoom", userId);
    console.log("User joined room:", userId);
  }, [userId]);

  return { socket, connected };
};
