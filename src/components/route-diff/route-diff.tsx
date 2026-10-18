'use client';

import { Box, Heading, Stack, Text } from '@blockle/blocks';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { projects } from '../../config/projects';
import { AppLink } from '../app-link/app-link';
import * as styles from './route-diff.css';

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
} as const;

type RouteRowProps = {
  op: keyof typeof variants;
  label: string;
  path: string;
  note: ReactNode;
};

const RouteRow: FC<RouteRowProps> = ({ op, label, path, note }) => {
  const { badge, ...rowAtoms } = variants[op];

  return (
    <Box
      asChild
      aria-label={label}
      borderRadius={1}
      className={styles.row}
      display="flex"
      flexDirection="column"
      gap={2}
      paddingBlock={2}
      paddingInline={3}
      {...rowAtoms}
    >
      <li>
        <Box
          asChild
          alignSelf="flex-start"
          backgroundColor={badge}
          borderRadius="full"
          fontSize="xsmall"
          fontWeight="bold"
          inlineSize="fit-content"
          paddingBlock={1}
          paddingInline={2}
          textTransform="uppercase"
        >
          <span>{op}</span>
        </Box>
        <Text className={styles.code} fontFamily="mono" tag="code">
          {path}
        </Text>
        <Text fontSize="small">{note}</Text>
      </li>
    </Box>
  );
};

export const RouteDiff: FC = () => {
  const pathname = usePathname();

  return (
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
      <section aria-labelledby="route-diff-heading">
        <div>
          <Text
            className={styles.eyebrow}
            color="primary-300"
            fontFamily="mono"
            fontSize="xsmall"
            fontWeight="bold"
          >
            ROUTE DIFF
          </Text>
          <Heading
            color="text-200"
            id="route-diff-heading"
            level={2}
            marginBlockStart={1}
          >
            Did you mean?
          </Heading>
        </div>

        <Stack className={styles.list} gap={2} tag="ul">
          <RouteRow
            op="remove"
            label={`Removed route ${pathname}`}
            path={pathname}
            note="Not found"
          />
          {projects.map((project) => (
            <RouteRow
              key={project.href}
              op="add"
              label={`Added route ${project.title}`}
              path={project.href}
              note={<AppLink href={project.href}>{project.title}</AppLink>}
            />
          ))}
        </Stack>
      </section>
    </Box>
  );
};
