import { useState } from 'react';
import classNames from 'classnames';
import './gamePage.css';
import { HandPanel } from './HandPanel';
import { GameBoard } from './GameBoard';
import { PlayerListType, PlayerType } from '../../domain/playerType';
import { ScoreBoard } from './ScoreBoard';
import { useDispatch, useSelector } from 'react-redux';
import {
  drawCardFromRoster,
  drawFromDeck,
  drawRouteCards,
  drawRoutesFirstRound,
} from '../../state/players/actions';
import {
  selectActivePlayer,
  selectPlayers,
} from '../../state/players/selector';
import {
  CART_COLOR_LOCOMOTIVE,
  GAME_ENDED,
  PLAYER_BEGIN,
  PLAYER_DRAW_TRAIN,
} from '../../constants/gameConstants';
import { nextPlayer } from '../../state/game/actions';
import { selectGame } from '../../state/game/selector';
import { FinalScoreBoard } from './FinalScoreBoard';

export function GamePage({ localPlayerId }) {
  const game = useSelector(selectGame);
  const players = useSelector(selectPlayers);
  const activePlayer = useSelector(selectActivePlayer);
  const actionLog = game.actionLog;

  const [activeCities, setActiveCities] = useState({
    routeIds: [],
    cityIds: [],
  });
  const [hoverCities, setHoverCities] = useState([]);
  const [deckPulled, setDeckPulled] = useState(false);
  const [drawingCarts, setDrawingCarts] = useState(false);
  const [drawnCarts, setDrawnCarts] = useState([]);
  const [drawingRoutes, setDrawingRoutes] = useState(false);
  const [drawnRoutes, setDrawnRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState(new Set([]));
  const [connectionHover, setConnectionHover] = useState([]);

  const dispatch = useDispatch();

  const setNextPlayerHandler = () => {
    setActiveCitiesHandler(null);
    dispatch(nextPlayer());
  };

  const setActiveCitiesHandler = (route) => {
    let newActives = { ...activeCities };
    if (route === null) {
      newActives = { routeIds: [], cityIds: [] };
    } else {
      if (activeCities.routeIds.includes(route.id)) {
        newActives.routeIds = activeCities.routeIds.filter((routeId) => {
          return routeId !== route.id;
        });

        let newCities = [...activeCities.cityIds];
        newCities.splice(newCities.indexOf(route.from), 1);
        newCities.splice(newCities.indexOf(route.to), 1);
        newActives.cityIds = newCities;
      } else {
        newActives.routeIds = [...activeCities.routeIds, route.id];

        let newCities = [...activeCities.cityIds];
        newCities.push(route.from);
        newCities.push(route.to);
        newActives.cityIds = newCities;
      }
    }
    setActiveCities(newActives);
  };

  function drawFromRosterHandler(color, position) {
    if (!activePlayer.playerFirstRound && activePlayer.id === localPlayerId) {
      dispatch(
        drawCardFromRoster(activePlayer.id, activePlayer.name, color, position),
      );

      if (
        game.gameState === PLAYER_DRAW_TRAIN ||
        color === CART_COLOR_LOCOMOTIVE
      )
        setNextPlayerHandler();
    }
  }

  function showDrawnFromTrainDeck() {
    if (!activePlayer.playerFirstRound && activePlayer.id === localPlayerId) {
      setDrawnCarts(game.trainCardDeck.slice(-2));
      setDrawingCarts(true);
    }
  }

  function drawFromDeckHandler() {
    dispatch(
      drawFromDeck(activePlayer.id, activePlayer.name, drawnCarts.reverse()),
    );
    setDrawnCarts([]);
    setDrawingCarts(false);
    setNextPlayerHandler();
  }

  function showDrawnRoutes() {
    setDrawnRoutes(game.routeDeck.slice(-3));
    setActiveCitiesHandler(activePlayer.longRouteCard);
    setDrawingRoutes(true);
  }

  function drawRouteCardsHandler() {
    const selectedRouteArray = Array.from(selectedRoutes);

    const selectedRouteIds = selectedRouteArray.map((route) => {
      return route.id;
    });

    const droppedRoutes = drawnRoutes.filter((route) => {
      return !selectedRouteIds.includes(route.id);
    });

    setDrawnRoutes([]);
    setSelectedRoutes(new Set([]));
    setDrawingRoutes(false);

    if (activePlayer.playerFirstRound)
      dispatch(
        drawRoutesFirstRound(
          activePlayer.id,
          activePlayer.name,
          selectedRouteArray,
          droppedRoutes,
        ),
      );
    else {
      dispatch(
        drawRouteCards(
          activePlayer.id,
          activePlayer.name,
          selectedRouteArray,
          droppedRoutes,
        ),
      );
      setNextPlayerHandler();
    }
  }

  /***************************************************/
  /**                                               **/
  /**               VIEW ELEMENTS >>>>>>            **/
  /**                                               **/
  /***************************************************/

  const cartSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      /* className="h-16 w-24 absolute top-1/3 left-5 transform -rotate-45 -translate-y-1" */
      className="transform -rotate-45 h-12 w-12 lg:h-20 lg:w-16 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28"
      viewBox="0 0 47 18"
      fill="currentColor"
    >
      <path d="M10 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
      <path d="M34 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM39.9 14.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
      <path d="M5 2a1 1.3 0 00-1 1V11.5h-1.5v-1h-.5v3h.5v-1h1.5L4 13a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H30a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H42a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L43 3a1 1.3 0 00-1-1H5z" />
    </svg>
  );

  const locomotiveSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      /* className="h-16 w-24 absolute top-1/4 left-3.5 transform -rotate-45 -translate-y-0.5" */
      className="block transform -rotate-45 h-12 w-12 lg:h-20 lg:w-16 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28 -translate-y-0.5 lg:-translate-y-1"
      viewBox="0 0 36 21"
      fill="currentColor"
    >
      <path d="M10 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0zM15.9 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
      <path d="M28 17.5a1.5 1.5 0 11-3 0a1.5 1.5 0 013 0z" />
      <path d="M4 4a1 1.3 0 00-1 1h1V14.5h-1.5v-1h-.5v3h.5v-1h1.5L4 16a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1a2.5 2.5 0 014.9 0H24a2.5 2.5 0 014.9 0h2.1a1 1 0 001-1v-.5h1.5v1h.5v-3h-.5v1h-1.5L32 9a1 1.3 0 00-1-1h-4v-4l1-1v-1h-4v1l1 1v4h-3v-1a1 1 0 00-2 0v1H14V5A1 1 0 0013 4H4z" />
    </svg>
  );

  const rosterCards = game.trainCardRoster.map((color, position) => {
    const gameState = game.gameState;
    const isLocomotive = color === 'locomotive';
    const isFirstRound = activePlayer.playerFirstRound;

    const available =
      activePlayer.id === localPlayerId &&
      !isFirstRound &&
      ((!isLocomotive &&
        (gameState === PLAYER_BEGIN || gameState === PLAYER_DRAW_TRAIN)) ||
        (isLocomotive && gameState === PLAYER_BEGIN));

    return (
      <button
        key={color + '-roster-' + position}
        className={classNames(
          `relative focus:outline-none bg-ttr-${color} inline-flex flex-row justify-center content-center overflow-hidden rounded-md shadow-xl w-12 h-12 ml-1.5 lg:w-16 lg:h-20 lg:ml-2 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28 3xl:h-40 3xl:w-32 3xl:p-2.5`,
          {
            'transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2': available,
            'cursor-not-allowed': !available,
          },
        )}
        disabled={!available}
        onClick={(e) => drawFromRosterHandler(color, position)}
      >
        {color === 'locomotive' ? locomotiveSVG : cartSVG}
      </button>
    );
  });

  const drawingCartCards = drawnCarts.map((color) => {
    return (
      <div
        key={color + '-roster-' + Math.floor(Math.random() * 100000)}
        className={`relative bg-ttr-${color} inline-flex flex-row justify-center content-center overflow-hidden rounded-md shadow-xl w-12 h-12 mx-2.5 lg:w-16 lg:h-20 lg:mx-4 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28 3xl:h-40 3xl:w-32 3xl:p-2.5`}
      >
        {color === 'locomotive' ? locomotiveSVG : cartSVG}
      </div>
    );
  });

  const drawingRouteCards = drawnRoutes.map((routeData) => {
    const selectedRouteArray = Array.from(selectedRoutes);
    return (
      <button
        key={'drawnRoute-' + routeData.id}
        className={classNames(
          'relative focus:ring-0 focus:outline-none text-ttr-white w-24 lg:w-28 xl:w-32 2xl:w-40 text-left inline-grid grid-rows-2 mb-1 mx-2 border-2 border-transparent rounded-md rounded-tr-none p-1.5 py-1 transform transition-tranform hover:-translate-y-0.5 xl:-hover:-translate-y-2',
          {
            'bg-gray-800': routeData.id > 40,
            'bg-gray-500': routeData.id <= 40,
            'border-gray-400': selectedRouteArray.includes(routeData),
          },
        )}
        onMouseEnter={() => {
          setHoverCities([routeData.from, routeData.to]);
        }}
        onMouseLeave={() => {
          setHoverCities([]);
        }}
        onClick={() => {
          let newSet = new Set(selectedRoutes);

          setActiveCitiesHandler(routeData);

          if (newSet.has(routeData)) {
            newSet.delete(routeData);
          } else {
            newSet.add(routeData);
          }

          setSelectedRoutes(newSet);
        }}
      >
        <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
          {routeData.fromCity}
        </h3>
        <h3 className="text-2xs font-semibold lg:text-xs xl:text-base 2xl:text-lg 3xl:text-xl">
          {routeData.toCity}
        </h3>
        <p className="absolute -top-0.5 -right-0.5 bg-gray-200 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom">
          {routeData.value}
        </p>
      </button>
    );
  });

  const actionLogList = actionLog.map((logEntry, leId) => {
    const bgColor =
      logEntry.id >= 0
        ? `bg-player-${players[logEntry.id].color}`
        : 'bg-gray-500';
    return (
      <li
        key={'log-' + leId}
        className={classNames(
          `text-3xs lg:text-2xs xl:text-xs 2xl:text-sm 3xl:text-base`,
          { 'font-bold': localPlayerId === logEntry.id },
        )}
      >
        <div
          className={`inline-block rounded-full w-1.5 h-1.5 xl:w-2 xl:h-2 3xl:w-3 3xl:h-3 mr-1 ${bgColor} drop-shadow-xl`}
        ></div>
        <i>{logEntry.name}</i>&nbsp;
        {logEntry.text}
      </li>
    );
  });

  return (
    <div className="container h-screen font-regular z-10 pt-10 flex md:px-16 lg:pt-16 lg:pb-2 2xl:flex  2xl:items-center">
      <div
        className="container relative overflow-hidden max-h-full h-auto self-center p-1.5 shadow-md bg-cover rounded-xl lg:p-3"
        id="board-backdrop"
      >
        <div className="container relative h-full grid grid-cols-8 grid-rows-5 lg:max-h-lg lg:grid-cols-7 xl:max-h-xl 2xl:max-h-2xl 3xl:max-h-3xl">
          <div className="contents" id="map">
            <GameBoard
              activeCities={activeCities.cityIds}
              setNextPlayer={setNextPlayerHandler}
              hoverCities={Array.from(hoverCities)}
              connectionHover={connectionHover}
              setConnectionHover={setConnectionHover}
            ></GameBoard>
          </div>
          <div className="contents" id="score-board">
            <div className="row-start-1 col-start-1 col-span-1 row-span-4 grid grid-rows-5 grid-cols-1 text-ttr-white filter drop-shadow-md p-0">
              <ScoreBoard></ScoreBoard>
            </div>
          </div>
          <div className="contents" id="deck-and-roster">
            <div className="fixed w-full bottom-0 right-0 lg:relative lg:col-span-5">
              <div
                className={classNames(
                  'relative rounded-t-md bg-red-900 mx-auto w-108 h-16 flex flex-row items-center content-around justify-between transform transition-transform p-2 lg:pb-0 lg:transform-none lg:h-full lg:w-full lg:max-w-xl lg:bg-opacity-0 lg:items-end lg:px-4 xl:max-w-3xl 2xl:max-w-5xl 2xl:px-8 3xl:max-w-6xl 3xl:pb-3',
                  { 'translate-y-15': !deckPulled },
                )}
                onMouseLeave={(e) => {
                  setDeckPulled(false);
                }}
              >
                <button
                  className="absolute -top-4 right-1/2 transform translate-x-1/2 h-4 w-16 bg-yellow-500 border-2 border-b-0 border-white rounded-t-md focus:outline-none lg:hidden"
                  onClick={() => setDeckPulled(!deckPulled)}
                >
                  <div
                    className={classNames(
                      'absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-800 border-2 border-b-0 border-red-800 rounded-full focus:outline-none lg:hidden animate-ping',
                      {
                        hidden:
                          !activePlayer.playerFirstRound ||
                          activePlayer.id !== localPlayerId,
                      },
                    )}
                  />
                  <div
                    className={classNames(
                      'absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-800 border-2 border-b-0 border-red-800 rounded-full focus:outline-none lg:hidden',
                      {
                        hidden:
                          !activePlayer.playerFirstRound ||
                          activePlayer.id !== localPlayerId,
                      },
                    )}
                  />
                </button>
                <button
                  className={classNames(
                    'relative filter drop-shadow-md rounded-md border-b-2 xl:border-b-4 border-yellow-200 bg-yellow-500 text-ttr-white focus:outline-none w-12 h-12 p-1 lg:w-16 lg:h-20 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5',
                    {
                      'transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2':
                        game.gameState === PLAYER_BEGIN &&
                        activePlayer.id === localPlayerId,
                      'cursor-not-allowed':
                        game.gameState !== PLAYER_BEGIN ||
                        activePlayer.id !== localPlayerId,
                    },
                  )}
                  onClick={() => {
                    if (
                      game.gameState === PLAYER_BEGIN &&
                      activePlayer.id === localPlayerId
                    )
                      showDrawnRoutes();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames(
                      'h-10 w-10 lg:h-12 lg:w-12 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 3xl:h-28 3xl:w-28',
                      {
                        'animate-bounce':
                          activePlayer.playerFirstRound &&
                          game.gameState === PLAYER_BEGIN &&
                          activePlayer.id === localPlayerId,
                      },
                    )}
                    viewBox="0 0 26 26"
                    fill="currentColor"
                  >
                    <path d="M13 19l-3-16c1-1 5-1 6 0l-3 16zM14 21a1 1 0 01-2 2a1 1 0 012-2z" />
                  </svg>
                </button>

                <button
                  className={classNames(
                    'filter drop-shadow-md rounded-md border-b-2 xl:border-b-4 border-blue-200 bg-blue-500 text-ttr-white focus:outline-none w-12 h-12 p-1 ml-6 mr-3 lg:w-16 lg:h-20 lg:ml-10 lg:mr-3 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5',
                    {
                      'transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2':
                        game.gameState === PLAYER_BEGIN &&
                        !activePlayer.playerFirstRound &&
                        activePlayer.id === localPlayerId,
                      'cursor-not-allowed':
                        game.gameState !== PLAYER_BEGIN ||
                        activePlayer.playerFirstRound ||
                        activePlayer.id !== localPlayerId,
                    },
                  )}
                  onClick={() => {
                    if (
                      game.gameState === PLAYER_BEGIN &&
                      activePlayer.id === localPlayerId
                    )
                      showDrawnFromTrainDeck();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 lg:h-12 lg:w-12 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 3xl:h-28 3xl:w-28"
                    viewBox="0 0 25 26"
                    fill="currentColor"
                  >
                    <path d="M3 20l11.43-11.43-.71-.7 1.42-1.43-2.14-2.18c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71v-2.88l-1.47 1.42-.71-.71-11.43 11.43-2.13-2.13z" />
                  </svg>
                </button>
                <div className="h-12 lg:h-20 xl:h-28 2xl:h-36 3xl:h-40 flex-grow">
                  {rosterCards}
                </div>
              </div>
            </div>
          </div>
          <div className="contents" id="action-log">
            <div className="row-start-5 col-start-1 col-span-1 row-span-1 text-ttr-white filter drop-shadow-md bg-gray-550 flex flex-col flex-nowrap flex-1 rounded-r-md -mx-4 p-1 pl-3.5 pt-0.5 lg:mr-0 lg:rounded-r-lg lg:py-1.5 lg:pr-1.5 3xl:py-2 3xl:pr-2 3xl:pl-4">
              <h3 className="flex-initial font-smallCaps font-semibold filter drop-shadow-md text-xs truncate lg:text-base xl:text-lg 2xl:text-2xl 3xl:text-3xl">
                Action log
              </h3>
              <div className="flex-1 overflow-y-scroll" id="action-list">
                <ul className=" divide-y-0.5 divide-ttr-white">
                  {actionLogList}
                </ul>
              </div>
            </div>
          </div>
          <div className="contents" id="player-hand">
            <HandPanel
              activeRoutes={activeCities.routeIds}
              setActiveCities={setActiveCitiesHandler}
              setHoverCities={setHoverCities}
              setConnectionHover={setConnectionHover}
              localPlayerId={localPlayerId}
            ></HandPanel>
          </div>
        </div>
        <div className="contents" id="drawnCardModal">
          <div
            className={classNames(
              'fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-20 flex justify-center',
              {
                hidden: !drawingCarts && !drawingRoutes,
                'items-center': drawingCarts,
                'items-start': drawingRoutes,
              },
            )}
          >
            <div
              className={classNames('bg-gray-900 rounded-md xl:rounded-lg', {
                'p-4 pt-2 xl:p-6 xl:pt-3': drawingCarts,
                'p-1 lg:p-2 xl:p-3 flex flex-row items-center': drawingRoutes,
              })}
            >
              <h2
                className={classNames(
                  'text-ttr-white font-smallCaps font-semibold text-sm xl:text-xl 2xl:text-xl',
                  {
                    'mb-4 xl:mb-4 2xl:mb-3': drawingCarts,
                    'mb-0 mr-4': drawingRoutes,
                  },
                )}
              >
                Cards drawn:
              </h2>
              <div className="">
                {drawingCarts ? drawingCartCards : drawingRouteCards}
              </div>
              <button
                className={classNames(
                  'mx-auto block focus:outline-none border-2 rounded-md px-4 xl:text-lg xl:px-6',
                  {
                    'mt-3 xl:mt-8': drawingCarts,
                    'mt-0': drawingRoutes,
                    'bg-green-600 border-green-800 hover:bg-green-500':
                      drawingCarts || selectedRoutes.size > 0,
                    'bg-gray-600 border-gray-800 cursor-not-allowed':
                      drawingRoutes && selectedRoutes.size < 1,
                  },
                )}
                onClick={() => {
                  if (drawingCarts) {
                    drawFromDeckHandler();
                  } else if (drawingRoutes && selectedRoutes.size > 0) {
                    drawRouteCardsHandler();
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
        <div className="contents" id="endGameModal">
          {game.gameState === GAME_ENDED ? (
            <FinalScoreBoard
              activeCities={activeCities.cityIds}
              setNextPlayer={setNextPlayerHandler}
              hoverCities={Array.from(hoverCities)}
              setHoverCities={setHoverCities}
              connectionHover={connectionHover}
              setConnectionHover={setConnectionHover}
            ></FinalScoreBoard>
          ) : null}
        </div>
      </div>
    </div>
  );
}

GamePage.propTypes = {
  opponentList: PlayerListType,
  localPlayer: PlayerType,
};
