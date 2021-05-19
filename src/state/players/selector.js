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
  /*   const longestChainLength = players.reduce((currentLongestChain, player) => {
    if (player.longestChain > currentLongestChain) return player.longestChain;
    else return currentLongestChain;
  }, 0); */

  return players.map((player) => {
    const trainCardCount = Object.values(player.trainCards).reduce(
      (sum, count) => {
        return sum + count;
      },
      0,
    );

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

    return {
      ...player,
      trainCardCount: trainCardCount,
      routeCardCount: player.routeCards.length + 1, //+1 for longRouteCard
      score: score,
    };
  });
}

export function selectPlayersWithFinalScore(state) {
  const players = selectPlayers(state);
  const longestPathLength = players.reduce((currentLongest, player) => {
    player.longestPath = getLongestPath(player);
    if (player.longestPath.length > currentLongest)
      return player.longestPath.length;
    else return currentLongest;
  }, 0);

  const outPlayers = players.map((player) => {
    const trainCardCount = Object.values(player.trainCards).reduce(
      (sum, count) => {
        return sum + count;
      },
      0,
    );

    let score = 0;

    score += Number(
      player.builtConnections.reduce((sum, connection) => {
        let value = 0;
        switch (connection.elements.length) {
          case 1:
            value = 1;
            break;
          case 2:
            value = 2;
            break;
          case 3:
            value = 4;
            break;
          case 4:
            value = 7;
            break;
          case 6:
            value = 15;
            break;
          case 8:
            value = 21;
            break;
          default:
            console.error(
              `Error while calculating connection length score.\nConnection:\n${connection}\nCalculated length: ${connection.elements.length}`,
            );
            break;
        }
        return Number(sum) + Number(value);
      }, 0),
    );

    score += Number(
      player.routeCards.reduce((sum, routeCard) => {
        if (routeCard.finished) {
          return Number(sum) + Number(routeCard.value);
        } else {
          return Number(sum) - Number(routeCard.value);
        }
      }, 0),
    );

    if (player.longRouteCard.finished) {
      score += Number(player.longRouteCard.value);
    } else {
      score -= Number(player.longRouteCard.value);
    }

    if (longestPathLength === player.longestPath.length) score += 10;

    return {
      ...player,
      trainCardCount: trainCardCount,
      routeCardCount: player.routeCards.length + 1, //+1 for longRouteCard
      score: score,
    };
  });

  outPlayers.sort((playerA, playerB) => {
    return playerB.score - playerA.score;
  });
  return [outPlayers, longestPathLength];
}

function getLongestPath(player) {
  if (player.hasOwnProperty('connectionGraph')) {
    const subGraphs = getConnectedSubgraphs(player.connectionGraph);

    const path = subGraphs.reduce(
      (longestPath, currentGraph) => {
        if (currentGraph.maxLength > longestPath.length)
          return findLongestPathInConnectedGraph(currentGraph);
        else return longestPath;
      },
      { length: 0, path: [] },
    );

    let connections = [];

    if (path.length > 0) {
      for (let i = 1; i < path.path.length; i++) {
        const cityIdA = path.path[i - 1];
        const cityIdB = path.path[i];

        const currentConnection = player.builtConnections.find((connection) => {
          return (
            (connection.from === cityIdA && connection.to === cityIdB) ||
            (connection.from === cityIdB && connection.to === cityIdA)
          );
        });

        connections.push(currentConnection.id);
      }
    }

    return { ...path, connections: connections };
  } else {
    return { length: 0, path: [], connections: [] };
  }
}

function getConnectedSubgraphs(graph) {
  let subGraphs = [];
  let nodes = graph.nodes.map((node) => {
    return node.id;
  });
  let links = getUniqueLinks(graph.links);

  while (nodes.length > 0 && links.length > 0) {
    let newSubGraph = {
      nodes: [],
      links: [],
      maxLength: 0,
    };
    let nodeQueue = [];
    nodeQueue.push(nodes.shift());

    while (nodeQueue.length > 0) {
      const currentNode = nodeQueue.shift();
      newSubGraph.nodes.push(currentNode);

      let porcessedLinks = [];

      while (links.length > 0) {
        let currentLink = links.shift();
        if (currentLink.ends[0] === currentNode) {
          newSubGraph.links.push(currentLink);
          newSubGraph.maxLength += currentLink.weight;
          if (!nodeQueue.includes(currentLink.ends[1]))
            nodeQueue.push(currentLink.ends[1]);
        } else if (currentLink.ends[1] === currentNode) {
          newSubGraph.links.push(currentLink);
          newSubGraph.maxLength += currentLink.weight;
          if (!nodeQueue.includes(currentLink.ends[0]))
            nodeQueue.push(currentLink.ends[0]);
        } else {
          porcessedLinks.push(currentLink);
        }
      }

      links = porcessedLinks;
    }
    subGraphs.push(newSubGraph);
  }

  subGraphs.sort((a, b) => {
    return b.maxLength - a.maxLength;
  });

  return subGraphs;
}

function getUniqueLinks(links) {
  let uniqueLinks = [];
  let remainingLinks = [...links];
  let currentLink;

  while (remainingLinks.length > 0) {
    currentLink = remainingLinks.shift();
    let i = 0;

    while (i < remainingLinks.length && currentLink !== null) {
      let nextLink = remainingLinks[i];
      if (
        nextLink.weight === currentLink.weight &&
        ((nextLink.source === currentLink.source &&
          nextLink.target === currentLink.target) ||
          (nextLink.source === currentLink.target &&
            nextLink.target === currentLink.source))
      ) {
        const ends = [
          `${Math.min(currentLink.source, currentLink.target)}`,
          `${Math.max(currentLink.source, currentLink.target)}`,
        ];

        uniqueLinks.push({
          ends: ends,
          weight: currentLink.weight,
        });

        currentLink = null;
        remainingLinks.splice(i, 1);
      } else {
        ++i;
      }
    }

    if (currentLink !== null) {
      uniqueLinks.push({
        ends: [currentLink.source, currentLink.target],
        weight: currentLink.weight,
      });
    }
  }

  return uniqueLinks;
}

function findLongestPathInConnectedGraph(graph) {
  const longestPath = { length: 0, path: [] };
  const [alGraph, weightList] = buildAdjacencyList(graph);

  alGraph.forEach((value, key) => {
    const [maxDepth, maxDepthPath] = getMaxDepth(key, alGraph, weightList);
    if (maxDepth > longestPath.length) {
      longestPath.length = maxDepth;
      longestPath.path = maxDepthPath;
    }
  });

  return longestPath;
}

function getMaxDepth(currentNode, alGraph, weightList) {
  let maxDepth = 0;
  let maxDepthPath = [];

  let connectedNodes = Array.from(alGraph.get(currentNode));

  while (connectedNodes.length > 0) {
    const nextNode = connectedNodes.shift();

    const nextWeightKey = `${Math.min(
      Number(nextNode),
      Number(currentNode),
    )}:${Math.max(Number(nextNode), Number(currentNode))}`;

    const nextNodeWeight = weightList.get(nextWeightKey);
    const nextWeightList = new Map(weightList);

    nextWeightList.delete(nextWeightKey);

    const nextSubGraph = new Map(alGraph);

    const nextNodeSet = new Set(nextSubGraph.get(nextNode));
    nextNodeSet.delete(currentNode);

    if (nextNodeSet.size > 0) {
      nextSubGraph.set(nextNode, nextNodeSet);

      const currentNodeSet = new Set(nextSubGraph.get(currentNode));
      currentNodeSet.delete(nextNode);
      nextSubGraph.set(currentNode, currentNodeSet);

      const [nextNodeDepth, nextPath] = getMaxDepth(
        nextNode,
        nextSubGraph,
        nextWeightList,
      );
      if (nextNodeWeight + nextNodeDepth > maxDepth) {
        maxDepth = nextNodeWeight + nextNodeDepth;
        maxDepthPath = [currentNode, ...nextPath];
      }
    } else if (nextNodeWeight > maxDepth) {
      maxDepth = nextNodeWeight;
      maxDepthPath = [currentNode, nextNode];
    }
  }

  return [maxDepth, maxDepthPath];
}

function buildAdjacencyList(graph) {
  const adjacencyList = new Map();
  const weightList = new Map();

  for (const node of graph.nodes) {
    let adjacentSet = new Set();

    for (const link of graph.links) {
      if (link.ends[0] === node) {
        adjacentSet.add(link.ends[1]);
        weightList.set(
          `${Math.min(link.ends[0], link.ends[1])}:${Math.max(
            link.ends[0],
            link.ends[1],
          )}`,
          Number(link.weight),
        );
      } else if (link.ends[1] === node) {
        adjacentSet.add(link.ends[0]);
        weightList.set(
          `${Math.min(link.ends[0], link.ends[1])}:${Math.max(
            link.ends[0],
            link.ends[1],
          )}`,
          link.weight,
        );
      }
    }

    adjacencyList.set(node, adjacentSet);
  }

  return [adjacencyList, weightList];
}
