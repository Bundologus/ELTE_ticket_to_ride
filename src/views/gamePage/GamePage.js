import { useState } from 'react';
import classNames from 'classnames';
import { ticketToRideData as gameData } from '../../assets/ticket-to-ride-data';
import './gamePage.css';
import { PlayerCard } from './PlayerCard';
import { HandPanel } from './HandPanel';
import { GameBoard } from './GameBoard';
import { PlayerListType, PlayerType } from '../../domain/playerType';
import { ScoreBoard } from './ScoreBoard';

export function GamePage({
  opponentList,
  localPlayer,
  setLocalPlayer,
  playerCount,
}) {
  const [gameState, setGameState] = useState('running');
  const [roster, setRoster] = useState([
    'green',
    'white',
    'locomotive',
    'pink',
    'green',
  ]);
  const [activeCities, setActiveCities] = useState([]);
  const [hoverCities, setHoverCities] = useState([]);
  const [deckPulled, setDeckPulled] = useState(false);
  const [drawingCarts, setDrawingCarts] = useState(false);
  const [drawnCarts, setDrawnCarts] = useState([]);
  const [drawingRoutes, setDrawingRoutes] = useState(false);
  const [drawnRoutes, setDrawnRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const colors = [
    'black',
    'blue',
    'green',
    'orange',
    'pink',
    'red',
    'white',
    'yellow',
    'locomotive',
  ];

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

  const rosterCards = roster.map((color) => {
    return (
      <button
        key={color + '-roster-' + Math.floor(Math.random() * 100000)}
        className={`relative focus:outline-none bg-ttr-${color} inline-flex flex-row justify-center content-center overflow-hidden rounded-md shadow-xl w-12 h-12 ml-1.5 transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2 lg:w-16 lg:h-20 lg:ml-2 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28 3xl:h-40 3xl:w-32 3xl:p-2.5`}
        onClick={(e) => {
          e.preventDefault();
        }}
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

  const drawingRouteCards = drawnRoutes.map((routeId) => {
    let routeData = gameData.routes[routeId];
    routeData.isSelected = false;
    selectedRoutes.forEach((sr) => {
      if (sr === routeData.id) {
        routeData.isSelected = true;
      }
    });

    return (
      <button
        key={'drawnRoute-' + routeData.id}
        className={classNames(
          'relative focus:ring-0 focus:outline-none text-ttr-white w-24 2xl:w-40 text-left inline-grid grid-rows-2 mb-1 mx-2 rounded-md p-1.5 py-1 lg:p-1.5 transform transition-tranform hover:-translate-y-0.5 xl:-hover:-translate-y-2',
          {
            'bg-gray-800': routeData.id > 40,
            'bg-gray-500': routeData.id <= 40,
            'border-2 border-gray-400': routeData.isSelected,
          },
        )}
        onClick={() => {
          let newSet = new Set(selectedRoutes);

          if (newSet.has(routeData.id)) {
            newSet.delete(routeData.id);
          } else {
            newSet.add(routeData.id);
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
        <p className="absolute top-0 right-0 bg-gray-200 rounded-b-full rounded-tl-full rounded-tr-lg font-number font-bold text-gray-800 text-center text-xs h-4 w-6 lg:w-7 lg:h-7 lg:text-lg xl:w-8 xl:h-8 xl:text-xl xl:leading-9 2xl:w-10 2xl:h-10 2xl:leading-custom">
          {routeData.value}
        </p>
      </button>
    );
  });

  function drawCarts() {
    /* TODO weighted randomization, remaining deck tracking */

    const cs = [colors[Math.floor((Math.random() * 10000) % 9)]];

    if (cs[0] !== 'locomotive') {
      cs.push(colors[Math.floor((Math.random() * 10000) % 9)]);
    }
    setDrawnCarts(cs);
    setDrawingCarts(true);
  }

  function drawRoutes() {
    /* TODO remaining deck tracking */

    let rcs = [];
    while (rcs.length < 3) {
      let r = Math.floor((Math.random() * 10000) % 40);
      let rNew = true;
      rcs.forEach((rc) => {
        if (rc === r) rNew = false;
      });
      if (rNew) rcs.push(r);
    }
    setDrawnRoutes(rcs);
    setDrawingRoutes(true);
  }

  return (
    <div className="container h-screen font-regular z-10 pt-10 md:px-16 lg:pt-16 lg:pb-2 2xl:flex  2xl:items-center">
      <div
        className="container relative overflow-hidden h-full p-1.5 shadow-md bg-cover rounded-none lg:rounded-xl lg:p-3"
        id="board-backdrop"
      >
        <div className="container relative h-full grid grid-cols-8 grid-rows-5 lg:grid-cols-7">
          <div className="contents" id="map">
            <GameBoard
              gameData={gameData}
              activeCities={activeCities}
              hoverCities={hoverCities}
              playerColor={localPlayer.color}
            ></GameBoard>
          </div>
          <div className="contents" id="stat-cards">
            <div className="row-start-1 col-start-1">
              <PlayerCard player={opponentList[0]}></PlayerCard>
            </div>
            <div className="row-start-2 col-start-1">
              <PlayerCard player={opponentList[1]}></PlayerCard>
            </div>
            <div className="row-start-3 col-start-1">
              <PlayerCard player={opponentList[2]}></PlayerCard>
            </div>
            <div className="row-start-4 col-start-1">
              <PlayerCard player={opponentList[3]}></PlayerCard>
            </div>
          </div>
          <div className="contents" id="score-board">
            <div className="row-start-5 col-start-1 col-span-1 row-span-1 grid grid-rows-5 text-ttr-white filter drop-shadow-md p-0">
              <ScoreBoard
                opponentList={opponentList}
                localPlayer={localPlayer}
              ></ScoreBoard>
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
                />
                <button
                  className="filter drop-shadow-md rounded-md border-b-2 xl:border-b-4 border-yellow-200 bg-yellow-500 text-ttr-white focus:outline-none transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2 w-12 h-12 p-1 lg:w-16 lg:h-20 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5"
                  onClick={() => {
                    drawRoutes();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 lg:h-12 lg:w-12 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 3xl:h-28 3xl:w-28"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                  >
                    <path d="M13 19l-3-16c1-1 5-1 6 0l-3 16zM14 21a1 1 0 01-2 2a1 1 0 012-2z" />
                  </svg>
                </button>
                <button
                  className="filter drop-shadow-md rounded-md border-b-2 xl:border-b-4 border-blue-200 bg-blue-500 text-ttr-white focus:outline-none transform transition-transform hover:-translate-y-1 lg:hover:-translate-y-2 w-12 h-12 p-1 ml-6 mr-3 lg:w-16 lg:h-20 lg:ml-10 lg:mr-3 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5"
                  onClick={() => {
                    drawCarts();
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
                <div className="h-12 lg:h-20 xl:h-28 2xl:h-36 3xl:h-40">
                  {rosterCards}
                </div>
              </div>
            </div>
          </div>
          <div className="contents" id="player-hand">
            <div className="col-start-8 row-start-1 row-span-5 text-ttr-white bg-player-green rounded-l-md -mr-4 py-1 pl-0.5 pr-3 lg:pl-1.5 lg:pr-2.5 lg:rounded-l-lg lg:col-start-7 2xl:pr-3 2xl:pl-2 3xl:pr-3.5 3xl:pl-2.5">
              <HandPanel
                player={localPlayer}
                activeCities={activeCities}
                setActiveCities={setActiveCities}
                setHoverCities={setHoverCities}
              ></HandPanel>
            </div>
          </div>
        </div>
        <div className="contents" id="drawnCardModal">
          <div
            className={classNames(
              'fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 flex justify-center items-center',
              { hidden: !drawingCarts && !drawingRoutes },
            )}
          >
            <div className="bg-gray-900 p-4 pt-2 rounded-md xl:rounded-lg xl:p-6 xl:pt-3">
              <h2 className="text-ttr-white font-smallCaps font-semibold text-sm mb-2 xl:text-base xl:mb-4 2xl:text-xl 2xl:mb-3">
                Cards drawn:
              </h2>
              <div className="h-12 lg:h-20 xl:h-28 2xl:h-36 3xl:h-40">
                {drawingCarts ? drawingCartCards : drawingRouteCards}
              </div>
              <button
                className="mx-auto block focus:outline-none bg-green-600 hover:bg-green-500 border-green-800 border-2 rounded-md px-4 mt-5 xl:mt-8 xl:text-lg xl:px-6"
                onClick={() => {
                  let nlp = JSON.parse(JSON.stringify(localPlayer));
                  if (drawingCarts) {
                    drawnCarts.forEach((c) => {
                      if (c === 'black') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.black += 1;
                      } else if (c === 'blue') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.blue += 1;
                      } else if (c === 'green') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.green += 1;
                      } else if (c === 'orange') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.orange += 1;
                      } else if (c === 'pink') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.pink += 1;
                      } else if (c === 'red') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.red += 1;
                      } else if (c === 'white') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.white += 1;
                      } else if (c === 'yellow') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.yellow += 1;
                      } else if (c === 'locomotive') {
                        nlp.trainCardCount += 1;
                        nlp.trainCards.locomotive += 1;
                      }
                    });
                    setLocalPlayer(nlp);
                    setDrawnCarts([]);
                    setDrawingCarts(false);
                  } else if (drawingRoutes) {
                    for (const sr of selectedRoutes) {
                      nlp.routeCards.push(gameData.routes[sr]);
                      nlp.routeCardCount += 1;
                    }
                    setLocalPlayer(nlp);
                    setSelectedRoutes([]);
                    setDrawnRoutes([]);
                    setDrawingRoutes(false);
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
        <div
          id="demoPanel"
          className="fixed right-1 bottom-0 rounded-t-md bg-gray-700 text-ttr-white py-0.5 px-1.5 border-2 border-b-0 border-gray-300 transition-transform transform text-2xs lg:text-xl lg:py-1.5 lg:px-3"
          onClick={() => {
            document
              .getElementById('demoPanel')
              .classList.toggle('translate-y-3/4');
          }}
        >
          <h1 className="text-sm lg:text-2xl">Demó panel</h1>
          <button
            className="bg-gray-400 text-black w-full rounded-sm mb-0.5 hover:bg-gray-300 pt-0.5"
            onClick={(e) => {
              e.stopPropagation();
              let nlp = {
                id: localPlayer.id,
                name: localPlayer.name,
                color: localPlayer.color,
                score: 0,
                carts: 45,
                trainCardCount: 0,
                trainCards: {
                  black: 0,
                  blue: 0,
                  green: 0,
                  orange: 0,
                  pink: 0,
                  red: 0,
                  white: 0,
                  yellow: 0,
                  locomotive: 0,
                },
                routeCardCount: 0,
                routeCards: [],
                longRouteCard: {},
              };
              for (let i = 0; i < 4; ++i) {
                let c = colors[Math.floor((Math.random() * 10000) % 9)];
                if (c === 'black') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.black += 1;
                } else if (c === 'blue') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.blue += 1;
                } else if (c === 'green') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.green += 1;
                } else if (c === 'orange') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.orange += 1;
                } else if (c === 'pink') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.pink += 1;
                } else if (c === 'red') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.red += 1;
                } else if (c === 'white') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.white += 1;
                } else if (c === 'yellow') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.yellow += 1;
                } else if (c === 'locomotive') {
                  nlp.trainCardCount += 1;
                  nlp.trainCards.locomotive += 1;
                }
              }

              nlp.longRouteCard =
                gameData.longRoutes[Math.floor((Math.random() * 10000) % 6)];
              nlp.routeCardCount = 1;
              setLocalPlayer(nlp);
              drawRoutes();
            }}
          >
            Első kör
          </button>
        </div>
      </div>
    </div>
  );
}

GamePage.propTypes = {
  opponentList: PlayerListType,
  localPlayer: PlayerType,
};
