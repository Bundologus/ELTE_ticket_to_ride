import { combineReducers, createStore } from 'redux';
import { devToolsEnhacer } from 'redux-devtools-extension';
import { gameReducer } from './reducers/gameReducer';

export const store = createStore(
  combineReducers({
    game: gameReducer,
  }),
  devToolsEnhacer(),
);
