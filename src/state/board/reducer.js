import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import {
  ADD_ROUTE_CARDS,
  BUILD_CONNECTION,
  DRAW_FROM_DECK,
  DRAW_FROM_ROSTER,
} from '../players/actions';
import { DEAL_STARTER_HAND, PUSHBACK_ROUTE_CARDS } from './actions';

const initialTrainDeck = () => {
  let baseArr = Array(14).fill('locomotive');
  for (const color of [
    'pink',
    'white',
    'blue',
    'yellow',
    'orange',
    'black',
    'red',
    'green',
  ]) {
    baseArr = baseArr.concat(Array(12).fill(color));
  }
  return baseArr;
};

const initialState = {
  cities: ticketToRideData.cities,
  freeConnections: ticketToRideData.connections,
  routeDeck: shuffle(ticketToRideData.routes),
  longRouteDeck: shuffle(ticketToRideData.longRoutes),
  trainCardDeck: shuffle(initialTrainDeck),
  trainDiscardPile: [],
  trainCardRoster: [],
};

export function boardReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case DEAL_STARTER_HAND: {
      newState = popFromDeck(state, payload.trainCards);
      newState = popFromLongRouteDeck(newState, payload.longRouteCard);
      break;
    }
    case DRAW_FROM_ROSTER: {
      newState = popFromRoster(state, payload.cardColor, payload.position);
      break;
    }
    case DRAW_FROM_DECK: {
      newState = popFromDeck(state, payload.cardColors);
      break;
    }
    case ADD_ROUTE_CARDS: {
      newState = popFromRouteDeck(state, payload.selectedRouteCards);
      break;
    }
    case PUSHBACK_ROUTE_CARDS: {
      newState = pushbackToRouteDeck(state, payload.selectedRouteCards);
      break;
    }
    case BUILD_CONNECTION: {
      newState = popConnection(state, payload.connection);
      newState = pushToDiscardPile(newState, payload.usedTrainColors);
      break;
    }
    default: {
      newState = state;
      break;
    }
  }
  return newState;
}

function popFromDeck(state, cardColors) {
  let tempDeck = [...state.trainCardDeck];

  for (const cardColor of cardColors) {
    let topCard = tempDeck.pop();
    if (topCard !== cardColor) {
      console.error(
        `Error occured while drawing train cards from deck.\n\tDrawn cards:\n\t${cardColors}\n\tDeck:\n\t${state.trainCardDeck}`,
      );
    }
  }
  return {
    ...state,
    trainCardDeck: tempDeck,
  };
}

function popFromLongRouteDeck(state, chosenLongRouteCard) {
  return {
    ...state,
    longRouteDeck: state.longRouteDeck.filter((longRouteCard) => {
      return longRouteCard.id !== chosenLongRouteCard.id;
    }),
  };
}

function popFromRoster(state, cardColor, position) {
  let tempRoster = [...state.trainCardRoster];
  let popped = tempRoster.splice(position, 1);

  if (popped !== cardColor)
    console.error(
      `Error occured while removing card form roster.\n\tExpected color: ${cardColor}\n\tPopped color: ${popped}`,
    );

  return {
    ...state,
    trainCardRoster: tempRoster,
  };
}

function pushbackToRouteDeck(state, selectedRouteCards) {
  return {
    ...state,
    routeDeck: [...selectedRouteCards, ...state.routeDeck],
  };
}

function popFromRouteDeck(state, selectedRouteCards) {
  let selectedIds = selectedRouteCards.map((routeCard) => {
    return routeCard.id;
  });

  let tempRouteDeck = state.routeDeck.filter((routeCard) => {
    return !selectedIds.includes(routeCard.id);
  });

  return {
    ...state,
    routeDeck: tempRouteDeck,
  };
}

function popConnection(state, selectedConnection) {
  let tempRouteDeck = state.freeConnections.filter((connection) => {
    return selectedConnection.id !== connection.id;
  });

  return {
    ...state,
    routeDeck: tempRouteDeck,
  };
}

function pushToDiscardPile(state, usedTrainColors) {
  return {
    ...state,
    trainDiscardPile: [...state.trainDiscardPile, ...usedTrainColors],
  };
}

function shuffle(iterable) {
  let shuffled = JSON.parse(JSON.stringify(iterable));
  let max = shuffled.length,
    last,
    randId;

  while (max) {
    randId = Math.floor(Math.random() * max--);

    last = shuffled[max];
    shuffled[max] = shuffled[randId];
    shuffled[randId] = last;
  }

  return shuffled;
}
