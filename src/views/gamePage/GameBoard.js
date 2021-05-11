import { MapData } from '../../domain/mapData';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { selectGame } from '../../state/game/selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectActivePlayer } from '../../state/players/selector';
import { useRef, useState } from 'react';
import { PLAYER_BEGIN } from '../../constants/gameConstants';

export function GameBoard({
  activeCities,
  hoverCities,
  connectionHover,
  setConnectionHover,
  isConnectionBuilt,
}) {
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);
  const trainColorFormRef = useRef(null);
  const gameData = useSelector(selectGame);
  const activePlayer = useSelector(selectActivePlayer);

  const dispatch = useDispatch();

  const startBuildHandler = (e, connectionId) => {
    e.stopPropagation();
    setIsBuilding(true);
    setSelectedConnectionId(connectionId);
  };

  const confirmBuildHandler = (e) => {
    e.preventDefault();
    const formData = trainColorFormRef.current.value;
    console.log(formData);
    // let selectedTrainCards = [];
    // dispatch(buildConnection(activePlayer.id, selectedTrainCards, selectedConnectionId));
    setSelectedConnectionId(null);
    setIsBuilding(false);
  };

  const cityMarkers = gameData.cities.map((city) => {
    const hoverStyle =
      activeCities.includes(city.id) ||
      city.id === hoverCities.includes(city.id)
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
              { 'cursor-not-allowed': gameData.gameState !== PLAYER_BEGIN },
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
            onClick={(e) => startBuildHandler(e, connection.id)}
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
        <form
          ref={trainColorFormRef}
          onSubmit={(e) => confirmBuildHandler(e)}
          className="bg-gray-900 p-4 pt-2 rounded-md xl:rounded-lg xl:p-6 xl:pt-3"
        >
          <h2 className="text-ttr-white font-smallCaps font-semibold text-sm mb-2 xl:text-base xl:mb-4 2xl:text-xl 2xl:mb-3">
            Building connection:
          </h2>
          <div className="h-12 lg:h-20 xl:h-28 2xl:h-36 3xl:h-40">
            {
              gameData.connections[selectedConnectionId]
              // TODO build some kind of input solution
            }
          </div>
          <button
            type="submit"
            className="mx-auto block focus:outline-none bg-green-600 hover:bg-green-500 border-green-800 border-2 rounded-md px-4 mt-5 xl:mt-8 xl:text-lg xl:px-6"
            /* onClick={() => {
              let nlp = JSON.parse(JSON.stringify(localPlayer));
              if (drawingCarts) {
                drawnCarts.forEach((c) => {
                  addCartToHand(c, nlp);
                });
                setLocalPlayer(nlp);
                setDrawnCarts([]);
                setDrawingCarts(false);
              } else if (drawingRoutes) {
                for (const sr of selectedRoutes) {
                  let str = JSON.stringify(gameData.routes[sr - 1]);
                  console.log(str);
                  let newCard = JSON.parse(str);
                  console.log('parsed okay');
                  newCard.finished = false;
                  nlp.routeCards.push(newCard);
                  nlp.routeCardCount += 1;
                }
                setLocalPlayer(nlp);
                setSelectedRoutes([]);
                setDrawnRoutes([]);
                setDrawingRoutes(false);
              }
            }} */
          >
            OK
          </button>
        </form>
      </div>
    </>
  );
}

GameBoard.propTypes = {
  gameData: MapData,
  activeCities: PropTypes.arrayOf(PropTypes.string),
  hoverCities: PropTypes.arrayOf(PropTypes.string),
};
