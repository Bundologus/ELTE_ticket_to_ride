export function selectGame(state) {
  return state.game;
}

export function selectCities(state) {
  const game = selectGame(state);

  return game.cities;
}
