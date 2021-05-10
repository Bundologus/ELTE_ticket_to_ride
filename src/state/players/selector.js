import { selectGame } from '../game/selector';

export function selectPlayers(state) {
  return state.players;
}

export function selectActivePlayer(state) {
  const players = selectPlayers(state);
  const game = selectGame(state);

  return players[game.activePlayerId];
}
