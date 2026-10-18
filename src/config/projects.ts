export type Project = {
  href: `/${string}`;
  title: string;
  description: string;
};

export const projects: Project[] = [
  {
    href: '/json-diff',
    title: 'JSON Diff',
    description: 'Compare two JSON documents and see what changed.',
  },
];
