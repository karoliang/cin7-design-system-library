/**
 * TypeScript Adapter - Handles TypeScript business logic pattern generation
 */

import {
  LanguageAdapter,
  ResolvedInclude,
  SupportedLanguage,
  ComponentVariation
} from '../types/IncludeSystem';

export class TypeScriptAdapter implements LanguageAdapter {
  language: SupportedLanguage = 'typescript';

  generateImport(resolved: ResolvedInclude): string {
    const { component, variation } = resolved;

    // TypeScript patterns use named imports
    return `import { ${component.name} } from '${variation.importPath}';`;
  }

  generateCode(resolved: ResolvedInclude): string {
    const { component, variation, statement } = resolved;
    const instanceName = this.toCamelCase(component.name);

    // Generate TypeScript pattern usage based on variation
    switch (component.name) {
      case 'Repository':
        return this.generateRepositoryCode(instanceName, statement.variation);
      case 'UseCase':
        return this.generateUseCaseCode(instanceName, statement.variation);
      case 'EventBus':
        return this.generateEventBusCode(instanceName, statement.variation);
      default:
        return this.generateDefaultPatternCode(component.name, instanceName, statement.variation);
    }
  }

  validateVariation(variation: ComponentVariation): boolean {
    // TypeScript patterns should enforce type safety
    return true;
  }

  getDependencies(variation: ComponentVariation): string[] {
    // TypeScript patterns often depend on other patterns
    return variation.dependencies || [];
  }

  private generateRepositoryCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'Repository');
    const entityName = config.entityName || 'Entity';
    const interfaceName = config.interfaceName || `${entityName}Entity`;

    return `// Entity interface
interface ${interfaceName} {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ${config.additionalFields || ''}
}

// Repository implementation
class ${instanceName} extends Repository<${interfaceName}> {
  constructor(private apiClient: ApiClient) {
    super();
  }

  async findAll(params?: QueryParams): Promise<PaginatedResponse<${interfaceName}>> {
    const response = await this.apiClient.get('/${entityName.toLowerCase()}s', params);
    return this.mapResponse(response);
  }

  async findById(id: string): Promise<${interfaceName}> {
    const response = await this.apiClient.get(\`/${entityName.toLowerCase()}s/\${id}\`);
    return response.data;
  }

  async create(data: CreateDTO<${interfaceName}>): Promise<${interfaceName}> {
    const response = await this.apiClient.post('/${entityName.toLowerCase()}s', data);
    return response.data;
  }

  async update(id: string, data: UpdateDTO<${interfaceName}>): Promise<${interfaceName}> {
    const response = await this.apiClient.put(\`/${entityName.toLowerCase()}s/\${id}\`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(\`/${entityName.toLowerCase()}s/\${id}\`);
  }
}

// Usage
const ${instanceName}Instance = new ${instanceName}(apiClient);`;
  }

  private generateUseCaseCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'UseCase');
    const useCaseName = config.name || 'UseCase';
    const entityName = config.entityName || 'Entity';

    return `// Use case interface
interface ${useCaseName}Request {
  ${config.requestFields || 'data: any'}
}

interface ${useCaseName}Response {
  ${config.responseFields || 'success: boolean; data?: any'}
}

// Use case implementation
class ${instanceName} extends UseCase<${useCaseName}Request, ${useCaseName}Response> {
  constructor(
    private ${config.repositoryName || 'repository'}: Repository<${entityName}>,
    private eventBus: EventBus
  ) {
    super();
  }

  async execute(request: ${useCaseName}Request): Promise<${useCaseName}Response> {
    try {
      // Validation
      this.validateRequest(request);

      // Business logic
      const result = await this.processRequest(request);

      // Event emission
      this.eventBus.emit('${useCaseName.toLowerCase()}.completed', result);

      return {
        success: true,
        data: result
      };
    } catch (error) {
      this.eventBus.emit('${useCaseName.toLowerCase()}.failed', error);
      throw error;
    }
  }

  private validateRequest(request: ${useCaseName}Request): void {
    // Add validation logic
    if (!request.data) {
      throw new Error('Data is required');
    }
  }

  private async processRequest(request: ${useCaseName}Request): Promise<any> {
    // Add business logic
    return request.data;
  }
}

// Usage
const ${instanceName}Instance = new ${instanceName}(${config.repositoryName || 'repository'}, eventBus);`;
  }

  private generateEventBusCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'EventBus');

    if (variation === 'typed') {
      return `// Typed event definitions
interface AppEvents {
  'user.created': { id: string; name: string; email: string };
  'user.updated': { id: string; changes: Partial<User> };
  'user.deleted': { id: string };
  ${config.additionalEvents || ''}
}

// Typed event bus implementation
class ${instanceName} extends TypedEventBus<AppEvents> {
  constructor() {
    super();
  }

  // Type-safe event emission
  emit<K extends keyof AppEvents>(event: K, data: AppEvents[K]): void {
    super.emit(event, data);
  }

  // Type-safe event listening
  on<K extends keyof AppEvents>(
    event: K,
    listener: (data: AppEvents[K]) => void
  ): () => void {
    return super.on(event, listener);
  }
}

// Usage
const ${instanceName}Instance = new ${instanceName}();

// Type-safe usage
${instanceName}Instance.on('user.created', (user) => {
  console.log(\`User created: \${user.name}\`);
});

${instanceName}Instance.emit('user.created', {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com'
});`;
    } else {
      return `// Standard event bus implementation
class ${instanceName} extends EventBus {
  constructor() {
    super();
  }

  // Custom event methods
  emitUserCreated(user: { id: string; name: string; email: string }): void {
    this.emit('user.created', user);
  }

  onUserCreated(callback: (user: any) => void): () => void {
    return this.on('user.created', callback);
  }
}

// Usage
const ${instanceName}Instance = new ${instanceName}();

${instanceName}Instance.onUserCreated((user) => {
  console.log(\`User created: \${user.name}\`);
});

${instanceName}Instance.emitUserCreated({
  id: '123',
  name: 'John Doe',
  email: 'john@example.com'
});`;
    }
  }

  private generateDefaultPatternCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, componentName);

    return `// ${componentName} implementation
class ${instanceName} extends ${componentName} {
  constructor(${config.constructorParams || ''}) {
    super();
  }

  // Custom implementation
  ${config.customMethods || ''}
}

// Usage
const ${instanceName}Instance = new ${instanceName}(${config.usageParams || ''});`;
  }

  private getVariationConfig(variation: string, component: string): Record<string, any> {
    if (component === 'Repository') {
      if (variation === 'standard') {
        return {
          entityName: 'Product',
          interfaceName: 'ProductEntity',
          additionalFields: 'name: string;\n  price: number;\n  category: string;'
        };
      }

      return {
        entityName: 'Entity',
        interfaceName: 'EntityEntity',
        additionalFields: 'name: string;\n  status: string;'
      };
    }

    if (component === 'UseCase') {
      if (variation === 'crud') {
        return {
          name: 'CrudUseCase',
          entityName: 'Product',
          requestFields: 'action: "create" | "update" | "delete"; data?: any',
          responseFields: 'success: boolean; data?: any; message?: string',
          repositoryName: 'productRepository'
        };
      }

      return {
        name: 'UseCase',
        entityName: 'Entity',
        requestFields: 'data: any',
        responseFields: 'success: boolean; data?: any',
        repositoryName: 'repository'
      };
    }

    if (component === 'EventBus') {
      if (variation === 'typed') {
        return {
          additionalEvents: "'order.created': { id: string; total: number };\n'order.updated': { id: string; changes: Partial<Order> };"
        };
      }

      return {
        constructorParams: '',
        customMethods: 'emitCustomEvent(data: any): void {\n    this.emit("custom", data);\n  }',
        usageParams: '',
        additionalEvents: "'custom.event': { data: any };"
      };
    }

    return {};
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
