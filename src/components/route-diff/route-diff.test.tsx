import { screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { projects } from '../../config/projects';
import { renderWithTheme } from '../../test/render';
import { RouteDiff } from './route-diff';

vi.mock('next/navigation', () => ({
  usePathname: () => '/compute-diff',
}));

describe('RouteDiff', () => {
  it('shows the requested path as removed', () => {
    renderWithTheme(<RouteDiff />);

    const removed = screen.getByRole('listitem', { name: /removed/i });
    expect(within(removed).getByText('/compute-diff')).toBeInTheDocument();
  });

  it('suggests every project as an added route', () => {
    renderWithTheme(<RouteDiff />);

    const added = screen.getAllByRole('listitem', { name: /added/i });
    expect(added).toHaveLength(projects.length);
    for (const project of projects) {
      expect(
        screen.getByRole('link', { name: new RegExp(project.title) }),
      ).toHaveAttribute('href', project.href);
    }
  });
});
