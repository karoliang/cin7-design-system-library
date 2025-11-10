/**
 * @cin7/typescript-sdk - Business logic patterns for Cin7 DSL Application Layer
 * 
 * This package provides TypeScript patterns and utilities for building
 * robust business logic separated from UI concerns.
 */

export * from './patterns';
export * from './services';
export * from './state';
export * from './validation';

// Re-export types from core for convenience
export type {
  BaseEntity,
  ApiResponse,
  PaginatedResponse,
  QueryParams,
  FilterCriteria,
  SortCriteria,
} from '@cin7/core/types';

// Package metadata
export const version = '0.1.0';
export const name = '@cin7/typescript-sdk';