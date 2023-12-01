#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');

const pairs = input
  .split('\n')
  .slice(0, -1)
  .map((elves) =>
    elves
      .split(',')
      .map((elf) => elf.split('-').map((section) => Number(section)))
  );

const total = pairs.reduce(
  (total, elves) => {
    if (
      (elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][1]) ||
      (elves[0][0] >= elves[1][0] && elves[0][1] <= elves[1][1])
    ) {
      total.part1++ && total.part2++;
      return total;
    } else if (
      (elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][0]) ||
      (elves[0][0] >= elves[1][0] && elves[0][0] <= elves[1][1])
    ) {
      total.part2++;
      return total;
    }
    return total;
  },
  { part1: 0, part2: 0 }
);

console.log(total);
