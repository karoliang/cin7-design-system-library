/**
 * Base class for Cin7-enhanced ExtJS components
 */

export interface Cin7ComponentConfig {
  xtype?: string;
  cls?: string;
  cin7Config?: {
    variant?: string;
    size?: string;
    tone?: string;
    interactive?: boolean;
  };
}

/**
 * Base class for all Cin7 ExtJS components
 */
export class Cin7Component {
  static xtype: string = 'cin7component';
  
  /**
   * Define a new Cin7 component
   */
  static define(className: string, config: any): void {
    const Ext = (window as any).Ext;
    if (!Ext) {
      console.warn('ExtJS not found. Component definition deferred.');
      return;
    }

    // Ensure Cin7 styling is applied
    const originalInitComponent = config.initComponent;
    config.initComponent = function(this: any) {
      // Add Cin7 base class
      this.cls = this.cls ? `${this.cls} cin7-component` : 'cin7-component';
      
      // Add specific component class
      if (config.xtype) {
        this.cls += ` cin7-${config.xtype}`;
      }
      
      // Apply Cin7 config
      if (this.cin7Config) {
        applyCin7Config.call(this, this.cin7Config);
      }
      
      // Call original initComponent
      if (originalInitComponent) {
        originalInitComponent.call(this);
      } else if (this.callParent) {
        this.callParent();
      }
    };

    // Define the component
    Ext.define(className, config);
  }

  /**
   * Create a Cin7 component instance
   */
  static create(config: any): any {
    const Ext = (window as any).Ext;
    if (!Ext) {
      throw new Error('ExtJS not found');
    }

    // Apply defaults
    const defaults = {
      cls: 'cin7-component',
    };

    return Ext.create(Ext.apply(defaults, config));
  }
}

/**
 * Apply Cin7-specific configuration
 */
function applyCin7Config(this: any, cin7Config: any): void {
  if (cin7Config.variant) {
    this.cls += ` cin7-${cin7Config.variant}`;
  }
  
  if (cin7Config.size) {
    this.cls += ` cin7-size-${cin7Config.size}`;
  }
  
  if (cin7Config.tone) {
    this.cls += ` cin7-tone-${cin7Config.tone}`;
  }
  
  if (cin7Config.interactive) {
    // Add hover and focus handlers
    this.on('afterrender', function(this: any) {
      if (this.el) {
        this.el.on('mouseenter', () => this.addCls('cin7-hover'));
        this.el.on('mouseleave', () => this.removeCls('cin7-hover'));
        this.el.on('focus', () => this.addCls('cin7-focused'));
        this.el.on('blur', () => this.removeCls('cin7-focused'));
      }
    });
  }
}

/**
 * Mixin for components that support Cin7 theming
 */
export const Cin7Themeable = {
  /**
   * Update component theme
   */
  updateTheme(theme: 'light' | 'dark'): void {
    if (this.el) {
      this.el.dom.setAttribute('data-theme', theme);
    }
  },

  /**
   * Get current theme
   */
  getTheme(): string {
    if (this.el && this.el.dom) {
      return this.el.dom.getAttribute('data-theme') || 'light';
    }
    return 'light';
  },
};

/**
 * Mixin for components that support loading states
 */
export const Cin7Loadable = {
  /**
   * Show loading state
   */
  setLoading(loading: boolean, message?: string): void {
    if (loading) {
      this.mask(message || 'Loading...');
      this.addCls('cin7-loading');
    } else {
      this.unmask();
      this.removeCls('cin7-loading');
    }
  },
};

/**
 * Mixin for components with validation
 */
export const Cin7Validatable = {
  /**
   * Validate component
   */
  validate(): boolean {
    const isValid = this.isValid ? this.isValid() : true;
    
    if (isValid) {
      this.removeCls('cin7-invalid');
      this.addCls('cin7-valid');
    } else {
      this.removeCls('cin7-valid');
      this.addCls('cin7-invalid');
    }
    
    return isValid;
  },

  /**
   * Clear validation state
   */
  clearValidation(): void {
    this.removeCls('cin7-invalid');
    this.removeCls('cin7-valid');
  },
};