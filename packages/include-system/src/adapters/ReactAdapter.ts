/**
 * React Adapter - Handles React component generation
 */

import {
  LanguageAdapter,
  ResolvedInclude,
  SupportedLanguage,
  ComponentVariation
} from '../types/IncludeSystem';

export class ReactAdapter implements LanguageAdapter {
  language: SupportedLanguage = 'react';

  generateImport(resolved: ResolvedInclude): string {
    const { component, variation, statement } = resolved;
    const componentName = statement.alias || component.name;

    // Generate React import
    if (variation.importPath === '@shopify/polaris') {
      return `import { ${component.name} } from '@shopify/polaris';`;
    } else {
      return `import { ${component.name} } from '${variation.importPath}';`;
    }
  }

  generateCode(resolved: ResolvedInclude): string {
    const { component, variation, statement } = resolved;
    const componentName = statement.alias || component.name;
    const variationConfig = this.getVariationConfig(component.name, statement.variation);
    const config = statement.config || {};

    // Merge variation config with user config
    let mergedConfig = { ...variationConfig, ...config };

    // Apply design tokens if present
    mergedConfig = this.applyDesignTokens(mergedConfig);

    // Generate React component usage based on variation
    switch (component.name) {
      case 'Card':
        return this.generateCardCode(componentName, mergedConfig);
      case 'Button':
        return this.generateButtonCode(componentName, mergedConfig);
      case 'Badge':
        return this.generateBadgeCode(componentName, mergedConfig);
      case 'MediaCard':
        return this.generateMediaCardCode(componentName, mergedConfig);
      case 'Page':
        return this.generatePageCode(componentName, mergedConfig);
      default:
        // Generate a generic component for unknown components
        return this.generateGenericComponentCode(componentName, mergedConfig);
    }
  }

  validateVariation(variation: ComponentVariation): boolean {
    // React components are generally flexible with variations
    return true;
  }

  getDependencies(variation: ComponentVariation): string[] {
    // React dependencies are typically handled by the import path
    return [];
  }

  private getVariationConfig(componentName: string, variation: string): Record<string, any> {
    switch (componentName) {
      case 'Card':
        if (variation === 'header' || variation === 'product-info' || variation === 'metric-card') {
          return { sectioned: true };
        }
        return {};
      case 'Button':
        if (variation === 'primary') {
          return { variant: 'primary' };
        }
        if (variation === 'destructive') {
          return { variant: 'destructive' };
        }
        if (variation === 'plain') {
          return { plain: true };
        }
        return {};
      case 'Badge':
        if (variation === 'success' || variation === 'warning' || variation === 'info' || variation === 'new') {
          return { status: variation };
        }
        return {};
      case 'MediaCard':
        if (variation === 'small') {
          return { size: 'small' };
        }
        if (variation === 'portrait-video-card') {
          return { portrait: true };
        }
        return {};
      case 'Page':
        if (variation === 'full-width') {
          return { fullWidth: true };
        }
        if (variation === 'dashboard') {
          return { title: 'Dashboard' };
        }
        return {};
      default:
        return {};
    }
  }

  private applyDesignTokens(config: Record<string, any>): Record<string, any> {
    const { designTokens } = config;
    if (!designTokens) return config;

    const tokenProps: Record<string, any> = {};

    // Map design tokens to React props
    if (designTokens.theme) {
      // Apply theme-specific props
      if (designTokens.theme === 'dark') {
        tokenProps.background = 'bg-surface-dark';
        tokenProps.color = 'text-on-dark';
      } else if (designTokens.theme === 'brand') {
        tokenProps.background = 'bg-surface-brand';
        tokenProps.color = 'text-on-brand';
      }
    }

    if (designTokens.size) {
      tokenProps.size = designTokens.size;
    }

    if (designTokens.spacing) {
      // Convert spacing to padding/margin as appropriate
      tokenProps.padding = this.mapSpacing(designTokens.spacing);
    }

    if (designTokens.elevation) {
      tokenProps.shadow = this.mapElevation(designTokens.elevation);
    }

    // Merge design token props with existing config
    return { ...config, ...tokenProps };
  }

  private mapSpacing(spacing: string): string {
    const spacingMap: Record<string, string> = {
      'none': '0',
      'tight': '2',
      'base': '4',
      'loose': '6',
      'extra-loose': '8'
    };
    return spacingMap[spacing] || '4';
  }

  private mapElevation(elevation: string): string {
    const elevationMap: Record<string, string> = {
      'none': 'none',
      'small': 'shadow-sm',
      'medium': 'shadow-md',
      'large': 'shadow-lg',
      'extra-large': 'shadow-xl'
    };
    return elevationMap[elevation] || 'shadow-md';
  }

  private generateCardCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps(config);
    return `<${componentName}${props}>
  <Card.Section>
    <Text variant="headingMd">Card content</Text>
    <Text>Card description text</Text>
  </Card.Section>
</${componentName}>`;
  }

  private generateButtonCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps({
      onClick: () => console.log(`${componentName} clicked`),
      ...config
    });
    return `<${componentName}${props}>Button Text</${componentName}>`;
  }

  private generateBadgeCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps(config);
    return `<${componentName}${props}>Badge Text</${componentName}>`;
  }

  private generateMediaCardCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps({
      title: 'Getting Started',
      primaryAction: { content: 'Learn more', onAction: () => {} },
      description: 'Discover how to get started with our platform.',
      ...config
    });
    return `<${componentName}${props}>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{ objectFit: 'cover', objectPosition: 'center' }}
    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</${componentName}>`;
  }

  private generatePageCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps({
      title: 'Page Title',
      breadcrumbs: [{ content: 'Home', url: '/' }],
      ...config
    });
    return `<${componentName}${props}>
  <Layout>
    <Layout.Section>
      <Text variant="headingLg">Page content</Text>
    </Layout.Section>
  </Layout>
</${componentName}>`;
  }

  private generateGenericComponentCode(componentName: string, config: Record<string, any>): string {
    const props = this.formatProps(config);
    return `<${componentName}${props}>
  <Text variant="bodyMd">Generic component content</Text>
</${componentName}>`;
  }

  private formatProps(props: Record<string, any>): string {
    const propsList = Object.entries(props)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (typeof value === 'function') {
          return `${key}={${value.toString()}}`;
        } else if (typeof value === 'object' && value !== null) {
          return `${key}={${JSON.stringify(value)}}`;
        } else if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else {
          return `${key}={${value}}`;
        }
      });

    return propsList.length > 0 ? ` ${propsList.join(' ')}` : '';
  }
}
