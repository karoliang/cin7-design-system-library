/**
 * Cin7 Panel component
 */

import { Cin7Component, Cin7Themeable, Cin7Loadable } from './base';

export class Cin7Panel extends Cin7Component {
  static xtype = 'cin7panel';

  static register(): void {
    this.define('Cin7.panel.Panel', {
      extend: 'Ext.panel.Panel',
      xtype: this.xtype,
      mixins: [Cin7Themeable, Cin7Loadable],
      
      config: {
        variant: 'default', // default, bordered, elevated, subdued
        spacing: 'base', // none, tight, base, loose
        sectioned: false,
      },

      initComponent: function() {
        // Apply variant styling
        this.cls = (this.cls || '') + ` cin7-panel-${this.variant}`;
        
        // Apply spacing
        this.bodyPadding = this.getSpacingValue(this.spacing);
        
        // Apply sectioned layout
        if (this.sectioned) {
          this.cls += ' cin7-panel-sectioned';
        }
        
        // Default settings
        this.border = this.variant === 'bordered';
        this.shadow = this.variant === 'elevated';
        
        this.callParent();
      },

      getSpacingValue: function(spacing: string): number {
        const spacingMap: Record<string, number> = {
          'none': 0,
          'tight': 12,
          'base': 20,
          'loose': 32,
        };
        return spacingMap[spacing] || 20;
      },

      setVariant: function(variant: string) {
        // Remove old variant class
        this.removeCls(`cin7-panel-${this.variant}`);
        
        // Apply new variant
        this.variant = variant;
        this.addCls(`cin7-panel-${variant}`);
        
        // Update border and shadow
        this.setBorder(variant === 'bordered');
        this.setShadow(variant === 'elevated');
      },
    });
  }
}

// Card variant
export class Cin7Card extends Cin7Component {
  static xtype = 'cin7card';

  static register(): void {
    this.define('Cin7.panel.Card', {
      extend: 'Cin7.panel.Panel',
      xtype: this.xtype,
      
      config: {
        variant: 'elevated',
        interactive: false,
      },

      initComponent: function() {
        this.cls = (this.cls || '') + ' cin7-card';
        
        // Interactive cards
        if (this.interactive) {
          this.cls += ' cin7-card-interactive';
          
          this.on('afterrender', function() {
            this.el.on('click', () => {
              this.fireEvent('cin7:cardclick', this);
            });
          });
        }
        
        this.callParent();
      },
    });
  }
}

// Collapsible section
export class Cin7Section extends Cin7Component {
  static xtype = 'cin7section';

  static register(): void {
    this.define('Cin7.panel.Section', {
      extend: 'Ext.panel.Panel',
      xtype: this.xtype,
      
      collapsible: true,
      animCollapse: true,
      collapseDirection: 'top',
      titleCollapse: true,
      
      config: {
        startCollapsed: false,
      },

      initComponent: function() {
        this.cls = (this.cls || '') + ' cin7-section';
        
        if (this.startCollapsed) {
          this.collapsed = true;
        }
        
        // Custom header tool
        this.tools = [{
          type: 'toggle',
          handler: function(event: any, toolEl: any, panel: any) {
            panel.toggleCollapse();
          },
        }];
        
        this.callParent();
      },

      toggleCollapse: function() {
        this.callParent();
        
        // Fire Cin7 event
        this.fireEvent('cin7:toggle', this, this.collapsed);
      },
    });
  }
}