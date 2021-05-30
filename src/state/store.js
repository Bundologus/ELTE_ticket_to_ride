import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { appReducer } from './app/reducer';
import { gameReducer } from './game/reducer';
import {
  setupActionSyncListener,
  setupLeaveListener,
  setupStateSyncListener,
} from './messages/actions';
import { playersReducer } from './players/reducer';

export const store = createStore(
  combineReducers({
    game: gameReducer,
    players: playersReducer,
    app: appReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(setupLeaveListener());
store.dispatch(setupActionSyncListener());
store.dispatch(setupStateSyncListener());
