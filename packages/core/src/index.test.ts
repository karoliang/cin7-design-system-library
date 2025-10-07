import { describe, expect, it } from 'vitest';
import * as Core from './index';

describe('@cin7/core exports', () => {
  it('exposes package metadata', () => {
    expect(Core.name).toBe('@cin7/core');
    expect(Core.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('re-exports utility helpers', () => {
    expect(typeof Core.cn).toBe('function');
    expect(typeof Core.DOMUtils).toBe('function');
  });
});
