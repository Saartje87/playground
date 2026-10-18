import { style } from '@vanilla-extract/css';

export const page = style({
  minBlockSize: 'calc(100vh - 3rem)',
});

export const content = style({
  maxInlineSize: '48rem',
});

export const eyebrow = style({
  letterSpacing: '0.12em',
});

export const title = style({
  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
  letterSpacing: '-0.06em',
  lineHeight: 1,
});
