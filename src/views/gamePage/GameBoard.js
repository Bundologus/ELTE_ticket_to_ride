import { MapData } from '../../domain/mapData';
import classNames from 'classnames';

export function GameBoard({ gameData, activeConnection }) {
  const cityMarkers = gameData.cities.map((city) => {
    const style = { top: city.y + '%', left: city.x + '%' };
    return (
      <div
        key={'city-' + city.id}
        className="absolute rounded-full border-2 border-red-500 w-3 h-3 transform -translate-y-1/2 -translate-x-1/2 xl:border-4 xl:w-6 xl:h-6"
        style={style}
        id={city.city}
      ></div>
    );
  });

  const connectionMarkers = gameData.connections.map((connection) => {
    const trackElements = connection.elements.map(({ x, y, rotation }) => {
      let style;
      rotation
        ? (style = {
            /* transformOrigin: 'translate(-50%, -50%)', */
            transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
            top: y + '%',
            left: x + '%',
          })
        : (style = {
            transform: `translate(-50%,-50%)`,
            top: y + '%',
            left: x + '%',
          });
      return (
        <button
          key={y + '-' + x}
          className={classNames(
            'absolute w-1.5 h-6 border-2 border-indigo-600 transform',
            {
              'bg-pink-600': activeConnection === connection.id,
            },
          )}
          style={style}
          data-connection={connection.fromCity + '-' + connection.toCity}
          data-connection-id={connection.id}
          onClick={(e) => {
            e.stopPropagation();
            /* Select connection for building */
            document.querySelectorAll(
              `[data-connection-id]=${e.target.dataset.connectionId}`,
            );
          }}
        ></button>
      );
    });
    return (
      <div key={`connection-${connection.id}`} className="contents">
        {trackElements}
      </div>
    );
  });
  return (
    <>
      <div className="board relative col-span-6 row-span-5 mt-0 mb-2 mx-auto rounded-md lg:row-span-4 lg:col-span-5 lg:mb-0">
        <div className="contents">{cityMarkers}</div>
        <div className="contents">{connectionMarkers}</div>
      </div>
    </>
  );
}

GameBoard.propTypes = {
  gameData: MapData,
};
