// New CalloutCard variants to add to codeVariants.ts
// Add these after the existing 'layout' variant

  default: {
    react: `import { CalloutCard } from '@shopify/polaris';
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

export default DefaultCalloutCard;`,

    vanilla: `<!-- HTML Structure -->
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
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
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
});`,

    typescript: `import { CalloutCard } from '@shopify/polaris';
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

export default DefaultCalloutCard;`
  },

// Continue with other variants...
// withIllustration, promotional, featureAnnouncement, onboarding, tips,
// interactive, businessInsights, educational, multiple, minimal, withMetrics
