import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { part1, part2 } from './index.js';
import { AocClient } from 'advent-of-code-client';

const inputPath = import.meta.dir + '/input.txt';
let inputFile = Bun.file(inputPath);

const _log = console.log;

const exampleInput = ``;

test.if(await inputFile.exists())('part1', () => {
  // console.log = () => {};
  expect(part1(exampleInput)).toEqual();
});

test.if(await inputFile.exists())('part2', () => {
  // console.log = () => {};
  // expect(part2(exampleInput)).toEqual();
});

afterEach(() => {
  if (console.log !== _log) console.log = _log;
});

//
// Everything below is related to downloading the input and submitting the result
//

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

afterAll(async () => {
  if (!(await inputFile.exists())) return;

  const input = await inputFile.text();

  // console.log = () => {};
  const part1Result = part1(input);
  console.log = _log;
  const part2Result = part2(input);

  console.log('Part 1:', part1Result); //
  console.log('Part 2:', part2Result); //

  const part = part2Result === undefined ? 1 : 2;
  const result = part === 1 ? part1Result : part2Result;

  Bun.spawn(['wl-copy'], { stdin: Buffer.from(String(result)) });

  if (result !== undefined && result) {
    // await submit(day, part, result);
  }
});

async function downloadInput() {
  try {
    const input = (await aoc.getInput()) as string;
    await Bun.write(inputPath, input);
    inputFile = Bun.file(inputPath);
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log(error);
      return;
    }
    console.log(error.message);
  }
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
