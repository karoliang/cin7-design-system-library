/**
 * @cin7/design-tokens - Extended design tokens for Cin7 DSL
 * 
 * This package provides comprehensive design tokens that extend
 * Polaris tokens with enterprise-specific values for data grids,
 * advanced forms, charts, and more.
 */

export * from './tokens';
export * from './utilities';
export * from './themes';

// Generate CSS at build time
import { generateTokenCSS } from './utilities/css-generator';
export const tokenCSS = generateTokenCSS();

// Package metadata
export const version = '0.1.0';
export const name = '@cin7/design-tokens';