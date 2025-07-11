/**
 * Generate CSS custom properties from design tokens
 */

import { enterpriseTokens } from '../tokens/enterprise';
import { animationTokens } from '../tokens/animation';
import { spacingTokens } from '../tokens/spacing';
import { typographyTokens } from '../tokens/typography';

type TokenValue = string | number | Record<string, any>;

/**
 * Convert nested object to CSS custom properties
 */
export function tokensToCSSProperties(
  tokens: Record<string, TokenValue>,
  prefix = 'cin7'
): string {
  const properties: string[] = [];

  function processTokens(obj: Record<string, TokenValue>, path: string[] = []) {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = [...path, key];
      const propertyName = `--${prefix}-${currentPath.join('-')}`;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processTokens(value as Record<string, TokenValue>, currentPath);
      } else {
        const propertyValue = Array.isArray(value) ? value.join(', ') : String(value);
        properties.push(`${propertyName}: ${propertyValue};`);
      }
    });
  }

  processTokens(tokens);
  return properties.join('\n  ');
}

/**
 * Generate complete CSS with all tokens
 */
export function generateTokenCSS(): string {
  const allTokens = {
    enterprise: enterpriseTokens,
    animation: animationTokens,
    spacing: spacingTokens,
    typography: typographyTokens,
  };

  const cssProperties = tokensToCSSProperties(allTokens);

  return `
/**
 * Cin7 DSL Design Tokens
 * Auto-generated CSS custom properties
 */

:root {
  /* Cin7 DSL Enterprise Tokens */
  ${cssProperties}
}

/* Dark mode overrides */
[data-theme="dark"] {
  /* Override specific tokens for dark mode */
  --cin7-enterprise-dataGrid-header-background: var(--p-color-bg-surface-secondary-experimental);
  --cin7-enterprise-dataGrid-row-hoverBackground: var(--p-color-bg-surface-hover);
  --cin7-enterprise-form-field-labelColor: var(--p-color-text);
  --cin7-enterprise-charts-grid-color: var(--p-color-border-subdued);
}

/* Animation classes */
${generateAnimationClasses()}

/* Typography classes */
${generateTypographyClasses()}

/* Spacing utilities */
${generateSpacingUtilities()}
`.trim();
}

/**
 * Generate animation utility classes
 */
function generateAnimationClasses(): string {
  const classes: string[] = [];

  // Duration classes
  Object.entries(animationTokens.duration).forEach(([name, value]) => {
    classes.push(`.cin7-duration-${name} { animation-duration: ${value}; }`);
  });

  // Easing classes
  Object.entries(animationTokens.easing).forEach(([name, value]) => {
    classes.push(`.cin7-easing-${name} { animation-timing-function: ${value}; }`);
  });

  // Keyframe definitions
  Object.entries(animationTokens.keyframes).forEach(([name, keyframes]) => {
    const keyframeRules = Object.entries(keyframes)
      .map(([key, props]) => {
        const properties = Object.entries(props as Record<string, string>)
          .map(([prop, value]) => `${prop}: ${value};`)
          .join(' ');
        return `${key} { ${properties} }`;
      })
      .join(' ');
    
    classes.push(`@keyframes cin7-${name} { ${keyframeRules} }`);
    classes.push(`.cin7-animate-${name} { animation: cin7-${name} var(--cin7-animation-duration-base) var(--cin7-animation-easing-standard); }`);
  });

  return classes.join('\n');
}

/**
 * Generate typography utility classes
 */
function generateTypographyClasses(): string {
  const classes: string[] = [];

  // Text style classes
  Object.entries(typographyTokens.textStyles).forEach(([name, styles]) => {
    const properties = Object.entries(styles)
      .map(([prop, value]) => {
        const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssProp}: ${value};`;
      })
      .join(' ');
    
    classes.push(`.cin7-text-${name} { ${properties} }`);
  });

  return classes.join('\n');
}

/**
 * Generate spacing utility classes
 */
function generateSpacingUtilities(): string {
  const classes: string[] = [];
  const properties = ['margin', 'padding'];
  const sides = ['top', 'right', 'bottom', 'left'];

  Object.entries(spacingTokens.scale).forEach(([scale, value]) => {
    // All sides
    properties.forEach(prop => {
      const prefix = prop === 'margin' ? 'm' : 'p';
      classes.push(`.cin7-${prefix}-${scale} { ${prop}: ${value}; }`);
    });

    // Individual sides
    properties.forEach(prop => {
      const prefix = prop === 'margin' ? 'm' : 'p';
      sides.forEach((side, index) => {
        const sidePrefix = side[0];
        classes.push(`.cin7-${prefix}${sidePrefix}-${scale} { ${prop}-${side}: ${value}; }`);
      });
    });

    // Axis utilities
    properties.forEach(prop => {
      const prefix = prop === 'margin' ? 'm' : 'p';
      classes.push(`.cin7-${prefix}x-${scale} { ${prop}-left: ${value}; ${prop}-right: ${value}; }`);
      classes.push(`.cin7-${prefix}y-${scale} { ${prop}-top: ${value}; ${prop}-bottom: ${value}; }`);
    });
  });

  return classes.join('\n');
}