/*
 * Infi - Advent of Code 2022
 * https://aoc.infi.nl/2022
 */

import getInput from '../../get_input.js';

// Correctly handles negative numbers: https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
const mod = (n, m) => ((n % m) + m) % m;

const getInstructions = (data) =>
  data
    .trim()
    .split('\n')
    .map((line) => {
      const [action, amount] = line.split(' ');
      return { action, amount: Number(amount) };
    });

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
  const actions = {
    draai: (degrees) => {
      direction = mod(direction + degrees / 45, 8);
    },
    loop: (distance) => {
      for (let i = 0; i < distance; i++) {
        const move = moves[direction];
        pos.x += move.x;
        pos.y += move.y;
        act?.(pos);
      }
    },
    spring: (distance) => {
      const move = moves[direction];
      pos.x += move.x * distance;
      pos.y += move.y * distance;
      act?.(pos);
    },
  };

  for (const { action, amount } of instructions) {
    actions[action](amount);
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
