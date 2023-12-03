import getInput from '../../get_input.js';

function findAdjacentNumbers(grid, row, rowIndex, symbolIndex) {
  const numbers = [];

  for (const match of row.matchAll(/\d+/g)) {
    const start = match.index;
    const end = start + match[0].length - 1;

    if (end === symbolIndex - 1 || start === symbolIndex + 1) {
      numbers.push(Number(match[0]));
    }
  }

  if (rowIndex !== 0) {
    const prevRow = grid[rowIndex - 1];
    const startEdge = symbolIndex > 0 ? symbolIndex - 1 : symbolIndex;
    const endEdge = symbolIndex < row.length ? symbolIndex + 1 : symbolIndex;

    for (const match of prevRow.matchAll(/\d+/g)) {
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

  if (rowIndex !== grid.length - 1) {
    const nextRow = grid[rowIndex + 1];
    const startEdge = symbolIndex > 0 ? symbolIndex - 1 : symbolIndex;
    const endEdge = symbolIndex < row.length ? symbolIndex + 1 : symbolIndex;

    for (const match of nextRow.matchAll(/\d+/g)) {
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

export function part1(data) {
  const grid = data.trim().split('\n');
  let sum = 0;

  for (const [rowIndex, row] of grid.entries()) {
    const matches = row.matchAll(/[^\d\.]+/g);

    for (const match of matches) {
      const numbers = findAdjacentNumbers(grid, row, rowIndex, match.index);
      sum += numbers.reduce((a, b) => a + b, 0);
    }
  }

  return sum;
}

export function part2(data) {
  const grid = data.trim().split('\n');
  let sum = 0;

  for (const [index, row] of grid.entries()) {
    for (const match of row.matchAll(/\*/g, 'g')) {
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
