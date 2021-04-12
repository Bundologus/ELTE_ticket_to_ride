import { useState } from 'react';
import { LandingPage } from '../landingPage/LangindPage';
import { WaitingRoomPage } from '../waitingRoomPage/WaitingRoomPage';
import { GamePage } from '../gamePage/GamePage';
import { NavPanel } from './NavPanel';

export function Layout() {
  // TODO could use object format. Look at lecture slides. Possibly okay until migration to Redux
  /* const [appState, setAppState] = useState('MAIN_PAGE'); */
  const [appState, setAppState] = useState('IN_GAME');
  const [playerName, setPlayerName] = useState('');
  const [playerCount, setPlayerCount] = useState('3');
  const [gameID, setGameID] = useState('');
  const [playerList, setPlayerList] = useState([
    {
      id: 0,
      name: 'No silly, trains go CHOO!',
      color: 'green',
      score: 10,
      carts: 45,
      trainCardCount: 5,
      trainCards: {
        black: 1,
        blue: 0,
        green: 0,
        orange: 1,
        pink: 0,
        red: 0,
        white: 3,
        yellow: 0,
        locomotive: 1,
      },
      routeCardCount: 3,
      routeCards: [
        {
          id: '1',
          from: '3',
          to: '2',
          fromCity: 'Athina',
          toCity: 'Angora',
          value: '5',
        },
        {
          id: '26',
          from: '21',
          to: '39',
          fromCity: 'Kyiv',
          toCity: 'Sochi',
          value: '8',
        },
        {
          id: '27',
          from: '24',
          to: '47',
          fromCity: 'Madrid',
          toCity: 'Zurich',
          value: '8',
        },
        {
          id: '42',
          from: '6',
          to: '31',
          fromCity: 'Brest',
          toCity: 'Petrograd',
          value: '20',
        },
      ],
    },
    {
      id: 1,
      name: 'Knock, knock!',
      color: 'blue',
      score: 50,
      carts: 45,
      trainCardCount: 4,
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
      routeCardCount: 2,
      routeCards: [{}],
    },
    {
      id: 2,
      name: "Who's there?",
      color: 'yellow',
      score: 40,
      carts: 45,
      trainCardCount: 7,
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
      routeCardCount: 4,
      routeCards: [{}],
    },
    {
      id: 3,
      name: 'Trains go.',
      color: 'red',
      score: 30,
      carts: 45,
      trainCardCount: 4,
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
      routeCardCount: 5,
      routeCards: [{}],
    },
    {
      id: 4,
      name: 'Trains go who?',
      color: 'black',
      score: 20,
      carts: 45,
      trainCardCount: 4,
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
      routeCardCount: 3,
      routeCards: [{}],
    },
  ]);

  let content = (
    <LandingPage
      playerName={playerName}
      setPlayerName={setPlayerName}
      playerCount={playerCount}
      setPlayerCount={setPlayerCount}
      gameID={gameID}
      setGameID={setGameID}
      setAppState={setAppState}
    ></LandingPage>
  );
  if (appState === 'WAITING_FOR_PLAYERS') {
    content = (
      <WaitingRoomPage
        gameID={gameID}
        setGameID={setGameID}
        setAppState={setAppState}
        playerName={playerName}
      ></WaitingRoomPage>
    );
  } else if (appState === 'IN_GAME') {
    content = (
      <GamePage playerList={playerList} playerCount={playerCount}></GamePage>
    );
  }

  return (
    <>
      <NavPanel appState={appState} setAppState={setAppState}></NavPanel>
      {content}
    </>
  );
}
