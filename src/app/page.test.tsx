import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { projects } from '../config/projects.ts';
import { renderWithTheme } from '../test/render.tsx';
import HomePage from './page.tsx';

describe('HomePage', () => {
  it('links to every registered project', () => {
    renderWithTheme(<HomePage />);

    for (const project of projects) {
      expect(
        screen.getByRole('link', { name: new RegExp(project.title) }),
      ).toHaveAttribute('href', project.href);
    }
  });

  it('lists the projects as list items', () => {
    renderWithTheme(<HomePage />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(projects.length);
  });
});
