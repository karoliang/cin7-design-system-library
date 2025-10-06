/**
 * Vanilla JS Adapter - Handles Vanilla JavaScript component generation
 */

import {
  LanguageAdapter,
  ResolvedInclude,
  SupportedLanguage,
  ComponentVariation
} from '../types/IncludeSystem';

export class VanillaAdapter implements LanguageAdapter {
  language: SupportedLanguage = 'vanilla';

  generateImport(resolved: ResolvedInclude): string {
    const { component, variation } = resolved;

    // Vanilla JS components use class imports
    return `import { ${component.name}Component } from '${variation.importPath}';`;
  }

  generateCode(resolved: ResolvedInclude): string {
    const { component, variation, statement } = resolved;
    const componentName = statement.alias || `${component.name}Component`;
    const instanceName = this.toCamelCase(component.name);

    // Generate Vanilla JS component usage based on variation
    switch (component.name) {
      case 'Card':
        return this.generateCardCode(componentName, instanceName, statement.variation);
      case 'Button':
        return this.generateButtonCode(componentName, instanceName, statement.variation);
      case 'Badge':
        return this.generateBadgeCode(componentName, instanceName, statement.variation);
      case 'Spinner':
        return this.generateSpinnerCode(componentName, instanceName, statement.variation);
      default:
        return `const ${instanceName} = new ${componentName}({});\n${instanceName}.mount('#app');`;
    }
  }

  validateVariation(variation: ComponentVariation): boolean {
    // Vanilla JS components should be lightweight
    return true;
  }

  getDependencies(variation: ComponentVariation): string[] {
    // Vanilla JS components might need CSS files
    return variation.importPath.endsWith('.css') ? [variation.importPath] : [];
  }

  private generateCardCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation);
    const configStr = this.formatConfig(config);

    return `const ${instanceName} = new ${componentName}({
  title: 'Card Title',
  content: 'Card content goes here',
  ${configStr}
});
${instanceName}.mount('#app');`;
  }

  private generateButtonCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation);
    const configStr = this.formatConfig(config);

    return `const ${instanceName} = new ${componentName}({
  label: 'Click me',
  onClick: () => console.log('Button clicked'),
  ${configStr}
});
${instanceName}.mount('#app');`;
  }

  private generateBadgeCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation);
    const configStr = this.formatConfig(config);

    return `const ${instanceName} = new ${componentName}({
  text: 'Badge Text',
  ${configStr}
});
${instanceName}.mount('#app');`;
  }

  private generateSpinnerCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation);
    const configStr = this.formatConfig(config);

    return `const ${instanceName} = new ${componentName}({
  size: '${variation === 'small' ? 'small' : 'medium'}',
  ${configStr}
});
${instanceName}.mount('#app');`;
  }

  private getVariationConfig(variation: string): Record<string, any> {
    const configs: Record<string, Record<string, any>> = {
      // Card variations
      'default': { variant: 'default' },
      'simple': { variant: 'simple' },

      // Button variations
      'default': { variant: 'default' },
      'primary': { variant: 'primary' },
      'link': { variant: 'link' },

      // Badge variations
      'success': { status: 'success' },
      'warning': { status: 'warning' },
      'new': { status: 'new' },
      'trend-up': { status: 'trend-up' },

      // Spinner variations
      'default': { size: 'medium' },
      'small': { size: 'small' }
    };

    return configs[variation] || {};
  }

  private formatConfig(config: Record<string, any>): string {
    return Object.entries(config)
      .filter(([_, value]) => value !== undefined && value !== {})
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}: '${value}'`;
        } else {
          return `${key}: ${value}`;
        }
      })
      .join(',\n  ');
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}