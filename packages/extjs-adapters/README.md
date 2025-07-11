# @cin7/extjs-adapters

ExtJS adapters for the Cin7 DSL framework. This package bridges the modern Cin7 design system with ExtJS enterprise components, providing consistent theming and enhanced functionality.

## Philosophy

ExtJS remains a powerful choice for enterprise data-heavy applications. This adapter:

- **Preserves ExtJS Strengths**: Leverages ExtJS's powerful grid, form, and data handling
- **Modern Design Integration**: Applies Cin7/Polaris design tokens to ExtJS components
- **Progressive Enhancement**: Adds modern interactions while maintaining ExtJS patterns
- **Theme Consistency**: Ensures visual consistency across React and ExtJS components

## Installation

```bash
pnpm add @cin7/extjs-adapters
```

## Features

### 🎨 Design Token Integration

Automatically applies Cin7 design tokens to ExtJS components:

```javascript
import { applyTheme } from '@cin7/extjs-adapters';

// Apply Cin7 theme to ExtJS
applyTheme();

// Your ExtJS components now use Cin7 design tokens
Ext.create('Ext.grid.Panel', {
  // Automatically styled with Cin7 tokens
});
```

### 📊 Enhanced Grid

Modern grid with Cin7 styling and features:

```javascript
import { Cin7Grid } from '@cin7/extjs-adapters/grid';

const grid = Cin7Grid.create({
  title: 'Products',
  store: productStore,
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Price', dataIndex: 'price', width: 100, xtype: 'cin7numbercolumn' },
    { text: 'Status', dataIndex: 'status', width: 120, xtype: 'cin7statuscolumn' }
  ],
  // Enhanced features
  features: [{
    ftype: 'cin7grouping',
    groupHeaderTpl: '{name} ({rows.length} items)'
  }],
  // Modern toolbar
  tbar: {
    xtype: 'cin7toolbar',
    items: [
      { xtype: 'cin7searchfield', emptyText: 'Search products...' },
      { xtype: 'cin7button', text: 'Add Product', icon: 'plus' }
    ]
  }
});
```

### 📝 Form Components

Enhanced form fields with validation and modern styling:

```javascript
import { Cin7Form } from '@cin7/extjs-adapters/form';

const form = Cin7Form.create({
  title: 'Customer Details',
  items: [
    {
      xtype: 'cin7textfield',
      fieldLabel: 'Name',
      name: 'name',
      required: true
    },
    {
      xtype: 'cin7emailfield',
      fieldLabel: 'Email',
      name: 'email'
    },
    {
      xtype: 'cin7datepicker',
      fieldLabel: 'Birth Date',
      name: 'birthDate'
    },
    {
      xtype: 'cin7tagfield',
      fieldLabel: 'Tags',
      name: 'tags',
      store: tagStore
    }
  ],
  buttons: [
    { text: 'Cancel', xtype: 'cin7button', ui: 'secondary' },
    { text: 'Save', xtype: 'cin7button', ui: 'primary' }
  ]
});
```

### 📈 Charts Integration

Modern charts with Cin7 design tokens:

```javascript
import { Cin7Chart } from '@cin7/extjs-adapters/charts';

const chart = Cin7Chart.create({
  xtype: 'cin7linechart',
  title: 'Sales Trend',
  store: salesStore,
  axes: [{
    type: 'numeric',
    position: 'left',
    title: 'Revenue'
  }, {
    type: 'category',
    position: 'bottom',
    title: 'Month'
  }],
  series: [{
    type: 'line',
    xField: 'month',
    yField: 'revenue',
    smooth: true,
    marker: true
  }]
});
```

## Component Reference

### Grid Components

- `Cin7Grid` - Enhanced grid panel
- `cin7numbercolumn` - Formatted number column
- `cin7statuscolumn` - Status indicator column
- `cin7actioncolumn` - Modern action buttons
- `cin7grouping` - Enhanced grouping feature

### Form Components

- `Cin7Form` - Enhanced form panel
- `cin7textfield` - Modern text input
- `cin7emailfield` - Email input with validation
- `cin7datepicker` - Date picker with Cin7 styling
- `cin7tagfield` - Multi-select tag input
- `cin7searchfield` - Search input with icons

### Button Components

- `cin7button` - Modern button with variants
- `cin7toolbar` - Enhanced toolbar
- `cin7splitbutton` - Dropdown button

### Chart Components

- `cin7linechart` - Line chart with smooth curves
- `cin7barchart` - Bar chart with modern styling
- `cin7piechart` - Pie chart with animations
- `cin7areachart` - Area chart with gradients

## Theming

### Automatic Theme Application

```javascript
import { applyTheme, watchTheme } from '@cin7/extjs-adapters';

// Apply current theme
applyTheme();

// Watch for theme changes
const unwatch = watchTheme((theme) => {
  console.log('Theme changed to:', theme);
});
```

### Custom Theme Overrides

```javascript
import { applyTheme } from '@cin7/extjs-adapters';

applyTheme({
  overrides: {
    grid: {
      headerHeight: 48,
      rowHeight: 42
    },
    form: {
      fieldHeight: 38
    }
  }
});
```

## Migration Guide

### From Standard ExtJS

```javascript
// Before: Standard ExtJS
Ext.create('Ext.grid.Panel', {
  title: 'Products',
  columns: [
    { text: 'Name', dataIndex: 'name' }
  ]
});

// After: With Cin7 adapters
import { Cin7Grid } from '@cin7/extjs-adapters/grid';

Cin7Grid.create({
  title: 'Products',
  columns: [
    { text: 'Name', dataIndex: 'name' }
  ]
});
```

### Gradual Migration

You can migrate components gradually:

```javascript
// Mix standard and Cin7 components
Ext.create('Ext.panel.Panel', {
  items: [
    // Standard ExtJS grid
    { xtype: 'grid', /* ... */ },
    // Enhanced Cin7 form
    { xtype: 'cin7form', /* ... */ }
  ]
});
```

## Advanced Usage

### Custom Column Types

```javascript
import { registerColumnType } from '@cin7/extjs-adapters/grid';

registerColumnType('cin7price', {
  renderer(value) {
    return `$${value.toFixed(2)}`;
  },
  align: 'right',
  cls: 'cin7-price-column'
});
```

### Form Validation

```javascript
import { Cin7Validators } from '@cin7/extjs-adapters/form';

{
  xtype: 'cin7textfield',
  fieldLabel: 'SKU',
  validator: Cin7Validators.pattern(/^[A-Z]{3}-\d{4}$/, 'Invalid SKU format')
}
```

### Event Handling

```javascript
grid.on('cin7:rowclick', (grid, record, element) => {
  // Enhanced event with element reference
});

form.on('cin7:fieldchange', (form, field, newValue, oldValue) => {
  // Detailed change event
});
```

## Performance

The adapters are designed for minimal overhead:

- Lazy loading of components
- Efficient theme application
- Optimized event handling
- CSS containment for styling

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ExtJS 7.0+
- No IE11 support (use standard ExtJS for legacy browsers)

## License

MIT