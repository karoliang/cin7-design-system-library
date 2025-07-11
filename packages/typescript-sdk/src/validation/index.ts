/**
 * Validation utilities using Zod
 */

import { z } from 'zod';

export { z } from 'zod';

/**
 * Common validation schemas
 */
export const CommonSchemas = {
  // ID types
  uuid: z.string().uuid(),
  objectId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  
  // String types
  email: z.string().email(),
  url: z.string().url(),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/),
  
  // Date types
  dateString: z.string().datetime(),
  futureDate: z.date().refine(date => date > new Date(), {
    message: 'Date must be in the future',
  }),
  
  // Number types
  positiveInt: z.number().int().positive(),
  percentage: z.number().min(0).max(100),
  currency: z.number().multipleOf(0.01),
  
  // Common patterns
  slug: z.string().regex(/^[a-z0-9-]+$/),
  alphanumeric: z.string().regex(/^[a-zA-Z0-9]+$/),
  
  // Pagination
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
};

/**
 * Create a validated function
 */
export function validated<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  fn: (input: TInput) => TOutput
): (input: unknown) => TOutput {
  return (input: unknown) => {
    const validated = schema.parse(input);
    return fn(validated);
  };
}

/**
 * Create a safe validated function that returns Result
 */
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export function safeValidated<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  fn: (input: TInput) => TOutput
): (input: unknown) => Result<TOutput, z.ZodError> {
  return (input: unknown) => {
    const result = schema.safeParse(input);
    
    if (result.success) {
      try {
        const output = fn(result.data);
        return { success: true, data: output };
      } catch (error) {
        return { success: false, error: error as z.ZodError };
      }
    }
    
    return { success: false, error: result.error };
  };
}

/**
 * Schema builder for common patterns
 */
export class SchemaBuilder<T extends z.ZodObject<any>> {
  constructor(private schema: T) {}

  withPagination() {
    return this.schema.extend({
      page: CommonSchemas.page,
      pageSize: CommonSchemas.pageSize,
    });
  }

  withTimestamps() {
    return this.schema.extend({
      createdAt: z.date(),
      updatedAt: z.date(),
    });
  }

  withSoftDelete() {
    return this.schema.extend({
      deletedAt: z.date().nullable().optional(),
    });
  }

  withId(type: 'uuid' | 'objectId' = 'uuid') {
    return this.schema.extend({
      id: type === 'uuid' ? CommonSchemas.uuid : CommonSchemas.objectId,
    });
  }

  partial() {
    return this.schema.partial();
  }

  pick<K extends keyof z.infer<T>>(...keys: K[]) {
    return this.schema.pick(
      keys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
  }

  omit<K extends keyof z.infer<T>>(...keys: K[]) {
    return this.schema.omit(
      keys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
  }

  build() {
    return this.schema;
  }
}

/**
 * Create a schema builder
 */
export function schema<T extends z.ZodRawShape>(shape: T) {
  return new SchemaBuilder(z.object(shape));
}

/**
 * Validation error formatter
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  
  error.errors.forEach(err => {
    const path = err.path.join('.');
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(err.message);
  });
  
  return formatted;
}

/**
 * Type-safe form validation
 */
export function createFormValidator<T extends z.ZodSchema>(schema: T) {
  return {
    validate: (data: unknown): z.infer<T> => schema.parse(data),
    
    validateField: (field: keyof z.infer<T>, value: unknown) => {
      try {
        const fieldSchema = schema.shape[field as string];
        if (fieldSchema) {
          fieldSchema.parse(value);
          return null;
        }
        return 'Invalid field';
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0]?.message || 'Invalid value';
        }
        return 'Validation error';
      }
    },
    
    validatePartial: (data: Partial<z.infer<T>>) => {
      const partialSchema = schema.partial();
      return partialSchema.parse(data);
    },
    
    isValid: (data: unknown): data is z.infer<T> => {
      return schema.safeParse(data).success;
    },
  };
}