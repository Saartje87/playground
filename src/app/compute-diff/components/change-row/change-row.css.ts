import { vars } from '@blockle/blocks';
import { style, styleVariants } from '@vanilla-extract/css';

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[3],
  alignItems: 'baseline',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderLeft: `${vars.borderWidth.thick} solid`,
  borderRadius: vars.borderRadius[1],
});

export const op = style({
  fontWeight: vars.fontWeight.bold,
  textTransform: 'uppercase',
  fontSize: vars.fontSize.xsmall,
  minWidth: '4.5rem',
});

export const code = style({
  fontFamily: vars.fontFamily.mono,
  overflowWrap: 'anywhere',
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
