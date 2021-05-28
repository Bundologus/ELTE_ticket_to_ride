import io from 'socket.io-client';

const SERVER_PATH = 'http://webprogramozas.inf.elte.hu:3031/';

let socket;

export class TicketToRideChannel {
  constructor(resource) {
    this.resource = resource;
    if (!socket) {
      socket = io(SERVER_PATH);
    }
  }

  createRoom(maxPlayerCount) {
    socket.emit('create-room', this.resource, {
      maxPlayerCount,
      emitter: socket.id,
    });
  }
}
