import { Grid, GridItem, Heading, Stack, Text } from '@blockle/blocks';
import type { FC } from 'react';

import { AppLink } from '../components/app-link/app-link';
import { projects } from '../config/projects';
import * as styles from './page.css';

const HomePage: FC = () => {
  return (
    <Stack gap={5} padding={5}>
      <Heading level={1}>Playground</Heading>

      <Grid gap={4} role="list">
        {projects.map((project) => (
          <GridItem key={project.href} colSpan={[12, 6, 4]} role="listitem">
            <AppLink href={project.href} className={styles.card}>
              <Heading level={2}>{project.title}</Heading>
              <Text>{project.description}</Text>
            </AppLink>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};

export default HomePage;
