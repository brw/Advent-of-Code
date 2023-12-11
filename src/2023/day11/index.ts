export function part1(data: string) {
  const grid = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  for (let x = 0; x < grid[0].length; x++) {
    const column = grid.map((line) => line[x]);

    if (column.every((char) => char === '.')) {
      for (let y = 0; y < grid.length; y++) {
        grid[y].splice(x, 0, '.');
      }

      x++;
    }
  }

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    if (line.every((char) => char === '.')) {
      grid.splice(y, 0, line);
      y++;
    }
  }

  const galaxies: [number, number][] = [];

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === '#') {
        galaxies.push([x, y]);
      }
    }
  }

  const galaxyPairs: [number, number][][] = [];

  for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const other = galaxies[j];
      galaxyPairs.push([galaxy, other]);
    }
  }

  let distances = 0;

  for (const [a, b] of galaxyPairs) {
    const [ax, ay] = a;
    const [bx, by] = b;

    const dx = bx - ax;
    const dy = by - ay;

    const distance = Math.abs(dx) + Math.abs(dy);

    distances += distance;
  }

  return distances;
}

export function part2(data: string, multiplier: number = 1000000) {
  const grid = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const emptyColumns = [];
  const emptyRows = [];

  for (let x = 0; x < grid[0].length; x++) {
    const column = grid.map((line) => line[x]);

    if (column.every((char) => char === '.')) {
      emptyColumns.push(x);
    }
  }

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    if (line.every((char) => char === '.')) {
      emptyRows.push(y);
    }
  }

  const galaxies: [number, number][] = [];

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === '#') {
        galaxies.push([x, y]);
      }
    }
  }

  const galaxyPairs: [number, number][][] = [];

  for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const other = galaxies[j];
      galaxyPairs.push([galaxy, other]);
    }
  }

  let distances = 0;

  for (const [a, b] of galaxyPairs) {
    let [ax, ay] = a;
    let [bx, by] = b;

    let offsetX = 0;
    let offsetY = 0;

    for (const x of emptyColumns) {
      if ((ax < x && bx > x) || (ax > x && bx < x)) {
        offsetX += multiplier - 1;
      }
    }

    for (const y of emptyRows) {
      if ((ay < y && by > y) || (ay > y && by < y)) {
        offsetY += multiplier - 1;
      }
    }

    const dx = bx - ax;
    const dy = by - ay;

    const distance = Math.abs(dx) + Math.abs(dy) + offsetX + offsetY;

    distances += distance;
  }

  return distances;
}

function printGrid(grid: string[][]) {
  console.log(grid.map((line) => line.join('')).join('\n') + '\n');
}
