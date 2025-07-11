/**
 * React + Polaris Example
 * Demonstrates modern React patterns with Cin7 DSL
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@shopify/polaris/build/esm/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);