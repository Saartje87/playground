import { Box, Stack, Text } from '@blockle/blocks';
import type { FC } from 'react';

import type { Change, JsonValue } from '../../lib/compute-diff.ts';
import { formatPath } from '../../lib/format-path.ts';
import * as styles from './change-row.css.ts';

const show = (v: JsonValue) => JSON.stringify(v);

const variants = {
  add: {
    backgroundColor: 'success-100',
    borderColor: 'success-600',
    color: 'success-900',
    badge: 'success-200',
  },
  remove: {
    backgroundColor: 'danger-100',
    borderColor: 'danger-600',
    color: 'danger-900',
    badge: 'danger-200',
  },
  replace: {
    backgroundColor: 'warning-100',
    borderColor: 'warning-600',
    color: 'warning-900',
    badge: 'warning-200',
  },
} as const;

type CodeProps = { children: string };

const Code: FC<CodeProps> = ({ children }) => {
  return (
    <Box
      asChild
      className={styles.code}
      fontFamily="mono"
      whiteSpace="pre-wrap"
    >
      <code>{children}</code>
    </Box>
  );
};

type ValueLabelProps = { children: string };

const ValueLabel: FC<ValueLabelProps> = ({ children }) => {
  return (
    <Text
      className={styles.valueLabel}
      color="text-600"
      fontFamily="body"
      fontSize="xsmall"
      fontWeight="bold"
    >
      {children}
    </Text>
  );
};

type ValueProps = { label?: string; value: JsonValue };

const Value: FC<ValueProps> = ({ label, value }) => {
  return (
    <Box className={styles.value} display="flex" flexWrap="wrap" gap={2}>
      {label && <ValueLabel>{label}</ValueLabel>}
      <Code>{show(value)}</Code>
    </Box>
  );
};

type ChangeRowProps = { change: Change };

export const ChangeRow: FC<ChangeRowProps> = ({ change }) => {
  const { badge, ...rowAtoms } = variants[change.op];

  return (
    <Box
      asChild
      className={styles.row}
      display="flex"
      flexDirection="column"
      gap={2}
      paddingBlock={2}
      paddingInline={3}
      borderRadius={1}
      {...rowAtoms}
    >
      <li>
        <Box
          asChild
          alignSelf="flex-start"
          inlineSize="fit-content"
          paddingBlock={1}
          paddingInline={2}
          backgroundColor={badge}
          borderRadius="full"
          fontSize="xsmall"
          fontWeight="bold"
          textTransform="uppercase"
        >
          <span>{change.op}</span>
        </Box>
        <Code>{formatPath(change.path)}</Code>
        <Stack className={styles.shrinkable} gap={2}>
          {change.op !== 'add' && (
            <Value
              label={change.op === 'replace' ? 'Old' : undefined}
              value={change.oldValue}
            />
          )}
          {change.op !== 'remove' && (
            <Value
              label={change.op === 'replace' ? 'New' : undefined}
              value={change.newValue}
            />
          )}
        </Stack>
      </li>
    </Box>
  );
};
