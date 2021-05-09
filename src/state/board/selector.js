export function selectBoard(state) {
  return state.board;
}

export function selectStarterHand(state) {
  const board = selectBoard(state);
  return {
    trainCards: board.trainCardDeck.slice(-4),
    longRouteCard: board.longRouteDeck.slice(-1),
  };
}
