import { vars } from '@blockle/blocks';
import { style } from '@vanilla-extract/css';

export const row = style({
  borderInlineStart: `${vars.borderWidth.thick} solid`,
  '@media': {
    'screen and (min-width: 48rem)': {
      display: 'grid',
      gridTemplateColumns: '5rem minmax(8rem, 0.6fr) minmax(0, 1.4fr)',
      alignItems: 'start',
      gap: vars.space[3],
    },
  },
});

export const shrinkable = style({
  minInlineSize: 0,
});

export const value = style({
  minInlineSize: 0,
});

export const valueLabel = style({
  flex: '0 0 2.5rem',
});

export const code = style({
  overflowWrap: 'anywhere',
});
