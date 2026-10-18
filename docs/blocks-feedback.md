# Blocks improvement proposals

Handoff for the `@blockle/blocks` maintainers. Each proposal stands alone and
can ship independently. All proposals are additive.

## 1. `Textarea`: wrapper atoms lose to the theme

**Problem.** `containerProps` atoms work for `flex`, but the theme's wrapper
styles outrank the `padding` and `backgroundColor` atoms. Passing
`containerProps={{ padding: 0, backgroundColor: 'background-800' }}` has no
visible effect (computed `padding-top` stays `8px`, background stays white),
so a `className` is still needed.

**Repro.**

```tsx
<Textarea containerProps={{ padding: 0, backgroundColor: 'background-800' }} />
```

**Expected.** The wrapper has no padding and the dark background.

**Cause.** Atoms are in the `blockle-atom` cascade layer, which is declared
before `blockle-molecule` and `blockle-organism`, so component theme styles
beat atoms. That is consistent library-wide, but it makes the atom types on
`containerProps` misleading for any property the theme also sets.

**Question.** Should the docs or types say which atoms the theme overrides on
the wrapper, or should the wrapper's theme padding and background be applied in
a way atoms can override?

## 2. `Textarea`: `fill` for equal-height layouts

**Problem.** Equal-height `Textarea grow` pairs still need
`min-block-size: 100%` on the `<textarea>` in custom CSS. The wrapper side
(`flex: 1`) is now an atom.

**Proposal.** A `fill` prop that stretches the wrapper to its parent and makes
the `<textarea>` take 100% of the wrapper's block size.

**Repro.**

```tsx
<Grid gap={3}>
  <GridItem colSpan={[12, 6]}>
    <Textarea grow fill />
  </GridItem>
  <GridItem colSpan={[12, 6]}>
    <Textarea grow fill />
  </GridItem>
</Grid>
```

**Expected.** Typing a long value in one textarea gives both the same
`offsetHeight`, with no custom CSS.

**Question.** Is `fill` worth adding, or is `min-block-size` as a textarea
atom-like prop enough?

## 3. `Textarea`: cap the `<textarea>` itself (opt-in)

`maxBlockSize` caps the wrapper, which scrolls, while the `<textarea>` keeps
growing inside it. An opt-in way to cap the `<textarea>` itself would be a
lower-priority addition.

## Notes (lower priority)

Not needed by the current consumer, recorded for completeness.

- **`Grid columns`:** a `columns` prop (number or responsive array, for
  example `columns={[1, 2, 4]}`, mapping to `repeat(n, minmax(0, 1fr))`) for
  layouts that do not fit 12 columns. Most layouts fit the 12-column grid, so
  this is a niche need. Open question: what should `GridItem colSpan` mean
  when `columns` is not 12?
- **Grid `autoFit`:** a `minColumnSize` or `autoFit` option for responsive card
  grids without media queries.
- **Fixed tracks:** layouts such as "fixed badge column plus flexible columns"
  need a free-form template. Custom CSS is fine for that, no prop is proposed.
