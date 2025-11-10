# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cin7 DSL is a production-ready, multi-layered enterprise framework that combines Shopify Polaris, ExtJS, Vanilla JavaScript, and TypeScript to create scalable applications with clear separation of concerns.

## Framework Status: v1.0.0 - Production Ready ✅

All packages are fully implemented and validated:
- ✅ **ExtJS for form controls and grids** - Enterprise-grade data components
- ✅ **Vanilla JS for UI interactions** - Lightweight, performant DOM manipulation
- ✅ **TypeScript for business logic** - Type-safe patterns and domain modeling
- ✅ **Modular architecture** - Clear separation of concerns across layers

## Repository Structure

```
cin7dsl/
├── packages/                   # Framework packages (all implemented)
│   ├── core/                   # Core utilities and types (v0.1.0)
│   ├── design-tokens/          # Extended design token system (v0.1.0)
│   ├── vanilla-js/             # Vanilla JS utilities (v0.1.0)
│   ├── typescript-sdk/         # Business logic patterns (v0.1.0)
│   ├── extjs-adapters/         # ExtJS component integration (v0.1.0)
│   ├── polaris-adapter/        # React/Polaris components (v0.1.0)
│   ├── highcharts-adapter/     # Highcharts integration (v0.1.0)
│   └── cli/                    # CLI tools for development (v0.1.0)
├── apps/                       # Example applications
├── polaris/                    # Polaris documentation site
├── storybook/                  # Interactive component demos (v0.1.0)
└── scripts/                    # Build and deployment scripts
```

## Architecture Validation

The architecture has been validated and documented in:
- `ARCHITECTURE_VALIDATION.md` - Comprehensive validation report
- `ARCHITECTURE_DIAGRAM.md` - Visual architecture guide

## Reference Resources

### Shopify Polaris
The repository includes a local copy of the Shopify Polaris design system at `/polaris`. Key locations:

- **React Components**: `/polaris/polaris-react` - The component library source code
- **Documentation Site**: `/polaris/polaris.shopify.com` - Full documentation website source
- **Component Examples**: `/polaris/polaris.shopify.com/pages/examples` - Live component examples
- **Content**: `/polaris/polaris.shopify.com/content` - MDX documentation files

### Working with Polaris
```bash
cd polaris
pnpm install && pnpm build
pnpm turbo run dev --filter=@shopify/polaris    # Component storybook
pnpm turbo run dev --filter=polaris.shopify.com  # Documentation site
```

## Storybook Integration

The project includes Storybook 8.6.14 for interactive component demonstrations, deployed at https://cin7-dsl.netlify.app/storybook/

### Key Features
- **Interactive Demos**: Live, interactive examples of all chart components
- **19 Story Variations**: Comprehensive coverage of LineChart, BarChart, and PieChart
- **Self-Hosted**: Fully integrated with the documentation site, no external dependencies
- **Version Control**: Stories are tracked in git alongside component code

### Working with Storybook

```bash
# Development mode (with hot reload)
cd storybook
pnpm dev  # Runs on http://localhost:6006

# Build for production
cd storybook
pnpm build  # Output to storybook-static/

# The build is automatically copied to the docs site during Netlify deployment
```

### Story Structure

Stories are organized by component type:
- `/storybook/stories/charts/LineChart.stories.tsx` - 5 variations
- `/storybook/stories/charts/BarChart.stories.tsx` - 6 variations
- `/storybook/stories/charts/PieChart.stories.tsx` - 8 variations

Each story showcases different configurations and use cases for the component.

### Adding New Stories

1. Create a new `.stories.tsx` file in `/storybook/stories/`
2. Follow the existing pattern with Meta and Story types
3. Run `pnpm dev` to preview locally
4. Build and deploy via Netlify

### Deployment Integration

The Storybook build is integrated into the Netlify pipeline:
1. Storybook builds to `storybook-static/`
2. Output is copied to `polaris.shopify.com/public/storybook/`
3. Next.js includes it as static assets during standalone build
4. Custom headers allow iframe usage for component previews

**Important**: The `/storybook/*` path has `X-Frame-Options: SAMEORIGIN` to allow Storybook's iframe-based component previews, while all other paths maintain `X-Frame-Options: DENY` for security.

## Deployment to Netlify

The project deploys to: https://cin7-dsl.netlify.app

- **Build configuration**: `netlify.toml`
- **Build command**: Complex multi-step process building all dependencies
- **Deployment**: Automatic on push to main branch
- **Build time**: ~4 minutes (with cache) to ~14 minutes (clean build)

### Testing Builds Locally

```bash
# Quick docs-only check
cd polaris/polaris.shopify.com
pnpm build

# Full pipeline test (matches Netlify build)
cd ../..
./test-full-build.sh

# Verify include dataset is up to date
pnpm check:variations
```

## Recent Updates (2025-07-13)

### Package Status Updates
- Updated all packages from "planned/in progress" to "implemented" status
- All packages are at version 0.1.0 with complete source code
- Fixed MDX component resolution issues (List, Table, Icon components)
- Documentation now accurately reflects framework status

### MDX Component Configuration
The following components are configured in `Markdown.tsx`:
- All Polaris components (Badge, Button, Card, etc.)
- Custom Table component for MDX tables
- Icon component with string-based icon resolution
- List component for markdown lists

### Build Optimization
- Netlify caching reduces build time from 14 to 4 minutes
- Only documentation changes trigger minimal rebuilds
- All 760 pages build successfully

## Development Commands

```bash
# Install dependencies
pnpm install

# Start documentation site
cd polaris/polaris.shopify.com && pnpm dev

# Start Storybook (interactive demos)
cd storybook && pnpm dev

# Run tests
pnpm test

# Build for production
./test-full-build.sh

# Build Storybook only
cd storybook && pnpm build

# Create new project
npx @cin7/create-dsl-app my-app --template=full
```

## Package Commands

Each package has standard scripts:
- `pnpm build` - Build the package
- `pnpm dev` - Start development mode
- `pnpm test` - Run tests
- `pnpm lint` - Lint code

## Architecture Principles

1. **Layer Independence**: Each layer can function independently
2. **Clear Boundaries**: Well-defined interfaces between layers
3. **Event-Driven**: Loose coupling via EventBus
4. **Type Safety**: 100% TypeScript coverage
5. **Framework Agnostic**: Business logic doesn't depend on UI frameworks

## Key Patterns

### ExtJS Integration
```typescript
import { ExtDataGrid } from '@cin7/extjs-adapters';

const grid = ExtDataGrid.create({
  store: productStore,
  features: ['grouping', 'sorting', 'export']
});
```

### Vanilla JS Utilities
```javascript
import { $, on, fadeIn } from '@cin7/vanilla-js';

on('#button', 'click', () => {
  fadeIn('#panel');
});
```

### Business Logic
```typescript
import { Repository, UseCase } from '@cin7/typescript-sdk';

class ProductRepository extends Repository<Product> {
  // Implementation
}
```

### Cross-Layer Communication
```typescript
import { EventBus } from '@cin7/core';

EventBus.on('product:updated', (product) => {
  // Handle across all layers
});
```

## Keeping Polaris Up-to-Date

```bash
# Check for updates
./check-upstream-updates.sh

# Apply updates
./update-polaris.sh
```

## Testing Strategy

1. Unit tests for each package
2. Integration tests for cross-layer communication
3. E2E tests for example applications
4. Build verification tests

## Performance Considerations

- Vanilla JS for performance-critical operations
- ExtJS for large datasets (>1000 items)
- React for modern UI patterns
- Code splitting and lazy loading throughout

## Next Steps

See "Next Steps" section at the end of this file for current priorities.

## Memories

### Project Status
- **Current Version**: v1.0.0 - Production Ready
- **All 7 packages implemented**: @cin7/core, @cin7/polaris-adapter, @cin7/vanilla-js, @cin7/typescript-sdk, @cin7/extjs-adapters, @cin7/design-tokens, @cin7/cli (all at v0.1.0)
- **Documentation Site**: 762 pages successfully building and deployed to https://cin7-dsl.netlify.app
- **Build Times**: ~4 minutes (with cache) to ~14 minutes (clean build)
- **Total Commits**: 53 (including latest documentation updates)
- **Development Timeline**: July 9-15, 2025 (7 days from inception to production)

### Architecture & Requirements
- **Multi-layer Framework**: Design System → UI Interaction → Component → Application layers
- **Frontend Team Requirements Met**: ✅ ExtJS for forms/grids, ✅ Vanilla JS for UI, ✅ TypeScript for business logic, ✅ Modular architecture
- **Architecture Validated**: See ARCHITECTURE_VALIDATION.md and ARCHITECTURE_DIAGRAM.md
- **80+ Components**: All with multi-layer code examples in codeVariants.ts

### Recent Completed Work (July 15, 2025)
- Fixed MDX build errors (missing List/Table/Icon components)
- Fixed documentation styling inconsistencies (removed Grid/Card overuse)
- Updated all package statuses from "planned" to "implemented"
- Created comprehensive validation and architecture documentation
- All builds tested and working (`pnpm build` in `polaris/polaris.shopify.com` and `./test-full-build.sh`)
- Fixed TypeScript build error in codeVariants.ts (restored from commit db833e2)
- Created comprehensive changelog documentation (CHANGELOG.md, docs/archive/2025-foundation/DEVELOPMENT_TIMELINE.md)
- Added changelog pages to documentation site with proper navigation
- Created detailed development logs page under version guides
- Fixed Divider component error by replacing with markdown horizontal rules
- Refactored development logs with meaningful context and reasoning behind changes

### Recent Completed Work (November 3, 2025)
- Implemented Storybook 8.6.14 for interactive component demonstrations
- Created 19 interactive story variations across LineChart, BarChart, and PieChart
- Integrated Storybook into Netlify deployment pipeline
- Fixed Storybook deployment path for proper static asset serving
- Resolved X-Frame-Options header configuration for iframe support
- Added interactive demo links to all chart documentation pages
- Self-hosted solution with zero external dependencies

### Recent Completed Work (November 8, 2025)
- **v1.1.1 Release**: Template literal escaping fixes across all Storybook code variants
- Fixed 34 critical template literal interpolation errors in codeVariants.ts (679 variants, 57,983 lines)
- Resolved `ReferenceError: price is not defined` affecting all components
- Conducted multi-agent deep audit with 4 specialized agents (React, TypeScript, Vanilla JS, ExtJS)
- Fixed JSX attribute template literals in 18 components (30 instances)
- Fixed ExtJS template syntax in product catalog
- Fixed nested template literals in DescriptionList component
- Created ESLint rule (.eslintrc-code-variants.js) with auto-fix capability
- Created comprehensive template literal guidelines (TEMPLATE_LITERAL_GUIDELINES.md)
- Created detailed audit report (TEMPLATE_LITERAL_AUDIT_REPORT.md)
- Updated CHANGELOG.md with v1.1.1 release notes
- Build verified: 10.74s, no errors
- Deployed to production: https://cin7-dsl.netlify.app/storybook/

### Template Literal Escaping Knowledge
- **Critical Pattern**: JSX attributes in code variant strings need triple-backslash escaping: `{\`\\\${var}\`}`
- **Nested Templates**: First level needs double backslashes: `.map(x => \`\\${x}\`)`
- **ExtJS Syntax**: Uses `{fieldName}` not `${fieldName}` for template fields
- **Module Load vs Runtime**: Distinguish between code that executes and code that displays as examples
- **Validation**: Always test with `node -e "require('./path/to/codeVariants.ts')"` after changes
- **Prevention**: Use .eslintrc-code-variants.js for auto-detection and fixing
- **Reference**: See TEMPLATE_LITERAL_GUIDELINES.md for complete escaping rules

### Documentation Patterns
- Follow simple markdown patterns over complex component structures
- Avoid excessive Grid/Card usage in content pages
- Use established site patterns for consistency
- Interactive examples belong in /pages/examples, not content pages
- Avoid multi-column layouts in MDX - they often don't render properly
- Focus on narrative flow and meaningful context over raw data
- Explain the "why" behind changes, not just the "what"
- Use DataTable component sparingly for truly tabular data

### Future Features (Saved for Later)
- AI-powered design generation tool for product designers/managers
- Ability to generate pages from AI prompts, Jira requirements, task requirements

## Next Steps

### 1. Testing Implementation (High Priority)
- Add unit tests for all packages
- Create integration test suite
- Add E2E tests for example applications
- Set up CI/CD pipeline with test automation

### 2. NPM Publishing (High Priority)
- Publish all packages to npm registry
- Set up automated publishing workflow
- Create package documentation on npm

### 3. Developer Experience (Medium Priority)
- Create VS Code extension for Cin7 DSL
- Add more CLI commands for common tasks
- Create interactive playground
- Add DevTools browser extension

### 4. Documentation Enhancement (Medium Priority)
- Add more real-world examples
- Create video tutorials
- Add migration guides from other frameworks
- Create best practices guide

### 5. Performance Optimization (Low Priority)
- Add bundle size tracking
- Implement performance budgets
- Add runtime performance monitoring
- Optimize build process further

### 6. Community Building (Ongoing)
- Set up GitHub discussions
- Create contribution guidelines
- Add issue templates
- Build example showcase
- always commit and push to github whenever changes, updates, tasks, fixes