export const posterColours = {
  ink: {
    black: '#07090A',
    charcoal: '#101416',
    slate: '#182024',
    soft: '#2A3134',
  },

  paper: {
    ivory: '#F3EEE3',
    warm: '#E8DFCF',
    parchment: '#D8C9AC',
  },

  gold: {
    dark: '#70551F',
    muted: '#A98B45',
    primary: '#D2B45F',
    bright: '#E7CC79',
  },

  neutral: {
    white: '#FFFFFF',
    cream: '#F2EDE4',
    silver: '#A7ADB0',
    smoke: '#777E80',
  },

  sport: {
    racingRed: '#A8171C',
    footballGreen: '#17472F',
    cricketGreen: '#1F5734',
    tennisGreen: '#18462F',
    golfGreen: '#244C32',
    olympicBlue: '#173B67',
    boxingBurgundy: '#581E29',
  },
} as const;

export const PosterTypography = {
  families: {
    display: 'Georgia, "Times New Roman", serif',
    editorial: '"Times New Roman", Georgia, serif',
    sans: 'Arial, Helvetica, sans-serif',
  },

  size: {
    micro: 8,
    caption: 10,
    label: 12,
    body: 16,
    subtitle: 22,
    heading: 34,
    display: 62,
    monumental: 82,
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  tracking: {
    tight: '-0.04em',
    normal: '0',
    wide: '0.18em',
    ceremonial: '0.34em',
  },

  lineHeight: {
    compact: 0.92,
    display: 1,
    editorial: 1.35,
    body: 1.55,
  },
} as const;

export const PosterSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  monumental: 96,
} as const;

export const PosterBorders = {
  fine: '1px solid rgba(210,180,95,0.42)',
  collector: '1.5px solid #A98B45',
  strong: '2px solid #D2B45F',
  divider: '1px solid rgba(210,180,95,0.30)',
} as const;

export const PosterShadows = {
  artwork: '0 32px 90px rgba(0,0,0,0.58)',
  title: '0 8px 26px rgba(0,0,0,0.90)',
  frame: 'inset 0 0 18px rgba(0,0,0,0.45)',
  subtle: '0 10px 30px rgba(0,0,0,0.30)',
} as const;

export const PosterDimensions = {
  masterWidth: 800,
  masterHeight: 1100,
  aspectRatio: '800 / 1100',

  safeMargin: 56,
  outerBorder: 28,
  innerBorder: 40,

  zones: {
    masthead: 100,
    hero: 620,
    editorial: 300,
    footer: 80,
  },
} as const;

export const PosterDesignTokens = {
  colours: PosterColours,
  typography: PosterTypography,
  spacing: PosterSpacing,
  borders: PosterBorders,
  shadows: PosterShadows,
  dimensions: PosterDimensions,
} as const;

export type PosterDesignTokenSet = typeof PosterDesignTokens;