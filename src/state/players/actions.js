export const DRAW_FROM_ROSTER = 'DRAW_FROM_ROSTER';
export const DRAW_FROM_DECK = 'DRAW_FROM_DECK';
export const ADD_ROUTE_CARDS = 'ADD_ROUTE_CARDS';
export const BUILD_CONNECTION = 'BUILD_CONNECTION';

export function drawFromRoster(playerId, cardColor, position) {
  return {
    type: DRAW_FROM_ROSTER,
    palyoad: {
      playerId,
      cardColor,
      position,
    },
  };
}

export function drawFromDeck(playerId, cardColors) {
  return {
    type: DRAW_FROM_DECK,
    palyoad: {
      playerId,
      cardColors,
    },
  };
}

export function addRouteCard(playerId, selectedRouteCards) {
  return {
    type: ADD_ROUTE_CARDS,
    palyoad: {
      playerId,
      selectedRouteCards,
    },
  };
}

export function buildConnection(playerId, usedTrainColors, connection) {
  return {
    type: BUILD_CONNECTION,
    palyoad: {
      playerId,
      usedTrainColors,
      connection,
    },
  };
}
