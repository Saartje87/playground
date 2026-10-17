import { Heading, Stack, Text } from '@blockle/blocks';

import { AppLink } from '../components/app-link/app-link.tsx';
import { projects } from '../config/projects.ts';
import * as styles from './page.css.ts';

export default function HomePage() {
  return (
    <Stack gap={5} padding={5}>
      <Heading level={1}>Playground</Heading>

      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.href}>
            <AppLink href={project.href} className={styles.card}>
              <Heading level={2}>{project.title}</Heading>
              <Text>{project.description}</Text>
            </AppLink>
          </li>
        ))}
      </ul>
    </Stack>
  );
}
