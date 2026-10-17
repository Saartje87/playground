export type Project = {
  href: `/${string}`;
  title: string;
  description: string;
};

export const projects: Project[] = [
  {
    href: '/compute-diff',
    title: 'Compute Diff',
    description: 'Compare two JSON documents and see what changed.',
  },
];
