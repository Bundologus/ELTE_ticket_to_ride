import { PlayerType } from '../../domain/playerType';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { selectActivePlayer } from '../../state/players/selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame } from '../../state/game/selector';
import { PLAYER_DONE } from '../../constants/gameConstants';
import { nextPlayer } from '../../state/game/actions';

export function HandPanel({
  activeCities,
  setActiveCities,
  setHoverCities,
  setConnectionHover,
}) {
  const activePlayer = useSelector(selectActivePlayer);
  const game = useSelector(selectGame);

  const dispatch = useDispatch();

  const trainCards = Object.entries(activePlayer.trainCards)
    .sort((tc1, tc2) => {
      let tc1name = tc1[0];
      let tc2name = tc2[0];
      if (tc1name === 'locomotive') tc1name = 'z';
      if (tc2name === 'locomotive') tc2name = 'z';

      if (tc1name < tc2name) return -1;
      else if (tc1name > tc2name) return 1;
      else return 0;
    })
    .map(([color, count]) => {
      return (
        <div
          key={color + '-hand'}
          className={`rounded-md bg-ttr-${color} flex content-center justify-center items-center w-5 h-5 mb-1 lg:w-8 lg:h-8 lg:mb-1.5 xl:w-11 xl:h-11 xl:text-xl 2xl:w-14 2xl:h-14 2xl:text-2xl 3xl:w-18 3xl:h-18 3xl:text-3xl`}
        >
          <p className="block text-center">{count}</p>
        </div>
      );
    });

  const routeCards = activePlayer.routeCards
    .sort((r1, r2) => {
      return r2.id - r1.id;
    })
    .map((route) => {
      return (
        <button
          key={'route-' + route.id}
          className={
            'relative focus:ring-0 focus:outline-none w-full text-left grid grid-rows-2 mb-1 rounded-md p-1 py-0.5 lg:p-1.5 ' +
            (route.id > 40 ? 'bg-gray-800' : 'bg-gray-500')
          }
          onMouseEnter={() => {
            if (route.finished) {
              setHoverCities([route.from, route.to]);
              setConnectionHover(route.path);
            } else {
              setHoverCities([route.from, route.to]);
            }
          }}
          onMouseLeave={() => {
            setHoverCities([]);
            setConnectionHover([]);
          }}
          onClick={() => {
            if (!route.finished) {
              if (
                activeCities.length === 0 ||
                activeCities[0] !== route.from ||
                activeCities[1] !== route.to
              )
                setActiveCities([route.from, route.to]);
              else {
                setActiveCities([]);
                setHoverCities([]);
              }
            }
          }}
        >
          <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
            {route.fromCity}
          </h3>
          <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
            {route.toCity}
          </h3>
          <p
            className={
              'absolute top-0 right-0 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom ' +
              (route.finished ? 'bg-green-400' : 'bg-gray-200')
            }
          >
            {route.finished ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 right-0 h-4 w-6 lg:h-7 lg:w-7 2xl:h-9 2xl:w-9 text-green-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M 10 21 Q 14 10 21 3 Q 13 9 10 15 Q 8 13 3 11 Q 7 14 10 21 z" />
              </svg>
            ) : null}
            {route.value}
          </p>
        </button>
      );
    });

  return (
    <div
      className={`relative col-start-8 row-start-1 row-span-5 text-ttr-white bg-player-${activePlayer.color} rounded-l-md -mr-4 py-1 pl-0.5 pr-3 lg:pl-1.5 lg:pr-2.5 lg:rounded-l-lg lg:col-start-7 2xl:pr-3 2xl:pl-2 3xl:pr-3.5 3xl:pl-2.5`}
    >
      <button
        className={classNames(
          'absolute focus:outline-none w-full top-1 left-1 text-left pl-2 2xl:left-2 2xl:mt-1.5 font-smallCaps font-semibold rounded-md xl:rounded-lg bg-yellow-300 hover:bg-yellow-200 text-yellow-700 border-2 border-yellow-600 text-xs whitespace-nowrap z-50 lg:text-base xl:text-xl 2xl:text-2xl transform transition-transform',
          {
            'translate-x-22 lg:translate-x-36 xl:translate-x-44 2xl:translate-x-52 3xl:translate-x-72':
              game.gameState !== PLAYER_DONE,
          },
        )}
        onClick={() => {
          setActiveCities([]);
          setHoverCities(new Set([]));
          dispatch(nextPlayer());
        }}
      >
        End turn
      </button>
      <div className="h-full overflow-y-auto no-scroll-bar">
        <div
          className={`bg-player-${activePlayer.color} drop-shadow-md fixed p-1 px-3 rounded-full top-2 right-1/2 transform translate-x-1/2 max-w-xs md:max-w-sm lg:max-w-xl lg:top-3 3xl:top-2`}
        >
          <h2 className="font-smallCaps font-semibold drop-shadow-md truncate text-xs lg:text-xl 3xl:text-2xl">
            {activePlayer.name}
          </h2>
        </div>
        <h2
          className={classNames(
            'font-smallCaps font-semibold drop-shadow-md text-2xs whitespace-nowrap mb-1 text-center lg:text-base xl:text-xl 2xl:text-2xl',
            { hidden: false },
          )}
        >
          Your hand
        </h2>
        <div className="bg-gray-300 bg-opacity-20 rounded-md mb-1 xl:mb-2 p-0.5 py-1 lg:p-1.5 3xl:p-2">
          <div className="flex items-center filter drop-shadow-md mb-1.5 lg:mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-8 ml-0.5 lg:h-8 lg:w-16 2xl:h-10 2xl:w-20 3xl:h-14 3xl:w-24"
              viewBox="0 0 50 18"
              fill="currentColor"
            >
              <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
              <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
              <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
            </svg>
            <p className="block filter font-number text-xs ml-1 lg:ml-1 lg:text-base xl:text-xl 2xl:text-2xl 3xl:text-3xl">
              x {activePlayer.carts}
            </p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-around filter drop-shadow-md font-semibold text-gray-700 font-number text-sm">
            {trainCards}
          </div>
        </div>
        <div
          className="bg-gray-800 bg-opacity-30 overflow-y-auto rounded-md p-0.5 pt-1 pb-0 lg:p-2 lg:pb-1"
          id="routecard-box"
        >
          <button
            key={'route-' + activePlayer.longRouteCard.id}
            className={
              'relative focus:ring-0 focus:outline-none w-full text-left grid grid-rows-2 mb-1 rounded-md p-1 py-0.5 lg:p-1.5 ' +
              (activePlayer.longRouteCard.id > 40
                ? 'bg-gray-800'
                : 'bg-gray-500')
            }
            onMouseEnter={() =>
              setHoverCities([
                activePlayer.longRouteCard.from,
                activePlayer.longRouteCard.to,
              ])
            }
            onMouseLeave={() => setHoverCities([])}
            onClick={() => {
              if (
                activeCities.length === 0 ||
                activeCities[0] !== activePlayer.longRouteCard.from ||
                activeCities[1] !== activePlayer.longRouteCard.to
              )
                setActiveCities([
                  activePlayer.longRouteCard.from,
                  activePlayer.longRouteCard.to,
                ]);
              else {
                setActiveCities([]);
                setHoverCities([]);
              }
            }}
          >
            <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
              {activePlayer.longRouteCard.fromCity}
            </h3>
            <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
              {activePlayer.longRouteCard.toCity}
            </h3>
            <p
              className={
                'absolute top-0 right-0 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom ' +
                (activePlayer.longRouteCard.finished
                  ? 'bg-green-400'
                  : 'bg-gray-200')
              }
            >
              {activePlayer.longRouteCard.value}
            </p>
          </button>
          {routeCards}
        </div>
      </div>
    </div>
  );
}

HandPanel.propTypes = {
  player: PlayerType,
  activeCities: PropTypes.arrayOf(PropTypes.string),
};
