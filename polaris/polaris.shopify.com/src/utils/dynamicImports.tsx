import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner, BlockStack, Text } from '@shopify/polaris';

// Loading component
const LoadingComponent = ({ text }: { text: string }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <BlockStack gap="400" align="center">
      <Spinner accessibilityLabel={text} />
      <Text variant="bodySm" tone="subdued" as="p">{text}</Text>
    </BlockStack>
  </div>
);

// Dynamic imports for heavy components
export const DynamicPlayground = dynamic(
  () => import('../../pages/playground'),
  {
    loading: () => <LoadingComponent text="Loading playground..." />,
    ssr: false,
  }
);

export const DynamicIconGrid = dynamic(
  () => import('../components/IconGrid'),
  {
    loading: () => <LoadingComponent text="Loading icons..." />,
  }
);

// Commented out until these components are created
// export const DynamicComponentGrid = dynamic(
//   () => import('../components/ComponentGrid'),
//   {
//     loading: () => <LoadingComponent text="Loading components..." />,
//   }
// );

// export const DynamicCodeExample = dynamic(
//   () => import('../components/CodeExample').then(mod => ({ default: mod.CodeExample })),
//   {
//     loading: () => <LoadingComponent text="Loading code example..." />,
//   }
// );

// Preload components on hover
export function preloadComponent(componentName: string) {
  switch (componentName) {
    case 'playground':
      import('../../pages/playground');
      break;
    case 'icons':
      import('../components/IconGrid');
      break;
    // case 'components':
    //   import('../components/ComponentGrid');
    //   break;
    // case 'code-example':
    //   import('../components/CodeExample');
    //   break;
    default:
      break;
  }
}