import React, { useState } from 'react';
import Code from '../Code';
import styles from './CodeExample.module.scss';

export interface CodeVariant {
  label: string;
  code: string;
  language: string;
}

interface CodeExampleProps {
  title?: string;
  description?: string;
  variants: CodeVariant[];
  defaultVariant?: number;
}

export function CodeExample({ 
  title, 
  description, 
  variants, 
  defaultVariant = 0 
}: CodeExampleProps) {
  if (variants.length === 0) {
    return null;
  }

  // Convert variants to the format expected by Code component
  const codeData = variants.map(variant => ({
    title: variant.label,
    code: variant.code,
    className: `language-${variant.language}`
  }));

  return (
    <div className={styles.CodeExample}>
      {title && <h4 className={styles.Title}>{title}</h4>}
      {description && <p className={styles.Description}>{description}</p>}
      <Code code={codeData} />
    </div>
  );
}

// Helper to create standard variants for a component
export function createStandardVariants(componentName: string, examples: {
  react?: string;
  extjs?: string;
  vanilla?: string;
  typescript?: string;
}): CodeVariant[] {
  const variants: CodeVariant[] = [];
  
  if (examples.react) {
    variants.push({
      label: 'React',
      code: examples.react,
      language: 'jsx'
    });
  }
  
  if (examples.extjs) {
    variants.push({
      label: 'ExtJS',
      code: examples.extjs,
      language: 'javascript'
    });
  }
  
  if (examples.vanilla) {
    variants.push({
      label: 'Vanilla JS',
      code: examples.vanilla,
      language: 'javascript'
    });
  }
  
  if (examples.typescript) {
    variants.push({
      label: 'TypeScript',
      code: examples.typescript,
      language: 'typescript'
    });
  }
  
  return variants;
}