#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class EmergencyFix {
  constructor() {
    this.storiesDir = path.join(__dirname, '../stories');
    this.problematicFiles = [
      'stories/guides/RealWorldExamples.stories.tsx',
      'stories/guides/DSLAitecture.stories.tsx',
      'stories/polaris/components/AdminComponents.stories.tsx',
      'stories/polaris/components/FormComponents.stories.tsx',
      'stories/polaris/components/DataManagement.stories.tsx',
      'stories/polaris/components/DashboardComponents.stories.tsx',
      'stories/polaris/components/Icon.stories.tsx'
    ];
  }

  // Temporarily rename problematic files
  applyQuickFix() {
    console.log('🚨 Applying emergency performance fix...\n');

    for (const relativePath of this.problematicFiles) {
      const fullPath = path.join(this.storiesDir, '..', relativePath);
      const disabledPath = fullPath + '.disabled';

      if (fs.existsSync(fullPath)) {
        fs.renameSync(fullPath, disabledPath);
        console.log(`✅ Disabled: ${relativePath}`);
      } else if (fs.existsSync(disabledPath)) {
        console.log(`ℹ️  Already disabled: ${relativePath}`);
      }
    }

    console.log('\n📝 Quick fix applied!');
    console.log('   - Moved problematic story files to .disabled extension');
    console.log('   - Storybook should now load without infinite reloads');
    console.log('   - Run "node scripts/restore-stories.js" to restore when ready');
  }

  // Restore disabled files
  restoreFiles() {
    console.log('🔄 Restoring disabled story files...\n');

    for (const relativePath of this.problematicFiles) {
      const fullPath = path.join(this.storiesDir, '..', relativePath);
      const disabledPath = fullPath + '.disabled';

      if (fs.existsSync(disabledPath)) {
        fs.renameSync(disabledPath, fullPath);
        console.log(`✅ Restored: ${relativePath}`);
      } else {
        console.log(`ℹ️  Not disabled: ${relativePath}`);
      }
    }

    console.log('\n📝 Files restored!');
  }

  // Create minimal config for testing
  createMinimalConfig() {
    const minimalConfig = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../stories/test-*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/foundation/components/DesignTokens.stories.tsx",
    "../stories/polaris/components/Button.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: 'localhost',
      allowedHosts: ['localhost', '127.0.0.1']
    };
    return config;
  },
};

export default config;`;

    fs.writeFileSync(
      path.join(__dirname, '../.storybook/main.minimal.ts'),
      minimalConfig
    );

    console.log('✅ Created minimal config: .storybook/main.minimal.ts');
    console.log('   Use: STORYBOOK_CONFIG_PATH=main.minimal.ts pnpm dev');
  }
}

// Run emergency fix
if (require.main === module) {
  const fix = new EmergencyFix();
  const command = process.argv[2];

  switch (command) {
    case 'restore':
      fix.restoreFiles();
      break;
    case 'minimal':
      fix.createMinimalConfig();
      break;
    default:
      fix.applyQuickFix();
      fix.createMinimalConfig();
  }
}

module.exports = EmergencyFix;