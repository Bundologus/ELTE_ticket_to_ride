import { v4 as uuidv4 } from 'uuid';

export const CREATE_GAME = 'CREATE_GAME';
export const START_GAME = 'START_GAME';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const START_LAST_ROUND = 'START_LAST_ROUND';
export const DEAL_STARTER_HAND = 'DEAL_STARTER_HAND';
export const FILL_ROSTER = 'FILL_ROSTER';
export const REFILL_TRAIN_DECK = 'REFILL_TRAIN_DECK';

export function createGame(
  maxPlayerCount,
  playerName,
  gameId,
  shuffledTrainDeck,
  shuffledRouteDeck,
  shuffledLongRouteDeck,
) {
  return {
    type: CREATE_GAME,
    payload: {
      maxPlayerCount,
      playerName,
      gameId,
      shuffledTrainDeck,
      shuffledRouteDeck,
      shuffledLongRouteDeck,
    },
  };
}

export function startGame(gameId) {
  return {
    type: START_GAME,
    payload: null,
  };
}

export function nextPlayer() {
  return {
    type: NEXT_PLAYER,
    payload: null,
  };
}

export function startLastRound(playerId) {
  return {
    type: START_LAST_ROUND,
    payload: { playerId },
  };
}

export function dealStarterHand(arrayOfHands) {
  return {
    type: DEAL_STARTER_HAND,
    payload: { arrayOfHands },
  };
}

export function fillRoster() {
  return {
    type: FILL_ROSTER,
    payload: null,
  };
}

export function refillTrainDeck(reshuffledDiscardPile) {
  return {
    type: REFILL_TRAIN_DECK,
    payload: { reshuffledDiscardPile },
  };
}

/******************* THUNKS *******************/

export function setUpGame(maxPlayerCount, playerName) {
  return (dispatch, getState) => {
    const stateTree = getState();
    const game = stateTree.game;
    const gameId = uuidv4();

    dispatch(
      createGame(
        maxPlayerCount,
        playerName,
        gameId,
        shuffle(game.trainCardDeck),
        shuffle(game.routeDeck),
        shuffle(game.longRouteDeck),
      ),
    );
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
