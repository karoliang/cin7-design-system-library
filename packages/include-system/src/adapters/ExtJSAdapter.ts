/**
 * ExtJS Adapter - Handles ExtJS component generation
 */

import {
  LanguageAdapter,
  ResolvedInclude,
  SupportedLanguage,
  ComponentVariation
} from '../types/IncludeSystem';

export class ExtJSAdapter implements LanguageAdapter {
  language: SupportedLanguage = 'extjs';

  generateImport(resolved: ResolvedInclude): string {
    const { component, variation } = resolved;

    // ExtJS components typically use require or are global
    if (variation.importPath === '@cin7/extjs-adapters') {
      return `const { ${component.name} } = require('${variation.importPath}');`;
    } else {
      return `// ExtJS ${component.name} will be available globally`;
    }
  }

  generateCode(resolved: ResolvedInclude): string {
    const { component, variation, statement } = resolved;
    const instanceName = this.toCamelCase(component.name);

    // Generate ExtJS component usage based on variation
    switch (component.name) {
      case 'DataGrid':
        return this.generateDataGridCode(instanceName, statement.variation);
      case 'ComboBox':
        return this.generateComboBoxCode(instanceName, statement.variation);
      case 'FormPanel':
        return this.generateFormPanelCode(instanceName, statement.variation);
      default:
        return this.generateDefaultExtJSCode(component.name, instanceName, statement.variation);
    }
  }

  validateVariation(variation: ComponentVariation): boolean {
    // ExtJS components have specific configurations
    return true;
  }

  getDependencies(variation: ComponentVariation): string[] {
    // ExtJS dependencies are typically global
    return variation.dependencies || [];
  }

  private generateDataGridCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'DataGrid');
    const configStr = this.formatExtJSConfig(config);

    return `const ${instanceName} = Ext.create('Ext.grid.Panel', {
  ${configStr}
});`;
  }

  private generateComboBoxCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'ComboBox');
    const configStr = this.formatExtJSConfig(config);

    return `const ${instanceName} = Ext.create('Ext.form.field.ComboBox', {
  ${configStr}
});`;
  }

  private generateFormPanelCode(instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, 'FormPanel');
    const configStr = this.formatExtJSConfig(config);

    return `const ${instanceName} = Ext.create('Ext.form.Panel', {
  ${configStr}
});`;
  }

  private generateDefaultExtJSCode(componentName: string, instanceName: string, variation: string): string {
    const config = this.getVariationConfig(variation, componentName);
    const configStr = this.formatExtJSConfig(config);

    return `const ${instanceName} = Ext.create('Ext.Component', {
  ${configStr}
});`;
  }

  private getVariationConfig(variation: string, component: string): Record<string, any> {
    const configs: Record<string, Record<string, any>> = {
      // DataGrid variations
      'default': {
        title: 'Data Grid',
        store: Ext.create('Ext.data.Store', {
          fields: ['name', 'email', 'phone'],
          data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' }
          ]
        }),
        columns: [
          { text: 'Name', dataIndex: 'name', flex: 1 },
          { text: 'Email', dataIndex: 'email', flex: 1 },
          { text: 'Phone', dataIndex: 'phone', flex: 1 }
        ],
        height: 300,
        width: 600
      },
      'enterprise': {
        title: 'Enterprise Data Grid',
        features: ['grouping', 'filters', 'summary'],
        store: Ext.create('Ext.data.Store', {
          fields: ['name', 'email', 'phone', 'department'],
          groupField: 'department',
          data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224', department: 'IT' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234', department: 'Sales' }
          ]
        }),
        columns: [
          { text: 'Name', dataIndex: 'name', flex: 1 },
          { text: 'Email', dataIndex: 'email', flex: 1 },
          { text: 'Phone', dataIndex: 'phone', flex: 1 },
          { text: 'Department', dataIndex: 'department', flex: 1 }
        ],
        height: 400,
        width: 800
      },
      'compact': {
        title: 'Compact Grid',
        store: Ext.create('Ext.data.Store', {
          fields: ['name', 'status'],
          data: [
            { name: 'Task 1', status: 'Complete' },
            { name: 'Task 2', status: 'In Progress' }
          ]
        }),
        columns: [
          { text: 'Task', dataIndex: 'name', flex: 2 },
          { text: 'Status', dataIndex: 'status', flex: 1 }
        ],
        height: 200,
        width: 400
      },

      // ComboBox variations
      'default': {
        fieldLabel: 'Select Option',
        store: ['Option 1', 'Option 2', 'Option 3'],
        queryMode: 'local',
        editable: false
      },
      'abc': {
        fieldLabel: 'ABC Configuration',
        store: ['A', 'B', 'C'],
        queryMode: 'local',
        editable: false,
        value: 'A'
      },
      'search': {
        fieldLabel: 'Search',
        store: Ext.create('Ext.data.Store', {
          fields: ['name', 'value'],
          data: [
            { name: 'Option 1', value: 'opt1' },
            { name: 'Option 2', value: 'opt2' }
          ]
        }),
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        typeAhead: true
      },

      // FormPanel variations
      'default': {
        title: 'Form',
        bodyPadding: 10,
        items: [
          { xtype: 'textfield', fieldLabel: 'Name', name: 'name' },
          { xtype: 'textfield', fieldLabel: 'Email', name: 'email' },
          { xtype: 'button', text: 'Submit', formBind: true }
        ]
      },
      'settings': {
        title: 'Settings',
        bodyPadding: 10,
        items: [
          { xtype: 'checkboxfield', fieldLabel: 'Enable notifications', name: 'notifications' },
          { xtype: 'numberfield', fieldLabel: 'Items per page', name: 'pageSize', value: 25 },
          { xtype: 'button', text: 'Save Settings', formBind: true }
        ]
      }
    };

    return configs[variation] || {};
  }

  private formatExtJSConfig(config: Record<string, any>): string {
    return Object.entries(config)
      .filter(([_, value]) => value !== undefined && value !== {})
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}: '${value}'`;
        } else if (typeof value === 'object' && value !== null) {
          return `${key}: ${this.formatObject(value)}`;
        } else if (typeof value === 'function') {
          return `${key}: ${value.toString()}`;
        } else {
          return `${key}: ${value}`;
        }
      })
      .join(',\n  ');
  }

  private formatObject(obj: any): string {
    if (Array.isArray(obj)) {
      return `[${obj.map(item => this.formatValue(item)).join(', ')}]`;
    } else if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj)
        .map(([key, value]) => `${key}: ${this.formatValue(value)}`)
        .join(', ');
      return `{ ${entries} }`;
    }
    return String(obj);
  }

  private formatValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value}'`;
    } else if (typeof value === 'object' && value !== null) {
      return this.formatObject(value);
    }
    return String(value);
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}