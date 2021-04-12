import { useState } from 'react';
import { ticketToRideData as gameData } from '../../assets/ticket-to-ride-data';
import './gamePage.css';
import { PlayerCard } from './PlayerCard';
import { HandCard } from './HandCard';

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

  const cartSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-24 absolute top-1/3 left-5 transform -rotate-45 -translate-y-1"
      viewBox="0 0 50 30"
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
      className="h-16 w-24 absolute top-1/4 left-3.5 transform -rotate-45 -translate-y-0.5"
      viewBox="0 0 40 25"
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
        className={`relative bg-ttr-${color} rounded-md w-28 h-32 ml-5 shadow-xl`}
      >
        {color === 'locomotive' ? locomotiveSVG : cartSVG}
      </button>
    );
  });

  const scoreBoard = playerList
    .map((player) => {
      return { name: player.name, color: player.color, score: player.score };
    })
    .sort((p1, p2) => {
      return p2.score - p1.score;
    })
    .map((player) => {
      return (
        <div
          key={player.id}
          className={`bg-player-${player.color} p-2 rounded-md`}
        >
          <p className="inline-block truncate w-4/5 filter drop-shadow-md">
            {player.name}
          </p>
          <p className="inline-block truncate w-1/5 filter drop-shadow-md">
            {' '}
            - <span className="font-number">{player.score}</span>
          </p>
        </div>
      );
    });

  const nextPlayer = () => {
    if (activePlayer === playerCount - 1) setActivePlayer(0);
    else setActivePlayer(activePlayer + 1);
  };

  /*   const cityMarkers = gameData.cities.map((city) => {
    const style = { top: city.y + '%', left: city.x + '%' };
    return (
      <div
        className="absolute rounded-full bg-purple-700 w-10 h-10"
        style={style}
        alt={city.city}
      ></div>
    );
  }); */

  return (
    <div className="container h-screen font-regular z-10 pt-10 pb-3 md:pt-14 md:px-16 lg:py-14">
      <div
        className="container h-full p-4 pt-2 rounded-2xl shadow-md bg-cover"
        id="board-backdrop"
      >
        <div className="container h-full grid grid-cols-8 grid-rows-5">
          <div className="contents" id="stat-cards">
            <div className="row-start-1 col-start-1">
              <PlayerCard player={playerList[1]} cartSVG={cartSVG}></PlayerCard>
            </div>
            <div className="row-start-2 col-start-1">
              <PlayerCard player={playerList[2]} cartSVG={cartSVG}></PlayerCard>
            </div>
            <div className="row-start-3 col-start-1">
              <PlayerCard player={playerList[3]} cartSVG={cartSVG}></PlayerCard>
            </div>
            <div className="row-start-4 col-start-1">
              <PlayerCard player={playerList[4]} cartSVG={cartSVG}></PlayerCard>
            </div>
          </div>
          <div className="contents" id="score-board">
            <div className="row-start-5 col-start-1 grid grid-rows-5 p-2 pl-0 pr-3 text-ttr-white filter drop-shadow-md">
              {scoreBoard}
            </div>
          </div>
          <div className="contents" id="map">
            <img
              className="board col-span-6 row-span-4 flex content-center justify-center items-center p-2 rounded-md"
              src="/assets/map.jpg"
              alt="map"
            ></img>
          </div>
          <div className="contents" id="deck-and-roster">
            <div className="col-span-6 p-2">
              <div className="rounded-lg flex flex-row items-center content-around p-6">
                <button className=" ml-3 filter drop-shadow-md w-28 h-32 rounded-md bg-yellow-500 p-2 py-4 text-ttr-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                  >
                    <path d="M13 19l-3-16c1-1 5-1 6 0l-3 16zM14 21a1 1 0 01-2 2a1 1 0 012-2z" />
                  </svg>
                </button>
                <button className=" ml-24 mr-12 filter drop-shadow-md w-28 h-32 rounded-md bg-blue-500 p-2 py-3.5 text-ttr-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                  >
                    <path d="M3 21l11.43-11.43-.71-.7 1.42-1.43-2.14-2.18c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71v-2.88l-1.47 1.42-.71-.71-11.43 11.43-2.13-2.13z" />
                  </svg>
                </button>
                {rosterCards}
              </div>
            </div>
          </div>
          <div className="contents" id="player-hand">
            <div className="col-start-8 row-start-1 row-span-5 text-ttr-white rounded-lg my-3 ml-3 border-8 border-b-0 border-player-green bg-player-green">
              <HandCard player={playerList[0]}></HandCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
