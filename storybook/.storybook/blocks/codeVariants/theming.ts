import type { CodeVariant } from './types';

// Theme Playground Examples
export const themePlaygroundExamples: Record<string, CodeVariant> = {
  playground: {
    react: `import React, { useState } from 'react';
import { Button, Card, Select, TextField } from '@shopify/polaris';
import { useTheme } from '../themes/ThemeProvider';

export function ThemePlayground() {
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const [primaryColor, setPrimaryColor] = useState(customColors.primary || '#007ace');

  return (
    <Card>
      <Select
        label="Theme"
        options={[
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Ocean', value: 'ocean' },
        ]}
        value={theme.name.toLowerCase()}
        onChange={(value) => setTheme(value)}
      />
      <TextField
        label="Primary Color"
        value={primaryColor}
        onChange={(value) => {
          setPrimaryColor(value);
          setCustomColors({ ...customColors, primary: value });
        }}
        type="color"
      />
      <Button primary>Preview Button</Button>
    </Card>
  );
}`,

    vanilla: `<!-- HTML Structure -->
<div class="theme-playground">
  <select id="theme-selector">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="ocean">Ocean</option>
  </select>
  <input type="color" id="primary-color" value="#007ace">
  <button class="preview-button">Preview Button</button>
</div>

<script>
// JavaScript Theme Control
document.getElementById('theme-selector').addEventListener('change', (e) => {
  const theme = e.target.value;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cin7-theme', theme);
});

document.getElementById('primary-color').addEventListener('input', (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty('--cin7-color-primary', color);
  localStorage.setItem('cin7-primary-color', color);
});
</script>`,

    extjs: `// ExtJS Theme Control Panel
Ext.create('Ext.panel.Panel', {
  title: 'Theme Playground',
  items: [{
    xtype: 'combobox',
    fieldLabel: 'Theme',
    store: ['light', 'dark', 'ocean'],
    value: 'light',
    listeners: {
      change: function(combo, value) {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('cin7-theme', value);
      }
    }
  }, {
    xtype: 'colorfield',
    fieldLabel: 'Primary Color',
    value: '#007ace',
    listeners: {
      change: function(field, value) {
        document.documentElement.style.setProperty('--cin7-color-primary', value);
        localStorage.setItem('cin7-primary-color', value);
      }
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Theme, ThemeManager, ThemeColors } from '@cin7/design-tokens';

interface ThemePlaygroundConfig {
  availableThemes: string[];
  customizable: boolean;
  onThemeChange?: (theme: Theme) => void;
}

class ThemePlayground {
  private themeManager: ThemeManager;
  private config: ThemePlaygroundConfig;

  constructor(config: ThemePlaygroundConfig) {
    this.config = config;
    this.themeManager = new ThemeManager();
    this.initialize();
  }

  private initialize(): void {
    const savedTheme = localStorage.getItem('cin7-theme');
    if (savedTheme && this.config.availableThemes.includes(savedTheme)) {
      this.applyTheme(savedTheme);
    }
  }

  public applyTheme(themeName: string): void {
    const theme = this.themeManager.getTheme(themeName);
    this.themeManager.apply(theme);
    localStorage.setItem('cin7-theme', themeName);

    if (this.config.onThemeChange) {
      this.config.onThemeChange(theme);
    }
  }

  public setCustomColor(colorKey: keyof ThemeColors, value: string): void {
    if (!this.config.customizable) return;

    const currentTheme = this.themeManager.getCurrentTheme();
    const customTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: value
      }
    };

    this.themeManager.apply(customTheme);
    localStorage.setItem('cin7-custom-colors', JSON.stringify(customTheme.colors));
  }
}`
  }
};

// Theme Documentation Examples
export const themeDocumentationExamples: Record<string, CodeVariant> = {
  usage: {
    react: `import { ThemeProvider, useTheme } from '@cin7/design-tokens';
import { Button } from '@shopify/polaris';

// Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider initialTheme="light">
      <ThemedComponent />
    </ThemeProvider>
  );
}

// Use theme in components
function ThemedComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <Button onClick={() => setTheme('dark')}>
        Switch to Dark Theme
      </Button>
    </div>
  );
}`,

    vanilla: `<!-- Include theme CSS -->
<link rel="stylesheet" href="@cin7/design-tokens/themes.css">

<!-- HTML with theme classes -->
<div class="cin7-theme-light">
  <button class="cin7-button cin7-button--primary">
    Themed Button
  </button>
</div>

<script>
// Apply theme dynamically
function applyTheme(themeName) {
  // Update CSS variables
  const root = document.documentElement;
  root.setAttribute('data-theme', themeName);

  // Load theme colors
  fetch(\`/themes/\${themeName}.json\`)
    .then(res => res.json())
    .then(theme => {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(\`--cin7-color-\${key}\`, value);
      });
    });
}

// Listen for theme changes
window.addEventListener('theme-change', (e) => {
  applyTheme(e.detail.theme);
});
</script>`,

    extjs: `// ExtJS Theme Configuration
Ext.define('Cin7.theme.Manager', {
  singleton: true,

  config: {
    currentTheme: 'light',
    themes: {
      light: {
        primary: '#007ace',
        background: '#ffffff'
      },
      dark: {
        primary: '#3b82f6',
        background: '#111827'
      }
    }
  },

  applyTheme: function(themeName) {
    const theme = this.getThemes()[themeName];
    if (!theme) return;

    // Apply to ExtJS components
    Ext.each(Ext.ComponentQuery.query('*'), function(cmp) {
      if (cmp.updateTheme) {
        cmp.updateTheme(theme);
      }
    });

    // Apply to document
    document.documentElement.setAttribute('data-theme', themeName);

    // Fire event
    Ext.GlobalEvents.fireEvent('themechange', themeName, theme);
  }
});

// Usage in components
Ext.create('Ext.button.Button', {
  text: 'Apply Dark Theme',
  handler: function() {
    Cin7.theme.Manager.applyTheme('dark');
  }
});`,

    typescript: `import { Theme, ThemeManager, ThemeColors } from '@cin7/design-tokens';

// Define custom theme interface
interface CustomTheme extends Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
  };
}

// Theme Manager singleton
class ThemeService {
  private static instance: ThemeService;
  private currentTheme: CustomTheme;
  private listeners: Set<(theme: CustomTheme) => void> = new Set();

  private constructor() {
    this.currentTheme = this.loadTheme();
  }

  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  private loadTheme(): CustomTheme {
    const saved = localStorage.getItem('cin7-theme');
    return saved ? JSON.parse(saved) : this.getDefaultTheme();
  }

  private getDefaultTheme(): CustomTheme {
    return {
      name: 'light',
      mode: 'light',
      colors: {
        primary: '#007ace',
        secondary: '#6b46c1',
        background: '#ffffff',
        text: '#111827',
        // ... other colors
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem'
        }
      }
    };
  }

  public setTheme(theme: CustomTheme): void {
    this.currentTheme = theme;
    this.applyTheme();
    this.persistTheme();
    this.notifyListeners();
  }

  private applyTheme(): void {
    const root = document.documentElement;

    // Apply colors
    Object.entries(this.currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(\`--cin7-color-\${key}\`, value);
    });

    // Apply spacing
    Object.entries(this.currentTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(\`--cin7-spacing-\${key}\`, value);
    });

    // Set theme mode
    root.setAttribute('data-theme', this.currentTheme.mode);
  }

  private persistTheme(): void {
    localStorage.setItem('cin7-theme', JSON.stringify(this.currentTheme));
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }

  public subscribe(listener: (theme: CustomTheme) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getTheme(): CustomTheme {
    return this.currentTheme;
  }
}`
  }
};