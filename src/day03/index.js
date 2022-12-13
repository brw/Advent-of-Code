#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');
const rucksacks = input.split('\n').slice(0, -1);

function getPriority(item) {
  const charCode = item.charCodeAt(0);
  return charCode >= 96 ? charCode - 96 : charCode - 38;
}

const part1 = rucksacks
  .map((rucksack) => [
    new Set(rucksack.slice(0, rucksack.length / 2)),
    new Set(rucksack.slice(rucksack.length / 2, rucksack.length)),
  ])
  .reduce((total, compartments) => {
    for (const item of compartments[0]) {
      if (compartments[1].has(item)) {
        return total + getPriority(item);
      }
    }
  }, 0);

const part2 = rucksacks
  .map((rucksack) => new Set(rucksack))
  .reduce((total, rucksack, i, rucksacks) => {
    if (i % 3 !== 0) return total;
    for (const item of rucksack) {
      if (rucksacks[i + 1].has(item) && rucksacks[i + 2].has(item)) {
        return total + getPriority(item);
      }
    }
  }, 0);

console.log(part1, part2);
