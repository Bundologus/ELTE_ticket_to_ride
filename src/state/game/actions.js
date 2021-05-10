export const CREATE_GAME = 'CREATE_GAME';
export const START_GAME = 'START_GAME';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const START_LAST_ROUND = 'START_LAST_ROUND';
export const DEAL_STARTER_HAND = 'DEAL_STARTER_HAND';
export const FILL_ROSTER = 'FILL_ROSTER';

export function createGame(hostPlayer, maxPlayers) {
  return {
    type: CREATE_GAME,
    payload: {
      hostPlayer,
      maxPlayers,
    },
  };
}

export function startGame(gameId) {
  return {
    type: START_GAME,
    payload: {},
  };
}

export function nextPlayer() {
  return {
    type: NEXT_PLAYER,
    payload: {},
  };
}

export function startLastRound() {
  return {
    type: START_LAST_ROUND,
    payload: {},
  };
}

export function dealStarterHand(playerId, trainCards, longRouteCard) {
  return {
    type: DEAL_STARTER_HAND,
    payload: { playerId, trainCards, longRouteCard },
  };
}

export function fillRoster() {
  return {
    type: FILL_ROSTER,
    payload: null,
  };
}
