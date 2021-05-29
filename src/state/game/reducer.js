import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import {
  CREATE_GAME,
  START_GAME,
  NEXT_PLAYER,
  START_LAST_ROUND,
  DEAL_STARTER_HAND,
  FILL_ROSTER,
  REFILL_TRAIN_DECK,
  SYNC_ROOM_STATE,
} from './actions';
import {
  GAME_WAITING,
  GAME_ENDED,
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
  DRAW_ROUTES_FIRST_ROUND,
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
  maxPlayers: 2,
  activePlayerId: 0,
  gameId: '',
  gameState: GAME_WAITING,
  lastRound: false,
  finishingPlayerId: null,
  cities: ticketToRideData.cities,
  connections: ticketToRideData.connections,
  routeDeck: ticketToRideData.routes,
  longRouteDeck: ticketToRideData.longRoutes,
  trainCardDeck: initialTrainDeck,
  trainDiscardPile: [],
  trainCardRoster: [],
  actionLog: [],
};

export function gameReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case CREATE_GAME: {
      newState = initNewGame(
        payload.maxPlayerCount,
        payload.gameId,
        payload.shuffledTrainDeck,
        payload.shuffledRouteDeck,
        payload.shuffledLongRouteDeck,
      );
      break;
    }
    case START_GAME: {
      newState = setFirstRound(state);
      newState = logAction(newState, '', '-1', `Game started.`);
      break;
    }
    case DEAL_STARTER_HAND: {
      newState = { ...state };
      for (const hand of payload.arrayOfHands) {
        newState = popFromDeck(newState, hand.trainCards);
        newState = popFromLongRouteDeck(newState, hand.longRouteCard);
      }
      break;
    }
    case DRAW_FROM_ROSTER: {
      newState = popFromRoster(state, payload.cardColor, payload.position);
      newState = logAction(
        newState,
        payload.playerName,
        payload.playerId,
        `picked a ${payload.cardColor} cart.`,
      );
      break;
    }
    case FILL_ROSTER: {
      newState = fillRosterFromDeck(state, payload);
      break;
    }
    case DRAW_FROM_DECK: {
      newState = popFromDeck(state, payload.cardColors);
      newState = logAction(
        newState,
        payload.playerName,
        payload.playerId,
        `pulled 2 from the cart deck.`,
      );
      break;
    }
    case START_LAST_ROUND: {
      newState = setLastRound(state, payload);
      newState = logAction(newState, '', '-1', `Last round started.`);
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
        true,
      );
      newState = logAction(
        newState,
        payload.playerName,
        payload.playerId,
        `pulled ${payload.selectedRouteCards.length} new routes.`,
      );
      break;
    }
    case DRAW_ROUTES_FIRST_ROUND: {
      newState = updateRouteDeck(
        state,
        payload.selectedRouteCards,
        payload.droppedRouteCards,
        false,
      );
      newState = logAction(
        newState,
        payload.playerName,
        payload.playerId,
        `pulled ${payload.selectedRouteCards.length} new routes.`,
      );
      break;
    }
    case BUILD_CONNECTION: {
      newState = setConnectionToBuilt(
        state,
        payload.connection,
        payload.playerColor,
      );
      newState = pushToDiscardPile(newState, payload.usedTrainColors);
      newState = logAction(
        newState,
        payload.playerName,
        payload.playerId,
        `built connection between ${payload.connection.toCity} and ${payload.connection.fromCity} with ${payload.usedTrainColors}.`,
      );
      break;
    }
    case REFILL_TRAIN_DECK: {
      newState = combineTrainDeck(state, payload);
      break;
    }
    case SYNC_ROOM_STATE: {
      newState = { ...payload.game };
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function initNewGame(
  maxPlayerCount,
  gameId,
  shuffledTrainDeck,
  shuffledRouteDeck,
  shuffledLongRouteDeck,
) {
  return {
    ...initialState,
    maxPlayers: maxPlayerCount,
    activePlayerId: 0,
    gameId: gameId,
    gameState: GAME_WAITING,
    lastRound: false,
    finishingPlayerId: null,
    routeDeck: shuffledRouteDeck,
    longRouteDeck: shuffledLongRouteDeck,
    trainCardDeck: shuffledTrainDeck,
  };
}

function setFirstRound(state) {
  return {
    ...state,
    activePlayerId: 0,
    gameState: PLAYER_BEGIN,
  };
}

function setLastRound(state, { playerId }) {
  return {
    ...state,
    lastRound: true,
    finishingPlayerId: playerId,
  };
}

function setNextPlayer(state) {
  if (
    state.lastRound &&
    Number(state.activePlayerId) === Number(state.finishingPlayerId)
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
  if (state.activePlayerId + 1 >= state.maxPlayers) return 0;
  else return state.activePlayerId + 1;
}

function popFromDeck(state, cardColors) {
  let tempDeck = [...state.trainCardDeck];

  for (const color of cardColors) {
    let topCard = tempDeck.pop();
    if (topCard !== color) {
      console.error(
        `Error occured while drawing train cards from deck.\n\tDrawn cards:\n\t${color}\n\tDeck:\n\t${state.trainCardDeck}`,
      );
    }
  }

  return {
    ...state,
    trainCardDeck: tempDeck,
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

  if (popped[0] !== cardColor) {
    console.error(
      `Error occured while removing card form roster.\n\tExpected color: ${cardColor}\n\tPopped color: ${popped} || popped!==cardColor = ${
        popped !== cardColor
      }`,
    );
  }

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
  let tempDiscard = [...state.trainDiscardPile];
  let totalTrainCount;

  do {
    while (tempRoster.length < 5 && tempDeck.length > 0) {
      tempRoster.push(tempDeck.pop());
    }

    totalTrainCount = tempRoster.reduce((trainCount, currentColor) => {
      if (currentColor === CART_COLOR_LOCOMOTIVE) {
        return trainCount + 1;
      } else {
        return trainCount;
      }
    }, 0);

    if (totalTrainCount >= 3 && tempDeck.length >= 5) {
      tempDiscard = [...tempDiscard, ...tempRoster];
      tempRoster = [];
    }
  } while (tempRoster.length < 5 && tempDeck.length + tempDiscard.length > 0);

  return {
    ...state,
    trainCardDeck: tempDeck,
    trainCardRoster: tempRoster,
    trainDiscardPile: tempDiscard,
  };
}

function updateRouteDeck(
  state,
  selectedRouteCards,
  droppedRouteCards,
  stateChange,
) {
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
    routeDeck: [...droppedRouteCards, ...tempRouteDeck],
    gameState: stateChange ? PLAYER_DONE : PLAYER_BEGIN,
  };
}

function setConnectionToBuilt(state, selectedConnection, playerColor) {
  let tempConnections = [...state.connections];

  tempConnections = tempConnections.map((connection) => {
    if (connection.id === selectedConnection.id)
      return { ...connection, isBuilt: true, ownerColor: playerColor };
    else return connection;
  });

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

function logAction(state, name, id, text) {
  return {
    ...state,
    actionLog: [{ name, id, text }, ...state.actionLog.slice(0, 10)],
  };
}

function combineTrainDeck(state, { reshuffledDiscardPile }) {
  return {
    ...state,
    trainCardDeck: [...reshuffledDiscardPile, ...state.trainCardDeck],
    trainDiscardPile: [],
  };
}
