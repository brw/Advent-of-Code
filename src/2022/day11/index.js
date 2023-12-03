import { getInput } from '../../util.js';

const input = getInput(import.meta.url);

function parseMonkeys(data) {
  return data
    .trim()
    .split('\n\n')
    .map((section) => section.split('\n'))
    .reduce((monkeys, lines) => {
      monkeys.push({
        items: lines[1].match(/\d+/g).map((n) => +n),
        op: lines[2].match(/[*+]|\d+/g).map((n, i) => (i === 1 ? +n : n)),
        test: {
          div: +lines[3].match(/\d+/)[0],
          true: +lines[4].match(/\d+/)[0],
          false: +lines[5].match(/\d+/)[0],
        },
        inspected: 0,
      });
      return monkeys;
    }, []);
}

function simulateRounds(monkeys, rounds, bored) {
  for (let round = 0; round < rounds; round++) {
    for (const monkey of monkeys) {
      for (let i = 0; i < monkey.items.length; i++) {
        const num = monkey.op[1] ?? monkey.items[i];
        if (monkey.op[0] === '+') {
          monkey.items[i] += num;
        } else if (monkey.op[0] === '*') {
          monkey.items[i] *= num;
        }
        monkey.items[i] = bored(monkey.items[i]);
        if (monkey.items[i] % monkey.test.div === 0) {
          monkeys[monkey.test.true].items.push(monkey.items[i]);
        } else {
          monkeys[monkey.test.false].items.push(monkey.items[i]);
        }
        monkey.inspected++;
      }
      monkey.items = [];
    }
  }
  return monkeys;
}

function sortInspected(monkeys) {
  return monkeys.map((monkey) => monkey.inspected).sort((a, b) => b - a);
}

export function part1(data) {
  const monkeys = parseMonkeys(data);
  const results = simulateRounds(monkeys, 20, (item) => Math.floor(item / 3));
  const inspected = sortInspected(results);
  return inspected[0] * inspected[1];
}

export function part2(data) {
  const monkeys = parseMonkeys(data);
  const common = monkeys.reduce((total, monkey) => total * monkey.test.div, 1);
  const results = simulateRounds(monkeys, 10000, (item) => item % common);
  const inspected = sortInspected(results);
  return inspected[0] * inspected[1];
}

console.log(part1(input), part2(input));
