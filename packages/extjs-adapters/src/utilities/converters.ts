/**
 * Converters between Cin7/Polaris and ExtJS formats
 */

/**
 * Convert Polaris button variant to ExtJS UI
 */
export function buttonVariantToUI(variant?: 'primary' | 'secondary' | 'plain' | 'destructive'): string {
  const map: Record<string, string> = {
    'primary': 'cin7-primary',
    'secondary': 'cin7-secondary',
    'plain': 'cin7-plain',
    'destructive': 'cin7-destructive',
  };
  
  return map[variant || 'secondary'] || 'cin7-secondary';
}

/**
 * Convert Polaris size to ExtJS scale
 */
export function sizeToScale(size?: 'small' | 'medium' | 'large'): string {
  const map: Record<string, string> = {
    'small': 'small',
    'medium': 'medium',
    'large': 'large',
  };
  
  return map[size || 'medium'] || 'medium';
}

/**
 * Convert validation rules to ExtJS validators
 */
export function validationToValidators(validation?: {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  min?: number;
  max?: number;
}): any[] {
  if (!validation) {
    return [];
  }
  
  const validators = [];
  
  if (validation.required) {
    validators.push({ type: 'presence' });
  }
  
  if (validation.minLength !== undefined || validation.maxLength !== undefined) {
    validators.push({
      type: 'length',
      min: validation.minLength,
      max: validation.maxLength,
    });
  }
  
  if (validation.pattern) {
    validators.push({
      type: 'format',
      matcher: validation.pattern,
    });
  }
  
  if (validation.email) {
    validators.push({ type: 'email' });
  }
  
  if (validation.url) {
    validators.push({
      type: 'format',
      matcher: /^https?:\\/\\/.+/,
      message: 'Must be a valid URL',
    });
  }
  
  if (validation.min !== undefined || validation.max !== undefined) {
    validators.push({
      type: 'range',
      min: validation.min,
      max: validation.max,
    });
  }
  
  return validators;
}

/**
 * Convert ExtJS record to plain object
 */
export function recordToObject(record: any): any {
  if (!record || !record.data) {
    return null;
  }
  
  return { ...record.data };
}

/**
 * Convert array of ExtJS records to plain objects
 */
export function recordsToArray(records: any[]): any[] {
  if (!Array.isArray(records)) {
    return [];
  }
  
  return records.map(recordToObject).filter(Boolean);
}

/**
 * Convert Polaris alignment to ExtJS alignment
 */
export function alignmentToPosition(alignment?: 'start' | 'center' | 'end'): string {
  const map: Record<string, string> = {
    'start': 'left',
    'center': 'center',
    'end': 'right',
  };
  
  return map[alignment || 'start'] || 'left';
}

/**
 * Convert spacing value to pixels
 */
export function spacingToPixels(spacing?: string | number): number {
  if (typeof spacing === 'number') {
    return spacing;
  }
  
  if (!spacing) {
    return 0;
  }
  
  // Extract number from CSS value
  const match = spacing.match(/^(\\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Convert color value to hex
 */
export function colorToHex(color: string): string {
  // If already hex, return as is
  if (color.startsWith('#')) {
    return color;
  }
  
  // If CSS variable, try to resolve it
  if (color.startsWith('var(')) {
    const varName = color.match(/var\\(([^)]+)\\)/)?.[1];
    if (varName) {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(varName);
      return computed.trim() || color;
    }
  }
  
  return color;
}

/**
 * Convert ExtJS store to data array
 */
export function storeToArray(store: any): any[] {
  if (!store || !store.data) {
    return [];
  }
  
  const items = [];
  store.each((record: any) => {
    items.push(recordToObject(record));
  });
  
  return items;
}

/**
 * Convert form values to submission format
 */
export function formValuesToSubmit(values: any): any {
  // Clone to avoid mutation
  const submitValues = { ...values };
  
  // Convert dates to ISO strings
  Object.keys(submitValues).forEach(key => {
    const value = submitValues[key];
    if (value instanceof Date) {
      submitValues[key] = value.toISOString();
    }
  });
  
  return submitValues;
}