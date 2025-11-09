// Theme configuration for Cin7 Design System
// This defines all available themes and their design tokens

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  success: string;
  warning: string;
  critical: string;
  info: string;
  background: string;
  surface: string;
  surfaceSubdued: string;
  text: string;
  textSubdued: string;
  border: string;
  borderSubdued: string;
  interactive: string;
  interactiveHovered: string;
  interactivePressed: string;
  interactiveDisabled: string;
  focused: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMonospace: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    base: number;
    relaxed: number;
  };
}

export interface ThemeShadows {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeRadius {
  sm: string;
  base: string;
  md: string;
  lg: string;
  full: string;
}

export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  radius: ThemeRadius;
}

// Default Light Theme
export const lightTheme: Theme = {
  name: 'Light',
  mode: 'light',
  colors: {
    primary: '#007ace',
    primaryLight: '#2e90e5',
    primaryDark: '#005a9e',
    secondary: '#6b46c1',
    secondaryLight: '#8b5cf6',
    secondaryDark: '#553c9a',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
    info: '#3b82f6',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceSubdued: '#f9fafb',
    text: '#111827',
    textSubdued: '#6b7280',
    border: '#e5e7eb',
    borderSubdued: '#f3f4f6',
    interactive: '#007ace',
    interactiveHovered: '#2e90e5',
    interactivePressed: '#005a9e',
    interactiveDisabled: '#9ca3af',
    focused: '#007ace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMonospace: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      base: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  radius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
};

// Dark Theme
export const darkTheme: Theme = {
  ...lightTheme,
  name: 'Dark',
  mode: 'dark',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    secondary: '#8b5cf6',
    secondaryLight: '#a78bfa',
    secondaryDark: '#7c3aed',
    accent: '#fbbf24',
    success: '#34d399',
    warning: '#fbbf24',
    critical: '#f87171',
    info: '#60a5fa',
    background: '#111827',
    surface: '#1f2937',
    surfaceSubdued: '#374151',
    text: '#f9fafb',
    textSubdued: '#9ca3af',
    border: '#374151',
    borderSubdued: '#1f2937',
    interactive: '#3b82f6',
    interactiveHovered: '#60a5fa',
    interactivePressed: '#2563eb',
    interactiveDisabled: '#4b5563',
    focused: '#3b82f6',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
};

// Ocean Blue Theme
export const oceanTheme: Theme = {
  ...lightTheme,
  name: 'Ocean',
  mode: 'light',
  colors: {
    ...lightTheme.colors,
    primary: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#0e7490',
    secondary: '#0369a1',
    secondaryLight: '#0ea5e9',
    secondaryDark: '#075985',
    accent: '#06b6d4',
    interactive: '#0891b2',
    interactiveHovered: '#22d3ee',
    interactivePressed: '#0e7490',
    focused: '#0891b2',
  },
};

// Forest Green Theme
export const forestTheme: Theme = {
  ...lightTheme,
  name: 'Forest',
  mode: 'light',
  colors: {
    ...lightTheme.colors,
    primary: '#059669',
    primaryLight: '#10b981',
    primaryDark: '#047857',
    secondary: '#065f46',
    secondaryLight: '#047857',
    secondaryDark: '#064e3b',
    accent: '#84cc16',
    interactive: '#059669',
    interactiveHovered: '#10b981',
    interactivePressed: '#047857',
    focused: '#059669',
  },
};

// Sunset Orange Theme
export const sunsetTheme: Theme = {
  ...lightTheme,
  name: 'Sunset',
  mode: 'light',
  colors: {
    ...lightTheme.colors,
    primary: '#ea580c',
    primaryLight: '#fb923c',
    primaryDark: '#c2410c',
    secondary: '#dc2626',
    secondaryLight: '#f87171',
    secondaryDark: '#b91c1c',
    accent: '#f59e0b',
    interactive: '#ea580c',
    interactiveHovered: '#fb923c',
    interactivePressed: '#c2410c',
    focused: '#ea580c',
  },
};

// Purple Theme
export const purpleTheme: Theme = {
  ...lightTheme,
  name: 'Purple',
  mode: 'light',
  colors: {
    ...lightTheme.colors,
    primary: '#7c3aed',
    primaryLight: '#a78bfa',
    primaryDark: '#6d28d9',
    secondary: '#ec4899',
    secondaryLight: '#f9a8d4',
    secondaryDark: '#db2777',
    accent: '#f472b6',
    interactive: '#7c3aed',
    interactiveHovered: '#a78bfa',
    interactivePressed: '#6d28d9',
    focused: '#7c3aed',
  },
};

// High Contrast Theme
export const highContrastTheme: Theme = {
  ...lightTheme,
  name: 'High Contrast',
  mode: 'light',
  colors: {
    ...lightTheme.colors,
    primary: '#000000',
    primaryLight: '#374151',
    primaryDark: '#000000',
    secondary: '#1f2937',
    secondaryLight: '#4b5563',
    secondaryDark: '#111827',
    accent: '#000000',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceSubdued: '#f3f4f6',
    text: '#000000',
    textSubdued: '#374151',
    border: '#000000',
    borderSubdued: '#6b7280',
    interactive: '#000000',
    interactiveHovered: '#374151',
    interactivePressed: '#000000',
    interactiveDisabled: '#d1d5db',
    focused: '#000000',
  },
};

// Cin7 Core Light Theme
export const cin7CoreLightTheme: Theme = {
  ...lightTheme,
  name: 'Cin7 Core Light',
  mode: 'light',
  colors: {
    primary: '#0066cc',
    primaryLight: '#3380dd',
    primaryDark: '#004c99',
    secondary: '#00a86b',
    secondaryLight: '#33bf8c',
    secondaryDark: '#008055',
    accent: '#ff6b35',
    success: '#00a86b',
    warning: '#ff9500',
    critical: '#dc3545',
    info: '#0066cc',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceSubdued: '#f8f9fa',
    text: '#2c3e50',
    textSubdued: '#6c757d',
    border: '#dee2e6',
    borderSubdued: '#f1f3f4',
    interactive: '#0066cc',
    interactiveHovered: '#3380dd',
    interactivePressed: '#004c99',
    interactiveDisabled: '#adb5bd',
    focused: '#0066cc',
  },
};

// Cin7 Core Dark Theme
export const cin7CoreDarkTheme: Theme = {
  ...darkTheme,
  name: 'Cin7 Core Dark',
  mode: 'dark',
  colors: {
    primary: '#4d94ff',
    primaryLight: '#80b3ff',
    primaryDark: '#3377dd',
    secondary: '#4dc9a3',
    secondaryLight: '#80dbbf',
    secondaryDark: '#33b585',
    accent: '#ff8c5a',
    success: '#4dc9a3',
    warning: '#ffb366',
    critical: '#ff6b7a',
    info: '#4d94ff',
    background: '#1a1d23',
    surface: '#2c3038',
    surfaceSubdued: '#3d4148',
    text: '#e9ecef',
    textSubdued: '#adb5bd',
    border: '#495057',
    borderSubdued: '#343a40',
    interactive: '#4d94ff',
    interactiveHovered: '#80b3ff',
    interactivePressed: '#3377dd',
    interactiveDisabled: '#6c757d',
    focused: '#4d94ff',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
  },
};

// All available themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  cin7CoreLight: cin7CoreLightTheme,
  cin7CoreDark: cin7CoreDarkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  purple: purpleTheme,
  highContrast: highContrastTheme,
} as const;

export type ThemeName = keyof typeof themes;

// Helper function to apply theme to CSS variables
export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-color-${key}`, value);
  });

  // Apply spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-spacing-${key}`, value);
  });

  // Apply typography
  root.style.setProperty('--cin7-font-family', theme.typography.fontFamily);
  root.style.setProperty('--cin7-font-family-monospace', theme.typography.fontFamilyMonospace);

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-font-size-${key}`, value);
  });

  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-font-weight-${key}`, value.toString());
  });

  // Apply shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-shadow-${key}`, value);
  });

  // Apply radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--cin7-radius-${key}`, value);
  });

  // Set theme mode
  root.setAttribute('data-theme', theme.mode);
  root.setAttribute('data-theme-name', theme.name.toLowerCase());
}

// Export default theme
export const defaultTheme = lightTheme;