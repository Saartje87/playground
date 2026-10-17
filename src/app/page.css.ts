import { vars } from '@blockle/blocks';
import { style } from '@vanilla-extract/css';

export const grid = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: vars.space[4],
  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  height: '100%',
  padding: vars.space[4],
  border: `${vars.borderWidth.thin} solid currentColor`,
  borderRadius: vars.borderRadius[2],
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    opacity: 0.7,
  },
});
