import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { part1, part2 } from './index.js';
import { AocClient } from 'advent-of-code-client';

// prettier-ignore
export const settings = { 
  part1: {
    example:    true,
    exampleLog: true,
    real:       true, // 6757
    log:        true,
    submit:     false,
  },
  part2: {
    example:    true,
    exampleLog: true,
    real:       true, // 523
    log:        false,
    submit:     false,
  },
}

const inputPath = import.meta.dir + '/input.txt';
let inputFile = Bun.file(inputPath);

const _log = console.log;

const exampleInput1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const exampleInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const exampleInput3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const exampleInput4 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const exampleInput5 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

test.if((await inputFile.exists()) && settings.part1.example)('part1', () => {
  if (!settings.part1.exampleLog) {
    console.log = () => {};
  }

  expect(part1(exampleInput1)).toEqual(4);
  expect(part1(exampleInput2)).toEqual(8);
});

test.if((await inputFile.exists()) && settings.part2.example)('part2', () => {
  if (!settings.part2.exampleLog) {
    console.log = () => {};
  }

  expect(part2(exampleInput3)).toEqual(4);
  expect(part2(exampleInput4)).toEqual(8);
  expect(part2(exampleInput5)).toEqual(10);
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

  if (settings.part1.real) {
    if (settings.part1.log) {
      console.log = _log;
    } else {
      console.log = () => {};
    }

    part1Result = part1(input)!;
    console.log('Part 1:', part1Result);
  }

  if (settings.part2.real) {
    if (settings.part2.log) {
      console.log = _log;
    } else {
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
