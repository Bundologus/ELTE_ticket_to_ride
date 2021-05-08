import { ticketToRideData } from '../../assets/ticket-to-ride-data';
import { testPlayers } from '../../domain/playerType';
import { CREATE_GAME, JOIN_GAME } from '../actions/gameActions';

const initialState = { players: testPlayers, mapData: ticketToRideData };

export function gameReducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case CREATE_GAME: {
      /* CREATE GAME LOGIC COMES HERE */
      break;
    }
    case JOIN_GAME: {
      /* CREATE GAME LOGIC COMES HERE */
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
}
