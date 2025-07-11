/**
 * Bridge between Polaris design tokens and Cin7 DSL theme system
 */

// Re-export Polaris tokens with enhanced types
export * from '@shopify/polaris-tokens';

// Custom token extensions for Cin7 DSL
export const cin7Tokens = {
  // ExtJS component tokens
  extjs: {
    grid: {
      headerHeight: '40px',
      rowHeight: '36px',
      borderColor: 'var(--p-color-border)',
      headerBackground: 'var(--p-color-bg-surface-secondary)',
      hoverBackground: 'var(--p-color-bg-surface-hover)',
      selectedBackground: 'var(--p-color-bg-surface-selected)',
    },
    form: {
      fieldHeight: '36px',
      labelColor: 'var(--p-color-text)',
      borderRadius: 'var(--p-border-radius-100)',
      focusBorderColor: 'var(--p-color-border-emphasis)',
    },
  },
  
  // Animation tokens
  animation: {
    durationFast: '150ms',
    durationBase: '200ms',
    durationSlow: '300ms',
    easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    easingAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
    toast: 800,
  },
} as const;