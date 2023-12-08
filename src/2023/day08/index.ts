import { getInput, toLines } from '../../util';

function prepare(data: string) {
  const lines = toLines(data);
  const directions = lines[0].split('');
  const map = lines.slice(2).reduce(
    (map, line) => {
      const [from, to] = line.split(' = ');
      map[from] = to.match(/\w+/g)!;
      return map;
    },
    {} as Record<string, string[]>,
  );

  return { directions, map };
}

function traverse(
  map: Record<string, string[]>,
  directions: string[],
  start: string,
  end: string,
) {
  let current = start;
  let steps = 0;

  while (!current.match(new RegExp(end))) {
    const [left, right] = map[current];
    const direction = directions[steps % directions.length];
    current = direction === 'L' ? left : right;
    steps++;
  }

  return steps;
}

export function part1(data: string) {
  const { directions, map } = prepare(data);

  const steps = traverse(map, directions, 'AAA', 'ZZZ');
  return steps;
}

export function part2(data: string) {
  const { directions, map } = prepare(data);

  const startPositions = Object.keys(map).filter((key) => key[2] === 'A');
  const allSteps: number[] = [];
  for (const start of startPositions) {
    const steps = traverse(map, directions, start, '..Z');
    allSteps.push(steps);
  }

  const lcm = allSteps.reduce((a, b) => {
    let [x, y] = [a, b];
    while (x !== y) {
      if (x < y) {
        x += a;
      } else {
        y += b;
      }
    }
    return x;
  });
  return lcm;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 16043 15726453850399
