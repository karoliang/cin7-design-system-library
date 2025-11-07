#!/usr/bin/env python3
"""
Script to add DatePicker code variants to codeVariants.ts
"""

# Read the file
with open('/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts', 'r') as f:
    content = f.read()

# Find the position to insert (after the closing brace of datePickerExamples default variant)
marker = """export default DatePickerExample;`
  }
};

// FormLayout Component Examples - Forms"""

# The new variants to insert
new_variants = """,
  dateRange: {
    react: `import { DatePicker, BlockStack, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DateRangeExample() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 7);

  const [selected, setSelected] = useState({start: today, end: tomorrow});
  const [month, setMonth] = useState(selected.start.getMonth());
  const [year, setYear] = useState(selected.start.getFullYear());

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Select Date Range</Text>
      <DatePicker
        month={month}
        year={year}
        onChange={setSelected}
        onMonthChange={(month, year) => {
          setMonth(month);
          setYear(year);
        }}
        selected={selected}
        allowRange
      />
      {selected && (
        <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--color-gray-100)', borderRadius: 'var(--border-radius-md)' }}>
          <Text as="p">
            From: {selected.start.toLocaleDateString()}<br/>
            To: {selected.end.toLocaleDateString()}
          </Text>
        </div>
      )}
    </BlockStack>
  );
}

export default DateRangeExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const startDatePicker = $('#start-date');
const endDatePicker = $('#end-date');
const rangeDisplay = $('#range-display');

function updateRange() {
  const start = startDatePicker.value;
  const end = endDatePicker.value;

  if (start && end) {
    rangeDisplay.textContent = \`From: \${new Date(start).toLocaleDateString()} - To: \${new Date(end).toLocaleDateString()}\`;
    EventBus.emit('dateRange:selected', { start, end });
  }
}

on(startDatePicker, 'change', updateRange);
on(endDatePicker, 'change', updateRange);`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Select Date Range',
  width: 400,
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  items: [{
    xtype: 'datefield',
    fieldLabel: 'Start Date',
    name: 'startDate',
    value: new Date(),
    listeners: {
      change: function(field, newValue) {
        this.up('form').updateRangeDisplay();
      }
    }
  }, {
    xtype: 'datefield',
    fieldLabel: 'End Date',
    name: 'endDate',
    value: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
    listeners: {
      change: function(field, newValue) {
        this.up('form').updateRangeDisplay();
      }
    }
  }, {
    xtype: 'displayfield',
    itemId: 'rangeDisplay',
    fieldLabel: 'Range',
    value: 'Select dates'
  }],
  updateRangeDisplay: function() {
    const start = this.down('[name=startDate]').getValue();
    const end = this.down('[name=endDate]').getValue();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    this.down('#rangeDisplay').setValue(\`\${days} days selected\`);
    EventBus.emit('dateRange:selected', { start, end });
  }
});`,
    typescript: `import { DatePicker, BlockStack, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangeExampleProps {
  onRangeChange?: (range: DateRange) => void;
  initialRange?: DateRange;
}

function DateRangeExample({ onRangeChange, initialRange }: DateRangeExampleProps): JSX.Element {
  const today = new Date();
  const defaultEnd = new Date(today);
  defaultEnd.setDate(defaultEnd.getDate() + 7);

  const [selected, setSelected] = useState<DateRange>(
    initialRange || {start: today, end: defaultEnd}
  );
  const [month, setMonth] = useState(selected.start.getMonth());
  const [year, setYear] = useState(selected.start.getFullYear());

  const handleChange = useCallback((range: DateRange) => {
    setSelected(range);
    onRangeChange?.(range);
  }, [onRangeChange]);

  const handleMonthChange = useCallback((month: number, year: number) => {
    setMonth(month);
    setYear(year);
  }, []);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Select Date Range</Text>
      <DatePicker
        month={month}
        year={year}
        onChange={handleChange}
        onMonthChange={handleMonthChange}
        selected={selected}
        allowRange
      />
      {selected && (
        <div style={{ padding: 'var(--spacing-3)', backgroundColor: 'var(--color-gray-100)', borderRadius: 'var(--border-radius-md)' }}>
          <Text as="p">
            From: {selected.start.toLocaleDateString()}<br/>
            To: {selected.end.toLocaleDateString()}
          </Text>
        </div>
      )}
    </BlockStack>
  );
}

export default DateRangeExample;`
  }
};

// FormLayout Component Examples - Forms"""

# Replace
if marker in content:
    new_content = content.replace(marker, new_variants)

    # Write back
    with open('/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts', 'w') as f:
        f.write(new_content)

    print("✓ Successfully added dateRange variant to DatePicker examples")
else:
    print("✗ Could not find marker in file")
    print("File may have been modified")
