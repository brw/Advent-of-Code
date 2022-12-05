#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');

const outcomes = {
  AX: [4, 3],
  AY: [8, 4],
  AZ: [3, 8],
  BX: [1, 1],
  BY: [5, 5],
  BZ: [9, 9],
  CX: [7, 2],
  CY: [2, 6],
  CZ: [6, 7],
};

const matches = input.replaceAll(' ', '').split('\n');
const scores = matches.reduce(
  (totals, match) => {
    if (!match) return totals;
    totals[0] += outcomes[match][0];
    totals[1] += outcomes[match][1];
    return totals;
  },
  [0, 0]
);

console.log(scores);
