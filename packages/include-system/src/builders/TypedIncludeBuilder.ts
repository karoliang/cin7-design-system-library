/**
 * Typed Include Builder - Type-safe component declarations
 */

import {
  IncludeStatement,
  ComponentConfiguration,
  TypedIncludeBuilder,
  SupportedLanguage,
  DesignTokenPreset
} from '../types/IncludeSystem';

export class IncludeBuilderInstance implements TypedIncludeBuilder {
  private config?: ComponentConfiguration;

  constructor(private defaultConfig?: ComponentConfiguration) {
    this.config = defaultConfig;
  }

  private createIncludeStatement(
    language: SupportedLanguage,
    component: string,
    variation: string,
    config?: ComponentConfiguration
  ): IncludeStatement {
    return {
      language,
      component,
      variation,
      config: { ...this.config, ...config }
    };
  }

  // React Components
  get react() {
    return {
      Card: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Card', 'default', config),
        header: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Card', 'header', config),
        'product-info': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Card', 'product-info', config),
        'metric-card': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Card', 'metric-card', config)
      },
      Button: {
        primary: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Button', 'primary', config),
        secondary: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Button', 'secondary', config),
        destructive: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Button', 'destructive', config),
        plain: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Button', 'plain', config)
      },
      Badge: {
        success: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Badge', 'success', config),
        warning: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Badge', 'warning', config),
        info: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Badge', 'info', config),
        new: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Badge', 'new', config)
      },
      MediaCard: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'MediaCard', 'default', config),
        small: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'MediaCard', 'small', config),
        'video-card': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'MediaCard', 'video-card', config),
        'portrait-video-card': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'MediaCard', 'portrait-video-card', config)
      },
      Page: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Page', 'default', config),
        'full-width': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Page', 'full-width', config),
        dashboard: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('react', 'Page', 'dashboard', config)
      }
    };
  }

  // Vanilla JavaScript Components
  get vanilla() {
    return {
      Card: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Card', 'default', config),
        simple: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Card', 'simple', config)
      },
      Button: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Button', 'default', config),
        primary: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Button', 'primary', config),
        link: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Button', 'link', config)
      },
      Badge: {
        success: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Badge', 'success', config),
        warning: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Badge', 'warning', config),
        new: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Badge', 'new', config),
        'trend-up': (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Badge', 'trend-up', config)
      },
      Spinner: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Spinner', 'default', config),
        small: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('vanilla', 'Spinner', 'small', config)
      }
    };
  }

  // ExtJS Components
  get extjs() {
    return {
      DataGrid: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'DataGrid', 'default', config),
        enterprise: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'DataGrid', 'enterprise', config),
        compact: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'DataGrid', 'compact', config)
      },
      ComboBox: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'ComboBox', 'default', config),
        abc: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'ComboBox', 'abc', config),
        search: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'ComboBox', 'search', config)
      },
      FormPanel: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'FormPanel', 'default', config),
        settings: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('extjs', 'FormPanel', 'settings', config)
      }
    };
  }

  // TypeScript Patterns
  get typescript() {
    return {
      Repository: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'Repository', 'default', config),
        standard: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'Repository', 'standard', config)
      },
      UseCase: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'UseCase', 'default', config),
        crud: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'UseCase', 'crud', config)
      },
      EventBus: {
        default: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'EventBus', 'default', config),
        typed: (config?: ComponentConfiguration) =>
          this.createIncludeStatement('typescript', 'EventBus', 'typed', config)
      }
    };
  }
}

// Factory function for creating typed builders
export function createTypedIncludeBuilder(defaultConfig?: ComponentConfiguration): IncludeBuilderInstance {
  return new IncludeBuilderInstance(defaultConfig);
}

// Design token preset helpers
export const DesignTokens = {
  light: { theme: 'light' as const },
  dark: { theme: 'dark' as const },
  brand: { theme: 'brand' as const },
  neutral: { theme: 'neutral' as const },

  small: { size: 'small' as const },
  medium: { size: 'medium' as const },
  large: { size: 'large' as const },

  tight: { spacing: 'tight' as const },
  base: { spacing: 'base' as const },
  loose: { spacing: 'loose' as const },

  elevated: { elevation: 'medium' as const },
  flat: { elevation: 'none' as const }
};

// Combine design tokens for common patterns
export const Presets = {
  primaryButton: { ...DesignTokens.brand, ...DesignTokens.medium, ...DesignTokens.base },
  secondaryCard: { ...DesignTokens.light, ...DesignTokens.loose, ...DesignTokens.elevated },
  successBadge: { ...DesignTokens.brand, ...DesignTokens.small },
  largeGrid: { ...DesignTokens.dark, ...DesignTokens.large, ...DesignTokens.loose }
};