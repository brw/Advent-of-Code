export function part1(data: string) {
  const { directions, map } = prepare(data);

  const steps = traverse(map, directions, 'AAA');
  return steps;
}

export function part2(data: string) {
  const { directions, map } = prepare(data);

  const startPositions = Object.keys(map).filter((key) => key[2] === 'A');
  const allSteps: number[] = [];
  for (const start of startPositions) {
    const steps = traverse(map, directions, start);
    allSteps.push(steps);
  }

  const gcd = (a: number, b: number): number => (b !== 0 ? gcd(b, a % b) : a);
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

  const steps = allSteps.reduce(lcm);
  return steps;
}

function prepare(data: string) {
  const lines = data.trim().split('\n');
  const directions = lines[0];
  const map: Record<string, string[]> = {};

  for (const line of lines.slice(2)) {
    const [from, to] = line.split(' = ');
    map[from] = to.match(/\w+/g)!;
  }

  return { directions, map };
}

function traverse(
  map: Record<string, string[]>,
  directions: string,
  start: string,
) {
  let current = start;
  let steps = 0;

  while (current[2] !== 'Z') {
    const [left, right] = map[current];
    const direction = directions[steps % directions.length];
    current = direction === 'L' ? left : right;
    steps++;
  }

  return steps;
}
