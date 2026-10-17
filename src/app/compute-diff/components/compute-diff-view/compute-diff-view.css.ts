import { vars } from '@blockle/blocks';
import { style } from '@vanilla-extract/css';

export const textarea = style({
  fontFamily: vars.fontFamily.mono,
  minHeight: '16rem',
  width: '100%',
});

export const error = style({
  color: vars.color['danger-600'],
});

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
});
