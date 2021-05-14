import { v4 as uuidv4 } from 'uuid';
import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import {
  CREATE_GAME,
  START_GAME,
  NEXT_PLAYER,
  START_LAST_ROUND,
  DEAL_STARTER_HAND,
  FILL_ROSTER,
} from './actions';
import {
  GAME_WAITING,
  GAME_ENDED,
  GAME_LAST_ROUND,
  PLAYER_BEGIN,
  PLAYER_DRAW_TRAIN,
  PLAYER_DONE,
  CART_COLOR_LOCOMOTIVE,
} from '../../constants/gameConstants';
import {
  DRAW_ROUTE_CARDS,
  BUILD_CONNECTION,
  DRAW_FROM_DECK,
  DRAW_FROM_ROSTER,
} from '../players/actions';

const initialTrainDeck = (() => {
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
})();

const initialState = {
  maxPlayers: 5,
  activePlayerId: 0,
  gameId: '',
  gameState: GAME_WAITING,
  lastRound: false,
  lastPlayerId: null,
  cities: ticketToRideData.cities,
  connections: ticketToRideData.connections,
  routeDeck: shuffle(ticketToRideData.routes),
  longRouteDeck: shuffle(ticketToRideData.longRoutes),
  trainCardDeck: shuffle(initialTrainDeck),
  trainDiscardPile: [],
  trainCardRoster: [],
};

export function gameReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case CREATE_GAME: {
      newState = initNewGame(state);
      break;
    }
    case START_GAME: {
      newState = setFirstRound(state);
      break;
    }
    case DEAL_STARTER_HAND: {
      newState = popFromDeck(state, payload.trainCards);
      newState = popFromLongRouteDeck(newState, payload.longRouteCard);
      break;
    }
    case DRAW_FROM_ROSTER: {
      newState = popFromRoster(state, payload.cardColor, payload.position);
      break;
    }
    case FILL_ROSTER: {
      newState = fillRosterFromDeck(state);
      break;
    }
    case DRAW_FROM_DECK: {
      newState = popFromDeck(state, payload.cardColors);
      break;
    }
    case START_LAST_ROUND: {
      newState = setLastRound(state);
      break;
    }
    case NEXT_PLAYER: {
      newState = setNextPlayer(state);
      break;
    }
    case DRAW_ROUTE_CARDS: {
      newState = updateRouteDeck(
        state,
        payload.selectedRouteCards,
        payload.droppedRouteCards,
      );
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

function initNewGame(state) {
  return {
    ...state,
    maxPlayers: 2,
    activePlayerId: 0,
    gameId: uuidv4(),
    gameState: GAME_WAITING,
    lastRound: false,
    lastPlayerId: null,
  };
}

function setFirstRound(state) {
  return {
    ...state,
    activePlayerId: 0,
    gameState: PLAYER_BEGIN,
  };
}

function setLastRound(state) {
  return {
    ...state,
    activePlayerId: getNextPlayer(state),
    gameState: PLAYER_BEGIN,
    lastRound: true,
    lastPlayerId: state.activePlayerId,
  };
}

function setNextPlayer(state) {
  if (
    state.gameState === GAME_LAST_ROUND &&
    state.acitvePlayer === state.lastPlayerId
  ) {
    return {
      ...state,
      gameState: GAME_ENDED,
    };
  } else {
    return {
      ...state,
      gameState: PLAYER_BEGIN,
      activePlayerId: getNextPlayer(state),
    };
  }
}

function getNextPlayer(state) {
  if (state.acitvePlayer + 1 >= state.maxPlayers) return 0;
  else return state.acitvePlayer + 1;
}

function popFromDeck(state, cardColors) {
  let tempDeck = [...state.trainCardDeck];
  let tempDiscard = state.trainDiscardPile;

  if (tempDeck.length <= cardColors.length) {
    tempDeck = [...shuffle(tempDiscard), ...tempDeck];
    tempDiscard = [];
  }

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
    trainDiscardPile: tempDiscard,
    gameState: PLAYER_DONE,
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
  let tempGameState;

  if (popped !== cardColor)
    console.error(
      `Error occured while removing card form roster.\n\tExpected color: ${cardColor}\n\tPopped color: ${popped}`,
    );

  if (state.gameState === PLAYER_BEGIN && cardColor !== CART_COLOR_LOCOMOTIVE) {
    tempGameState = PLAYER_DRAW_TRAIN;
  } else {
    tempGameState = PLAYER_DONE;
  }

  return {
    ...state,
    trainCardRoster: tempRoster,
    gameState: tempGameState,
  };
}

function fillRosterFromDeck(state) {
  let tempRoster = [...state.trainCardRoster];
  let tempDeck = [...state.trainCardDeck];

  while (tempRoster.length < 5) {
    tempRoster.push(tempDeck.pop());
  }

  return {
    ...state,
    trainCardDeck: tempDeck,
    trainCardRoster: tempRoster,
  };
}

function updateRouteDeck(state, selectedRouteCards, droppedRouteCards) {
  let selectedIds = [...selectedRouteCards, ...droppedRouteCards].map(
    (routeCard) => {
      return routeCard.id;
    },
  );

  let tempRouteDeck = state.routeDeck.filter((routeCard) => {
    return !selectedIds.includes(routeCard.id);
  });

  return {
    ...state,
    routeDeck: [...selectedRouteCards, ...tempRouteDeck],
    gameState: PLAYER_DONE,
  };
}

/* function popFromRouteDeck(state, selectedRouteCards) {
  let selectedIds = selectedRouteCards.map((routeCard) => {
    return routeCard.id;
  });

  let tempRouteDeck = state.routeDeck.filter((routeCard) => {
    return !selectedIds.includes(routeCard.id);
  });

  return {
    ...state,
    routeDeck: tempRouteDeck,
    gameState: PLAYER_DONE,
  };
} */

function popConnection(state, selectedConnection) {
  let tempConnections = [...state.connections];

  tempConnections[selectedConnection.id].isBuilt = true;

  return {
    ...state,
    connections: tempConnections,
    gameState: PLAYER_DONE,
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
