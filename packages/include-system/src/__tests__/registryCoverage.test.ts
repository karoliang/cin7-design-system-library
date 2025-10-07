import {componentRegistry} from '../registry/ComponentRegistry';
import {componentVariationDataset} from '../generated/componentVariations';
import {SupportedLanguage} from '../types/IncludeSystem';

const languages: SupportedLanguage[] = ['react', 'vanilla', 'extjs', 'typescript'];

describe('component registry coverage', () => {
  for (const component of componentVariationDataset.components) {
    const componentName = toPascalCase(component.slug);
    const variationNames = collectVariations(component.slug, component.variations);

    for (const variationName of variationNames) {
      for (const language of languages) {
        it(`exposes ${componentName}.${variationName} for ${language}`, () => {
          expect(
            componentRegistry.isAvailable(language, componentName, variationName),
          ).toBe(true);
        });
      }
    }
  }
});

function collectVariations(
  componentSlug: string,
  variations: readonly {
    fileName: string;
    exampleSlug: string;
    title: string | null;
    description: string | null;
  }[],
): string[] {
  const names = new Set<string>();

  for (const variation of variations) {
    names.add(deriveVariationName(componentSlug, variation.exampleSlug));
  }

  if (names.size === 0) {
    names.add('default');
  }

  return Array.from(names);
}

function deriveVariationName(componentSlug: string, exampleSlug: string): string {
  if (!exampleSlug || exampleSlug === componentSlug) {
    return 'default';
  }

  if (exampleSlug.startsWith(`${componentSlug}-`)) {
    const suffix = exampleSlug.substring(componentSlug.length + 1);
    return suffix || 'default';
  }

  return exampleSlug;
}

function toPascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}
