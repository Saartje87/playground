import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test/render';
import NotFound from './not-found';

vi.mock('next/navigation', () => ({
  usePathname: () => '/missing',
}));

describe('NotFound', () => {
  it('tells the visitor the page does not exist', () => {
    renderWithTheme(<NotFound />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument();
    expect(screen.getByText('/missing')).toBeInTheDocument();
  });
});
