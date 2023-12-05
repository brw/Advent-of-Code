import { getInput } from '../../util';

export function part1(data: string) {
  const sections = data.split('\n\n');
  const seeds = sections[0].match(/\d+/g)?.map(Number)!;
  let lowest = Infinity;

  for (const seed of seeds) {
    let current = seed;

    for (const section of sections) {
      const lines = section.split('\n').slice(1);

      for (const line of lines) {
        const [destination, source, range] = line.split(' ').map(Number);
        if (current >= source && current <= source + range) {
          current = current - source + destination;
          break;
        }
      }
    }

    lowest = Math.min(lowest, current);
  }

  return lowest;
}

export function part2(data: string) {
  const sections = data.split('\n\n');
  const seedRanges = sections[0]
    .match(/(\d+) (\d+)/g)!
    .map((pair) => pair.split(' ').map(Number))
    .map(([a, b]) => [a, a + b]);

  let lowestLocation = Infinity;

  for (const [min, max] of seedRanges) {
    let nextRanges: [number, number][] = [[min, max]];

    for (const section of sections.slice(1)) {
      const map = section.trim().split('\n').slice(1);
      let rangesToCheck: [number, number][] = [...nextRanges];
      const changedRanges: [number, number][] = [];

      for (const line of map) {
        const [destination, source, range] = line.split(' ').map(Number);
        const unchangedRanges: [number, number][] = [];

        while (rangesToCheck.length !== 0) {
          const [min, max] = rangesToCheck.pop()!;

          const before = [min, Math.min(max, source)];
          const inter = [Math.max(min, source), Math.min(max, source + range)];
          const after = [Math.max(source + range, min), max];

          if (before[0] < before[1]) {
            unchangedRanges.push([before[0], before[1]]);
          }

          if (inter[0] < inter[1]) {
            changedRanges.push([
              inter[0] - source + destination,
              inter[1] - source + destination,
            ]);
          }

          if (after[0] < after[1]) {
            unchangedRanges.push([after[0], after[1]]);
          }
        }
        rangesToCheck = unchangedRanges;
      }
      nextRanges = [...changedRanges, ...rangesToCheck];
    }

    const seedRangeLowestLocation = Math.min(...nextRanges.flat());
    lowestLocation = Math.min(lowestLocation, seedRangeLowestLocation);
  }

  return lowestLocation;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 382895070 17729182
