/**
 * Create command - scaffold new Cin7 DSL projects
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

interface CreateOptions {
  template?: string;
  typescript?: boolean;
  git?: boolean;
  install?: boolean;
}

const templates = {
  basic: {
    name: 'Basic',
    description: 'Minimal setup with core packages',
    packages: ['@cin7/core', '@cin7/vanilla-js'],
  },
  'full-stack': {
    name: 'Full Stack',
    description: 'All layers configured',
    packages: [
      '@cin7/core',
      '@cin7/vanilla-js',
      '@cin7/typescript-sdk',
      '@cin7/design-tokens',
      '@cin7/polaris-adapter',
      '@cin7/extjs-adapters',
    ],
  },
  'polaris-enhanced': {
    name: 'Polaris Enhanced',
    description: 'Polaris with performance optimizations',
    packages: [
      '@cin7/core',
      '@cin7/vanilla-js',
      '@cin7/design-tokens',
      '@cin7/polaris-adapter',
    ],
  },
  'extjs-modern': {
    name: 'ExtJS Modern',
    description: 'Modernized ExtJS application',
    packages: [
      '@cin7/core',
      '@cin7/design-tokens',
      '@cin7/extjs-adapters',
    ],
  },
};

export const createCommand = new Command('create')
  .description('Create a new Cin7 DSL project')
  .argument('<name>', 'Project name')
  .option('-t, --template <template>', 'Project template', 'basic')
  .option('--typescript', 'Use TypeScript', true)
  .option('--no-typescript', 'Use JavaScript')
  .option('--git', 'Initialize git repository', true)
  .option('--no-git', 'Skip git initialization')
  .option('--install', 'Install dependencies', true)
  .option('--no-install', 'Skip dependency installation')
  .action(async (name: string, options: CreateOptions) => {
    console.log(chalk.cyan('\n🚀 Creating new Cin7 DSL project...\n'));

    // Validate project name
    const projectPath = path.resolve(name);
    if (fs.existsSync(projectPath)) {
      console.error(chalk.red(`✖ Directory ${name} already exists`));
      process.exit(1);
    }

    // Interactive mode if no template specified
    let selectedTemplate = options.template || 'basic';
    if (!templates[selectedTemplate as keyof typeof templates]) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select a project template:',
          choices: Object.entries(templates).map(([key, value]) => ({
            name: `${value.name} - ${value.description}`,
            value: key,
          })),
        },
      ]);
      selectedTemplate = answers.template;
    }

    const template = templates[selectedTemplate as keyof typeof templates];
    const spinner = ora('Creating project structure...').start();

    try {
      // Create project directory
      fs.ensureDirSync(projectPath);

      // Create package.json
      const packageJson = {
        name,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
          lint: 'eslint .',
          typecheck: options.typescript ? 'tsc --noEmit' : undefined,
        },
        dependencies: {},
        devDependencies: {
          vite: '^5.0.0',
          ...(options.typescript && {
            typescript: '^5.3.3',
            '@types/node': '^20.10.5',
          }),
        },
      };

      // Add template packages
      template.packages.forEach((pkg) => {
        packageJson.dependencies[pkg] = 'latest';
      });

      fs.writeJsonSync(
        path.join(projectPath, 'package.json'),
        packageJson,
        { spaces: 2 }
      );

      // Create directory structure
      const dirs = ['src', 'public', 'src/components', 'src/styles'];
      dirs.forEach((dir) => {
        fs.ensureDirSync(path.join(projectPath, dir));
      });

      // Create config files
      createViteConfig(projectPath, options);
      createTsConfig(projectPath, options);
      createGitignore(projectPath);
      createReadme(projectPath, name, selectedTemplate);
      createCin7Config(projectPath, template);

      // Create example files
      createExampleFiles(projectPath, template, options);

      spinner.succeed('Project structure created');

      // Initialize git
      if (options.git) {
        const gitSpinner = ora('Initializing git repository...').start();
        try {
          execSync('git init', { cwd: projectPath, stdio: 'ignore' });
          execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
          execSync('git commit -m "Initial commit"', {
            cwd: projectPath,
            stdio: 'ignore',
          });
          gitSpinner.succeed('Git repository initialized');
        } catch (error) {
          gitSpinner.warn('Git initialization failed');
        }
      }

      // Install dependencies
      if (options.install) {
        const installSpinner = ora('Installing dependencies...').start();
        try {
          const packageManager = detectPackageManager();
          execSync(`${packageManager} install`, {
            cwd: projectPath,
            stdio: 'inherit',
          });
          installSpinner.succeed('Dependencies installed');
        } catch (error) {
          installSpinner.warn('Failed to install dependencies');
          console.log(
            chalk.yellow('\nYou can install dependencies manually:')
          );
          console.log(chalk.gray(`  cd ${name}`));
          console.log(chalk.gray('  npm install'));
        }
      }

      // Success message
      console.log(chalk.green(`\n✨ Project ${name} created successfully!\n`));
      console.log('Next steps:');
      console.log(chalk.gray(`  cd ${name}`));
      if (!options.install) {
        console.log(chalk.gray('  npm install'));
      }
      console.log(chalk.gray('  npm run dev'));
      console.log(
        chalk.cyan('\nHappy coding with Cin7 DSL! 🎉')
      );
    } catch (error) {
      spinner.fail('Failed to create project');
      console.error(error);
      // Clean up on failure
      if (fs.existsSync(projectPath)) {
        fs.removeSync(projectPath);
      }
      process.exit(1);
    }
  });

function createViteConfig(projectPath: string, options: CreateOptions) {
  const config = `import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
  },
});
`;
  fs.writeFileSync(path.join(projectPath, 'vite.config.js'), config);
}

function createTsConfig(projectPath: string, options: CreateOptions) {
  if (!options.typescript) return;

  const config = {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      module: 'ESNext',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['src'],
    references: [{ path: './tsconfig.node.json' }],
  };

  const nodeConfig = {
    compilerOptions: {
      composite: true,
      skipLibCheck: true,
      module: 'ESNext',
      moduleResolution: 'bundler',
      allowSyntheticDefaultImports: true,
    },
    include: ['vite.config.js'],
  };

  fs.writeJsonSync(path.join(projectPath, 'tsconfig.json'), config, {
    spaces: 2,
  });
  fs.writeJsonSync(
    path.join(projectPath, 'tsconfig.node.json'),
    nodeConfig,
    { spaces: 2 }
  );
}

function createGitignore(projectPath: string) {
  const content = `# Dependencies
node_modules
.pnp
.pnp.js

# Build outputs
dist
build
.next
out

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Testing
coverage
.nyc_output

# Misc
*.pem
`;
  fs.writeFileSync(path.join(projectPath, '.gitignore'), content);
}

function createReadme(
  projectPath: string,
  name: string,
  template: string
) {
  const content = `# ${name}

A Cin7 DSL project built with the ${template} template.

## Getting Started

\`\`\`bash
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run linting
- \`npm run typecheck\` - Type check (TypeScript only)

## Project Structure

\`\`\`
${name}/
├── src/
│   ├── components/      # UI components
│   ├── styles/          # Global styles
│   └── index.html       # Entry HTML
├── public/              # Static assets
├── cin7.config.js       # Cin7 DSL configuration
└── package.json
\`\`\`

## Learn More

- [Cin7 DSL Documentation](https://cin7dsl.netlify.app)
- [Examples](https://cin7dsl.netlify.app/examples)
- [API Reference](https://cin7dsl.netlify.app/api)

## License

MIT
`;
  fs.writeFileSync(path.join(projectPath, 'README.md'), content);
}

function createCin7Config(
  projectPath: string,
  template: typeof templates[keyof typeof templates]
) {
  const config = `module.exports = {
  // Layers enabled in this project
  layers: ${JSON.stringify(
    template.packages.map((pkg) => pkg.replace('@cin7/', '')),
    null,
    2
  ).replace(/"/g, "'")},
  
  // Build configuration
  build: {
    target: 'production',
    analyze: false,
    sourceMaps: true,
  },
  
  // Performance thresholds
  performance: {
    bundleSize: 500, // KB
    initialLoad: 3000, // ms
    largeTableThreshold: 1000, // rows
  },
};
`;
  fs.writeFileSync(path.join(projectPath, 'cin7.config.js'), config);
}

function createExampleFiles(
  projectPath: string,
  template: typeof templates[keyof typeof templates],
  options: CreateOptions
) {
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cin7 DSL App</title>
    <link rel="stylesheet" href="/src/styles/main.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.${
      options.typescript ? 'ts' : 'js'
    }"></script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(projectPath, 'index.html'), indexHtml);

  // Create main entry file
  const mainContent = options.typescript
    ? `// Cin7 DSL Application Entry Point
import '@cin7/design-tokens/css';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = \`
      <div class="container">
        <h1>Welcome to Cin7 DSL</h1>
        <p>Your multi-layer architecture is ready!</p>
      </div>
    \`;
  }
});
`
    : `// Cin7 DSL Application Entry Point
import '@cin7/design-tokens/css';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = \`
      <div class="container">
        <h1>Welcome to Cin7 DSL</h1>
        <p>Your multi-layer architecture is ready!</p>
      </div>
    \`;
  }
});
`;

  fs.writeFileSync(
    path.join(
      projectPath,
      'src',
      `main.${options.typescript ? 'ts' : 'js'}`
    ),
    mainContent
  );

  // Create basic styles
  const styles = `/* Main styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: var(--p-color-bg);
  color: var(--p-color-text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: var(--p-color-text-emphasis);
}
`;
  fs.writeFileSync(path.join(projectPath, 'src/styles/main.css'), styles);
}

function detectPackageManager(): string {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      return 'npm';
    }
  }
}