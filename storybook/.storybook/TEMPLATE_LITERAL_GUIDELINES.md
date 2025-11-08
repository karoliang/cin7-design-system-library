# Template Literal Escaping Guidelines for Code Variants

## Overview
When adding code examples to `codeVariants.ts`, proper template literal escaping is **critical** to prevent runtime errors and ensure code examples display correctly.

## The Problem
Code variants are stored as template literal strings (delimited by backticks). When showing template literal syntax INSIDE these code examples, insufficient escaping causes the outer template literal to interpolate undefined variables, resulting in ReferenceErrors at module load time.

## Escaping Rules

### Rule 1: JSX Attributes in React/TypeScript Code Examples
**Pattern**: JSX attributes containing template literals
**Required Escaping**: Triple backslashes (`\\\`)

```typescript
// ❌ WRONG - Will cause ReferenceError
react: `
  <Component title={\`Hello \${name}\`} />
`

// ✅ CORRECT - Properly escaped
react: `
  <Component title={\`Hello \\\${name}\`} />
`
```

### Rule 2: Nested Template Literals in Vanilla JS .map() Calls
**Pattern**: Template literals inside .map() callbacks
**Required Escaping**: Double backslashes (`\\`)

```javascript
// ❌ WRONG - Incorrect escaping
vanilla: `
  items.map(item => \`<div>\${item.name}</div>\`)
`

// ✅ CORRECT - Double backslashes for nested level
vanilla: `
  items.map(item => \`<div>\\${item.name}</div>\`)
`
```

### Rule 3: Multi-Level Nesting
**Pattern**: Template literals nested 2+ levels deep
**Required Escaping**: Quadruple backslashes (`\\\\`) or more

```javascript
// ❌ WRONG - Triple nesting without proper escaping
vanilla: `
  items.map(item => \`
    <div>
      \${item.badges.map(badge => \`<span>\${badge}</span>\`).join('')}
    </div>
  \`)
`

// ✅ CORRECT - Quadruple backslashes for 2nd nested level
vanilla: `
  items.map(item => \`
    <div>
      \\${item.badges.map(badge => \\\`<span>\\\\${badge}</span>\\\`).join('')}
    </div>
  \`)
`
```

### Rule 4: ExtJS Templates
**Pattern**: ExtJS template syntax
**Required Escaping**: No backslash for field references

```javascript
// ❌ WRONG - ExtJS uses {field}, not ${field}
extjs: `
  tpl: '<div>\\${price}</div>'
`

// ✅ CORRECT - ExtJS template syntax
extjs: `
  tpl: '<div>{price}</div>'
`

// For dollar signs in ExtJS templates:
extjs: `
  tpl: '<div>\${price}</div>'  // Renders as: $299.99
`
```

## Quick Reference Table

| Context | Example | Escaping Level | Backslashes |
|---------|---------|----------------|-------------|
| Runtime code (executes) | `${var}` | 0 | None |
| Outer template literal | `\${var}` | 1 | Single (`\`) |
| First nested template | `\\${var}` | 2 | Double (`\\`) |
| Second nested template | `\\\\${var}` | 3 | Quadruple (`\\\\`) |
| JSX attribute in example | `\\\${var}` | Special | Triple (`\\\`) |

## Common Patterns

### Pattern: AccessibilityLabel
```typescript
// ✅ CORRECT
<Component accessibilityLabel={\`View details for \\\${product.name}\`} />
```

### Pattern: Pagination Label
```typescript
// ✅ CORRECT
<Pagination
  label={\`Page \\\${currentPage} of \\\${totalPages}\`}
/>
```

### Pattern: Dynamic URLs
```typescript
// ✅ CORRECT
<VideoThumbnail
  thumbnailUrl={\`https://picsum.photos/seed/video\\\${index}/320/180.jpg\`}
/>
```

### Pattern: Keyboard Keys
```javascript
// ✅ CORRECT
vanilla: `
  keys.map(key => \`<kbd>\\${key}</kbd>\`)
`
```

## Validation

### ESLint Rule
The custom ESLint rule `.eslintrc-code-variants.js` detects these issues:
- Unescaped JSX attribute template literals
- Unescaped nested .map() templates
- Provides auto-fix capability

### Manual Testing
Always test after adding code variants:
```bash
# Test module loading
node -e "const v = require('./.storybook/blocks/codeVariants.ts'); console.log('✅ Loads');"

# Build Storybook
pnpm build
```

## Historical Issues Fixed

- **dfded6f**: DescriptionList price/profit/margin (lines 19587-19591)
- **a1d107a**: ExtJS product grid + React shopping cart totals (lines 42805, 42856, 42910)
- **[current]**: 30 JSX attribute template literals across Banner, Avatar, Media, ResourceList, Loading, Pagination, Toast components

## Prevention

1. **Use the ESLint rule** - Enable `.eslintrc-code-variants.js`
2. **Follow these guidelines** - Reference this document when adding code variants
3. **Test immediately** - Build and verify after each addition
4. **Code review** - Have template literal patterns reviewed before merging

## Questions?
If unsure about escaping level:
1. Count the nesting levels from outside in
2. Add 2 backslashes for each nesting level
3. For JSX attributes, use triple backslashes regardless of nesting

Remember: **It's better to over-escape than under-escape** - extra backslashes will just display as literal backslashes in the code example, while missing backslashes will cause runtime errors.
