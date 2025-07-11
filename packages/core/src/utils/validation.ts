/**
 * Validation utilities for form handling and data validation
 */

import type { ValidationRule, ValidationSchema } from '../types/utils';

export class ValidationUtils {
  static validateField<T>(
    value: T,
    rules?: ValidationRule<T>
  ): string | null {
    if (!rules) return null;

    if (rules.required && (!value || value === '')) {
      return 'This field is required';
    }

    if (typeof value === 'string') {
      if (rules.min && value.length < rules.min) {
        return `Minimum length is ${rules.min}`;
      }

      if (rules.max && value.length > rules.max) {
        return `Maximum length is ${rules.max}`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Invalid format';
      }
    }

    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        return `Minimum value is ${rules.min}`;
      }

      if (rules.max !== undefined && value > rules.max) {
        return `Maximum value is ${rules.max}`;
      }
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }

  static validateForm<T extends Record<string, any>>(
    values: T,
    schema: ValidationSchema<T>
  ): Partial<Record<keyof T, string>> {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const [field, rules] of Object.entries(schema) as [keyof T, ValidationRule<any>][]) {
      const error = this.validateField(values[field], rules);
      if (error) {
        errors[field] = error;
      }
    }

    return errors;
  }

  static isFormValid<T extends Record<string, any>>(
    values: T,
    schema: ValidationSchema<T>
  ): boolean {
    const errors = this.validateForm(values, schema);
    return Object.keys(errors).length === 0;
  }
}

// Common validation rules
export const commonValidations = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value) return null;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
    },
  },
  
  phone: {
    pattern: /^[\d\s\-\+\(\)]+$/,
    custom: (value: string) => {
      if (!value) return null;
      const cleaned = value.replace(/\D/g, '');
      return cleaned.length >= 10 ? null : 'Invalid phone number';
    },
  },

  url: {
    pattern: /^https?:\/\/.+/,
    custom: (value: string) => {
      if (!value) return null;
      try {
        new URL(value);
        return null;
      } catch {
        return 'Invalid URL';
      }
    },
  },

  alphanumeric: {
    pattern: /^[a-zA-Z0-9]+$/,
    custom: (value: string) => {
      if (!value) return null;
      return /^[a-zA-Z0-9]+$/.test(value) ? null : 'Only letters and numbers allowed';
    },
  },
};