/* import { v4 as uuidv4 } from 'uuid'; */
import { setAppToGame, setAppToMain, setAppToWait } from '../app/actions';
import {
  sendCreateRoom,
  sendLeaveRoom,
  sendSyncState,
  syncAndDispatchAction,
} from '../messages/actions';
import { playerJoin } from '../players/actions';

export const CREATE_GAME = 'CREATE_GAME';
export const START_GAME = 'START_GAME';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const START_LAST_ROUND = 'START_LAST_ROUND';
export const DEAL_STARTER_HAND = 'DEAL_STARTER_HAND';
export const FILL_ROSTER = 'FILL_ROSTER';
export const REFILL_TRAIN_DECK = 'REFILL_TRAIN_DECK';
export const SYNC_ROOM_STATE = 'SYNC_ROOM_STATE';

export function createGame(
  maxPlayerCount,
  gameId,
  shuffledTrainDeck,
  shuffledRouteDeck,
  shuffledLongRouteDeck,
) {
  return {
    type: CREATE_GAME,
    payload: {
      maxPlayerCount,
      gameId,
      shuffledTrainDeck,
      shuffledRouteDeck,
      shuffledLongRouteDeck,
    },
  };
}

function startGameAction() {
  return {
    type: START_GAME,
    payload: null,
  };
}

function nextPlayerAction(nextPlayerId) {
  return {
    type: NEXT_PLAYER,
    payload: { nextPlayerId },
  };
}

function startLastRoundAction(playerId) {
  return {
    type: START_LAST_ROUND,
    payload: { playerId },
  };
}

export function dealStarterHand(playerId, starterHand) {
  return {
    type: DEAL_STARTER_HAND,
    payload: { playerId, starterHand },
  };
}

function fillRosterAction() {
  return {
    type: FILL_ROSTER,
    payload: null,
  };
}

function refillTrainDeckAction(reshuffledDiscardPile) {
  return {
    type: REFILL_TRAIN_DECK,
    payload: { reshuffledDiscardPile },
  };
}

export function loadSyncedState(newState) {
  return {
    type: SYNC_ROOM_STATE,
    payload: { ...newState },
  };
}

/******************* THUNKS *******************/

export function setUpGame(maxPlayerCount, playerName) {
  return (dispatch, getState) => {
    const stateTree = getState();
    const game = stateTree.game;

    const failHandler = () => {
      dispatch(setAppToMain());
      alert('We could not create a game room. Please try again later.');
    };

    const successHandler = ({ roomId }) => {
      dispatch(
        createGame(
          maxPlayerCount,
          roomId,
          shuffle(game.trainCardDeck),
          shuffle(game.routeDeck),
          shuffle(game.longRouteDeck),
        ),
      );

      const starterHand = getStarterHand(getState);
      dispatch(playerJoin(playerName, roomId, starterHand));

      const state = getState();

      dispatch(
        sendSyncState(
          roomId,
          state,
          () => {
            dispatch(setAppToWait());
          },
          failHandler,
        ),
      ); // ? could send retry count
    };

    dispatch(sendCreateRoom(maxPlayerCount, successHandler, failHandler));
  };
}

export function startGameSequence(gameId) {
  return (dispatch) => {
    dispatch(fillRoster());
    dispatch(startGame(gameId));
    dispatch(setAppToGame());
  };
}

export function reshuffleDiscardPile() {
  return (dispatch, getState) => {
    const stateTree = getState();
    const gameData = stateTree.game;

    const shuffledDiscardPile = shuffle(gameData.trainDiscardPile);

    dispatch(refillTrainDeck(shuffledDiscardPile));
  };
}

export function nextPlayer() {
  return (dispatch, getState) => {
    const stateTree = getState();
    const playerIds = stateTree.players.map((player) => {
      return player.id;
    });

    const currentPlayerIndex = playerIds.indexOf(stateTree.game.activePlayerId);
    let nextPlayerId;

    if (currentPlayerIndex === playerIds.length - 1) {
      nextPlayerId = playerIds[0];
    } else {
      nextPlayerId = playerIds[currentPlayerIndex + 1];
    }

    const action = nextPlayerAction(nextPlayerId);

    dispatch(syncAndDispatchAction(action));
  };
}

export function startGame() {
  return (dispatch) => {
    dispatch(syncAndDispatchAction(startGameAction()));
  };
}

export function refillTrainDeck(shuffledDiscardPile) {
  return (dispatch) => {
    dispatch(syncAndDispatchAction(refillTrainDeckAction(shuffledDiscardPile)));
  };
}

export function startLastRound(playerId) {
  return (dispatch) => {
    dispatch(syncAndDispatchAction(startLastRoundAction(playerId)));
  };
}

export function fillRoster() {
  return (dispatch) => {
    dispatch(syncAndDispatchAction(fillRosterAction()));
  };
}

export function endGame() {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(sendLeaveRoom(state.game.gameId));
  };
}

/****************** UTILITY ******************/

function shuffle(iterable) {
  let shuffled = JSON.parse(JSON.stringify(iterable));
  let max = shuffled.length,
    last,
    randId;

  while (max) {
    randId = Math.floor(Math.random() * max);
    --max;

    last = shuffled[max];
    shuffled[max] = shuffled[randId];
    shuffled[randId] = last;
  }

  return shuffled;
}

export function getStarterHand(getState) {
  const stateTree = getState();
  const game = stateTree.game;
  let reverseDeck = [...game.trainCardDeck];
  reverseDeck.reverse();

  return {
    trainCards: reverseDeck.slice(0, 4),
    longRouteCard: game.longRouteDeck[game.longRouteDeck.length - 1],
  };
}
