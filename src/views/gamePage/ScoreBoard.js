import { useSelector } from 'react-redux';
import { selectPlayersWithScore } from '../../state/players/selector';
import { PlayerCard } from './PlayerCard';

export function ScoreBoard() {
  const playerList = useSelector(selectPlayersWithScore).map((player) => {
    return {
      id: player.id,
      name: player.name,
      color: player.color,
      score: player.score,
      carts: player.carts,
      trainCardCount: player.trainCardCount,
      routeCardCount: player.routeCardCount,
    };
  });

  /* playerList.push({
    id: localPlayer.id,
    name: localPlayer.name,
    color: localPlayer.color,
    score: localPlayer.score,
  }); */

  /* const scoreBoard = playerList
    .sort((p1, p2) => {
      return p2.score - p1.score;
    })
    .map((player) => {
      return (
        <div
          key={'player-' + player.id}
          className={`bg-player-${player.color} px-1 py-0 rounded-md text-2xs -ml-4 pl-3.5 w-9/12 flex justify-start content-center items-center lg:w-full lg:p-2 lg:text-xs xl:text-base 2xl:text-lg 3xl:text-2xl`}
        >
          <p className="inline-block truncate w-9/12 filter drop-shadow-md">
            {player.name}
          </p>
          <p className="inline-block truncate w-3/12 filter drop-shadow-md text-right">
            <span className="font-number">{player.score}</span>
          </p>
        </div>
      );
    }); */

  const scoreBoard = playerList
    .sort((p1, p2) => {
      return p2.score - p1.score;
    })
    .map((player) => {
      return <PlayerCard player={player}></PlayerCard>;
    });

  return <>{scoreBoard}</>;
}
