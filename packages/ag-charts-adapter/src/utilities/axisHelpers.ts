/**
 * Axis helper utilities for AG Charts integration
 */

/**
 * Normalizes axis title to AG Charts v9.3.0 compatible object format
 *
 * @param title - Axis title as string or object with text property
 * @returns AG Charts compatible title object with text and enabled properties
 */
export const normalizeAxisTitle = (title?: string | { text: string }): { text: string; enabled: boolean } | undefined => {
  if (!title) return undefined;

  if (typeof title === 'string') {
    return {
      text: title,
      enabled: true
    };
  }

  return {
    text: title.text,
    enabled: true
  };
};

/**
 * Type alias for axis title configuration that supports both string and object formats
 */
export type AxisTitleConfig = string | { text: string } | { text: string; enabled: boolean } | undefined;