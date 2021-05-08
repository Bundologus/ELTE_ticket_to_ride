import { useState } from 'react';
import { LandingPage } from '../landingPage/LangindPage';
import { WaitingRoomPage } from '../waitingRoomPage/WaitingRoomPage';
import { GamePage } from '../gamePage/GamePage';
import { NavPanel } from './NavPanel';
import { testPlayers } from '../../domain/playerType';
import {
  IN_GAME,
  MAIN_PAGE,
  WAITING_FOR_PLAYERS,
} from '../../constants/appConstants';

export function Layout() {
  const [appState, setAppState] = useState(MAIN_PAGE);
  /* const [appState, setAppState] = useState(WAITING_FOR_PLAYERS); */
  /* const [appState, setAppState] = useState(IN_GAME); */
  const [playerName, setPlayerName] = useState('');
  /* const [playerName, setPlayerName] = useState('Bundologus'); */
  const [playerCount, setPlayerCount] = useState('3');
  const [gameID, setGameID] = useState('');
  const [playerList, setPlayerList] = useState(testPlayers.slice(1, 5));
  const [localPlayer, setLocalPlayer] = useState(testPlayers[0]);

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
  if (appState === WAITING_FOR_PLAYERS) {
    content = (
      <WaitingRoomPage
        gameID={gameID}
        setGameID={setGameID}
        setAppState={setAppState}
        playerName={playerName}
      ></WaitingRoomPage>
    );
  } else if (appState === IN_GAME) {
    content = (
      <GamePage
        opponentList={playerList}
        localPlayer={localPlayer}
        setLocalPlayer={setLocalPlayer}
        playerCount={playerCount}
      ></GamePage>
    );
  }

  return (
    <>
      <NavPanel setAppState={setAppState}></NavPanel>
      {content}
    </>
  );
}
