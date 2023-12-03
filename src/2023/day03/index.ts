import getInput from '../../get_input.ts';

function findAdjacentNumbers(
  grid: string[],
  row: string,
  rowIndex: number,
  symbolIndex: number,
) {
  const numbers: number[] = [];
  const rows: string[] = [row];
  if (rowIndex > 0) rows.push(grid[rowIndex - 1]);
  if (rowIndex < grid.length - 1) rows.push(grid[rowIndex + 1]);

  const startEdge = symbolIndex > 0 ? symbolIndex - 1 : symbolIndex;
  const endEdge = symbolIndex < row.length ? symbolIndex + 1 : symbolIndex;

  for (const checkRow of rows) {
    for (const match of checkRow.matchAll(/\d+/g)) {
      if (match.index === undefined) continue;

      const start = match.index;
      const end = start + match[0].length - 1;

      for (let i = startEdge; i <= endEdge; i++) {
        if (i >= start && i <= end) {
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

      const numbers = findAdjacentNumbers(grid, row, rowIndex, match.index);
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

      const numbers = findAdjacentNumbers(grid, row, index, match.index);
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
