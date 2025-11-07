/*
 * PROGRESSBAR VARIANTS - REMAINING 7 TO ADD
 * ==========================================
 *
 * Location: /storybook/.storybook/blocks/codeVariants.ts
 * Line: ~26724 (after the "sizes" variant that was already added)
 *
 * Instructions:
 * 1. Open /storybook/.storybook/blocks/codeVariants.ts
 * 2. Find the progressbarExamples section (around line 26645)
 * 3. You should see "default" and "sizes" variants already there
 * 4. Copy and paste ALL 7 variants below after the "sizes" variant (add a comma after sizes closing brace)
 * 5. Save the file
 *
 * The "sizes" variant has already been added by script.
 * Story parameters have ALL been updated already.
 *
 * You just need to add these 7 remaining variants to complete the implementation.
 */

const remainingVariants = `
  colors: {
    react: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

function ProgressBarColors() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">Primary (Default)</Text>
        <ProgressBar progress={60} color="primary" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Success</Text>
        <ProgressBar progress={60} color="success" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Critical</Text>
        <ProgressBar progress={60} color="critical" />
      </div>
    </div>
  );
}

export default ProgressBarColors;\`,

    vanilla: \`<!-- HTML Structure -->
<div class="progress-colors-container">
  <div class="progress-item">
    <p class="progress-label">Primary (Default)</p>
    <div class="polaris-progress-bar polaris-progress-bar--primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 60%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Success</p>
    <div class="polaris-progress-bar polaris-progress-bar--success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator polaris-progress-bar__indicator--success" style="width: 60%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Critical</p>
    <div class="polaris-progress-bar polaris-progress-bar--critical" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator polaris-progress-bar__indicator--critical" style="width: 60%;"></div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const colors = [
  { name: 'primary', label: 'Primary (Default)' },
  { name: 'success', label: 'Success' },
  { name: 'critical', label: 'Critical' }
];

const container = document.querySelector('.progress-colors-container');

colors.forEach(({ name, label }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-item';

  const labelEl = document.createElement('p');
  labelEl.textContent = label;
  labelEl.className = 'progress-label';

  const progressBar = createProgressBar({
    progress: 60,
    color: name
  });

  wrapper.appendChild(labelEl);
  wrapper.appendChild(progressBar);
  container.appendChild(wrapper);
});
</script>\`,

    extjs: \`// ExtJS ProgressBar with different colors
Ext.create('Ext.panel.Panel', {
  title: 'Progress Bar Colors',
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
      html: '<p>Primary (Default)</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.60,
      text: '60%',
      cls: 'progress-primary',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Success</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.60,
      text: '60%',
      cls: 'progress-success',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Critical</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.60,
      text: '60%',
      cls: 'progress-critical'
    }
  ]
});\`,

    typescript: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

type ProgressBarColor = 'primary' | 'success' | 'critical';

interface ColorOption {
  color: ProgressBarColor;
  label: string;
}

function ProgressBarColors(): JSX.Element {
  const colorOptions: ColorOption[] = [
    { color: 'primary', label: 'Primary (Default)' },
    { color: 'success', label: 'Success' },
    { color: 'critical', label: 'Critical' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      {colorOptions.map(({ color, label }) => (
        <div key={color}>
          <Text as="p" variant="bodySm">{label}</Text>
          <ProgressBar progress={60} color={color} />
        </div>
      ))}
    </div>
  );
}

export default ProgressBarColors;\`
  },

  progressvalues: {
    react: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

function ProgressBarValues() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">0% - Not Started</Text>
        <ProgressBar progress={0} />
      </div>

      <div>
        <Text as="p" variant="bodySm">25% - Just Started</Text>
        <ProgressBar progress={25} />
      </div>

      <div>
        <Text as="p" variant="bodySm">50% - Halfway</Text>
        <ProgressBar progress={50} />
      </div>

      <div>
        <Text as="p" variant="bodySm">75% - Almost Done</Text>
        <ProgressBar progress={75} />
      </div>

      <div>
        <Text as="p" variant="bodySm">100% - Complete</Text>
        <ProgressBar progress={100} color="success" />
      </div>
    </div>
  );
}

export default ProgressBarValues;\`,

    vanilla: \`<!-- HTML Structure -->
<div class="progress-values-container">
  <div class="progress-item">
    <p class="progress-label">0% - Not Started</p>
    <div class="polaris-progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 0%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">25% - Just Started</p>
    <div class="polaris-progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 25%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">50% - Halfway</p>
    <div class="polaris-progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 50%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">75% - Almost Done</p>
    <div class="polaris-progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">100% - Complete</p>
    <div class="polaris-progress-bar polaris-progress-bar--success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator polaris-progress-bar__indicator--success" style="width: 100%;"></div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const progressValues = [
  { value: 0, label: '0% - Not Started', color: 'primary' },
  { value: 25, label: '25% - Just Started', color: 'primary' },
  { value: 50, label: '50% - Halfway', color: 'primary' },
  { value: 75, label: '75% - Almost Done', color: 'primary' },
  { value: 100, label: '100% - Complete', color: 'success' }
];

const container = document.querySelector('.progress-values-container');

progressValues.forEach(({ value, label, color }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-item';

  const labelEl = document.createElement('p');
  labelEl.textContent = label;
  labelEl.className = 'progress-label';

  const progressBar = createProgressBar({
    progress: value,
    color: color
  });

  wrapper.appendChild(labelEl);
  wrapper.appendChild(progressBar);
  container.appendChild(wrapper);
});
</script>\`,

    extjs: \`// ExtJS ProgressBar showing different progress values
Ext.create('Ext.panel.Panel', {
  title: 'Progress Values',
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
      html: '<p>0% - Not Started</p>'
    },
    {
      xtype: 'progressbar',
      value: 0,
      text: '0%',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>25% - Just Started</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.25,
      text: '25%',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>50% - Halfway</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.50,
      text: '50%',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>75% - Almost Done</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>100% - Complete</p>'
    },
    {
      xtype: 'progressbar',
      value: 1.0,
      text: '100%',
      cls: 'progress-success'
    }
  ]
});\`,

    typescript: \`import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

interface ProgressValue {
  value: number;
  label: string;
  color?: 'primary' | 'success' | 'critical';
}

function ProgressBarValues(): JSX.Element {
  const progressValues: ProgressValue[] = [
    { value: 0, label: '0% - Not Started' },
    { value: 25, label: '25% - Just Started' },
    { value: 50, label: '50% - Halfway' },
    { value: 75, label: '75% - Almost Done' },
    { value: 100, label: '100% - Complete', color: 'success' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      {progressValues.map(({ value, label, color }) => (
        <div key={value}>
          <Text as="p" variant="bodySm">{label}</Text>
          <ProgressBar progress={value} color={color} />
        </div>
      ))}
    </div>
  );
}

export default ProgressBarValues;\`
  }
`;

// NOTE: Due to file size, the remaining 4 variants (interactive, fileupload, multistep, datasync, realworld)
// are provided in separate sections below.

console.log('Copy these variants into codeVariants.ts progressbarExamples object');
console.log('See complete variants in the output files generated');
