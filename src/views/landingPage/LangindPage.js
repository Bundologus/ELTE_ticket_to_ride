import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  createGame,
  dealStarterHand,
  fillRoster,
  startGame,
} from '../../state/game/actions';
import { setAppToGame, setAppToWait } from '../../state/app/actions';
import { selectPlayers } from '../../state/players/selector';
import { selectGame } from '../../state/game/selector';

export function LandingPage({ setLocalPlayerId }) {
  const [hostNameOk, setHostNameOk] = useState(true);
  const [playerNameOk, setPlayerNameOk] = useState(true);
  const [gameIdOk, setGameIdOk] = useState(true);

  const hostNameRef = useRef(null);
  const playerNameRef = useRef(null);
  const playerCountRef = useRef(null);
  const gameIdRef = useRef(null);

  const dispatch = useDispatch();

  // TODO remove these for phase 3
  const players = useSelector(selectPlayers);
  const game = useSelector(selectGame);

  if (game.gameId === '') {
    dispatch(createGame('', 5));
  }
  const getStarterHands = (playerCount) => {
    let arrayOfHands = [];
    let reverseDeck = [...game.trainCardDeck];
    reverseDeck.reverse();

    for (let i = 0; i < playerCount; ++i) {
      arrayOfHands.push({
        trainCards: reverseDeck.slice(4 * i, 4 * (i + 1)),
        longRouteCard: game.longRouteDeck[game.longRouteDeck.length - (i + 1)],
      });
    }

    return arrayOfHands;
  };

  // TODO end of TODO

  const createGameHandler = (e) => {
    e.preventDefault();

    if (hostNameRef.current.value !== '') {
      setLocalPlayerId(0);

      // TODO remove this for phase 3let arrayOfHands = [];

      const arrayOfStarterHands = getStarterHands(players.length);
      dispatch(dealStarterHand(arrayOfStarterHands));

      dispatch(fillRoster());
      dispatch(startGame(game.gameId));
      dispatch(setAppToGame());

      //TODO end of TODO
    }
  };

  const joinGameHandler = (e) => {
    e.preventDefault();
    // setAppState(WAITING_FOR_PLAYERS);
    // TODO join game action
    console.log('joining should happen');
  };

  return (
    <div className="container h-screen font-regular z-10 grid grid-cols-2 grid-rows-2 pt-10 md:px-16 lg:py-14">
      <div
        className="row-span-2 col-start-1 m-4 flex flex-col justify-center lg:row-span-1 lg:col-span-2 lg:self-end lg:pb-4 xl:pb-12 2xl:pb-24"
        id="wellcomeText"
      >
        <h1 className="mx-auto flex flex-col rounded-xl border-2 border-yellow-400 border-opacity-100 bg-yellow-200 bg-opacity-80 p-3 lg:slef-end lg:p-6 lg:bg-opacity-0 lg:border-0 xl:w-80">
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
        className="m-2 mb-1 self-end lg:self-auto lg:-mt-4 xl:mr-2 xl:w-4/5 xl:justify-self-end 2xl:w-2/3"
        id="newGameForm"
      >
        <form
          onSubmit={(e) => createGameHandler(e)}
          onChange={() => {
            setHostNameOk(
              hostNameRef !== null && hostNameRef.current.value !== '',
            );
          }}
          className="relative rounded-xl border-2 border-green-500 bg-green-200 bg-opacity-80 text-green-900 w-full h-auto self-end p-3 md:py-2 lg:p-6 lg:py-4"
        >
          <h2 className="font-smallCaps text-xl mb-2.5 lg:text-2xl lg:mb-3">
            New Game
          </h2>
          <label>
            <div className="invisible absolute lg:relative lg:visible">
              Your name:
            </div>
            <input
              type="text"
              className={classNames({
                'w-full rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 placeholder-green-400  mb-2 text-sm lg:placeholder-transparent lg:text-base lg:mb-3': true,
                'border-red-600 border-2 border-opacity-100 placeholder-red-400 focus:border-red-600 focus:ring-red-600': !hostNameOk,
              })}
              placeholder="Your name"
              required
              ref={hostNameRef}
            ></input>
          </label>
          <label className="ml-0.5 text-sm lg:text-base lg:block lg:mb-12">
            Player count:
            <select
              className="rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 font-number ml-4 text-sm lg:text-base"
              ref={playerCountRef}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md border-2 border-gray-600 bg-green-600 hover:bg-green-500 text-white font-bold p-1 px-5 text-lg h-9 absolute right-3 top-2 md:top-1 lg:top-auto lg:bottom-4 lg:right-5 lg:w-32 xl:mt-8"
          >
            Start!
          </button>
        </form>
      </div>
      <div
        className="m-2 mt-1 lg:-mt-4 xl:ml-2 xl:w-4/5 xl:justify-self-start 2xl:w-2/3"
        id="joinGameForm"
      >
        <form
          onSubmit={(e) => joinGameHandler(e)}
          onChange={() => {
            setPlayerNameOk(
              playerNameRef !== null && playerNameRef.current.value !== '',
            );
            setGameIdOk(gameIdRef !== null && gameIdRef.current.value !== '');
          }}
          className="relative rounded-xl border-2 border-blue-500 bg-blue-200 bg-opacity-80 text-blue-900 w-full h-auto p-3 md:py-2 lg:p-6 lg:py-4"
        >
          <h2 className="ont-smallCaps text-xl mb-2.5 lg:text-2xl lg:mb-3">
            Join Game
          </h2>
          <label>
            <div className="invisible absolute lg:relative lg:visible">
              Your name:
            </div>
            <input
              type="text"
              className={classNames(
                'w-full rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 placeholder-blue-400 mb-2 text-sm lg:placeholder-transparent lg:text-base lg:mb-3',
                {
                  'border-red-600 border-2 border-opacity-100 placeholder-red-400 focus:border-red-600 focus:ring-red-600': !playerNameOk,
                },
              )}
              placeholder="Your name"
              required
              ref={playerNameRef}
            ></input>
          </label>
          <label className="lg:flex lg:justify-between lg:justify-items-stretch lg:items-center lg:mb-12">
            <div className="invisible absolute inline lg:whitespace-nowrap lg:relative lg:visible">
              Game ID:
            </div>
            <input
              type="text"
              className={classNames(
                'w-full rounded-md border-1 border-opacity-50 border-gray-500 bg-white bg-opacity-80 placeholder-blue-400 text-sm lg:placeholder-transparent lg:text-base lg:ml-3',
                {
                  'border-red-600 border-2 border-opacity-100 focus:border-red-600 placeholder-red-400 focus:ring-red-600': !gameIdOk,
                },
              )}
              placeholder="Game ID"
              required
              ref={gameIdRef}
            ></input>
          </label>
          <button
            type="submit"
            className="rounded-md border-2 border-gray-600 bg-blue-600 hover:bg-blue-500 text-white font-bold p-1 px-5 text-lg h-9 absolute right-3 top-2 md:top-1 lg:top-auto lg:bottom-4 lg:right-5 lg:w-32 xl:mt-8"
          >
            Join!
          </button>
        </form>
      </div>
    </div>
  );
}
