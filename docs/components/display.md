# Display

## `Divider`

Use `Divider` to visually separate adjacent content. It can also contain text
when the divider itself needs a label. Prefer semantic headings or other
structure for meaningful sections; a divider is not a substitute for document
hierarchy.

## `IconMask` and `createIconMask`

Use `IconMask` when an icon mask is supplied by your theme or design system.
`createIconMask` is the exported helper for creating icon-mask values; use it
when defining or adapting icon assets rather than as a general-purpose
component. It creates a component that maps a typed icon name to an asset URL:

```tsx
import { createIconMask } from "@blockle/blocks";

type IconName = "search" | "close";

const Icon = createIconMask(
  (name: IconName) => `/icons/${name}.svg`,
);

<Icon name="search" />;
```

The helper renders `IconMask` with the URL returned by the function. Keep the
icon asset separate from the presentation, and ensure interactive icons also
have an accessible name (for example with
[`VisuallyHidden`](./accessibility.md)).
