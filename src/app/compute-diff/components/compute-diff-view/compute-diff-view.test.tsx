import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../../test/render.tsx';
import { ComputeDiffView } from './compute-diff-view.tsx';

describe('ComputeDiffView', () => {
  it('shows the diff of the sample inputs', () => {
    renderWithTheme(<ComputeDiffView />);

    expect(screen.getByRole('heading', { name: 'Diff' })).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('reports no differences when both sides are equal', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComputeDiffView />);

    await user.clear(screen.getByLabelText('Original'));
    await user.clear(screen.getByLabelText('Modified'));
    await user.click(screen.getByLabelText('Original'));
    await user.paste('{"a":1}');
    await user.click(screen.getByLabelText('Modified'));
    await user.paste('{"a":1}');

    expect(await screen.findByText('No differences')).toBeInTheDocument();
  });

  it('shows a parse error and keeps the previous diff for invalid JSON', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComputeDiffView />);

    await user.clear(screen.getByLabelText('Modified'));
    await user.click(screen.getByLabelText('Modified'));
    await user.paste('{ nope');

    await waitFor(() =>
      expect(screen.getByText(/JSON|Expected|Unexpected/)).toBeInTheDocument(),
    );
    expect(screen.getByText('active')).toBeInTheDocument();
  });
});
