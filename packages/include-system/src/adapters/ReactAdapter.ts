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
    const variationName = this.getVariationConfig(statement.variation);

    // Generate React component usage based on variation
    switch (component.name) {
      case 'Card':
        return this.generateCardCode(componentName, variationName);
      case 'Button':
        return this.generateButtonCode(componentName, variationName);
      case 'Badge':
        return this.generateBadgeCode(componentName, variationName);
      case 'MediaCard':
        return this.generateMediaCardCode(componentName, variationName);
      case 'Page':
        return this.generatePageCode(componentName, variationName);
      default:
        return `<${componentName} {...${variationName}} />`;
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

  private getVariationConfig(variation: string): Record<string, any> {
    const configs: Record<string, Record<string, any>> = {
      // Card variations
      'default': {},
      'header': { sectioned: true },
      'product-info': { sectioned: true },
      'metric-card': { sectioned: true },

      // Button variations
      'primary': { variant: 'primary' },
      'secondary': {},
      'destructive': { variant: 'destructive' },
      'plain': { plain: true },

      // Badge variations
      'success': { status: 'success' },
      'warning': { status: 'warning' },
      'info': { status: 'info' },
      'new': { status: 'new' },

      // MediaCard variations
      'default': {},
      'small': { size: 'small' },
      'video-card': {},
      'portrait-video-card': { portrait: true },

      // Page variations
      'default': {},
      'full-width': { fullWidth: true },
      'dashboard': { title: 'Dashboard' }
    };

    return configs[variation] || {};
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

  private formatProps(props: Record<string, any>): string {
    const propsList = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== {})
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