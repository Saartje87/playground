import type { Path } from './compute-diff';

export function formatPath(path: Path): string {
  if (path.length === 0) return '(root)';
  return path.reduce<string>(
    (acc, part, i) =>
      typeof part === 'number'
        ? `${acc}[${part}]`
        : i === 0
          ? part
          : `${acc}.${part}`,
    '',
  );
}
