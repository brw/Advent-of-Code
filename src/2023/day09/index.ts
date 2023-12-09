// prettier-ignore
export const settings = { 
  part1: { // 1921197370
    example:    true,
    exampleLog: true,
    log:        true,
    submit:     true,
  },
  part2: { // 1124
    example:    true,
    exampleLog: true,
    log:        true,
    submit:     true,
  },
}

export function part1(data: string) {
  const lines = data.trim().split('\n');
  const next = [];

  for (const line of lines) {
    const layers = createDifferenceLayer(line);

    for (let i = layers.length - 2; i >= 0; i--) {
      const layer = layers[i];
      const prevLayer = layers[i + 1];
      layer.push(layer.at(-1)! + prevLayer.at(-1)!);
    }

    next.push(layers[0].at(-1)!);
  }

  return next.reduce((a, b) => a + b);
}

export function part2(data: string) {
  const lines = data.trim().split('\n');
  const next = [];

  for (const line of lines) {
    const layers = createDifferenceLayer(line);

    for (let i = layers.length - 2; i >= 0; i--) {
      const layer = layers[i];
      const prevLayer = layers[i + 1];
      layer.unshift(layer.at(0)! - prevLayer.at(0)!);
    }

    next.push(layers[0].at(0)!);
  }

  return next.reduce((a, b) => a + b);
}

function createDifferenceLayer(line: string) {
  let values = line.split(' ').map((v) => Number(v));
  const layers = [values];

  while (true) {
    const differences = values.reduce((acc, curr, i, arr) => {
      if (i === 0) return acc;

      const difference = curr - arr[i - 1];
      acc.push(difference);
      return acc;
    }, [] as number[]);

    layers.push(differences);

    if (differences.every((d) => d === 0)) {
      break;
    }

    values = differences;
  }

  return layers;
}

function printLayers(layers: number[][]) {
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    console.log(' '.repeat(i) + layer.join(' '));
  }
  console.log();
}
