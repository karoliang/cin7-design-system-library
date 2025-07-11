/**
 * Component registry and exports
 */

import { Cin7Button } from './button';
import { Cin7TextField } from './textfield';
import { Cin7Panel } from './panel';

// Component registry
const components = [
  Cin7Button,
  Cin7TextField,
  Cin7Panel,
];

/**
 * Register all Cin7 components with ExtJS
 */
export function registerComponents(): void {
  const Ext = (window as any).Ext;
  if (!Ext) {
    console.warn('ExtJS not found. Component registration deferred.');
    return;
  }

  // Register each component
  components.forEach(ComponentClass => {
    ComponentClass.register();
  });

  console.log('Cin7 ExtJS components registered successfully');
}

// Export all components
export * from './base';
export * from './button';
export * from './textfield';
export * from './panel';