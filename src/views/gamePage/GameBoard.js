import { MapData } from '../../domain/mapData';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { selectGame } from '../../state/game/selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectActivePlayer } from '../../state/players/selector';
import { useState } from 'react';
import {
  CART_COLOR_BLACK,
  CART_COLOR_LOCOMOTIVE,
  CART_COLOR_WHITE,
  COLOR_LIST,
  CONNECTION_COLOR_GRAY,
  PLAYER_BEGIN,
} from '../../constants/gameConstants';
import { buildConnection } from '../../state/players/actions';
import { startLastRound } from '../../state/game/actions';

export function GameBoard({
  activeCities,
  setNextPlayer,
  hoverCities,
  connectionHover,
  setConnectionHover,
  displayOnly = false,
}) {
  const gameData = useSelector(selectGame);
  const activePlayer = useSelector(selectActivePlayer);
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(
    gameData.connections[0],
  );
  const [selectedTrainColor, setSelectedTrainColor] = useState(
    CART_COLOR_BLACK,
  );
  const [selectedLocomotiveCount, setSelectedLocomotiveCount] = useState(-1);

  const dispatch = useDispatch();

  const startBuildHandler = (e, connection) => {
    e.stopPropagation();
    if (
      gameData.gameState === PLAYER_BEGIN &&
      !activePlayer.playerFirstRound &&
      activePlayer.carts >= connection.elements.length &&
      !displayOnly
    ) {
      setSelectedConnection(connection);
      const colorOptions = getColorOptions(connection);

      if (
        colorOptions.length > 0 &&
        activePlayer.trainCards.locomotive >= connection.locomotive
      ) {
        setSelectedTrainColor(colorOptions[0]);
        setIsBuilding(true);
      }
    }
  };

  const confirmBuildHandler = (e) => {
    e.preventDefault();
    if (
      selectedTrainColor === 'null' ||
      selectedLocomotiveCount < 0 ||
      displayOnly
    ) {
      return false;
    }
    const elementsNeeded = selectedConnection.elements.length;
    const colorCount = elementsNeeded - Number(selectedLocomotiveCount);

    if (
      elementsNeeded < 1 ||
      selectedLocomotiveCount > elementsNeeded ||
      selectedLocomotiveCount > activePlayer.trainCards.locomotive ||
      selectedLocomotiveCount < 0
    ) {
      return false;
    }

    const colorCards = Array(Number(colorCount)).fill(selectedTrainColor);
    const locomotiveCards = Array(Number(selectedLocomotiveCount)).fill(
      CART_COLOR_LOCOMOTIVE,
    );

    dispatch(
      buildConnection(
        activePlayer.id,
        activePlayer.name,
        activePlayer.color,
        [...colorCards, ...locomotiveCards],
        selectedConnection,
      ),
    );
    setSelectedLocomotiveCount(-1);
    setIsBuilding(false);
    const plId = activePlayer.id;
    const plCarts = activePlayer.carts - selectedConnection.elements.length;
    setNextPlayer();

    if (plCarts <= 2 && !gameData.lastRound) {
      dispatch(startLastRound(plId));
    }
  };

  const cancelBuildhandler = (e) => {
    setIsBuilding(false);
  };

  const getColorOptions = (connection) => {
    if (connection.color === CONNECTION_COLOR_GRAY) {
      return COLOR_LIST.filter((color) => {
        return (
          color !== CART_COLOR_LOCOMOTIVE &&
          activePlayer.trainCards[color] > 0 &&
          activePlayer.trainCards[color] +
            activePlayer.trainCards[CART_COLOR_LOCOMOTIVE] >=
            connection.elements.length
        );
      });
    } else {
      if (
        activePlayer.trainCards[connection.color] +
          activePlayer.trainCards[CART_COLOR_LOCOMOTIVE] >=
        connection.elements.length
      ) {
        return [connection.color];
      } else {
        return [];
      }
    }
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
      const canBuild =
        getColorOptions(connection).length > 0 &&
        activePlayer.trainCards.locomotive >= connection.locomotive &&
        activePlayer.carts >= connection.elements.length;
      const hoverStyle = connectionHover.includes(connection.id)
        ? ` border-2 shadow-glow-${activePlayer.color}-sm lg:shadow-glow-${activePlayer.color}`
        : '';
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
        if (displayOnly) {
          return (
            <div
              key={y + '-' + x}
              className="absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 transform focus:outline-none"
              style={style}
            ></div>
          );
        } else {
          return (
            <button
              key={y + '-' + x}
              className={classNames(
                `absolute w-2 h-4 lg:w-2.5 lg:h-5 xl:w-3 xl:h-7 2xl:w-3.5 2xl:h-8 3xl:w-4 3xl:h-10 transform focus:outline-none transition-all border-player-${activePlayer.color}` +
                  hoverStyle,
                {
                  'cursor-not-allowed':
                    gameData.gameState !== PLAYER_BEGIN ||
                    activePlayer.playerFirstRound ||
                    !canBuild,
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
        }
      });
      return (
        <div key={'connection-' + connection.id} className="contents">
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
          ? ` shadow-glow-${connection.ownerColor}-sm lg:shadow-glow-${connection.ownerColor}`
          : '';
        const style = rotation
          ? {
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
              `absolute w-2.5 h-3.5 lg:w-3 lg:h-4.5 xl:w-4 xl:h-6 2xl:w-5 2xl:h-7.5 3xl:w-4 3xl:h-10 built-border bg-player-${connection.ownerColor}` +
              hoverStyle
            }
            style={style}
            data-connection={connection.fromCity + '-' + connection.toCity}
            data-connection-id={connection.id}
          ></div>
        );
      });
      return (
        <div key={'connection-' + connection.id} className="contents">
          {trackElements}
        </div>
      );
    });

  const connectionBuilderForm = (() => {
    if (!isBuilding) return null;
    const connection = selectedConnection;

    const colorOptions = getColorOptions(selectedConnection);

    const colorRadioButtons = colorOptions.map((color) => {
      const isChecked = color === selectedTrainColor ? 'checked' : '';
      return (
        <label
          key={'radioSelect-' + color}
          className="mr-3 inline-flex items-center"
        >
          <input
            type="radio"
            name="colorSelect"
            value={color}
            className={classNames(
              `mr-1 -mb-0.5 bg-ttr-${color} checked:bg-ttr-${color} focus:bg-ttr-${color} focus:ring-ttr-${color} text-ttr-${color}`,
              {
                'checked:radio-dark focus:ring-offset-black':
                  color === CART_COLOR_WHITE,
              },
            )}
            onClick={(e) => {
              setSelectedTrainColor(color);
            }}
            onChange={(e) => {
              return;
            }}
            checked={isChecked}
          />
          <p className="pt-1">{color}</p>
        </label>
      );
    });

    const pathLength = connection.elements.length;
    const minLocomotive = Math.max(
      pathLength - activePlayer.trainCards[selectedTrainColor],
      connection.locomotive,
    );
    const maxLocomotive = Math.min(
      activePlayer.trainCards.locomotive,
      pathLength,
    );

    let locomotiveCountOptions = [];

    for (let i = minLocomotive; i <= maxLocomotive; ++i) {
      locomotiveCountOptions.push(i);
    }

    const locomotiveCountButtons = locomotiveCountOptions.map(
      (locomotiveCardCount) => {
        const colorCount = pathLength - locomotiveCardCount;
        let colorArray = [];

        for (let i = 0; i < colorCount; ++i) {
          colorArray.push(selectedTrainColor);
        }

        for (let i = 0; i < locomotiveCardCount; ++i) {
          colorArray.push(CART_COLOR_LOCOMOTIVE);
        }

        const colorDivArray = colorArray.map((color, ind) => {
          return (
            <div
              key={'buildColorCard-' + locomotiveCardCount + ind}
              className={`inline-block bg-ttr-${color} w-8 h-5 mx-1 rounded-sm`}
            ></div>
          );
        });

        return (
          <button
            key={'locCount-' + locomotiveCardCount}
            className={classNames(
              'block ml-4 my-2 p-1.5 px-4 rounded-md bg-ttr-white bg-opacity-20 hover:bg-opacity-40',
              {
                'bg-opacity-40':
                  locomotiveCardCount === selectedLocomotiveCount,
              },
            )}
            onClick={(e) => {
              e.preventDefault();
              setSelectedLocomotiveCount(locomotiveCardCount);
            }}
          >
            <div className="flex flex-row flex-nowrap items-center">
              <span className="font-number text-sm">
                {locomotiveCardCount}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline ml-2 w-8 h-4"
                  viewBox="0 0 36 23"
                  fill="currentColor"
                >
                  <path d="M10 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
                  <path d="M28 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
                  <path d="M4 4a1 1.3 0 00-1 1h1V14.5h-1.5v-1h-.5v3h.5v-1h1.5L4 16a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H24a2.5 2.5 0 014.9 0h2.1a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L32 9a1 1.3 0 00-1-1h-4v-4l1-1v-1h-4v1l1 1v4h-3v-1a1 1 0 00-2 0v1H14V5A1 1 0 0013 4H4z" />
                </svg>
              </span>
              <span className="text-sm ml-3 mr-4">|</span>
              {colorDivArray}
            </div>
          </button>
        );
      },
    );

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
          Color: {selectedConnection.color}
          <span className="ml-4">|</span>
          <span className="ml-4">
            Length: {selectedConnection.elements.length}
          </span>
        </p>
        <h3>Select the train cards you want to build with!</h3>
        <label htmlFor="chosenColor" className="text-sm">
          <span className="font-number">1)</span> Select a color:
        </label>
        <div className="ml-4">{colorRadioButtons}</div>
        <label htmlFor="locomotivesUsed" className="text-sm">
          <span className="font-number">2)</span> Select the number of
          locomotives to use:
        </label>
        {locomotiveCountButtons}
        <div className="flex flex-row w-100">
          <button
            type="submit"
            className={classNames(
              'mx-auto block focus:outline-none border-2 rounded-md px-4 mt-5 xl:mt-8 xl:text-lg xl:px-6',
              {
                'bg-green-600 border-green-800 hover:bg-green-500':
                  selectedTrainColor !== 'null' && selectedLocomotiveCount >= 0,
                'bg-gray-600 border-gray-800 cursor-not-allowed':
                  selectedTrainColor === 'null' || selectedLocomotiveCount < 0,
              },
            )}
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
