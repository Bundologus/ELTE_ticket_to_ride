import { useState } from 'react';
import { ticketToRideData as gameData } from '../../assets/ticket-to-ride-data';
import './gamePage.css';

export function GamePage({ playerList, playerCount }) {
  const [gameState, setGameState] = useState('running');
  const [activePlayer, setActivePlayer] = useState(0);

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
    <div className="container pt-20 pb-5 h-screen font-regular z-10">
      <div className="container h-full grid grid-cols-8 grid-rows-5">
        <div className="row-start-1 col-start-1">
          <div
            className={`m-2 p-2 rounded-lg border-gray-600 border-2 bg-player-${playerList[1].color}`}
          >
            <h2 className="font-smallCaps text-xl font-semibold mb-3">
              {playerList[1].name}
            </h2>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                viewBox="0 0 40 25"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 45</p>
            </div>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 ml-3"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 2</p>
            </div>
          </div>
        </div>
        <div className="row-start-2 col-start-1">
          <div
            className={`m-2 p-2 rounded-lg border-gray-600 border-2 bg-player-${playerList[2].color}`}
          >
            <h2 className="font-smallCaps text-xl font-semibold mb-3">
              {playerList[2].name}
            </h2>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                viewBox="0 0 40 25"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 45</p>
            </div>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 ml-3"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 2</p>
            </div>
          </div>
        </div>
        <div className="row-start-3 col-start-1">
          <div
            className={`m-2 p-2 rounded-lg border-gray-600 border-2 bg-player-${playerList[3].color}`}
          >
            <h2 className="font-smallCaps text-xl font-semibold mb-3">
              {playerList[3].name}
            </h2>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                viewBox="0 0 40 25"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 45</p>
            </div>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 ml-3"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 2</p>
            </div>
          </div>
        </div>
        <div className="row-start-4 col-start-1">
          <div
            className={`m-2 p-2 rounded-lg border-gray-600 border-2 bg-player-${playerList[4].color}`}
          >
            <h2 className="font-smallCaps text-xl font-semibold mb-3">
              {playerList[4].name}
            </h2>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                viewBox="0 0 40 25"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 45</p>
            </div>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 ml-3"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
              <p className="block ml-3 -mt-0.5">x 2</p>
            </div>
          </div>
        </div>
        <div className=" col-span-6 row-span-4 flex content-center justify-center items-center">
          <img
            className="object-contain object-center"
            src="/assets/map.jpg"
            alt="map"
          ></img>
        </div>
        <div className="col-start-8 row-start-1 row-span-2 text-white">
          Hand
        </div>
        <div className="row-start-5 col-start-1 grid grid-rows-5 p-2">
          <div className={`bg-player-${playerList[1].color} p-2 rounded-md`}>
            {playerList[1].name} - 50
          </div>
          <div className={`bg-player-${playerList[2].color} p-2 rounded-md`}>
            {playerList[2].name} - 40
          </div>
          <div className={`bg-player-${playerList[3].color} p-2 rounded-md`}>
            {playerList[3].name} - 30
          </div>
          <div className={`bg-player-${playerList[4].color} p-2 rounded-md`}>
            {playerList[4].name} - 20
          </div>
          <div className={`bg-player-${playerList[0].color} p-2 rounded-md`}>
            {playerList[0].name} - 10
          </div>
        </div>
        <div className="col-span-6 p-2">
          <div className="bg-gray-600 rounded-lg flex flex-row items-center content-around p-6">
            <div className="text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 ml-3"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M17 23 14 7c1-1 5-1 6 0l-3 16zM18 25A1 1 0 0116 27A1 1 0 0118 25zM4 2A2 2 0 002 4V31A2 2 0 004 33h26A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
            </div>
            <div className="text-blue-400 ml-24 mr-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M7 24.63 18.43 13.2l-.71-.7 1.42-1.43L17 8.89c1.2-1.19 3.09-1.19 4.27 0l3.6 3.61-1.42 1.41h2.84l.71.71-3.55 3.59-.71-.71V14.62l-1.47 1.42-.71-.71L9.13 26.76 7 24.63zM4 2A2 2 0 002 4V31A2 2 0 004 33H30A2 2 0 0032 31V4A2 2 0 0030 2Z" />
              </svg>
            </div>
            <div className="relative text-gray-600 bg-ttr-green rounded-md h-28 w-28">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-24 absolute top-1/3 left-2.5 transform -rotate-45"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
            </div>
            <div className="relative text-gray-600 bg-ttr-yellow rounded-md h-28 w-28 ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-24 absolute top-1/3 left-2.5 transform -rotate-45"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
            </div>
            <div className="relative text-gray-600 bg-ttr-purple rounded-md h-28 w-28 ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-24 absolute top-1/3 left-2.5 transform -rotate-45"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
            </div>
            <div className="relative text-gray-600 bg-ttr-rainbow-grad rounded-md h-28 w-28 ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-24 absolute top-1/3 left-2.5 transform -rotate-45"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
            </div>
            <div className="relative text-gray-600 bg-ttr-green rounded-md h-28 w-28 ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-24 absolute top-1/3 left-2.5 transform -rotate-45"
                viewBox="0 0 35 35"
                fill="currentColor"
              >
                <path d="M 8 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 13.9 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 32 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z M 38 16.5 a 1.5 1.5 0 1 1 -3 0 a 1.5 1.5 0 0 1 3 0 z" />
                <path d="M 5 4 a 1 1.3 0 0 0 -1 1 L 2 15 a 1 1 0 0 0 1 1 h 1.05 a 2.5 2.5 0 0 1 4.9 0 h 1 a 2.5 2.5 0 0 1 4.9 0 H 28 a 2.5 2.5 0 0 1 4.9 0 h 1.1 a 2.5 2.5 0 0 1 4.9 0 H 40 a 1 1 0 0 0 1 -1 L 39 5 a 1 1.3 0 0 0 -1 -1 H 5 z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-start-8 row-start-3 row-span-3 text-white">
          objectives
        </div>
      </div>
    </div>
  );
}
