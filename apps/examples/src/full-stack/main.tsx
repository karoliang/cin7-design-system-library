/**
 * Full Stack Integration Example
 * Demonstrates all Cin7 DSL layers working together
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { FullStackApp } from './FullStackApp';
import { initializeVanillaComponents } from './vanilla-components';
import { initializeExtJSComponents } from './extjs-components';
import { configureExtJS } from '@cin7/extjs-adapters';
import { applyTheme } from '@cin7/design-tokens/themes';
import '@shopify/polaris/build/esm/styles.css';

// Initialize the application
async function initializeApp() {
  try {
    // Apply initial theme
    applyTheme('light');
    
    // Initialize ExtJS with Cin7
    if ((window as any).Ext) {
      await new Promise(resolve => Ext.onReady(resolve));
      configureExtJS({
        theme: 'light',
        autoRegister: true,
      });
    }
    
    // Hide loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    
    // Mount React application
    const reactRoot = document.getElementById('react-root');
    if (reactRoot) {
      const root = ReactDOM.createRoot(reactRoot);
      root.render(
        <React.StrictMode>
          <FullStackApp />
        </React.StrictMode>
      );
    }
    
    // Initialize vanilla JS components
    initializeVanillaComponents();
    
    // Initialize ExtJS components
    initializeExtJSComponents();
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

// Start initialization
initializeApp();