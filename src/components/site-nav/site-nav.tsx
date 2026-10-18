'use client';

import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { AppLink } from '../app-link/app-link';
import * as styles from './site-nav.css';

export const SiteNav: FC = () => {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <nav className={styles.nav}>
      <AppLink href="/">← Home</AppLink>
    </nav>
  );
};
