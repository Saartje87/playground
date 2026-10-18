import { describe, expect, it } from 'vitest';

import { formatPath } from './format-path';

describe('formatPath', () => {
  it('names the root', () => {
    expect(formatPath([])).toBe('(root)');
  });

  it('joins keys with dots and indexes with brackets', () => {
    expect(formatPath(['a', 'b', 0, 'c'])).toBe('a.b[0].c');
  });

  it('starts with an index when the root is an array', () => {
    expect(formatPath([2, 'x'])).toBe('[2].x');
  });
});
