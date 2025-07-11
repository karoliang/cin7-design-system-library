/**
 * Cin7 TextField component
 */

import { Cin7Component, Cin7Validatable } from './base';
import { validationToValidators } from '../utilities';

export class Cin7TextField extends Cin7Component {
  static xtype = 'cin7textfield';

  static register(): void {
    this.define('Cin7.form.field.Text', {
      extend: 'Ext.form.field.Text',
      xtype: this.xtype,
      mixins: [Cin7Validatable],
      
      config: {
        labelAlign: 'top',
        msgTarget: 'under',
        required: false,
        helpText: null,
        prefix: null,
        suffix: null,
        validation: null,
      },

      initComponent: function() {
        // Apply validation
        if (this.validation) {
          this.validators = validationToValidators(this.validation);
        }
        
        // Apply required
        if (this.required) {
          this.allowBlank = false;
          this.afterLabelTextTpl = '<span class="cin7-required">*</span>';
        }
        
        // Apply help text
        if (this.helpText) {
          this.afterSubTpl = `<div class="cin7-help-text">${this.helpText}</div>`;
        }
        
        // Apply prefix/suffix
        if (this.prefix || this.suffix) {
          this.fieldSubTpl = [
            '<div class="cin7-field-wrapper">',
            this.prefix ? `<span class="cin7-field-prefix">${this.prefix}</span>` : '',
            '<input id="{id}" data-ref="inputEl" type="{type}" {inputAttrTpl}',
            ' size="1"',
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
            ' class="{fieldCls} {typeCls} {typeCls}-{ui} {editableCls} {inputCls}" autocomplete="off"/>',
            this.suffix ? `<span class="cin7-field-suffix">${this.suffix}</span>` : '',
            '</div>',
            {
              disableFormats: true
            }
          ];
        }
        
        this.callParent();
      },

      onChange: function(newValue: string, oldValue: string) {
        this.callParent(arguments);
        
        // Fire Cin7 event
        this.fireEvent('cin7:change', this, newValue, oldValue);
      },

      onFocus: function() {
        this.callParent(arguments);
        this.addCls('cin7-focused');
      },

      onBlur: function() {
        this.callParent(arguments);
        this.removeCls('cin7-focused');
        
        // Validate on blur
        if (this.validateOnBlur !== false) {
          this.validate();
        }
      },
    });
  }
}

// Email field variant
export class Cin7EmailField extends Cin7Component {
  static xtype = 'cin7emailfield';

  static register(): void {
    this.define('Cin7.form.field.Email', {
      extend: 'Cin7.form.field.Text',
      xtype: this.xtype,
      
      vtype: 'email',
      inputType: 'email',
      
      initComponent: function() {
        this.prefix = this.prefix || '<i class="x-fa fa-envelope"></i>';
        this.callParent();
      },
    });
  }
}

// Search field variant
export class Cin7SearchField extends Cin7Component {
  static xtype = 'cin7searchfield';

  static register(): void {
    this.define('Cin7.form.field.Search', {
      extend: 'Cin7.form.field.Text',
      xtype: this.xtype,
      
      triggers: {
        clear: {
          cls: 'x-form-clear-trigger',
          hidden: true,
          handler: 'onClearClick',
        },
        search: {
          cls: 'x-form-search-trigger',
          handler: 'onSearchClick',
        },
      },
      
      initComponent: function() {
        this.emptyText = this.emptyText || 'Search...';
        this.cls = (this.cls || '') + ' cin7-search-field';
        this.callParent();
      },

      onChange: function(newValue: string) {
        this.callParent(arguments);
        this.getTrigger('clear').setHidden(!newValue);
        
        // Debounced search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.fireEvent('cin7:search', this, newValue);
        }, 300);
      },

      onClearClick: function() {
        this.setValue('');
        this.focus();
      },

      onSearchClick: function() {
        this.fireEvent('cin7:search', this, this.getValue());
      },
    });
  }
}