/**
 * Enhanced theme provider that integrates Polaris with Cin7 DSL extensions
 */

import React, { createContext, useContext, useMemo } from 'react';
import { AppProvider, AppProviderProps } from '@shopify/polaris';
import { cin7Tokens } from './tokens';

interface Cin7Theme {
  polaris: typeof import('@shopify/polaris-tokens');
  cin7: typeof cin7Tokens;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<Cin7Theme | undefined>(undefined);

export interface Cin7ThemeProviderProps extends AppProviderProps {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
}

export function Cin7ThemeProvider({ 
  children, 
  mode = 'light',
  ...appProviderProps 
}: Cin7ThemeProviderProps) {
  const theme = useMemo<Cin7Theme>(() => ({
    polaris: require('@shopify/polaris-tokens'),
    cin7: cin7Tokens,
    mode,
  }), [mode]);

  // Apply CSS variables for ExtJS components
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply ExtJS grid tokens
    Object.entries(cin7Tokens.extjs.grid).forEach(([key, value]) => {
      root.style.setProperty(`--cin7-grid-${key}`, value);
    });
    
    // Apply ExtJS form tokens
    Object.entries(cin7Tokens.extjs.form).forEach(([key, value]) => {
      root.style.setProperty(`--cin7-form-${key}`, value);
    });
    
    // Apply animation tokens
    Object.entries(cin7Tokens.animation).forEach(([key, value]) => {
      root.style.setProperty(`--cin7-animation-${key}`, value);
    });
  }, []);

  return (
    <AppProvider {...appProviderProps}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </AppProvider>
  );
}

export function useCin7Theme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useCin7Theme must be used within a Cin7ThemeProvider');
  }
  return theme;
}