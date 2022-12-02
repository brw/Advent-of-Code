#!/usr/bin/env node
import input from "./input.js";

const sum = (a, b) => a + b;

const numbers = input
  .split("\n\n")
  .map((sequence) => sequence.split("\n").map(Number).reduce(sum))
  .flat();

console.log(Math.max(...numbers));
console.log(numbers.sort().slice(-3).reduce(sum));
