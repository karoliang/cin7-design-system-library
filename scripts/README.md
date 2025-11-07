# Scripts Documentation

This directory contains utility scripts for maintaining the Cin7 DSL Storybook.

## Code Variants Management

### 1. Add Code Variants (Bulk)

**Script:** `add-code-variants-bulk.py`

Adds code variant parameters to multiple stories in a single component file.

**Usage:**
```bash
python3 scripts/add-code-variants-bulk.py \
    <file_path> \
    <component_key> \
    <story_names...>
```

**Example:**
```bash
python3 scripts/add-code-variants-bulk.py \
    storybook/stories/components/forms/TextField.stories.tsx \
    textfield \
    Default WithValue WithError Required Disabled
```

**What it does:**
- Adds `parameters: { codeVariants: getCodeVariants('componentkey', 'default') }` to each story
- Skips stories that already have code variants
- Handles complex story structures (render functions, nested components)
- Automatically fixes double comma syntax errors
- Reports success/skip status for each story

**Component Key Reference:**

The component key should match the export name in `storybook/.storybook/blocks/codeVariants.ts` (lowercase):
- Button → `button`
- TextField → `textfield`
- DataTable → `datatable`
- MediaCard → `mediacard`
- etc.

### 2. Verify Code Variants Coverage

**Script:** `verify-code-variants.py`

Scans all Storybook stories and verifies that every story has code variants.

**Usage:**
```bash
python3 scripts/verify-code-variants.py
```

**Output:**
- Total coverage statistics
- List of stories missing code variants (if any)
- Detailed JSON report saved to `code-variants-report.json`
- Exit code 0 if 100% coverage, 1 otherwise

**Sample Output (100% coverage):**
```
📊 VERIFICATION SUMMARY
================================================================================
Total files scanned:        77
Total stories found:        765
Stories WITH variants:      765 (100.0%)
Stories WITHOUT variants:   0 (0.0%)
================================================================================
✅ ✅ ✅  ALL STORIES HAVE CODE VARIANTS!  ✅ ✅ ✅
```

**Sample Output (incomplete coverage):**
```
📊 VERIFICATION SUMMARY
================================================================================
Total files scanned:        77
Total stories found:        765
Stories WITH variants:      758 (99.1%)
Stories WITHOUT variants:   7 (0.9%)
================================================================================

❌ MISSING CODE VARIANTS (1 files):
--------------------------------------------------------------------------------

📄 storybook/stories/components/utilities/AppProvider.stories.tsx (7 stories)
   - Default
   - WithCustomI18n
   - WithCustomTheme
   ...
```

## Workflow for Adding New Components

When you create a new Storybook component with multiple stories:

### Step 1: Create your stories file
```typescript
// storybook/stories/components/forms/NewComponent.stories.tsx
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/NewComponent',
  component: NewComponent,
  // ... other config
} satisfies Meta<typeof NewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { /* ... */ };
export const WithValue: Story = { /* ... */ };
export const WithError: Story = { /* ... */ };
```

### Step 2: Add code variants (bulk)
```bash
# Get list of story names
grep "^export const.*Story" storybook/stories/components/forms/NewComponent.stories.tsx

# Add code variants to all stories
python3 scripts/add-code-variants-bulk.py \
    storybook/stories/components/forms/NewComponent.stories.tsx \
    newcomponent \
    Default WithValue WithError
```

### Step 3: Verify coverage
```bash
python3 scripts/verify-code-variants.py
```

Should show:
```
✅ ✅ ✅  100% COMPLETE - ALL STORIES HAVE CODE VARIANTS!  ✅ ✅ ✅
```

### Step 4: Commit changes
```bash
git add storybook/stories/components/forms/NewComponent.stories.tsx
git commit -m "feat: add NewComponent with code variants"
git push
```

## CI/CD Integration

The verification script can be integrated into your CI/CD pipeline:

**package.json:**
```json
{
  "scripts": {
    "verify:code-variants": "python3 scripts/verify-code-variants.py"
  }
}
```

**GitHub Actions (.github/workflows/verify-storybook.yml):**
```yaml
name: Verify Storybook Code Variants

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Verify all stories have code variants
        run: python3 scripts/verify-code-variants.py
```

The script exits with code 1 if coverage is incomplete, failing the CI build.

## Troubleshooting

### Story not found error

**Error:** `⚠️  Story 'MyStory' not found or has unexpected format`

**Cause:** The story export doesn't match the expected pattern.

**Fix:** Ensure your story follows this pattern:
```typescript
export const MyStory: Story = {
  // ... story config
};
```

### Double comma syntax error

The bulk script automatically fixes double commas (`},,`), but if you see this error:
1. The script will fix it automatically
2. Or manually find and replace `},,` with `},`

### Component key not found

**Error:** Component key shows as invalid in verification

**Solution:** Check that the key matches an export in `storybook/.storybook/blocks/codeVariants.ts`:
```typescript
// The export should be named: {componentKey}Examples
export const buttonExamples: Record<string, CodeVariant> = {
  // ...
};

// Use 'button' as the component key (lowercase, without 'Examples')
```

## Current Status

**Last verified:** 2025-11-07
**Coverage:** 765/765 stories (100%)
**Files:** 77 component files
**Languages:** React, ExtJS, Vanilla JS, TypeScript

## Maintenance

Run the verification script periodically to ensure coverage remains at 100%:
```bash
# Quick check
python3 scripts/verify-code-variants.py

# Detailed report
python3 scripts/verify-code-variants.py > coverage-report.txt
cat code-variants-report.json | jq
```
