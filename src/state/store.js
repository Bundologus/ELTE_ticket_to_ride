import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { boardReducer } from './board/reducer';
import { gameReducer } from './game/reducer';
import { playersReducer } from './players/reducer';

export const store = createStore(
  combineReducers({
    game: gameReducer,
    players: playersReducer,
    board: boardReducer,
  }),
  devToolsEnhancer(),
);
