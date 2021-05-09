import { PLAYER_FIRST_ROUND } from '../../constants/playerConstants';
import { testPlayers } from '../../domain/playerType';
import {
  DRAW_ROUTES,
  ADD_ROUTE_CARDS,
  ADD_TRAIN_CARD,
  BUILD_CONNECTION,
} from './actions';

const initialState = testPlayers.slice(0, 2);

export function gameReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case ADD_TRAIN_CARD: {
      newState = putTrainCard(state, payload);
      break;
    }
    case DRAW_ROUTES: {
      newState = setRouteDraw(state, payload);
      break;
    }
    case ADD_ROUTE_CARDS: {
      newState = putRouteCard(state, payload);
      break;
    }
    case BUILD_CONNECTION: {
      newState = putConnection(state, payload);
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}

function putTrainCard(state, { playerId, cardColor, blindPull }) {
  /*
    state.players.map on playerId match

      if blindPull
        add cardColor to hand
        if playerState === PLAYER_DRAW_TRAIN
          playerState = PLAYER_DONE
        else
          playerState = PLAYER_DRAW_TRAIN
        end if
      else
        add cardColor to hand
        if cardColor === 'locomotive'
          playerState = PLAYER_DONE
        else
          playerState = PLAYER_DRAW_TRAIN
        end if
      end if

    end map  
   */
}

function putRouteCard(state, { playerId, routeIds }) {
  /*
    state.players.map on playerId match

      add routeIds to palyer.routeCards

    end map  
   */
}
