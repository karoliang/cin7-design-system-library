/**
 * Theme definitions for Cin7 DSL
 */

export interface Cin7Theme {
  name: string;
  tokens: Record<string, string>;
  isDark: boolean;
}

export const lightTheme: Cin7Theme = {
  name: 'light',
  isDark: false,
  tokens: {
    // Override specific tokens for light theme
    'enterprise-dataGrid-header-background': 'var(--p-color-bg-surface-secondary)',
    'enterprise-dataGrid-row-stripedBackground': 'var(--p-color-bg-surface-secondary-experimental)',
    'enterprise-dashboard-widget-background': 'var(--p-color-bg-surface)',
    'enterprise-extjs-panel-headerBackground': 'var(--p-color-bg-surface-secondary)',
  },
};

export const darkTheme: Cin7Theme = {
  name: 'dark',
  isDark: true,
  tokens: {
    // Override specific tokens for dark theme
    'enterprise-dataGrid-header-background': 'var(--p-color-bg-surface-secondary-experimental)',
    'enterprise-dataGrid-row-stripedBackground': 'rgba(255, 255, 255, 0.02)',
    'enterprise-dashboard-widget-background': 'var(--p-color-bg-surface-secondary)',
    'enterprise-extjs-panel-headerBackground': 'var(--p-color-bg-surface-tertiary)',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

/**
 * Apply theme to element
 */
export function applyTheme(theme: Cin7Theme | keyof typeof themes, element?: HTMLElement): void {
  const target = element || document.documentElement;
  const themeObj = typeof theme === 'string' ? themes[theme] : theme;
  
  // Set theme attribute
  target.setAttribute('data-theme', themeObj.name);
  
  // Apply token overrides
  Object.entries(themeObj.tokens).forEach(([token, value]) => {
    target.style.setProperty(`--cin7-${token}`, value);
  });
}

/**
 * Get current theme
 */
export function getCurrentTheme(element?: HTMLElement): string {
  const target = element || document.documentElement;
  return target.getAttribute('data-theme') || 'light';
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(element?: HTMLElement): void {
  const current = getCurrentTheme(element);
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next, element);
}