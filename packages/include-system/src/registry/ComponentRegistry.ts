/**
 * Component Registry - Central registry for all available components across frameworks
 */

import {
  ComponentRegistry,
  LanguageDefinition,
  ComponentDefinition,
  ComponentVariation,
  SupportedLanguage,
  ComponentNotFoundError,
  VariationNotFoundError,
  ComponentCategory
} from '../types/IncludeSystem';

export class RegistryManager {
  private registry: ComponentRegistry;
  private static instance: RegistryManager;

  constructor() {
    this.registry = {
      languages: {
        react: this.createReactDefinition(),
        vanilla: this.createVanillaDefinition(),
        extjs: this.createExtJSDefinition(),
        typescript: this.createTypeScriptDefinition()
      },
      aliases: {},
      customComponents: {}
    };
  }

  static getInstance(): RegistryManager {
    if (!RegistryManager.instance) {
      RegistryManager.instance = new RegistryManager();
    }
    return RegistryManager.instance;
  }

  /**
   * Get the complete component registry
   */
  getRegistry(): ComponentRegistry {
    return this.registry;
  }

  /**
   * Get language definition
   */
  getLanguage(language: SupportedLanguage): LanguageDefinition {
    const lang = this.registry.languages[language];
    if (!lang) {
      throw new Error(`Language "${language}" not found in registry`);
    }
    return lang;
  }

  /**
   * Get component definition
   */
  getComponent(language: SupportedLanguage, componentName: string): ComponentDefinition {
    const lang = this.getLanguage(language);
    const component = lang.components[componentName];
    if (!component) {
      throw new ComponentNotFoundError(language, componentName);
    }
    return component;
  }

  /**
   * Get component variation
   */
  getVariation(language: SupportedLanguage, componentName: string, variationName: string): ComponentVariation {
    const component = this.getComponent(language, componentName);
    const variation = component.variations.find(v => v.name === variationName);
    if (!variation) {
      throw new VariationNotFoundError(language, componentName, variationName);
    }
    return variation;
  }

  /**
   * Check if component is available
   */
  isAvailable(language: SupportedLanguage, componentName: string, variationName?: string): boolean {
    try {
      const component = this.getComponent(language, componentName);
      if (!variationName) return true;
      return component.variations.some(v => v.name === variationName);
    } catch {
      return false;
    }
  }

  /**
   * List all variations for a component
   */
  listVariations(language: SupportedLanguage, componentName: string): string[] {
    try {
      const component = this.getComponent(language, componentName);
      return component.variations.map(v => v.name);
    } catch {
      return [];
    }
  }

  /**
   * List all components in a language
   */
  listComponents(language: SupportedLanguage): string[] {
    try {
      const lang = this.getLanguage(language);
      return Object.keys(lang.components);
    } catch {
      return [];
    }
  }

  /**
   * List all supported languages
   */
  listLanguages(): SupportedLanguage[] {
    return Object.keys(this.registry.languages) as SupportedLanguage[];
  }

  /**
   * Add custom component to registry
   */
  addCustomComponent(name: string, definition: ComponentDefinition): void {
    this.registry.customComponents[name] = definition;
  }

  /**
   * Add alias for include statement
   */
  addAlias(alias: string, statement: any): void {
    this.registry.aliases[alias] = statement;
  }

  /**
   * Create React language definition
   */
  private createReactDefinition(): LanguageDefinition {
    return {
      name: 'react',
      description: 'React components from Polaris',
      importStyle: 'named',
      defaultExport: false,
      components: {
        Card: {
          name: 'Card',
          description: 'Container for related information',
          category: ComponentCategory.LAYOUT,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard card container',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'header',
              description: 'Header card with emphasized styling',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'product-info',
              description: 'Card optimized for product information display',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'metric-card',
              description: 'Card for displaying metrics and KPIs',
              importPath: '@shopify/polaris',
              dependencies: []
            }
          ]
        },
        Button: {
          name: 'Button',
          description: 'Interactive button component',
          category: ComponentCategory.ACTIONS,
          defaultVariation: 'primary',
          variations: [
            {
              name: 'primary',
              description: 'Primary action button',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'secondary',
              description: 'Secondary action button',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'destructive',
              description: 'Destructive action button',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'plain',
              description: 'Plain button without styling',
              importPath: '@shopify/polaris',
              dependencies: []
            }
          ]
        },
        Badge: {
          name: 'Badge',
          description: 'Status indicator badge',
          category: ComponentCategory.FEEDBACK,
          defaultVariation: 'info',
          variations: [
            {
              name: 'success',
              description: 'Success status badge',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'warning',
              description: 'Warning status badge',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'info',
              description: 'Information status badge',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'new',
              description: 'New feature badge',
              importPath: '@shopify/polaris',
              dependencies: []
            }
          ]
        },
        MediaCard: {
          name: 'MediaCard',
          description: 'Card with media content',
          category: ComponentCategory.LAYOUT,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard media card',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'small',
              description: 'Compact media card',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'video-card',
              description: 'Video content card',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'portrait-video-card',
              description: 'Portrait video card',
              importPath: '@shopify/polaris',
              dependencies: []
            }
          ]
        },
        Page: {
          name: 'Page',
          description: 'Page layout wrapper',
          category: ComponentCategory.LAYOUT,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard page layout',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'full-width',
              description: 'Full width page layout',
              importPath: '@shopify/polaris',
              dependencies: []
            },
            {
              name: 'dashboard',
              description: 'Dashboard page layout',
              importPath: '@shopify/polaris',
              dependencies: []
            }
          ]
        }
      }
    };
  }

  /**
   * Create Vanilla JS language definition
   */
  private createVanillaDefinition(): LanguageDefinition {
    return {
      name: 'vanilla',
      description: 'Vanilla JavaScript components',
      importStyle: 'default',
      defaultExport: true,
      components: {
        Card: {
          name: 'Card',
          description: 'Lightweight card component',
          category: ComponentCategory.LAYOUT,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard card',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'simple',
              description: 'Minimal card styling',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            }
          ]
        },
        Button: {
          name: 'Button',
          description: 'JavaScript button component',
          category: ComponentCategory.ACTIONS,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard button',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'primary',
              description: 'Primary button styling',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'link',
              description: 'Link-style button',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            }
          ]
        },
        Badge: {
          name: 'Badge',
          description: 'Lightweight badge component',
          category: ComponentCategory.FEEDBACK,
          defaultVariation: 'default',
          variations: [
            {
              name: 'success',
              description: 'Success badge',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'warning',
              description: 'Warning badge',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'new',
              description: 'New feature badge',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'trend-up',
              description: 'Trend up indicator',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            }
          ]
        },
        Spinner: {
          name: 'Spinner',
          description: 'Loading spinner component',
          category: ComponentCategory.FEEDBACK,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard spinner',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            },
            {
              name: 'small',
              description: 'Small spinner',
              importPath: '@cin7/vanilla-js',
              dependencies: []
            }
          ]
        }
      }
    };
  }

  /**
   * Create ExtJS language definition
   */
  private createExtJSDefinition(): LanguageDefinition {
    return {
      name: 'extjs',
      description: 'ExtJS enterprise components',
      importStyle: 'named',
      defaultExport: false,
      components: {
        DataGrid: {
          name: 'DataGrid',
          description: 'Enterprise data grid component',
          category: ComponentCategory.DISPLAY,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard data grid',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            },
            {
              name: 'enterprise',
              description: 'Enterprise-grade data grid with advanced features',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            },
            {
              name: 'compact',
              description: 'Compact data grid for space-constrained layouts',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            }
          ]
        },
        ComboBox: {
          name: 'ComboBox',
          description: 'ExtJS combo box component',
          category: ComponentCategory.INPUT,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard combo box',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            },
            {
              name: 'abc',
              description: 'ABC configuration combo box',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            },
            {
              name: 'search',
              description: 'Searchable combo box',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            }
          ]
        },
        FormPanel: {
          name: 'FormPanel',
          description: 'ExtJS form panel component',
          category: ComponentCategory.FORMS,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard form panel',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            },
            {
              name: 'settings',
              description: 'Settings form panel',
              importPath: '@cin7/extjs-adapters',
              dependencies: []
            }
          ]
        }
      }
    };
  }

  /**
   * Create TypeScript language definition
   */
  private createTypeScriptDefinition(): LanguageDefinition {
    return {
      name: 'typescript',
      description: 'TypeScript business logic patterns',
      importStyle: 'named',
      defaultExport: false,
      components: {
        Repository: {
          name: 'Repository',
          description: 'Repository pattern implementation',
          category: ComponentCategory.DISPLAY,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard repository',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            },
            {
              name: 'standard',
              description: 'Standard repository configuration',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            }
          ]
        },
        UseCase: {
          name: 'UseCase',
          description: 'Use case pattern implementation',
          category: ComponentCategory.DISPLAY,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard use case',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            },
            {
              name: 'crud',
              description: 'CRUD operations use case',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            }
          ]
        },
        EventBus: {
          name: 'EventBus',
          description: 'Event bus implementation',
          category: ComponentCategory.DISPLAY,
          defaultVariation: 'default',
          variations: [
            {
              name: 'default',
              description: 'Standard event bus',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            },
            {
              name: 'typed',
              description: 'Type-safe event bus',
              importPath: '@cin7/typescript-sdk',
              dependencies: []
            }
          ]
        }
      }
    };
  }
}

// Singleton instance
export const componentRegistry = RegistryManager.getInstance();