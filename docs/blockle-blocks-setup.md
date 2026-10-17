# Using Blockle Blocks with Next.js

This guide documents the setup used in the Retro project for `@blockle/blocks`
with Next.js App Router and Vanilla Extract.

For component selection and usage examples, see the
[Blockle Blocks component guide](./components/README.md).

## Requirements

- Node.js `20.19.0+`, `22.12.9+`, or `24.2.0+`
- React and React DOM `19.1.0+`
- Next.js 16 for the Turbopack configuration shown below

Retro uses `@blockle/blocks`. Its package also declares peer dependencies on
`@blockle/blocks-core`,
`@blockle/blocks-react`, `@blockle/blocks-react-slot`, and
`@blockle/blocks-reset`. The package manager should resolve these when
installing the package; check its output for peer dependency warnings.

## 1. Install the packages

Install the Blocks library, the theme used by Retro, and Vanilla Extract:

```bash
npm install @blockle/blocks @blockle/blocks-theme-momotaro @vanilla-extract/css
npm install --save-dev @vanilla-extract/next-plugin
```

Retro's package manifest used these versions:

| Package | Version range |
| --- | --- |
| `@blockle/blocks` | `^2.3.25` |
| `@blockle/blocks-theme-momotaro` | `^6.2.6` |
| `@vanilla-extract/css` | `^1.21.2` |
| `@vanilla-extract/next-plugin` | `^2.5.2` |

## 2. Configure the Vanilla Extract Next.js plugin

Wrap the existing Next.js config with `createVanillaExtractPlugin`. Keep any
other existing Next.js options in `nextConfig`:

```ts
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const nextConfig: NextConfig = {
  // Keep your existing Next.js options here.
};

export default withVanillaExtract(nextConfig);
```

The `mode: "auto"` option enables the plugin's Turbopack integration for
Next.js 16, matching the Retro setup.

## 3. Import the reset and provide a theme

In the root App Router layout, import the Blocks reset and wrap the application
with `BlocksProvider` using the theme:

```tsx
import "@blockle/blocks/reset";

import { BlocksProvider } from "@blockle/blocks";
import { momotaro } from "@blockle/blocks-theme-momotaro";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <BlocksProvider theme={momotaro}>{children}</BlocksProvider>
      </body>
    </html>
  );
}
```

Keep the layout as a Server Component unless it needs client-only behavior; the
Retro project provides the theme from its root layout without adding a
`"use client"` directive there.

## 4. Use Blocks components

Import components from `@blockle/blocks` and use them in your pages or
components:

```tsx
import { Box, Heading } from "@blockle/blocks";

export function Card({ title }: { title: string }) {
  return (
    <Box
      borderRadius={2}
      padding={2}
      backgroundColor="white"
      boxShadow={1}
    >
      <Heading level={3}>{title}</Heading>
    </Box>
  );
}
```

Components that use React hooks, browser APIs, or client-side interaction must
be Client Components and start with `"use client"`. Static components can
remain Server Components.

## 5. Verify the setup

Run the project's production build and type check. For example:

```bash
npm run build
npm run ts
```

If the project does not define a `ts` script, use its configured TypeScript
check command instead.
