import { Box, Heading, Stack, Text } from '@blockle/blocks';
import type { Metadata } from 'next';
import type { FC } from 'react';

import { RouteDiff } from '../components/route-diff/route-diff';
import * as styles from './not-found.css';

export const metadata: Metadata = { title: 'Page not found' };

const NotFound: FC = () => {
  return (
    <Box
      asChild
      backgroundColor="background-200"
      className={styles.page}
      paddingBlock={[5, 6]}
      paddingInline={[4, 5]}
    >
      <main>
        <Stack className={styles.content} gap={5} marginInline="auto">
          <header>
            <Text
              className={styles.eyebrow}
              color="primary-600"
              fontFamily="mono"
              fontSize="xsmall"
              fontWeight="bold"
            >
              ERROR 404
            </Text>
            <Heading
              className={styles.title}
              color="text-800"
              level={1}
              marginBlock={2}
            >
              Page not found
            </Heading>
            <Text color="text-600" fontSize="large">
              We compared your URL against every route. No match.
            </Text>
          </header>

          <RouteDiff />
        </Stack>
      </main>
    </Box>
  );
};

export default NotFound;
