import { useDispatch, useSelector } from 'react-redux';
import { setAppToMain } from '../../state/app/actions';
import { startGameSequence } from '../../state/game/actions';
import { selectGame } from '../../state/game/selector';
import { selectPlayers } from '../../state/players/selector';

export function WaitingRoomPage({ localPlayerId }) {
  const game = useSelector(selectGame);
  const players = useSelector(selectPlayers);
  const localPlayer = players[localPlayerId];

  /* const getStarterHands = (playerCount) => {
    let arrayOfHands = [];
    let reverseDeck = [...game.trainCardDeck];
    reverseDeck.reverse();

    for (let i = 0; i < playerCount; ++i) {
      arrayOfHands.push({
        trainCards: reverseDeck.slice(4 * i, 4 * (i + 1)),
        longRouteCard: game.longRouteDeck[game.longRouteDeck.length - (i + 1)],
      });
    }

    return arrayOfHands;
  }; */

  const dispatch = useDispatch();

  const gameStartHandler = () => {
    /* const arrayOfStarterHands = getStarterHands(players.length);
    dispatch(dealStarterHand(arrayOfStarterHands));

    dispatch(fillRoster());
    dispatch(startGame(game.gameId));
    dispatch(setAppToGame()); */

    dispatch(startGameSequence(game.gameId));
  };

  const getPlayerBadges = () => {
    let badges = [];
    for (let i = 0; i < game.maxPlayers; i++) {
      if (i < players.length) {
        badges.push(
          <div
            key={'badge-' + i}
            className={`bg-player-${players[i].color} text-ttr-white rounded-md font-smallCaps font-bold truncate text-xs lg:text-lg 2xl:text-xl 3xl:text-2xl p-0.5 px-1.5 lg:p-1 lg:px-2 2xl:p-2 3xl:p-2.5`}
          >
            {players[i].name}
          </div>,
        );
      } else {
        badges.push(
          <div
            key={'badge-' + i}
            className="bg-gray-500 text-ttr-white rounded-md font-smallCaps font-bold truncate text-xs  lg:text-lg 2xl:text-xl 3xl:text-2xl p-0.5 px-1.5 lg:p-1 lg:px-2 2xl:p-2 3xl:p-2.5"
          >
            ...
          </div>,
        );
      }
    }

    return badges;
  };

  return (
    <div className="container h-screen font-regular z-10 pt-10 md:px-16 lg:py-14">
      <div className="h-full flex flex-col justify-center content-evenly lg:content-center p-4">
        <div className="block mx-auto rounded-md border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80 p-2 md:p-6">
          <h1 className="block text-lg text-center mb-1 mt-2 lg:mb-8 lg:mt-0 lg:text-2xl">
            Wellcome to the Waiting Room, {localPlayer.name}!
          </h1>
          <p className="block text-center lg:text-lg lg:mb-1">
            Your game's id is:
          </p>
          <p className="block font-smallCaps font-semibold text-center text-3xl mb-3 lg:text-5xl lg:mb-6">
            {game.gameId}
          </p>
          <p className="block text-center lg:text-xl">
            Waiting for the rest of the players:
          </p>
          <div
            className={`grid grid-cols-${game.maxPlayers} gap-x-1 lg:gap-x-2 3xl:gap-x-4 mt-1 md:mt-2`}
          >
            {getPlayerBadges()}
          </div>
        </div>
        <div className="flex align-middle justify-center mx-auto">
          <button
            className="rounded-md bg-gray-600 border-gray-900 border-2 hover:bg-gray-500 text-white justify-self-right mt-5 mr-3 w-24 lg:px-5 lg:w-28 text-lg lg:text-2xl"
            onClick={(e) => dispatch(setAppToMain())}
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
