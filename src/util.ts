import { readFileSync } from 'fs';

export function getInput(url: string) {
  return readFileSync(new URL('input.txt', url), 'utf-8');
}

export function toLines(str: string) {
  return str.trim().split('\n');
}

export function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

export function logger(...args: any[]) {
  return console.log(...args), args;
}
