import type { Metadata } from 'next';
import type { FC } from 'react';

import { JsonDiffView } from './components/json-diff-view/json-diff-view';

export const metadata: Metadata = { title: 'JSON Diff' };

const JsonDiffPage: FC = () => {
  return <JsonDiffView />;
};

export default JsonDiffPage;
