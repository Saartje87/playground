import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../../test/render.tsx';
import { ChangeRow } from './change-row.tsx';

describe('ChangeRow', () => {
  it('shows the new value for an add', () => {
    renderWithTheme(
      <ul>
        <ChangeRow change={{ op: 'add', path: ['a', 0], newValue: 1 }} />
      </ul>,
    );

    expect(screen.getByText('add')).toBeInTheDocument();
    expect(screen.getByText('a[0]')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows the old value for a remove', () => {
    renderWithTheme(
      <ul>
        <ChangeRow change={{ op: 'remove', path: ['k'], oldValue: 'x' }} />
      </ul>,
    );

    expect(screen.getByText('"x"')).toBeInTheDocument();
  });

  it('labels old and new values for a replace, and names the root', () => {
    renderWithTheme(
      <ul>
        <ChangeRow
          change={{ op: 'replace', path: [], oldValue: 1, newValue: 2 }}
        />
      </ul>,
    );

    expect(screen.getByText('(root)')).toBeInTheDocument();
    expect(screen.getByText('Old')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
