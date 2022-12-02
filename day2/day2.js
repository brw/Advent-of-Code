import input from './input.js'

const outcomes = {
	'AX': [4, 3],
	'AY': [8, 4],
	'AZ': [3, 8],
	'BX': [1, 1],
	'BY': [5, 5],
	'BZ': [9, 9],
	'CX': [7, 2],
	'CY': [2, 6],
	'CZ': [6, 7],
}

const matches = input.replace(/ /g, '').split('\n')
const scores = matches.reduce((totals, match) => {
	totals[0] += outcomes[match][0]
	totals[1] += outcomes[match][1]
	return totals
}, [0, 0])

console.log(scores);
