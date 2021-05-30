import io from 'socket.io-client';

/* const SERVER_PATH = 'http://webprogramozas.inf.elte.hu:3031/'; */
const SERVER_PATH = 'http://192.168.0.106:3031/';

let socket;

export class TicketToRideChannel {
  constructor() {
    if (!socket) {
      socket = io(SERVER_PATH);
      this.isHost = false;
      socket.on('connect', () => console.log(socket.id));
    }
  }

  /******************** EMITTERS ********************/
  createRoom(
    maxPlayerCount,
    responseHandler = (message) => defaultHandler('create-room'),
  ) {
    this.isHost = true;
    socket.emit('create-room', maxPlayerCount, responseHandler);
  }

  joinRoom(roomId, responseHandler = (message) => defaultHandler('join-room')) {
    socket.emit('join-room', roomId, responseHandler);
  }

  leaveRoom(
    roomId,
    responseHandler = (message) => defaultHandler('leave-room'),
  ) {
    socket.emit('leave-room', roomId, responseHandler);
  }

  syncState(
    roomId,
    state,
    noEcho = true,
    responseHandler = ({ status }) => {
      if (status === 'ok') console.log('Status synced');
      else console.error('Status sync failed');
    },
  ) {
    socket.emit('sync-state', roomId, state, noEcho, responseHandler);
  }

  syncAction(
    roomId,
    action,
    noEcho = true,
    responseHandler = ({ status }) => {
      if (status === 'ok') console.log('Action synced');
      else console.error('Action sync failed');
    },
  ) {
    socket.emit('sync-action', roomId, action, noEcho, responseHandler);
  }

  /******************** LISTENERS ********************/

  onStateSync(handler) {
    const listener = (receivedMessage) => {
      handler(receivedMessage);
    };

    socket.on('state-changed', listener);
    return () => socket.off('state-changed', listener);
  }

  onActionSync(handler) {
    const listener = (receivedMessage) => {
      handler(receivedMessage);
    };

    socket.on('action-sent', listener);
    return () => socket.off('action-sent', listener);
  }

  onPlayerLeft(handler) {
    const listener = (receivedMessage) => {
      handler(receivedMessage);
    };

    socket.on('player-left', listener);
    return () => socket.off('player-left', listener);
  }
}

function defaultHandler(messageType) {
  return (message) => {
    console.log(`${messageType} response:`);
    console.log(message.status);
  };
}
