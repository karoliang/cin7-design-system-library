# @cin7/polaris-adapter

Polaris component adapter for the Cin7 DSL framework. This package provides enhanced Polaris components with theme integration for ExtJS components.

## Installation

```bash
pnpm add @cin7/polaris-adapter
```

## Features

- **Enhanced Polaris Components**: All Polaris components with improved TypeScript support
- **Theme Bridge**: Seamless theme integration between Polaris and ExtJS
- **Design Tokens**: Extended design tokens for enterprise components
- **CSS Variables**: Automatic CSS variable generation for ExtJS styling

## Usage

### Basic Setup

```tsx
import { Cin7ThemeProvider, Page, Card } from '@cin7/polaris-adapter';
import enTranslations from '@shopify/polaris/locales/en.json';

function App() {
  return (
    <Cin7ThemeProvider i18n={enTranslations}>
      <Page title="My App">
        <Card>
          <p>Content goes here</p>
        </Card>
      </Page>
    </Cin7ThemeProvider>
  );
}
```

### Using Theme Tokens

```tsx
import { useCin7Theme, cin7Tokens } from '@cin7/polaris-adapter/theme';

function MyComponent() {
  const theme = useCin7Theme();
  
  return (
    <div style={{ 
      animationDuration: cin7Tokens.animation.durationBase,
      zIndex: cin7Tokens.zIndex.modal 
    }}>
      Current theme: {theme.mode}
    </div>
  );
}
```

### ExtJS Theme Integration

The adapter automatically applies CSS variables for ExtJS components:

```css
/* Available CSS variables */
--cin7-grid-headerHeight: 40px;
--cin7-grid-rowHeight: 36px;
--cin7-grid-borderColor: var(--p-color-border);
--cin7-form-fieldHeight: 36px;
--cin7-animation-durationBase: 200ms;
```

## API Reference

### Cin7ThemeProvider

Enhanced AppProvider with theme integration:

```tsx
interface Cin7ThemeProviderProps extends AppProviderProps {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
}
```

### useCin7Theme

Hook to access the current theme:

```tsx
const theme = useCin7Theme();
// theme.polaris - Polaris tokens
// theme.cin7 - Cin7 extended tokens
// theme.mode - Current theme mode
```

## License

MIT