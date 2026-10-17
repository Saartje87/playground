import type { Metadata } from 'next';
import type { FC } from 'react';

import { ComputeDiffView } from './components/compute-diff-view/compute-diff-view.tsx';

export const metadata: Metadata = { title: 'JSON Diff' };

const ComputeDiffPage: FC = () => {
  return <ComputeDiffView />;
};

export default ComputeDiffPage;
