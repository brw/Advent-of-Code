type Direction = 'up' | 'down' | 'left' | 'right';

const directions: Map<Direction, [number, number]> = new Map([
  ['up', [0, -1]],
  ['down', [0, 1]],
  ['left', [-1, 0]],
  ['right', [1, 0]],
]);

function traverse(
  grid: string[][],
  current: [number, number],
  direction: Direction,
  visited: Set<string> = new Set(),
) {
  const [x, y] = current;
  const [dx, dy] = directions.get(direction)!;

  if (!grid[y]?.[x] || visited.has(`${x},${y},${direction}`)) {
    return visited;
  }

  visited.add(`${x},${y},${direction}`);

  if (grid[y][x] === '.') {
    traverse(grid, [x + dx, y + dy], direction, visited);
  } else if (grid[y][x] === '/') {
    if (direction === 'left') {
      traverse(grid, [x, y + 1], 'down', visited);
    } else if (direction === 'right') {
      traverse(grid, [x, y - 1], 'up', visited);
    } else if (direction === 'up') {
      traverse(grid, [x + 1, y], 'right', visited);
    } else if (direction === 'down') {
      traverse(grid, [x - 1, y], 'left', visited);
    }
  } else if (grid[y][x] === '\\') {
    if (direction === 'left') {
      traverse(grid, [x, y - 1], 'up', visited);
    } else if (direction === 'right') {
      traverse(grid, [x, y + 1], 'down', visited);
    } else if (direction === 'up') {
      traverse(grid, [x - 1, y], 'left', visited);
    } else if (direction === 'down') {
      traverse(grid, [x + 1, y], 'right', visited);
    }
  } else if (grid[y][x] === '-') {
    if (direction === 'left') {
      traverse(grid, [x - 1, y], 'left', visited);
    } else if (direction === 'right') {
      traverse(grid, [x + 1, y], 'right', visited);
    } else if (direction === 'up' || direction === 'down') {
      traverse(grid, [x - 1, y], 'left', visited);
      traverse(grid, [x + 1, y], 'right', visited);
    }
  } else if (grid[y][x] === '|') {
    if (direction === 'up') {
      traverse(grid, [x, y - 1], 'up', visited);
    } else if (direction === 'down') {
      traverse(grid, [x, y + 1], 'down', visited);
    } else if (direction === 'left' || direction === 'right') {
      traverse(grid, [x, y - 1], 'up', visited);
      traverse(grid, [x, y + 1], 'down', visited);
    }
  }

  return visited;
}

function deduplicate(visited: Set<string>) {
  const deduped = new Set<string>();
  for (const coords of visited) {
    const [x, y] = coords.split(',').map(Number);
    deduped.add(`${x},${y}`);
  }
  return deduped;
}

export function part1(data: string) {
  const grid = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));
  const visited = traverse(grid, [0, 0], 'right');

  return deduplicate(visited).size;
}

export function part2(data: string) {
  const grid = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  // what a monstrosity
  const edges = [
    ...grid[0].map((_, i) => [i, 0, 'down'] as const),
    ...grid[grid.length - 1].map((_, i) => [i, grid.length - 1, 'up'] as const),
    ...grid.map((_, i) => [0, i, 'right'] as const),
    ...grid.map((_, i) => [grid[0].length - 1, i, 'left'] as const),
    [0, 0, 'right'] as const,
    [grid[0].length - 1, 0, 'left'] as const,
    [0, grid.length - 1, 'right'] as const,
    [grid[0].length - 1, grid.length - 1, 'left'] as const,
  ] as const;

  let mostEnergized = 0;

  for (const [x, y, direction] of edges) {
    const visited = new Set<string>();
    traverse(grid, [x, y], direction, visited);

    const energized = deduplicate(visited).size;
    if (energized > mostEnergized) {
      mostEnergized = energized;
    }
  }

  return mostEnergized;
}

function printGrid(grid: string[][], visited: Set<string>) {
  const gridCopy = [...grid.map((row) => [...row])];
  for (const coords of visited) {
    const [x, y] = coords.split(',').map(Number);
    const direction = coords.split(',')[2] as Direction;
    const SYMBOLS: Record<Direction, string> = {
      up: '^',
      down: 'v',
      left: '<',
      right: '>',
    };
    gridCopy[y][x] = SYMBOLS[direction as Direction];
  }
  console.log(gridCopy.map((row) => row.join('')).join('\n'));
}
