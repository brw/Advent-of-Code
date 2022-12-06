import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');
const stream = input.trim();

function findMarker(stream, distinct) {
  for (let i = distinct; i < stream.length; i++) {
    const subset = stream.slice(i - distinct, i);
    if (new Set(subset).size === subset.length) {
      return i;
    }
  }
}

function part1(stream) {
  return findMarker(stream, 4);
}

function part2(stream) {
  return findMarker(stream, 14);
}

console.log(part1(stream), part2(stream));
