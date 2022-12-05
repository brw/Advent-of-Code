import { readFileSync } from 'node:fs';

const input = readFileSync('./input.txt', 'utf-8');

const [drawing, instructions] = input.split('\n\n');

const moves = instructions
  .trim()
  .split('\n')
  .reduce(
    (moves, instruction) =>
      moves.concat([
        instruction.match(/move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/)
          .groups,
      ]),
    []
  );

// const amount = Number([...drawing.matchAll(/\d+/g)].at(-1)[0]);
// const initialState = Array(amount).fill([]);

const stacks = drawing
  .split('\n')
  .slice(0, -1)
  .reduce((stacks, line, index) => {
    for (let i = 0; i < line.length; i++) {
      if ((i - 1) % 4 == 0) {
        const stack = (i - 1) / 4;
        if (line[i] !== ' ') {
          if (!stacks[stack]) {
            stacks[stack] = [line[i]];
          } else {
            stacks[stack].push(line[i]);
          }
        }
      }
    }
    return stacks;
  }, []);

console.log(stacks);

for (const move of moves) {
  const from = move.from - 1;
  const to = move.to - 1;
  for (let i = 0; i < move.amount; i++) {
    stacks[to].unshift(stacks[from].shift());
  }
}

console.log(stacks.map((stack) => stack[0]).join(''));
