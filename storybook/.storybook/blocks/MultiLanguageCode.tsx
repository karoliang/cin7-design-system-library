import React from 'react';
import { Code } from './Code';
import { getCodeVariants } from './codeVariants';

interface MultiLanguageCodeProps {
  componentName: string;
  exampleName: string;
}

export function MultiLanguageCode({
  componentName,
  exampleName
}: MultiLanguageCodeProps) {
  const variants = getCodeVariants(componentName, exampleName);

  if (!variants) {
    return (
      <div style={{
        margin: '20px 0',
        padding: '16px',
        border: '1px solid var(--color-gray-300, #d1d5db)',
        borderRadius: 'var(--border-radius-base, 4px)',
        backgroundColor: 'var(--color-gray-50, #f9fafb)',
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--font-size-sm, 14px)',
        color: 'var(--color-gray-600, #4b5563)'
      }}>
        <p style={{ margin: 0 }}>
          Code examples for <strong>{componentName}/{exampleName}</strong> are not yet available.
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 'var(--font-size-xs, 12px)' }}>
          To add examples, edit <code>.storybook/blocks/codeVariants.ts</code>
        </p>
      </div>
    );
  }

  const codeTabs = [
    {
      title: 'React',
      code: variants.react,
      language: 'jsx'
    },
    {
      title: 'Vanilla JS',
      code: variants.vanilla,
      language: 'javascript'
    },
    {
      title: 'ExtJS',
      code: variants.extjs,
      language: 'javascript'
    },
    {
      title: 'TypeScript',
      code: variants.typescript,
      language: 'typescript'
    }
  ];

  return (
    <div>
      <div style={{
        margin: '12px 0 8px',
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--font-size-base, 16px)',
        fontWeight: '600',
        color: 'var(--color-gray-900, #111827)'
      }}>
        Implementation Examples
      </div>
      <p style={{
        margin: '0 0 16px',
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--font-size-sm, 14px)',
        color: 'var(--color-gray-600, #4b5563)'
      }}>
        Choose your framework to see how to implement this component in your application:
      </p>
      <Code code={codeTabs} />
    </div>
  );
}
