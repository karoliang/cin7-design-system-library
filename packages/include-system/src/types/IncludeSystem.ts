/**
 * Core types for the Cin7 DSL Include System
 */

export type SupportedLanguage = 'react' | 'vanilla' | 'extjs' | 'typescript';

export enum ComponentCategory {
  LAYOUT = 'layout',
  FEEDBACK = 'feedback',
  INPUT = 'input',
  DISPLAY = 'display',
  NAVIGATION = 'navigation',
  ACTIONS = 'actions',
  IMAGES = 'images',
  FORMS = 'forms',
  OVERLAYS = 'overlays',
  TYPOGRAPHY = 'typography'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  BRAND = 'brand',
  NEUTRAL = 'neutral'
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large'
}

export enum Spacing {
  NONE = 'none',
  TIGHT = 'tight',
  BASE = 'base',
  LOOSE = 'loose',
  EXTRA_LOOSE = 'extra-loose'
}

export interface ComponentVariation {
  name: string;
  description: string;
  importPath: string;
  dependencies?: string[];
  props?: Record<string, any>;
}

export interface ComponentDefinition {
  name: string;
  description: string;
  category: ComponentCategory;
  variations: ComponentVariation[];
  defaultVariation: string;
  framework?: string;
  metadata?: ComponentMetadata;
  importPath?: string;
}

export interface LanguageDefinition {
  name: SupportedLanguage;
  description: string;
  importStyle: 'default' | 'named' | 'namespace';
  defaultExport?: boolean;
  components: Record<string, ComponentDefinition>;
}

export interface ComponentConfiguration {
  [key: string]: string | number | boolean | Record<string, any> | DesignTokenPreset | Record<string, any>;
}

export interface IncludeStatement {
  language: SupportedLanguage;
  component: string;
  variation: string;
  alias?: string;
  config?: ComponentConfiguration;
  metadata?: Record<string, any>;
}

export interface ResolvedInclude {
  statement: IncludeStatement;
  component: ComponentDefinition;
  variation: ComponentVariation;
  importStatement: string;
  dependencies: string[];
}

export interface ComponentRegistry {
  languages: Record<SupportedLanguage, LanguageDefinition>;
  aliases: Record<string, IncludeStatement>;
  customComponents: Record<string, ComponentDefinition>;
}

export interface IncludeSystemConfig {
  enableDebugMode?: boolean;
  strictMode?: boolean;
  autoLoadDependencies?: boolean;
  customComponentPaths?: string[];
  frameworkPreferences?: SupportedLanguage[];
}

export interface IncludeResolver {
  resolve(statement: IncludeStatement): ResolvedInclude;
  isAvailable(language: SupportedLanguage, component: string, variation?: string): boolean;
  listVariations(language: SupportedLanguage, component: string): string[];
  listComponents(language: SupportedLanguage): string[];
  listLanguages(): SupportedLanguage[];
}

export interface LanguageAdapter {
  language: SupportedLanguage;
  generateImport(resolved: ResolvedInclude): string;
  generateCode(resolved: ResolvedInclude): string;
  validateVariation(variation: ComponentVariation): boolean;
  getDependencies(variation: ComponentVariation): string[];
}

export interface BuildContext {
  includes: IncludeStatement[];
  resolved: ResolvedInclude[];
  imports: string[];
  errors: string[];
  warnings: string[];
}

export interface ComponentMetadata {
  framework?: string;
  version?: string;
  deprecated?: boolean;
  experimental?: boolean;
  since?: string;
  accessibility?: {
    compliant: boolean;
    features: string[];
  };
  performance?: {
    weight: 'light' | 'medium' | 'heavy';
    loadTime?: string;
  };
}

// Error types
export class IncludeError extends Error {
  constructor(
    message: string,
    public code: string,
    public statement?: IncludeStatement
  ) {
    super(message);
    this.name = 'IncludeError';
  }
}

export class ComponentNotFoundError extends IncludeError {
  constructor(language: SupportedLanguage, component: string, variation?: string) {
    const variationText = variation ? ` with variation "${variation}"` : '';
    super(
      `Component "${component}"${variationText} not found in framework "${language}"`,
      'COMPONENT_NOT_FOUND',
      { language, component, variation }
    );
  }
}

export class LanguageNotSupportedError extends IncludeError {
  constructor(language: string) {
    super(
      `Language "${language}" is not supported by the include system`,
      'LANGUAGE_NOT_SUPPORTED',
      { language } as any
    );
  }
}

export class VariationNotFoundError extends IncludeError {
  constructor(language: SupportedLanguage, component: string, variation: string) {
    super(
      `Variation "${variation}" not found for component "${component}" in framework "${language}"`,
      'VARIATION_NOT_FOUND',
      { language, component, variation }
    );
  }
}

// Utility types
export type ComponentPath = string;
export type ImportPath = string;
export type ComponentName = string;
export type VariationName = string;

// Type-safe builder pattern types
export type ComponentNames<T extends SupportedLanguage> = T extends 'react'
  ? 'Card' | 'Button' | 'Badge' | 'MediaCard' | 'Page'
  : T extends 'vanilla'
  ? 'Card' | 'Button' | 'Badge' | 'Spinner'
  : T extends 'extjs'
  ? 'DataGrid' | 'ComboBox' | 'FormPanel'
  : T extends 'typescript'
  ? 'Repository' | 'UseCase' | 'EventBus'
  : never;

export type IncludeBuilder<T extends SupportedLanguage> = {
  [K in ComponentNames<T>]: {
    [V in string]: (config?: ComponentConfiguration) => IncludeStatement;
  };
};

export interface TypedIncludeBuilder {
  react: {
    Card: { default: (config?: ComponentConfiguration) => IncludeStatement };
    Button: { primary: (config?: ComponentConfiguration) => IncludeStatement };
    Badge: { success: (config?: ComponentConfiguration) => IncludeStatement };
    MediaCard: { 'video-card': (config?: ComponentConfiguration) => IncludeStatement };
    Page: { dashboard: (config?: ComponentConfiguration) => IncludeStatement };
  };
  vanilla: {
    Card: { default: (config?: ComponentConfiguration) => IncludeStatement };
    Button: { primary: (config?: ComponentConfiguration) => IncludeStatement };
    Badge: { success: (config?: ComponentConfiguration) => IncludeStatement };
    Spinner: { small: (config?: ComponentConfiguration) => IncludeStatement };
  };
  extjs: {
    DataGrid: { enterprise: (config?: ComponentConfiguration) => IncludeStatement };
    ComboBox: { abc: (config?: ComponentConfiguration) => IncludeStatement };
    FormPanel: { settings: (config?: ComponentConfiguration) => IncludeStatement };
  };
  typescript: {
    Repository: { standard: (config?: ComponentConfiguration) => IncludeStatement };
    UseCase: { crud: (config?: ComponentConfiguration) => IncludeStatement };
    EventBus: { typed: (config?: ComponentConfiguration) => IncludeStatement };
  };
}

// Enhanced configuration presets
export interface DesignTokenPreset {
  theme?: Theme;
  size?: Size;
  spacing?: Spacing;
  elevation?: string;
  borderRadius?: string;
  colorScheme?: string;
}

export interface EnhancedIncludeConfiguration extends ComponentConfiguration {
  designTokens?: DesignTokenPreset;
  responsive?: {
    small?: ComponentConfiguration;
    medium?: ComponentConfiguration;
    large?: ComponentConfiguration;
  };
  accessibility?: {
    ariaLabel?: string;
    role?: string;
    describedBy?: string;
  };
}