import dynamic from 'next/dynamic';
import { LazyLoad } from '../components/LazyLoad';

// Dynamic imports for heavy components
export const DynamicPlayground = dynamic(
  () => import('../../pages/playground'),
  {
    loading: () => <LazyLoad loadingText="Loading playground..." />,
    ssr: false,
  }
);

export const DynamicIconGrid = dynamic(
  () => import('../components/IconGrid'),
  {
    loading: () => <LazyLoad loadingText="Loading icons..." />,
  }
);

export const DynamicComponentGrid = dynamic(
  () => import('../components/ComponentGrid'),
  {
    loading: () => <LazyLoad loadingText="Loading components..." />,
  }
);

export const DynamicCodeExample = dynamic(
  () => import('../components/CodeExample').then(mod => ({ default: mod.CodeExample })),
  {
    loading: () => <LazyLoad loadingText="Loading code example..." />,
  }
);

// Preload components on hover
export function preloadComponent(componentName: string) {
  switch (componentName) {
    case 'playground':
      import('../../pages/playground');
      break;
    case 'icons':
      import('../components/IconGrid');
      break;
    case 'components':
      import('../components/ComponentGrid');
      break;
    case 'code-example':
      import('../components/CodeExample');
      break;
    default:
      break;
  }
}