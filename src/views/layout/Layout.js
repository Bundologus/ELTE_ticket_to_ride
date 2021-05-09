import { useState } from 'react';
import { LandingPage } from '../landingPage/LangindPage';
import { WaitingRoomPage } from '../waitingRoomPage/WaitingRoomPage';
import { GamePage } from '../gamePage/GamePage';
import { NavPanel } from './NavPanel';
import {
  IN_GAME,
  MAIN_PAGE,
  WAITING_FOR_PLAYERS,
} from '../../constants/appConstants';

export function Layout() {
  const [appState, setAppState] = useState(MAIN_PAGE);
  const [localPlayerId, setLocalPlayerId] = useState(0);
  /* const [appState, setAppState] = useState(WAITING_FOR_PLAYERS); */
  /* const [appState, setAppState] = useState(IN_GAME); */
  /* const [playerName, setPlayerName] = useState(''); */
  /* const [maxPlayers, setPlayerCount] = useState('3');
  const [gameID, setGameID] = useState(''); */
  /* const [playerList, setPlayerList] = useState(testPlayers.slice(1, 5)); */
  /* const [localPlayer, setLocalPlayer] = useState(testPlayers[0]); */

  let content = (
    <LandingPage
      setAppState={setAppState}
      setLocalPlayerId={setLocalPlayerId}
    ></LandingPage>
  );
  if (appState === WAITING_FOR_PLAYERS) {
    content = (
      <WaitingRoomPage
        setAppState={setAppState}
        localPlayerId={localPlayerId}
        setLocalPlayerId={setLocalPlayerId}
      ></WaitingRoomPage>
    );
  } else if (appState === IN_GAME) {
    content = <GamePage localPlayerId={localPlayerId}></GamePage>;
  }

  return (
    <>
      <NavPanel setAppState={setAppState}></NavPanel>
      {content}
    </>
  );
}
