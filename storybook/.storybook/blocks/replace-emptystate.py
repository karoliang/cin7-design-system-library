#!/usr/bin/env python3
import re

# Read file
with open('codeVariants.ts', 'r') as f:
    content = f.read()

# Find start of emptystateExamples
start_marker = 'export const emptystateExamples: Record<string, CodeVariant> = {'
start_idx = content.find(start_marker)

if start_idx == -1:
    print("ERROR: Could not find emptystateExamples")
    exit(1)

# Find the matching closing brace by counting braces
brace_count = 0
search_start = start_idx + len(start_marker) - 1  # Start from the opening brace
idx = search_start

while idx < len(content):
    if content[idx] == '{':
        brace_count += 1
    elif content[idx] == '}':
        brace_count -= 1
        if brace_count == 0:
            # Found the matching closing brace
            end_idx = idx + 1
            # Skip to the semicolon
            while end_idx < len(content) and content[end_idx] not in ';\n':
                end_idx += 1
            if end_idx < len(content) and content[end_idx] == ';':
                end_idx += 1
            break
    idx += 1

print(f"Found section from {start_idx} to {end_idx}")
print(f"Section length: {end_idx - start_idx} characters")

# Keep before and after
before = content[:start_idx]
after = content[end_idx:]

# New content
new_section = '''export const emptystateExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <EmptyState
      heading="No products found"
      action={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    />
  );
}

export default EmptyStateExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No products found" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No products found</h2>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Add product</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Add product clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No products found</h2>'
  }, {
    xtype: 'button',
    text: 'Add product',
    ui: 'primary',
    handler: function() {
      console.log('Add product clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateProps {
  heading: string;
  image?: string;
  onAction: () => void;
}

function EmptyStateExample({ heading, image, onAction }: EmptyStateProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Add product',
        onAction: onAction,
      }}
    />
  );
}

export default EmptyStateExample;`
  },

  withDescription: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateWithDescription() {
  return (
    <EmptyState
      heading="Manage your inventory"
      action={{
        content: 'Add products',
        onAction: () => console.log('Add products clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      Add products to your store to start selling and tracking inventory.
    </EmptyState>
  );
}

export default EmptyStateWithDescription;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Manage your inventory" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Manage your inventory</h2>
    <p class="polaris-empty-state__description">
      Add products to your store to start selling and tracking inventory.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Add products</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Add products clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Manage your inventory</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Add products to your store to start selling and tracking inventory.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Add products',
    ui: 'primary',
    handler: function() {
      console.log('Add products clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateWithDescriptionProps {
  heading: string;
  description: string;
  image?: string;
  actionText: string;
  onAction: () => void;
}

function EmptyStateWithDescription({
  heading,
  description,
  image,
  actionText,
  onAction
}: EmptyStateWithDescriptionProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: actionText,
        onAction: onAction,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateWithDescription;`
  },

  withSecondaryAction: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateWithSecondaryAction() {
  return (
    <EmptyState
      heading="No orders yet"
      action={{
        content: 'Create order',
        onAction: () => console.log('Create order clicked'),
      }}
      secondaryAction={{
        content: 'Import orders',
        onAction: () => console.log('Import orders clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      Once you start making sales, you'll see your order history here.
    </EmptyState>
  );
}

export default EmptyStateWithSecondaryAction;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No orders yet" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No orders yet</h2>
    <p class="polaris-empty-state__description">
      Once you start making sales, you'll see your order history here.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Create order</button>
      <button class="polaris-button">Import orders</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Create order clicked');
});

on('.polaris-button:not(.polaris-button--primary)', 'click', () => {
  console.log('Import orders clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No orders yet</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Once you start making sales, you\\\\'ll see your order history here.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'center'
    },
    items: [{
      xtype: 'button',
      text: 'Create order',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Create order clicked');
      }
    }, {
      xtype: 'button',
      text: 'Import orders',
      handler: function() {
        console.log('Import orders clicked');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateWithSecondaryActionProps {
  heading: string;
  description?: string;
  image?: string;
  primaryAction: {
    content: string;
    onAction: () => void;
  };
  secondaryAction: {
    content: string;
    onAction: () => void;
  };
}

function EmptyStateWithSecondaryAction({
  heading,
  description,
  image,
  primaryAction,
  secondaryAction
}: EmptyStateWithSecondaryActionProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={primaryAction}
      secondaryAction={secondaryAction}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateWithSecondaryAction;`
  },

  noAction: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateNoAction() {
  return (
    <EmptyState
      heading="All caught up!"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      There are no tasks that need your attention right now.
    </EmptyState>
  );
}

export default EmptyStateNoAction;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="All caught up!" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">All caught up!</h2>
    <p class="polaris-empty-state__description">
      There are no tasks that need your attention right now.
    </p>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
// No action button needed for this state
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">All caught up!</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">There are no tasks that need your attention right now.</p>'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateNoActionProps {
  heading: string;
  description?: string;
  image?: string;
}

function EmptyStateNoAction({
  heading,
  description,
  image
}: EmptyStateNoActionProps): JSX.Element {
  return (
    <EmptyState heading={heading} image={image}>
      {description}
    </EmptyState>
  );
}

export default EmptyStateNoAction;`
  },

  fullWidth: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateFullWidth() {
  return (
    <EmptyState
      heading="No data available"
      action={{
        content: 'Configure settings',
        onAction: () => console.log('Configure clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      fullWidth
    >
      Set up your preferences to start seeing data here.
    </EmptyState>
  );
}

export default EmptyStateFullWidth;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--full-width">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No data available" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No data available</h2>
    <p class="polaris-empty-state__description">
      Set up your preferences to start seeing data here.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Configure settings</button>
    </div>
  </div>
</div>

<style>
.polaris-empty-state--full-width {
  width: 100%;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Configure clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  width: '100%',
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No data available</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Set up your preferences to start seeing data here.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Configure settings',
    ui: 'primary',
    handler: function() {
      console.log('Configure clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateFullWidthProps {
  heading: string;
  description?: string;
  image?: string;
  actionText: string;
  onAction: () => void;
}

function EmptyStateFullWidth({
  heading,
  description,
  image,
  actionText,
  onAction
}: EmptyStateFullWidthProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: actionText,
        onAction: onAction,
      }}
      fullWidth
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateFullWidth;`
  },

  searchResults: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateSearchResults() {
  return (
    <EmptyState
      heading="No results found"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Clear search',
        onAction: () => console.log('Clear search clicked'),
      }}
    >
      Try checking your spelling or using more general terms
    </EmptyState>
  );
}

export default EmptyStateSearchResults;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No results found" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No results found</h2>
    <p class="polaris-empty-state__description">
      Try checking your spelling or using more general terms
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Clear search</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Clear search clicked');
  // Clear search input and refresh results
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No results found</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Try checking your spelling or using more general terms</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Clear search',
    ui: 'primary',
    handler: function() {
      console.log('Clear search clicked');
      // Clear search field and refresh
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateSearchResultsProps {
  heading: string;
  description?: string;
  image?: string;
  onClearSearch: () => void;
}

function EmptyStateSearchResults({
  heading,
  description,
  image,
  onClearSearch
}: EmptyStateSearchResultsProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Clear search',
        onAction: onClearSearch,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateSearchResults;`
  },

  errorState: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateError() {
  return (
    <EmptyState
      heading="Something went wrong"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Try again',
        onAction: () => console.log('Try again clicked'),
      }}
      secondaryAction={{
        content: 'Contact support',
        onAction: () => console.log('Contact support clicked'),
      }}
    >
      There was an error loading your data. Please try again.
    </EmptyState>
  );
}

export default EmptyStateError;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--error">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Something went wrong" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Something went wrong</h2>
    <p class="polaris-empty-state__description">
      There was an error loading your data. Please try again.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Try again</button>
      <button class="polaris-button">Contact support</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Try again clicked');
  // Reload data
});

on('.polaris-button:not(.polaris-button--primary)', 'click', () => {
  console.log('Contact support clicked');
  // Open support dialog
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state polaris-empty-state--error',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Something went wrong</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">There was an error loading your data. Please try again.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'center'
    },
    items: [{
      xtype: 'button',
      text: 'Try again',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Try again clicked');
      }
    }, {
      xtype: 'button',
      text: 'Contact support',
      handler: function() {
        console.log('Contact support clicked');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateErrorProps {
  heading: string;
  description?: string;
  image?: string;
  onRetry: () => void;
  onContactSupport: () => void;
}

function EmptyStateError({
  heading,
  description,
  image,
  onRetry,
  onContactSupport
}: EmptyStateErrorProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Try again',
        onAction: onRetry,
      }}
      secondaryAction={{
        content: 'Contact support',
        onAction: onContactSupport,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateError;`
  },

  maintenanceMode: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateMaintenance() {
  return (
    <EmptyState
      heading="Under maintenance"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Get notified',
        onAction: () => console.log('Get notified clicked'),
      }}
    >
      This section is temporarily unavailable while we make improvements. Check back soon.
    </EmptyState>
  );
}

export default EmptyStateMaintenance;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--maintenance">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Under maintenance" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Under maintenance</h2>
    <p class="polaris-empty-state__description">
      This section is temporarily unavailable while we make improvements. Check back soon.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Get notified</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Get notified clicked');
  // Subscribe to notifications
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state polaris-empty-state--maintenance',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Under maintenance</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">This section is temporarily unavailable while we make improvements. Check back soon.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Get notified',
    ui: 'primary',
    handler: function() {
      console.log('Get notified clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateMaintenanceProps {
  heading: string;
  description?: string;
  image?: string;
  onGetNotified: () => void;
}

function EmptyStateMaintenance({
  heading,
  description,
  image,
  onGetNotified
}: EmptyStateMaintenanceProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Get notified',
        onAction: onGetNotified,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateMaintenance;`
  }
};'''

# Write new file
with open('codeVariants.ts', 'w') as f:
    f.write(before + new_section + after)

print("SUCCESS! Added 8 EmptyState variants")
print("Variants: default, withDescription, withSecondaryAction, noAction, fullWidth, searchResults, errorState, maintenanceMode")
