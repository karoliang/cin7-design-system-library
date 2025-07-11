# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the cin7dsl repository, which appears to be in its initial setup phase. The project name suggests it will be a Domain Specific Language (DSL) for Cin7, an inventory management system.

## Current State

The repository contains:
- Initial README.md file
- Cloned Shopify Polaris repository in `/polaris` directory

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
  - Patterns

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

Since the project hasn't been implemented yet, there are no specific build, test, or lint commands. When implementing this project, consider:

1. **Language Choice**: Consider the target audience and use case for the DSL
2. **Parser Implementation**: Will need a parser/lexer for the DSL syntax
3. **Testing Strategy**: Unit tests for parser, integration tests for DSL functionality

## Future Development Notes

When this project is developed, update this file with:
- Build commands
- Test commands
- Linting/formatting commands
- Architecture overview
- DSL syntax documentation references

## Memories

- Requested to add a memory, but no specific memory was provided