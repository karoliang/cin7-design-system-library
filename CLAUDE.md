# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the cin7dsl repository, which implements a Domain Specific Language (DSL) for Cin7, combining multiple technologies in a unified framework for building enterprise applications.

## Current State

The repository contains:
- Initial README.md file
- Cloned Shopify Polaris repository in `/polaris` directory with extensive customizations
- Cin7 DSL documentation and patterns integrated into Polaris docs
- Custom build scripts and deployment configuration

## Reference Resources

### Shopify Polaris
The repository includes a local copy of the Shopify Polaris design system at `/polaris`. Key locations:

- **React Components**: `/polaris/polaris-react` - The component library source code
- **Documentation Site**: `/polaris/polaris.shopify.com` - Full documentation website source
- **Component Examples**: `/polaris/polaris.shopify.com/pages/examples` - Live component examples
- **Content**: `/polaris/polaris.shopify.com/content` - MDX documentation files organized by:
  - Components (by category)
  - Design guidelines
  - Content guidelines
  - Design tokens
  - Patterns (including Cin7 DSL patterns)
  - Getting Started (Cin7 DSL specific)

To work with Polaris locally:
```bash
cd polaris
pnpm install && pnpm build
pnpm turbo run dev --filter=@shopify/polaris    # Component storybook
pnpm turbo run dev --filter=polaris.shopify.com  # Documentation site
```

### Deployment to Netlify

The project is configured to deploy the Polaris documentation site to Netlify:

- **Build configuration**: `netlify.toml`
- **Environment variables**: `.env` (contains Netlify credentials - do not commit)
- **Build command**: Builds required dependencies (polaris-tokens, polaris-icons, polaris-react) before building the documentation site

### Testing Builds Locally

Two test scripts are available to verify builds before deploying:

1. **Quick test** - Tests only the documentation site build:
```bash
# From repository root
./test-build-local.sh
```

2. **Comprehensive test** - Tests the full build process matching Netlify:
```bash
# From repository root
./test-full-build.sh
```

The comprehensive test script:
- Builds all dependencies in the correct order (polaris-tokens → polaris-icons → polaris-react)
- Generates documentation assets
- Performs the full Next.js build
- Provides color-coded output for easy debugging

Always run the comprehensive test before deploying to catch dependency and build order issues.

## Keeping Polaris Up-to-Date

### Check for Updates
```bash
./check-upstream-updates.sh
```

### Update Process
```bash
./update-polaris.sh
```

This will:
1. Fetch latest from Shopify/polaris
2. Create an update branch
3. Merge upstream changes
4. Apply our custom patches
5. Run tests

### Custom Patches
All TypeScript and React fixes are maintained as patches in the `/patches` directory. These are automatically applied during updates.

## Development Setup

### Build Commands
- `pnpm install` - Install all dependencies
- `pnpm build` - Build all packages
- `./test-full-build.sh` - Test complete build pipeline

### Test Commands
- `pnpm test` - Run tests (when implemented)
- `./test-build-local.sh` - Quick build test
- `./test-full-build.sh` - Comprehensive build test

### Linting/Formatting Commands
- `pnpm lint` - Lint code (when configured)
- `pnpm format` - Format code (when configured)

## Architecture Overview

The Cin7 DSL is a multi-layer architecture that combines:
1. **Vanilla JS Layer** - Lightweight DOM manipulation
2. **React/Polaris Layer** - Modern UI components
3. **ExtJS Layer** - Enterprise data grids and forms
4. **TypeScript SDK Layer** - Business logic and data management

## DSL Syntax Documentation

The DSL syntax is documented in `/polaris/polaris.shopify.com/content/foundations/dsl-syntax/index.mdx`

## Recent Updates (2025-07-12)

### Documentation Fixes Applied
1. **Fixed broken icons**: Updated 18 icon references to use correct Polaris icon names
2. **Fixed duplicate headings**: Converted hardcoded titles to use `{frontmatter.title}`
3. **Fixed runtime errors**: 
   - Added missing imports to livePreview code blocks
   - Converted TypeScript examples from livePreview to static code blocks
   - Fixed missing React hooks and Polaris component imports
4. **Fixed content alignment**: 
   - Replaced HTML tags with proper Polaris components
   - Fixed broken links
   - Ensured consistent component usage across all pattern pages

### MDX Component Configuration
Added the following components to `/polaris/polaris.shopify.com/src/components/Markdown/Markdown.tsx`:
- Badge, Button, BlockStack, ResourceList, ResourceItem
- ButtonGroup, AppProvider, Avatar, Banner, DataTable
- Filters, Layout, Page, Spinner, TextField
- Grid, TextContainer, Link
- Card with custom Card.Section implementation

## Deployment Notes

- Auto-deployment is enabled in `netlify.toml`
- Push to main branch triggers automatic Netlify build
- Build typically takes 5-10 minutes
- Monitor deployment at Netlify dashboard

## Memories

- Project successfully converted from concept to implementation with 50+ new documentation pages
- All build errors resolved, site deploys successfully to Netlify
- Comprehensive pattern library created for Cin7 DSL multi-layer architecture