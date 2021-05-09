import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_GAME,
  START_GAME,
  NEXT_PLAYER,
  START_LAST_ROUND,
} from './actions';
import {
  GAME_WAITING,
  GAME_ENDED,
  GAME_LAST_ROUND,
  GAME_RUNNING,
} from '../../constants/gameConstants';

const initialState = {
  maxPlayers: 5,
  activePlayerId: 0,
  gameId: '',
  gameState: GAME_WAITING,
  lastPlayerId: null,
};

export function gameReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case CREATE_GAME: {
      newState = initNewGame(state, payload);
      break;
    }
    case START_GAME: {
      newState = setFirstRound(state);
      break;
    }
    case START_LAST_ROUND: {
      newState = setLastRound(state);
      // TODO set next player to active
      break;
    }
    case NEXT_PLAYER: {
      newState = setNextPlayer(state);
      // TODO set next player to active
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function initNewGame(state, payload) {
  return {
    maxPlayers: 2,
    activePlayerId: 0,
    gameId: uuidv4(),
    gameState: GAME_WAITING,
    lastPlayerId: null,
  };
}

function setFirstRound(state) {
  return {
    maxPlayers: state.maxPlayers,
    activePlayerId: 0,
    gameId: state.gameId,
    gameState: GAME_RUNNING,
    lastPlayerId: state.activePlayerId,
  };
}

function setLastRound(state) {
  return {
    maxPlayers: state.maxPlayers,
    activePlayerId: getNextPlayer(state),
    gameId: state.gameId,
    gameState: GAME_LAST_ROUND,
    lastPlayerId: state.activePlayerId,
  };
}

function setNextPlayer(state) {
  if (
    state.gameState === GAME_LAST_ROUND &&
    state.acitvePlayer === state.lastPlayerId
  ) {
    return {
      maxPlayers: state.maxPlayers,
      activePlayerId: state.activePlayerId,
      gameId: state.gameId,
      gameState: GAME_ENDED,
      lastPlayerId: state.lastPlayerId,
    };
  } else {
    return {
      maxPlayers: state.maxPlayers,
      activePlayerId: getNextPlayer(state),
      gameId: state.gameId,
      gameState: state.gameState,
      lastPlayerId: state.lastPlayerId,
    };
  }
}

function getNextPlayer(state) {
  if (state.acitvePlayer + 1 >= state.maxPlayers) return 0;
  else return state.acitvePlayer + 1;
}
