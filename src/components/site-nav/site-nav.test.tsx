import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../../test/render.tsx';
import { SiteNav } from './site-nav.tsx';

const pathname = vi.hoisted(() => ({ current: '/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

describe('SiteNav', () => {
  it('links back to the homepage on a project page', () => {
    pathname.current = '/json-diff';
    renderWithTheme(<SiteNav />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders nothing on the homepage', () => {
    pathname.current = '/';
    renderWithTheme(<SiteNav />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
