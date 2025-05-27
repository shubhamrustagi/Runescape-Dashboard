import { Server } from 'socket.io';

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" }
  });
  return io;
}

export function emitUpdate(data) {
  if (io) io.emit('data_update', data);
}