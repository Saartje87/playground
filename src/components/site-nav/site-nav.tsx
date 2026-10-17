import { AppLink } from '../app-link/app-link.tsx';
import * as styles from './site-nav.css.ts';

export function SiteNav() {
  return (
    <nav className={styles.nav}>
      <AppLink href="/">← Home</AppLink>
    </nav>
  );
}
