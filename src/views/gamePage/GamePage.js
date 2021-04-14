import { useState } from 'react';
import classNames from 'classnames';
import { ticketToRideData as gameData } from '../../assets/ticket-to-ride-data';
import './gamePage.css';
import { PlayerCard } from './PlayerCard';
import { HandPanel } from './HandPanel';
import { GameBoard } from './GameBoard';

export function GamePage({ playerList, playerCount }) {
  const [gameState, setGameState] = useState('running');
  const [activePlayer, setActivePlayer] = useState(0);
  const [roster, setRoster] = useState([
    /*'black',
    'blue',
    'green',
    'orange',
    'pink',
    'red',
    'white',
    'yellow',*/
    'green',
    'white',
    'locomotive',
    'pink',
    'green',
  ]);
  const [deckPulled, setDeckPulled] = useState(false);

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
        className={`relative bg-ttr-${color} inline-flex flex-row justify-center content-center overflow-hidden rounded-md shadow-xl w-12 h-12 ml-1.5 lg:w-16 lg:h-20 lg:ml-2 xl:h-28 xl:w-22 2xl:h-36 2xl:w-28 3xl:h-40 3xl:w-32 3xl:p-2.5`}
      >
        {color === 'locomotive' ? locomotiveSVG : cartSVG}
      </button>
    );
  });

  const scoreBoard = playerList
    .map((player) => {
      return {
        id: player.id,
        name: player.name,
        color: player.color,
        score: player.score,
      };
    })
    .sort((p1, p2) => {
      return p2.score - p1.score;
    })
    .map((player) => {
      return (
        <div
          key={'player-' + player.id}
          className={`bg-player-${player.color} px-1 py-0 rounded-md text-2xs -ml-4 pl-3.5 w-9/12 flex justify-start content-center items-center lg:w-full lg:p-2 lg:text-xs xl:text-base 2xl:text-lg 3xl:text-2xl`}
        >
          <p className="inline-block truncate w-9/12 filter drop-shadow-md">
            {player.name}
          </p>
          <p className="inline-block truncate w-3/12 filter drop-shadow-md text-right">
            <span className="font-number">{player.score}</span>
          </p>
        </div>
      );
    });

  return (
    <div className="container h-screen font-regular z-10 pt-10 md:px-16 lg:pt-16 lg:pb-2 2xl:flex  2xl:items-center">
      <div
        className="container relative overflow-hidden h-full p-1.5 shadow-md bg-cover rounded-none lg:rounded-xl lg:p-3"
        id="board-backdrop"
      >
        <div className="container relative h-full grid grid-cols-8 grid-rows-5 lg:grid-cols-7">
          <div className="contents" id="map">
            <GameBoard gameData={gameData}></GameBoard>
          </div>
          <div className="contents" id="stat-cards">
            <div className="row-start-1 col-start-1">
              <PlayerCard player={playerList[1]}></PlayerCard>
            </div>
            <div className="row-start-2 col-start-1">
              <PlayerCard player={playerList[2]}></PlayerCard>
            </div>
            <div className="row-start-3 col-start-1">
              <PlayerCard player={playerList[3]}></PlayerCard>
            </div>
            <div className="row-start-4 col-start-1">
              <PlayerCard player={playerList[4]}></PlayerCard>
            </div>
          </div>
          <div className="contents" id="score-board">
            <div className="row-start-5 col-start-1 col-span-1 row-span-1 grid grid-rows-5 text-ttr-white filter drop-shadow-md p-0">
              {scoreBoard}
            </div>
          </div>
          <div className="contents" id="deck-and-roster">
            <div className="fixed w-full bottom-0 right-0 lg:relative lg:col-span-5">
              <div
                className={classNames(
                  'relative rounded-t-md bg-red-900 mx-auto w-108 h-16 flex flex-row items-center content-around justify-between transform transition-transform p-2 lg:pb-0 lg:transform-none lg:h-full lg:w-full lg:max-w-xl lg:bg-opacity-0 lg:items-end lg:px-4 xl:max-w-3xl 2xl:max-w-5xl 2xl:px-8 3xl:max-w-6xl 3xl:pb-3',
                  { 'translate-y-15': !deckPulled },
                )}
                onBlur={(e) => {
                  setDeckPulled(false);
                }}
              >
                <button
                  className="absolute -top-4 right-1/2 transform translate-x-1/2 h-4 w-16 bg-yellow-500 border-2 border-b-0 border-white rounded-t-md focus:outline-none lg:hidden"
                  onClick={() => setDeckPulled(!deckPulled)}
                />
                <button className="filter drop-shadow-md rounded-md bg-yellow-500 text-ttr-white w-12 h-12 p-1 lg:w-16 lg:h-20 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 lg:h-12 lg:w-12 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 3xl:h-28 3xl:w-28"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                  >
                    <path d="M13 19l-3-16c1-1 5-1 6 0l-3 16zM14 21a1 1 0 01-2 2a1 1 0 012-2z" />
                  </svg>
                </button>
                <button className="filter drop-shadow-md rounded-md bg-blue-500 text-ttr-white w-12 h-12 p-1 ml-6 mr-3 lg:w-16 lg:h-20 lg:ml-10 lg:mr-3 lg:p-2 xl:h-28 xl:w-22 xl:p-1 2xl:h-36 2xl:w-28 2xl:px-2 3xl:h-40 3xl:w-32 3xl:p-2.5">
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
              <HandPanel player={playerList[0]}></HandPanel>
            </div>
          </div>
        </div>
        {/* <div
          id="demoPanel"
          className="fixed right-1 bottom-0 rounded-t-sm bg-gray-700 text-ttr-white py-0.5 px-1.5"
        >
          <h1 className="text-sm">Demó panel</h1>
          <button>Kör kezdés</button>
        </div> */}
      </div>
    </div>
  );
}
