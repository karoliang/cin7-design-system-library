// Re-export types
export type { CodeVariant } from './types';

// Re-export all component examples
export * from './actions';
export * from './forms';
export * from './navigation';
export * from './feedback';
export * from './dataDisplay';
export * from './media';
export * from './layout';
export * from './charts';
export * from './utilities';
export * from './patterns';
export * from './integration';
export * from './theming';

// Re-export the getCodeExample function
export { getCodeExample } from './getCodeExample';

// Backward compatibility - export with original name
export { getCodeExample as getCodeVariants } from './getCodeExample';
