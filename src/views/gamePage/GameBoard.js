import { MapData } from '../../domain/mapData';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function GameBoard({
  gameData,
  activeCities,
  hoverCities,
  playerColor,
}) {
  const [connectionHover, setConnectionHover] = useState('');
  const [builtConnections, setBuiltConnections] = useState([]);

  function isConnectionBuilt(id) {
    let result = 0;
    builtConnections.forEach((cb) => {
      if (cb[0] === id) ++result;
    });
    return result;
  }

  const cityMarkers = gameData.cities.map((city) => {
    const hoverStyle =
      city.id === activeCities[0] ||
      city.id === activeCities[1] ||
      city.id === hoverCities[0] ||
      city.id === hoverCities[1]
        ? ` w-2 h-2 border-2 3xl:border-4 shadow-glow-${playerColor}-sm lg:shadow-glow-${playerColor} lg:w-3 lg:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5`
        : '';
    const style = { top: city.y + '%', left: city.x + '%' };
    return (
      <div
        key={'city-' + city.id}
        className={
          `absolute rounded-full w-0 h-0 border-player-${playerColor} bg-white box-content transform -translate-y-1/2 -translate-x-1/2 transition-all` +
          hoverStyle
        }
        style={style}
        id={city.city}
      ></div>
    );
  });

  const connectionMarkers = gameData.connections
    .filter((connection) => {
      return !isConnectionBuilt(connection.id);
    })
    .map((connection) => {
      const trackElements = connection.elements.map(({ x, y, rotation }) => {
        let hoverStyle =
          connection.id === connectionHover
            ? ` border-2 shadow-glow-${playerColor}-sm lg:shadow-glow-${playerColor}`
            : '';
        const style = rotation
          ? {
              /* transformOrigin: 'translate(-50%, -50%)', */
              transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
              top: y + '%',
              left: x + '%',
            }
          : {
              transform: `translate(-50%,-50%)`,
              top: y + '%',
              left: x + '%',
            };
        return (
          <button
            key={y + '-' + x}
            className={
              `absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 transform focus:outline-none transition-all border-player-${playerColor}` +
              hoverStyle
            }
            style={style}
            data-connection={connection.fromCity + '-' + connection.toCity}
            data-connection-id={connection.id}
            onMouseEnter={() => {
              setConnectionHover(connection.id);
            }}
            onMouseLeave={() => {
              setConnectionHover('');
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isConnectionBuilt(connection.id)) {
                let newCB = builtConnections;
                newCB.push([connection.id, playerColor]);
              }
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

  const builtMarkers = gameData.connections
    .filter((connection) => {
      return isConnectionBuilt(connection.id);
    })
    .map((connection) => {
      const trackElements = connection.elements.map(({ x, y, rotation }) => {
        const style = rotation
          ? {
              /* transformOrigin: 'translate(-50%, -50%)', */
              transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
              top: y + '%',
              left: x + '%',
            }
          : {
              transform: `translate(-50%,-50%)`,
              top: y + '%',
              left: x + '%',
            };
        return (
          <div
            key={y + '-' + x}
            className={`absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 built-border bg-player-${playerColor}`}
            style={style}
            data-connection={connection.fromCity + '-' + connection.toCity}
            data-connection-id={connection.id}
          ></div>
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
        <div className="contents">{connectionMarkers}</div>
        <div className="contents">{builtMarkers}</div>
        <div className="contents">{cityMarkers}</div>
      </div>
    </>
  );
}

GameBoard.propTypes = {
  gameData: MapData,
  activeCities: PropTypes.arrayOf(PropTypes.string),
  hoverCities: PropTypes.arrayOf(PropTypes.string),
};
