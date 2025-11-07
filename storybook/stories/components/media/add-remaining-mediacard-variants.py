#!/usr/bin/env python3
"""
Script to add remaining MediaCard variants to codeVariants.ts
This adds 10 more variants after 'sizeVariations'
"""

import re

# Path to the codeVariants.ts file
file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# The remaining variants content to insert
# This should be inserted after the closing of sizeVariations variant and before the closing of mediacardExamples

remaining_variants = """,

  landscape: {
    react: `import { MediaCard, Text } from '@shopify/polaris';
import { ArrowDownIcon, ShareIcon } from '@shopify/polaris-icons';
import React from 'react';

function LandscapeModeExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Landscape Media Cards</Text>

      <div style={{ display: 'flex', gap: '24px' }}>
        <MediaCard
          title="Landscape Photography"
          description="Stunning natural landscapes from around the world, captured in high resolution with professional equipment."
          primaryAction={{
            content: 'View gallery',
            onAction: () => console.log('View gallery'),
          }}
          secondaryAction={{
            content: 'Download',
            onAction: () => console.log('Download'),
            icon: ArrowDownIcon,
          }}
        />

        <MediaCard
          title="Architectural Design"
          description="Modern architectural projects showcasing innovative design principles and sustainable building practices."
          primaryAction={{
            content: 'Explore',
            onAction: () => console.log('Explore'),
          }}
          secondaryAction={{
            content: 'Share',
            onAction: () => console.log('Share'),
            icon: ShareIcon,
          }}
        />
      </div>
    </div>
  );
}

export default LandscapeModeExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="landscape-container">
  <h3 class="polaris-heading-md">Landscape Media Cards</h3>

  <div class="landscape-grid">
    <div class="polaris-media-card polaris-media-card--landscape">
      <div class="polaris-media-card__media">
        <img src="landscape-photo.jpg" alt="Landscape Photography" />
      </div>
      <div class="polaris-media-card__content">
        <h3 class="polaris-media-card__title">Landscape Photography</h3>
        <p class="polaris-media-card__description">
          Stunning natural landscapes from around the world, captured in high resolution.
        </p>
        <div class="polaris-media-card__actions">
          <button class="polaris-button polaris-button--primary">View gallery</button>
          <button class="polaris-button">Download</button>
        </div>
      </div>
    </div>
  </div>
</div>`,

    extjs: `// ExtJS Landscape Cards
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  items: [{
    xtype: 'panel',
    cls: 'polaris-media-card polaris-media-card--landscape',
    title: 'Landscape Photography',
    buttons: [{
      text: 'View gallery',
      ui: 'primary'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

const LandscapeModeExample: React.FC = () => {
  return (
    <MediaCard
      title="Landscape Photography"
      description="Stunning natural landscapes from around the world."
      primaryAction={{
        content: 'View gallery',
        onAction: () => console.log('View gallery'),
      }}
    />
  );
};

export default LandscapeModeExample;`
  }"""

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the pattern to insert after - right after sizeVariations variant closing
# We're looking for the end of sizeVariations which is:
# export default SizeVariationsExample;`
#   }
# And we want to insert before the closing brace of mediacardExamples

# Find the insertion point
pattern = r"(export default SizeVariationsExample;`\n  }\n)(};\n\n// Thumbnail Component Examples)"
replacement = r"\1" + remaining_variants + r"\n\2"

# Replace
new_content = re.sub(pattern, replacement, content)

if new_content == content:
    print("ERROR: Pattern not found. File was not modified.")
    print("Looking for pattern around 'export default SizeVariationsExample'")
else:
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Added landscape variant to codeVariants.ts")
    print("Added 1 variant. 9 more to go.")
