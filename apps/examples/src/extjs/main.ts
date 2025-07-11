/**
 * ExtJS Enterprise Example
 * Demonstrates data-heavy enterprise application with Cin7 DSL
 */

import { configureExtJS, Cin7Grid, Cin7Form, Cin7Chart } from '@cin7/extjs-adapters';
import { enterpriseTokens } from '@cin7/design-tokens';
import './app';

// Configure ExtJS with Cin7 theme
Ext.onReady(() => {
  // Initialize Cin7 theme
  configureExtJS({
    theme: 'light',
    autoRegister: true,
  });

  // Create main application
  Ext.application({
    name: 'Cin7ExtJSExample',
    appFolder: 'src/extjs',
    
    launch: function() {
      // Create viewport
      Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
          region: 'north',
          xtype: 'container',
          height: 60,
          cls: 'app-header',
          html: '<h1>ExtJS Enterprise Example</h1>',
          items: [{
            xtype: 'cin7button',
            text: 'Toggle Theme',
            icon: 'palette',
            handler: () => {
              const currentTheme = document.documentElement.getAttribute('data-cin7-theme');
              const newTheme = currentTheme === 'light' ? 'dark' : 'light';
              configureExtJS({ theme: newTheme });
            },
            style: {
              position: 'absolute',
              right: '20px',
              top: '15px'
            }
          }]
        }, {
          region: 'west',
          xtype: 'treepanel',
          title: 'Navigation',
          width: 250,
          split: true,
          collapsible: true,
          rootVisible: false,
          store: {
            root: {
              expanded: true,
              children: [
                { text: 'Dashboard', leaf: true, iconCls: 'x-fa fa-dashboard' },
                { text: 'Inventory', leaf: true, iconCls: 'x-fa fa-box' },
                { text: 'Orders', leaf: true, iconCls: 'x-fa fa-shopping-cart' },
                { text: 'Customers', leaf: true, iconCls: 'x-fa fa-users' },
                { text: 'Reports', leaf: true, iconCls: 'x-fa fa-chart-bar' },
              ]
            }
          },
          listeners: {
            itemclick: function(view, record) {
              const centerPanel = Ext.getCmp('center-panel');
              centerPanel.setTitle(record.get('text'));
              
              // Load appropriate content based on selection
              switch(record.get('text')) {
                case 'Dashboard':
                  loadDashboard(centerPanel);
                  break;
                case 'Inventory':
                  loadInventory(centerPanel);
                  break;
                case 'Orders':
                  loadOrders(centerPanel);
                  break;
                case 'Customers':
                  loadCustomers(centerPanel);
                  break;
                case 'Reports':
                  loadReports(centerPanel);
                  break;
              }
            }
          }
        }, {
          region: 'center',
          xtype: 'tabpanel',
          id: 'center-panel',
          title: 'Dashboard',
          items: []
        }]
      });

      // Load dashboard by default
      loadDashboard(Ext.getCmp('center-panel'));
    }
  });
});

// Dashboard view
function loadDashboard(panel: any) {
  panel.removeAll();
  panel.add({
    xtype: 'panel',
    title: 'Dashboard Overview',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'container',
      layout: 'hbox',
      flex: 1,
      items: [{
        xtype: 'cin7card',
        title: 'Total Revenue',
        flex: 1,
        margin: '10',
        html: '<div class="metric-card"><span class="metric-value">$125,430</span><span class="metric-change positive">+12.5%</span></div>'
      }, {
        xtype: 'cin7card',
        title: 'Active Orders',
        flex: 1,
        margin: '10',
        html: '<div class="metric-card"><span class="metric-value">342</span><span class="metric-change positive">+5.2%</span></div>'
      }, {
        xtype: 'cin7card',
        title: 'Low Stock Items',
        flex: 1,
        margin: '10',
        html: '<div class="metric-card"><span class="metric-value">23</span><span class="metric-change negative">+15.0%</span></div>'
      }, {
        xtype: 'cin7card',
        title: 'New Customers',
        flex: 1,
        margin: '10',
        html: '<div class="metric-card"><span class="metric-value">89</span><span class="metric-change positive">+23.1%</span></div>'
      }]
    }, {
      xtype: 'cin7linechart',
      title: 'Revenue Trend',
      flex: 2,
      margin: '10',
      store: {
        fields: ['month', 'revenue', 'profit'],
        data: [
          { month: 'Jan', revenue: 95000, profit: 23000 },
          { month: 'Feb', revenue: 98000, profit: 25000 },
          { month: 'Mar', revenue: 102000, profit: 28000 },
          { month: 'Apr', revenue: 110000, profit: 32000 },
          { month: 'May', revenue: 118000, profit: 35000 },
          { month: 'Jun', revenue: 125430, profit: 38000 },
        ]
      },
      axes: [{
        type: 'numeric',
        position: 'left',
        title: 'Amount ($)',
        grid: true,
        minimum: 0
      }, {
        type: 'category',
        position: 'bottom',
        title: 'Month'
      }],
      series: [{
        type: 'line',
        xField: 'month',
        yField: 'revenue',
        title: 'Revenue',
        smooth: true,
        marker: { radius: 4 },
        style: { lineWidth: 2 }
      }, {
        type: 'line',
        xField: 'month',
        yField: 'profit',
        title: 'Profit',
        smooth: true,
        marker: { radius: 4 },
        style: { lineWidth: 2 }
      }]
    }]
  });
}

// Inventory view
function loadInventory(panel: any) {
  panel.removeAll();
  panel.add({
    xtype: 'cin7grid',
    title: 'Inventory Management',
    store: {
      fields: ['id', 'sku', 'name', 'category', 'stock', 'price', 'status'],
      data: generateInventoryData(100),
      pageSize: 25
    },
    columns: [{
      text: 'SKU',
      dataIndex: 'sku',
      width: 120,
      filter: { type: 'string' }
    }, {
      text: 'Product Name',
      dataIndex: 'name',
      flex: 1,
      filter: { type: 'string' }
    }, {
      text: 'Category',
      dataIndex: 'category',
      width: 150,
      filter: {
        type: 'list',
        options: ['Electronics', 'Accessories', 'Clothing', 'Home & Garden']
      }
    }, {
      text: 'Stock',
      dataIndex: 'stock',
      width: 100,
      align: 'right',
      renderer: function(value: number) {
        const cls = value > 50 ? 'stock-high' : value > 10 ? 'stock-medium' : 'stock-low';
        return `<span class="${cls}">${value}</span>`;
      },
      filter: { type: 'numeric' }
    }, {
      text: 'Price',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      xtype: 'cin7currencycolumn',
      filter: { type: 'numeric' }
    }, {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      xtype: 'cin7statuscolumn'
    }, {
      xtype: 'cin7actioncolumn',
      width: 100,
      items: [{
        icon: 'edit',
        tooltip: 'Edit product',
        handler: function(grid: any, rowIndex: number) {
          const record = grid.getStore().getAt(rowIndex);
          showProductForm(record);
        }
      }, {
        icon: 'delete',
        tooltip: 'Delete product',
        handler: function(grid: any, rowIndex: number) {
          Ext.Msg.confirm('Delete', 'Are you sure?', function(btn: string) {
            if (btn === 'yes') {
              grid.getStore().removeAt(rowIndex);
            }
          });
        }
      }]
    }],
    tbar: [{
      xtype: 'cin7searchfield',
      emptyText: 'Search inventory...',
      width: 300,
      listeners: {
        'cin7:search': function(field: any, value: string) {
          const grid = field.up('grid');
          const store = grid.getStore();
          store.clearFilter();
          if (value) {
            store.filter([{
              filterFn: function(record: any) {
                return record.get('name').toLowerCase().includes(value.toLowerCase()) ||
                       record.get('sku').toLowerCase().includes(value.toLowerCase());
              }
            }]);
          }
        }
      }
    }, '->', {
      xtype: 'cin7button',
      text: 'Add Product',
      icon: 'plus',
      variant: 'primary',
      handler: () => showProductForm(null)
    }, {
      xtype: 'cin7button',
      text: 'Import',
      icon: 'import'
    }, {
      xtype: 'cin7button',
      text: 'Export',
      icon: 'export',
      menu: [{
        text: 'Export as CSV',
        icon: 'file-csv'
      }, {
        text: 'Export as Excel',
        icon: 'file-excel'
      }, {
        text: 'Export as PDF',
        icon: 'file-pdf'
      }]
    }],
    bbar: {
      xtype: 'pagingtoolbar',
      displayInfo: true
    }
  });
}

// Orders view
function loadOrders(panel: any) {
  panel.removeAll();
  panel.add({
    xtype: 'cin7grid',
    title: 'Order Management',
    store: {
      fields: ['id', 'orderNumber', 'customer', 'date', 'total', 'status', 'items'],
      data: generateOrderData(50)
    },
    columns: [{
      text: 'Order #',
      dataIndex: 'orderNumber',
      width: 120
    }, {
      text: 'Customer',
      dataIndex: 'customer',
      flex: 1
    }, {
      text: 'Date',
      dataIndex: 'date',
      width: 120,
      xtype: 'datecolumn',
      format: 'Y-m-d'
    }, {
      text: 'Items',
      dataIndex: 'items',
      width: 80,
      align: 'center'
    }, {
      text: 'Total',
      dataIndex: 'total',
      width: 120,
      align: 'right',
      xtype: 'cin7currencycolumn'
    }, {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      renderer: function(value: string) {
        const statusMap: any = {
          'pending': { cls: 'status-pending', icon: 'clock' },
          'processing': { cls: 'status-processing', icon: 'cog' },
          'shipped': { cls: 'status-shipped', icon: 'truck' },
          'delivered': { cls: 'status-delivered', icon: 'check' },
          'cancelled': { cls: 'status-cancelled', icon: 'times' }
        };
        const status = statusMap[value] || {};
        return `<span class="${status.cls}"><i class="x-fa fa-${status.icon}"></i> ${value}</span>`;
      }
    }],
    features: [{
      ftype: 'cin7grouping',
      groupHeaderTpl: 'Status: {name} ({rows.length} orders)'
    }]
  });
}

// Customer form
function showProductForm(record: any) {
  const isEdit = !!record;
  
  const form = Ext.create({
    xtype: 'cin7form',
    title: isEdit ? 'Edit Product' : 'Add Product',
    floating: true,
    closable: true,
    modal: true,
    width: 500,
    items: [{
      xtype: 'cin7textfield',
      fieldLabel: 'SKU',
      name: 'sku',
      required: true,
      value: record ? record.get('sku') : ''
    }, {
      xtype: 'cin7textfield',
      fieldLabel: 'Product Name',
      name: 'name',
      required: true,
      value: record ? record.get('name') : ''
    }, {
      xtype: 'cin7combobox',
      fieldLabel: 'Category',
      name: 'category',
      store: ['Electronics', 'Accessories', 'Clothing', 'Home & Garden'],
      value: record ? record.get('category') : ''
    }, {
      xtype: 'cin7numberfield',
      fieldLabel: 'Stock',
      name: 'stock',
      minValue: 0,
      value: record ? record.get('stock') : 0
    }, {
      xtype: 'cin7numberfield',
      fieldLabel: 'Price',
      name: 'price',
      minValue: 0,
      decimalPrecision: 2,
      prefix: '$',
      value: record ? record.get('price') : 0
    }],
    buttons: [{
      text: 'Cancel',
      handler: () => form.close()
    }, {
      text: 'Save',
      xtype: 'cin7button',
      variant: 'primary',
      handler: () => {
        if (form.isValid()) {
          // Save logic here
          form.close();
        }
      }
    }]
  });
  
  form.show();
}

// Helper functions
function generateInventoryData(count: number) {
  const products = [];
  const categories = ['Electronics', 'Accessories', 'Clothing', 'Home & Garden'];
  const statuses = ['active', 'low-stock', 'out-of-stock', 'discontinued'];
  
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      sku: `SKU-${1000 + i}`,
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      stock: Math.floor(Math.random() * 200),
      price: Math.random() * 200 + 10,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return products;
}

function generateOrderData(count: number) {
  const orders = [];
  const customers = ['Acme Corp', 'TechStart Inc', 'Global Traders', 'Local Shop', 'Enterprise Co'];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  for (let i = 1; i <= count; i++) {
    orders.push({
      id: i,
      orderNumber: `ORD-${2000 + i}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      items: Math.floor(Math.random() * 10) + 1,
      total: Math.random() * 5000 + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return orders;
}

// Additional views
function loadCustomers(panel: any) {
  panel.removeAll();
  panel.add({
    xtype: 'panel',
    title: 'Customer Management',
    html: '<div style="padding: 20px;">Customer management interface would go here...</div>'
  });
}

function loadReports(panel: any) {
  panel.removeAll();
  panel.add({
    xtype: 'panel',
    title: 'Reports & Analytics',
    layout: 'fit',
    items: [{
      xtype: 'cin7barchart',
      store: {
        fields: ['category', 'sales'],
        data: [
          { category: 'Electronics', sales: 45000 },
          { category: 'Accessories', sales: 28000 },
          { category: 'Clothing', sales: 35000 },
          { category: 'Home & Garden', sales: 22000 }
        ]
      },
      axes: [{
        type: 'numeric',
        position: 'left',
        title: 'Sales ($)',
        grid: true
      }, {
        type: 'category',
        position: 'bottom',
        title: 'Category'
      }],
      series: [{
        type: 'bar',
        xField: 'category',
        yField: 'sales',
        label: {
          display: 'insideEnd',
          field: 'sales',
          renderer: (value: number) => `$${(value / 1000).toFixed(0)}k`
        }
      }]
    }]
  });
}