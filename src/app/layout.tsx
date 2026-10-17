import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@blockle/blocks/reset';
import { BlocksProvider } from '@blockle/blocks';
import { momotaro } from '@blockle/blocks-theme-momotaro';

import { SiteNav } from '../components/site-nav/site-nav.tsx';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { default: 'Playground', template: '%s | Playground' },
  description: 'A collection of small experiments.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <BlocksProvider theme={momotaro}>
          <SiteNav />
          {children}
        </BlocksProvider>
      </body>
    </html>
  );
}
