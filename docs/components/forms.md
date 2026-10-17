# Forms and actions

Use form controls for data entry and `Button` for an action. Use `Link` for
navigation; do not use a button to represent a route change unless the action
semantics are genuinely appropriate.

## `Button`

Use `Button` for an action such as saving, submitting, or opening a dialog.
Use `disabled` when the action cannot currently be performed, and provide a
clear label that describes the action.

```tsx
import { Button } from "@blockle/blocks";

<Button variant="solid" onClick={save} disabled={isSaving}>
  {isSaving ? "Saving..." : "Save"}
</Button>;
```

Use `startSlot` and `endSlot` for icon or adornment content. Use `asChild` when
the underlying semantic element should come from a child, such as an anchor;
do not use it merely to add another wrapper.

## Text and numeric entry

- **`TextInput`** is for a single-line value. Give it a useful `name` and
  associate it with a `Label`.
- **`Textarea`** is for free-form multi-line text, such as a description.
  Give it a useful `name` and a label. See [Textarea sizing and
  styling](#textarea-sizing-and-styling).
- **`NumericInput`** is for a numeric value. Use it instead of a text field
  when the value is inherently numeric.

## Textarea sizing and styling

`Textarea` renders a wrapper `Box` around the native `<textarea>`.

- `className` and other native props go to the `<textarea>`.
- `containerProps` (`className`, `style`, and other `div` props) go to the
  wrapper.
- `grow` makes the textarea grow with its content. It is a behavior prop, not
  a class name: it adds an internal hashed class that sets
  `field-sizing: content`, so you will not see a literal `grow` class in the
  DOM. It needs browser support for `field-sizing`.
- `maxHeight` only has an effect together with `grow`, and is applied to the
  wrapper's inline `style`, not to the `<textarea>`. The textarea itself keeps
  growing past the limit; the wrapper stops at `maxHeight` and scrolls
  (`overflow: auto` comes from the theme), so the cap works but the scrollbar
  belongs to the wrapper.

```tsx
<Textarea
  grow
  maxHeight={400}
  className={styles.textarea}
  containerProps={{ className: styles.wrapper }}
/>
```

## Choices

- **`Checkbox`** represents an independent on/off choice. Put the human
  readable label in its children and use `name` for form identification.
- **`Radio`** is for choosing one value from a group. Give related radios the
  same `name` and distinct `value` values.
- **`Select`** is for choosing one item from a set of options. Provide clear
  option text and use its `variant` when a different presentation is needed.
- **`Switch`** represents a boolean setting that can be turned on or off.
  Supply a meaningful label; do not use it for selecting among multiple
  choices.
- **`Slider`** is for choosing a value across a range, especially when
  adjusting a continuous or stepped quantity. Use `step` when the range has
  meaningful increments and show the current value when it is not otherwise
  clear.

## Labels and accessible names

Use **`Label`** to identify a control. Associate it with the relevant input,
and ensure every interactive control has an accessible name. Placeholder text
is not a substitute for a label. Decorative icons inside controls should not
be the only indication of their purpose.

`Label` accepts only the `cursor` atom. To style it, pass a `className`, or
wrap its content in `Text` or `Box`.

Interactive form controls and event handlers belong in a Next.js Client
Component. Keep server-rendered form content outside the client boundary where
possible.
