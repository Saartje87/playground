export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

export type Path = (string | number)[];

export type Change =
  | { op: 'add'; path: Path; newValue: JsonValue }
  | { op: 'remove'; path: Path; oldValue: JsonValue }
  | { op: 'replace'; path: Path; oldValue: JsonValue; newValue: JsonValue };

type JsonObject = { [key: string]: JsonValue };

const isArray = (v: JsonValue): v is JsonValue[] => Array.isArray(v);
const isObject = (v: JsonValue): v is JsonObject =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Compares two parsed JSON values. Arrays are compared by index, object key
 * order is ignored, and a type change is a single `replace`.
 * Returns `[]` when the values are equal.
 */
export function computeDiff(before: JsonValue, after: JsonValue): Change[] {
  const changes: Change[] = [];
  walk(before, after, [], changes);
  return changes;
}

function walk(
  before: JsonValue,
  after: JsonValue,
  path: Path,
  changes: Change[],
): void {
  if (isArray(before) && isArray(after)) {
    const length = Math.max(before.length, after.length);
    for (let i = 0; i < length; i++) {
      if (i >= before.length) {
        changes.push({ op: 'add', path: [...path, i], newValue: after[i] });
      } else if (i >= after.length) {
        changes.push({ op: 'remove', path: [...path, i], oldValue: before[i] });
      } else {
        walk(before[i], after[i], [...path, i], changes);
      }
    }
    return;
  }

  if (isObject(before) && isObject(after)) {
    for (const key of Object.keys(before)) {
      if (!Object.hasOwn(after, key)) {
        changes.push({
          op: 'remove',
          path: [...path, key],
          oldValue: before[key],
        });
      } else {
        walk(before[key], after[key], [...path, key], changes);
      }
    }
    for (const key of Object.keys(after)) {
      if (!Object.hasOwn(before, key)) {
        changes.push({ op: 'add', path: [...path, key], newValue: after[key] });
      }
    }
    return;
  }

  if (before !== after) {
    changes.push({ op: 'replace', path, oldValue: before, newValue: after });
  }
}
