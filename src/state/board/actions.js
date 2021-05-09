export const DEAL_STARTER_HAND = 'DEAL_STARTER_HAND';
export const FILL_ROSTER = 'FILL_ROSTER';
export const PUSHBACK_ROUTE_CARDS = 'PUSHBACK_ROUTE_CARDS';

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

export function pushbakcRouteCards(routeCards) {
  return {
    type: PUSHBACK_ROUTE_CARDS,
    payload: routeCards,
  };
}
