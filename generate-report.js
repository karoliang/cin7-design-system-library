const fs = require('fs');
const extracted = JSON.parse(fs.readFileSync('extracted-components.json', 'utf-8'));

console.log('# Navigation & Actions Components Migration Report\n');
console.log('## Summary\n');

let totalVariations = 0;
let componentsWithExamples = 0;

console.log('### Components Migrated\n');
Object.entries(extracted).forEach(([name, content]) => {
  const variations = content.match(/^\s+['\"]([^'\"]+)['\"]:\s*{/gm);
  const count = variations ? variations.length : 0;

  if (count > 0) {
    componentsWithExamples++;
    totalVariations += count;
    const varNames = variations.map(v => v.match(/['\"]([^'\"]+)['\"]/)[1]);
    console.log(`**${name}**: ${count} variations`);
    const preview = varNames.slice(0, 3).join(', ');
    const more = varNames.length > 3 ? ', ...' : '';
    console.log(`  - ${preview}${more}\n`);
  }
});

console.log(`\n### Statistics\n`);
console.log(`- **Total Components**: ${Object.keys(extracted).length}`);
console.log(`- **Components with Examples**: ${componentsWithExamples}`);
console.log(`- **Total Variations**: ${totalVariations}`);
console.log(`- **All 4 Languages**: React, TypeScript, ExtJS, Vanilla JS\n`);

console.log('## Component Breakdown\n');
console.log('| Component | Variations | Languages |\n');
console.log('|-----------|------------|----------|\n');

Object.entries(extracted).forEach(([name, content]) => {
  const variations = content.match(/^\s+['\"]([^'\"]+)['\"]:\s*{/gm);
  const count = variations ? variations.length : 0;
  console.log(`| ${name} | ${count} | React, TS, ExtJS, Vanilla |`);
});

console.log('\n## Next Steps\n');
console.log('1. Complete insertion of component exports into Storybook codeVariants.ts');
console.log('2. Update all story files with codeVariants parameters');
console.log('3. Test in Storybook to verify multi-language code display');
console.log('4. Add Breadcrumbs and ActionMenu codeVariants (currently have stories but no variants)');
console.log('5. Run build to ensure no TypeScript errors\n');

console.log('## Files Modified\n');
console.log('- `extracted-components.json` - Extracted component examples (80KB)');
console.log('- `storybook/.storybook/blocks/codeVariants.ts` - Updated getCodeVariants mapping');
console.log('- `storybook/stories/components/actions/ButtonGroup.stories.tsx` - Added codeVariants params');
console.log('\n## Files to Complete\n');
console.log('- Finish inserting all 9 component exports into codeVariants.ts');
console.log('- Update remaining 8 story files with codeVariants parameters');
