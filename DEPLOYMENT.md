# Deployment Documentation

## Overview

This project successfully deploys the Shopify Polaris documentation site to Netlify. The deployment is configured for automatic builds on push to the main branch.

## Deployment URLs

- **Production Site**: https://cin7-dsl.netlify.app
- **Admin Dashboard**: https://app.netlify.com/projects/cin7-dsl
- **Project ID**: 392faf2b-75c4-442e-9efc-911816e64de5

## Deployment Configuration

### Build Settings (netlify.toml)

```toml
[build]
  base = "polaris/polaris.shopify.com"
  publish = ".next"
  command = "cd ../.. && pnpm install && cd polaris/polaris-tokens && pnpm build && cd ../polaris-icons && pnpm build && cd ../polaris-react && pnpm build && cd ../polaris.shopify.com && pnpm gen-colors && pnpm gen-assets && pnpm next-build"

[build.environment]
  NODE_VERSION = "20.10.0"
  NEXT_TELEMETRY_DISABLED = "1"
```

### Build Process

The build follows this sequence:
1. Install dependencies at repository root
2. Build `@shopify/polaris-tokens`
3. Build `@shopify/polaris-icons`
4. Build `@shopify/polaris` (React components)
5. Generate color schemes for documentation
6. Generate assets for documentation
7. Build Next.js documentation site

## Common Issues and Resolutions

### 1. TypeScript Import Errors

**Issue**: `Module '"unist-util-visit"' has no exported member 'Node'`

**Resolution**: Import `Node` and `Parent` types from 'unist' package instead:
```typescript
// ❌ Wrong
import {visit, type Node, type Parent} from 'unist-util-visit';

// ✅ Correct
import {visit} from 'unist-util-visit';
import type {Node, Parent} from 'unist';
```

### 2. React Ref Callback Errors

**Issue**: Type error with ref callbacks returning values

**Resolution**: Use block syntax for ref callbacks:
```typescript
// ❌ Wrong
ref={(el) => (buttonRefs.current[index] = el)}

// ✅ Correct
ref={(el) => {
  buttonRefs.current[index] = el;
}}
```

### 3. Build Order Dependencies

**Issue**: Missing modules during build (e.g., `@shopify/polaris-tokens`)

**Resolution**: Build packages in correct dependency order as shown in netlify.toml

## Testing Before Deployment

### Quick Test
Tests only the documentation site:
```bash
cd polaris/polaris.shopify.com
pnpm build
```

### Comprehensive Test
Mimics the complete Netlify build process and verifies include datasets:
```bash
./test-full-build.sh
pnpm check:variations
```

## Environment Variables

Store in `.env` file (do not commit):
```
NETLIFY_AUTH_TOKEN=your_token_here
NETLIFY_SITE_ID=392faf2b-75c4-442e-9efc-911816e64de5
```

## Automatic Deployment

**STATUS: TEMPORARILY DISABLED** (See DISABLE_AUTO_DEPLOY.md for details)

Deployments are normally triggered automatically when:
- Code is pushed to the `main` branch
- The build completes successfully on Netlify

Currently, automatic deployment is disabled while we restructure the repository. To deploy manually, use:
```bash
netlify deploy --prod
```

## Monitoring Deployments

Check deployment status:
```bash
netlify status
```

View live site:
```bash
open https://cin7-dsl.netlify.app
```

## Build Times

Typical build times:
- Initial build: ~2-3 minutes
- Subsequent builds (with cache): ~1-2 minutes

## Security Headers

The deployment includes security headers configured in netlify.toml:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- X-Robots-Tag: noai, noimageai

## Success Indicators

A successful deployment will:
1. Show green build status in Netlify dashboard
2. Return HTTP 200 when accessing the site
3. Display the Polaris homepage with navigation
4. Load all static assets and styles correctly

## Last Successful Deployment

- **Date**: January 8, 2025
- **Commit**: 13b6859 (Fix all unist-util-visit import errors)
- **Build Time**: ~1m 40s
- **Status**: ✅ Successfully deployed
