const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '.storybook/blocks/codeVariants.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Find the location to insert new variants - right before the closing brace of calloutcardExamples
const searchString = '  }\n};\n\n// EmptyState Component Examples';
const insertIndex = fileContent.indexOf(searchString);

if (insertIndex === -1) {
  console.error('Could not find insertion point!');
  process.exit(1);
}

// The new variants to add - insert before the closing brace
const newVariants = `,

  default: {
    react: \`import { CalloutCard } from '@shopify/polaris';
import React from 'react';

function DefaultCalloutCard() {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      primaryAction={{
        content: 'Start selling',
        onAction: () => console.log('Start selling clicked'),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: '#',
      }}
    >
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default DefaultCalloutCard;\`,

    vanilla: \`<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__content">
    <h2 class="polaris-callout-card__title">Get more sales with Shopify</h2>
    <p class="polaris-callout-card__description">
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </p>
    <div class="polaris-callout-card__actions">
      <button class="polaris-button polaris-button--primary">Start selling</button>
      <a href="#" class="polaris-link">Learn more</a>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Start selling clicked');
});
</script>\`,

    extjs: \`// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-callout-card',
  bodyPadding: 20,
  layout: 'vbox',
  items: [{
    xtype: 'component',
    html: '<h2>Get more sales with Shopify</h2>'
  }, {
    xtype: 'component',
    html: '<p>Create a online store and start selling to customers right away. Shopify provides everything you need to start, run, and grow your business.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'button',
      text: 'Start selling',
      ui: 'primary',
      handler: function() {
        console.log('Start selling clicked');
      }
    }, {
      xtype: 'button',
      text: 'Learn more',
      ui: 'link',
      margin: '0 0 0 12',
      handler: function() {
        window.location.href = '#';
      }
    }]
  }],
  renderTo: Ext.getBody()
});\`,

    typescript: \`import { CalloutCard } from '@shopify/polaris';
import React from 'react';

interface DefaultCalloutCardProps {
  onStartSelling?: () => void;
  learnMoreUrl?: string;
}

function DefaultCalloutCard({
  onStartSelling,
  learnMoreUrl = '#'
}: DefaultCalloutCardProps): JSX.Element {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      primaryAction={{
        content: 'Start selling',
        onAction: onStartSelling || (() => console.log('Start selling clicked')),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: learnMoreUrl,
      }}
    >
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default DefaultCalloutCard;\`
  }`;

// Insert new variants
const before = fileContent.substring(0, insertIndex);
const after = fileContent.substring(insertIndex);
const newContent = before + newVariants + '\n  ' + after;

// Write the file
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('✓ Successfully added default variant to calloutcardExamples');
