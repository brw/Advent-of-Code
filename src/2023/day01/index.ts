import getInput from '../../get_input.ts';

export function part1(data: string) {
  let sum = 0;

  for (const line of data.trim().split('\n')) {
    const digits = line.replace(/\D+/g, '');

    if (digits) {
      sum += Number(digits.at(0) + digits.at(-1)!);
    }
  }

  return sum;
}

export function part2(data: string) {
  const MAP: { [key: string]: string } = {
    one: 'o1e',
    two: 't2o',
    three: 'thr3e',
    four: '4',
    five: 'fi5e',
    six: '6',
    seven: 'sev7n',
    eight: 'eig8t',
    nine: 'ni9e',
  } as const;

  let sum = 0;

  const digitsRegex = new RegExp(`(${Object.keys(MAP).join('|')})`, 'g');
  for (const line of data.trim().split('\n')) {
    const digits = line
      .replace(digitsRegex, (key) => MAP[key])
      .replace(digitsRegex, (key) => MAP[key])
      .replace(/\D+/g, '');

    if (digits) {
      sum += Number(digits.at(0) + digits.at(-1)!);
    }
  }

  return sum;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 55208 54578
