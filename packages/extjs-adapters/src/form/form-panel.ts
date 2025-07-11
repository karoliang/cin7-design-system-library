/**
 * Cin7 Form Panel
 */

import { Cin7Component } from '../components/base';
import { formValuesToSubmit } from '../utilities';

export class Cin7Form extends Cin7Component {
  static xtype = 'cin7form';

  static register(): void {
    this.define('Cin7.form.Panel', {
      extend: 'Ext.form.Panel',
      xtype: this.xtype,
      
      config: {
        layout: 'form',
        labelAlign: 'top',
        trackResetOnLoad: true,
        standardSubmit: false,
        jsonSubmit: true,
      },

      defaults: {
        anchor: '100%',
        labelAlign: 'top',
        msgTarget: 'under',
      },

      initComponent: function() {
        this.cls = (this.cls || '') + ' cin7-form';
        
        // Default buttons if not provided
        if (!this.buttons && this.showButtons !== false) {
          this.buttons = [
            { 
              text: 'Cancel',
              xtype: 'cin7button',
              variant: 'secondary',
              handler: () => this.onCancelClick(),
            },
            { 
              text: 'Save',
              xtype: 'cin7button',
              variant: 'primary',
              formBind: true,
              handler: () => this.onSaveClick(),
            },
          ];
        }
        
        this.callParent();
        
        // Add form event handlers
        this.on('validitychange', this.onValidityChange, this);
        this.on('dirtychange', this.onDirtyChange, this);
      },

      onValidityChange: function(form: any, valid: boolean) {
        this.fireEvent('cin7:validitychange', this, valid);
      },

      onDirtyChange: function(form: any, dirty: boolean) {
        this.fireEvent('cin7:dirtychange', this, dirty);
      },

      onCancelClick: function() {
        if (this.isDirty()) {
          Ext.Msg.confirm(
            'Unsaved Changes',
            'You have unsaved changes. Are you sure you want to cancel?',
            (btn: string) => {
              if (btn === 'yes') {
                this.reset();
                this.fireEvent('cin7:cancel', this);
              }
            }
          );
        } else {
          this.fireEvent('cin7:cancel', this);
        }
      },

      onSaveClick: function() {
        if (this.isValid()) {
          const values = this.getValues();
          const submitValues = formValuesToSubmit(values);
          
          this.fireEvent('cin7:beforesave', this, submitValues);
          
          if (this.url) {
            this.submit({
              url: this.url,
              jsonData: submitValues,
              success: (form: any, action: any) => {
                this.fireEvent('cin7:save', this, action.result);
              },
              failure: (form: any, action: any) => {
                this.fireEvent('cin7:saveerror', this, action.result);
              },
            });
          } else {
            this.fireEvent('cin7:save', this, submitValues);
          }
        }
      },

      // Enhanced validation
      validateAll: function() {
        const fields = this.getForm().getFields();
        let isValid = true;
        
        fields.each((field: any) => {
          if (!field.validate()) {
            isValid = false;
          }
        });
        
        return isValid;
      },

      // Get form data as object
      getData: function() {
        return this.getValues();
      },

      // Set form data
      setData: function(data: any) {
        this.getForm().setValues(data);
      },
    });
  }

  /**
   * Create a form with common defaults
   */
  static create(config: any): any {
    const defaults = {
      xtype: this.xtype,
      border: false,
      bodyPadding: 20,
      autoScroll: true,
      
      fieldDefaults: {
        labelAlign: 'top',
        anchor: '100%',
        msgTarget: 'under',
      },
    };

    return Cin7Component.create(Ext.apply(defaults, config));
  }
}

// Sectioned form variant
export class Cin7SectionedForm extends Cin7Component {
  static xtype = 'cin7sectionedform';

  static register(): void {
    this.define('Cin7.form.SectionedPanel', {
      extend: 'Cin7.form.Panel',
      xtype: this.xtype,
      
      layout: {
        type: 'vbox',
        align: 'stretch',
      },

      initComponent: function() {
        // Transform items into sections
        if (this.sections) {
          this.items = this.sections.map((section: any) => ({
            xtype: 'cin7section',
            title: section.title,
            collapsible: section.collapsible !== false,
            startCollapsed: section.collapsed,
            items: section.items,
            flex: section.flex || 0,
            margin: '0 0 16 0',
          }));
        }
        
        this.callParent();
      },
    });
  }
}