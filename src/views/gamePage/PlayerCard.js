import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectActivePlayer } from '../../state/players/selector';

export function PlayerCard({ player }) {
  const activePlayer = useSelector(selectActivePlayer);
  const svgPaths = [
    /* cart svg */
    'M4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2ZM9.5 20a.9.9 90 11-2 0a.9.9 90 012 0zM13 20a.9.9 90 11-2 0a.9.9 90 012 0zM23 20a.9.9 90 11-2 0a.9.9 90 012 0zM26.5 20a.9.9 90 11-2 0a.9.9 90 012 0zM6 12h22a1 1 0 011 1v4.75h1v-.75h.4v2h-.4v-.75h-1v.75a1 1 0 01-1 1h-1a1 1 0 00-3 0h-.5a1 1 0 00-3 0h-7a1 1 0 00-3 0h-.5a1 1 0 00-3 0h-1a1 1 0 01-1-1v-.75h-1v.75h-.4v-2h.4v.75h1v-4.75a1 1 0 011-1z',
    /* train card svg */
    'M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z',
    /* route card svg */
    'M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z',
  ];

  const iconRow = svgPaths.map((path, ptid) => {
    return (
      <td key={'path-' + ptid}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-3.5 w-3.5 lg:h-6 lg:w-6 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 3xl:h-16 3xl:w-16"
          viewBox="0 0 35 35"
          fill="currentColor"
        >
          <path d={path} />
        </svg>
      </td>
    );
  });

  return (
    <div
      key={`playerCard-${player.id}`}
      className={classNames(
        `relative bg-player-${player.color} text-ttr-white shadow-md rounded-br-lg -ml-4 p-1 pl-3.5 pt-0.5 lg:rounded-br-xl lg:py-1.5 lg:pr-1.5 xl:rounded-br-2xl 3xl:py-2 3xl:pr-2 3xl:pl-4 3xl:rounded-br-3xl`,
        {
          'border-ttr-white border xl:border-2 2xl:border-4':
            player.id === activePlayer.id,
        },
      )}
    >
      <h2 className="font-smallCaps font-semibold filter drop-shadow-md text-xs truncate lg:text-base xl:text-lg 2xl:text-2xl 2xl:mb-1 3xl:text-3xl">
        {player.name}
      </h2>
      <p
        className={
          'absolute top-0 right-0 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom bg-gray-200'
        }
      >
        {player.score}
      </p>
      <table className="w-full text-center filter drop-shadow-md">
        <tbody>
          <tr>{iconRow}</tr>
          <tr className="filter drop-shadow-md text-2xs lg:text-sm xl:text-base 2xl:text-2xl 3xl:text-3xl">
            <td>
              <p className="block">
                <span className="font-number">{player.carts}</span>
              </p>
            </td>
            <td>
              <p className="block">
                <span className="font-number">{player.trainCardCount}</span>
              </p>
            </td>
            <td>
              <p className="block">
                <span className="font-number">{player.routeCardCount}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center filter drop-shadow-md"></div>
      <div className="flex items-center justify-between filter drop-shadow-md lg:mb-1 lg:pr-1 xl:pr-2"></div>
    </div>
  );
}
