function getHash(input: string) {
  let output = 0;

  for (let i = 0; i < input.length; i++) {
    const ascii = input.charCodeAt(i);
    output += ascii;
    output *= 17;
    output %= 256;
  }

  return output;
}

export function part1(data: string) {
  const sequence = data.split(',');

  let result = 0;

  for (const step of sequence) {
    result += getHash(step);
  }
  return result;
}

export function part2(data: string) {
  const sequence = data.split(',');

  const boxes: Map<number, Map<string, number>> = new Map();

  for (const step of sequence) {
    let matches = step.match(/(\w+)(-|=)(\d+)?/)!;

    const label = matches[1];
    const action = matches[2];
    const value = Number(matches[3]);

    const hash = getHash(label);
    let box = boxes.get(hash);

    if (!box) {
      box = new Map();
      boxes.set(hash, box);
    }

    if (action === '-') {
      box.delete(label);
    } else if (action === '=') {
      box.set(label, value);
    }
  }

  let result = 0;

  for (const [box, labels] of boxes.entries()) {
    let slot = 1;

    for (const value of labels.values()) {
      let labelResult = 0;

      labelResult += box + 1;
      labelResult *= slot;
      labelResult *= Number(value);

      result += labelResult;
      slot++;
    }
  }

  return result;
}
