/**
 * Common types used across the Cin7 DSL framework
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface FilterCriteria {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin';
  value: any;
}

export interface SortCriteria {
  field: string;
  direction: 'asc' | 'desc';
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  filters?: FilterCriteria[];
  sort?: SortCriteria[];
  search?: string;
}

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
};