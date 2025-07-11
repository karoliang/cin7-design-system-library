/**
 * Enterprise-specific design tokens for Cin7 DSL
 * Extends Polaris tokens with enterprise UI patterns
 */

export const enterpriseTokens = {
  // Data Grid Tokens
  dataGrid: {
    header: {
      height: '48px',
      background: 'var(--p-color-bg-surface-secondary)',
      borderColor: 'var(--p-color-border)',
      fontSize: '14px',
      fontWeight: '600',
      textColor: 'var(--p-color-text-secondary)',
    },
    row: {
      height: '40px',
      hoverBackground: 'var(--p-color-bg-surface-hover)',
      selectedBackground: 'var(--p-color-bg-surface-selected)',
      stripedBackground: 'var(--p-color-bg-surface-secondary-experimental)',
      borderColor: 'var(--p-color-border-subdued)',
    },
    cell: {
      padding: '12px 16px',
      fontSize: '14px',
      textColor: 'var(--p-color-text)',
    },
    footer: {
      height: '48px',
      background: 'var(--p-color-bg-surface)',
      borderColor: 'var(--p-color-border)',
    },
  },

  // Advanced Form Tokens
  form: {
    field: {
      height: '36px',
      labelSize: '14px',
      labelWeight: '500',
      labelColor: 'var(--p-color-text)',
      helperSize: '12px',
      helperColor: 'var(--p-color-text-subdued)',
      errorColor: 'var(--p-color-text-critical)',
    },
    group: {
      spacing: '24px',
      borderRadius: 'var(--p-border-radius-200)',
      borderColor: 'var(--p-color-border)',
      background: 'var(--p-color-bg-surface)',
      padding: '20px',
    },
    section: {
      titleSize: '16px',
      titleWeight: '600',
      titleColor: 'var(--p-color-text)',
      spacing: '32px',
    },
  },

  // Chart Tokens
  charts: {
    colors: {
      primary: ['#5C6AC4', '#006FBB', '#007ACE', '#00A0AC', '#47C1BF'],
      secondary: ['#B4B9E3', '#85BBF0', '#9DD4F3', '#B3E0E1', '#A3E7E6'],
      semantic: {
        positive: '#008060',
        negative: '#D72C0D',
        warning: '#FFC453',
        neutral: '#6D7175',
      },
    },
    grid: {
      color: 'var(--p-color-border-subdued)',
      width: '1px',
      style: 'dashed',
    },
    axis: {
      color: 'var(--p-color-text-subdued)',
      fontSize: '12px',
      labelRotation: '-45deg',
    },
    tooltip: {
      background: 'var(--p-color-bg-surface-inverse)',
      textColor: 'var(--p-color-text-inverse)',
      borderRadius: 'var(--p-border-radius-100)',
      padding: '8px 12px',
      fontSize: '13px',
    },
  },

  // Dashboard Tokens
  dashboard: {
    widget: {
      borderRadius: 'var(--p-border-radius-300)',
      background: 'var(--p-color-bg-surface)',
      borderColor: 'var(--p-color-border)',
      padding: '24px',
      spacing: '20px',
    },
    metric: {
      valueSize: '32px',
      valueWeight: '700',
      labelSize: '14px',
      labelColor: 'var(--p-color-text-subdued)',
      changePositive: 'var(--p-color-text-success)',
      changeNegative: 'var(--p-color-text-critical)',
    },
    kpi: {
      iconSize: '48px',
      iconBackground: 'var(--p-color-bg-surface-secondary)',
      iconBorderRadius: 'var(--p-border-radius-200)',
    },
  },

  // Layout Tokens
  layout: {
    sidebar: {
      width: '280px',
      collapsedWidth: '64px',
      background: 'var(--p-color-bg-surface-secondary)',
      borderColor: 'var(--p-color-border)',
    },
    toolbar: {
      height: '56px',
      background: 'var(--p-color-bg-surface)',
      borderColor: 'var(--p-color-border)',
      padding: '0 24px',
    },
    workspace: {
      background: 'var(--p-color-bg)',
      padding: '24px',
      maxWidth: '1600px',
    },
  },

  // Enterprise Component States
  states: {
    loading: {
      overlayOpacity: '0.5',
      spinnerSize: '20px',
      skeletonAnimation: 'shimmer 2s infinite',
    },
    disabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    readonly: {
      background: 'var(--p-color-bg-surface-disabled)',
      borderStyle: 'dashed',
    },
    error: {
      borderColor: 'var(--p-color-border-critical)',
      background: 'var(--p-color-bg-surface-critical-subdued)',
    },
  },

  // ExtJS Integration Tokens
  extjs: {
    panel: {
      headerHeight: '40px',
      headerBackground: 'var(--p-color-bg-surface-secondary)',
      headerTextColor: 'var(--p-color-text)',
      borderWidth: '1px',
      borderColor: 'var(--p-color-border)',
      borderRadius: 'var(--p-border-radius-200)',
    },
    window: {
      headerHeight: '36px',
      shadowSize: 'var(--p-shadow-400)',
      overlayBackground: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 'var(--p-border-radius-300)',
    },
    toolbar: {
      height: '44px',
      background: 'var(--p-color-bg-surface)',
      borderColor: 'var(--p-color-border-subdued)',
      buttonSpacing: '8px',
    },
  },
} as const;