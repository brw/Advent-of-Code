import getInput from '../get_input.js';

const input = getInput(import.meta.url);

function parseHeightMap(data) {
  let start = [];
  let end = [];
  const possibleStart = [];
  const lines = data.trim().split('\n');
  const map = lines.map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [j, i];
        possibleStart.push(start);
        return 'a'.charCodeAt(0);
      } else if (char === 'E') {
        end = [j, i];
        return 'z'.charCodeAt(0);
      } else if (char === 'a') {
        possibleStart.push([j, i]);
        return 'a'.charCodeAt(0);
      } else {
        return char.charCodeAt(0);
      }
    })
  );

  return { map, start, end, possibleStart };
}

function boundsCheck(node, map) {
  const [x, y] = node;
  return x >= 0 && y >= 0 && y < map.length && x < map[y].length;
}

function findShortestDistance(start, end, map) {
  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited = new Set([start.join()]);
  const queue = [start];
  const prev = {};

  while (queue.length > 0) {
    let node = queue.shift();
    if (node[0] === end[0] && node[1] === end[1]) {
      let steps = 0;
      while (!(node[0] === start[0] && node[1] === start[1])) {
        node = prev[node.join()];
        steps++;
      }
      return steps;
    }
    for (const move of moves) {
      const newNode = [node[0] + move[0], node[1] + move[1]];
      if (
        boundsCheck(newNode, map) &&
        !visited.has(newNode.join()) &&
        map[newNode[1]][newNode[0]] - map[node[1]][node[0]] <= 1
      ) {
        queue.push(newNode);
        visited.add(newNode.join());
        prev[newNode.join()] = node;
      }
    }
  }
}

export function part1(data) {
  const { map, start, end } = parseHeightMap(data);
  return findShortestDistance(start, end, map);
}

export function part2(data) {
  const { map, possibleStart, end } = parseHeightMap(data);
  let minSteps;
  for (const start of possibleStart) {
    const newSteps = findShortestDistance(start, end, map);
    if (!minSteps || newSteps < minSteps) {
      minSteps = newSteps;
    }
  }
  return minSteps;
}

console.log(part1(input), part2(input));
