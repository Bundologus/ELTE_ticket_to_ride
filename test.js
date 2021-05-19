/* function getLongestPath(graph) {
  const subGraphs = getConnectedSubgraphs(graph);

  return subGraphs.reduce(
    (longestPath, currentGraph) => {
      if (currentGraph.maxLength > longestPath.length)
        return findLongestPath(currentGraph);
      else return longestPath;
    },
    { length: 0, path: [] },
  );
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

function findLongestPath(graph) {
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

  let links = Array.from(alGraph.get(currentNode));

  while (links.length > 0) {
    const nextNode = links.shift();

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

const testGraph = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ],
  links: [
    { source: '0', target: '1', weight: 1 },
    { source: '1', target: '0', weight: 1 },
    { source: '0', target: '2', weight: 1 },
    { source: '2', target: '0', weight: 1 },
    { source: '1', target: '2', weight: 1 },
    { source: '2', target: '1', weight: 1 },
    { source: '1', target: '3', weight: 1 },
    { source: '3', target: '1', weight: 1 },
    { source: '2', target: '4', weight: 1 },
    { source: '4', target: '2', weight: 1 },
    { source: '3', target: '4', weight: 1 },
    { source: '4', target: '3', weight: 1 },
    { source: '5', target: '6', weight: 1 },
    { source: '6', target: '5', weight: 1 },
    { source: '6', target: '7', weight: 1 },
    { source: '7', target: '6', weight: 1 },
    { source: '6', target: '8', weight: 1 },
    { source: '8', target: '6', weight: 1 },
  ],
};

const l = getLongestPath(testGraph);

console.log(l);
 */

let fs = require('fs');
/* import { fs } from 'fs'; */

function generateDetermShuffleNumberPairs() {
  const max = 110;
  let pairArray = [];

  for (let i = 2; i < max; i++) {
    const to = Math.floor((Math.random() * 10000) % i);

    pairArray.push([i, to]);
  }

  console.log(JSON.stringify(pairArray));
  /* 
  fs.writeFile('randompairs.json', JSON.stringify(pairArray)); */
}

generateDetermShuffleNumberPairs();
