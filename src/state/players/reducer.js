import Graph from 'graph-data-structure';
import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import { testPlayers } from '../../domain/playerType';
import { DEAL_STARTER_HAND } from '../game/actions';
import {
  DRAW_FROM_ROSTER,
  DRAW_FROM_DECK,
  DRAW_ROUTE_CARDS,
  BUILD_CONNECTION,
  DRAW_ROUTES_FIRST_ROUND,
} from './actions';

const initialState = testPlayers.slice(0, 2);
//const initialState = testPlayers;

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
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function putStarterHand(state, { arrayOfHands }) {
  return state.map((player, ind) => {
    let newPlayer = { ...player };

    const { trainCards, longRouteCard } = arrayOfHands[ind];

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
    newPlayer.carts = 45;
    return newPlayer;
  });
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
            console.trace('Could not find path.');
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
          console.trace('Could not find path.');
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
