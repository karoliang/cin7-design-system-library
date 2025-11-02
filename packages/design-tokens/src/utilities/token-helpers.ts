/**
 * Helper utilities for working with design tokens
 */

/**
 * Get CSS variable value at runtime
 */
export function getTokenValue(tokenName: string, element?: HTMLElement): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }

  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(`--cin7-${tokenName}`).trim();
}

/**
 * Set CSS variable value at runtime
 */
export function setTokenValue(tokenName: string, value: string, element?: HTMLElement): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const target = element || document.documentElement;
  target.style.setProperty(`--cin7-${tokenName}`, value);
}

/**
 * Media query helpers
 */
export const mediaQueries = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  
  // Helpers
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  
  // Preferences
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDark: '(prefers-color-scheme: dark)',
  prefersLight: '(prefers-color-scheme: light)',
  prefersHighContrast: '(prefers-contrast: high)',
};

/**
 * Check if media query matches
 */
export function matchesMediaQuery(query: keyof typeof mediaQueries | string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const mediaQuery = query in mediaQueries 
    ? mediaQueries[query as keyof typeof mediaQueries]
    : query;
  
  return window.matchMedia(mediaQuery).matches;
}

/**
 * Watch media query changes
 */
export function watchMediaQuery(
  query: keyof typeof mediaQueries | string,
  callback: (matches: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    callback(false);
    return () => {};
  }

  const mediaQuery = query in mediaQueries 
    ? mediaQueries[query as keyof typeof mediaQueries]
    : query;
  
  const mq = window.matchMedia(mediaQuery);
  
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  
  // Call immediately with current state
  callback(mq.matches);
  
  // Listen for changes
  mq.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mq.removeEventListener('change', handler);
}

/**
 * Token math utilities
 */
export const tokenMath = {
  /**
   * Multiply a spacing token value
   */
  multiplySpacing(value: string, multiplier: number): string {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    const unit = value.replace(/[0-9.-]/g, '');
    return `${num * multiplier}${unit}`;
  },

  /**
   * Add two token values
   */
  add(value1: string, value2: string): string {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    
    if (isNaN(num1) || isNaN(num2)) return value1;
    
    const unit = value1.replace(/[0-9.-]/g, '');
    return `${num1 + num2}${unit}`;
  },

  /**
   * Calculate rem from px
   */
  pxToRem(px: number, base = 16): string {
    return `${px / base}rem`;
  },

  /**
   * Calculate px from rem
   */
  remToPx(rem: number, base = 16): string {
    return `${rem * base}px`;
  },
};

/**
 * Color utilities
 */
export const colorUtils = {
  /**
   * Apply opacity to a color token
   */
  withOpacity(colorToken: string, opacity: number): string {
    return `rgb(from ${colorToken} r g b / ${opacity})`;
  },

  /**
   * Mix two color tokens
   */
  mix(color1: string, color2: string, weight = 0.5): string {
    return `color-mix(in srgb, ${color1} ${weight * 100}%, ${color2})`;
  },
};
