/**
 * Enhanced Include System Examples
 *
 * This file demonstrates the new enhanced capabilities of the include system
 * including design tokens, type-safe builders, and theme support.
 */

import {
  createTypedIncludeBuilder,
  DesignTokens,
  Presets,
  ComponentCategory,
  Theme,
  Size,
  Spacing
} from '../src';

// =============================================================================
// EXAMPLE 1: Type-Safe Builder Pattern
// =============================================================================

export const typeSafeExample = () => {
  // Create a typed include builder with default design tokens
  const builder = createTypedIncludeBuilder({
    theme: Theme.LIGHT,
    spacing: Spacing.BASE
  });

  // Type-safe includes with full IntelliSense support
  const includes = [
    // React components with full type safety
    builder.react.Card.default({
      sectioned: true,
      designTokens: {
        theme: Theme.BRAND,
        spacing: Spacing.LOOSE,
        elevation: 'medium'
      }
    }),

    builder.react.Button.primary({
      designTokens: {
        size: Size.LARGE,
        theme: Theme.DARK
      }
    }),

    builder.react.Badge.success({
      designTokens: Presets.successBadge
    }),

    // Vanilla JS components
    builder.vanilla.Button.primary({
      onClick: 'handleClick',
      designTokens: {
        theme: Theme.BRAND
      }
    }),

    // ExtJS components
    builder.extjs.DataGrid.enterprise({
      features: ['grouping', 'sorting', 'filtering'],
      designTokens: {
        theme: Theme.DARK,
        spacing: Spacing.TIGHT
      }
    }),

    // TypeScript patterns
    builder.typescript.Repository.standard({
      entity: 'User',
      designTokens: {
        theme: Theme.NEUTRAL
      }
    })
  ];

  return includes;
};

// =============================================================================
// EXAMPLE 2: Enhanced Configuration with Design Tokens
// =============================================================================

export const enhancedConfigExample = () => {
  const advancedConfiguration = {
    // Mixed framework components with enhanced configuration
    includes: [
      {
        // Traditional include statement (backward compatible)
        language: 'react' as const,
        component: 'Card',
        variation: 'default',

        // Enhanced configuration object
        config: {
          // Design tokens for consistent theming
          designTokens: {
            theme: Theme.DARK,
            size: Size.MEDIUM,
            spacing: Spacing.LOOSE,
            elevation: 'large',
            borderRadius: 'medium',
            colorScheme: 'high-contrast'
          },

          // Responsive design support
          responsive: {
            small: {
              size: Size.SMALL,
              spacing: Spacing.TIGHT
            },
            medium: {
              size: Size.MEDIUM,
              spacing: Spacing.BASE
            },
            large: {
              size: Size.LARGE,
              spacing: Spacing.LOOSE
            }
          },

          // Accessibility features
          accessibility: {
            ariaLabel: 'Product information card',
            role: 'article',
            describedBy: 'product-description'
          },

          // Custom props
          title: 'Product Details',
          sectioned: true
        }
      },

      {
        language: 'react' as const,
        component: 'Button',
        variation: 'primary',
        config: {
          designTokens: Presets.primaryButton,
          accessibility: {
            ariaLabel: 'Add to cart',
            describedBy: 'product-price'
          },
          onClick: 'handleAddToCart',
          loading: false,
          disabled: false
        }
      },

      {
        language: 'vanilla' as const,
        component: 'Badge',
        variation: 'success',
        config: {
          designTokens: {
            theme: Theme.BRAND,
            size: Size.SMALL
          },
          text: 'In Stock',
          onClick: 'handleBadgeClick'
        }
      }
    ]
  };

  return advancedConfiguration;
};

// =============================================================================
// EXAMPLE 3: Theme System Integration
// =============================================================================

export const themeSystemExample = () => {
  // Define theme presets for different contexts
  const dashboardTheme = {
    designTokens: {
      theme: Theme.DARK,
      spacing: Spacing.BASE,
      size: Size.MEDIUM,
      elevation: 'medium'
    }
  };

  const mobileTheme = {
    designTokens: {
      theme: Theme.LIGHT,
      spacing: Spacing.TIGHT,
      size: Size.SMALL,
      elevation: 'none'
    }
  };

  const brandTheme = {
    designTokens: {
      theme: Theme.BRAND,
      spacing: Spacing.LOOSE,
      size: Size.LARGE,
      elevation: 'large',
      borderRadius: 'rounded',
      colorScheme: 'brand-primary'
    }
  };

  return {
    // Dashboard components with dark theme
    dashboard: [
      {
        language: 'extjs' as const,
        component: 'DataGrid',
        variation: 'enterprise',
        config: {
          ...dashboardTheme,
          title: 'Sales Overview',
          features: ['grouping', 'filtering', 'export']
        }
      },
      {
        language: 'react' as const,
        component: 'Card',
        variation: 'metric-card',
        config: {
          ...dashboardTheme,
          title: 'Revenue Metrics',
          designTokens: {
            ...dashboardTheme.designTokens,
            colorScheme: 'success'
          }
        }
      }
    ],

    // Mobile components with compact theme
    mobile: [
      {
        language: 'react' as const,
        component: 'Button',
        variation: 'primary',
        config: {
          ...mobileTheme,
          text: 'Quick Action',
          fullWidth: true
        }
      },
      {
        language: 'vanilla' as const,
        component: 'Badge',
        variation: 'new',
        config: {
          ...mobileTheme,
          text: 'New Feature',
          animated: true
        }
      }
    ],

    // Brand components with company theming
    brand: [
      {
        language: 'react' as const,
        component: 'Page',
        variation: 'dashboard',
        config: {
          ...brandTheme,
          title: 'Company Dashboard',
          breadcrumbs: true
        }
      },
      {
        language: 'react' as const,
        component: 'MediaCard',
        variation: 'default',
        config: {
          ...brandTheme,
          designTokens: {
            ...brandTheme.designTokens,
            colorScheme: 'brand-accent'
          },
          primaryAction: {
            content: 'Learn More',
            onAction: 'handleLearnMore'
          }
        }
      }
    ]
  };
};

// =============================================================================
// EXAMPLE 4: Component Category Organization
// =============================================================================

export const componentCategoryExample = () => {
  // Organize components by their functional categories
  const componentLibrary = {
    [ComponentCategory.LAYOUT]: [
      {
        language: 'react' as const,
        component: 'Card',
        variation: 'default',
        config: { designTokens: Presets.secondaryCard }
      },
      {
        language: 'react' as const,
        component: 'Page',
        variation: 'full-width',
        config: { designTokens: { theme: Theme.LIGHT } }
      },
      {
        language: 'react' as const,
        component: 'MediaCard',
        variation: 'small',
        config: { designTokens: { size: Size.SMALL } }
      }
    ],

    [ComponentCategory.ACTIONS]: [
      {
        language: 'react' as const,
        component: 'Button',
        variation: 'primary',
        config: { designTokens: Presets.primaryButton }
      },
      {
        language: 'vanilla' as const,
        component: 'Button',
        variation: 'primary',
        config: { designTokens: { theme: Theme.BRAND } }
      }
    ],

    [ComponentCategory.FEEDBACK]: [
      {
        language: 'react' as const,
        component: 'Badge',
        variation: 'success',
        config: { designTokens: Presets.successBadge }
      },
      {
        language: 'vanilla' as const,
        component: 'Spinner',
        variation: 'small',
        config: { designTokens: { theme: Theme.DARK } }
      }
    ],

    [ComponentCategory.INPUT]: [
      {
        language: 'extjs' as const,
        component: 'ComboBox',
        variation: 'search',
        config: { designTokens: { theme: Theme.LIGHT, size: Size.MEDIUM } }
      }
    ],

    [ComponentCategory.FORMS]: [
      {
        language: 'extjs' as const,
        component: 'FormPanel',
        variation: 'settings',
        config: { designTokens: { theme: Theme.DARK, spacing: Spacing.LOOSE } }
      }
    ],

    [ComponentCategory.DISPLAY]: [
      {
        language: 'extjs' as const,
        component: 'DataGrid',
        variation: 'enterprise',
        config: { designTokens: Presets.largeGrid }
      },
      {
        language: 'typescript' as const,
        component: 'Repository',
        variation: 'standard',
        config: { designTokens: { theme: Theme.NEUTRAL } }
      },
      {
        language: 'typescript' as const,
        component: 'UseCase',
        variation: 'crud',
        config: { designTokens: { theme: Theme.LIGHT } }
      }
    ]
  };

  return componentLibrary;
};

// =============================================================================
// EXAMPLE 5: Real-World Application Scenarios
// =============================================================================

export const realWorldExamples = {
  // E-commerce Product Page
  productPage: {
    includes: [
      {
        language: 'react' as const,
        component: 'Page',
        variation: 'default',
        config: {
          title: 'Product Details',
          designTokens: { theme: Theme.LIGHT, spacing: Spacing.LOOSE }
        }
      },
      {
        language: 'react' as const,
        component: 'Card',
        variation: 'product-info',
        config: {
          designTokens: {
            theme: Theme.BRAND,
            spacing: Spacing.BASE,
            elevation: 'medium'
          },
          responsive: {
            small: { spacing: Spacing.TIGHT },
            large: { spacing: Spacing.LOOSE }
          }
        }
      },
      {
        language: 'react' as const,
        component: 'Button',
        variation: 'primary',
        config: {
          designTokens: Presets.primaryButton,
          onClick: 'handleAddToCart',
          accessibility: {
            ariaLabel: 'Add product to shopping cart',
            describedBy: 'product-price'
          }
        }
      },
      {
        language: 'vanilla' as const,
        component: 'Badge',
        variation: 'success',
        config: {
          text: 'In Stock',
          designTokens: {
            theme: Theme.LIGHT,
            size: Size.SMALL
          }
        }
      }
    ]
  },

  // Analytics Dashboard
  analyticsDashboard: {
    includes: [
      {
        language: 'react' as const,
        component: 'Page',
        variation: 'dashboard',
        config: {
          title: 'Analytics Dashboard',
          designTokens: { theme: Theme.DARK, spacing: Spacing.BASE }
        }
      },
      {
        language: 'extjs' as const,
        component: 'DataGrid',
        variation: 'enterprise',
        config: {
          designTokens: {
            theme: Theme.DARK,
            spacing: Spacing.TIGHT,
            elevation: 'large'
          },
          features: ['grouping', 'filtering', 'sorting', 'export'],
          store: 'analyticsStore'
        }
      },
      {
        language: 'react' as const,
        component: 'Card',
        variation: 'metric-card',
        config: {
          designTokens: {
            theme: Theme.DARK,
            colorScheme: 'data-visualization'
          }
        }
      },
      {
        language: 'typescript' as const,
        component: 'Repository',
        variation: 'standard',
        config: {
          entity: 'AnalyticsData',
          designTokens: { theme: Theme.NEUTRAL }
        }
      }
    ]
  },

  // Mobile Settings Form
  mobileSettings: {
    includes: [
      {
        language: 'react' as const,
        component: 'Page',
        variation: 'full-width',
        config: {
          title: 'Settings',
          designTokens: {
            theme: Theme.LIGHT,
            spacing: Spacing.TIGHT,
            size: Size.SMALL
          }
        }
      },
      {
        language: 'extjs' as const,
        component: 'FormPanel',
        variation: 'settings',
        config: {
          designTokens: {
            theme: Theme.LIGHT,
            spacing: Spacing.BASE,
            size: Size.SMALL
          },
          fields: [
            { name: 'notifications', type: 'checkbox', label: 'Push Notifications' },
            { name: 'theme', type: 'combobox', label: 'Theme Preference' },
            { name: 'language', type: 'combobox', label: 'Language' }
          ]
        }
      },
      {
        language: 'react' as const,
        component: 'Button',
        variation: 'primary',
        config: {
          designTokens: { size: Size.SMALL, theme: Theme.BRAND },
          text: 'Save Settings',
          onClick: 'handleSaveSettings'
        }
      }
    ]
  }
};

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

// Example of how to use the enhanced include system
export const usageExample = () => {
  // Create a typed builder
  const builder = createTypedIncludeBuilder({
    designTokens: {
      theme: Theme.LIGHT,
      spacing: Spacing.BASE
    }
  });

  // Build a component with enhanced configuration
  const productCard = builder.react.Card.default({
    designTokens: {
      theme: Theme.BRAND,
      spacing: Spacing.LOOSE,
      elevation: 'medium',
      colorScheme: 'product-card'
    },
    responsive: {
      small: { spacing: Spacing.TIGHT },
      large: { spacing: Spacing.LOOSE }
    },
    accessibility: {
      ariaLabel: 'Product information',
      role: 'article'
    },
    title: 'Premium Product',
    sectioned: true
  });

  // Return the include statement for processing
  return productCard;
};

console.log('Enhanced Include System Examples loaded successfully!');