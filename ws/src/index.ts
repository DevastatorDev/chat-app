import { WebSocketServer, WebSocket } from "ws";
import {
  CHAT,
  CREATE,
  CREATED,
  ERROR,
  JOIN,
  JOINED,
  NOT_CREATED,
  NOT_EXISTS,
  SUCCESS,
} from "./message";

const wss = new WebSocketServer({ port: 8080 });

interface roomInterface {
  ws: WebSocket;
  roomId: string;
}

interface messageInterface {
  type: string;
  payload: {
    roomId?: string;
    data?: string;
  };
}

const rooms: roomInterface[] = [];

wss.on("connection", (ws) => {
  ws.on("message", (data: messageInterface) => {
    const message: messageInterface = JSON.parse(data.toString());

    const existedRoom = rooms.find(
      (room) => room.roomId === message.payload.roomId
    );

    if (message.type === CREATE) {
      const roomId = message.payload.roomId;

      if (!roomId) {
        ws.send(
          JSON.stringify({
            type: NOT_CREATED,
            status: ERROR,
            payload: {
              data: "Room id can't be empty",
            },
          })
        );
      } else if (existedRoom) {
        ws.send(
          JSON.stringify({
            type: NOT_CREATED,
            status: ERROR,
            payload: {
              data: "Room with this id already exists",
            },
          })
        );
      } else {
        rooms.push({
          ws,
          roomId,
        });

        ws.send(
          JSON.stringify({
            type: CREATED,
            status: SUCCESS,
            payload: {
              data: `Room created: ${roomId}`,
            },
          })
        );
      }
    } else if (message.type === JOIN) {
      if (!existedRoom) {
        ws.send(
          JSON.stringify({
            type: NOT_EXISTS,
            status: ERROR,
            payload: {
              data: "Room doesn't exists",
            },
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: JOINED,
            status: SUCCESS,
            payload: {
              data: "Room joined successfully",
            },
          })
        );
      }
    } else if (message.type === CHAT) {
      const connectedSockets = rooms.filter(
        (room) => room.roomId === message.payload.roomId
      );

      connectedSockets.forEach((socket) =>
        socket.ws.send(
          JSON.stringify({
            type: CHAT,
            status: SUCCESS,
            payload: {
              data: message.payload.data,
            },
          })
        )
      );
    }
  });
});
