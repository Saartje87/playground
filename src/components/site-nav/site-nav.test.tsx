import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../test/render.tsx';
import { SiteNav } from './site-nav.tsx';

describe('SiteNav', () => {
  it('links back to the homepage', () => {
    renderWithTheme(<SiteNav />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
