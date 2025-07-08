# cin7dsl

A project hosting the Shopify Polaris design system documentation, deployed on Netlify.

## Live Site

🌐 **Visit**: https://cin7-dsl.netlify.app

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/karoliang/cin7dsl.git
   cd cin7dsl
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Test the build locally**:
   ```bash
   ./test-full-build.sh
   ```

4. **Deploy**:
   Push to `main` branch to trigger automatic deployment

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Project guidance for Claude AI assistants
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment documentation

## Project Structure

```
cin7dsl/
├── polaris/                    # Shopify Polaris repository
│   ├── polaris-react/          # React component library
│   ├── polaris-icons/          # Icon library
│   ├── polaris-tokens/         # Design tokens
│   └── polaris.shopify.com/    # Documentation site
├── netlify.toml                # Netlify configuration
├── test-build-local.sh         # Quick build test
└── test-full-build.sh          # Comprehensive build test
```

## Key Features

- Complete Shopify Polaris documentation
- React component library reference
- Design tokens and icons
- Automatic deployment on push
- Comprehensive build testing

## Development

To work on the documentation site locally:

```bash
cd polaris/polaris.shopify.com
pnpm dev
```

Visit http://localhost:3000 to see the site.

## Deployment Status

- **Production**: https://cin7-dsl.netlify.app ✅
- **Admin**: https://app.netlify.com/projects/cin7-dsl
- **Auto-deploy**: Enabled on `main` branch