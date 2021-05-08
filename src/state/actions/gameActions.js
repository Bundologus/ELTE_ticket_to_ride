export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';

export function createGame(hostPlayer, playerCount) {
  return {
    type: CREATE_GAME,
    payload: {
      hostPlayer,
      playerCount,
    },
  };
}

export function joinGame(gameId, playerName) {
  return {
    type: JOIN_GAME,
    payload: {
      gameId,
      playerName,
    },
  };
}
