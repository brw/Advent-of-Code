import { getInput } from '../../util.js';

const SAND_POS = { x: 500, y: 0 };

const FILL = {
  Rock: 1,
  Sand: 2,
};

const equal = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => x1 === x2 && y1 === y2;

const add = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
  x: x1 + x2,
  y: y1 + y2,
});

const set = (grid, pos, fill) => {
  grid[pos.y] ||= [];
  grid[pos.y][pos.x] = fill;
};

const isEmpty = (grid, pos) => !grid[pos.y]?.[pos.x];

const canMoveTo = (grid, pos, bounds, part2) => {
  if (part2 && pos.y === bounds.y[1]) {
    return false;
  }
  return isEmpty(grid, pos);
};

const inBounds = (pos, bounds) =>
  pos.x >= bounds.x[0] &&
  pos.y >= bounds.y[0] &&
  pos.x <= bounds.x[1] &&
  pos.y <= bounds.y[1];

function getRockGrid(data) {
  const MOVES = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

  const rocks = data
    .trim()
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((rock) => {
        const [x, y] = rock.split(',');
        return { x: Number(x), y: Number(y) };
      }),
    )
    .reduce((rocks, coords) => {
      for (let i = 1; i < coords.length; i++) {
        const pos = coords[i - 1];
        var end = coords[i];

        let direction;
        if (pos.y < end.y) {
          direction = MOVES[0];
        } else if (pos.x < end.x) {
          direction = MOVES[1];
        } else if (pos.y > end.y) {
          direction = MOVES[2];
        } else if (pos.x > end.x) {
          direction = MOVES[3];
        }

        while (!equal(pos, end)) {
          rocks.push({ ...pos });
          pos.x += direction.x;
          pos.y += direction.y;
        }
      }
      rocks.push(end);
      return rocks;
    }, []);

  const grid = [];
  const bounds = { x: [], y: [0] };
  for (const rock of rocks) {
    set(grid, rock, FILL.Rock);

    if (!bounds.x[0] || rock.x < bounds.x[0]) {
      bounds.x[0] = rock.x;
    }
    if (!bounds.x[1] || rock.x > bounds.x[1]) {
      bounds.x[1] = rock.x;
    }
    if (!bounds.y[1] || rock.y > bounds.y[1]) {
      bounds.y[1] = rock.y;
    }
  }

  return { grid, bounds };
}

function addSand(grid, bounds, pos, part2) {
  const MOVES = [
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
  ];

  if (!isEmpty(grid, pos)) {
    return false;
  }

  bounds: while (inBounds(pos, bounds)) {
    for (const move of MOVES) {
      const dest = add(pos, move);
      if (canMoveTo(grid, dest, bounds, part2)) {
        pos = dest;
        continue bounds;
      }
    }
    set(grid, pos, FILL.Sand);
    return true;
  }
  return false;
}

function gridToStr(grid, bounds, part2) {
  const minX = part2 ? 485 : bounds.x[0];
  const maxX = part2 ? 515 : bounds.x[1];
  let gridStr = '';

  for (let i = bounds.y[0]; i <= bounds.y[1]; i++) {
    for (let j = minX; j <= maxX; j++) {
      const char = {
        [FILL.Rock]: '#',
        [FILL.Sand]: 'O',
        empty: '.',
      };
      gridStr += grid[i]?.[j] ? char[grid[i][j]] : char.empty;
    }
    gridStr += '\n';
  }

  return gridStr;
}

export function part1(data) {
  const { grid, bounds } = getRockGrid(data);

  let units = 0;
  while (addSand(grid, bounds, SAND_POS)) {
    units++;
  }
  // console.log(gridToStr(grid, bounds));
  return units;
}

export function part2(data) {
  const { grid, bounds } = getRockGrid(data);
  bounds.y[1] += 2;
  bounds.x[0] = -Infinity;
  bounds.x[1] = Infinity;

  let units = 0;
  while (addSand(grid, bounds, SAND_POS, true)) {
    units++;
  }
  // console.log(gridToStr(grid, bounds, true));
  return units;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
