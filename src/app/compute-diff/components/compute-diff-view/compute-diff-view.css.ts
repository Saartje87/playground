import { vars } from '@blockle/blocks';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

export const page = style({
  minHeight: 'calc(100vh - 3rem)',
  padding: `${vars.space[5]} ${vars.space[4]}`,
  background: '#f4f1eb',
  '@media': {
    'screen and (min-width: 48rem)': {
      padding: `${vars.space[6]} ${vars.space[5]}`,
    },
  },
});

export const workspace = style({
  width: '100%',
  maxWidth: '80rem',
  margin: '0 auto',
});

export const hero = style({
  padding: `${vars.space[4]} 0 ${vars.space[3]}`,
});

export const eyebrow = style({
  margin: 0,
  color: '#c14c31',
  fontFamily: vars.fontFamily.mono,
  fontSize: vars.fontSize.xsmall,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '0.12em',
});

export const resultEyebrow = style({
  color: '#ef9366',
});

export const title = style({
  margin: `${vars.space[2]} 0`,
  color: '#19212d',
  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
  letterSpacing: '-0.06em',
  lineHeight: 1,
});

export const subtitle = style({
  margin: 0,
  color: '#596273',
  fontSize: vars.fontSize.large,
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
  minWidth: 0,
  padding: vars.space[4],
  background: '#202b3b',
  border: '1px solid #374457',
  borderRadius: vars.borderRadius[2],
  boxShadow: '0 12px 28px rgb(25 33 45 / 12%)',
});

globalStyle(`${editor} > div`, {
  flex: 1,
  minHeight: '16rem',
  padding: 0,
  background: '#111925',
});

export const editorLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  color: '#edf1f5',
  fontWeight: vars.fontWeight.bold,
});

export const editorNumber = style({
  color: '#9ca8b8',
  fontFamily: vars.fontFamily.mono,
  fontSize: vars.fontSize.xsmall,
});

export const textarea = style({
  fontFamily: vars.fontFamily.mono,
  minHeight: '100%',
  width: '100%',
  resize: 'vertical',
  padding: vars.space[3],
  color: '#e8edf4',
  background: '#111925',
  border: '1px solid #39475a',
  borderRadius: vars.borderRadius[1],
  lineHeight: 1.6,
  ':focus': {
    outline: '2px solid #ef9366',
    outlineOffset: '2px',
  },
});

export const error = style({
  margin: 0,
  color: '#ffb1a3',
  fontFamily: vars.fontFamily.mono,
  fontSize: vars.fontSize.xsmall,
  overflowWrap: 'anywhere',
});

export const results = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
  padding: vars.space[4],
  color: '#edf1f5',
  background: '#202b3b',
  border: '1px solid #374457',
  borderRadius: vars.borderRadius[2],
  boxShadow: '0 12px 28px rgb(25 33 45 / 12%)',
});

export const resultsHeading = style({
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: vars.space[2],
});

export const resultsTitle = style({
  margin: `${vars.space[1]} 0 0`,
  color: '#edf1f5',
});

export const stale = style({
  margin: 0,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  color: '#795414',
  background: '#fff2d7',
  borderRadius: vars.borderRadius[1],
  fontSize: vars.fontSize.xsmall,
  fontWeight: vars.fontWeight.bold,
});

export const summary = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: vars.space[2],
  padding: vars.space[3],
  background: '#111925',
  borderRadius: vars.borderRadius[1],
  '@media': {
    'screen and (min-width: 40rem)': {
      gridTemplateColumns: '1.5fr repeat(3, minmax(0, 1fr))',
      alignItems: 'center',
    },
  },
});

export const total = style({
  gridColumn: '1 / -1',
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.space[2],
  '@media': {
    'screen and (min-width: 40rem)': {
      gridColumn: 'auto',
    },
  },
});

export const totalCount = style({
  color: '#edf1f5',
  fontSize: vars.fontSize.large,
  fontWeight: vars.fontWeight.bold,
});

export const totalLabel = style({
  color: '#b8c2d0',
  fontSize: vars.fontSize.xsmall,
});

export const metric = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  color: '#b8c2d0',
  fontSize: vars.fontSize.xsmall,
  fontWeight: vars.fontWeight.bold,
});

export const metricCount = style({
  fontFamily: vars.fontFamily.mono,
  fontSize: vars.fontSize.medium,
});

export const metricVariant = styleVariants({
  add: { color: '#86efac' },
  remove: { color: '#fca5a5' },
  replace: { color: '#fbbf24' },
});

export const addCount = style([metricCount, metricVariant.add]);
export const removeCount = style([metricCount, metricVariant.remove]);
export const replaceCount = style([metricCount, metricVariant.replace]);

export const emptyState = style({
  margin: 0,
  padding: `${vars.space[5]} ${vars.space[3]}`,
  color: '#b8c2d0',
  textAlign: 'center',
  fontFamily: vars.fontFamily.mono,
});

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
});
