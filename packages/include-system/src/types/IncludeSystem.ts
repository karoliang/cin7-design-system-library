/**
 * Core types for the Cin7 DSL Include System
 */

export type SupportedLanguage = 'react' | 'vanilla' | 'extjs' | 'typescript';

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
  category: string;
  variations: ComponentVariation[];
  defaultVariation: string;
  framework?: string;
}

export interface LanguageDefinition {
  name: SupportedLanguage;
  description: string;
  importStyle: 'default' | 'named' | 'namespace';
  defaultExport?: boolean;
  components: Record<string, ComponentDefinition>;
}

export interface IncludeStatement {
  language: SupportedLanguage;
  component: string;
  variation: string;
  alias?: string;
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