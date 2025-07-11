/**
 * Generate command - scaffold components and patterns for Cin7 DSL
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import Handlebars from 'handlebars';

interface GenerateOptions {
  layer?: string;
  typescript?: boolean;
  test?: boolean;
  style?: boolean;
}

const generators = {
  component: {
    layers: ['react', 'extjs', 'vanilla'],
    templates: {
      react: 'react-component',
      extjs: 'extjs-component',
      vanilla: 'vanilla-component',
    },
  },
  repository: {
    layers: ['typescript-sdk'],
    templates: {
      'typescript-sdk': 'repository',
    },
  },
  usecase: {
    layers: ['typescript-sdk'],
    templates: {
      'typescript-sdk': 'usecase',
    },
  },
  migration: {
    layers: ['vanilla'],
    templates: {
      vanilla: 'migration-wrapper',
    },
  },
};

export const generateCommand = new Command('generate')
  .alias('g')
  .description('Generate components, repositories, and other patterns')
  .argument('<type>', 'Type to generate (component, repository, usecase)')
  .argument('<name>', 'Name of the generated item')
  .option('-l, --layer <layer>', 'Target layer')
  .option('--typescript', 'Use TypeScript', true)
  .option('--no-typescript', 'Use JavaScript')
  .option('--test', 'Generate test file', true)
  .option('--no-test', 'Skip test file')
  .option('--style', 'Generate style file', true)
  .option('--no-style', 'Skip style file')
  .action(async (type: string, name: string, options: GenerateOptions) => {
    console.log(chalk.cyan(`\n🔨 Generating ${type}: ${name}\n`));

    // Validate type
    if (!generators[type as keyof typeof generators]) {
      console.error(chalk.red(`✖ Unknown type: ${type}`));
      console.log(chalk.yellow('\nAvailable types:'));
      Object.keys(generators).forEach((t) => {
        console.log(chalk.gray(`  - ${t}`));
      });
      process.exit(1);
    }

    const generator = generators[type as keyof typeof generators];

    // Determine layer
    let layer = options.layer;
    if (!layer) {
      if (generator.layers.length === 1) {
        layer = generator.layers[0];
      } else {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'layer',
            message: 'Select target layer:',
            choices: generator.layers,
          },
        ]);
        layer = answer.layer;
      }
    }

    // Validate layer
    if (!generator.layers.includes(layer)) {
      console.error(
        chalk.red(`✖ Invalid layer "${layer}" for ${type}`)
      );
      console.log(
        chalk.yellow(`Available layers: ${generator.layers.join(', ')}`)
      );
      process.exit(1);
    }

    const spinner = ora(`Generating ${type}...`).start();

    try {
      // Generate files
      const files = await generateFiles(type, name, layer, options);
      
      // Write files
      for (const file of files) {
        await fs.ensureDir(path.dirname(file.path));
        await fs.writeFile(file.path, file.content);
      }

      spinner.succeed(`Generated ${type}: ${name}`);

      // Display created files
      console.log(chalk.green('\n✓ Created files:'));
      files.forEach((file) => {
        console.log(chalk.gray(`  ${file.path}`));
      });

      // Show usage instructions
      showUsageInstructions(type, name, layer, files);

    } catch (error) {
      spinner.fail(`Failed to generate ${type}`);
      console.error(error);
      process.exit(1);
    }
  });

async function generateFiles(
  type: string,
  name: string,
  layer: string,
  options: GenerateOptions
): Promise<Array<{ path: string; content: string }>> {
  const files: Array<{ path: string; content: string }> = [];
  const ext = options.typescript ? 'ts' : 'js';
  const jsxExt = options.typescript ? 'tsx' : 'jsx';

  switch (type) {
    case 'component':
      if (layer === 'react') {
        // React component
        files.push({
          path: `src/components/${name}/${name}.${jsxExt}`,
          content: generateReactComponent(name, options),
        });

        if (options.style) {
          files.push({
            path: `src/components/${name}/${name}.module.css`,
            content: generateComponentStyles(name),
          });
        }

        if (options.test) {
          files.push({
            path: `src/components/${name}/${name}.test.${jsxExt}`,
            content: generateReactComponentTest(name, options),
          });
        }

        // Index file
        files.push({
          path: `src/components/${name}/index.${ext}`,
          content: `export { default } from './${name}';\n`,
        });
      } else if (layer === 'extjs') {
        // ExtJS component
        files.push({
          path: `src/components/${name}/${name}.${ext}`,
          content: generateExtJSComponent(name, options),
        });
      } else if (layer === 'vanilla') {
        // Vanilla JS component
        files.push({
          path: `src/components/${name}/${name}.${ext}`,
          content: generateVanillaComponent(name, options),
        });

        if (options.style) {
          files.push({
            path: `src/components/${name}/${name}.css`,
            content: generateComponentStyles(name),
          });
        }
      }
      break;

    case 'repository':
      files.push({
        path: `src/repositories/${name}Repository.${ext}`,
        content: generateRepository(name, options),
      });

      if (options.test) {
        files.push({
          path: `src/repositories/${name}Repository.test.${ext}`,
          content: generateRepositoryTest(name, options),
        });
      }
      break;

    case 'usecase':
      files.push({
        path: `src/usecases/${name}UseCase.${ext}`,
        content: generateUseCase(name, options),
      });

      if (options.test) {
        files.push({
          path: `src/usecases/${name}UseCase.test.${ext}`,
          content: generateUseCaseTest(name, options),
        });
      }
      break;
  }

  return files;
}

function generateReactComponent(name: string, options: GenerateOptions): string {
  const template = options.typescript ? `
import React from 'react';
import { Card, Text, Button } from '@cin7/polaris-adapter';
import styles from './${name}.module.css';

interface ${name}Props {
  title?: string;
  onAction?: () => void;
}

export default function ${name}({ title = '${name}', onAction }: ${name}Props) {
  return (
    <Card>
      <div className={styles.container}>
        <Text as="h2" variant="headingMd">
          {title}
        </Text>
        <Text as="p" variant="bodyMd">
          This is the ${name} component.
        </Text>
        {onAction && (
          <Button onClick={onAction} primary>
            Take Action
          </Button>
        )}
      </div>
    </Card>
  );
}
` : `
import React from 'react';
import { Card, Text, Button } from '@cin7/polaris-adapter';
import styles from './${name}.module.css';

export default function ${name}({ title = '${name}', onAction }) {
  return (
    <Card>
      <div className={styles.container}>
        <Text as="h2" variant="headingMd">
          {title}
        </Text>
        <Text as="p" variant="bodyMd">
          This is the ${name} component.
        </Text>
        {onAction && (
          <Button onClick={onAction} primary>
            Take Action
          </Button>
        )}
      </div>
    </Card>
  );
}
`;
  return template.trim();
}

function generateExtJSComponent(name: string, options: GenerateOptions): string {
  const template = `
import { createEnterpriseComponent } from '@cin7/extjs-adapters';

${options.typescript ? `interface ${name}Config {
  title?: string;
  items?: any[];
}` : ''}

export const ${name} = createEnterpriseComponent({
  xtype: '${name.toLowerCase()}',
  extend: 'Ext.panel.Panel',
  
  config: {
    title: '${name}',
    layout: 'fit',
    items: []
  },
  
  initComponent: function() {
    this.callParent(arguments);
    
    // Component initialization
    this.on('afterrender', this.onAfterRender, this);
  },
  
  onAfterRender: function() {
    // Component logic after rendering
    console.log('${name} rendered');
  }
});

export default ${name};
`;
  return template.trim();
}

function generateVanillaComponent(name: string, options: GenerateOptions): string {
  const template = `
import { $, on, createElement } from '@cin7/vanilla-js';
${options.style ? `import './${name}.css';` : ''}

${options.typescript ? `interface ${name}Options {
  container: HTMLElement | string;
  title?: string;
  onAction?: () => void;
}` : ''}

export function create${name}(options${options.typescript ? `: ${name}Options` : ''}) {
  const container = typeof options.container === 'string' 
    ? $(options.container) 
    : options.container;
    
  if (!container) {
    throw new Error('Container element not found');
  }
  
  const element = createElement('div', {
    className: '${name.toLowerCase()}',
    innerHTML: \`
      <div class="${name.toLowerCase()}__header">
        <h2>\${options.title || '${name}'}</h2>
      </div>
      <div class="${name.toLowerCase()}__content">
        <p>This is the ${name} component.</p>
        \${options.onAction ? '<button class="${name.toLowerCase()}__button">Take Action</button>' : ''}
      </div>
    \`
  });
  
  container.appendChild(element);
  
  // Event handlers
  if (options.onAction) {
    const button = element.querySelector('.${name.toLowerCase()}__button');
    if (button) {
      on(button, 'click', options.onAction);
    }
  }
  
  return {
    element,
    destroy: () => {
      element.remove();
    },
    update: (newOptions${options.typescript ? `: Partial<${name}Options>` : ''}) => {
      // Update logic
    }
  };
}

export default create${name};
`;
  return template.trim();
}

function generateComponentStyles(name: string): string {
  return `.container {
  padding: var(--p-spacing-400);
}

.${name.toLowerCase()} {
  background: var(--p-color-bg);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  padding: var(--p-spacing-400);
}

.${name.toLowerCase()}__header {
  margin-bottom: var(--p-spacing-300);
}

.${name.toLowerCase()}__content {
  color: var(--p-color-text);
}

.${name.toLowerCase()}__button {
  background: var(--p-color-bg-fill-brand);
  color: var(--p-color-text-on-color);
  border: none;
  border-radius: var(--p-border-radius-100);
  padding: var(--p-spacing-200) var(--p-spacing-400);
  cursor: pointer;
  font-weight: var(--p-font-weight-medium);
}

.${name.toLowerCase()}__button:hover {
  background: var(--p-color-bg-fill-brand-hover);
}
`;
}

function generateRepository(name: string, options: GenerateOptions): string {
  const template = `
import { BaseRepository, QueryParams, PaginatedResponse } from '@cin7/typescript-sdk';
${options.typescript ? `
export interface ${name} {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Create${name}DTO {
  name: string;
}

export interface Update${name}DTO {
  name?: string;
}` : ''}

export class ${name}Repository extends BaseRepository${options.typescript ? `<${name}, Create${name}DTO, Update${name}DTO>` : ''} {
  constructor() {
    super('/${name.toLowerCase()}s');
  }
  
  async findAll(params${options.typescript ? '?: QueryParams' : ''})${options.typescript ? `: Promise<PaginatedResponse<${name}>>` : ''} {
    // Implement API call
    const response = await this.api.get(this.endpoint, { params });
    return response.data;
  }
  
  async findById(id${options.typescript ? ': string' : ''})${options.typescript ? `: Promise<${name}>` : ''} {
    const response = await this.api.get(\`\${this.endpoint}/\${id}\`);
    return response.data;
  }
  
  async create(data${options.typescript ? `: Create${name}DTO` : ''})${options.typescript ? `: Promise<${name}>` : ''} {
    const response = await this.api.post(this.endpoint, data);
    return response.data;
  }
  
  async update(id${options.typescript ? ': string' : ''}, data${options.typescript ? `: Update${name}DTO` : ''})${options.typescript ? `: Promise<${name}>` : ''} {
    const response = await this.api.patch(\`\${this.endpoint}/\${id}\`, data);
    return response.data;
  }
  
  async delete(id${options.typescript ? ': string' : ''})${options.typescript ? ': Promise<void>' : ''} {
    await this.api.delete(\`\${this.endpoint}/\${id}\`);
  }
}

export default ${name}Repository;
`;
  return template.trim();
}

function generateUseCase(name: string, options: GenerateOptions): string {
  const template = `
import { UseCase } from '@cin7/typescript-sdk';
${options.typescript ? `
export interface ${name}Request {
  // Define request parameters
}

export interface ${name}Response {
  success: boolean;
  message?: string;
  data?: any;
}` : ''}

export class ${name}UseCase implements UseCase${options.typescript ? `<${name}Request, ${name}Response>` : ''} {
  constructor(
    // Inject dependencies (repositories, services, etc.)
  ) {}
  
  async execute(request${options.typescript ? `: ${name}Request` : ''})${options.typescript ? `: Promise<${name}Response>` : ''} {
    try {
      // Validate request
      this.validate(request);
      
      // Business logic implementation
      
      return {
        success: true,
        message: '${name} executed successfully',
        data: null
      };
    } catch (error) {
      return {
        success: false,
        message: error${options.typescript ? ' instanceof Error ? error.message : String(error)' : '.message || String(error)'},
        data: null
      };
    }
  }
  
  private validate(request${options.typescript ? `: ${name}Request` : ''})${options.typescript ? ': void' : ''} {
    // Implement validation logic
    if (!request) {
      throw new Error('Request is required');
    }
  }
}

export default ${name}UseCase;
`;
  return template.trim();
}

function generateReactComponentTest(name: string, options: GenerateOptions): string {
  return `
import { render, screen, fireEvent } from '@testing-library/react';
import ${name} from './${name}';

describe('${name}', () => {
  it('renders with default title', () => {
    render(<${name} />);
    expect(screen.getByText('${name}')).toBeInTheDocument();
  });
  
  it('renders with custom title', () => {
    render(<${name} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
  
  it('calls onAction when button is clicked', () => {
    const handleAction = jest.fn();
    render(<${name} onAction={handleAction} />);
    
    fireEvent.click(screen.getByText('Take Action'));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
  
  it('does not render button when onAction is not provided', () => {
    render(<${name} />);
    expect(screen.queryByText('Take Action')).not.toBeInTheDocument();
  });
});
`;
}

function generateRepositoryTest(name: string, options: GenerateOptions): string {
  return `
import ${name}Repository from './${name}Repository';

describe('${name}Repository', () => {
  let repository${options.typescript ? `: ${name}Repository` : ''};
  
  beforeEach(() => {
    repository = new ${name}Repository();
  });
  
  describe('findAll', () => {
    it('returns paginated results', async () => {
      const result = await repository.findAll({ page: 1, limit: 10 });
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
    });
  });
  
  describe('create', () => {
    it('creates a new ${name.toLowerCase()}', async () => {
      const data = { name: 'Test ${name}' };
      const result = await repository.create(data);
      
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(data.name);
    });
  });
});
`;
}

function generateUseCaseTest(name: string, options: GenerateOptions): string {
  return `
import ${name}UseCase from './${name}UseCase';

describe('${name}UseCase', () => {
  let useCase${options.typescript ? `: ${name}UseCase` : ''};
  
  beforeEach(() => {
    useCase = new ${name}UseCase();
  });
  
  describe('execute', () => {
    it('executes successfully with valid request', async () => {
      const request = {
        // Add test data
      };
      
      const response = await useCase.execute(request);
      
      expect(response.success).toBe(true);
      expect(response.message).toBe('${name} executed successfully');
    });
    
    it('fails with invalid request', async () => {
      const response = await useCase.execute(null${options.typescript ? ' as any' : ''});
      
      expect(response.success).toBe(false);
      expect(response.message).toBe('Request is required');
    });
  });
});
`;
}

function showUsageInstructions(
  type: string,
  name: string,
  layer: string,
  files: Array<{ path: string; content: string }>
) {
  console.log(chalk.cyan('\n📚 Usage:'));

  switch (type) {
    case 'component':
      if (layer === 'react') {
        console.log(chalk.gray(`
// Import and use your component:
import ${name} from './components/${name}';

function App() {
  return <${name} title="My Component" onAction={() => console.log('Action!')} />;
}
`));
      } else if (layer === 'vanilla') {
        console.log(chalk.gray(`
// Import and use your component:
import create${name} from './components/${name}/${name}';

const component = create${name}({
  container: '#app',
  title: 'My Component',
  onAction: () => console.log('Action!')
});
`));
      } else if (layer === 'extjs') {
        console.log(chalk.gray(`
// Register and use your component:
import './components/${name}/${name}';

Ext.create('${name}', {
  renderTo: 'app',
  title: 'My Component'
});
`));
      }
      break;

    case 'repository':
      console.log(chalk.gray(`
// Import and use your repository:
import ${name}Repository from './repositories/${name}Repository';

const repository = new ${name}Repository();
const items = await repository.findAll({ page: 1, limit: 10 });
`));
      break;

    case 'usecase':
      console.log(chalk.gray(`
// Import and use your use case:
import ${name}UseCase from './usecases/${name}UseCase';

const useCase = new ${name}UseCase();
const result = await useCase.execute({ /* request data */ });
`));
      break;
  }
}