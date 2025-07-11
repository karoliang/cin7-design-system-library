/**
 * Helper utilities for ExtJS components
 */

/**
 * Create ExtJS component with Cin7 defaults
 */
export function createComponent(xtype: string, config: any): any {
  const Ext = (window as any).Ext;
  if (!Ext) {
    throw new Error('ExtJS not found. Make sure Ext is loaded before using Cin7 adapters.');
  }

  // Apply Cin7 defaults based on xtype
  const defaults = getDefaultsForXType(xtype);
  const mergedConfig = Ext.apply({}, defaults, config);

  return Ext.create(mergedConfig.xclass || xtype, mergedConfig);
}

/**
 * Get default configuration for component type
 */
function getDefaultsForXType(xtype: string): any {
  const defaults: Record<string, any> = {
    'grid.Panel': {
      cls: 'cin7-grid',
      rowLines: false,
      columnLines: false,
      enableColumnHide: false,
      enableColumnMove: true,
      enableColumnResize: true,
    },
    'form.Panel': {
      cls: 'cin7-form',
      bodyPadding: 20,
      defaults: {
        labelAlign: 'top',
        msgTarget: 'under',
      },
    },
    'panel.Panel': {
      cls: 'cin7-panel',
      border: false,
      bodyBorder: false,
    },
    'button.Button': {
      cls: 'cin7-button',
      scale: 'medium',
    },
  };

  // Map xtype to class name
  const xtypeToClass: Record<string, string> = {
    'grid': 'grid.Panel',
    'gridpanel': 'grid.Panel',
    'form': 'form.Panel',
    'formpanel': 'form.Panel',
    'panel': 'panel.Panel',
    'button': 'button.Button',
  };

  const className = xtypeToClass[xtype] || xtype;
  return defaults[className] || {};
}

/**
 * Apply Cin7 styling to existing component
 */
export function applyCin7Styling(component: any): void {
  if (!component || !component.el) {
    return;
  }

  // Add Cin7 class
  component.addCls('cin7-component');

  // Apply specific styling based on xtype
  const xtype = component.xtype;
  if (xtype) {
    component.addCls(`cin7-${xtype}`);
  }
}

/**
 * Create store with Cin7 defaults
 */
export function createStore(config: any): any {
  const Ext = (window as any).Ext;
  if (!Ext) {
    throw new Error('ExtJS not found');
  }

  const defaults = {
    pageSize: 25,
    remoteSort: true,
    remoteFilter: true,
    leadingBufferZone: 50,
    trailingBufferZone: 50,
  };

  return Ext.create('Ext.data.Store', Ext.apply(defaults, config));
}

/**
 * Format number for display
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(value);
}

/**
 * Format date
 */
export function formatDate(value: Date | string, format: string = 'short'): string {
  if (!value) {
    return '';
  }
  
  const date = value instanceof Date ? value : new Date(value);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const options: Intl.DateTimeFormatOptions = 
    format === 'short' ? { year: 'numeric', month: '2-digit', day: '2-digit' } :
    format === 'long' ? { year: 'numeric', month: 'long', day: 'numeric' } :
    { year: 'numeric', month: 'short', day: 'numeric' };
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * Debounce function for event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get icon class for Cin7 icons
 */
export function getIconClass(iconName: string): string {
  // Map common icons to ExtJS icon classes
  const iconMap: Record<string, string> = {
    'plus': 'x-fa fa-plus',
    'minus': 'x-fa fa-minus',
    'edit': 'x-fa fa-edit',
    'delete': 'x-fa fa-trash',
    'save': 'x-fa fa-save',
    'cancel': 'x-fa fa-times',
    'refresh': 'x-fa fa-refresh',
    'search': 'x-fa fa-search',
    'filter': 'x-fa fa-filter',
    'export': 'x-fa fa-download',
    'import': 'x-fa fa-upload',
    'settings': 'x-fa fa-cog',
    'info': 'x-fa fa-info-circle',
    'warning': 'x-fa fa-exclamation-triangle',
    'error': 'x-fa fa-times-circle',
    'success': 'x-fa fa-check-circle',
  };
  
  return iconMap[iconName] || `x-fa fa-${iconName}`;
}