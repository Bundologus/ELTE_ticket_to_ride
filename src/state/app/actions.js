export const APP_TO_MAIN = 'APP_TO_MAIN';
export const APP_TO_WAIT = 'APP_TO_WAIT';
export const APP_TO_GAME = 'APP_TO_GAME';

export function setAppToMain() {
  return {
    type: APP_TO_MAIN,
  };
}

export function setAppToWait() {
  return {
    type: APP_TO_WAIT,
  };
}

export function setAppToGame() {
  return {
    type: APP_TO_GAME,
  };
}
