import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { part1, part2 } from './index.js';

const input = ``;

test('part1', () => {
  // console.log = () => {};
  expect(part1(input)).toEqual();
});

test('part2', () => {
  // console.log = () => {};
  // expect(part2(input)).toEqual();
});

const inputPath = import.meta.dir + '/input.txt';
let inputFile = Bun.file(inputPath);

const day = import.meta.url.match(/day(\d+)/)![1];

beforeAll(async () => {
  if (!(await inputFile.exists())) {
    Bun.spawnSync(['aoc', 'download', '-I', '-d', day, '-i', inputPath], {
      stdout: 'inherit',
      stderr: 'inherit',
    });

    inputFile = Bun.file(inputPath);
  }
});

const _log = console.log;

afterEach(() => {
  if (console.log !== _log) console.log = _log;
});

afterAll(async () => {
  const input = await inputFile.text();

  // console.log = () => {};
  const part1Result = part1(input);
  console.log = _log;
  const part2Result = part2(input);

  if (part1Result !== undefined) console.log('Part 1:', part1Result); //
  if (part2Result !== undefined) console.log('Part 2:', part2Result); //

  const part = part2Result === undefined ? '1' : '2';
  const result = part === '1' ? part1Result : part2Result;
  Bun.spawn(['wl-copy'], { stdin: Buffer.from(String(result)) });
  // submit(day, part, result);
});

function submit(day: string, part: string, result: number | string) {
  Bun.spawn(['aoc', 'submit', '-d', day, part, String(result)], {
    stdout: 'inherit',
    stderr: 'inherit',
  });
}
