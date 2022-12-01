#!/usr/bin/env node
import input from './input.js';

const sum = (a, b) => a + b;

const numbers = input.split('\n').concat('');

let sums = [];
let sequence = [];

for (const number of numbers) {
	if (number !== '') {
		sequence.push(Number(number));
	} else {
		sums.push(sequence.reduce(sum));
		sequence = [];
	}
}

console.log(Math.max(...sums));
console.log(sums.sort().slice(-3).reduce(sum));
