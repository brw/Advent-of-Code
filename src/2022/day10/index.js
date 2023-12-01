import getInput from '../../get_input.js';

const input = getInput(import.meta.url);

function getInstructions(data) {
  return data
    .trim()
    .split(/\s/)
    .map((e) => (!isNaN(e) ? Number(e) : e));
}

function simulateCpu(instructions, cb) {
  let x = 1;
  let addx = false;

  for (const [tick, instruction] of instructions.entries()) {
    cb(tick, x);

    if (addx === true) {
      x += instruction;
      addx = false;
    } else if (instruction === 'addx') {
      addx = true;
    }
  }
}

export function part1(data) {
  const instructions = getInstructions(data);
  let sum = 0;

  simulateCpu(instructions, (tick, x) => {
    if ((tick - 19) % 40 === 0) {
      sum += (tick + 1) * x;
    }
  });

  return sum;
}

export function part2(data) {
  const instructions = getInstructions(data);
  let screen = '';

  simulateCpu(instructions, (tick, x) => {
    screen += Math.abs((tick % 40) - x) <= 1 ? '#' : '.';
    if ((tick + 1) % 40 === 0) {
      screen += '\n';
    }
  });

  return screen;
}

console.log(`${part1(input)}\n${part2(input)}`);
