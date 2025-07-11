# @cin7/design-tokens

Extended design tokens for the Cin7 DSL Design System Layer. This package provides comprehensive design tokens that extend Shopify Polaris with enterprise-specific values.

## Philosophy

Design tokens are the foundation of the Cin7 DSL design system. They provide:

- **Consistency**: Single source of truth for design values
- **Flexibility**: Easy theming and customization
- **Scalability**: Tokens that work across all layers
- **Compatibility**: Extends Polaris rather than replacing it

## Installation

```bash
pnpm add @cin7/design-tokens
```

## Usage

### JavaScript/TypeScript

```typescript
import { 
  enterpriseTokens, 
  animationTokens, 
  spacingTokens,
  typographyTokens 
} from '@cin7/design-tokens';

// Use token values
const gridHeaderHeight = enterpriseTokens.dataGrid.header.height;
const fadeInDuration = animationTokens.duration.base;
```

### CSS

```css
/* Import the generated CSS */
@import '@cin7/design-tokens/css';

/* Use CSS custom properties */
.data-grid-header {
  height: var(--cin7-enterprise-dataGrid-header-height);
  background: var(--cin7-enterprise-dataGrid-header-background);
}

/* Use utility classes */
.card {
  @extend .cin7-p-6;
  @extend .cin7-text-body;
}
```

### SCSS

```scss
// Import SCSS version for mixins and functions
@import '@cin7/design-tokens/scss';

// Use mixins
.heading {
  @include cin7-text-style('h2');
}

.card {
  @include cin7-card;
  @include cin7-transition(transform);
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

## Token Categories

### Enterprise Tokens

Extended tokens for enterprise UI patterns:

```typescript
// Data Grid
enterpriseTokens.dataGrid.header.height // '48px'
enterpriseTokens.dataGrid.row.height // '40px'

// Advanced Forms
enterpriseTokens.form.field.height // '36px'
enterpriseTokens.form.group.spacing // '24px'

// Charts
enterpriseTokens.charts.colors.primary // ['#5C6AC4', ...]
enterpriseTokens.charts.tooltip.background // 'var(--p-color-bg-surface-inverse)'

// Dashboard
enterpriseTokens.dashboard.widget.borderRadius // 'var(--p-border-radius-300)'
enterpriseTokens.dashboard.metric.valueSize // '32px'
```

### Animation Tokens

Consistent motion design:

```typescript
// Durations
animationTokens.duration.fast // '100ms'
animationTokens.duration.base // '200ms'
animationTokens.duration.slow // '300ms'

// Easings
animationTokens.easing.standard // 'cubic-bezier(0.4, 0, 0.2, 1)'
animationTokens.easing.bounce // 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'

// Keyframes
animationTokens.keyframes.fadeIn
animationTokens.keyframes.slideInUp
```

### Spacing Tokens

Comprehensive spacing scale:

```typescript
// Component spacing
spacingTokens.components.cardPadding // '20px'
spacingTokens.components.formFieldGap // '16px'

// Layout spacing
spacingTokens.layout.pageMargin // '24px'
spacingTokens.layout.sidebarWidth // '280px'

// Scale
spacingTokens.scale[4] // '16px'
spacingTokens.scale[8] // '32px'
```

### Typography Tokens

Extended typography system:

```typescript
// Font families
typographyTokens.fontFamilies.base
typographyTokens.fontFamilies.mono

// Text styles
typographyTokens.textStyles.h1
typographyTokens.textStyles.bodyBase
typographyTokens.textStyles.dataCell
```

## Theming

Apply and manage themes:

```typescript
import { applyTheme, toggleTheme, themes } from '@cin7/design-tokens/themes';

// Apply a theme
applyTheme('dark');
applyTheme(themes.light);

// Toggle theme
toggleTheme();

// Custom theme
const customTheme = {
  name: 'custom',
  isDark: false,
  tokens: {
    'enterprise-dataGrid-header-background': '#f0f0f0',
  },
};
applyTheme(customTheme);
```

## Utilities

Helper functions for working with tokens:

```typescript
import { 
  getTokenValue, 
  setTokenValue,
  matchesMediaQuery,
  tokenMath 
} from '@cin7/design-tokens/utilities';

// Get token value at runtime
const headerHeight = getTokenValue('enterprise-dataGrid-header-height');

// Set token value dynamically
setTokenValue('enterprise-dataGrid-row-height', '44px');

// Media queries
if (matchesMediaQuery('mobile')) {
  // Mobile-specific code
}

// Token math
const doubleSpacing = tokenMath.multiplySpacing('16px', 2); // '32px'
const combined = tokenMath.add('16px', '8px'); // '24px'
```

## CSS Utility Classes

Generated utility classes for rapid development:

```html
<!-- Spacing utilities -->
<div class="cin7-p-4 cin7-mt-6 cin7-mb-8">
  <!-- padding: 16px, margin-top: 24px, margin-bottom: 32px -->
</div>

<!-- Typography utilities -->
<h1 class="cin7-text-h1">Heading</h1>
<p class="cin7-text-body">Body text</p>

<!-- Animation utilities -->
<div class="cin7-animate-fadeIn cin7-duration-slow">
  <!-- Fade in animation with 300ms duration -->
</div>
```

## Integration with Polaris

All Cin7 tokens are designed to work seamlessly with Polaris:

```css
.custom-card {
  /* Mix Polaris and Cin7 tokens */
  background: var(--p-color-bg-surface);
  padding: var(--cin7-space-6);
  border-radius: var(--p-border-radius-300);
  
  /* Use Polaris tokens in calculations */
  margin-top: calc(var(--p-space-4) + var(--cin7-space-2));
}
```

## Best Practices

1. **Use semantic tokens**: Choose tokens based on purpose, not just value
2. **Avoid hard-coded values**: Always use tokens for consistency
3. **Extend, don't replace**: Build on top of Polaris tokens
4. **Document custom tokens**: When creating new tokens, document their purpose

## Migration from Polaris

If migrating from pure Polaris:

```css
/* Before */
.header {
  padding: var(--p-space-4);
  font-size: 16px;
}

/* After */
.header {
  padding: var(--p-space-4); /* Keep Polaris tokens where appropriate */
  font-size: var(--cin7-typography-fontSize-md); /* Use Cin7 tokens for extended values */
}
```

## License

MIT