/**
 * Cin7 Button component
 */

import { Cin7Component } from './base';
import { buttonVariantToUI, sizeToScale, getIconClass } from '../utilities';

export class Cin7Button extends Cin7Component {
  static xtype = 'cin7button';

  static register(): void {
    this.define('Cin7.button.Button', {
      extend: 'Ext.button.Button',
      xtype: this.xtype,
      
      config: {
        variant: 'secondary',
        size: 'medium',
        fullWidth: false,
        loading: false,
        icon: null,
      },

      initComponent: function() {
        // Apply variant UI
        this.ui = buttonVariantToUI(this.variant);
        
        // Apply size scale
        this.scale = sizeToScale(this.size);
        
        // Apply icon if specified
        if (this.icon) {
          this.iconCls = getIconClass(this.icon);
        }
        
        // Apply full width
        if (this.fullWidth) {
          this.cls = (this.cls || '') + ' cin7-button-fullwidth';
        }
        
        // Apply loading state
        if (this.loading) {
          this.disabled = true;
          this.cls = (this.cls || '') + ' cin7-button-loading';
        }
        
        this.callParent();
      },

      setLoading: function(loading: boolean) {
        this.loading = loading;
        this.setDisabled(loading);
        
        if (loading) {
          this.addCls('cin7-button-loading');
          this.setText('<span class="cin7-spinner"></span> ' + (this.loadingText || this.text));
        } else {
          this.removeCls('cin7-button-loading');
          this.setText(this.text);
        }
      },

      setVariant: function(variant: string) {
        // Remove old UI class
        const oldUI = buttonVariantToUI(this.variant);
        this.removeCls(`x-btn-${oldUI}`);
        
        // Apply new UI
        this.variant = variant;
        this.ui = buttonVariantToUI(variant);
        this.addCls(`x-btn-${this.ui}`);
      },
    });
  }
}

// Additional button variants
export class Cin7SplitButton extends Cin7Component {
  static xtype = 'cin7splitbutton';

  static register(): void {
    this.define('Cin7.button.Split', {
      extend: 'Ext.button.Split',
      xtype: this.xtype,
      
      config: {
        variant: 'secondary',
        size: 'medium',
      },

      initComponent: function() {
        this.ui = buttonVariantToUI(this.variant);
        this.scale = sizeToScale(this.size);
        this.callParent();
      },
    });
  }
}

// Icon button
export class Cin7IconButton extends Cin7Component {
  static xtype = 'cin7iconbutton';

  static register(): void {
    this.define('Cin7.button.Icon', {
      extend: 'Ext.button.Button',
      xtype: this.xtype,
      
      config: {
        size: 'medium',
        icon: 'help',
        tooltip: null,
      },

      initComponent: function() {
        this.iconCls = getIconClass(this.icon);
        this.cls = (this.cls || '') + ' cin7-icon-button';
        this.scale = sizeToScale(this.size);
        
        // Remove text for icon-only button
        this.text = '';
        
        // Add tooltip if specified
        if (this.tooltip) {
          this.setTooltip(this.tooltip);
        }
        
        this.callParent();
      },
    });
  }
}