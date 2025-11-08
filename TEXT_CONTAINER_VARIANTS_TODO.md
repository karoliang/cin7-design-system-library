# TextContainer Component - Code Variants Implementation

## Summary
Need to add comprehensive code variants for 9 TextContainer story variations across all 4 languages (React, Vanilla JS, ExtJS, TypeScript).

## Current State
- **File**: `/storybook/.storybook/blocks/codeVariants.ts`
- **Location**: Lines 36885-36983  
- **Current Variants**: 1 (default only)
- **Story File**: `/storybook/stories/components/utilities/TextContainer.stories.tsx`
- **Story Variations**: 9 total

## Required Variants

### 1. Default ✓
Simple text container with optimal reading width

### 2. BasicUsage (NEW)
Introduction section with heading and paragraph in page wrapper

### 3. LongFormContent (NEW)
Multi-paragraph article with spacing, headings, and subheadings

### 4. ProductDescription (NEW)
E-commerce product page with title, description, features list, and closing text

### 5. HelpArticle (NEW)
Step-by-step guide with numbered steps and tip callout box

### 6. BlogPost (NEW)
Blog article with title, metadata, sections, and blockquote

### 7. ComparisonLayout (NEW)
Side-by-side comparison showing "with" vs "without" TextContainer

### 8. NarrowContent (NEW)
Policy/legal document with compact sections

### 9. TechnicalDocumentation (NEW)  
API documentation with code blocks and warning callouts

## Architecture Implementation

### React Layer
- Use `@shopify/polaris` TextContainer component
- Implement spacing prop for vertical rhythm
- Apply CSS custom properties for typography
- Handle nested content (headings, paragraphs, lists, code blocks)

### Vanilla JS Layer
- Use `@cin7/vanilla-js` utilities ($, on, addClass)
- Implement max-width: 65ch for optimal line length
- Apply CSS classes for styling
- Add interactive enhancements (hover states, smooth scroll)

### ExtJS Layer
- Use `Ext.container.Container` with maxWidth constraint
- Implement `Ext.panel.Panel` for structured layouts
- Use component HTML injection for rich content
- Apply inline styles for typography

### TypeScript Layer
- Fully typed React implementations
- Define interfaces for all props
- Type-safe content structures
- CSS Properties typing for inline styles

## Key Design Patterns

### Content Width Control
- **Optimal Reading Width**: 65ch (characters)
- **Rationale**: Research shows 50-75 characters per line is optimal for readability
- **Implementation**: max-width: 65ch in all layers

### Spacing Management  
- **spacing prop**: Adds vertical spacing between elements
- **Implementation**: CSS adjacent sibling selectors (> * + *)
- **Usage**: Long-form content, articles, documentation

### Typography Containers
- **Headings**: Size scale from base to 3xl
- **Body Text**: Relaxed line-height (1.6-1.75)
- **Color**: #374151 for body, varies for headings
- **Font Weight**: Semibold (600) for headings, normal (400) for body

### Responsive Text Blocks
- **Page Wrapper**: max-width: 1200px
- **Text Container**: max-width: 65ch (nested inside)
- **Padding**: 20px default
- **Margin**: 0 auto for centering

## Story Parameter Updates Needed

Update each story in `/storybook/stories/components/utilities/TextContainer.stories.tsx`:

```typescript
export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'default'),
  },
};

export const BasicUsage: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'basicUsage'),
  },
};

export const LongFormContent: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'longFormContent'),
  },
};

export const ProductDescription: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'productDescription'),
  },
};

export const HelpArticle: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'helpArticle'),
  },
};

export const BlogPost: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'blogPost'),
  },
};

export const ComparisonLayout: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'comparisonLayout'),
  },
};

export const NarrowContent: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'narrowContent'),
  },
};

export const TechnicalDocumentation: Story = {
  parameters: {
    codeVariants: getCodeVariants('textcontainer', 'technicalDocumentation'),
  },
};
```

## Implementation Status
- [ ] Add 8 new variants to codeVariants.ts (lines 36885-36983)
- [ ] Update story parameters for 8 stories
- [ ] Test all code examples in Storybook
- [ ] Verify multi-language toggle works for all variants
- [ ] Commit and sync to GitHub

## Notes
- File watchers (VSCode TypeScript server) are active and may cause edit conflicts
- Backup created at: `.storybook/blocks/codeVariants.ts.backup`
- All code examples follow Cin7 DSL multi-layer architecture
- Each variant demonstrates specific use case (e-commerce, documentation, blog, etc.)
