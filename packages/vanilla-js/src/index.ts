/**
 * @cin7/vanilla-js - Lightweight UI interaction utilities
 * 
 * Pure vanilla JavaScript utilities for the UI Interaction Layer of Cin7 DSL.
 * No framework dependencies, optimized for performance.
 */

export * from './dom';
export * from './events';
export * from './animations';
export * from './utils';
export * from './components';

// Re-export from core for convenience
export { DOMUtils, EventUtils } from '@cin7/core/utils';

// Package metadata
export const version = '0.1.0';
export const name = '@cin7/vanilla-js';