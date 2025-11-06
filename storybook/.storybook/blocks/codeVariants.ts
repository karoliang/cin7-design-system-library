export interface CodeVariant {
  react: string;
  vanilla: string;
  extjs: string;
  typescript: string;
}

// Button Component Examples
export const buttonExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Button } from '@shopify/polaris';
import React from 'react';

function ButtonExample() {
  return <Button>Click me</Button>;
}

export default ButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<button class="polaris-button">Click me</button>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createButton } from '@cin7/vanilla-js';

const button = createButton({
  text: 'Click me',
  onClick: () => {
    console.log('Button clicked!');
  }
});

document.getElementById('app').appendChild(button);
</script>`,

    extjs: `// ExtJS Button using @cin7/extjs-adapters
Ext.create('Ext.button.Button', {
  text: 'Click me',
  handler: function() {
    console.log('Button clicked!');
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisButton } from '@cin7/extjs-adapters';

const button = Ext.create('PolarisButton', {
  text: 'Click me',
  handler: function() {
    console.log('Button clicked!');
  }
});`,

    typescript: `import { Button, ButtonProps } from '@shopify/polaris';
import React from 'react';

interface ButtonExampleProps {
  label?: string;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
}

function ButtonExample({
  label = 'Click me',
  onClick,
  variant = 'primary'
}: ButtonExampleProps): JSX.Element {
  return (
    <Button
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default ButtonExample;`
  },

  primary: {
    react: `import { Button } from '@shopify/polaris';
import React from 'react';

function PrimaryButtonExample() {
  return (
    <Button variant="primary">
      Save
    </Button>
  );
}

export default PrimaryButtonExample;`,

    vanilla: `<!-- Primary Button -->
<button class="polaris-button polaris-button--primary">Save</button>

<script>
import { createButton } from '@cin7/vanilla-js';

const primaryButton = createButton({
  text: 'Save',
  variant: 'primary',
  onClick: () => {
    console.log('Save clicked!');
  }
});
</script>`,

    extjs: `Ext.create('Ext.button.Button', {
  text: 'Save',
  ui: 'primary',
  scale: 'medium',
  handler: function() {
    console.log('Save clicked!');
  }
});`,

    typescript: `import { Button } from '@shopify/polaris';
import React from 'react';

interface PrimaryButtonProps {
  onSave: () => void;
  loading?: boolean;
}

function PrimaryButton({
  onSave,
  loading = false
}: PrimaryButtonProps): JSX.Element {
  return (
    <Button
      variant="primary"
      onClick={onSave}
      loading={loading}
    >
      Save
    </Button>
  );
}`
  }
};

// Placeholder for other components (to be added)
export const cardExamples: Record<string, CodeVariant> = {};
export const textFieldExamples: Record<string, CodeVariant> = {};

// Utility function to get code variants
export function getCodeVariants(
  componentName: string,
  exampleName: string
): CodeVariant | null {
  const examples: Record<string, Record<string, CodeVariant>> = {
    button: buttonExamples,
    card: cardExamples,
    textfield: textFieldExamples,
  };

  const componentExamples = examples[componentName.toLowerCase()];
  if (!componentExamples) {
    console.warn(`No code examples found for component: ${componentName}`);
    return null;
  }

  const example = componentExamples[exampleName];
  if (!example) {
    console.warn(`No example "${exampleName}" found for component: ${componentName}`);
    return null;
  }

  return example;
}
