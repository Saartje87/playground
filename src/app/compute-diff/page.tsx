import type { Metadata } from 'next';

import { ComputeDiffView } from './components/compute-diff-view/compute-diff-view.tsx';

export const metadata: Metadata = { title: 'Compute Diff' };

export default function ComputeDiffPage() {
  return <ComputeDiffView />;
}
