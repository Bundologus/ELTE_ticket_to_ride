import { useDispatch, useSelector } from 'react-redux';
import { MAIN_PAGE, IN_GAME } from '../../constants/appConstants';
import {
  startGame,
  dealStarterHand,
  fillRoster,
} from '../../state/game/actions';

export function WaitingRoomPage({
  setAppState,
  localPlayerId,
  setLocalPlayerId,
}) {
  const game = useSelector((state) => state.game);
  const players = useSelector((state) => state.players);

  const getStarterHand = () => {
    return {
      trainCards: game.trainCardDeck.slice(-4),
      longRouteCard: game.longRouteDeck.slice(-1),
    };
  };

  const dispatch = useDispatch();

  // TODO not really sure how to handle this part.

  if (players[0].longRouteCard === null) {
  }

  const gameStartHandler = () => {
    for (const player of players) {
      const starterHand = getStarterHand();
      dispatch(
        dealStarterHand(
          player.id,
          starterHand.trainCards,
          starterHand.longRouteCard,
        ),
      );
    }
    dispatch(fillRoster());
    dispatch(startGame(game.gameId));
    setAppState(IN_GAME);
  };

  return (
    <div className="container h-screen font-regular z-10 pt-10 md:px-16 lg:py-14">
      <div className="h-full flex flex-col justify-center content-evenly lg:content-center p-4">
        <div className="block mx-auto rounded-md border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80 p-2 md:p-6">
          <h1 className="block text-lg text-center mb-1 mt-2 lg:mb-8 lg:mt-0 lg:text-2xl">
            Wellcome to the Waiting Room, {players[0].name}!
          </h1>
          <p className="block text-center lg:text-lg lg:mb-1">
            Your game's id is:
          </p>
          <p className="block font-smallCaps font-semibold text-center text-3xl mb-3 lg:text-5xl lg:mb-6">
            {game.gameId}
          </p>
          <p className="block text-center lg:text-xl">
            Waiting for the rest of the players...
          </p>
        </div>
        <div className="flex align-middle justify-center mx-auto">
          <button
            className="rounded-md bg-gray-600 border-gray-900 border-2 hover:bg-gray-500 text-white justify-self-right mt-5 mr-3 w-24 lg:px-5 lg:w-28 text-lg lg:text-2xl"
            onClick={(e) => setAppState(MAIN_PAGE)}
          >
            Back
          </button>
          <button
            className="rounded-md bg-green-600 border-green-900 border-2 hover:bg-green-500 text-white justify-self-left mt-5 ml-3 w-24 lg:px-5 lg:w-28 text-lg lg:text-2xl"
            onClick={(e) => gameStartHandler()}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
}
