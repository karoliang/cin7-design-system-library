import React from 'react';
import { Breadcrumbs } from '@shopify/polaris';

// Simple test to isolate Breadcrumbs component issues
export default function TestBreadcrumbs() {
  return React.createElement(Breadcrumbs, {
    breadcrumbs: [
      { content: 'Home', url: '#' },
      { content: 'Products', url: '#' },
      { content: 'Electronics', url: '#' },
    ]
  });
}