import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { gameReducer } from './game/reducer';

export const store = createStore(
  combineReducers({
    game: gameReducer,
  }),
  devToolsEnhancer(),
);
