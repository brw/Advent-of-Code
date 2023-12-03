import getInput from '../../get_input.js';

export function part1(data) {
  const numbers = data.split('\n').map((line) => {
    const digits = line.replace(/\D+/g, '');
    return digits ? Number(digits.at(0) + digits.at(-1)) : 0;
  });

  return numbers.reduce((a, b) => a + b);
}

export function part2(data) {
  const map = {
    one: 'o1e',
    two: 't2o',
    three: 'thr3e',
    four: '4',
    five: 'fi5e',
    six: '6',
    seven: 'sev7n',
    eight: 'eig8t',
    nine: 'ni9e',
  };

  const digitsRegex = new RegExp(`(${Object.keys(map).join('|')})`, 'g');
  const numbers = data.split('\n').map((line) => {
    const digits = line
      .replace(digitsRegex, (key) => map[key])
      .replace(digitsRegex, (key) => map[key])
      .replace(/\D+/g, '');
    return digits ? Number(digits.at(0) + digits.at(-1)) : 0;
  });

  return numbers.reduce((a, b) => a + b);
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 55208 54578
