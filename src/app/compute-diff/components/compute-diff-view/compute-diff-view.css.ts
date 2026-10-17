import { vars } from '@blockle/blocks';
import { globalStyle, style } from '@vanilla-extract/css';

export const page = style({
  minBlockSize: 'calc(100vh - 3rem)',
});

export const workspace = style({
  maxInlineSize: '80rem',
});

export const eyebrow = style({
  letterSpacing: '0.12em',
});

export const title = style({
  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
  letterSpacing: '-0.06em',
  lineHeight: 1,
});

export const editors = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: vars.space[3],
  '@media': {
    'screen and (min-width: 64rem)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: vars.space[4],
    },
  },
});

export const editor = style({
  minInlineSize: 0,
});

// Textarea renders its own wrapper div; stretch it so both editors match height.
globalStyle(`${editor} > div`, {
  flex: 1,
  minBlockSize: '16rem',
  padding: 0,
  background: vars.color['background-800'],
});

export const editorLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  color: vars.color['text-200'],
  fontWeight: vars.fontWeight.bold,
});

export const textarea = style({
  fontFamily: vars.fontFamily.mono,
  minBlockSize: '100%',
  inlineSize: '100%',
  resize: 'block',
  padding: vars.space[3],
  color: vars.color['text-200'],
  background: vars.color['background-800'],
  border: `${vars.borderWidth.thin} solid ${vars.color['background-600']}`,
  borderRadius: vars.borderRadius[1],
  lineHeight: 1.6,
  ':focus': {
    outline: `${vars.borderWidth.thick} solid ${vars.color['secondary-500']}`,
    outlineOffset: vars.borderWidth.thick,
  },
});

export const summary = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  '@media': {
    'screen and (min-width: 40rem)': {
      gridTemplateColumns: '1.5fr repeat(3, minmax(0, 1fr))',
      alignItems: 'center',
    },
  },
});

export const total = style({
  gridColumn: '1 / -1',
  '@media': {
    'screen and (min-width: 40rem)': {
      gridColumn: 'auto',
    },
  },
});

export const list = style({
  listStyle: 'none',
});
