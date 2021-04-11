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
    <div className="container px-16 h-screen font-regular z-10">
      <div className="container h-1/3 md:h-1/2 pb-24">
        <h1 className="w-80 mx-auto h-full flex flex-col justify-end content-end">
          <span className="block w-full font-regular text-lg">Welcome to</span>
          <br />
          <span className="block w-full text-center font-smallCaps text-5xl">
            Ticket to Ride
          </span>
          <br />
          <span className="block w-full font-smallCaps text-3xl text-right">
            Europe
          </span>
        </h1>
      </div>
      <div className="container md:px-60">
        <div className="w-full px-0 h-1/3 md:pr-2 md:w-1/2 md:inline-block flow-root">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-xl border-2 border-green-500 bg-green-200 bg-opacity-80 w-full h-full p-6 py-4 text-green-900"
          >
            <h2 className="font-smallCaps text-2xl mb-3 ">New Game</h2>
            <div>
              <label>
                Your name:
                <input
                  type="text"
                  className={classNames(
                    'w-full mb-3 rounded-md border-1 border-opacity-50 border-gray-500  bg-white bg-opacity-80',
                    {
                      'border-red-600 border-2 border-opacity-100 focus:border-red-600 focus:ring-red-600': !hostNameOk,
                    },
                  )}
                  value={hostName}
                  onChange={(e) => {
                    setHostName(e.target.value);
                    setPlayerName(e.target.value);
                    setHostNameOk(true);
                  }}
                  required
                ></input>
              </label>
            </div>
            <div>
              <label>
                Player count:
                <select
                  className="rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 ml-4"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="block rounded-md border-2 border-gray-600 mt-8 bg-green-600 hover:bg-green-500 mx-auto p-1 px-5 w-32 text-white font-bold text-xl"
              onClick={() => hostSubmitHandler()}
            >
              Start!
            </button>
          </form>
        </div>
        <div className="w-full px-0 h-1/3 md:pl-2 md:w-1/2 md:inline-block flow-root">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-xl border-2 border-blue-500 bg-blue-200 bg-opacity-80 w-full h-full p-6 py-4 text-blue-900"
          >
            <h2 className="font-smallCaps text-2xl mb-3">Join Game</h2>
            <div>
              <label>
                Your name:
                <input
                  type="text"
                  className={classNames(
                    'w-full mb-3 rounded-md border-1 border-opacity-50 border-gray-500  bg-white bg-opacity-80',
                    {
                      'border-red-600 border-2 border-opacity-100 focus:border-red-600 focus:ring-red-600': !guestNameOk,
                    },
                  )}
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setPlayerName(e.target.value);
                    setGuestNameOk(true);
                  }}
                  required
                ></input>
              </label>
            </div>
            <div>
              <label>
                Game ID:
                <input
                  type="text"
                  className={classNames(
                    'rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 ml-3',
                    {
                      'border-red-600 border-2 border-opacity-100 focus:border-red-600 focus:ring-red-600': !gameIdOk,
                    },
                  )}
                  value={gameID}
                  onChange={(e) => {
                    setGameID(e.target.value);
                    setGameIdOk(true);
                  }}
                  required
                ></input>
              </label>
            </div>
            <button
              type="submit"
              className="block rounded-md border-2 border-gray-600 bg-blue-600 hover:bg-blue-500 mt-8 mx-auto p-1 px-5 w-32 text-white font-bold text-xl"
              onClick={() => guestSubmitHandler()}
            >
              Join!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
