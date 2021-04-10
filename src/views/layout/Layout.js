import { useState } from 'react';
import { LandingPage } from '../landingPage/LangindPage';
import { WaitingRoomPage } from '../waitingRoomPage/WaitingRoomPage';
import { GamePage } from '../gamePage/GamePage';

export function Layout() {
  // TODO could use object format. Look at lecture slides. Possibly okay until migration to Redux
  const [gameState, setGameState] = useState('MAIN_PAGE');
  const [playerName, setPlayerName] = useState('');
  const [playerCount, setPlayerCount] = useState('3');
  const [gameID, setGameID] = useState('');

  let content = (
    <LandingPage
      playerName={playerName}
      setPlayerName={setPlayerName}
      playerCount={playerCount}
      setPlayerCount={setPlayerCount}
      gameID={gameID}
      setGameID={setGameID}
      setGameState={setGameState}
    ></LandingPage>
  );
  if (gameState === 'WAITING_FOR_PLAYERS') {
    content = <WaitingRoomPage></WaitingRoomPage>;
  } else if (gameState === 'IN_GAME') {
    content = <GamePage></GamePage>;
  }

  return (
    <div className="container p-16 h-screen font-regular z-10">{content}</div>
  );
}
