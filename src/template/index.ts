export function part1(data: string) {}

export function part2(data: string) {}

const input = await Bun.file(import.meta.dir + './input.txt').text();
console.log(part1(input), part2(input));
