import { selectGame } from '../game/selector';

export function selectPlayers(state) {
  return state.players;
}

export function selectActivePlayer(state) {
  const players = selectPlayers(state);
  const game = selectGame(state);

  return players[game.activePlayerId];
}

export function selectPlayersWithScore(state) {
  const players = selectPlayers(state);
  const longestChainLength = players.reduce((currentLongestChain, player) => {
    if (player.longestChain > currentLongestChain) return player.longestChain;
    else return currentLongestChain;
  }, 0);

  return players.map((player) => {
    let score = 0;

    score += player.builtConnections.reduce((sum, connection) => {
      switch (connection.elements.length) {
        case 1:
          return sum + 1;
        case 2:
          return sum + 2;
        case 3:
          return sum + 4;
        case 4:
          return sum + 7;
        case 6:
          return sum + 15;
        case 8:
          return sum + 21;
        default:
          console.error(
            `Error while calculating connection length score.\nConnection:\n${connection}\nCalculated length: ${connection.elements.length}`,
          );
          return sum;
      }
    }, 0);

    score += player.routeCards.reduce((sum, routeCard) => {
      if (routeCard.finished) {
        return sum + routeCard.value;
      } else {
        return sum - routeCard.value;
      }
    }, 0);

    if (player.longRouteCard.finished) {
      score += player.longRouteCard.value;
    } else {
      score -= player.longRouteCard.value;
    }

    if (longestChainLength === player.longestChain) score += 10;

    return score;
  });
}
