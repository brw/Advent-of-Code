import { getInput } from '../../util.ts';

function findAdjacentNumbers(
  grid: string[],
  rowIndex: number,
  symbolIndex: number,
) {
  const numbers: number[] = [];

  const edgeStart = symbolIndex - 1;
  const edgeEnd = symbolIndex + 1;

  for (const offset of [-1, 0, 1]) {
    const row = grid[rowIndex + offset];
    if (!row) continue;

    for (const match of row.matchAll(/\d+/g)) {
      if (match.index === undefined) continue;

      const numStart = match.index;
      const numEnd = numStart + match[0].length - 1;

      for (let i = edgeStart; i <= edgeEnd; i++) {
        if (i >= numStart && i <= numEnd) {
          numbers.push(Number(match[0]));
          break;
        }
      }
    }
  }

  return numbers;
}

export function part1(data: string) {
  const grid = data.trim().split('\n');
  let sum = 0;

  for (const [rowIndex, row] of grid.entries()) {
    const matches = row.matchAll(/[^\d\.]+/g);

    for (const match of matches) {
      if (match.index === undefined) continue;

      const numbers = findAdjacentNumbers(grid, rowIndex, match.index);
      sum += numbers.reduce((a, b) => a + b, 0);
    }
  }

  return sum;
}

export function part2(data: string) {
  const grid = data.trim().split('\n');
  let sum = 0;

  for (const [index, row] of grid.entries()) {
    for (const match of row.matchAll(/\*/g)) {
      if (match.index === undefined) continue;

      const numbers = findAdjacentNumbers(grid, index, match.index);
      if (numbers.length === 2) {
        sum += numbers[0] * numbers[1];
      }
    }
  }

  return sum;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 557705 84266818
