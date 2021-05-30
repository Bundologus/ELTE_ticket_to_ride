import { sendSyncAction } from '../messages/actions';

export const APP_TO_MAIN = 'APP_TO_MAIN';
export const APP_TO_WAIT = 'APP_TO_WAIT';
export const APP_TO_GAME = 'APP_TO_GAME';

function setAppToMainAction() {
  return {
    type: APP_TO_MAIN,
  };
}

function setAppToWaitAction() {
  return {
    type: APP_TO_WAIT,
  };
}

function setAppToGameAction() {
  return {
    type: APP_TO_GAME,
  };
}

export function setAppToMain() {
  return (dispatch, getState) => {
    const stateTree = getState();
    dispatch(
      sendSyncAction(stateTree.game.gameId, setAppToMainAction(), () => {
        dispatch(setAppToMainAction());
      }),
    );
  };
}

export function setAppToWait() {
  return (dispatch, getState) => {
    const stateTree = getState();
    dispatch(
      sendSyncAction(stateTree.game.gameId, setAppToWaitAction(), () => {
        dispatch(setAppToWaitAction());
      }),
    );
  };
}

export function setAppToGame() {
  return (dispatch, getState) => {
    const stateTree = getState();
    dispatch(
      sendSyncAction(stateTree.game.gameId, setAppToGameAction(), () => {
        dispatch(setAppToGameAction());
      }),
    );
  };
}
