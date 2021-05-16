import { MapData } from '../../domain/mapData';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { selectGame } from '../../state/game/selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectActivePlayer } from '../../state/players/selector';
import { useRef, useState } from 'react';
import {
  CART_COLOR_LOCOMOTIVE,
  COLOR_LIST,
  CONNECTION_COLOR_GRAY,
  PLAYER_BEGIN,
} from '../../constants/gameConstants';
import { buildConnection } from '../../state/players/actions';

export function GameBoard({
  activeCities,
  hoverCities,
  connectionHover,
  setConnectionHover,
}) {
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [chosenTrainColor, setChosenTrainColor] = useState('');
  const locomotiveCountRef = useRef(null);
  const trainColorRef = useRef(null);
  const gameData = useSelector(selectGame);
  const activePlayer = useSelector(selectActivePlayer);

  const dispatch = useDispatch();

  const startBuildHandler = (e, connection) => {
    e.stopPropagation();
    if (gameData.gameState === PLAYER_BEGIN && !activePlayer.playerFirstRound) {
      setIsBuilding(true);
      setSelectedConnection(connection);
    }
  };

  const confirmBuildHandler = (e) => {
    e.preventDefault();
    if (
      trainColorRef.current.value === 'null' ||
      locomotiveCountRef.current === null
    ) {
      return false;
    }
    const elementsNeeded = selectedConnection.elements.length;
    const locomotiveCount = locomotiveCountRef.current.value;
    const colorCount = elementsNeeded - Number(locomotiveCount);

    if (
      elementsNeeded < 1 ||
      locomotiveCount > elementsNeeded ||
      locomotiveCount > activePlayer.trainCards.locomotive ||
      locomotiveCount < 0
    ) {
      return false;
    }

    const colorCards = Array(Number(colorCount)).fill(chosenTrainColor);
    const locomotiveCards = Array(Number(locomotiveCount)).fill(
      CART_COLOR_LOCOMOTIVE,
    );

    dispatch(
      buildConnection(
        activePlayer.id,
        activePlayer.name,
        [...colorCards, ...locomotiveCards],
        selectedConnection.id,
      ),
    );
    setSelectedConnection(null);
    setIsBuilding(false);
    setChosenTrainColor('');
  };

  const trainColorChangeHandler = (e) => {
    e.preventDefault();

    setChosenTrainColor(e.target.value);
  };

  const cancelBuildhandler = (e) => {
    setSelectedConnection(null);
    setIsBuilding(false);
    setChosenTrainColor('');
  };

  const cityMarkers = gameData.cities.map((city) => {
    const hoverCityArray = Array.from(hoverCities);
    const hoverStyle =
      activeCities.includes(city.id) || hoverCityArray.includes(city.id)
        ? ` w-2 h-2 border-2 3xl:border-4 shadow-glow-${activePlayer.color}-sm lg:shadow-glow-${activePlayer.color} lg:w-3 lg:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5`
        : '';
    const style = { top: city.y + '%', left: city.x + '%' };
    return (
      <div
        key={'city-' + city.id}
        className={
          `absolute rounded-full w-0 h-0 border-player-${activePlayer.color} bg-white box-content transform -translate-y-1/2 -translate-x-1/2 transition-all` +
          hoverStyle
        }
        style={style}
        id={city.city}
      ></div>
    );
  });

  const freeConnectionMarkers = gameData.connections
    .filter((connection) => {
      return !connection.isBuilt;
    })
    .map((connection) => {
      const trackElements = connection.elements.map(({ x, y, rotation }) => {
        let hoverStyle = connectionHover.includes(connection.id)
          ? ` border-2 shadow-glow-${activePlayer.color}-sm lg:shadow-glow-${activePlayer.color}`
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
            className={classNames(
              `absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 transform focus:outline-none transition-all border-player-${activePlayer.color}` +
                hoverStyle,
              {
                'cursor-not-allowed':
                  gameData.gameState !== PLAYER_BEGIN ||
                  activePlayer.playerFirstRound,
              },
            )}
            style={style}
            data-connection={connection.fromCity + '-' + connection.toCity}
            data-connection-id={connection.id}
            onMouseEnter={() => {
              setConnectionHover([connection.id]);
            }}
            onMouseLeave={() => {
              setConnectionHover([]);
            }}
            onClick={(e) => startBuildHandler(e, connection)}
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
      return connection.isBuilt;
    })
    .map((connection) => {
      const trackElements = connection.elements.map(({ x, y, rotation }) => {
        let hoverStyle = connectionHover.includes(connection.id)
          ? ` shadow-glow-${activePlayer.color}-sm lg:shadow-glow-${activePlayer.color}` // TODO change these to the actual owner's color
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
          <div
            key={y + '-' + x}
            className={
              `absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 built-border bg-player-${activePlayer.color}` +
              hoverStyle
            }
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

  const connectionBuilderForm = (() => {
    if (selectedConnection === null) return null;
    const connection = selectedConnection;

    const colorOptions = COLOR_LIST.filter((color) => {
      return (
        ((connection.color === CONNECTION_COLOR_GRAY &&
          color !== CART_COLOR_LOCOMOTIVE) ||
          connection.color === color) &&
        activePlayer.trainCards[color] +
          activePlayer.trainCards[CART_COLOR_LOCOMOTIVE] >=
          connection.elements.length
      );
    });

    const colorSelectOptions = colorOptions.map((color) => {
      return (
        <option className="text-sm" key={'select-' + color} value={color}>
          {color}
        </option>
      );
    });

    return (
      <form
        onSubmit={(e) => confirmBuildHandler(e)}
        className="bg-gray-900 text-ttr-white font-regular p-4 pt-2 rounded-md xl:rounded-lg xl:p-6 xl:pt-3"
      >
        <h2 className="font-smallCaps font-semibold text-base xl:text-lg 2xl:text-2xl">
          Building connection between {selectedConnection.fromCity} and{' '}
          {connection.toCity}
        </h2>
        <p className="font-smallCaps opacity-60 mb-2 xl:mb-4 2xl:mb-3 text-sm xl:text-base 2xl:text-lg">
          Connection color: {selectedConnection.color}
          <br />
          Connection length: {selectedConnection.elements.length}
        </p>
        <label htmlFor="chosenColor" className="text-sm">
          Suitable train card colors:
        </label>
        <select
          className="block w-1/2 bg-gray-700 rounded-md text-xs p-1 border-none focus:ring-0"
          name="chosenColor"
          value={chosenTrainColor}
          ref={trainColorRef}
          onChange={(e) => trainColorChangeHandler(e)}
        >
          <option value="null">Select a color</option>
          {colorSelectOptions}
        </select>
        <label htmlFor="locomotivesUsed" className="text-sm">
          How many locomotive cards do you want to use?
        </label>
        <input
          className="block w-1/2 bg-gray-700 rounded-md text-xs p-1 border-none focus:ring-0 font-number"
          name="locomotivesUsed"
          ref={locomotiveCountRef}
          type="number"
          max={activePlayer.trainCards.locomotive}
          min={
            chosenTrainColor
              ? selectedConnection.elements.length -
                activePlayer.trainCards[chosenTrainColor]
              : '0'
          }
        ></input>
        <div className="flex flex-row w-100">
          <button
            type="submit"
            className="mx-auto block focus:outline-none bg-green-600 hover:bg-green-500 border-green-800 border-2 rounded-md px-4 mt-5 xl:mt-8 xl:text-lg xl:px-6"
          >
            OK
          </button>
          <button
            type="button"
            className="mx-auto block focus:outline-none bg-yellow-600 hover:bg-yellow-500 border-yellow-800 border-2 rounded-md px-4 mt-5 xl:mt-8 xl:text-lg xl:px-6"
            onClick={(e) => cancelBuildhandler(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  })();

  return (
    <>
      <div className="board relative col-span-6 row-span-5 mt-0 mb-2 mx-auto rounded-md lg:row-span-4 lg:col-span-5 lg:mb-0">
        <div className="contents">{freeConnectionMarkers}</div>
        <div className="contents">{builtMarkers}</div>
        <div className="contents">{cityMarkers}</div>
      </div>
      <div
        className={classNames(
          'fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex justify-center items-center',
          { hidden: !isBuilding },
        )}
      >
        {connectionBuilderForm}
      </div>
    </>
  );
}

GameBoard.propTypes = {
  gameData: MapData,
  activeCities: PropTypes.arrayOf(PropTypes.string),
  hoverCities: PropTypes.arrayOf(PropTypes.string),
};
