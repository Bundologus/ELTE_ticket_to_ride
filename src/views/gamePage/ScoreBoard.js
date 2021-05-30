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

  const scoreBoard = playerList
    .sort((p1, p2) => {
      return p2.score - p1.score;
    })
    .map((player) => {
      return (
        <PlayerCard
          key={'playerCard-' + player.id}
          player={player}
        ></PlayerCard>
      );
    });

  return <>{scoreBoard}</>;
}
