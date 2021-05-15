export const DRAW_FROM_ROSTER = 'DRAW_FROM_ROSTER';
export const DRAW_FROM_DECK = 'DRAW_FROM_DECK';
export const DRAW_ROUTE_CARDS = 'DRAW_ROUTE_CARDS';
export const BUILD_CONNECTION = 'BUILD_CONNECTION';

export function drawFromRoster(playerId, playerName, cardColor, position) {
  return {
    type: DRAW_FROM_ROSTER,
    palyoad: {
      playerId,
      playerName,
      cardColor,
      position,
    },
  };
}

export function drawFromDeck(playerId, playerName, cardColors) {
  return {
    type: DRAW_FROM_DECK,
    palyoad: {
      playerId,
      playerName,
      cardColors,
    },
  };
}

export function drawRouteCards(
  playerId,
  playerName,
  selectedRouteCards,
  droppedRouteCards,
) {
  return {
    type: DRAW_ROUTE_CARDS,
    palyoad: {
      playerId,
      playerName,
      selectedRouteCards,
      droppedRouteCards,
    },
  };
}

export function buildConnection(
  playerId,
  playerName,
  usedTrainColors,
  connection,
) {
  return {
    type: BUILD_CONNECTION,
    palyoad: {
      playerId,
      playerName,
      usedTrainColors,
      connection,
    },
  };
}
