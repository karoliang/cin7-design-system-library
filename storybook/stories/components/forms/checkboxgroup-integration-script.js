/**
 * Integration Script for CheckboxGroup Code Variants
 * 
 * This script contains all 9 code variants for CheckboxGroup stories.
 * Copy this entire checkboxGroupExamples object and replace the existing one
 * in codeVariants.ts starting at approximately line 21029
 */

export const checkboxGroupExamples = {
  default: {
    react: `import {Checkbox, BlockStack, Text, Card} from '@shopify/polaris';
import React, {useState} from 'react';

function CheckboxGroup() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
    mail: false,
  });

  const handleCheckboxChange = (key: keyof typeof preferences) =>
    (checked: boolean) => {
      setPreferences(prev => ({...prev, [key]: checked}));
    };

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">
          Notification Preferences
        </Text>

        <Checkbox
          label="Email notifications"
          checked={preferences.email}
          onChange={handleCheckboxChange('email')}
          helpText="Receive updates and announcements via email"
        />

        <Checkbox
          label="SMS notifications"
          checked={preferences.sms}
          onChange={handleCheckboxChange('sms')}
          helpText="Get text alerts for urgent updates"
        />

        <Checkbox
          label="Push notifications"
          checked={preferences.push}
          onChange={handleCheckboxChange('push')}
          helpText="Receive browser push notifications"
        />

        <Checkbox
          label="Mail notifications"
          checked={preferences.mail}
          onChange={handleCheckboxChange('mail')}
          helpText="Receive physical mail for important documents"
        />
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Notification Preferences',
  bodyPadding: 16,
  width: 400,
  items: [{
    xtype: 'checkboxgroup',
    fieldLabel: 'Select Preferences',
    vertical: true,
    columns: 1,
    items: [{
      boxLabel: 'Email notifications',
      name: 'email',
      checked: true,
      listeners: {
        change: function(field, checked) {
          console.log('Email notifications:', checked);
        }
      }
    }, {
      boxLabel: 'SMS notifications',
      name: 'sms',
      checked: false,
      listeners: {
        change: function(field, checked) {
          console.log('SMS notifications:', checked);
        }
      }
    }, {
      boxLabel: 'Push notifications',
      name: 'push',
      checked: true,
      listeners: {
        change: function(field, checked) {
          console.log('Push notifications:', checked);
        }
      }
    }, {
      boxLabel: 'Mail notifications',
      name: 'mail',
      checked: false,
      listeners: {
        change: function(field, checked) {
          console.log('Mail notifications:', checked);
        }
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="checkbox-group">
  <h3 class="checkbox-group__title">Notification Preferences</h3>

  <div class="checkbox-field">
    <input type="checkbox" id="email-notif" checked />
    <label for="email-notif">
      <span class="checkbox-label">Email notifications</span>
      <span class="checkbox-help">Receive updates and announcements via email</span>
    </label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="sms-notif" />
    <label for="sms-notif">
      <span class="checkbox-label">SMS notifications</span>
      <span class="checkbox-help">Get text alerts for urgent updates</span>
    </label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="push-notif" checked />
    <label for="push-notif">
      <span class="checkbox-label">Push notifications</span>
      <span class="checkbox-help">Receive browser push notifications</span>
    </label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="mail-notif" />
    <label for="mail-notif">
      <span class="checkbox-label">Mail notifications</span>
      <span class="checkbox-help">Receive physical mail for important documents</span>
    </label>
  </div>
</div>

<script>
const checkboxes = document.querySelectorAll('.checkbox-field input');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const label = e.target.nextElementSibling.querySelector('.checkbox-label').textContent;
    console.log(\`\${label}: \${isChecked}\`);
  });
});
</script>`,
    typescript: `import {Checkbox, BlockStack, Text, Card} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface CheckboxGroupProps {
  title?: string;
  defaultValues?: Record<string, boolean>;
  onPreferencesChange?: (preferences: Record<string, boolean>) => void;
}

interface PreferenceItem {
  key: string;
  label: string;
  helpText: string;
}

function CheckboxGroup({
  title = 'Notification Preferences',
  defaultValues = {email: true, sms: false, push: true, mail: false},
  onPreferencesChange
}: CheckboxGroupProps): JSX.Element {
  const [preferences, setPreferences] = useState<Record<string, boolean>>(
    defaultValues
  );

  const items: PreferenceItem[] = [
    {key: 'email', label: 'Email notifications', helpText: 'Receive updates and announcements via email'},
    {key: 'sms', label: 'SMS notifications', helpText: 'Get text alerts for urgent updates'},
    {key: 'push', label: 'Push notifications', helpText: 'Receive browser push notifications'},
    {key: 'mail', label: 'Mail notifications', helpText: 'Receive physical mail for important documents'}
  ];

  const handleCheckboxChange = useCallback((key: string) =>
    (checked: boolean) => {
      const newPreferences = {...preferences, [key]: checked};
      setPreferences(newPreferences);
      onPreferencesChange?.(newPreferences);
    }, [preferences, onPreferencesChange]
  );

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">{title}</Text>
        {items.map(item => (
          <Checkbox
            key={item.key}
            label={item.label}
            checked={preferences[item.key]}
            onChange={handleCheckboxChange(item.key)}
            helpText={item.helpText}
          />
        ))}
      </BlockStack>
    </Card>
  );
}`
  }
};

console.log('CheckboxGroup code variants ready for integration');
console.log('Total variants:', Object.keys(checkboxGroupExamples).length);
