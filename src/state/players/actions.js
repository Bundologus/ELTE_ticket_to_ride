import { setAppToWait } from '../app/actions';
import {
  fillRoster,
  reshuffleDiscardPile,
  syncRoomState,
} from '../game/actions';
import { sendJoinRoom, sendSyncAction } from '../messages/actions';

export const PLAYER_JOIN = 'PLAYER_JOIN';
export const DRAW_FROM_ROSTER = 'DRAW_FROM_ROSTER';
export const DRAW_FROM_DECK = 'DRAW_FROM_DECK';
export const DRAW_ROUTE_CARDS = 'DRAW_ROUTE_CARDS';
export const DRAW_ROUTES_FIRST_ROUND = 'DRAW_ROUTES_FIRST_ROUND';
export const BUILD_CONNECTION = 'BUILD_CONNECTION';

export function playerJoin(playerName, gameId) {
  return {
    type: PLAYER_JOIN,
    payload: {
      playerName,
      gameId,
    },
  };
}

export function drawFromRoster(playerId, playerName, cardColor, position) {
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

export function drawFromDeck(playerId, playerName, cardColors) {
  return {
    type: DRAW_FROM_DECK,
    payload: {
      playerId,
      playerName,
      cardColors,
    },
  };
}

export function drawRouteCards(
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

export function drawRoutesFirstRound(
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

export function buildConnection(
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

export function joinToGame(gameId, playerName) {
  return (dispatch) => {
    dispatch(
      sendJoinRoom(gameId, (payload) => {
        dispatch(syncRoomState(payload.state));
        const joinAction = playerJoin(playerName, gameId);
        dispatch(
          sendSyncAction(gameId, joinAction, () => {
            dispatch(joinAction);
            dispatch(setAppToWait());
          }),
        );
      }),
    );
  };
}

function reshuffleDeckIfNecessary(dispatch, getState) {
  const stateTree = getState();
  const gameState = stateTree.game;

  const remainingDeckSize = gameState.trainCardDeck.length;

  if (remainingDeckSize < 5) {
    dispatch(reshuffleDiscardPile());
  }
}
