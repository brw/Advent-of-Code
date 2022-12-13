import getInput from '../get_input.js';

const input = getInput(import.meta.url);

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

function compare(left, right) {
  if (left === undefined) {
    return -1;
  } else if (right === undefined) {
    return 1;
  }
  if (isNumeric(left) && isNumeric(right)) {
    return Math.sign(left - right);
  }
  if (Array.isArray(left) && isNumeric(right)) {
    right = [right];
  } else if (isNumeric(left) && Array.isArray(right)) {
    left = [left];
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const res = compare(left[i], right[i]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  }

  return compare(left, right);
}

export function part1(data) {
  const packets = data
    .trim()
    .split('\n\n')
    .map((pairs) => pairs.split('\n').map((list) => JSON.parse(list)));
  const correct = [];
  for (const [index, pairs] of packets.entries()) {
    if (compare(pairs[0], pairs[1]) === -1) {
      correct.push(index + 1);
    }
  }
  return correct.reduce((a, b) => a + b);
}

export function part2(data) {
  const packets = data
    .trim()
    .split('\n')
    .filter((e) => e !== '')
    .map((packets) => JSON.parse(packets));
  packets.push([[2]], [[6]]);
  packets.sort(compare);

  let i2, i6;

  for (let i = 0; i < packets.length; i++) {
    if (
      packets[i].length === 1 &&
      packets[i][0].length === 1 &&
      packets[i][0][0] === 2
    ) {
      i2 = i + 1;
    } else if (
      packets[i].length === 1 &&
      packets[i][0].length === 1 &&
      packets[i][0][0] === 6
    ) {
      i6 = i + 1;
      break;
    }
  }
  return i2 * i6;
}

console.log(part1(input), part2(input));
