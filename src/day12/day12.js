import getInput from '../get_input.js';

const input = getInput(import.meta.url);

function parseHeightMap(data) {
  let start = [];
  let end = [];
  const possibleStart = [];
  const lines = data.trim().split('\n');
  const map = lines.map((line, y) =>
    line.split('').map((char, x) => {
      if (char === 'S') {
        start = [x, y];
        possibleStart.push(start);
        char = 'a';
      } else if (char === 'E') {
        end = [x, y];
        char = 'z';
      } else if (char === 'a') {
        possibleStart.push([x, y]);
        char = 'a';
      }
      return char.charCodeAt(0);
    })
  );
  return { map, start, end, possibleStart };
}

const boundsCheck = ([x, y], map) =>
  x >= 0 && y >= 0 && y < map.length && x < map[y].length;

const add = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];

const compare = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const str = (node) => `${node[0]},${node[1]}`;

const getHeight = ([x, y], map) => map[y][x];

function findShortestDistance(start, end, map) {
  const MOVES = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited = new Set([str(start)]);
  const queue = [start];
  const cost = { [str(start)]: 0 };

  while (queue.length > 0) {
    let node = queue.shift();

    if (compare(node, end)) {
      return cost[str(node)];
    }

    for (const move of MOVES) {
      const newNode = add(node, move);

      if (
        boundsCheck(newNode, map) &&
        !visited.has(str(newNode)) &&
        getHeight(newNode, map) - getHeight(node, map) <= 1
      ) {
        queue.push(newNode);
        visited.add(str(newNode));
        cost[str(newNode)] = cost[str(node)] + 1;
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
