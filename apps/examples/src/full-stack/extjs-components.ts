/**
 * ExtJS components for full-stack example
 */

import { configureExtJS } from '@cin7/extjs-adapters';
import { EventBus } from './event-bus';

let extjsGrid: any = null;
let extjsContainer: HTMLElement | null = null;

export function initializeExtJSComponents() {
  // Ensure ExtJS is ready
  if (!(window as any).Ext) {
    console.warn('ExtJS not loaded');
    return;
  }

  const Ext = (window as any).Ext;

  // Listen for mount event
  EventBus.on('extjs:mount', ({ container }) => {
    extjsContainer = container;
    Ext.onReady(() => renderExtJSGrid());
  });

  // Listen for unmount event
  EventBus.on('extjs:unmount', () => {
    if (extjsGrid) {
      extjsGrid.destroy();
      extjsGrid = null;
    }
  });

  // Listen for product updates
  EventBus.on('store:product:added', (product) => {
    if (extjsGrid && extjsGrid.getStore()) {
      extjsGrid.getStore().add(product);
    }
  });

  EventBus.on('store:product:updated', ({ id, updates }) => {
    if (extjsGrid && extjsGrid.getStore()) {
      const record = extjsGrid.getStore().findRecord('id', id);
      if (record) {
        record.set(updates);
      }
    }
  });

  EventBus.on('store:product:deleted', ({ id }) => {
    if (extjsGrid && extjsGrid.getStore()) {
      const record = extjsGrid.getStore().findRecord('id', id);
      if (record) {
        extjsGrid.getStore().remove(record);
      }
    }
  });

  // Listen for theme changes
  EventBus.on('theme:changed', ({ theme }) => {
    configureExtJS({ theme });
  });
}

function renderExtJSGrid() {
  if (!extjsContainer) return;

  const Ext = (window as any).Ext;

  // Get initial products from store
  const initialProducts = (window as any).Cin7Store 
    ? (window as any).Cin7Store.getState().products 
    : [];

  // Create the grid
  extjsGrid = Ext.create('Ext.grid.Panel', {
    renderTo: extjsContainer,
    height: 400,
    store: {
      fields: ['id', 'name', 'price', 'stock', 'category', 'createdAt', 'updatedAt'],
      data: initialProducts,
      sorters: [{
        property: 'createdAt',
        direction: 'DESC'
      }]
    },
    columns: [{
      text: 'ID',
      dataIndex: 'id',
      width: 80,
      hidden: true
    }, {
      text: 'Product Name',
      dataIndex: 'name',
      flex: 1,
      editor: {
        xtype: 'textfield',
        allowBlank: false
      }
    }, {
      text: 'Category',
      dataIndex: 'category',
      width: 120,
      editor: {
        xtype: 'combobox',
        store: ['Electronics', 'Accessories', 'Clothing', 'Other'],
        editable: false
      }
    }, {
      text: 'Price',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      renderer: function(value: number) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      },
      editor: {
        xtype: 'numberfield',
        minValue: 0,
        decimalPrecision: 2
      }
    }, {
      text: 'Stock',
      dataIndex: 'stock',
      width: 80,
      align: 'right',
      renderer: function(value: number) {
        const cls = value > 50 ? 'stock-high' : value > 10 ? 'stock-medium' : 'stock-low';
        return `<span class="${cls}">${value}</span>`;
      },
      editor: {
        xtype: 'numberfield',
        minValue: 0,
        allowDecimals: false
      }
    }, {
      text: 'Created',
      dataIndex: 'createdAt',
      width: 150,
      xtype: 'datecolumn',
      format: 'Y-m-d H:i'
    }, {
      xtype: 'actioncolumn',
      width: 60,
      items: [{
        iconCls: 'x-fa fa-edit',
        tooltip: 'Edit inline',
        handler: function(grid: any, rowIndex: number) {
          grid.getPlugin('rowediting').startEdit(rowIndex, 0);
        }
      }, {
        iconCls: 'x-fa fa-trash',
        tooltip: 'Delete',
        handler: function(grid: any, rowIndex: number) {
          Ext.Msg.confirm('Delete', 'Are you sure you want to delete this product?', function(btn: string) {
            if (btn === 'yes') {
              const record = grid.getStore().getAt(rowIndex);
              const id = record.get('id');
              
              // Remove from grid
              grid.getStore().removeAt(rowIndex);
              
              // Emit event to sync with store
              EventBus.emit('external:product:delete', { id });
            }
          });
        }
      }]
    }],
    
    plugins: [{
      ptype: 'rowediting',
      pluginId: 'rowediting',
      clicksToEdit: 2,
      listeners: {
        edit: function(editor: any, context: any) {
          const record = context.record;
          const changes = context.newValues;
          
          // Emit event to sync with store
          EventBus.emit('external:product:update', {
            id: record.get('id'),
            updates: changes
          });
        }
      }
    }],
    
    features: [{
      ftype: 'summary',
      dock: 'bottom'
    }],
    
    tbar: [{
      text: 'Add Product',
      iconCls: 'x-fa fa-plus',
      handler: function() {
        showAddProductDialog();
      }
    }, '-', {
      text: 'Refresh',
      iconCls: 'x-fa fa-refresh',
      handler: function() {
        refreshGridData();
      }
    }, '->', {
      xtype: 'textfield',
      emptyText: 'Search products...',
      width: 200,
      listeners: {
        change: function(field: any, value: string) {
          const store = extjsGrid.getStore();
          store.clearFilter();
          
          if (value) {
            store.filter({
              filterFn: function(record: any) {
                return record.get('name').toLowerCase().includes(value.toLowerCase()) ||
                       (record.get('category') || '').toLowerCase().includes(value.toLowerCase());
              }
            });
          }
        }
      }
    }],
    
    bbar: {
      xtype: 'statusbar',
      defaultText: `Total: ${initialProducts.length} products`,
      items: ['->', {
        text: 'Export CSV',
        iconCls: 'x-fa fa-download',
        handler: function() {
          exportToCSV();
        }
      }]
    },
    
    listeners: {
      selectionchange: function(model: any, selected: any[]) {
        const statusBar = extjsGrid.down('statusbar');
        if (selected.length > 0) {
          const totalValue = selected.reduce((sum, record) => 
            sum + (record.get('price') * record.get('stock')), 0
          );
          statusBar.setText(`Selected: ${selected.length} products, Value: $${totalValue.toFixed(2)}`);
        } else {
          statusBar.setText(`Total: ${extjsGrid.getStore().getCount()} products`);
        }
      }
    }
  });
}

function showAddProductDialog() {
  const Ext = (window as any).Ext;
  
  const form = Ext.create('Ext.form.Panel', {
    bodyPadding: 10,
    width: 400,
    defaultType: 'textfield',
    items: [{
      fieldLabel: 'Product Name',
      name: 'name',
      allowBlank: false
    }, {
      xtype: 'combobox',
      fieldLabel: 'Category',
      name: 'category',
      store: ['Electronics', 'Accessories', 'Clothing', 'Other'],
      value: 'Other'
    }, {
      xtype: 'numberfield',
      fieldLabel: 'Price',
      name: 'price',
      minValue: 0,
      decimalPrecision: 2,
      value: 0
    }, {
      xtype: 'numberfield',
      fieldLabel: 'Stock',
      name: 'stock',
      minValue: 0,
      allowDecimals: false,
      value: 0
    }]
  });
  
  const window = Ext.create('Ext.window.Window', {
    title: 'Add New Product',
    modal: true,
    items: form,
    buttons: [{
      text: 'Cancel',
      handler: function() {
        window.close();
      }
    }, {
      text: 'Add Product',
      handler: function() {
        if (form.isValid()) {
          const values = form.getValues();
          
          // Emit event to add through store
          EventBus.emit('external:product:add', values);
          
          window.close();
        }
      }
    }]
  });
  
  window.show();
}

function refreshGridData() {
  if (extjsGrid && (window as any).Cin7Store) {
    const products = (window as any).Cin7Store.getState().products;
    extjsGrid.getStore().loadData(products);
    
    // Update status bar
    const statusBar = extjsGrid.down('statusbar');
    statusBar.setText(`Total: ${products.length} products`);
  }
}

function exportToCSV() {
  if (!extjsGrid) return;
  
  const store = extjsGrid.getStore();
  const data = store.getData();
  
  let csv = 'Name,Category,Price,Stock,Created\n';
  
  data.each((record: any) => {
    csv += `"${record.get('name')}",`;
    csv += `"${record.get('category') || ''}",`;
    csv += `${record.get('price')},`;
    csv += `${record.get('stock')},`;
    csv += `"${new Date(record.get('createdAt')).toISOString()}"\n`;
  });
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.csv';
  a.click();
  URL.revokeObjectURL(url);
  
  // Show notification
  EventBus.emit('external:notification', {
    message: 'Products exported to CSV',
    type: 'success'
  });
}