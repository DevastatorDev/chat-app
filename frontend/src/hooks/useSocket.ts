import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

export default function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onerror = (err) => {
      console.log(err);
    };

    ws.onopen = () => {
      console.log("value of the ws when the connection connects", ws);
      setSocket(ws);
      console.log("ws connected");
    };

    ws.onclose = () => {
      setSocket(null);
      console.log("ws closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
}
