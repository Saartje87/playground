'use client';

import { Link, type LinkProps } from '@blockle/blocks';
import NextLink from 'next/link';
import type { FC } from 'react';

type AppLinkProps = Omit<LinkProps, 'asChild'> & { href: string };

// Blocks' asChild slotting needs both elements created on the client,
// so this wrapper must be a client component.
export const AppLink: FC<AppLinkProps> = ({ href, children, ...props }) => {
  return (
    <Link asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </Link>
  );
};
