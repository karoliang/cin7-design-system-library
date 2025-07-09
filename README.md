# Cin7 DSL Documentation Site

This repository contains the documentation site for Cin7 DSL (Design System Language), a comprehensive framework built on Shopify Polaris for creating modern, scalable web applications.

## 🚀 Live Site

Visit the live documentation site at: [https://cin7-dsl.netlify.app](https://cin7-dsl.netlify.app)

## 📖 What is Cin7 DSL?

Cin7 DSL is a modern frontend framework that combines:
- **Shopify Polaris** - Proven design system foundation
- **ExtJS Integration** - Advanced form controls and data grids
- **React Components** - Modern component-based architecture
- **TypeScript** - Type-safe development
- **Modular Design** - Clear separation of concerns

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

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm 8+
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/karoliang/cin7dsl.git
cd cin7dsl

# Install dependencies
pnpm install

# Start development server
cd polaris/polaris.shopify.com
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
├── polaris/                    # Cloned Polaris repository
│   ├── polaris.shopify.com/    # Documentation site
│   │   ├── content/            # Documentation content
│   │   │   ├── getting-started/ # Cin7 DSL documentation
│   │   │   ├── components/     # Component documentation
│   │   │   ├── foundations/    # Design foundations
│   │   │   └── ...
│   │   ├── src/                # Site source code
│   │   └── public/             # Static assets
│   ├── polaris-react/          # React components
│   ├── polaris-tokens/         # Design tokens
│   └── polaris-icons/          # Icon library
├── scripts/                    # Build and deployment scripts
├── .env                        # Environment variables
├── netlify.toml               # Netlify configuration
├── CLAUDE.md                  # Claude AI guidance
├── DEPLOYMENT.md              # Deployment documentation
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

For questions or issues:
- Check the documentation site
- Review existing issues
- Create a new issue with details

---

Built with ❤️ using Shopify Polaris and modern web technologies.