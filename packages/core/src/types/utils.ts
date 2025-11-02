/**
 * Utility types for the Cin7 DSL framework
 */

import type { QueryParams, PaginatedResponse } from './common';

// Validation types
export type ValidationRule<T> = {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
};

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// Generic CRUD operations
export type CRUDOperations<T, CreateDTO = Omit<T, 'id' | 'createdAt' | 'updatedAt'>, UpdateDTO = Partial<CreateDTO>> = {
  create: (data: CreateDTO) => Promise<T>;
  read: (id: string) => Promise<T>;
  update: (id: string, data: UpdateDTO) => Promise<T>;
  delete: (id: string) => Promise<void>;
  list: (params?: QueryParams) => Promise<PaginatedResponse<T>>;
};

// Utility type helpers
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Function types
export type AnyFunction = (...args: any[]) => any;
export type NoopFunction = () => void;
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;