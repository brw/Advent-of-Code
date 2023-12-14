const split = (str: string) => str.split('\n').map((line) => line.split(''));
const join = (grid: string[][]) => grid.map((row) => row.join('')).join('\n');

function tilt(grid: string[][], direction: number[]) {
  let [dx, dy] = direction;

  for (let i = 0; i < grid.length; i++) {
    const y = dy === 1 ? grid.length - i - 1 : i;
    const row = grid[y];

    for (let j = 0; j < row.length; j++) {
      const x = dx === 1 ? row.length - j - 1 : j;
      const cell = row[x];

      if (cell === 'O') {
        let target = grid[y + dy]?.[x + dx];

        let targetX = x + dx;
        let targetY = y + dy;
        while (grid[targetY + dy]?.[targetX + dx] === '.') {
          targetY += dy;
          targetX += dx;
        }

        if (target === '.') {
          grid[targetY][targetX] = cell;
          grid[y][x] = '.';
        }
      }
    }
  }

  return grid;
}

function calculateWeight(grid: string[][]) {
  return grid.reduce(
    (acc, row, i) =>
      acc + row.filter((c) => c === 'O').length * (grid.length - i),
    0,
  );
}

export function part1(data: string) {
  let grid = split(data.trim());

  tilt(grid, [0, -1]);
  return calculateWeight(grid);
}

export function part2(data: string) {
  let grid = split(data.trim());

  const ITERATIONS = 1_000_000_000;
  const grids = [join(grid)];

  let i = 1;
  while (true) {
    // prettier-ignore
    for (const direction of [[0, -1], [-1, 0], [0, 1], [1, 0]]) {
      tilt(grid, direction);
    }

    const gridStr = join(grid);
    const index = grids.indexOf(gridStr);
    if (index !== -1) {
      const cycleLength = grids.length - index;
      const cycleOffset = ITERATIONS - i;
      const cycleIndex = (cycleOffset % cycleLength) + index;

      return calculateWeight(split(grids[cycleIndex]));
    }

    grids.push(gridStr);
    i++;
  }
}

function printGrid(grid: string[][]) {
  console.log(grid.map((row) => row.join('')).join('\n') + '\n');
}
