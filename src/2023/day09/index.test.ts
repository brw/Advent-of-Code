import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { part1, part2, settings } from './index.js';
import { AocClient } from 'advent-of-code-client';

const inputPath = import.meta.dir + '/input.txt';
let inputFile = Bun.file(inputPath);

const _log = console.log;

const exampleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test.if((await inputFile.exists()) && settings.part1.example)('part1', () => {
  if (!settings.part1.exampleLog) {
    console.log = () => {};
  }

  expect(part1(exampleInput)).toEqual(114);
});

test.if((await inputFile.exists()) && settings.part2.example)('part2', () => {
  if (!settings.part2.exampleLog) {
    console.log = () => {};
  }

  expect(part2(exampleInput)).toEqual(2);
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

  let part1Result: number | string | undefined;
  let part2Result: number | string | undefined;

  if (settings.part1) {
    if (!settings.part1.log) {
      console.log = () => {};
    }
    part1Result = part1(input)!;
    console.log('Part 1:', part1Result);
  }
  console.log = _log;
  if (settings.part2) {
    if (!settings.part2.log) {
      console.log = () => {};
    }
    part2Result = part2(input)!;
    console.log('Part 2:', part2Result);
  }

  const part = part2Result ? 2 : 1;
  const result = part2Result ?? part1Result;

  Bun.spawn(['wl-copy'], { stdin: Buffer.from(String(result)) });

  if (result && settings[`part${part}`].submit) {
    await submit(day, part, result);
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
