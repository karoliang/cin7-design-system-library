# Changelog

All notable changes to the Cin7 DSL framework are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-11-08

### 🔧 Code Quality & Developer Experience

Comprehensive template literal escaping fixes across all Storybook code variants, discovered through multi-agent deep audit.

#### Fixed

- **Template Literal Escaping Issues** (dfded6f, a1d107a, 16ba61b)
  - Fixed 34 critical template literal interpolation errors across 679 code variants
  - Resolved `ReferenceError: price is not defined` affecting all components
  - Fixed JSX attribute template literals in 18 components (30 instances)
  - Fixed ExtJS template syntax in product catalog
  - Fixed nested template literals in DescriptionList component

**Affected Components**:
- Banner: title interpolation (1 fix)
- Avatar/Badge: aria-label patterns (1 fix)
- Media: thumbnailUrl/thumbnailAlt patterns (13 fixes)
- ResourceList: accessibilityLabel (3 fixes)
- Loading: spinner labels (3 fixes)
- Pagination: page number labels (11 fixes)
- Toast: duration content (1 fix)
- DescriptionList: price/profit fields (1 fix)

**Pattern Fixed**: `{\`\${var}\`}` → `{\`\\\${var}\`}` in JSX attributes

#### Added

- **ESLint Rule for Template Literals** (.eslintrc-code-variants.js)
  - Custom rule to detect unescaped JSX template literals
  - Auto-fix capability for common patterns
  - Targeted detection for nested .map() templates

- **Comprehensive Guidelines** (TEMPLATE_LITERAL_GUIDELINES.md)
  - Escaping rules for all nesting levels (1-4+ backslashes)
  - Quick reference table with common patterns
  - Historical issues tracker
  - Prevention best practices

- **Audit Documentation** (TEMPLATE_LITERAL_AUDIT_REPORT.md)
  - Complete multi-agent audit findings (43+ issues identified)
  - Detailed analysis of all 679 code variants (57,983 lines)
  - Process documentation and lessons learned

#### Developer Impact

**Before**:
- ❌ Module load failures with ReferenceError
- ❌ Incorrect code examples in Storybook
- ❌ No automated detection or prevention

**After**:
- ✅ Module loads successfully (verified)
- ✅ Clean builds in 10.74s
- ✅ Accurate code examples across all components
- ✅ ESLint auto-fix for future issues
- ✅ Comprehensive developer guidelines

#### Multi-Agent Audit Process

Deployed 4 specialized agents in parallel to analyze entire codebase:
1. **React Code Variants Agent** - Found 32 JSX issues
2. **TypeScript Code Variants Agent** - Found 3-4 TypeScript issues
3. **Vanilla JS Code Variants Agent** - Found 8 nested template issues
4. **ExtJS Code Variants Agent** - Verified ExtJS syntax patterns

**Coverage**: 679 variants, 57,983 lines, 52 components, 4 languages

#### Verification

```bash
# Module loading test
node -e "require('./storybook/.storybook/blocks/codeVariants.ts');" # ✅ Pass

# Build test
cd storybook && pnpm build  # ✅ 10.74s, no errors

# Live site
# https://cin7-dsl.netlify.app/storybook/  # ✅ No ReferenceErrors
```

#### Documentation

- Template literal escaping guidelines with examples
- ESLint rule configuration instructions
- Pre-commit hook recommendations
- Comprehensive audit report with all findings

**See**: `storybook/TEMPLATE_LITERAL_AUDIT_REPORT.md` for complete details

---

## [1.1.0] - 2025-11-03

### 🎉 Initial Production Release

The Cin7 DSL framework is now production-ready with a complete multi-layer architecture combining Shopify Polaris, ExtJS, Vanilla JavaScript, and TypeScript.

#### Major Features
- **Multi-Layer Architecture**: Design System → UI Interaction → Component → Application layers
- **7 Core Packages**: All implemented and tested at v0.1.0
- **80+ Components**: Full documentation with multi-language code examples
- **Production Documentation**: 762 pages successfully building and deployed

#### Packages Released
- `@cin7/core` (v0.1.0) - Core utilities and types
- `@cin7/design-tokens` (v0.1.0) - Extended design token system
- `@cin7/vanilla-js` (v0.1.0) - Vanilla JS utilities and components
- `@cin7/typescript-sdk` (v0.1.0) - Business logic patterns
- `@cin7/extjs-adapters` (v0.1.0) - ExtJS component integration
- `@cin7/polaris-adapter` (v0.1.0) - React/Polaris components
- `@cin7/cli` (v0.1.0) - CLI tools for development

---

## [1.1.0] - 2025-11-03

### 🎨 Interactive Component Demonstrations

Added Storybook 8.6.14 for interactive, self-hosted component demonstrations with zero external dependencies.

#### Major Features

- **Interactive Demos**: Live component playground at https://cin7-dsl.netlify.app/storybook/
- **19 Story Variations**: Comprehensive examples across chart components
  - LineChart: 5 variations (default, multiple series, area chart, stepped line, time series)
  - BarChart: 6 variations (vertical, horizontal, stacked, percentage stacked, grouped, with data labels)
  - PieChart: 8 variations (standard, donut, semi-circle, custom colors, legend only, percentage labels, multiple series, custom inner size)
- **Self-Hosted Solution**: Fully integrated with documentation site, no external CDN dependencies
- **Version Control**: All stories tracked in git alongside component code

#### Technical Implementation

##### Added
- **Storybook Package** (e0c2f98)
  - Created `/storybook` workspace package
  - Configured Storybook 8.6.14 with React and Vite
  - Added 19 comprehensive story files for chart components
  - Integrated with Netlify deployment pipeline

##### Fixed
- **Deployment Path** (fe64eb0)
  - Fixed Storybook asset serving by copying to `public/storybook/` before Next.js build
  - Ensured standalone mode properly includes Storybook as static assets
  - Added proper .gitignore exclusions for build artifacts

- **X-Frame-Options Configuration** (5d9654e, b150fa1)
  - Configured path-specific security headers in netlify.toml
  - Set `X-Frame-Options: SAMEORIGIN` for `/storybook/*` to allow iframe previews
  - Maintained `X-Frame-Options: DENY` for all other paths for security
  - Resolved header precedence issue to ensure proper override order

##### Documentation
- **Chart Documentation Updates**
  - Added interactive demo links to all Highcharts documentation pages
  - Line Chart: `/storybook/?path=/docs/charts-linechart--docs`
  - Bar Chart: `/storybook/?path=/docs/charts-barchart--docs`
  - Pie Chart: `/storybook/?path=/docs/charts-piechart--docs`

#### Build Pipeline Integration

The Storybook build is now part of the Netlify deployment:
1. Storybook builds to `storybook-static/` (~3 seconds)
2. Output copied to `polaris.shopify.com/public/storybook/`
3. Next.js includes as static assets during standalone build
4. Deployed to https://cin7-dsl.netlify.app/storybook/

#### Developer Experience

```bash
# Start Storybook development server
cd storybook && pnpm dev  # http://localhost:6006

# Build for production
cd storybook && pnpm build
```

#### Story Organization

Stories are organized by component type in `/storybook/stories/charts/`:
- `LineChart.stories.tsx` - Time series, trends, multiple data series
- `BarChart.stories.tsx` - Category comparisons, rankings, stacking
- `PieChart.stories.tsx` - Part-to-whole relationships, composition

Each story includes:
- Component configuration examples
- Interactive controls for customization
- Code snippets for implementation
- Visual variants demonstrating different use cases

---

## Development History

### 2025-10-07

#### Added
- **Include dataset automation**  
  - Added `pnpm collect:variations` script. Output feeds the docs (`polaris/polaris.shopify.com/generated/component-variations.json`) and the include registry (`packages/include-system/src/generated/componentVariations.ts`).
- **Documentation updates**  
  - Introduced *Include snippets* panel on every component page. Tabs show the include syntax for React, Vanilla, ExtJS, and TypeScript.  
  - Added guidance and mixed-framework examples in `docs/include-system-guide.mdx` and the Getting Started overview.

#### Improved
- Component examples now display include syntax without requiring the include registry at runtime, simplifying the Netlify build.
- Cross-language include workflows are documented end-to-end, highlighting the benefit of a single include source-of-truth.

### 2025-07-15

#### Fixed
- **TypeScript Build Error** (5b50d9a)
  - Restored working codeVariants.ts with proper exports
  - Fixed malformed template literals causing 9000+ TypeScript errors
  - Ensured getCodeExamples and parseExampleFileName functions are exported
  - All 762 documentation pages now building successfully

### 2025-07-14

#### Added
- **Complete Component Library** (9a8cd8f)
  - Implemented all missing component files
  - Added CSS files for all components (badge, text, card, etc.)
  - Created comprehensive component documentation

#### Implemented
- **Vanilla JS Component System** (c05207c)
  - Built reusable component classes based on developer feedback
  - Removed all polaris- prefixes from CSS classes
  - Implemented required API: label, callbacks, get/set, setDisabled
  - Converted all 80+ examples from HTML snippets to component classes
  - Created base Component class with consistent API patterns

### 2025-07-13

#### Documentation
- **Project State Saved** (db833e2)
  - Comprehensive state saved to CLAUDE.md memory section
  - Documented all completed work and future roadmap

#### Fixed
- **Documentation Styling** (1ccdad1)
  - Simplified styling to match existing site patterns
  - Removed excessive Grid/Card usage in content pages
  - Fixed MDX component resolution issues

#### Added
- **Architecture Examples** (4be52e9)
  - Created architecture showcase with live examples
  - Added developer tools guide
  - Implemented cross-layer communication examples

- **Architecture Validation** (4bf4bae)
  - Created ARCHITECTURE_VALIDATION.md with comprehensive analysis
  - Added ARCHITECTURE_DIAGRAM.md with visual guides
  - Validated all design decisions and patterns

#### Updated
- **Package Status** (1531e2c)
  - Updated all packages from "planned/in progress" to "implemented"
  - All packages now at v0.1.0 with complete source code

#### Fixed
- **MDX Build Errors** (e2f5584, d57325c)
  - Added missing List, Table, and Icon components
  - Fixed icon string references in documentation
  - Resolved all MDX component import issues

### 2025-07-12

#### Improved
- **Documentation Quality** (1b898ac, 62f9f93)
  - Comprehensive improvements based on expert audit
  - Fixed production readiness issues
  - Updated all examples to production quality

#### Fixed
- **Build System** (4b95ddc)
  - Added missing MDX components
  - Fixed Next.js build errors
  - Resolved component import issues

### 2025-07-11

#### Released
- **v1.0.0 Official Release** (c02ccb8)
  - Framework declared production-ready
  - All core features implemented
  - Documentation complete

#### Fixed
- **Build Errors** (eba330b)
  - Added missing MDX variant files
  - Fixed component example references

### 2025-07-10

#### Massive Code Example Implementation

This was the most productive day with implementation of multi-language code examples across all components:

##### Component Examples Added
- **56 Missing Components** (9d7ac66) - Added all remaining Polaris components
- **Production Code** (721ef20) - Replaced all placeholders with working code
- **Card Component** (9b39804, 0405624, 853f3de, c62f557) - 20/20 examples
- **Icon Component** (82b6832) - 4/4 examples
- **Select Component** (e6fbdeb) - 6/6 examples
- **Banner Component** (cdfbb4b, 7912489) - 9/9 examples
- **Badge Component** (e619b70, 8f88b44) - 10/10 examples
- **TextField Component** (333515a, 3089713) - 23 examples
- **MediaCard Component** (0611ad6) - 3/3 examples
- **CalloutCard Component** (e9a6ee7) - Complete implementation
- **EmptyState Component** (6bbaa4b) - Complete implementation
- **Stack Components** (3785a01, 5f3a90b) - All variants
- **Text Component** (4473385) - Complete implementation
- **Layout Components** (7aa9c09) - Page, Layout, FormLayout
- **Form Components** (d62ce87) - Select, Modal, Checkbox
- **Display Components** (72e86a2, 362da86) - Avatar, Bleed, Box
- **Navigation Components** (9b42c51) - Tabs, List, Icon
- **Utility Components** (8e5d19a, 60cba7c) - Divider, Grid, Spinner

##### Technical Improvements
- **Template Literal Fixes** (321c2e0, 57b08c9) - Resolved syntax errors
- **TypeScript Compatibility** (922e5ab) - Fixed build errors
- **Duplicate Removal** (6540bb7) - Cleaned up code duplicates
- **Tab Simplification** (c78463c) - Improved UI with 5-tab layout

### 2025-07-09

#### Initial Setup
- Project repository created
- Basic structure established
- Initial package scaffolding

---

## Summary Statistics

### Total Commits: 50+
### Total Components: 80+
### Total Documentation Pages: 762
### Total Code Examples: 400+ (80 components × 5 languages)
### Lines of Code: 100,000+

### Key Achievements
1. ✅ **Multi-layer architecture** fully implemented
2. ✅ **Developer feedback** completely addressed
3. ✅ **Production-ready** framework with comprehensive docs
4. ✅ **Type-safe** throughout with TypeScript
5. ✅ **Cross-framework** compatibility (React, ExtJS, Vanilla JS)
6. ✅ **Design system** with extended tokens
7. ✅ **CLI tools** for rapid development
8. ✅ **Live examples** for every component
9. ✅ **Netlify deployment** with automatic builds
10. ✅ **Component API** consistency across all implementations

---

## What's Next?

See the [Next Steps](https://cin7-dsl.netlify.app/next-steps) section in the documentation for the roadmap ahead.

---

*This changelog is maintained as part of the Cin7 DSL framework documentation.*
