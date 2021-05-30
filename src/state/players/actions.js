import { setAppToWaitAction } from '../app/actions';
import {
  fillRoster,
  getStarterHand,
  reshuffleDiscardPile,
  loadSyncedState,
  startGameSequence,
} from '../game/actions';
import {
  sendJoinRoom,
  sendSyncState,
  syncAndDispatchAction,
} from '../messages/actions';

export const PLAYER_JOIN = 'PLAYER_JOIN';
export const DRAW_FROM_ROSTER = 'DRAW_FROM_ROSTER';
export const DRAW_FROM_DECK = 'DRAW_FROM_DECK';
export const DRAW_ROUTE_CARDS = 'DRAW_ROUTE_CARDS';
export const DRAW_ROUTES_FIRST_ROUND = 'DRAW_ROUTES_FIRST_ROUND';
export const BUILD_CONNECTION = 'BUILD_CONNECTION';

export function playerJoin(playerName, gameId, starterHand) {
  return {
    type: PLAYER_JOIN,
    payload: {
      playerName,
      gameId,
      starterHand,
    },
  };
}

function drawFromRosterAction(playerId, playerName, cardColor, position) {
  return {
    type: DRAW_FROM_ROSTER,
    payload: {
      playerId,
      playerName,
      cardColor,
      position,
    },
  };
}

function drawFromDeckAction(playerId, playerName, cardColors) {
  return {
    type: DRAW_FROM_DECK,
    payload: {
      playerId,
      playerName,
      cardColors,
    },
  };
}

function drawRouteCardsAction(
  playerId,
  playerName,
  selectedRouteCards,
  droppedRouteCards,
) {
  return {
    type: DRAW_ROUTE_CARDS,
    payload: {
      playerId,
      playerName,
      selectedRouteCards,
      droppedRouteCards,
    },
  };
}

function drawRoutesFirstRoundAction(
  playerId,
  playerName,
  selectedRouteCards,
  droppedRouteCards,
) {
  return {
    type: DRAW_ROUTES_FIRST_ROUND,
    payload: {
      playerId,
      playerName,
      selectedRouteCards,
      droppedRouteCards,
    },
  };
}

function buildConnectionAction(
  playerId,
  playerName,
  playerColor,
  usedTrainColors,
  connection,
) {
  return {
    type: BUILD_CONNECTION,
    payload: {
      playerId,
      playerName,
      playerColor,
      usedTrainColors,
      connection,
    },
  };
}

/******************* THUNKS *******************/

export function drawCardFromRoster(playerId, playerName, cardColor, position) {
  return (dispatch, getState) => {
    reshuffleDeckIfNecessary(dispatch, getState);

    dispatch(drawFromRoster(playerId, playerName, cardColor, position));

    setTimeout(() => {
      dispatch(fillRoster());
    }, 200);
  };
}

export function drawCardsFromDeck(playerId, playerName, cardColors) {
  return (dispatch, getState) => {
    reshuffleDeckIfNecessary(dispatch, getState);

    dispatch(drawFromDeck(playerId, playerName, cardColors));
  };
}

export function joinToGame(gameId, playerName, setLocalPlayerId) {
  return (dispatch, getState) => {
    dispatch(
      sendJoinRoom(gameId, (payload) => {
        dispatch(loadSyncedState(JSON.parse(payload.state)));
        const starterHand = getStarterHand(getState);
        dispatch(playerJoin(playerName, gameId, starterHand));
        let state = getState();
        const newestPlayer = state.players[state.players.length - 1];
        setLocalPlayerId(newestPlayer.id);

        const successHandler = () => {
          if (Number(state.game.maxPlayers) === state.players.length) {
            dispatch(startGameSequence());
          } else {
            dispatch(setAppToWaitAction());
          }
        };

        dispatch(
          sendSyncState(gameId, state, successHandler, () => {
            alert('Could not join to room.');
          }),
        );
      }),
    );
  };
}

export function drawFromRoster(playerId, playerName, cardColor, position) {
  return (dispatch) => {
    dispatch(
      syncAndDispatchAction(
        drawFromRosterAction(playerId, playerName, cardColor, position),
      ),
    );
  };
}

export function drawFromDeck(playerId, playerName, cardColors) {
  return (dispatch) => {
    dispatch(
      syncAndDispatchAction(
        drawFromDeckAction(playerId, playerName, cardColors),
      ),
    );
  };
}

export function drawRouteCards(
  playerId,
  playerName,
  selectedRouteCards,
  droppedRouteCards,
) {
  return (dispatch) => {
    dispatch(
      syncAndDispatchAction(
        drawRouteCardsAction(
          playerId,
          playerName,
          selectedRouteCards,
          droppedRouteCards,
        ),
      ),
    );
  };
}

export function drawRoutesFirstRound(
  playerId,
  playerName,
  selectedRouteCards,
  droppedRouteCards,
) {
  return (dispatch) => {
    dispatch(
      syncAndDispatchAction(
        drawRoutesFirstRoundAction(
          playerId,
          playerName,
          selectedRouteCards,
          droppedRouteCards,
        ),
      ),
    );
  };
}

export function buildConnection(
  playerId,
  playerName,
  playerColor,
  usedTrainColors,
  connection,
) {
  return (dispatch) => {
    dispatch(
      syncAndDispatchAction(
        buildConnectionAction(
          playerId,
          playerName,
          playerColor,
          usedTrainColors,
          connection,
        ),
      ),
    );
  };
}

/******************* UTILITY *******************/

function reshuffleDeckIfNecessary(dispatch, getState) {
  const stateTree = getState();
  const gameState = stateTree.game;

  const remainingDeckSize = gameState.trainCardDeck.length;

  if (remainingDeckSize < 5) {
    dispatch(reshuffleDiscardPile());
  }
}
