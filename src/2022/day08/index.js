import { getInput } from '../../util.js';

const input = getInput(import.meta.url);

function getTallerDirections(tree, i, j, trees, row) {
  let taller = Array(4)
    .fill(0)
    .map(() => []);

  for (let c = 1; c < Math.max(i, j, trees.length, row.length); c++) {
    if (c <= i) {
      // North
      taller[0].push(tree > trees[i - c][j]);
    }
    if (c <= row.length - 1 - j) {
      // East
      taller[1].push(tree > row[j + c]);
    }
    if (c <= trees.length - 1 - i) {
      // South
      taller[2].push(tree > trees[i + c][j]);
    }
    if (c <= j) {
      // West
      taller[3].push(tree > row[j - c]);
    }
  }

  return taller;
}

function isVisible(tree, i, j, trees, row) {
  // Edges
  if (i == 0 || j == 0 || i == row.length - 1 || j == trees.length - 1) {
    return true;
  }

  const taller = getTallerDirections(tree, i, j, trees, row);
  return taller.some((direction) => direction.every(Boolean));
}

function getScenicScore(tree, i, j, trees, row) {
  const taller = getTallerDirections(tree, i, j, trees, row);
  const scenicScore = taller
    .map((direction) => {
      const firstShorterTree = direction.indexOf(false);
      if (firstShorterTree >= 0) {
        return direction.slice(0, firstShorterTree + 1);
      }
      return direction;
    })
    .reduce((total, direction) => total * direction.length, 1);
  return scenicScore;
}

export function part1(data) {
  const trees = data
    .trim()
    .split('\n')
    .map((row) => row.split('').map(Number));

  let total = 0;

  for (const [i, row] of trees.entries()) {
    for (const [j, tree] of row.entries()) {
      if (isVisible(tree, i, j, trees, row)) {
        total++;
      }
    }
  }

  return total;
}

export function part2(data) {
  const trees = data
    .trim()
    .split('\n')
    .map((row) => row.split('').map(Number));

  let bestScenicScore = 1;

  for (let i = 1; i < trees.length - 1; i++) {
    let row = trees[i];
    for (let j = 1; j < row.length - 1; j++) {
      let tree = row[j];
      let scenicScore = getScenicScore(tree, i, j, trees, row);
      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }

  return bestScenicScore;
}

console.log(part1(input), part2(input));
