/**
 * Use Case pattern for encapsulating business logic
 * Each use case represents a single business operation
 */

/**
 * Base use case interface
 */
export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

/**
 * Use case with validation
 */
export interface IValidatedUseCase<TInput, TOutput> extends IUseCase<TInput, TOutput> {
  validate(input: TInput): Promise<void>;
}

/**
 * Abstract base use case
 */
export abstract class BaseUseCase<TInput, TOutput> implements IUseCase<TInput, TOutput> {
  abstract execute(input: TInput): Promise<TOutput>;

  /**
   * Log execution for debugging
   */
  protected log(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${this.constructor.name}] ${message}`, data);
    }
  }

  /**
   * Measure execution time
   */
  async executeWithTiming(input: TInput): Promise<{ result: TOutput; duration: number }> {
    const start = performance.now();
    const result = await this.execute(input);
    const duration = performance.now() - start;
    
    this.log(`Execution completed in ${duration.toFixed(2)}ms`);
    return { result, duration };
  }
}

/**
 * Base use case with validation
 */
export abstract class ValidatedUseCase<TInput, TOutput> 
  extends BaseUseCase<TInput, TOutput>
  implements IValidatedUseCase<TInput, TOutput> {
  
  abstract validate(input: TInput): Promise<void>;

  async execute(input: TInput): Promise<TOutput> {
    await this.validate(input);
    return this.performOperation(input);
  }

  protected abstract performOperation(input: TInput): Promise<TOutput>;
}

/**
 * Use case executor with middleware support
 */
export class UseCaseExecutor {
  private middlewares: Array<(input: any, next: () => Promise<any>) => Promise<any>> = [];

  use(middleware: (input: any, next: () => Promise<any>) => Promise<any>): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute<TInput, TOutput>(
    useCase: IUseCase<TInput, TOutput>,
    input: TInput
  ): Promise<TOutput> {
    const stack = [...this.middlewares];
    
    const executeNext = async (index: number, currentInput: TInput): Promise<TOutput> => {
      if (index >= stack.length) {
        return useCase.execute(currentInput);
      }
      
      const middleware = stack[index];
      return middleware(currentInput, () => executeNext(index + 1, currentInput));
    };
    
    return executeNext(0, input);
  }
}

/**
 * Common use case errors
 */
export class UseCaseError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'UseCaseError';
  }
}

export class ValidationError extends UseCaseError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends UseCaseError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND', { resource, id });
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends UseCaseError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ConflictError extends UseCaseError {
  constructor(message: string, details?: any) {
    super(message, 'CONFLICT', details);
    this.name = 'ConflictError';
  }
}