import { messageChannel } from '../../api/initialize';
import { loadSyncedState } from '../game/actions';

/******************** EMITTERS ********************/

export function sendCreateRoom(
  maxPlayerCount,
  onSuccess,
  onFailure = () => {
    console.error('Room creation failed.');
  },
) {
  return () => {
    messageChannel.createRoom(
      maxPlayerCount,
      responseHandler(onSuccess, onFailure),
    );
  };
}

export function sendJoinRoom(
  roomId,
  onSuccess,
  onFailure = () => {
    console.error(`Joining room ${roomId} failed.`);
  },
) {
  return () => {
    messageChannel.joinRoom(roomId, responseHandler(onSuccess, onFailure));
  };
}

export function sendLeaveRoom(
  roomId,
  onSuccess = () => {
    console.error(`Left room ${roomId}.`);
  },
  onFailure = () => {
    console.error(`Leaving room ${roomId} failed.`);
  },
) {
  return () => {
    messageChannel.leaveRoom(roomId, responseHandler(onSuccess, onFailure));
  };
}

export function sendSyncState(roomId, state, onSuccess, onFailure) {
  return () => {
    messageChannel.syncState(
      roomId,
      state,
      true,
      responseHandler(onSuccess, onFailure),
    );
  };
}

export function sendSyncAction(
  roomId,
  action,
  onSuccess,
  onFailure = () => {
    alert('Communication with server failed.');
  },
) {
  return () => {
    messageChannel.syncAction(
      roomId,
      action,
      true,
      responseHandler(onSuccess, onFailure),
    );
  };
}

/******************** LISTENERS ********************/

export function setupLeaveListener() {
  return () => {
    messageChannel.onPlayerLeft((payload) => {
      console.log('player with socket id' + payload.socketId + 'left.');
    });
  };
}

export function setupActionSyncListener() {
  return (dispatch) => {
    messageChannel.onActionSync((payload) => {
      dispatch(payload.action);
    });
  };
}

export function setupStateSyncListener() {
  return (dispatch) => {
    messageChannel.onStateSync((payload) => {
      dispatch(loadSyncedState(payload.state));
    });
  };
}

function responseHandler(onSuccess, onFailure) {
  return (payload) => {
    let cleanPayload = { ...payload };
    delete cleanPayload.status;

    if (payload.status === 'ok') {
      onSuccess(cleanPayload);
    } else if (payload.status === 'error') {
      onFailure(cleanPayload);
      console.error(payload.message);
    } else {
      console.error(`Unexpected response status: >>${payload.status}<<`);
    }
  };
}

/******************** THUNKS ********************/

export function syncAndDispatchAction(action) {
  return (dispatch, getState) => {
    const state = getState();
    const roomId = state.game.gameId;

    dispatch(
      sendSyncAction(roomId, action, () => {
        dispatch(action);
      }),
    );
  };
}
