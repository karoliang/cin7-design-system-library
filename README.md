# Cin7 DSL - Multi-Layer Enterprise Framework

A comprehensive design system language that combines Shopify Polaris, ExtJS, Vanilla JavaScript, and TypeScript to create enterprise-grade applications with clear separation of concerns.

## 🚀 Live Documentation

Visit the documentation site at: [https://cin7-dsl.netlify.app](https://cin7-dsl.netlify.app)

### 📚 Interactive Components
Explore live component demos in our Storybook: [https://cin7-dsl.netlify.app/storybook](https://cin7-dsl.netlify.app/storybook)
- **19 Interactive Stories** across LineChart, BarChart, and PieChart components
- **Self-Hosted** with zero external dependencies
- **Real-time Examples** with code previews and customization options

## 📖 What is Cin7 DSL?

Cin7 DSL is a production-ready, multi-layered framework that implements the architecture principle: "Use the right tool for each job"

### ✅ Framework Status: **v1.0.0 - Production Ready**

All packages are fully implemented and validated:
- ✅ **ExtJS for form controls and grids** - Enterprise-grade data components
- ✅ **Vanilla JS for UI interactions** - Lightweight, performant DOM manipulation
- ✅ **TypeScript for business logic** - Type-safe patterns and domain modeling
- ✅ **Modular architecture** - Clear separation of concerns across layers
- ✅ **Interactive Storybook** - Live component demos and testing environment

#### Recent Updates (November 2025)
- **v1.1.1**: Template literal escaping fixes and comprehensive code variant updates
- **Repository Cleanup**: Removed 28+ obsolete files and documentation
- **Storybook Integration**: Self-hosted interactive component demos
- **Production Ready**: All 760+ pages building successfully

## 🏗️ Architecture

The framework follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│                  (Business Logic)                          │
│                    TypeScript                               │
├─────────────────────────────────────────────────────────────┤
│                  UI Interaction Layer                       │
│                    Vanilla JS                               │
├─────────────────────────────────────────────────────────────┤
│                  Component Layer                            │
│              React + Ext JS + Polaris                      │
├─────────────────────────────────────────────────────────────┤
│                  Design System Layer                        │
│                 Polaris Foundation                          │
│              (Tokens, Themes, Patterns)                    │
└─────────────────────────────────────────────────────────────┘
```

## 📚 Documentation Structure

### Getting Started
- **Overview** - Framework introduction and key features
- **Architecture** - System design and patterns
- **Development** - Setup and development workflow
- **ExtJS Integration** - Advanced component integration
- **Migration** - Upgrading from Polaris React

### Core Documentation
- **Foundations** - Design principles and guidelines
- **Components** - UI component library
- **Tokens** - Design tokens and theming
- **Icons** - Icon library and usage
- **Patterns** - Common UI patterns and best practices
- **Archive** - Historical planning docs (`docs/archive/2025-foundation`)

## 📦 Framework Packages

All packages are implemented and ready for use:

| Package | Version | Description |
|---------|---------|-------------|
| `@cin7/core` | 0.1.0 | Core utilities and shared types |
| `@cin7/design-tokens` | 0.1.0 | Extended design token system |
| `@cin7/vanilla-js` | 0.1.0 | Lightweight DOM manipulation utilities |
| `@cin7/typescript-sdk` | 0.1.0 | Business logic patterns and domain modeling |
| `@cin7/extjs-adapters` | 0.1.0 | ExtJS component integration |
| `@cin7/polaris-adapter` | 0.1.0 | React components with Polaris |
| `@cin7/cli` | 0.1.0 | CLI tools for scaffolding and development |

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm 8+
- Git

### Quick Start
```bash
# Create a new Cin7 DSL project
npx @cin7/create-dsl-app my-app --template=full

# Or clone for development
git clone https://github.com/karoliang/cin7-design-system-library.git
cd cin7-design-system-library
pnpm install

# Start documentation site
cd polaris/polaris.shopify.com
pnpm dev

# Start Storybook for component development
cd storybook
pnpm dev
```

### Build
```bash
# Test build locally
./test-full-build.sh

# Build for production
cd polaris/polaris.shopify.com
pnpm build
```

### Include System workflow
- Regenerate component/variation metadata after changing MDX examples:
  ```bash
  pnpm collect:variations
  ```
- Commit both generated artefacts:
  - `polaris/polaris.shopify.com/generated/component-variations.json`
  - `packages/include-system/src/generated/componentVariations.ts`
- The include registry and coverage test use this dataset, and the docs pull the same information to render the *Include snippets* tabs.
- Run `pnpm check:variations` before submitting to ensure the dataset is in sync.

## 🚀 Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

### Netlify Configuration
- **Build Command**: Complex multi-step build process (see netlify.toml)
- **Publish Directory**: `polaris/polaris.shopify.com/.next`
- **Site URL**: https://cin7-dsl.netlify.app

### Build Process
1. Install dependencies
2. Build polaris-tokens
3. Build polaris-icons
4. Build polaris-react
5. Generate colors and assets
6. Build Next.js site

## 📁 Project Structure

```
cin7dsl/
├── packages/                   # Framework packages (all implemented)
│   ├── core/                   # Core utilities and types
│   ├── design-tokens/          # Extended design token system
│   ├── vanilla-js/             # Vanilla JS utilities
│   ├── typescript-sdk/         # Business logic patterns
│   ├── extjs-adapters/         # ExtJS component integration
│   ├── polaris-adapter/        # React/Polaris components
│   └── cli/                    # CLI tools for development
├── apps/                       # Example applications
│   ├── examples/               # Framework usage examples
│   └── playground/             # Interactive playground
├── polaris/                    # Polaris documentation site
│   ├── polaris.shopify.com/    # Documentation site source
│   ├── polaris-react/          # React components
│   ├── polaris-tokens/         # Design tokens
│   └── polaris-icons/          # Icon library
├── storybook/                  # Interactive component demos
│   ├── stories/                # Component story files
│   ├── .storybook/             # Storybook configuration
│   └── storybook-static/       # Built static assets
├── scripts/                    # Build and deployment scripts
├── netlify.toml               # Netlify configuration
├── ARCHITECTURE_VALIDATION.md  # Architecture validation report
├── ARCHITECTURE_DIAGRAM.md     # Visual architecture guide
├── CLAUDE.md                  # Claude AI guidance
└── README.md                  # This file
```

## 🔄 Keeping Up-to-Date

The site maintains synchronization with the upstream Polaris repository:

### Automated Updates
- Monthly checks for Polaris updates
- Automated patch application
- Build verification and deployment

### Manual Updates
```bash
# Check for updates
./check-upstream-updates.sh

# Apply updates
./update-polaris.sh
```

## 🎨 Customization

### Branding
- Site name: "Cin7 DSL"
- Logo: `/public/images/cin7-logo.svg`
- Colors: Based on Polaris tokens with custom extensions

### Content
- Homepage: Updated messaging for Cin7 DSL
- Getting Started: Comprehensive framework documentation
- Components: Enhanced with ExtJS integration examples

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build: `./test-full-build.sh`
5. Submit a pull request

### Adding Documentation
- Create new `.mdx` files in `/content/getting-started/`
- Follow existing patterns and structure
- Include code examples and best practices
- Test the build before submitting

## 🐛 Troubleshooting

### Build Issues
- Check Node.js version (18+)
- Clear cache: `pnpm clean`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

### Deployment Issues
- Check Netlify build logs
- Verify environment variables
- Test build locally first

## 📄 License

This project is based on Shopify Polaris and follows the same MIT License.

## 🤝 Support

### Getting Help
- **Documentation**: [cin7-dsl.netlify.app](https://cin7-dsl.netlify.app)
- **Interactive Demos**: [cin7-dsl.netlify.app/storybook](https://cin7-dsl.netlify.app/storybook)
- **Issues**: [GitHub Issues](https://github.com/karoliang/cin7-design-system-library/issues)

### Contributing Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Resources
- **Architecture Guide**: See `ARCHITECTURE_VALIDATION.md`
- **Code Examples**: Explore the `storybook/stories/` directory
- **Component Variations**: Check `packages/include-system/` for examples
- **Development Setup**: Follow the Quick Start guide above

---

Built with ❤️ using Shopify Polaris and modern web technologies.
