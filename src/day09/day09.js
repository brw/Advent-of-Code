import getInput from '../get_input.js';

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
  const xD = { R: 1, L: -1, U: 0, D: 0 };
  const yD = { U: 1, D: -1, R: 0, L: 0 };

  for (const [direction, steps] of motions) {
    const headXd = xD[direction];
    const headYd = yD[direction];
    for (let i = 0; i < steps; i++) {
      head[0] += headXd;
      head[1] += headYd;
      for (let j = 1; j < knots.length; j++) {
        const knot = knots[j];
        const prevKnot = knots[j - 1];
        if (!(nextTo(knot[0] - prevKnot[0]) && nextTo(knot[1] - prevKnot[1]))) {
          knot[0] +=
            knot[0] === prevKnot[0] ? 0 : Math.sign(prevKnot[0] - knot[0]);
          knot[1] +=
            knot[1] === prevKnot[1] ? 0 : Math.sign(prevKnot[1] - knot[1]);
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
