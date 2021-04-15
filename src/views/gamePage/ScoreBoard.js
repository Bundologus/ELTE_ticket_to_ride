import { PlayerListType, PlayerType } from '../../domain/playerType';

export function ScoreBoard({ opponentList, localPlayer }) {
  let playerList = opponentList.map((player) => {
    return {
      id: player.id,
      name: player.name,
      color: player.color,
      score: player.score,
    };
  });

  playerList.push({
    id: localPlayer.id,
    name: localPlayer.name,
    color: localPlayer.color,
    score: localPlayer.score,
  });

  const board = playerList
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
    });

  return <>{board}</>;
}

ScoreBoard.propTypes = {
  opponentList: PlayerListType,
  localPlayer: PlayerType,
};
