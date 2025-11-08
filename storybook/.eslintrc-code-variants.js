// ESLint Configuration for Code Variants
// Prevents template literal escaping issues in codeVariants.ts

module.exports = {
  rules: {
    // Custom rule to detect unescaped template literals in JSX attributes within code variant strings
    'no-unescaped-jsx-templates': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Prevent unescaped template literals in JSX attributes within code variant strings',
          category: 'Possible Errors',
          recommended: true
        },
        fixable: 'code',
        schema: []
      },
      create(context) {
        return {
          TemplateElement(node) {
            const value = node.value.raw;

            // Check if we're in a code variant object (react/typescript/vanilla/extjs properties)
            const parent = context.getAncestors().find(ancestor =>
              ancestor.type === 'Property' &&
              ancestor.key &&
              ['react', 'typescript', 'vanilla', 'extjs'].includes(ancestor.key.name)
            );

            if (!parent) return;

            // Pattern 1: JSX attributes with template literals using single backslash
            // e.g., {\`\${variable}\`} should be {\`\\\${variable}\`}
            const jsxAttrPattern = /\{\`[^`]*\\\$\{[^}]+\}[^`]*\`\}/g;
            const matches = value.match(jsxAttrPattern);

            if (matches) {
              matches.forEach(match => {
                // Count backslashes before ${
                const backslashCount = (match.match(/\\+(?=\$\{)/g) || []).reduce((sum, bs) => sum + bs.length, 0);

                // In JSX attributes within code examples, we need 3 backslashes (triple-escaped)
                // because the outer template literal consumes 1 level of escaping
                if (backslashCount === 1) {
                  context.report({
                    node,
                    message: 'JSX attribute template literal needs triple-backslash escaping: {\`\\\\\\${var}\`}',
                    fix(fixer) {
                      // Auto-fix: replace \${ with \\\${
                      const fixed = value.replace(/\\\$\{/g, '\\\\\\$\{');
                      return fixer.replaceText(node, `\`${fixed}\``);
                    }
                  });
                }
              });
            }

            // Pattern 2: Nested template literals in .map() calls
            // e.g., .map(x => \`...\${x}...\`) inside outer template
            const nestedMapPattern = /\.map\([^=]+=>\s*\`[^`]*\\\$\{[^}]+\}[^`]*\`\)/g;
            const nestedMatches = value.match(nestedMapPattern);

            if (nestedMatches) {
              nestedMatches.forEach(match => {
                const backslashCount = (match.match(/\\+(?=\$\{)/g) || []).reduce((sum, bs) => sum + bs.length, 0);

                // In nested .map() templates, we need 2 backslashes (double-escaped)
                if (backslashCount === 1) {
                  context.report({
                    node,
                    message: 'Nested template literal in .map() needs double-backslash escaping: \\\\${var}',
                    fix(fixer) {
                      // Auto-fix: replace \${ with \\${
                      const fixed = value.replace(/\.map\(([^=]+)=>\s*`([^`]*)\\\$\{/g, (match, param, prefix) => {
                        return `.map(${param}=>\`${prefix}\\\\$\{`;
                      });
                      return fixer.replaceText(node, `\`${fixed}\``);
                    }
                  });
                }
              });
            }
          }
        };
      }
    }
  },
  overrides: [
    {
      files: ['**blocks/codeVariants.ts'],
      rules: {
        'no-unescaped-jsx-templates': 'error'
      }
    }
  ]
};
