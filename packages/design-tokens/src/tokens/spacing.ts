/**
 * Extended spacing tokens for enterprise layouts
 */

export const spacingTokens = {
  // Component-specific spacing
  components: {
    // Form spacing
    formFieldGap: '16px',
    formGroupGap: '24px',
    formSectionGap: '32px',
    
    // Card spacing
    cardPadding: '20px',
    cardGap: '16px',
    cardSectionGap: '24px',
    
    // List spacing
    listItemGap: '8px',
    listGroupGap: '16px',
    
    // Table spacing
    tableCellPadding: '12px 16px',
    tableHeaderPadding: '16px',
    
    // Modal spacing
    modalPadding: '24px',
    modalHeaderPadding: '20px 24px',
    modalFooterPadding: '16px 24px',
  },

  // Layout spacing
  layout: {
    // Page layout
    pageMargin: '24px',
    pagePadding: '32px',
    pageMaxWidth: '1600px',
    
    // Section spacing
    sectionGap: '32px',
    sectionPadding: '24px',
    
    // Sidebar
    sidebarWidth: '280px',
    sidebarCollapsedWidth: '64px',
    sidebarPadding: '16px',
    
    // Header/Footer
    headerHeight: '64px',
    footerHeight: '48px',
    toolbarHeight: '56px',
  },

  // Grid system
  grid: {
    columns: 12,
    gutterSmall: '16px',
    gutterMedium: '24px',
    gutterLarge: '32px',
    
    // Breakpoint-specific gutters
    gutters: {
      xs: '16px',
      sm: '16px',
      md: '24px',
      lg: '24px',
      xl: '32px',
    },
  },

  // Responsive spacing scale
  scale: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
  },
} as const;