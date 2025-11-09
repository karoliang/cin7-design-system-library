import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themes, ThemeName, applyTheme, defaultTheme } from './themeConfig';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  customColors: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  setCustomColors: (colors: { primary?: string; secondary?: string; accent?: string }) => void;
  isCustom: boolean;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const [customColors, setCustomColors] = useState<{ primary?: string; secondary?: string; accent?: string }>({});
  const [isCustom, setIsCustom] = useState(false);
  const [theme, setCurrentTheme] = useState<Theme>(themes[initialTheme]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('cin7-theme') as ThemeName | null;
    const savedCustomColors = localStorage.getItem('cin7-custom-colors');

    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
      setCurrentTheme(themes[savedTheme]);
    }

    if (savedCustomColors) {
      try {
        const colors = JSON.parse(savedCustomColors);
        setCustomColors(colors);
        setIsCustom(true);
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes
    let finalTheme = theme;

    // Apply custom colors if any
    if (isCustom && Object.keys(customColors).length > 0) {
      finalTheme = {
        ...theme,
        colors: {
          ...theme.colors,
          ...(customColors.primary && {
            primary: customColors.primary,
            primaryLight: lightenColor(customColors.primary, 0.2),
            primaryDark: darkenColor(customColors.primary, 0.2),
            interactive: customColors.primary,
            interactiveHovered: lightenColor(customColors.primary, 0.2),
            interactivePressed: darkenColor(customColors.primary, 0.2),
            focused: customColors.primary,
          }),
          ...(customColors.secondary && {
            secondary: customColors.secondary,
            secondaryLight: lightenColor(customColors.secondary, 0.2),
            secondaryDark: darkenColor(customColors.secondary, 0.2),
          }),
          ...(customColors.accent && {
            accent: customColors.accent,
          }),
        },
      };
    }

    applyTheme(finalTheme);
  }, [theme, customColors, isCustom]);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    setCurrentTheme(themes[name]);
    setIsCustom(false);
    setCustomColors({});
    localStorage.setItem('cin7-theme', name);
    localStorage.removeItem('cin7-custom-colors');
  };

  const handleSetCustomColors = (colors: { primary?: string; secondary?: string; accent?: string }) => {
    setCustomColors(colors);
    setIsCustom(true);
    localStorage.setItem('cin7-custom-colors', JSON.stringify(colors));
  };

  const resetTheme = () => {
    setTheme('light');
  };

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    customColors,
    setCustomColors: handleSetCustomColors,
    isCustom,
    resetTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Helper functions for color manipulation
function lightenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, ((num >> 16) & 255) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 255) + Math.round(255 * amount));
  const b = Math.min(255, (num & 255) + Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function darkenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, ((num >> 16) & 255) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 255) - Math.round(255 * amount));
  const b = Math.max(0, (num & 255) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Export a default wrapper for Storybook
export function withThemeProvider(Story: React.ComponentType) {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
}