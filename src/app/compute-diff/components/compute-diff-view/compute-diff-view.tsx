'use client';

import { Heading, Label, Stack, Text, Textarea } from '@blockle/blocks';
import { useEffect, useMemo, useState } from 'react';

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
  const parsedBefore = useMemo(() => parse(before), [before]);
  const parsedAfter = useMemo(() => parse(after), [after]);

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

  const isStale = parsedBefore.error !== null || parsedAfter.error !== null;
  const counts = lastChanges.reduce(
    (summary, change) => {
      summary[change.op]++;
      return summary;
    },
    { add: 0, remove: 0, replace: 0 },
  );

  return (
    <main className={styles.page}>
      <Stack className={styles.workspace} gap={5}>
        <header className={styles.hero}>
          <Text className={styles.eyebrow}>JSON WORKSPACE</Text>
          <Heading className={styles.title} level={1}>
            JSON Diff
          </Heading>
          <Text className={styles.subtitle}>
            Compare two JSON documents. Changes update as you edit.
          </Text>
        </header>

        <section aria-label="JSON documents" className={styles.editors}>
          <Stack className={styles.editor} gap={2}>
            <Label className={styles.editorLabel} htmlFor="before">
              <span className={styles.editorNumber}>01</span> Original
            </Label>
            <Textarea
              id="before"
              aria-describedby={parsedBefore.error ? 'before-error' : undefined}
              aria-invalid={parsedBefore.error !== null}
              className={styles.textarea}
              value={before}
              onChange={(e) => setBefore(e.target.value)}
              spellCheck={false}
              grow
              maxHeight={800}
            />
            {parsedBefore.error && (
              <Text className={styles.error} id="before-error" role="alert">
                {parsedBefore.error}
              </Text>
            )}
          </Stack>

          <Stack className={styles.editor} gap={2}>
            <Label className={styles.editorLabel} htmlFor="after">
              <span className={styles.editorNumber}>02</span> Modified
            </Label>
            <Textarea
              id="after"
              aria-describedby={parsedAfter.error ? 'after-error' : undefined}
              aria-invalid={parsedAfter.error !== null}
              className={styles.textarea}
              value={after}
              onChange={(e) => setAfter(e.target.value)}
              spellCheck={false}
              grow
              maxHeight={800}
            />
            {parsedAfter.error && (
              <Text className={styles.error} id="after-error" role="alert">
                {parsedAfter.error}
              </Text>
            )}
          </Stack>
        </section>

        <section aria-labelledby="diff-heading" className={styles.results}>
          <div className={styles.resultsHeading}>
            <div>
              <Text className={`${styles.eyebrow} ${styles.resultEyebrow}`}>
                LIVE RESULTS
              </Text>
              <Heading
                className={styles.resultsTitle}
                id="diff-heading"
                level={2}
              >
                Diff
              </Heading>
            </div>
            {isStale && (
              <Text className={styles.stale} role="status">
                Showing last valid diff
              </Text>
            )}
          </div>

          <section aria-label="Change summary" className={styles.summary}>
            <div className={styles.total}>
              <span className={styles.totalCount}>{lastChanges.length}</span>
              <span className={styles.totalLabel}>total changes</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.addCount}>{counts.add}</span>
              <span>Added</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.removeCount}>{counts.remove}</span>
              <span>Removed</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.replaceCount}>{counts.replace}</span>
              <span>Replaced</span>
            </div>
          </section>

          {lastChanges.length === 0 ? (
            <Text className={styles.emptyState}>No differences</Text>
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
        </section>
      </Stack>
    </main>
  );
}
