'use client';

import { usePathname } from 'next/navigation';

import { AppLink } from '../app-link/app-link.tsx';
import * as styles from './site-nav.css.ts';

export function SiteNav() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <nav className={styles.nav}>
      <AppLink href="/">← Home</AppLink>
    </nav>
  );
}
