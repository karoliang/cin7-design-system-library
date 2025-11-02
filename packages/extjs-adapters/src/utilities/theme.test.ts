import {describe, expect, it} from 'vitest';
import {generateThemeCSS} from './theme';

describe('generateThemeCSS', () => {
  it('emits dark theme selectors without nested blocks', () => {
    const css = generateThemeCSS();

    expect(css).toContain('[data-cin7-theme="dark"] .x-grid-header-ct');
    expect(css).toContain('[data-cin7-theme="dark"] .x-grid-row-alt .x-grid-cell');
    expect(css).not.toMatch(/\[data-cin7-theme="dark"]\s*{\s*\./);
  });
});
