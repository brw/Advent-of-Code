// prettier-ignore
const PIPES: Record<string, number[][]> = {
  '|': [[0, -1], [0, 1]],
  '-': [[-1, 0], [1, 0]],
  'L': [[1, 0], [0, -1]],
  'J': [[-1, 0], [0, -1]],
  '7': [[-1, 0], [0, 1]],
  'F': [[1, 0], [0, 1]],
  'S': [[0, -1], [0, 1], [-1, 0], [1, 0]],
} as const;

function getStartCoords(grid: string[]) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === 'S') {
        return { x, y };
      }
    }
  }
}

function getAdjacentPipes(grid: string[], x: number, y: number) {
  const directions = PIPES[grid[y][x]];
  const connections = [];

  for (const [dx, dy] of directions) {
    const char = grid[y + dy]?.[x + dx];
    if (char && char !== '.') {
      connections.push({ x: x + dx, y: y + dy });
    }
  }

  return connections;
}

function traverseLoop(grid: string[]) {
  const start = getStartCoords(grid)!;
  const visited = new Set<string>();
  const loop = new Set<string>();
  const queue = [{ ...start }];

  while (queue.length !== 0) {
    const { x, y } = queue.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    const char = grid[y][x];
    if (char === '.') continue;

    const connections = getAdjacentPipes(grid, x, y);
    queue.push(...connections);
    loop.add(key);
  }

  return loop;
}

function determineStartCharacter(grid: string[], x: number, y: number) {
  const above = grid[y - 1]?.[x];
  const below = grid[y + 1]?.[x];
  const left = grid[y]?.[x - 1];
  const right = grid[y]?.[x + 1];

  let possible = Object.keys(PIPES).slice(0, -1);

  if (['7', '|', 'F'].includes(above) || !below) {
    possible = possible.filter((p) => !['7', '-', 'F'].includes(p));
  }

  if (['L', '|', 'J'].includes(below) || !above) {
    possible = possible.filter((p) => !['L', '-', 'J'].includes(p));
  }

  if (['L', '-', 'F'].includes(left) || !right) {
    possible = possible.filter((p) => !['L', '|', 'F'].includes(p));
  }

  if (['J', '-', '7'].includes(right) || !left) {
    possible = possible.filter((p) => !['J', '|', '7'].includes(p));
  }

  return possible[0];
}

export function part1(data: string) {
  const grid = data.trim().split('\n');

  const loop = traverseLoop(grid);
  return loop.size / 2;
}

export function part2(data: string) {
  const grid = data.trim().split('\n');
  const loop = traverseLoop(grid);

  let inside = false;
  // const insideTiles = new Set<string>();
  let totalInside = 0;

  for (let y = 0; y < grid.length - 1; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length - 1; x++) {
      let char = grid[y][x];

      if (char === 'S') {
        char = determineStartCharacter(grid, x, y);
      }

      if (loop.has(`${x},${y}`) && ['|', 'J', 'L'].includes(char)) {
        inside = !inside;
      } else if (!loop.has(`${x},${y}`) && inside) {
        totalInside++;
        // insideTiles.add(`${x},${y}`);
      }
    }

    inside = false;
  }

  // printGrid(grid, insideTiles);
  return totalInside;
}

function printGrid(grid: string[], fill: Set<string>) {
  const output = [];
  // prettier-ignore
  const PIPE_CHARACTERS: Record<string, string> = {
    '|': '│',
    '-': '─',
    'L': '└',
    'J': '┘',
    '7': '┐',
    'F': '┌',
  } as const;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const newRow = [];
    for (let x = 0; x < row.length; x++) {
      const char = grid[y][x];
      newRow.push(fill.has(`${x},${y}`) ? '#' : PIPE_CHARACTERS[char] ?? char);
    }
    output.push(newRow.join(''));
  }

  console.log(output.join('\n'));
}
