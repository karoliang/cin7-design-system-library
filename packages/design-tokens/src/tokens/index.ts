/**
 * Cin7 DSL Design Tokens
 * Extends Polaris tokens with enterprise-specific values
 */

// Export our custom token extensions
export * from './enterprise';
export * from './animation';
export * from './spacing';
export * from './typography';

// Note: @shopify/polaris-tokens is available as a peer dependency
// Import it directly in your code when needed:
// import { tokens } from '@shopify/polaris-tokens';