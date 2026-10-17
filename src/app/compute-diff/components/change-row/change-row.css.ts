import { vars } from '@blockle/blocks';
import { style, styleVariants } from '@vanilla-extract/css';

export const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderLeft: `${vars.borderWidth.thick} solid`,
  borderRadius: vars.borderRadius[1],
  '@media': {
    'screen and (min-width: 48rem)': {
      display: 'grid',
      gridTemplateColumns: '5rem minmax(8rem, 0.6fr) minmax(0, 1.4fr)',
      alignItems: 'start',
      gap: vars.space[3],
    },
  },
});

export const op = style({
  alignSelf: 'start',
  width: 'fit-content',
  padding: `${vars.space[1]} ${vars.space[2]}`,
  fontWeight: vars.fontWeight.bold,
  textTransform: 'uppercase',
  fontSize: vars.fontSize.xsmall,
  borderRadius: '999px',
});

export const opVariant = styleVariants({
  add: { background: vars.color['success-200'] },
  remove: { background: vars.color['danger-200'] },
  replace: { background: vars.color['warning-200'] },
});

export const values = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  minWidth: 0,
});

export const value = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: vars.space[2],
  minWidth: 0,
});

export const valueLabel = style({
  flex: '0 0 2.5rem',
  color: '#596273',
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSize.xsmall,
  fontWeight: vars.fontWeight.bold,
});

export const code = style({
  fontFamily: vars.fontFamily.mono,
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});

export const rowVariant = styleVariants({
  add: {
    background: vars.color['success-100'],
    borderColor: vars.color['success-600'],
    color: vars.color['success-900'],
  },
  remove: {
    background: vars.color['danger-100'],
    borderColor: vars.color['danger-600'],
    color: vars.color['danger-900'],
  },
  replace: {
    background: vars.color['warning-100'],
    borderColor: vars.color['warning-600'],
    color: vars.color['warning-900'],
  },
});
