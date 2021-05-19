import { v4 as uuidv4 } from 'uuid';
import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import {
  CREATE_GAME,
  START_GAME,
  NEXT_PLAYER,
  START_LAST_ROUND,
  DEAL_STARTER_HAND,
  FILL_ROSTER,
  SET_DETERM_SHUFFLE,
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

// TODO remove
const startingPlayerCount = 5;
const shuffleData = [
  /*0*/ 0,
  /*1*/ 1,
  /*2*/ 0,
  /*3*/ 2,
  /*4*/ 1,
  /*5*/ 4,
  /*6*/ 4,
  /*7*/ 3,
  /*8*/ 6,
  /*9*/ 1,
  /*10*/ 7,
  /*11*/ 4,
  /*12*/ 5,
  /*13*/ 0,
  /*14*/ 13,
  /*15*/ 3,
  /*16*/ 4,
  /*17*/ 9,
  /*18*/ 11,
  /*19*/ 4,
  /*20*/ 7,
  /*21*/ 19,
  /*22*/ 3,
  /*23*/ 22,
  /*24*/ 1,
  /*25*/ 3,
  /*26*/ 5,
  /*27*/ 23,
  /*28*/ 13,
  /*29*/ 15,
  /*30*/ 21,
  /*31*/ 24,
  /*32*/ 3,
  /*33*/ 23,
  /*34*/ 29,
  /*35*/ 3,
  /*36*/ 29,
  /*37*/ 26,
  /*38*/ 17,
  /*39*/ 14,
  /*40*/ 39,
  /*41*/ 40,
  /*42*/ 24,
  /*43*/ 37,
  /*44*/ 32,
  /*45*/ 4,
  /*46*/ 40,
  /*47*/ 44,
  /*48*/ 9,
  /*49*/ 26,
  /*50*/ 34,
  /*51*/ 2,
  /*52*/ 33,
  /*53*/ 29,
  /*54*/ 28,
  /*55*/ 10,
  /*56*/ 18,
  /*57*/ 46,
  /*58*/ 54,
  /*59*/ 33,
  /*60*/ 29,
  /*61*/ 34,
  /*62*/ 12,
  /*63*/ 56,
  /*64*/ 60,
  /*65*/ 14,
  /*66*/ 10,
  /*67*/ 58,
  /*68*/ 0,
  /*69*/ 34,
  /*70*/ 27,
  /*71*/ 51,
  /*72*/ 2,
  /*73*/ 62,
  /*74*/ 53,
  /*75*/ 0,
  /*76*/ 28,
  /*77*/ 43,
  /*78*/ 8,
  /*79*/ 22,
  /*80*/ 64,
  /*81*/ 61,
  /*82*/ 41,
  /*83*/ 36,
  /*84*/ 74,
  /*85*/ 30,
  /*86*/ 10,
  /*87*/ 23,
  /*88*/ 49,
  /*89*/ 64,
  /*90*/ 43,
  /*91*/ 30,
  /*92*/ 72,
  /*93*/ 71,
  /*94*/ 3,
  /*95*/ 47,
  /*96*/ 34,
  /*97*/ 48,
  /*98*/ 57,
  /*99*/ 85,
  /*100*/ 39,
  /*101*/ 98,
  /*102*/ 40,
  /*103*/ 73,
  /*104*/ 54,
  /*105*/ 59,
  /*106*/ 22,
  /*107*/ 86,
  /*108*/ 34,
  /*109*/ 97,
];
// TODO end

const initialState = {
  maxPlayers: 5,
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
  determShuffle: false,
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
      newState = fillRosterFromDeck(state);
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
    case SET_DETERM_SHUFFLE: {
      newState = switchShuffleDeterminism(state, payload);
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
    ...initialState,
    maxPlayers: startingPlayerCount,
    activePlayerId: 0,
    gameId: uuidv4(),
    gameState: GAME_WAITING,
    lastRound: false,
    finishingPlayerId: null,
    routeDeck: shuffle(ticketToRideData.routes, state.determShuffle),
    longRouteDeck: shuffle(ticketToRideData.longRoutes, state.determShuffle),
    trainCardDeck: shuffle(initialTrainDeck, state.determShuffle),
    determShuffle: state.determShuffle,
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
  let tempDiscard = state.trainDiscardPile;

  if (tempDeck.length <= cardColors.length) {
    tempDeck = [...shuffle(tempDiscard), ...tempDeck];
    tempDiscard = [];
  }

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
  let tempDiscard = state.trainDiscardPile;
  let totalTrainCount;

  do {
    if (tempDeck.length < 5 && tempDiscard.length > 0) {
      tempDeck = [...shuffle(tempDiscard), ...tempDeck];
    }

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

    if (totalTrainCount >= 3) {
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

function shuffle(iterable, deterministic) {
  let shuffled = JSON.parse(JSON.stringify(iterable));
  let max = shuffled.length,
    last,
    randId;

  if (deterministic) {
    while (max) {
      --max;
      randId = shuffleData[max];

      last = shuffled[max];
      shuffled[max] = shuffled[randId];
      shuffled[randId] = last;
    }
  } else {
    while (max) {
      randId = Math.floor(Math.random() * max);
      --max;

      last = shuffled[max];
      shuffled[max] = shuffled[randId];
      shuffled[randId] = last;
    }
  }

  return shuffled;
}

function switchShuffleDeterminism(state, { newValue }) {
  return {
    ...state,
    determShuffle: !state.determShuffle,
  };
}
