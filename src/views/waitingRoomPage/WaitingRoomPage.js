import { useSelector } from 'react-redux';
import { selectGame } from '../../state/game/selector';
import { selectPlayers } from '../../state/players/selector';

export function WaitingRoomPage({ localPlayerId }) {
  const game = useSelector(selectGame);
  const players = useSelector(selectPlayers);
  const localPlayer = players[localPlayerId];

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
      </div>
    </div>
  );
}
