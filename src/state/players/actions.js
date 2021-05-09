export const ADD_TRAIN_CARD = 'ADD_TRAIN_CARD';
export const DRAW_ROUTES = 'DRAW_ROUTES';
export const ADD_ROUTE_CARDS = 'ADD_ROUTE_CARDS';
export const BUILD_CONNECTION = 'BUILD_CONNECTION';

export function addTrainCard(playerId, cardColor, blindPull = false) {
  return {
    type: ADD_TRAIN_CARD,
    palyoad: {
      playerId,
      cardColor,
      blindPull,
    },
  };
}

export function drawRoutes(playerId) {
  return {
    type: DRAW_ROUTES,
    palyoad: playerId,
    }
  }
}

export function addRouteCard(playerId, routeIds) {
  return {
    type: ADD_ROUTE_CARDS,
    palyoad: {
      playerId,
      routeIds,
    },
  };
}

export function buildConnection(playerId, connectionId) {
  return {
    type: BUILD_CONNECTION,
    palyoad: {
      playerId,
      connectionId,
    },
  };
}
