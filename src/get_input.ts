import { readFileSync } from 'fs';

export default function getInput(url: string) {
  return readFileSync(new URL('input.txt', url), 'utf-8');
}
