# Design Token Refactoring - Before & After Examples

**Purpose:** Reference guide showing common refactoring patterns
**Audience:** Developers implementing Phase 2 refactoring

---

## COMMON PATTERNS

### Pattern 1: Simple Spacing

**Before:**
```typescript
<div style={{ padding: '12px', margin: '20px' }}>
```

**After:**
```typescript
<div style={{ padding: 'var(--spacing-3)', margin: 'var(--spacing-5)' }}>
```

---

### Pattern 2: Directional Spacing

**Before:**
```typescript
<div style={{ marginTop: '8px', marginBottom: '16px', paddingLeft: '24px' }}>
```

**After:**
```typescript
<div style={{
  marginTop: 'var(--spacing-2)',
  marginBottom: 'var(--spacing-4)',
  paddingLeft: 'var(--spacing-6)'
}}>
```

---

### Pattern 3: Colors and Backgrounds

**Before:**
```typescript
<div style={{ backgroundColor: '#f3f4f6', color: '#6b7280', borderColor: '#e5e7eb' }}>
```

**After:**
```typescript
<div style={{
  backgroundColor: 'var(--color-gray-100)',
  color: 'var(--color-gray-500)',
  borderColor: 'var(--color-gray-200)'
}}>
```

---

### Pattern 4: Border Radius

**Before:**
```typescript
<div style={{ borderRadius: '4px' }}>
<div style={{ borderRadius: '6px' }}>
<div style={{ borderRadius: '8px' }}>
```

**After:**
```typescript
<div style={{ borderRadius: 'var(--border-radius-base)' }}>
<div style={{ borderRadius: 'var(--border-radius-md)' }}>
<div style={{ borderRadius: 'var(--border-radius-lg)' }}>
```

---

### Pattern 5: Complex Styles

**Before:**
```typescript
<div style={{
  padding: '12px',
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  margin: '0 0 12px 0',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151'
}}>
```

**After:**
```typescript
<div style={{
  padding: 'var(--spacing-3)',
  backgroundColor: 'var(--color-gray-100)',
  borderRadius: 'var(--border-radius-base)',
  margin: '0 0 var(--spacing-3) 0',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-gray-700)'
}}>
```

---

### Pattern 6: RGBA Colors (Opacity)

**Before:**
```typescript
<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
<div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
```

**After:**
```typescript
<div style={{ backgroundColor: 'rgba(0, 0, 0, var(--opacity-disabled))' }}>
<div style={{ backgroundColor: 'rgba(255, 255, 255, var(--opacity-medium))' }}>
```

**Alternative (CSS color-mix, future):**
```typescript
<div style={{ backgroundColor: 'color-mix(in srgb, var(--color-black) 50%, transparent)' }}>
```

---

### Pattern 7: Box Shadows

**Before:**
```typescript
<div style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
<div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
<div style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
```

**After:**
```typescript
<div style={{ boxShadow: 'var(--shadow-sm)' }}>
<div style={{ boxShadow: 'var(--shadow-base)' }}>
<div style={{ boxShadow: 'var(--shadow-md)' }}>
```

---

### Pattern 8: Semantic Colors

**Before:**
```typescript
// Success states
<Badge style={{ backgroundColor: '#10b981', color: '#fff' }}>
<Badge style={{ backgroundColor: '#f0fdf4', color: '#166534' }}>

// Warning states
<Badge style={{ backgroundColor: '#f59e0b', color: '#fff' }}>
<Badge style={{ backgroundColor: '#fff3e0', color: '#92400e' }}>

// Error states
<Badge style={{ backgroundColor: '#ef4444', color: '#fff' }}>
<Badge style={{ backgroundColor: '#fef2f2', color: '#991b1b' }}>
```

**After:**
```typescript
// Success states
<Badge style={{ backgroundColor: 'var(--color-success-500)', color: 'var(--color-white)' }}>
<Badge style={{ backgroundColor: 'var(--color-success-50)', color: 'var(--color-success-700)' }}>

// Warning states
<Badge style={{ backgroundColor: 'var(--color-warning-500)', color: 'var(--color-white)' }}>
<Badge style={{ backgroundColor: 'var(--color-warning-50)', color: 'var(--color-warning-700)' }}>

// Error states
<Badge style={{ backgroundColor: 'var(--color-critical-500)', color: 'var(--color-white)' }}>
<Badge style={{ backgroundColor: 'var(--color-critical-50)', color: 'var(--color-critical-700)' }}>
```

---

### Pattern 9: Brand Colors

**Before:**
```typescript
<Button style={{ backgroundColor: '#007ace', color: '#fff' }}>
<Card style={{ borderLeft: '4px solid #5c6ac4' }}>
<Badge style={{ backgroundColor: '#47c1bf' }}>
```

**After:**
```typescript
<Button style={{ backgroundColor: 'var(--color-brand-primary)', color: 'var(--color-white)' }}>
<Card style={{ borderLeft: '4px solid var(--color-brand-secondary)' }}>
<Badge style={{ backgroundColor: 'var(--color-brand-tertiary)' }}>
```

---

### Pattern 10: File Type Indicators

**Before:**
```typescript
// PDF indicator
<Badge style={{ backgroundColor: '#d72c0d' }}>PDF</Badge>

// Excel indicator
<Badge style={{ backgroundColor: '#2a6f3a' }}>XLSX</Badge>

// PowerPoint indicator
<Badge style={{ backgroundColor: '#e4930d' }}>PPTX</Badge>
```

**After:**
```typescript
// PDF indicator
<Badge style={{ backgroundColor: 'var(--color-file-pdf)' }}>PDF</Badge>

// Excel indicator
<Badge style={{ backgroundColor: 'var(--color-file-excel)' }}>XLSX</Badge>

// PowerPoint indicator
<Badge style={{ backgroundColor: 'var(--color-file-powerpoint)' }}>PPTX</Badge>
```

---

## REAL FILE EXAMPLES

### Example 1: VerticalStack.stories.tsx (Line 84)

**Before:**
```typescript
<div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
  Info message
</div>
```

**After:**
```typescript
<div style={{
  padding: 'var(--spacing-3)',
  backgroundColor: 'var(--color-info-100)',
  borderRadius: 'var(--border-radius-base)'
}}>
  Info message
</div>
```

---

### Example 2: Pagination.stories.tsx (Line 108)

**Before:**
```typescript
<div style={{
  width: '800px',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px'
}}>
```

**After:**
```typescript
<div style={{
  width: '800px',
  padding: 'var(--spacing-5)',
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: 'var(--border-radius-lg)'
}}>
```

---

### Example 3: CoreUtilities.stories.tsx (Line 49)

**Before:**
```typescript
<button
  style={{
    padding: '8px 16px',
    backgroundColor: '#007ace',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
  onClick={handleClick}
>
  Click Me
</button>
```

**After:**
```typescript
<button
  style={{
    padding: 'var(--spacing-2) var(--spacing-4)',
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--border-radius-base)',
    cursor: 'pointer'
  }}
  onClick={handleClick}
>
  Click Me
</button>
```

---

## EDGE CASES

### Edge Case 1: Custom Chart Colors

Some chart colors are intentional and should NOT be replaced:

**Keep As-Is (Chart Data):**
```typescript
const pieData = [
  { name: 'Product A', y: 45.0, color: '#5C6AC4' },  // Intentional chart color
  { name: 'Product B', y: 26.8, color: '#006FBB' },  // Intentional chart color
];
```

**Reason:** Chart colors often represent specific data categories and changing them would alter the visual meaning.

---

### Edge Case 2: Third-Party Integration Colors

**Keep As-Is (Social Media):**
```typescript
// These match brand guidelines
{ keys: ['F'], description: 'Facebook', color: '#1877f2' }
{ keys: ['T'], description: 'Twitter', color: '#1da1f2' }
```

**Alternative:** Use token if defined:
```typescript
{ keys: ['F'], description: 'Facebook', color: 'var(--color-social-facebook)' }
{ keys: ['T'], description: 'Twitter', color: 'var(--color-social-twitter)' }
```

---

### Edge Case 3: Inline Adjustments

**Context-Specific Values (Keep):**
```typescript
// Specific to this component's design
<div style={{ marginLeft: '-2px' }}>  // Optical alignment
<div style={{ width: 'calc(100% - 5px)' }}>  // Specific calculation
```

**Reason:** These values serve specific visual purposes and aren't part of the design system.

---

## QUICK REFERENCE TABLE

### Spacing Mapping
| Hardcoded | CSS Variable | Value |
|-----------|--------------|-------|
| 4px | --spacing-1 | 4px |
| 8px | --spacing-2 | 8px |
| 12px | --spacing-3 | 12px |
| 16px | --spacing-4 | 16px |
| 20px | --spacing-5 | 20px |
| 24px | --spacing-6 | 24px |
| 32px | --spacing-8 | 32px |
| 40px | --spacing-10 | 40px |
| 48px | --spacing-12 | 48px |
| 64px | --spacing-16 | 64px |

### Color Mapping (Common)
| Hardcoded | CSS Variable | Usage |
|-----------|--------------|-------|
| #f9fafb | --color-gray-50 | Light background |
| #f3f4f6 | --color-gray-100 | Card background |
| #e5e7eb | --color-gray-200 | Borders |
| #d1d5db | --color-gray-300 | Dividers |
| #6b7280 | --color-gray-500 | Secondary text |
| #111827 | --color-gray-900 | Primary text |
| #007ace | --color-brand-primary | Primary actions |
| #10b981 | --color-success-500 | Success states |
| #f59e0b | --color-warning-500 | Warning states |
| #ef4444 | --color-critical-500 | Error states |

### Border Radius Mapping
| Hardcoded | CSS Variable | Value |
|-----------|--------------|-------|
| 2px | --border-radius-sm | 2px |
| 4px | --border-radius-base | 4px |
| 6px | --border-radius-md | 6px |
| 8px | --border-radius-lg | 8px |
| 12px | --border-radius-xl | 12px |
| 16px | --border-radius-2xl | 16px |

---

## TESTING CHECKLIST

After refactoring each file:

- [ ] File builds without errors
- [ ] All stories render correctly in Storybook
- [ ] Visual appearance matches original
- [ ] No console warnings
- [ ] Colors are semantically correct
- [ ] Spacing is consistent
- [ ] Responsive behavior unchanged

---

## COMMON MISTAKES TO AVOID

1. **Don't replace chart data colors** - These are intentional
2. **Don't replace transparent/none values** - Not part of token system
3. **Don't break multi-value properties** - `margin: '0 0 12px 0'` → `margin: '0 0 var(--spacing-3) 0'`
4. **Don't mix units** - All tokens use px, don't introduce rem/em
5. **Don't change opacity without testing** - RGBA values need special handling
6. **Don't replace calc() values** - These are dynamic calculations
7. **Don't blindly find-replace** - Context matters

---

## HELPFUL COMMANDS

```bash
# Find all hardcoded spacing in a file
grep -n "padding\|margin\|gap" file.tsx | grep -E "[0-9]+px"

# Find all hex colors in a file
grep -n "#[0-9a-fA-F]" file.tsx

# Find all border radius values
grep -n "borderRadius.*[0-9]" file.tsx

# Test build after changes
cd storybook && pnpm build

# Start dev server to preview
cd storybook && pnpm dev
```

---

**Last Updated:** November 6, 2025
**Version:** 1.0
