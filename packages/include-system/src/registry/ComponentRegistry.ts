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
  ComponentCategory,
} from '../types/IncludeSystem';
import {componentVariationDataset} from '../generated/componentVariations';

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
      components: buildComponentsFromDataset('react', '@shopify/polaris'),
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
      components: buildComponentsFromDataset('vanilla', '@cin7/vanilla-js'),
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
      components: buildComponentsFromDataset('extjs', '@cin7/extjs-adapters'),
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
      components: buildComponentsFromDataset('typescript', '@cin7/typescript-sdk'),
    };
  }
}

// Singleton instance
export const componentRegistry = RegistryManager.getInstance();

type DatasetComponent = (typeof componentVariationDataset.components)[number];
type DatasetVariation = DatasetComponent['variations'][number];

function buildComponentsFromDataset(
  language: SupportedLanguage,
  importPath: string,
): Record<string, ComponentDefinition> {
  const components: Record<string, ComponentDefinition> = {};

  for (const item of componentVariationDataset.components) {
    const componentName = toPascalCase(item.slug);
    const variations = buildVariations(item, importPath, language);

    const existing = components[componentName];
    if (existing) {
      const variationMap = new Map<string, ComponentVariation>();
      for (const variation of existing.variations) {
        variationMap.set(variation.name, variation);
      }
      for (const variation of variations) {
        if (!variationMap.has(variation.name)) {
          variationMap.set(variation.name, variation);
        }
      }

      const mergedVariations = Array.from(variationMap.values());
      existing.variations = mergedVariations;
      existing.defaultVariation =
        mergedVariations.find((variation) => variation.name === 'default')?.name ??
        (mergedVariations[0] ? mergedVariations[0].name : 'default');
      continue;
    }

    const defaultVariation =
      variations.find((variation) => variation.name === 'default')?.name ||
      (variations[0] ? variations[0].name : 'default');

    components[componentName] = {
      name: componentName,
      description:
        language === 'react'
          ? item.title ?? componentName
          : `${componentName} include for ${language.toUpperCase()}`,
      category: mapGroupToCategory(item.group),
      defaultVariation,
      variations,
    };
  }

  return components;
}

function buildVariations(
  component: DatasetComponent,
  importPath: string,
  language: SupportedLanguage,
): ComponentVariation[] {
  const variations: ComponentVariation[] = [];
  const seen = new Set<string>();

  for (const variation of component.variations) {
    const name = deriveVariationName(component.slug, variation);
    if (seen.has(name)) continue;
    seen.add(name);

    const description = buildVariationDescription(
      component,
      variation,
      name,
      language,
    );

    variations.push({
      name,
      description,
      importPath,
      dependencies: [],
    });
  }

  if (!seen.has('default')) {
    variations.unshift({
      name: 'default',
      description:
        language === 'react'
          ? `Default variation for ${component.title ?? component.slug}`
          : `Default ${language.toUpperCase()} include for ${
              component.title ?? component.slug
            }`,
      importPath,
      dependencies: [],
    });
  }

  return variations;
}

function deriveVariationName(
  componentSlug: string,
  variation: DatasetVariation,
): string {
  const exampleSlug = variation.exampleSlug ?? '';
  if (!exampleSlug || exampleSlug === componentSlug) {
    return 'default';
  }

  if (exampleSlug.startsWith(`${componentSlug}-`)) {
    const suffix = exampleSlug.substring(componentSlug.length + 1);
    return suffix || 'default';
  }

  return exampleSlug;
}

function buildVariationDescription(
  component: DatasetComponent,
  variation: DatasetVariation,
  name: string,
  language: SupportedLanguage,
): string {
  const parts: string[] = [];
  if (variation.title) parts.push(variation.title);
  if (variation.description) parts.push(variation.description);

  if (parts.length === 0) {
    return language === 'react'
      ? `${toPascalCase(component.slug)} variation "${name}"`
      : `${toPascalCase(component.slug)} ${language.toUpperCase()} include "${name}"`;
  }

  if (language === 'react') {
    return parts.join(' — ');
  }

  return `${parts.join(' — ')} (${language.toUpperCase()} include)`;
}

function toPascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join('');
}

function mapGroupToCategory(group: string): ComponentCategory {
  const mapping: Record<string, ComponentCategory> = {
    actions: ComponentCategory.ACTIONS,
    'feedback-indicators': ComponentCategory.FEEDBACK,
    'images-and-icons': ComponentCategory.IMAGES,
    'layout-and-structure': ComponentCategory.LAYOUT,
    navigation: ComponentCategory.NAVIGATION,
    overlays: ComponentCategory.OVERLAYS,
    'selection-and-input': ComponentCategory.INPUT,
    tables: ComponentCategory.DISPLAY,
    typography: ComponentCategory.TYPOGRAPHY,
    lists: ComponentCategory.DISPLAY,
    'internal-only': ComponentCategory.DISPLAY,
    deprecated: ComponentCategory.DISPLAY,
    utilities: ComponentCategory.DISPLAY,
  };

  return mapping[group] ?? ComponentCategory.DISPLAY;
}
