# Layout

Use layout primitives to compose content and apply consistent spacing. They
are not semantic content by themselves: choose a meaningful element when the
group represents a list, navigation, or other structured content.

## Choosing a primitive

- **`Box`** is a general-purpose container for grouping content and applying
  style atoms.
- **`Flex`** is for row or column composition using flex layout.
- **`Grid`** is for two-dimensional layouts. Use it when both row and column
  relationships matter.
- **`GridItem`** is a child placed in a `Grid`; use it to control an item's
  placement or to compose the child element with `asChild`.
- **`Inline`** groups items horizontally. Use `gap` for consistent spacing.
- **`Stack`** groups items vertically. Use `gap` rather than individual
  margins for consistent rhythm.

```tsx
import { Alert, Button, Stack } from "@blockle/blocks";

<Stack gap={2}>
  <Alert open={hasError}>Could not save changes.</Alert>
  <Button onClick={save}>Save changes</Button>
</Stack>;
```

`Stack` and `Inline` support a semantic `tag`; use it when the children form
something meaningful, such as an ordered list. The same visual arrangement
can have different semantics, so choose the tag based on the content rather
than its appearance.

## Box and style atoms

`Box` renders a `div` and accepts every native `div` prop, plus `className`,
`style`, `asChild`, and **style atoms**: props that each map to one
pre-generated, token-backed CSS class. Atoms keep layout consistent with the
theme without writing CSS.

```tsx
import { Box } from "@blockle/blocks";

<Box
  display="flex"
  alignItems="center"
  gap={2}
  padding={[2, 4]}
  backgroundColor="neutral-100"
  borderRadius={2}
>
  Content
</Box>;
```

`Flex` accepts the same atoms as `Box`. The other primitives accept a subset:
`Stack` and `Inline` take `gap`, margin, and padding atoms; `Grid` takes `gap`,
`columnGap`, and `rowGap`. Atom classes are appended after your own
`className`.

### Responsive atoms

These accept a single value or an array with one value per breakpoint, from
smallest to largest: `mobile`, `tablet` (740px), `desktop` (992px), `wide`
(1200px). Omitted breakpoints inherit the previous value, so `padding={[2, 4]}`
is `2` on mobile and `4` from tablet up.

| Group | Props | Values |
| --- | --- | --- |
| Spacing | `padding`, `paddingBlock`, `paddingBlockStart`, `paddingBlockEnd`, `paddingInline`, `paddingInlineStart`, `paddingInlineEnd` | space token `0`-`8` |
| Spacing | `margin`, `marginBlock`, `marginBlockStart`, `marginBlockEnd`, `marginInline`, `marginInlineStart`, `marginInlineEnd` | space token `0`-`8` or `auto` |
| Gap | `gap`, `columnGap`, `rowGap` | space token `0`-`8` |
| Display | `display` | `none`, `flex`, `inline-flex`, `block`, `inline`, `inline-block`, `grid`, `inline-grid` |
| Flex | `flexDirection` | `row`, `row-reverse`, `column`, `column-reverse` |
| Flex | `flexWrap` | `nowrap`, `wrap` |
| Flex | `flex`, `flexGrow`, `flexShrink` | `flex`: `1`; `flexGrow` and `flexShrink`: `0` or `1` |
| Alignment | `alignItems`, `alignSelf`, `alignContent`, `placeItems` | `stretch`, `center`, `flex-start`, `flex-end` |
| Alignment | `justifyContent` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` |
| Typography | `fontSize` | `xsmall`, `small`, `medium`, `large`, `xlarge` |
| Position | `position` | `relative`, `fixed`, `absolute`, `sticky`, `static` |

### Static atoms

These take a single value; they are not responsive.

| Group | Props | Values |
| --- | --- | --- |
| Color | `color`, `backgroundColor`, `borderColor` | `black`, `white`, `currentColor`, `transparent`, or `<palette>-<shade>` such as `primary-500` |
| Border | `borderRadius` | `0`-`4`, `full` |
| Border | `borderWidth` | `thin`, `thick` |
| Border | `borderStyle` | `solid`, `dashed`, `dotted`, `double`, `none` |
| Border | `border`, `outline`, `appearance` | `none` |
| Shadow | `boxShadow` | `1`-`5` |
| Size | `inlineSize`, `blockSize`, `maxInlineSize`, `maxBlockSize` | `auto`, `full` (100%), `fit-content` |
| Overflow | `overflow`, `overflowBlock`, `overflowInline` | `hidden`, `scroll`, `visible`, `auto` |
| Inset | `insetBlock`, `insetBlockStart`, `insetBlockEnd`, `insetInline`, `insetInlineStart`, `insetInlineEnd` | `0` |
| Typography | `fontFamily` | `body`, `heading`, `mono` |
| Typography | `fontWeight` | `light`, `normal`, `medium`, `strong`, `bold` |
| Typography | `lineHeight` | `xsmall`, `small`, `medium`, `large`, `xlarge` |
| Typography | `fontStyle` | `normal`, `italic`, `oblique` |
| Typography | `textAlign` | `center`, `left`, `right`, `justify` |
| Typography | `textDecoration` | `overline`, `line-through`, `underline`, `none` |
| Typography | `textTransform` | `lowercase`, `uppercase`, `capitalize` |
| Typography | `textWrap` | `balance`, `wrap` |
| Typography | `whiteSpace` | `nowrap`, `pre`, `pre-line`, `pre-wrap` |
| Typography | `wordBreak`, `wordWrap` | `break-word` |
| Interaction | `cursor` | `auto`, `pointer` |
| Interaction | `pointerEvents`, `userSelect` | `none` |
| Other | `opacity` | `0`, `1` |
| Other | `transition` | `slow`, `normal`, `fast` |

Palettes are `primary`, `secondary`, `success`, `warning`, `danger`, `info`,
`background`, `text`, and `neutral`, each with shades `100`-`900`. The
resolved values (pixels, hex colors) come from the active theme.

### Atoms versus custom styles

Use atoms for token-based layout and simple visual styling. Atoms cannot
express arbitrary values, pseudo-classes (`:focus`, `:hover`), or selectors for
descendants. For those, write a vanilla-extract `style()` and pass it as
`className`, using `vars` for token values where possible:

```ts
import { vars } from "@blockle/blocks";
import { style } from "@vanilla-extract/css";

export const editor = style({
  padding: vars.space[4],
  ":focus-within": { outline: `2px solid ${vars.color["primary-500"]}` },
});
```

Components that wrap a `Box` internally do not always expose its atoms. For
example, `Textarea` renders a wrapper `Box` around the `<textarea>`: style the
wrapper through `containerProps`, and the textarea itself through `className`.

## Composition with `asChild`

Some primitives, including `Box`, `GridItem`, and `Inline`, support `asChild`.
Use it to pass the rendered element through a child component when composition
requires a specific semantic element. It differs from wrapping that child in
the primitive's default element.


## Responsive grids

`Grid` is a 12-column grid. Set the spacing with `gap`, `columnGap`, or
`rowGap`, and place each child in a `GridItem`. `GridItem` takes a required
`colSpan` (1-12) and an optional `rowSpan` (1-12). Both accept a responsive
array that lists values per breakpoint, from smallest to largest: `mobile`,
`tablet` (740px), `desktop` (992px), and `wide` (1200px). Omitted breakpoints
inherit the previous value.

```tsx
import { Grid, GridItem } from "@blockle/blocks";

<Grid gap={4}>
  <GridItem colSpan={[12, 6]}>Stacked on mobile, side by side from tablet</GridItem>
  <GridItem colSpan={[12, 6]}>Second column</GridItem>
</Grid>;
```
