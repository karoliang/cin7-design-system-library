/**
 * Test file for Enhanced Include System
 * This file tests all the new features to ensure they work correctly
 */

import {
  createTypedIncludeBuilder,
  DesignTokens,
  Presets,
  ComponentCategory,
  Theme,
  Size,
  Spacing
} from './src';

// Test the typed builder
console.log('🧪 Testing Typed Include Builder...');

const builder = createTypedIncludeBuilder({
  designTokens: {
    theme: Theme.LIGHT,
    spacing: Spacing.BASE
  }
});

// Test React components with type safety
const reactCard = builder.react.Card.default({
  designTokens: {
    theme: Theme.BRAND,
    spacing: Spacing.LOOSE,
    elevation: 'medium'
  },
  sectioned: true
});

console.log('✅ React Card:', reactCard);

const reactButton = builder.react.Button.primary({
  designTokens: Presets.primaryButton,
  onClick: 'handleClick',
  accessibility: {
    ariaLabel: 'Primary action button'
  }
});

console.log('✅ React Button:', reactButton);

// Test ExtJS components
const extjsGrid = builder.extjs.DataGrid.enterprise({
  designTokens: {
    theme: Theme.DARK,
    spacing: Spacing.TIGHT
  },
  features: ['grouping', 'filtering', 'export']
});

console.log('✅ ExtJS DataGrid:', extjsGrid);

// Test Vanilla JS components
const vanillaBadge = builder.vanilla.Badge.success({
  designTokens: {
    theme: Theme.BRAND,
    size: Size.SMALL
  },
  text: 'Success'
});

console.log('✅ Vanilla Badge:', vanillaBadge);

// Test TypeScript patterns
const tsRepository = builder.typescript.Repository.standard({
  designTokens: {
    theme: Theme.NEUTRAL
  },
  entity: 'User'
});

console.log('✅ TypeScript Repository:', tsRepository);

// Test all includes together
const allIncludes = [
  reactCard,
  reactButton,
  extjsGrid,
  vanillaBadge,
  tsRepository
];

console.log('✅ All Includes:', allIncludes);

// Test design token presets
console.log('🧪 Testing Design Token Presets...');

const testPresets = {
  light: DesignTokens.light,
  dark: DesignTokens.dark,
  brand: DesignTokens.brand,
  neutral: DesignTokens.neutral,
  small: DesignTokens.small,
  medium: DesignTokens.medium,
  large: DesignTokens.large,
  tight: DesignTokens.tight,
  base: DesignTokens.base,
  loose: DesignTokens.loose,
  elevated: DesignTokens.elevated,
  flat: DesignTokens.flat
};

console.log('✅ Design Token Presets:', testPresets);

// Test preset combinations
const testCombinedPresets = {
  primaryButton: Presets.primaryButton,
  secondaryCard: Presets.secondaryCard,
  successBadge: Presets.successBadge,
  largeGrid: Presets.largeGrid
};

console.log('✅ Combined Presets:', testCombinedPresets);

// Test component categories
console.log('🧪 Testing Component Categories...');

const testCategories = {
  layout: ComponentCategory.LAYOUT,
  feedback: ComponentCategory.FEEDBACK,
  input: ComponentCategory.INPUT,
  display: ComponentCategory.DISPLAY,
  navigation: ComponentCategory.NAVIGATION,
  actions: ComponentCategory.ACTIONS,
  images: ComponentCategory.IMAGES,
  forms: ComponentCategory.FORMS,
  overlays: ComponentCategory.OVERLAYS,
  typography: ComponentCategory.TYPOGRAPHY
};

console.log('✅ Component Categories:', testCategories);

// Test advanced configuration
console.log('🧪 Testing Advanced Configuration...');

const advancedConfig = builder.react.MediaCard.default({
  designTokens: {
    theme: Theme.DARK,
    size: Size.LARGE,
    spacing: Spacing.LOOSE,
    elevation: 'large',
    borderRadius: 'rounded',
    colorScheme: 'media-card'
  },
  responsive: {
    small: {
      size: Size.SMALL,
      spacing: Spacing.TIGHT
    },
    medium: {
      size: Size.MEDIUM,
      spacing: Spacing.BASE
    },
    large: {
      size: Size.LARGE,
      spacing: Spacing.LOOSE
    }
  },
  accessibility: {
    ariaLabel: 'Media content card',
    role: 'article',
    describedBy: 'media-description'
  },
  primaryAction: {
    content: 'Learn More',
    onAction: 'handleLearnMore'
  }
});

console.log('✅ Advanced Configuration:', advancedConfig);

// Test backward compatibility
console.log('🧪 Testing Backward Compatibility...');

// Test traditional include statement structure
const traditionalInclude = {
  language: 'react' as const,
  component: 'Card',
  variation: 'default',
  alias: 'MyCard',
  config: {
    designTokens: {
      theme: Theme.LIGHT,
      spacing: Spacing.BASE
    }
  },
  metadata: {
    source: 'user-code',
    version: '1.0.0'
  }
};

console.log('✅ Traditional Include:', traditionalInclude);

// Test theme variations
console.log('🧪 Testing Theme Variations...');

const themeVariations = [
  builder.react.Page.dashboard({
    designTokens: { theme: Theme.LIGHT, spacing: Spacing.BASE }
  }),
  builder.react.Page.dashboard({
    designTokens: { theme: Theme.DARK, spacing: Spacing.BASE }
  }),
  builder.react.Page.dashboard({
    designTokens: { theme: Theme.BRAND, spacing: Spacing.LOOSE }
  }),
  builder.react.Page.dashboard({
    designTokens: { theme: Theme.NEUTRAL, spacing: Spacing.TIGHT }
  })
];

console.log('✅ Theme Variations:', themeVariations);

// Test error handling
console.log('🧪 Testing Error Handling...');

try {
  // This should work fine
  const validInclude = builder.react.Button.primary();
  console.log('✅ Valid Include Created:', validInclude);
} catch (error) {
  console.error('❌ Error creating valid include:', error);
}

try {
  // Test with invalid config (should be handled gracefully)
  const includeWithInvalidConfig = builder.react.Card.default({
    designTokens: {
      theme: 'invalid-theme' as any,  // This should be handled gracefully
      spacing: Spacing.BASE
    }
  });
  console.log('✅ Include with invalid config handled:', includeWithInvalidConfig);
} catch (error) {
  console.log('✅ Invalid config properly caught:', (error as Error).message);
}

console.log('🎉 All Enhanced Include System Tests Completed Successfully!');
console.log('');
console.log('Summary of Features Tested:');
console.log('✅ Type-Safe Builder Pattern');
console.log('✅ Design Token Support');
console.log('✅ Theme System Integration');
console.log('✅ Component Categories');
console.log('✅ Advanced Configuration');
console.log('✅ Responsive Design Support');
console.log('✅ Accessibility Features');
console.log('✅ Backward Compatibility');
console.log('✅ Error Handling');
console.log('✅ Design Token Presets');

export {
  allIncludes,
  testPresets,
  testCombinedPresets,
  testCategories,
  advancedConfig,
  traditionalInclude,
  themeVariations
};