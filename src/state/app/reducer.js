import {
  IN_GAME,
  MAIN_PAGE,
  WAITING_FOR_PLAYERS,
} from '../../constants/appConstants';
import { APP_TO_GAME, APP_TO_MAIN, APP_TO_WAIT } from './actions';

const initialState = { state: MAIN_PAGE };

export function appReducer(state = initialState, action) {
  const { type } = action;
  let newState;
  switch (type) {
    case APP_TO_MAIN: {
      newState = { state: MAIN_PAGE };
      break;
    }
    case APP_TO_WAIT: {
      newState = { state: WAITING_FOR_PLAYERS };
      break;
    }
    case APP_TO_GAME: {
      newState = { state: IN_GAME };
      break;
    }
    default:
      newState = state;
      break;
  }
  return newState;
}
