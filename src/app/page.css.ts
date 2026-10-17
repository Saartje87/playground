import { vars } from '@blockle/blocks';
import { style } from '@vanilla-extract/css';

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
