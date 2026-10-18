'use client';

import { Box, Heading, Label, Stack, Text, Textarea } from '@blockle/blocks';
import { type FC, useEffect, useMemo, useState } from 'react';

import {
  type Change,
  computeDiff,
  type JsonValue,
} from '../../lib/compute-diff.ts';
import { formatPath } from '../../lib/format-path.ts';
import { ChangeRow } from '../change-row/change-row.tsx';
import * as styles from './compute-diff-view.css.ts';

const SAMPLE_BEFORE = `{
  "name": "barry",
  "tags": ["a", "b"],
  "address": { "city": "Groningen", "zip": "3511" }
}`;

const SAMPLE_AFTER = `{
  "name": "barry",
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

export const ComputeDiffView: FC = () => {
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
    <Box
      asChild
      backgroundColor="background-200"
      className={styles.page}
      paddingBlock={[5, 6]}
      paddingInline={[4, 5]}
    >
      <main>
        <Stack className={styles.workspace} gap={5} marginInline="auto">
          <Box asChild paddingBlockStart={4} paddingBlockEnd={3}>
            <header>
              <Text
                className={styles.eyebrow}
                color="primary-600"
                fontFamily="mono"
                fontSize="xsmall"
                fontWeight="bold"
              >
                JSON WORKSPACE
              </Text>
              <Heading
                className={styles.title}
                color="text-800"
                level={1}
                marginBlock={2}
              >
                JSON Diff
              </Heading>
              <Text color="text-600" fontSize="large">
                Compare two JSON documents. Changes update as you edit.
              </Text>
            </header>
          </Box>

          <section aria-label="JSON documents" className={styles.editors}>
            {(
              [
                {
                  id: 'before',
                  number: '01',
                  label: 'Original',
                  value: before,
                  onChange: setBefore,
                  error: parsedBefore.error,
                },
                {
                  id: 'after',
                  number: '02',
                  label: 'Modified',
                  value: after,
                  onChange: setAfter,
                  error: parsedAfter.error,
                },
              ] as const
            ).map((editor) => (
              <Box
                key={editor.id}
                backgroundColor="background-700"
                borderColor="background-600"
                borderRadius={2}
                borderStyle="solid"
                borderWidth="thin"
                boxShadow={2}
                className={styles.editor}
                display="flex"
                flexDirection="column"
                gap={2}
                padding={4}
              >
                <Label className={styles.editorLabel} htmlFor={editor.id}>
                  <Text color="text-400" fontFamily="mono" fontSize="xsmall">
                    {editor.number}
                  </Text>{' '}
                  {editor.label}
                </Label>
                <Textarea
                  id={editor.id}
                  aria-describedby={
                    editor.error ? `${editor.id}-error` : undefined
                  }
                  aria-invalid={editor.error !== null}
                  className={styles.textarea}
                  value={editor.value}
                  onChange={(e) => editor.onChange(e.target.value)}
                  spellCheck={false}
                  containerProps={{
                    className: styles.textareaWrapper,
                    flex: 1,
                  }}
                  grow
                  maxBlockSize={800}
                />
                {editor.error && (
                  <Text
                    color="danger-300"
                    fontFamily="mono"
                    fontSize="xsmall"
                    id={`${editor.id}-error`}
                    role="alert"
                    wordWrap="break-word"
                  >
                    {editor.error}
                  </Text>
                )}
              </Box>
            ))}
          </section>

          <Box
            asChild
            backgroundColor="background-700"
            borderColor="background-600"
            borderRadius={2}
            borderStyle="solid"
            borderWidth="thin"
            boxShadow={2}
            color="text-200"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={4}
          >
            <section aria-labelledby="diff-heading">
              <Box
                alignItems="flex-end"
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
              >
                <div>
                  <Text
                    className={styles.eyebrow}
                    color="primary-300"
                    fontFamily="mono"
                    fontSize="xsmall"
                    fontWeight="bold"
                  >
                    LIVE RESULTS
                  </Text>
                  <Heading
                    color="text-200"
                    id="diff-heading"
                    level={2}
                    marginBlockStart={1}
                  >
                    Diff
                  </Heading>
                </div>
                {isStale && (
                  <Box
                    backgroundColor="warning-100"
                    borderRadius={1}
                    color="warning-900"
                    fontSize="xsmall"
                    fontWeight="bold"
                    paddingBlock={1}
                    paddingInline={2}
                    role="status"
                  >
                    Showing last valid diff
                  </Box>
                )}
              </Box>

              <Box
                asChild
                backgroundColor="background-800"
                borderRadius={1}
                className={styles.summary}
                gap={2}
                padding={3}
              >
                <section aria-label="Change summary">
                  <Box
                    alignItems="baseline"
                    className={styles.total}
                    display="flex"
                    gap={2}
                  >
                    <Text color="text-200" fontSize="large" fontWeight="bold">
                      {lastChanges.length}
                    </Text>
                    <Text color="text-300" fontSize="xsmall">
                      total changes
                    </Text>
                  </Box>
                  {(
                    [
                      ['add', 'Added', 'success-300'],
                      ['remove', 'Removed', 'danger-300'],
                      ['replace', 'Replaced', 'warning-400'],
                    ] as const
                  ).map(([op, label, color]) => (
                    <Box
                      key={op}
                      alignItems="center"
                      color="text-300"
                      display="flex"
                      fontSize="xsmall"
                      fontWeight="bold"
                      gap={2}
                    >
                      <Text color={color} fontFamily="mono" fontSize="medium">
                        {counts[op]}
                      </Text>
                      <span>{label}</span>
                    </Box>
                  ))}
                </section>
              </Box>

              {lastChanges.length === 0 ? (
                <Text
                  color="text-300"
                  fontFamily="mono"
                  paddingBlock={5}
                  paddingInline={3}
                  tag="p"
                  textAlign="center"
                >
                  No differences
                </Text>
              ) : (
                <Stack className={styles.list} gap={2} tag="ul">
                  {lastChanges.map((change) => (
                    <ChangeRow
                      key={`${change.op}:${formatPath(change.path)}`}
                      change={change}
                    />
                  ))}
                </Stack>
              )}
            </section>
          </Box>
        </Stack>
      </main>
    </Box>
  );
};
