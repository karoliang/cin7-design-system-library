import {beforeEach, describe, expect, it} from 'vitest';
import {IncludeResolver} from '../core/IncludeResolver';
import {ReactAdapter} from '../adapters/ReactAdapter';
import {IncludeStatement, IncludeError} from '../types/IncludeSystem';

function createStatement(overrides: Partial<IncludeStatement> = {}): IncludeStatement {
  return {
    language: 'react',
    component: 'Button',
    variation: 'default',
    ...overrides,
  };
}

describe('IncludeResolver', () => {
  let resolver: IncludeResolver;

  beforeEach(() => {
    resolver = new IncludeResolver();
    resolver.registerAdapter(new ReactAdapter());
  });

  it('resolves known react includes', () => {
    const statement = createStatement();
    const result = resolver.resolve(statement);

    expect(result.component.name).toBe('Button');
    expect(result.variation.name).toBe('default');
    expect(result.importStatement).toBe("import { Button } from '@shopify/polaris';");
  });

  it('throws when adapter is missing for a language', () => {
    const statement = createStatement();
    const freshResolver = new IncludeResolver();
    const act = () => freshResolver.resolve(statement);

    expect(act).toThrow(IncludeError);
    expect(act).toThrow(/No adapter registered/);
  });
});
