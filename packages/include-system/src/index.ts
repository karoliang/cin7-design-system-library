/**
 * Cin7 DSL Include System
 * Revolutionary component declaration system for unified multi-framework development
 */

// Core types
export * from './types/IncludeSystem';

// Import classes for use in convenience functions
import { IncludeResolver } from './core/IncludeResolver';
import { ReactAdapter } from './adapters/ReactAdapter';
import { VanillaAdapter } from './adapters/VanillaAdapter';
import { ExtJSAdapter } from './adapters/ExtJSAdapter';
import { TypeScriptAdapter } from './adapters/TypeScriptAdapter';

// Core classes
export { IncludeResolver, defaultResolver } from './core/IncludeResolver';
export { RegistryManager, componentRegistry } from './registry/ComponentRegistry';

// Language adapters
export { ReactAdapter } from './adapters/ReactAdapter';
export { VanillaAdapter } from './adapters/VanillaAdapter';
export { ExtJSAdapter } from './adapters/ExtJSAdapter';
export { TypeScriptAdapter } from './adapters/TypeScriptAdapter';

// Type-safe builders
export {
  IncludeBuilderInstance,
  createTypedIncludeBuilder,
  DesignTokens,
  Presets
} from './builders/TypedIncludeBuilder';

// Convenience functions
export function createIncludeResolver(config?: any): IncludeResolver {
  const resolver = new IncludeResolver(config);

  // Register default adapters
  resolver.registerAdapter(new ReactAdapter());
  resolver.registerAdapter(new VanillaAdapter());
  resolver.registerAdapter(new ExtJSAdapter());
  resolver.registerAdapter(new TypeScriptAdapter());

  return resolver;
}

// Global include function (when used in development mode)
export function include(language: string, component: string, variation: string): string {
  const resolver = createIncludeResolver({ enableDebugMode: true });

  try {
    const resolved = resolver.resolve({ language: language as any, component, variation });
    return resolved.importStatement;
  } catch (error) {
    console.error(`Failed to resolve include: ${language}.${component}.${variation}`, error);
    return `// Failed to resolve include: ${language}.${component}.${variation}`;
  }
}

// Utility functions
export function isAvailable(language: string, component: string, variation?: string): boolean {
  const resolver = createIncludeResolver();
  return resolver.isAvailable(language as any, component, variation);
}

export function listVariations(language: string, component: string): string[] {
  const resolver = createIncludeResolver();
  return resolver.listVariations(language as any, component);
}

export function listComponents(language: string): string[] {
  const resolver = createIncludeResolver();
  return resolver.listComponents(language as any);
}

export function listLanguages(): string[] {
  const resolver = createIncludeResolver();
  return resolver.listLanguages();
}

// Package metadata
export const version = '0.1.0';
export const name = '@cin7/include-system';