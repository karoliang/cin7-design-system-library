#!/usr/bin/env node
/**
 * Add codeVariants parameters to Navigation & Actions story files
 */
const fs = require('fs');
const path = require('path');

const STORYBOOK_STORIES = '/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories';

// Map component names to their story files and primary variations
const componentStories = {
  buttonGroup: {
    file: 'components/actions/ButtonGroup.stories.tsx',
    variations: ['default', 'with-segmented-buttons', 'pressed-with-segmented-buttons']
  },
  tabs: {
    file: 'components/navigation/Tabs.stories.tsx',
    variations: ['default', 'fitted', 'inside-of-a-card', 'with-actions', 'with-badge-content']
  },
  actionList: {
    file: 'components/actions/ActionList.stories.tsx',
    variations: ['with-destructive-item']
  },
  navigation: {
    file: 'components/navigation/Navigation.stories.tsx',
    variations: ['default']
  },
  link: {
    file: 'components/utilities/Link.stories.tsx',
    variations: ['default']
  },
  pagination: {
    file: 'components/utilities/Pagination.stories.tsx',
    variations: ['default']
  },
  contextualSaveBar: {
    file: 'components/utilities/ContextualSaveBar.stories.tsx',
    variations: ['default']
  },
  topBar: {
    file: 'components/navigation/TopBar.stories.tsx',
    variations: ['default']
  },
  fullscreenBar: {
    file: 'components/navigation/FullscreenBar.stories.tsx',
    variations: ['default']
  }
};

// Import statement to add
const IMPORT_STATEMENT = `import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';\n`;

let updatedCount = 0;
let skippedCount = 0;

Object.entries(componentStories).forEach(([componentName, info]) => {
  const filePath = path.join(STORYBOOK_STORIES, info.file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${componentName} - file not found: ${info.file}`);
    skippedCount++;
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if already has codeVariants import
  if (content.includes('getCodeVariants')) {
    console.log(`⏭️  Skipping ${componentName} - already has codeVariants`);
    skippedCount++;
    return;
  }

  // Add import after the last import statement
  const lastImportMatch = content.match(/import[^;]+;(?=\n\n)/g);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    content = content.replace(lastImport, lastImport + '\n' + IMPORT_STATEMENT);
  }

  // Find the parameters object and add codeVariants
  // Match the closing of docs object within parameters
  const docsCloseRegex = /(parameters:\s*{\s*layout:[^}]+,?\s*docs:\s*{[^}]*}\s*)(},?\s*},?\s*tags:)/s;
  const match = content.match(docsCloseRegex);

  if (match) {
    // Add codeVariants parameter after docs section
    const beforeClose = match[1];
    const afterParams = match[2];

    const codeVariantsParam = `,\n    codeVariants: {
      component: '${componentName}',
      variations: ${JSON.stringify(info.variations, null, 6).replace(/\n/g, '\n      ')}
    }`;

    content = content.replace(
      docsCloseRegex,
      beforeClose + codeVariantsParam + '\n  ' + afterParams
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${componentName} story (${info.file})`);
    updatedCount++;
  } else {
    console.log(`⚠️  Could not find parameters object in ${componentName} story`);
    skippedCount++;
  }
});

console.log(`\n✓ Updated ${updatedCount} story files`);
console.log(`⏭️  Skipped ${skippedCount} files`);
