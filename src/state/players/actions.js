import { setAppToWait } from '../app/actions';
import {
  fillRoster,
  getStarterHand,
  reshuffleDiscardPile,
  startGameSequence,
  syncRoomState,
} from '../game/actions';
import {
  sendJoinRoom,
  sendSyncAction,
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
    const successHandler = (payload) => {
      dispatch(syncRoomState(JSON.parse(payload.state)));
      const starterHand = getStarterHand(getState);
      const joinAction = playerJoin(playerName, gameId, starterHand);
      dispatch(
        sendSyncAction(gameId, joinAction, () => {
          dispatch(joinAction);
          let state = getState();
          const newestPlayer = state.players[state.players.length - 1];
          setLocalPlayerId(newestPlayer.id);
          dispatch(setAppToWait());

          if (Number(state.game.maxPlayers) === state.players.length) {
            dispatch(startGameSequence());
          } else {
            state = getState();
            dispatch(
              sendSyncState(gameId, state, () => {
                console.log('state synced');
              }),
            );
          }
        }),
      );
    };

    dispatch(sendJoinRoom(gameId, successHandler));
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
