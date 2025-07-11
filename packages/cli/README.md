# @cin7/cli

Command-line interface for Cin7 DSL framework. Scaffold projects, analyze performance, and manage migrations.

## Installation

```bash
npm install -g @cin7/cli
```

## Usage

```bash
cin7 [command] [options]
```

## Commands

### Create New Project

```bash
cin7 create my-app

# With options
cin7 create my-app --template full-stack --typescript --git
```

Templates:
- `basic` - Minimal setup with core packages
- `full-stack` - All layers configured
- `polaris-enhanced` - Polaris with performance optimizations
- `extjs-modern` - Modernized ExtJS application

### Add Packages

```bash
# Add a layer to existing project
cin7 add vanilla-js
cin7 add extjs-adapters
cin7 add typescript-sdk
```

### Analyze Performance

```bash
# Analyze current application
cin7 analyze

# Analyze specific URL
cin7 analyze https://myapp.com

# Compare before/after migration
cin7 analyze --compare ./before-report.json
```

### Migration Tools

```bash
# Analyze Polaris app for optimization opportunities
cin7 migrate analyze --from polaris

# Generate migration plan
cin7 migrate plan --from extjs --to cin7

# Convert components
cin7 migrate convert ./src/components --from polaris --optimize
```

### Development Tools

```bash
# Start development server with all layers
cin7 dev

# Build for production
cin7 build

# Run linting and type checking
cin7 lint
cin7 typecheck
```

### Component Generation

```bash
# Generate new component
cin7 generate component MyComponent --layer react
cin7 generate component DataGrid --layer extjs

# Generate repository
cin7 generate repository Product

# Generate use case
cin7 generate usecase UpdateInventory
```

## Configuration

Create `cin7.config.js` in your project root:

```javascript
module.exports = {
  // Project configuration
  layers: ['vanilla-js', 'react', 'extjs'],
  
  // Build options
  build: {
    target: 'production',
    analyze: true,
    sourceMaps: false,
  },
  
  // Performance thresholds
  performance: {
    bundleSize: 500, // KB
    initialLoad: 3000, // ms
    largeTableThreshold: 1000, // rows
  },
  
  // Migration settings
  migration: {
    preserveStyles: true,
    componentMap: './migration-map.json',
  },
};
```

## Examples

### Creating a Full-Stack Application

```bash
# Create new project
cin7 create inventory-system --template full-stack

# Navigate to project
cd inventory-system

# Add authentication
cin7 add auth

# Generate components
cin7 generate component ProductList --layer react
cin7 generate component ProductGrid --layer extjs
cin7 generate repository Product
cin7 generate usecase ManageInventory

# Start development
cin7 dev
```

### Migrating from Pure Polaris

```bash
# Analyze existing app
cin7 analyze ./my-polaris-app

# Generate migration report
cin7 migrate analyze --from polaris --report migration-report.html

# Start migration
cin7 migrate start --interactive

# Convert specific component
cin7 migrate convert ./src/components/DataTable.jsx --to extjs-grid
```

### Performance Optimization

```bash
# Run performance audit
cin7 analyze performance

# Optimize bundle
cin7 optimize bundle --target 200kb

# Analyze component render times
cin7 analyze components --threshold 50ms

# Generate optimization report
cin7 report performance --format html
```

## CLI Architecture

The CLI is built with:
- **Commander.js** - Command parsing
- **Inquirer** - Interactive prompts
- **Chalk** - Colored output
- **Ora** - Spinner animations
- **Handlebars** - Template generation
- **Lighthouse** - Performance analysis
- **Puppeteer** - Browser automation

## Plugin System

Create custom commands:

```javascript
// cin7-plugin-custom.js
module.exports = {
  name: 'custom',
  register(program) {
    program
      .command('custom:task')
      .description('Custom task')
      .action(() => {
        console.log('Running custom task');
      });
  },
};
```

Use in `cin7.config.js`:

```javascript
module.exports = {
  plugins: [
    './cin7-plugin-custom.js',
  ],
};
```

## API

The CLI can also be used programmatically:

```javascript
import { analyze, migrate, create } from '@cin7/cli';

// Analyze performance
const report = await analyze({
  url: 'https://myapp.com',
  metrics: ['performance', 'accessibility'],
});

// Run migration
const result = await migrate({
  from: 'polaris',
  to: 'cin7',
  sourcePath: './src',
  interactive: false,
});
```

## Contributing

See the main repository's contributing guide.

## License

MIT