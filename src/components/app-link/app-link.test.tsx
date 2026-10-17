import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../test/render.tsx';
import { AppLink } from './app-link.tsx';

describe('AppLink', () => {
  it('renders a single anchor pointing at href', () => {
    renderWithTheme(<AppLink href="/compute-diff">Compute Diff</AppLink>);

    const link = screen.getByRole('link', { name: 'Compute Diff' });
    expect(link).toHaveAttribute('href', '/compute-diff');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('forwards className to the anchor', () => {
    renderWithTheme(
      <AppLink href="/" className="card">
        Home
      </AppLink>,
    );

    expect(screen.getByRole('link')).toHaveClass('card');
  });
});
