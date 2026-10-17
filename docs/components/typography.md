# Typography

## `Heading`

Use `Heading` for headings in the document outline. Set `level` to match the
content hierarchy, not the visual size you want; style should not skip or
misrepresent heading levels.

```tsx
import { Heading } from "@blockle/blocks";

<Heading level={2}>Account settings</Heading>;
```

## `Text`

Use `Text` for body and supporting copy. Set `tag` to the appropriate
semantic element, such as `p` for a paragraph; use its text and spacing atoms
for presentation.

```tsx
import { Text } from "@blockle/blocks";

<Text tag="p" paddingBlockEnd={2}>
  Update the details associated with your account.
</Text>;
```

`Text` supports `asChild` when another component must supply the rendered
element. Keep the resulting HTML semantics meaningful.

