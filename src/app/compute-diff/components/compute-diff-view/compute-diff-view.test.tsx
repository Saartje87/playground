import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../../test/render.tsx';
import { ComputeDiffView } from './compute-diff-view.tsx';

describe('ComputeDiffView', () => {
  it('shows the diff of the sample inputs', () => {
    renderWithTheme(<ComputeDiffView />);

    expect(
      screen.getByRole('heading', { name: 'JSON Diff' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Diff' })).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();

    const summary = screen.getByLabelText('Change summary');
    expect(within(summary).getByText('5')).toBeInTheDocument();
    expect(within(summary).getByText('total changes')).toBeInTheDocument();
    expect(within(summary).getByText('Added')).toBeInTheDocument();
    expect(within(summary).getByText('Removed')).toBeInTheDocument();
    expect(within(summary).getByText('Replaced')).toBeInTheDocument();
  });

  it('reports no differences when both sides are equal', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComputeDiffView />);

    await user.clear(screen.getByLabelText('01 Original'));
    await user.clear(screen.getByLabelText('02 Modified'));
    await user.click(screen.getByLabelText('01 Original'));
    await user.paste('{"a":1}');
    await user.click(screen.getByLabelText('02 Modified'));
    await user.paste('{"a":1}');

    expect(await screen.findByText('No differences')).toBeInTheDocument();
  });

  it('shows a parse error and keeps the previous diff for invalid JSON', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComputeDiffView />);

    await user.clear(screen.getByLabelText('02 Modified'));
    await user.click(screen.getByLabelText('02 Modified'));
    await user.paste('{ nope');

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('Showing last valid diff')).toBeInTheDocument();
  });
});
