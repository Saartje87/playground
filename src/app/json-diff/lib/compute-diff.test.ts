import { describe, expect, it } from 'vitest';

import { computeDiff } from './compute-diff.ts';

describe('computeDiff', () => {
  it('returns [] for equal values', () => {
    expect(
      computeDiff({ a: [1, { b: null }] }, { a: [1, { b: null }] }),
    ).toEqual([]);
    expect(computeDiff(1, 1)).toEqual([]);
    expect(computeDiff(null, null)).toEqual([]);
  });

  it('replaces a changed primitive at the root with an empty path', () => {
    expect(computeDiff(1, 2)).toEqual([
      { op: 'replace', path: [], oldValue: 1, newValue: 2 },
    ]);
  });

  it('detects added, removed and replaced object keys', () => {
    expect(computeDiff({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual([
      { op: 'remove', path: ['a'], oldValue: 1 },
      { op: 'replace', path: ['b'], oldValue: 2, newValue: 3 },
      { op: 'add', path: ['c'], newValue: 4 },
    ]);
  });

  it('ignores object key order', () => {
    expect(computeDiff({ a: 1, b: 2 }, { b: 2, a: 1 })).toEqual([]);
  });

  it('recurses into nested objects', () => {
    expect(computeDiff({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toEqual(
      [{ op: 'replace', path: ['a', 'b', 'c'], oldValue: 1, newValue: 2 }],
    );
  });

  it('compares arrays by index', () => {
    expect(computeDiff([1, 2, 3], [1, 9, 3])).toEqual([
      { op: 'replace', path: [1], oldValue: 2, newValue: 9 },
    ]);
  });

  it('adds and removes trailing array items', () => {
    expect(computeDiff([1], [1, 2, 3])).toEqual([
      { op: 'add', path: [1], newValue: 2 },
      { op: 'add', path: [2], newValue: 3 },
    ]);
    expect(computeDiff([1, 2, 3], [1])).toEqual([
      { op: 'remove', path: [1], oldValue: 2 },
      { op: 'remove', path: [2], oldValue: 3 },
    ]);
  });

  it('shows a front insert as a cascade of replaces', () => {
    expect(computeDiff([1, 2], [0, 1, 2])).toEqual([
      { op: 'replace', path: [0], oldValue: 1, newValue: 0 },
      { op: 'replace', path: [1], oldValue: 2, newValue: 1 },
      { op: 'add', path: [2], newValue: 2 },
    ]);
  });

  it('uses numeric indexes and string keys in nested paths', () => {
    expect(
      computeDiff({ users: [{ name: 'a' }] }, { users: [{ name: 'b' }] }),
    ).toEqual([
      {
        op: 'replace',
        path: ['users', 0, 'name'],
        oldValue: 'a',
        newValue: 'b',
      },
    ]);
  });

  it('reports a type change as a single replace', () => {
    expect(computeDiff({ a: { x: 1 } }, { a: [1] })).toEqual([
      { op: 'replace', path: ['a'], oldValue: { x: 1 }, newValue: [1] },
    ]);
    expect(computeDiff({ a: 1 }, { a: '1' })).toEqual([
      { op: 'replace', path: ['a'], oldValue: 1, newValue: '1' },
    ]);
    expect(computeDiff({ a: {} }, { a: null })).toEqual([
      { op: 'replace', path: ['a'], oldValue: {}, newValue: null },
    ]);
  });

  it('treats null and a missing key as different', () => {
    expect(computeDiff({ a: null }, {})).toEqual([
      { op: 'remove', path: ['a'], oldValue: null },
    ]);
    expect(computeDiff({}, { a: null })).toEqual([
      { op: 'add', path: ['a'], newValue: null },
    ]);
  });

  it('handles keys that look special', () => {
    expect(computeDiff({ 'a/b': 1, '~': 1 }, { 'a/b': 2, '~': 1 })).toEqual([
      { op: 'replace', path: ['a/b'], oldValue: 1, newValue: 2 },
    ]);
    expect(computeDiff({}, JSON.parse('{"__proto__": 1}'))).toEqual([
      { op: 'add', path: ['__proto__'], newValue: 1 },
    ]);
  });
});
