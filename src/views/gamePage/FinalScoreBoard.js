import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setAppToMain } from '../../state/app/actions';
import { selectCities } from '../../state/game/selector';
import { selectPlayersWithFinalScore } from '../../state/players/selector';
import { GameBoard } from './GameBoard';

export function FinalScoreBoard({
  activeCities,
  setNextPlayer,
  hoverCities,
  setHoverCities,
  connectionHover,
  setConnectionHover,
}) {
  const [players, longestPathLength] = useSelector(selectPlayersWithFinalScore);
  const cities = useSelector(selectCities);

  const dispatch = useDispatch;

  const maxScore = players[0].score;
  const winnerNames = players.reduce((names, player) => {
    if (player.score === maxScore) {
      names = [...names, player.name];
    }
    return names;
  }, []);

  const playerCards = players.map((player) => {
    const connectionsCounts = [0, 0, 0, 0, 0, 0];
    for (const connection of player.builtConnections) {
      const conLen = connection.elements.length;
      switch (conLen) {
        case 1: {
          ++connectionsCounts[0];
          break;
        }
        case 2: {
          ++connectionsCounts[1];
          break;
        }
        case 3: {
          ++connectionsCounts[2];
          break;
        }
        case 4: {
          ++connectionsCounts[3];
          break;
        }
        case 6: {
          ++connectionsCounts[4];
          break;
        }
        case 8: {
          ++connectionsCounts[5];
          break;
        }
        default:
          break;
      }
    }
    const longestPathCities = [];
    for (const cityId of player.longestPath.path) {
      const city = cities[cityId - 1];
      if (city.id !== cityId) {
        console.warn(`CityID mismatch! ${city.id} !== ${cityId}`);
      }
      longestPathCities.push(city.city);
    }

    const longestPathString = longestPathCities.join(' >> ');
    const routes = [player.longRouteCard, ...player.routeCards];
    const routeCards = routes.map((route) => {
      return (
        <div
          key={'route-' + route.id}
          className={classNames(
            'relative focus:ring-0 overflow-hidden focus:outline-none w-full text-left rounded-md rounded-tr-none p-1 py-0.5 mb-1.5 lg:p-1.5',
            {
              'bg-gray-500': route.id <= 40,
              'bg-gray-800': route.id > 40,
            },
          )}
          onMouseEnter={() => {
            if (route.finished) {
              setConnectionHover(route.path.connectionIdList);
            }
            setHoverCities([route.from, route.to]);
          }}
          onMouseLeave={() => {
            setHoverCities([]);
            setConnectionHover([]);
          }}
        >
          <h3 className="text-ttr-white whitespace-nowrap text-2xs font-semibold lg:text-xs xl:text-sm xl:mr-10 2xl:text-lg 3xl:text-xl">
            {route.fromCity} - {route.toCity}
            <span
              className={
                'absolute top-0 right-0 font-number font-bold text-gray-800 text-center rounded-l-md text-xs h-full lg:w-12 lg:py-1.5 lg:text-lg xl:text-xl ' +
                (route.finished ? 'bg-green-400' : 'bg-red-400')
              }
            >
              {route.finished ? '+' : '-'}
              {route.value}
            </span>
          </h3>
        </div>
      );
    });
    return (
      <div
        key={'finalScoreCard-' + player.id}
        className={`relative text-ttr-white bg-player-${player.color} p-2 pt-1 max-w-xs xl:rounded-md `}
      >
        <h3 className="font-smallCaps font-bold xl:text-xl xl:mr-10  xl:mt-1 xl:mb-3">
          {player.name}
        </h3>
        <p
          className={
            'absolute top-0 right-0 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom bg-gray-200'
          }
        >
          {player.score}
        </p>
        <div className="bg-gray-800 bg-opacity-30 overflow-y-auto rounded-md p-0.5 py-1 lg:p-2 lg:mb-1.5">
          <p className="font-smallCaps">Score from connections</p>
          <table className="text-center border-collapse table-fixed lg:text-sm">
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="text-left bg-gray-400 bg-opacity-40 pl-3 rounded-l-full w-20"
                >
                  Length
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 w-7"
                >
                  1
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 w-7"
                >
                  2
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 w-7"
                >
                  3
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 w-7"
                >
                  4
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 w-7"
                >
                  6
                </th>
                <th
                  scope="col"
                  className="font-number bg-gray-400 bg-opacity-40 pr-3 rounded-r-full w-9"
                >
                  8
                </th>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="text-left bg-black bg-opacity-10 pl-3 rounded-l-full"
                >
                  Value
                </th>
                <td className="font-number bg-black bg-opacity-10">1</td>
                <td className="font-number bg-black bg-opacity-10">2</td>
                <td className="font-number bg-black bg-opacity-10">4</td>
                <td className="font-number bg-black bg-opacity-10">7</td>
                <td className="font-number bg-black bg-opacity-10">15</td>
                <td className="font-number bg-black bg-opacity-10 pr-3 rounded-r-full">
                  21
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="text-left bg-gray-400 bg-opacity-20 pl-3 rounded-l-full"
                >
                  Owned
                </th>
                <td className="font-number bg-gray-400 bg-opacity-20">
                  {connectionsCounts[0]}
                </td>
                <td className="font-number bg-gray-400 bg-opacity-20">
                  {connectionsCounts[1]}
                </td>
                <td className="font-number bg-gray-400 bg-opacity-20">
                  {connectionsCounts[2]}
                </td>
                <td className="font-number bg-gray-400 bg-opacity-20">
                  {connectionsCounts[3]}
                </td>
                <td className="font-number bg-gray-400 bg-opacity-20">
                  {connectionsCounts[4]}
                </td>
                <td className="font-number bg-gray-400 bg-opacity-20 pr-3 rounded-r-full">
                  {connectionsCounts[5]}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="text-left bg-black bg-opacity-10 pl-3 rounded-l-full"
                >
                  Score
                </th>
                <td className="font-number bg-black bg-opacity-10">
                  {connectionsCounts[0] * 1}
                </td>
                <td className="font-number bg-black bg-opacity-10">
                  {connectionsCounts[1] * 2}
                </td>
                <td className="font-number bg-black bg-opacity-10">
                  {connectionsCounts[2] * 4}
                </td>
                <td className="font-number bg-black bg-opacity-10">
                  {connectionsCounts[3] * 7}
                </td>
                <td className="font-number bg-black bg-opacity-10">
                  {connectionsCounts[4] * 15}
                </td>
                <td className="font-number bg-black bg-opacity-10 pr-3 rounded-r-full">
                  {connectionsCounts[5] * 21}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {player.longestPath.length === longestPathLength ? (
          <div
            className="bg-gray-800 bg-opacity-30 overflow-y-auto rounded-md p-0.5 py-1 lg:p-2 lg:mb-1.5 border-4 border-yellow-500"
            onMouseEnter={() => {
              setConnectionHover(player.longestPath.connections);
            }}
            onMouseLeave={() => {
              setConnectionHover([]);
            }}
          >
            <p className="font-smallCaps">Longest continous path</p>
            <p className="font-smallCaps font-semibold text-sm">
              {longestPathString}
            </p>
          </div>
        ) : null}
        <div
          className="bg-gray-800 bg-opacity-30 overflow-y-auto max-h-40 rounded-md p-0.5 py-1 lg:p-2"
          id="routecard-box"
        >
          <p className="font-smallCaps">Score from routes</p>
          {routeCards}
        </div>
      </div>
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-20 flex flex-row justify-center place-items-center">
      <div className="relative bg-gray-900 rounded-md xl:rounded-lg p-1 lg:p-2 xl:p-5 flex flex-col items-center">
        <h2 className="text-ttr-white font-smallCaps font-semibold text-sm xl:text-xl 2xl:text-2xl mb-4 xl:mb-4 2xl:mb-3 place-self-start">
          Game concluded!
        </h2>
        <h2 className="text-ttr-white font-smallCaps font-semibold text-sm xl:text-xl 2xl:text-lg mb-4 xl:mb-4 xl:-mt-8 2xl:mb-3">
          {winnerNames.length > 1
            ? 'And the winners are...'
            : 'And the winner is...'}
        </h2>
        <h2 className="text-ttr-white whitespace-nowrap font-smallCaps font-semibold text-sm xl:text-xl 2xl:text-3xl mb-4 xl:mb-4 2xl:mb-3 mx-10">
          {winnerNames.join(' & ')}
        </h2>
        <h2 className="text-ttr-white font-smallCaps font-semibold text-sm xl:text-xl 2xl:text-xl mb-4 xl:mb-4 2xl:mb-3">
          Congratulations!
        </h2>
        <div className="flex flex-row flex-nowrap">
          <div className="flex-none xl:mr-4">
            <GameBoard
              activeCities={activeCities}
              setNextPlayer={setNextPlayer}
              hoverCities={hoverCities}
              connectionHover={connectionHover}
              setConnectionHover={setConnectionHover}
              displayOnly={true}
            ></GameBoard>
          </div>
          <div className="flex-auto flex flex-col justify-items-stretch gap-2">
            {playerCards}
          </div>
        </div>
        <button
          className="absolute block text-ttr-white focus:outline-none border-2 rounded-md px-4 xl:text-lg xl:px-10 xl:-top-3 xl:right-5 mt-3 xl:mt-8 bg-green-600 border-green-800 hover:bg-green-500"
          onClick={() => dispatch(setAppToMain())}
        >
          Done
        </button>
      </div>
    </div>
  );
}
