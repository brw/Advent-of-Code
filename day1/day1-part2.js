import input from './input.js'

const sum = arr => arr.reduce((a, b) => a + b);

const numbers = input.split('\n').concat('');
let sums = [];
let sequence = [];

for (const number of numbers) {
	if (number !== '') {
		sequence.push(Number(number));
	} else {
		sums.push(sum(sequence));
		sequence = [];
	}
}

console.log(sum(sums.sort().slice(-3))); // 212520
