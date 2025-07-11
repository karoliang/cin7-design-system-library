/**
 * Cin7 Grid Panel
 */

import { Cin7Component } from '../components/base';
import { createStore } from '../utilities';

export class Cin7Grid extends Cin7Component {
  static xtype = 'cin7grid';

  static register(): void {
    this.define('Cin7.grid.Panel', {
      extend: 'Ext.grid.Panel',
      xtype: this.xtype,
      
      config: {
        striped: true,
        hoverable: true,
        resizable: true,
        sortable: true,
        columnMenu: true,
        emptyText: 'No data to display',
        loadingText: 'Loading...',
      },

      initComponent: function() {
        // Apply striped rows
        if (this.striped) {
          this.stripeRows = true;
          this.cls = (this.cls || '') + ' cin7-grid-striped';
        }
        
        // Apply hoverable rows
        if (this.hoverable) {
          this.trackMouseOver = true;
          this.cls = (this.cls || '') + ' cin7-grid-hoverable';
        }
        
        // Default view config
        this.viewConfig = Ext.apply({
          loadingText: this.loadingText,
          emptyText: `<div class="cin7-empty-state">${this.emptyText}</div>`,
          deferEmptyText: false,
          markDirty: false,
        }, this.viewConfig);
        
        // Default selection model
        if (!this.selModel) {
          this.selModel = {
            type: 'rowmodel',
            mode: 'MULTI',
          };
        }
        
        // Apply column defaults
        if (this.columns) {
          this.columns = this.columns.map((col: any) => {
            return Ext.apply({
              menuDisabled: !this.columnMenu,
              resizable: this.resizable,
              sortable: this.sortable,
            }, col);
          });
        }
        
        this.callParent();
      },

      // Enhanced methods
      exportData: function(format: 'csv' | 'json' | 'excel') {
        const data = this.getStore().getData();
        const columns = this.getColumns();
        
        this.fireEvent('cin7:export', this, data, columns, format);
      },

      refreshData: function() {
        this.getStore().reload();
        this.fireEvent('cin7:refresh', this);
      },

      getSelectedData: function() {
        const selection = this.getSelection();
        return selection.map((record: any) => record.data);
      },
    });
  }

  /**
   * Create a grid with common defaults
   */
  static create(config: any): any {
    const defaults = {
      xtype: this.xtype,
      flex: 1,
      border: false,
      columnLines: false,
      rowLines: false,
      
      // Default plugins
      plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filter',
      }],
      
      // Default features
      features: [{
        ftype: 'summary',
        dock: 'bottom',
      }],
    };

    // Create store if needed
    if (config.data && !config.store) {
      config.store = createStore({
        data: config.data,
        fields: config.fields,
      });
    }

    return Cin7Component.create(Ext.apply(defaults, config));
  }
}

// Infinite scrolling grid variant
export class Cin7BufferedGrid extends Cin7Component {
  static xtype = 'cin7bufferedgrid';

  static register(): void {
    this.define('Cin7.grid.BufferedPanel', {
      extend: 'Cin7.grid.Panel',
      xtype: this.xtype,
      
      config: {
        pageSize: 50,
        leadingBufferZone: 100,
        trailingBufferZone: 50,
      },

      initComponent: function() {
        // Apply buffered rendering
        this.plugins = (this.plugins || []).concat({
          ptype: 'bufferedrenderer',
          leadingBufferZone: this.leadingBufferZone,
          trailingBufferZone: this.trailingBufferZone,
        });
        
        // Configure store for remote paging
        if (this.store) {
          Ext.apply(this.store, {
            pageSize: this.pageSize,
            buffered: true,
            remoteSort: true,
            remoteFilter: true,
          });
        }
        
        this.callParent();
      },
    });
  }
}