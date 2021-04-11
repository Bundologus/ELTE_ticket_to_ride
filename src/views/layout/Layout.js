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
      name: 'No silly, cows go MOO!',
      color: 'green',
    },
    {
      name: 'Knock, knock!',
      color: 'blue',
    },
    {
      name: "Who's there?",
      color: 'yellow',
    },
    {
      name: 'Cows go.',
      color: 'red',
    },
    {
      name: 'Cows go who?',
      color: 'black',
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
