# Polaris Patches

This directory contains patches that need to be applied after updating Polaris from upstream.

## Current Patches

### 1. unist-util-visit-imports.patch
Fixes TypeScript import errors for unist-util-visit package.

**Affected files:**
- `polaris.shopify.com/src/components/Markdown/serialize.ts`
- `polaris.shopify.com/src/components/Markdown/next-mdx-importer/serialize.ts`

### 2. react-ref-callbacks.patch
Fixes React ref callback type errors.

**Affected files:**
- `polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.tsx`
- `polaris-react/src/components/UnstyledLink/UnstyledLink.tsx`
- `polaris-react/.storybook/RenderPerformanceProfiler/RenderPerformanceProfiler.tsx`

## Applying Patches

After updating from upstream:

```bash
cd polaris
git apply ../patches/*.patch
```

## Creating New Patches

If you make fixes that need to be preserved:

```bash
# Make your changes
git add -A
git diff --cached > ../patches/my-fix.patch
```

## Testing Patches

Always test after applying:

```bash
./test-full-build.sh
```