/**
 * Extended typography tokens for enterprise applications
 */

export const typographyTokens = {
  // Font stacks
  fontFamilies: {
    // Primary fonts (inherit from Polaris)
    base: 'var(--p-font-family-sans)',
    mono: 'var(--p-font-family-mono)',
    
    // Enterprise additions
    data: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'var(--p-font-family-sans)',
    reading: 'Georgia, "Times New Roman", serif',
  },

  // Extended font sizes
  fontSizes: {
    // Polaris base sizes
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    
    // Enterprise additions
    caption: '11px',
    overline: '10px',
    display1: '48px',
    display2: '40px',
    display3: '32px',
  },

  // Line heights
  lineHeights: {
    tight: '1.2',
    snug: '1.375',
    base: '1.5',
    relaxed: '1.625',
    loose: '1.75',
    
    // Component-specific
    heading: '1.2',
    body: '1.5',
    data: '1.4',
    code: '1.6',
  },

  // Font weights
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    
    // Component-specific
    heading: '-0.02em',
    caps: '0.05em',
    data: '0.01em',
  },

  // Text styles presets
  textStyles: {
    // Headings
    h1: {
      fontSize: '36px',
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '30px',
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '0',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '1.35',
      fontWeight: '600',
      letterSpacing: '0',
    },
    h5: {
      fontSize: '16px',
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0',
    },
    h6: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0.01em',
    },
    
    // Body text
    bodyLarge: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    bodyBase: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: '13px',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    
    // UI text
    button: {
      fontSize: '14px',
      lineHeight: '1',
      fontWeight: '500',
      letterSpacing: '0.01em',
    },
    label: {
      fontSize: '14px',
      lineHeight: '1.3',
      fontWeight: '500',
    },
    caption: {
      fontSize: '12px',
      lineHeight: '1.4',
      fontWeight: '400',
    },
    overline: {
      fontSize: '10px',
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    
    // Data text
    dataHeader: {
      fontSize: '13px',
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '0.01em',
    },
    dataCell: {
      fontSize: '14px',
      lineHeight: '1.4',
      fontWeight: '400',
    },
    dataNumber: {
      fontSize: '14px',
      lineHeight: '1.3',
      fontWeight: '500',
      fontFamily: 'var(--font-family-mono)',
    },
    
    // Code
    code: {
      fontSize: '13px',
      lineHeight: '1.6',
      fontWeight: '400',
      fontFamily: 'var(--font-family-mono)',
    },
    codeBlock: {
      fontSize: '13px',
      lineHeight: '1.6',
      fontWeight: '400',
      fontFamily: 'var(--font-family-mono)',
    },
  },
} as const;