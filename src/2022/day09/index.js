import { getInput } from '../../util.js';

const input = getInput(import.meta.url);

function getMotions(data) {
  return data
    .trim()
    .split('\n')
    .map((motion) => motion.split(' '));
}

function nextTo(x) {
  return x >= -1 && x <= 1;
}

function simulateRope(motions, ropeLength) {
  const knots = Array(ropeLength)
    .fill()
    .map((_) => [0, 0]);
  const head = knots[0];
  const visited = [[0, 0]];
  const moves = { R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1] };
  for (const [direction, steps] of motions) {
    const moveX = moves[direction][0];
    const moveY = moves[direction][1];
    for (let i = 0; i < steps; i++) {
      head[0] += moveX;
      head[1] += moveY;
      for (let j = 1; j < knots.length; j++) {
        const knot = knots[j];
        const prevKnot = knots[j - 1];
        if (!(nextTo(knot[0] - prevKnot[0]) && nextTo(knot[1] - prevKnot[1]))) {
          knot[0] += Math.sign(prevKnot[0] - knot[0]);
          knot[1] += Math.sign(prevKnot[1] - knot[1]);
        }
      }
      visited.push([...knots.at(-1)]);
    }
  }

  const uniqueVisited = new Set(visited.map((pos) => pos.join())).size;
  return uniqueVisited;
}

export function part1(data) {
  const motions = getMotions(data);
  return simulateRope(motions, 2);
}

export function part2(data) {
  const motions = getMotions(data);
  return simulateRope(motions, 10);
}

console.log(part1(input), part2(input));
