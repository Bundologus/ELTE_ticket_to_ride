import {
  PLAYER_BUILD,
  PLAYER_COLORS,
  PLAYER_DONE,
  PLAYER_DRAW_TRAIN,
  PLAYER_FIRST_ROUND,
  PLAYER_DRAW_ROUTES,
} from '../../constants/playerConstants';
import { testPlayers } from '../../domain/playerType';
import { DEAL_STARTER_HAND } from '../board/actions';
import {
  DRAW_FROM_ROSTER,
  DRAW_FROM_DECK,
  ADD_ROUTE_CARDS,
  BUILD_CONNECTION,
} from './actions';

const initialState = testPlayers.slice(0, 2);

export function playersReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case DEAL_STARTER_HAND: {
      newState = putStarterHand(state, payload);
      break;
    }
    case DRAW_FROM_ROSTER: {
      newState = putTrainCard(state, payload.playerId, [payload.cardColor]);
      break;
    }
    case DRAW_FROM_DECK: {
      newState = putTrainCard(state, payload.playerId, payload.cardColors);
      break;
    }
    case ADD_ROUTE_CARDS: {
      newState = putRouteCard(state, payload);
      break;
    }
    case BUILD_CONNECTION: {
      newState = putConnection(state, payload);
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function putStarterHand(state, { playerId, trainCards, longRouteCard }) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = JSON.parse(JSON.stringify(player));
      for (const cardColor of trainCards) {
        switch (cardColor) {
          case 'black': {
            ++newPlayer.trainCards.black;
            break;
          }
          case 'blue': {
            ++newPlayer.trainCards.blue;
            break;
          }
          case 'green': {
            ++newPlayer.trainCards.green;
            break;
          }
          case 'orange': {
            ++newPlayer.trainCards.orange;
            break;
          }
          case 'pink': {
            ++newPlayer.trainCards.pink;
            break;
          }
          case 'red': {
            ++newPlayer.trainCards.red;
            break;
          }
          case 'white': {
            ++newPlayer.trainCards.white;
            break;
          }
          case 'yellow': {
            ++newPlayer.trainCards.yellow;
            break;
          }
          case 'locomotive': {
            ++newPlayer.trainCards.locomotive;
            break;
          }
          default:
            break;
        }
      }
      newPlayer.longRouteCard = longRouteCard;
      return newPlayer;
    } else {
      return player;
    }
  });
}

function putTrainCard(state, playerId, cardColors) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = JSON.parse(JSON.stringify(player));
      for (const cardColor of cardColors) {
        switch (cardColor) {
          case 'black': {
            ++newPlayer.trainCards.black;
            break;
          }
          case 'blue': {
            ++newPlayer.trainCards.blue;
            break;
          }
          case 'green': {
            ++newPlayer.trainCards.green;
            break;
          }
          case 'orange': {
            ++newPlayer.trainCards.orange;
            break;
          }
          case 'pink': {
            ++newPlayer.trainCards.pink;
            break;
          }
          case 'red': {
            ++newPlayer.trainCards.red;
            break;
          }
          case 'white': {
            ++newPlayer.trainCards.white;
            break;
          }
          case 'yellow': {
            ++newPlayer.trainCards.yellow;
            break;
          }
          case 'locomotive': {
            ++newPlayer.trainCards.locomotive;
            break;
          }
          default:
            break;
        }
      }

      if (cardColors.length === 1 && cardColors[0] !== 'locomotive') {
        newPlayer.playerState = PLAYER_DRAW_TRAIN;
      } else {
        newPlayer.playerState = PLAYER_DONE;
      }
      return newPlayer;
    } else {
      return player;
    }
  });
}

function putRouteCard(state, { playerId, selectedRouteCards }) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = JSON.parse(JSON.stringify(player));
      newPlayer.routeCards = [...newPlayer.routeCards, ...selectedRouteCards];
      return newPlayer;
    } else {
      return player;
    }
  });
}

function putConnection(state, { playerId, usedTrainColors, connection }) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = JSON.parse(JSON.stringify(player));
      newPlayer.builtConnections = [...newPlayer.builtConnections, connection];

      for (const cardColor of usedTrainColors) {
        switch (cardColor) {
          case 'black': {
            --newPlayer.trainCards.black;
            break;
          }
          case 'blue': {
            --newPlayer.trainCards.blue;
            break;
          }
          case 'green': {
            --newPlayer.trainCards.green;
            break;
          }
          case 'orange': {
            --newPlayer.trainCards.orange;
            break;
          }
          case 'pink': {
            --newPlayer.trainCards.pink;
            break;
          }
          case 'red': {
            --newPlayer.trainCards.red;
            break;
          }
          case 'white': {
            --newPlayer.trainCards.white;
            break;
          }
          case 'yellow': {
            --newPlayer.trainCards.yellow;
            break;
          }
          case 'locomotive': {
            --newPlayer.trainCards.locomotive;
            break;
          }
          default:
            break;
        }
      }

      return newPlayer;
    } else {
      return player;
    }
  });
}
