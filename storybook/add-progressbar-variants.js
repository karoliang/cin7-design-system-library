const fs = require('fs');
const path = require('path');

const codeVariantsPath = path.join(__dirname, '.storybook/blocks/codeVariants.ts');

// Read the file
let content = fs.readFileSync(codeVariantsPath, 'utf8');

// Find the progressbarExamples section
const progressbarStart = content.indexOf('export const progressbarExamples');
const progressbarDefaultEnd = content.indexOf('  }\n};', progressbarStart);

if (progressbarStart === -1 || progressbarDefaultEnd === -1) {
  console.error('Could not find progressbarExamples section');
  process.exit(1);
}

// Check if variants already exist
if (content.includes('progressbarExamples') && content.includes('sizes:') && content.indexOf('sizes:', progressbarStart) < progressbarDefaultEnd + 1000) {
  console.log('Variants already exist, skipping...');
  process.exit(0);
}

// The new variants to add (will be inserted after the default variant closing brace)
const newVariants = `,

  sizes: {
    react: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

function ProgressBarSizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">Small Progress</Text>
        <ProgressBar progress={75} size="small" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Medium Progress</Text>
        <ProgressBar progress={75} size="medium" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Large Progress</Text>
        <ProgressBar progress={75} size="large" />
      </div>
    </div>
  );
}

export default ProgressBarSizes;\`,

    vanilla: \`<!-- HTML Structure -->
<div class="progress-sizes-container">
  <div class="progress-item">
    <p class="progress-label">Small Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--small" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Medium Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--medium" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Large Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--large" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const sizes = ['small', 'medium', 'large'];
const container = document.querySelector('.progress-sizes-container');

sizes.forEach(size => {
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-item';

  const label = document.createElement('p');
  label.textContent = size.charAt(0).toUpperCase() + size.slice(1) + ' Progress';
  label.className = 'progress-label';

  const progressBar = createProgressBar({
    progress: 75,
    size: size
  });

  wrapper.appendChild(label);
  wrapper.appendChild(progressBar);
  container.appendChild(wrapper);
});
</script>\`,

    extjs: \`// ExtJS ProgressBar with different sizes
Ext.create('Ext.panel.Panel', {
  title: 'Progress Bar Sizes',
  width: 400,
  bodyPadding: 10,
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<p>Small Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 20,
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Medium Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 30,
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Large Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 40
    }
  ]
});\`,

    typescript: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

type ProgressBarSize = 'small' | 'medium' | 'large';

interface ProgressBarSizeItem {
  size: ProgressBarSize;
  label: string;
}

function ProgressBarSizes(): JSX.Element {
  const sizes: ProgressBarSizeItem[] = [
    { size: 'small', label: 'Small Progress' },
    { size: 'medium', label: 'Medium Progress' },
    { size: 'large', label: 'Large Progress' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      {sizes.map(({ size, label }) => (
        <div key={size}>
          <Text as="p" variant="bodySm">{label}</Text>
          <ProgressBar progress={75} size={size} />
        </div>
      ))}
    </div>
  );
}

export default ProgressBarSizes;\`
  }`;

// Insert the new variants
const insertPosition = progressbarDefaultEnd;
const before = content.substring(0, insertPosition);
const after = content.substring(insertPosition);

content = before + newVariants + after;

// Write back
fs.writeFileSync(codeVariantsPath, content, 'utf8');

console.log('Successfully added progressbar variants!');
console.log('Note: Only "sizes" variant added via script. Please add remaining 7 variants manually (colors, progressvalues, interactive, fileupload, multistep, datasync, realworld)');
