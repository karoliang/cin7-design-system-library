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