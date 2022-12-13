/*
 * Infi - Advent of Code 2022
 * https://aoc.infi.nl/2022
 */

import getInput from '../get_input.js';

// Correctly handles negative numbers: https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
const mod = (n, m) => ((n % m) + m) % m;

function getInstructions(data) {
  return data.split('\n').map((line) => {
    const [action, amount] = line.split(' ');
    return { action, amount: Number(amount) };
  });
}

function simulateMovement(instructions, act) {
  const moves = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ];
  const pos = { x: 0, y: 0 };
  let direction = 0;

  for (const { action, amount } of instructions) {
    if (action === 'draai') {
      direction = mod(direction + amount / 45, 8);
    } else if (action === 'loop') {
      for (let i = 0; i < amount; i++) {
        const move = moves[direction];
        pos.x += move.x;
        pos.y += move.y;
        act?.(pos);
      }
    } else if (action === 'spring') {
      const move = moves[direction];
      pos.x += move.x * amount;
      pos.y += move.y * amount;
      act?.(pos);
    }
  }

  return pos;
}

export function part1(data) {
  const instructions = getInstructions(data);
  const pos = simulateMovement(instructions);
  return Math.abs(pos.x) + Math.abs(pos.y);
}

export function part2(data) {
  const instructions = getInstructions(data);
  const map = [];

  simulateMovement(instructions, (pos) => {
    map[pos.y] ||= [];
    map[pos.y][pos.x] = '#';
  });

  let mapStr = '';
  for (const line of map.reverse()) {
    for (const char of line) {
      mapStr += char || '.';
    }
    mapStr += '\n';
  }
  return mapStr;
}

const input = getInput(import.meta.url);
console.log(`${part1(input)}\n${part2(input)}`);
