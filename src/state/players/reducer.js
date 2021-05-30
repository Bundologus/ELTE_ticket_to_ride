import Graph from 'graph-data-structure';
import { PLAYER_COLORS } from '../../constants/playerConstants';
import { SYNC_ROOM_STATE } from '../game/actions';
import {
  DRAW_FROM_ROSTER,
  DRAW_FROM_DECK,
  DRAW_ROUTE_CARDS,
  BUILD_CONNECTION,
  DRAW_ROUTES_FIRST_ROUND,
  PLAYER_JOIN,
} from './actions';

const playerTemplate = {
  id: -1,
  name: '',
  color: '',
  score: 0,
  playerFirstRound: true,
  carts: 0,
  trainCards: {
    black: 0,
    blue: 0,
    green: 0,
    orange: 0,
    pink: 0,
    red: 0,
    white: 0,
    yellow: 0,
    locomotive: 0,
  },
  routeCards: [],
  longRouteCard: null,
  builtConnections: [],
  longestPath: null,
};
const initialState = [];
const startingCartCount = 4;

export function playersReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case PLAYER_JOIN: {
      newState = putNewPlayer(state, payload.playerName, payload.starterHand);
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
    case DRAW_ROUTE_CARDS:
    case DRAW_ROUTES_FIRST_ROUND: {
      newState = putRouteCard(
        state,
        payload.playerId,
        payload.selectedRouteCards,
      );
      break;
    }
    case BUILD_CONNECTION: {
      newState = putConnection(state, payload);
      break;
    }
    case SYNC_ROOM_STATE: {
      newState = [...payload.players];
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function putNewPlayer(state, playerName, starterHand) {
  const playerCount = state.length;

  let newPlayer = {
    ...playerTemplate,
    id: playerCount,
    name: playerName,
    color: PLAYER_COLORS[playerCount],
  };

  const { trainCards, longRouteCard } = starterHand;

  for (const cardColor of trainCards) {
    ++newPlayer.trainCards[cardColor];
  }

  newPlayer.longRouteCard = longRouteCard;
  newPlayer.carts = startingCartCount;

  let newState = [...state];
  newState.push(newPlayer);
  return newState;
}

function putTrainCard(state, playerId, cardColors) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = { ...player };
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

      /* if (cardColors.length === 1 && cardColors[0] !== 'locomotive') {
        newPlayer.playerState = PLAYER_DRAW_TRAIN;
      } else {
        newPlayer.playerState = PLAYER_DONE;
      } */
      return newPlayer;
    } else {
      return player;
    }
  });
}

function putRouteCard(state, playerId, selectedRouteCards) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = { ...player };
      newPlayer.routeCards = [...newPlayer.routeCards, ...selectedRouteCards];
      newPlayer.playerFirstRound = false;
      return newPlayer;
    } else {
      return player;
    }
  });
}

function putConnection(state, { playerId, usedTrainColors, connection }) {
  return state.map((player) => {
    if (player.id === playerId) {
      let newPlayer = { ...player };

      // Adding connection
      newPlayer.builtConnections = [...newPlayer.builtConnections, connection];

      // Removing used train cards
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

      // Removing used carts
      newPlayer.carts -= connection.elements.length;

      // Adding to path graph
      // reading stored graph
      let graph;
      if (newPlayer.hasOwnProperty('connectionGraph')) {
        graph = Graph(newPlayer.connectionGraph);
      } else {
        graph = Graph();
      }

      // adding new edge
      graph.addEdge(
        `${connection.from}`,
        `${connection.to}`,
        connection.elements.length,
      );

      // adding new edge reverse direction
      graph.addEdge(
        `${connection.to}`,
        `${connection.from}`,
        connection.elements.length,
      );

      // checking all routes, adding their nodes if not there yet, and checking if path exists
      newPlayer.routeCards = newPlayer.routeCards.map((routeCard) => {
        if (routeCard.finished) {
          return routeCard;
        } else {
          graph.addNode(routeCard.from);
          graph.addNode(routeCard.to);
          let cityPath = [];
          try {
            cityPath = graph.shortestPath(
              `${routeCard.from}`,
              `${routeCard.to}`,
            );
          } catch (error) {
            console.log('Could not find path.');
          }

          if (cityPath.length > 0) {
            let connectionPath = [];

            for (let i = 1; i < cityPath.length; i++) {
              const cityIdA = cityPath[i - 1];
              const cityIdB = cityPath[i];

              const currentConnection = newPlayer.builtConnections.find(
                (connection) => {
                  return (
                    (connection.from === cityIdA &&
                      connection.to === cityIdB) ||
                    (connection.from === cityIdB && connection.to === cityIdA)
                  );
                },
              );

              connectionPath.push(currentConnection.id);
            }

            return {
              ...routeCard,
              path: { connectionIdList: connectionPath, cityIdList: cityPath },
              finished: true,
            };
          } else {
            return routeCard;
          }
        }
      });

      // adding, and pathfinding for long route
      if (!newPlayer.longRouteCard.finished) {
        let newCard = newPlayer.longRouteCard;
        graph.addNode(newCard.from);
        graph.addNode(newCard.to);
        let cityPath = [];
        try {
          cityPath = graph.shortestPath(`${newCard.from}`, `${newCard.to}`);
        } catch (error) {
          console.log('Could not find path.');
        }

        if (cityPath.length > 0) {
          let connectionPath = [];

          for (let i = 1; i < cityPath.length; i++) {
            const cityIdA = cityPath[i - 1];
            const cityIdB = cityPath[i];

            const currentConnection = newPlayer.builtConnections.find(
              (connection) => {
                return (
                  (connection.from === cityIdA && connection.to === cityIdB) ||
                  (connection.from === cityIdB && connection.to === cityIdA)
                );
              },
            );

            connectionPath.push(currentConnection.id);
          }

          newPlayer.longRouteCard = {
            ...newCard,
            path: { connectionIdList: connectionPath, cityIdList: cityPath },
            finished: true,
          };
        }
      }

      newPlayer.connectionGraph = graph.serialize();

      return newPlayer;
    } else {
      return player;
    }
  });
}
