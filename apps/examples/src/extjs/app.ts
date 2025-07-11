/**
 * ExtJS Application configuration
 */

// Register custom column types
Ext.define('Cin7.grid.column.Currency', {
  extend: 'Ext.grid.column.Number',
  alias: 'widget.cin7currencycolumn',
  
  renderer: function(value: number) {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
});

Ext.define('Cin7.grid.column.Status', {
  extend: 'Ext.grid.column.Column',
  alias: 'widget.cin7statuscolumn',
  
  renderer: function(value: string) {
    const statusMap: any = {
      'active': { color: 'success', label: 'Active' },
      'inactive': { color: 'critical', label: 'Inactive' },
      'pending': { color: 'warning', label: 'Pending' },
      'low-stock': { color: 'warning', label: 'Low Stock' },
      'out-of-stock': { color: 'critical', label: 'Out of Stock' },
      'discontinued': { color: 'subdued', label: 'Discontinued' }
    };
    
    const status = statusMap[value] || { color: 'default', label: value };
    return `<span class="cin7-badge cin7-badge--${status.color}">${status.label}</span>`;
  }
});

Ext.define('Cin7.grid.column.Action', {
  extend: 'Ext.grid.column.Action',
  alias: 'widget.cin7actioncolumn',
  
  initComponent: function() {
    // Apply Cin7 styling to action icons
    if (this.items) {
      this.items = this.items.map((item: any) => ({
        ...item,
        iconCls: item.icon ? `x-fa fa-${item.icon}` : item.iconCls,
        getClass: function() {
          return 'cin7-action-icon';
        }
      }));
    }
    this.callParent();
  }
});

// Custom components
Ext.define('Cin7.form.field.Number', {
  extend: 'Ext.form.field.Number',
  alias: 'widget.cin7numberfield',
  
  fieldSubTpl: [
    '<div class="cin7-field-wrapper">',
    '<tpl if="prefix"><span class="cin7-field-prefix">{prefix}</span></tpl>',
    '<input id="{id}" data-ref="inputEl" type="{type}" {inputAttrTpl}',
    ' size="1"',
    '<tpl if="name"> name="{name}"</tpl>',
    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
    '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
    '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
    '<tpl if="readOnly"> readonly="readonly"</tpl>',
    '<tpl if="disabled"> disabled="disabled"</tpl>',
    '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
    '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
    ' class="{fieldCls} {typeCls} {editableCls} {inputCls}" autocomplete="off"/>',
    '<tpl if="suffix"><span class="cin7-field-suffix">{suffix}</span></tpl>',
    '</div>',
    {
      disableFormats: true
    }
  ],
  
  initComponent: function() {
    if (this.prefix === '$') {
      this.prefix = '<i class="x-fa fa-dollar"></i>';
    }
    this.callParent();
  }
});

Ext.define('Cin7.form.field.ComboBox', {
  extend: 'Ext.form.field.ComboBox',
  alias: 'widget.cin7combobox',
  
  queryMode: 'local',
  displayField: 'text',
  valueField: 'value',
  editable: false,
  
  initComponent: function() {
    // Convert simple array to store
    if (Array.isArray(this.store)) {
      this.store = this.store.map(item => 
        typeof item === 'string' ? { text: item, value: item } : item
      );
    }
    this.callParent();
  }
});