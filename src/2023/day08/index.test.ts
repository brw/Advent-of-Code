import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { part1, part2 } from './index.js';
import { AocClient } from 'advent-of-code-client';

const input1 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const input2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

test('part1', () => {
  // console.log = () => {};
  expect(part1(input1)).toEqual(6);
});

test('part2', () => {
  // console.log = () => {};
  expect(part2(input2)).toEqual(6);
});

const inputPath = import.meta.dir + '/input.txt';
let inputFile = Bun.file(inputPath);

const [year, day] = import.meta.url.match(/(\d{4}).*day(\d+)/)!.slice(1);

if (process.env.AOC_TOKEN === undefined) {
  console.log('AOC_TOKEN not set');
  process.exit(1);
}

const aoc = new AocClient({
  year: Number(year),
  day: Number(day),
  token: process.env.AOC_TOKEN,
});

beforeAll(async () => {
  if (!(await inputFile.exists())) {
    await downloadInput();
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

  if (part1Result !== undefined) console.log('Part 1:', part1Result); // 16043
  if (part2Result !== undefined) console.log('Part 2:', part2Result); // 15726453850399

  const part = part2Result === undefined ? 1 : 2;
  const result = part === 1 ? part1Result : part2Result;
  Bun.spawn(['wl-copy'], { stdin: Buffer.from(String(result)) });
  if (result) {
    // await submit(day, part, result);
  }
});

async function downloadInput() {
  const input = (await aoc.getInput()) as string;
  await Bun.write(inputPath, input);
}

async function submit(day: string, part: number, result: number | string) {
  try {
    const response = await aoc.submit(part, result);
    console.log(response);
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log(error);
      return;
    }
    console.log(error.message);
  }
}
