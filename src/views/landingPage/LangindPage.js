import { useState } from 'react';
import classNames from 'classnames';

export function LandingPage({
  playerName,
  setPlayerName,
  playerCount,
  setPlayerCount,
  gameID,
  setGameID,
  setAppState,
}) {
  const [hostName, setHostName] = useState('');
  const [hostNameOk, setHostNameOk] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [guestNameOk, setGuestNameOk] = useState(true);
  const [gameIdOk, setGameIdOk] = useState(true);

  setGameID('');

  const hostSubmitHandler = () => {
    if (!hostName) setHostNameOk(false);
    else setAppState('WAITING_FOR_PLAYERS');
  };

  const guestSubmitHandler = () => {
    if (!guestName) setGuestNameOk(false);
    if (!gameID) setGameIdOk(false);

    console.log(
      `guestName: ${guestName} - ${guestNameOk} \ngameID: ${gameID} - ${gameIdOk}`,
    );

    if (gameID && guestName) setAppState('WAITING_FOR_PLAYERS');
  };

  return (
    <div className="container h-screen font-regular z-10 grid grid-cols-2 grid-rows-2 pt-10 md:px-16">
      <div
        className="row-span-2 col-start-1 m-4 flex flex-col justify-center lg:pb-24"
        id="wellcomeText"
      >
        <h1 className="mx-auto flex flex-col rounded-xl border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80 p-3 lg:h-full lg:justify-end lg:content-end lg:w-80">
          <span className="block font-regular text-lg">Welcome to</span>
          <span className="block text-center font-smallCaps text-5xl">
            Ticket to Ride
          </span>
          <span className="block font-smallCaps text-3xl text-right">
            Europe
          </span>
        </h1>
      </div>
      <div
        className="m-2 mb-1 md:px-0 md:h-1/3 lg:w-full md:pr-2 md:w-1/2 md:inline-block"
        id="newGameForm"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative rounded-xl border-2 border-green-500 bg-green-200 bg-opacity-80 text-green-900 w-full h-full p-3 lg:p-6 lg:py-4"
        >
          <h2 className="font-smallCaps text-xl mb-2.5 lg:text-2xl lg:mb-3">
            New Game
          </h2>
          <label>
            <div className="invisible absolute md:relative md:visible">
              Your name:
            </div>
            <input
              type="text"
              className={classNames(
                'w-full rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 placeholder-green-500 md:placeholder-transparent mb-2 text-sm md:text-base md:mb-3',
                {
                  'border-red-600 border-2 border-opacity-100 placeholder-red-500 focus:border-red-600 focus:ring-red-600': !hostNameOk,
                },
              )}
              value={hostName}
              onChange={(e) => {
                setHostName(e.target.value);
                setPlayerName(e.target.value);
                setHostNameOk(true);
              }}
              placeholder="Your name"
              required
            ></input>
          </label>
          <label className="ml-0.5 text-sm md:text-base">
            Player count:
            <select
              className="rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 text-sm md:text-base font-number ml-4"
              value={playerCount}
              onChange={(e) => setPlayerCount(e.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md border-2 border-gray-600 bg-green-600 hover:bg-green-500 text-white font-bold p-1 px-5 text-lg h-9 absolute top-2 right-3 md:mt-8 md:w-32 md:mx-auto md:relative"
            onClick={() => hostSubmitHandler()}
          >
            Start!
          </button>
        </form>
      </div>
      <div
        className="m-2 mt-1 md:px-0 md:h-1/3 lg:w-full md:pr-2 md:w-1/2 md:inline-block"
        id="joinGameForm"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative rounded-xl border-2 border-blue-500 bg-blue-200 bg-opacity-80 text-blue-900 w-full h-full p-3 lg:p-6 lg:py-4"
        >
          <h2 className="ont-smallCaps text-xl mb-2.5 lg:text-2xl lg:mb-3">
            Join Game
          </h2>
          <label>
            <div className="invisible absolute md:relative md:visible">
              Your name:
            </div>
            <input
              type="text"
              className={classNames(
                'w-full rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 placeholder-blue-500 md:placeholder-transparent mb-2 text-sm md:text-base md:mb-3',
                {
                  'border-red-600 border-2 border-opacity-100 placeholder-red-500 focus:border-red-600 focus:ring-red-600': !guestNameOk,
                },
              )}
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setPlayerName(e.target.value);
                setGuestNameOk(true);
              }}
              placeholder="Your name"
              required
            ></input>
          </label>
          <label>
            <div className="invisible absolute md:relative md:visible">
              Game ID:
            </div>
            <input
              type="text"
              className={classNames(
                'rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 w-full placeholder-blue-500 text-sm md:text-base md:placeholder-transparent md:w-auto md:ml-3',
                {
                  'border-red-600 border-2 border-opacity-100 focus:border-red-600 focus:ring-red-600': !gameIdOk,
                },
              )}
              value={gameID}
              onChange={(e) => {
                setGameID(e.target.value);
                setGameIdOk(true);
              }}
              placeholder="Game ID"
              required
            ></input>
          </label>
          <button
            type="submit"
            className="rounded-md border-2 border-gray-600 bg-blue-600 hover:bg-blue-500 text-white font-bold p-1 px-5 text-lg h-9 absolute top-2 right-3 md:mt-8 md:w-32 md:mx-auto md:relative"
            onClick={() => guestSubmitHandler()}
          >
            Join!
          </button>
        </form>
      </div>
    </div>
  );
}
