#!/usr/bin/env python3
"""
Script to add DataTable code variants to codeVariants.ts
This script safely inserts new variant objects into the existing dataTableExamples export.
"""

import re

# Read the current file
with open('codeVariants.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the dataTableExamples section and locate where to insert
pattern = r"(export const dataTableExamples: Record<string, CodeVariant> = \{[\s\S]*?  \}\n\};)"

# New variants to add (11 new variants - excluding 'default' which already exists)
new_variants = '''
  productTable: {
    react: `import { DataTable } from '@shopify/polaris';
import React from 'react';

function ProductTableExample() {
  const rows = [
    ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
    ['Coffee Mug', 'Kitchen', '$12.00', '89', 'Active'],
    ['Wireless Mouse', 'Electronics', '$45.00', '42', 'Out of Stock'],
    ['Leather Wallet', 'Accessories', '$78.00', '23', 'Active'],
    ['Notebook Set', 'Stationery', '$15.00', '200', 'Active'],
  ];

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Stock', 'Status']}
      rows={rows}
    />
  );
}

export default ProductTableExample;`,

    vanilla: `import { createDataTable, EventBus } from '@cin7/vanilla-js';

// Define product data
const productData = {
  headings: ['Product', 'Category', 'Price', 'Stock', 'Status'],
  rows: [
    ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
    ['Coffee Mug', 'Kitchen', '$12.00', '89', 'Active'],
    ['Wireless Mouse', 'Electronics', '$45.00', '42', 'Out of Stock'],
    ['Leather Wallet', 'Accessories', '$78.00', '23', 'Active'],
    ['Notebook Set', 'Stationery', '$15.00', '200', 'Active'],
  ],
  columnTypes: ['text', 'text', 'numeric', 'numeric', 'text']
};

// Create and render product table
const productTable = createDataTable(productData);
document.getElementById('app').appendChild(productTable);`,

    extjs: `import { PolarisDataTable } from '@cin7/extjs-adapters';

// Create product DataTable
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  width: 900,
  title: 'Product Inventory',
  items: [{
    xtype: 'polarisdatatable',
    headings: ['Product', 'Category', 'Price', 'Stock', 'Status'],
    columnContentTypes: ['text', 'text', 'numeric', 'numeric', 'text'],
    rows: [
      ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
      ['Coffee Mug', 'Kitchen', '$12.00', '89', 'Active'],
      ['Wireless Mouse', 'Electronics', '$45.00', '42', 'Out of Stock'],
      ['Leather Wallet', 'Accessories', '$78.00', '23', 'Active'],
      ['Notebook Set', 'Stationery', '$15.00', '200', 'Active'],
    ]
  }]
});`,

    typescript: `import { DataTable } from '@shopify/polaris';
import React from 'react';

interface Product {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'Active' | 'Out of Stock';
}

interface ProductTableProps {
  products?: Product[];
}

function ProductTableExample({ products }: ProductTableProps): JSX.Element {
  const defaultProducts: Product[] = [
    { name: 'Vintage T-Shirt', category: 'Apparel', price: '$25.00', stock: 150, status: 'Active' },
    { name: 'Coffee Mug', category: 'Kitchen', price: '$12.00', stock: 89, status: 'Active' },
    { name: 'Wireless Mouse', category: 'Electronics', price: '$45.00', stock: 42, status: 'Out of Stock' },
    { name: 'Leather Wallet', category: 'Accessories', price: '$78.00', stock: 23, status: 'Active' },
    { name: 'Notebook Set', category: 'Stationery', price: '$15.00', stock: 200, status: 'Active' },
  ];

  const data = products || defaultProducts;

  const rows = data.map(product => [
    product.name,
    product.category,
    product.price,
    product.stock.toString(),
    product.status
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Stock', 'Status']}
      rows={rows}
    />
  );
}

export default ProductTableExample;`
  },'''

print("Script ready to add DataTable variants")
print("Note: Due to file size, this is a reference script.")
print("The actual integration should be done with the Edit tool targeting specific line ranges.")
