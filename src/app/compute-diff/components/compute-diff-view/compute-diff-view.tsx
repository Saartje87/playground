'use client';

import {
  Grid,
  GridItem,
  Heading,
  Label,
  Stack,
  Text,
  Textarea,
} from '@blockle/blocks';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';

import {
  type Change,
  computeDiff,
  type JsonValue,
} from '../../lib/compute-diff.ts';
import { formatPath } from '../../lib/format-path.ts';
import { ChangeRow } from '../change-row/change-row.tsx';
import * as styles from './compute-diff-view.css.ts';

const SAMPLE_BEFORE = `{
  "name": "saartje",
  "tags": ["a", "b"],
  "address": { "city": "Utrecht", "zip": "3511" }
}`;

const SAMPLE_AFTER = `{
  "name": "saartje",
  "tags": ["a", "c", "d"],
  "address": { "city": "Amsterdam" },
  "active": true
}`;

type Parsed =
  | { value: JsonValue; error: null }
  | { value: null; error: string };

function parse(text: string): Parsed {
  try {
    return { value: JSON.parse(text) as JsonValue, error: null };
  } catch (e) {
    return {
      value: null,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

export function ComputeDiffView() {
  const [before, setBefore] = useState(SAMPLE_BEFORE);
  const [after, setAfter] = useState(SAMPLE_AFTER);
  const deferredBefore = useDeferredValue(before);
  const deferredAfter = useDeferredValue(after);

  const parsedBefore = useMemo(() => parse(deferredBefore), [deferredBefore]);
  const parsedAfter = useMemo(() => parse(deferredAfter), [deferredAfter]);

  const [lastChanges, setLastChanges] = useState<Change[]>(() =>
    computeDiff(
      JSON.parse(SAMPLE_BEFORE) as JsonValue,
      JSON.parse(SAMPLE_AFTER) as JsonValue,
    ),
  );

  // Keep the previous diff visible while either input is invalid.
  useEffect(() => {
    if (parsedBefore.error === null && parsedAfter.error === null) {
      setLastChanges(computeDiff(parsedBefore.value, parsedAfter.value));
    }
  }, [parsedBefore, parsedAfter]);

  return (
    <Stack gap={5} padding={5}>
      <Heading level={1}>Compute Diff</Heading>

      <Grid gap={4}>
        <GridItem colSpan={[12, 6]}>
          <Stack gap={2}>
            <Label htmlFor="before">Original</Label>
            <Textarea
              id="before"
              className={styles.textarea}
              value={before}
              onChange={(e) => setBefore(e.target.value)}
              spellCheck={false}
              grow
            />
            {parsedBefore.error && (
              <Text className={styles.error}>{parsedBefore.error}</Text>
            )}
          </Stack>
        </GridItem>
        <GridItem colSpan={[12, 6]}>
          <Stack gap={2}>
            <Label htmlFor="after">Modified</Label>
            <Textarea
              id="after"
              className={styles.textarea}
              value={after}
              onChange={(e) => setAfter(e.target.value)}
              spellCheck={false}
            />
            {parsedAfter.error && (
              <Text className={styles.error}>{parsedAfter.error}</Text>
            )}
          </Stack>
        </GridItem>
      </Grid>

      <Stack gap={2}>
        <Heading level={2}>Diff</Heading>
        {lastChanges.length === 0 ? (
          <Text>No differences</Text>
        ) : (
          <ul className={styles.list}>
            {lastChanges.map((change) => (
              <ChangeRow
                key={`${change.op}:${formatPath(change.path)}`}
                change={change}
              />
            ))}
          </ul>
        )}
      </Stack>
    </Stack>
  );
}
