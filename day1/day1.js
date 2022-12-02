#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const input = await readFile('./input.txt', { encoding: 'utf-8' });

const sum = (a, b) => a + b;

const numbers = input.split('\n').concat('');

let sums = [];
let sequence = [];

for (const number of numbers) {
  if (number !== '') {
    sequence.push(Number(number));
  } else {
    sums.push(sequence.reduce(sum, 0));
    sequence = [];
  }
}

console.log(Math.max(...sums));
console.log(sums.sort().slice(-3).reduce(sum));
