import input from './input.js'

const numbers = input.split('\n').concat('');
let current = 0;
let highest = 0;

for (const number of numbers) {
	if (number !== '') {
		current += Number(number);
	} else {
		if (current > highest)
			highest = current;
		current = 0;
	}
}

console.log(highest); // 72017
