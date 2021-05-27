import { useState } from 'react';
import { LandingPage } from '../landingPage/LangindPage';
import { WaitingRoomPage } from '../waitingRoomPage/WaitingRoomPage';
import { GamePage } from '../gamePage/GamePage';
import { NavPanel } from './NavPanel';
import { IN_GAME, WAITING_FOR_PLAYERS } from '../../constants/appConstants';
import { useSelector } from 'react-redux';
import { selectApp } from '../../state/app/selector';

export function Layout() {
  const [localPlayerId, setLocalPlayerId] = useState(-1);
  const [gameId, setGameId] = useState('');

  /* const [appState, setAppState] = useState(MAIN_PAGE); */
  /* const [appState, setAppState] = useState(WAITING_FOR_PLAYERS); */
  /* const [appState, setAppState] = useState(IN_GAME); */
  /* const [playerName, setPlayerName] = useState(''); */
  /* const [maxPlayers, setPlayerCount] = useState('3');
  const [gameID, setGameID] = useState(''); */
  /* const [playerList, setPlayerList] = useState(testPlayers.slice(1, 5)); */

  const appState = useSelector(selectApp);

  let content = (
    <LandingPage
      setLocalPlayerId={setLocalPlayerId}
      setGameId={setGameId}
    ></LandingPage>
  );
  if (appState.state === WAITING_FOR_PLAYERS) {
    content = (
      <WaitingRoomPage
        localPlayerId={localPlayerId}
        setLocalPlayerId={setLocalPlayerId}
        gameId={gameId}
        setGameId={setGameId}
      ></WaitingRoomPage>
    );
  } else if (appState.state === IN_GAME) {
    content = <GamePage localPlayerId={localPlayerId}></GamePage>;
  }

  return (
    <>
      <NavPanel></NavPanel>
      {content}
    </>
  );
}
