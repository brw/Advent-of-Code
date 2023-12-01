import getInput from '../../get_input.js';

const input = getInput(import.meta.url);
const data = input.trim().split('\n');

function createTree(lines) {
  lines.push('$ cd ..');
  return parseTerminalOutput(lines)[0]['/'];
}

function parseTerminalOutput(lines, i = 0) {
  const tree = {};

  while (i < lines.length) {
    if (lines[i].startsWith('$')) {
      const [command, argument] = lines[i].split(' ').slice(1);

      if (command == 'cd') {
        if (argument == '..') {
          tree.size = Object.values(tree)
            .filter(Number)
            .reduce((a, b) => a + b);
          return [tree, i];
        } else {
          let node;
          [node, i] = parseTerminalOutput(lines, i + 1);
          tree[argument] = node;
          tree.size = (tree.size ?? 0) + node.size;
        }
      }
    } else {
      const [size, item] = lines[i].split(' ');
      if (!isNaN(size)) {
        tree[item] = Number(size);
      }
    }
    i++;
  }
  return [tree, i];
}

function getChildObjects(node) {
  return Object.values(node).filter((val) => typeof val === 'object');
}

function sumDirectories(node, maxSize) {
  let sum = 0;
  if (node.size < maxSize) {
    sum += node.size;
  }
  for (const child of getChildObjects(node)) {
    sum += sumDirectories(child, maxSize);
  }
  return sum;
}

function findDirectoryToDelete(node, spaceToDelete, candidate) {
  if (node.size > spaceToDelete && node.size < candidate) {
    candidate = node.size;
  }
  for (const child of getChildObjects(node)) {
    candidate = findDirectoryToDelete(child, spaceToDelete, candidate);
  }
  return candidate;
}

export function part1(data) {
  const tree = createTree(data);
  return sumDirectories(tree, 100000);
}

export function part2(data) {
  const tree = createTree(data);
  const TOTAL_SPACE = 70_000_000;
  const NEEDED_SPACE = 30_000_000;
  const usedSpace = tree.size;
  const unusedSpace = TOTAL_SPACE - usedSpace;
  const spaceToDelete = NEEDED_SPACE - unusedSpace;
  return findDirectoryToDelete(tree, spaceToDelete, usedSpace);
}

console.log(part1(data), part2(data));
