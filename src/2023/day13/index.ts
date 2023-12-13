function findReflection(pattern: string[], maxDiff = 0) {
  for (let i = 0; i < pattern.length - 1; i++) {
    let left = i;
    let right = i + 1;
    let diff = 0;

    while (left >= 0 && right < pattern.length && diff <= maxDiff) {
      diff += getDiff(pattern[left], pattern[right]);

      left--;
      right++;
    }

    if (diff === maxDiff) {
      return i + 1;
    }
  }

  return 0;
}

function getDiff(left: string, right: string) {
  let diff = 0;

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      diff++;
    }
  }

  return diff;
}

function transpose(pattern: string[]) {
  const result: string[] = [];

  for (let i = 0; i < pattern[0].length; i++) {
    result.push('');

    for (let j = 0; j < pattern.length; j++) {
      result[i] += pattern[j][i];
    }
  }

  return result;
}

export function part1(data: string, maxDiff = 0) {
  const patterns = data
    .trim()
    .split('\n\n')
    .map((pattern) => pattern.split('\n'));

  let result = 0;

  for (const pattern of patterns) {
    result += findReflection(pattern, maxDiff) * 100;
    result += findReflection(transpose(pattern), maxDiff);
  }

  return result;
}

export function part2(data: string) {
  return part1(data, 1);
}
