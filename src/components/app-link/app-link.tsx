'use client';

import { Link, type LinkProps } from '@blockle/blocks';
import NextLink from 'next/link';

type AppLinkProps = Omit<LinkProps, 'asChild'> & { href: string };

// Blocks' asChild slotting needs both elements created on the client,
// so this wrapper must be a client component.
export function AppLink({ href, children, ...props }: AppLinkProps) {
  return (
    <Link asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </Link>
  );
}
