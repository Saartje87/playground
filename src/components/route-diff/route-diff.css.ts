import { vars } from '@blockle/blocks';
import { style } from '@vanilla-extract/css';

export const eyebrow = style({
  letterSpacing: '0.12em',
});

export const list = style({
  listStyle: 'none',
});

export const row = style({
  borderInlineStart: `${vars.borderWidth.thick} solid`,
  '@media': {
    'screen and (min-width: 48rem)': {
      display: 'grid',
      gridTemplateColumns: '5rem minmax(8rem, 1fr) minmax(0, 1fr)',
      alignItems: 'center',
      gap: vars.space[3],
    },
  },
});

export const code = style({
  overflowWrap: 'anywhere',
});
