import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');

function parseInput(input) {
  let [stacks, moves] = input.split('\n\n');

  moves = moves
    .trim()
    .split('\n')
    .reduce((moves, move) => moves.concat([parseMove(move)]), []);

  stacks = stacks
    .split('\n')
    .slice(0, -1)
    .reduce((stacks, line) => {
      for (let i = 0; i < line.length; i++) {
        if ((i - 1) % 4 == 0) {
          const idx = (i - 1) / 4;
          if (line[i] !== ' ') {
            if (!stacks[idx]) {
              stacks[idx] = [line[i]];
            } else {
              stacks[idx].unshift(line[i]);
            }
          }
        }
      }
      return stacks;
    }, []);
  return { moves, stacks };
}

function parseMove(move) {
  return move.match(/move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/)
    .groups;
}

function part1(input) {
  const { moves, stacks } = parseInput(input);

  for (const move of moves) {
    const from = move.from - 1;
    const to = move.to - 1;
    for (let i = 0; i < move.amount; i++) {
      stacks[to].push(stacks[from].pop());
    }
  }

  return stacks.map((stack) => stack.at(-1)).join('');
}

function part2(input) {
  const { moves, stacks } = parseInput(input);

  for (const move of moves) {
    const from = move.from - 1;
    const to = move.to - 1;
    stacks[to].push(...stacks[from].slice(-move.amount));
    stacks[from] = stacks[from].slice(0, stacks[from].length - move.amount);
  }

  return stacks.map((stack) => stack.at(-1)).join('');
}

console.log(part1(input), part2(input));
