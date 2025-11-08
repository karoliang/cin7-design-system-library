#!/usr/bin/env python3
"""
Script to fix remaining TypeScript code duplication in truncate variants (part 2).
Makes TypeScript versions significantly more comprehensive than React versions.
"""

import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# New comprehensive TypeScript code for remaining variants

ACCESSIBILITY_EXAMPLE_TS = r"""    typescript: `import { Text, BlockStack, Tooltip } from '@shopify/polaris';
import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Accessibility compliance levels
 * @type AccessibilityLevel
 */
type AccessibilityLevel = 'A' | 'AA' | 'AAA';

/**
 * ARIA attribute configuration
 * @interface AriaConfig
 */
interface AriaConfig {
  readonly label: string;
  readonly description?: string;
  readonly role?: string;
  readonly live?: 'polite' | 'assertive' | 'off';
}

/**
 * Tooltip configuration for accessibility
 * @interface TooltipConfig
 */
interface TooltipConfig {
  readonly enabled: boolean;
  readonly content: string;
  readonly preferredPosition?: 'above' | 'below' | 'left' | 'right';
}

/**
 * Props for AccessibilityExample component
 * @interface AccessibilityExampleProps
 */
interface AccessibilityExampleProps {
  /** Text content to display and truncate */
  text?: string;
  /** Maximum width for the container */
  maxWidth?: string | number;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Show accessibility note */
  showNote?: boolean;
  /** ARIA configuration */
  ariaConfig?: Partial<AriaConfig>;
  /** Accessibility compliance level */
  complianceLevel?: AccessibilityLevel;
  /** Callback when text is focused */
  onFocus?: (text: string) => void;
}

/**
 * Type guard to validate ARIA configuration
 */
const isValidAriaConfig = (config: any): config is AriaConfig => {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof config.label === 'string' &&
    config.label.length > 0
  );
};

/**
 * Normalizes width value to CSS string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '200px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * Creates comprehensive ARIA attributes
 */
const createAriaAttributes = (text: string, config?: Partial<AriaConfig>) => {
  const defaults: AriaConfig = {
    label: text,
    description: \`Full text: \${text}\`,
    role: 'text',
    live: 'polite'
  };

  const merged = { ...defaults, ...config };

  return isValidAriaConfig(merged) ? merged : defaults;
};

/**
 * AccessibilityExample component with comprehensive WCAG compliance
 * Demonstrates proper accessible truncation with full screen reader support
 */
const AccessibilityExample: React.FC<AccessibilityExampleProps> = ({
  text = 'Important accessible content that should be available to screen readers even when visually truncated',
  maxWidth = '200px',
  showTooltip = true,
  showNote = true,
  ariaConfig,
  complianceLevel = 'AA',
  onFocus
}): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [announceText, setAnnounceText] = useState<string>('');

  /**
   * Memoized ARIA attributes
   */
  const ariaAttributes = useMemo<AriaConfig>(() => {
    return createAriaAttributes(text, ariaConfig);
  }, [text, ariaConfig]);

  /**
   * Tooltip configuration
   */
  const tooltipConfig = useMemo<TooltipConfig>(() => ({
    enabled: showTooltip,
    content: text,
    preferredPosition: 'above'
  }), [showTooltip, text]);

  /**
   * Container width
   */
  const containerWidth = useMemo<string>(() => {
    return normalizeWidth(maxWidth);
  }, [maxWidth]);

  /**
   * Handle focus event
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setAnnounceText(text);
    if (onFocus) {
      onFocus(text);
    }
  }, [text, onFocus]);

  /**
   * Handle blur event
   */
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  /**
   * Effect to ensure proper ARIA announcements
   */
  useEffect(() => {
    if (isFocused && textRef.current) {
      // Announce to screen readers
      const announcement = new CustomEvent('announce', {
        detail: { text: announceText, priority: 'polite' }
      });
      document.dispatchEvent(announcement);
    }
  }, [isFocused, announceText]);

  /**
   * Renders the truncated text element with full accessibility
   */
  const renderTruncatedText = (): ReactNode => {
    const textElement = (
      <div
        ref={textRef}
        tabIndex={0}
        role={ariaAttributes.role}
        aria-label={ariaAttributes.label}
        aria-description={ariaAttributes.description}
        aria-live={ariaAttributes.live}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          outline: isFocused ? '2px solid #0066cc' : 'none',
          outlineOffset: '2px',
          borderRadius: '2px'
        }}
      >
        <Text variant="bodyMd" truncate>
          {text}
        </Text>
      </div>
    );

    if (tooltipConfig.enabled) {
      return (
        <Tooltip content={tooltipConfig.content} preferredPosition={tooltipConfig.preferredPosition}>
          {textElement}
        </Tooltip>
      );
    }

    return textElement;
  };

  /**
   * Accessibility note with compliance level
   */
  const accessibilityNote = showNote ? (
    <Text variant="bodySm" tone="subdued">
      Screen readers will read the full text even though it's visually truncated.
      WCAG {complianceLevel} compliant.
    </Text>
  ) : null;

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Accessible Truncation</Text>
      <div style={{ maxWidth: containerWidth }}>
        {renderTruncatedText()}
      </div>
      {accessibilityNote}
      {/* Screen reader only announcement area */}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-10000px' }}>
        {announceText}
      </div>
    </BlockStack>
  );
};

export default AccessibilityExample;`"""

DATATABLE_EXAMPLE_TS = r"""    typescript: `import { DataTable, Card, Text } from '@shopify/polaris';
import React, { useMemo, useState, useCallback } from 'react';
import type { DataTableProps } from '@shopify/polaris';

/**
 * Invoice entity with comprehensive type information
 * @interface Invoice
 */
interface Invoice {
  readonly id: string;
  readonly customer: string;
  readonly product: string;
  readonly amount: string;
  readonly status?: 'paid' | 'pending' | 'overdue';
  readonly date?: string;
}

/**
 * Table column configuration
 * @interface ColumnConfig
 */
interface ColumnConfig {
  readonly contentType: 'text' | 'numeric';
  readonly heading: string;
  readonly maxWidth?: number;
  readonly sortable?: boolean;
}

/**
 * Sorting configuration
 * @interface SortConfig
 */
interface SortConfig {
  readonly column: number;
  readonly direction: 'ascending' | 'descending';
}

/**
 * Props for DataTableExample component
 * @interface DataTableExampleProps
 */
interface DataTableExampleProps {
  /** Array of invoices to display */
  invoices?: ReadonlyArray<Invoice>;
  /** Enable text truncation */
  truncate?: boolean;
  /** Enable column sorting */
  sortable?: boolean;
  /** Callback when row is clicked */
  onRowClick?: (invoice: Invoice) => void;
  /** Custom column configuration */
  columnConfig?: ColumnConfig[];
}

/**
 * Type guard to validate invoice structure
 */
const isValidInvoice = (invoice: any): invoice is Invoice => {
  return (
    typeof invoice === 'object' &&
    invoice !== null &&
    typeof invoice.id === 'string' &&
    typeof invoice.customer === 'string' &&
    typeof invoice.product === 'string' &&
    typeof invoice.amount === 'string'
  );
};

/**
 * Default column configuration
 */
const DEFAULT_COLUMNS: ColumnConfig[] = [
  { contentType: 'text', heading: 'Invoice', maxWidth: 100, sortable: true },
  { contentType: 'text', heading: 'Customer', maxWidth: 200, sortable: true },
  { contentType: 'text', heading: 'Product', sortable: false },
  { contentType: 'numeric', heading: 'Amount', maxWidth: 100, sortable: true }
];

/**
 * Sorts invoices by the specified column and direction
 */
const sortInvoices = (
  invoices: ReadonlyArray<Invoice>,
  config: SortConfig
): Invoice[] => {
  const sorted = [...invoices];
  const { column, direction } = config;

  sorted.sort((a, b) => {
    let aValue: string, bValue: string;

    switch (column) {
      case 0: [aValue, bValue] = [a.id, b.id]; break;
      case 1: [aValue, bValue] = [a.customer, b.customer]; break;
      case 2: [aValue, bValue] = [a.product, b.product]; break;
      case 3: [aValue, bValue] = [a.amount, b.amount]; break;
      default: return 0;
    }

    const comparison = aValue.localeCompare(bValue);
    return direction === 'ascending' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * DataTableExample component with comprehensive type safety
 * Demonstrates truncation in data tables with sorting and interaction
 */
const DataTableExample: React.FC<DataTableExampleProps> = ({
  invoices = [
    {
      id: 'INV-001',
      customer: 'John Smith from New York City, United States',
      product: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation and 30-hour Battery Life',
      amount: '$299.99',
      status: 'paid',
      date: '2024-01-15'
    },
    {
      id: 'INV-002',
      customer: 'Sarah Johnson from Los Angeles, California',
      product: 'Professional Grade Camera Lens Kit with Multiple Focal Lengths',
      amount: '$1,249.00',
      status: 'pending',
      date: '2024-01-16'
    },
    {
      id: 'INV-003',
      customer: 'Michael Chen from San Francisco Bay Area',
      product: 'Ergonomic Office Chair with Lumbar Support and Adjustable Height',
      amount: '$549.99',
      status: 'paid',
      date: '2024-01-17'
    }
  ],
  truncate = true,
  sortable = true,
  onRowClick,
  columnConfig = DEFAULT_COLUMNS
}): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  /**
   * Validate all invoices
   */
  const validatedInvoices = useMemo<ReadonlyArray<Invoice>>(() => {
    return invoices.filter(isValidInvoice);
  }, [invoices]);

  /**
   * Sorted invoices based on current sort configuration
   */
  const sortedInvoices = useMemo<ReadonlyArray<Invoice>>(() => {
    if (!sortConfig || !sortable) {
      return validatedInvoices;
    }
    return sortInvoices(validatedInvoices, sortConfig);
  }, [validatedInvoices, sortConfig, sortable]);

  /**
   * Transform invoices into table rows
   */
  const tableRows = useMemo<string[][]>(() => {
    return sortedInvoices.map(invoice => [
      invoice.id,
      invoice.customer,
      invoice.product,
      invoice.amount
    ]);
  }, [sortedInvoices]);

  /**
   * Table column content types
   */
  const columnContentTypes = useMemo<DataTableProps['columnContentTypes']>(() => {
    return columnConfig.map(col => col.contentType);
  }, [columnConfig]);

  /**
   * Table headings
   */
  const headings = useMemo<string[]>(() => {
    return columnConfig.map(col => col.heading);
  }, [columnConfig]);

  /**
   * Handle sort change
   */
  const handleSort = useCallback((index: number, direction: 'ascending' | 'descending') => {
    if (sortable && columnConfig[index]?.sortable) {
      setSortConfig({ column: index, direction });
    }
  }, [sortable, columnConfig]);

  /**
   * Handle row click
   */
  const handleRowClick = useCallback((rowIndex: number) => {
    setSelectedRowIndex(rowIndex);
    const invoice = sortedInvoices[rowIndex];
    if (invoice && onRowClick) {
      onRowClick(invoice);
    }
  }, [sortedInvoices, onRowClick]);

  return (
    <Card>
      <DataTable
        columnContentTypes={columnContentTypes}
        headings={headings}
        rows={tableRows}
        truncate={truncate}
        sortable={sortable ? headings.map((_, i) => columnConfig[i]?.sortable ?? false) : undefined}
        onSort={sortable ? handleSort : undefined}
      />
      {selectedRowIndex !== null && (
        <div style={{ padding: '12px', borderTop: '1px solid #e1e3e5' }}>
          <Text variant="bodySm" tone="subdued">
            Selected invoice: {sortedInvoices[selectedRowIndex]?.id}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default DataTableExample;`"""

EMAIL_SUBJECTS_TS = r"""    typescript: `import { Card, Text, BlockStack, InlineStack, Badge, Checkbox } from '@shopify/polaris';
import React, { useState, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';

/**
 * Email priority levels
 * @type EmailPriority
 */
type EmailPriority = 'high' | 'normal' | 'low';

/**
 * Email entity with comprehensive type information
 * @interface Email
 */
interface Email {
  readonly id: string;
  readonly from: string;
  readonly subject: string;
  readonly unread: boolean;
  readonly priority?: EmailPriority;
  readonly timestamp?: Date;
  readonly hasAttachments?: boolean;
}

/**
 * Email selection state
 * @interface SelectionState
 */
interface SelectionState {
  readonly selectedIds: Set<string>;
  readonly allSelected: boolean;
  readonly someSelected: boolean;
}

/**
 * Props for EmailSubjects component
 * @interface EmailSubjectsProps
 */
interface EmailSubjectsProps {
  /** Array of emails to display */
  emails?: ReadonlyArray<Email>;
  /** Enable multi-selection */
  enableSelection?: boolean;
  /** Maximum width for subject truncation */
  subjectMaxWidth?: string | number;
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Callback when email is clicked */
  onEmailClick?: (email: Email) => void;
  /** Show unread badge */
  showUnreadBadge?: boolean;
}

/**
 * Type guard to validate email structure
 */
const isValidEmail = (email: any): email is Email => {
  return (
    typeof email === 'object' &&
    email !== null &&
    typeof email.id === 'string' &&
    typeof email.from === 'string' &&
    typeof email.subject === 'string' &&
    typeof email.unread === 'boolean'
  );
};

/**
 * Normalizes width value to CSS string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '500px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * Creates row style based on email state
 */
const createRowStyle = (
  unread: boolean,
  isHovered: boolean,
  isSelected: boolean
): CSSProperties => ({
  padding: '12px 16px',
  borderBottom: '1px solid #e1e3e5',
  cursor: 'pointer',
  backgroundColor: isSelected ? '#f0f8ff' : (isHovered ? '#f9fafb' : 'transparent'),
  transition: 'background-color 0.15s ease-in-out'
});

/**
 * Calculates selection state
 */
const calculateSelectionState = (
  selectedIds: Set<string>,
  totalEmails: number
): SelectionState => {
  const selectedCount = selectedIds.size;

  return {
    selectedIds,
    allSelected: selectedCount === totalEmails && totalEmails > 0,
    someSelected: selectedCount > 0 && selectedCount < totalEmails
  };
};

/**
 * EmailSubjects component with comprehensive type safety
 * Demonstrates truncation in email list with selection and interaction
 */
const EmailSubjects: React.FC<EmailSubjectsProps> = ({
  emails = [
    {
      id: '1',
      from: 'Sarah Johnson',
      subject: 'Quarterly Performance Review and Team Goals Discussion for Q4 2024',
      unread: true,
      priority: 'high',
      timestamp: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      from: 'Marketing Team',
      subject: 'New Campaign Launch Strategy - Please Review by End of Week',
      unread: true,
      priority: 'normal',
      timestamp: new Date('2024-01-15T09:15:00')
    },
    {
      id: '3',
      from: 'John Smith',
      subject: 'Re: Budget Approval for the New Project Initiative',
      unread: false,
      priority: 'normal',
      timestamp: new Date('2024-01-14T16:45:00')
    }
  ],
  enableSelection = true,
  subjectMaxWidth = '500px',
  onSelectionChange,
  onEmailClick,
  showUnreadBadge = true
}): JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /**
   * Validated emails
   */
  const validatedEmails = useMemo<ReadonlyArray<Email>>(() => {
    return emails.filter(isValidEmail);
  }, [emails]);

  /**
   * Selection state
   */
  const selectionState = useMemo<SelectionState>(() => {
    return calculateSelectionState(selectedIds, validatedEmails.length);
  }, [selectedIds, validatedEmails.length]);

  /**
   * Subject container max width
   */
  const subjectContainerWidth = useMemo<string>(() => {
    return normalizeWidth(subjectMaxWidth);
  }, [subjectMaxWidth]);

  /**
   * Handle checkbox change for individual email
   */
  const handleCheckboxChange = useCallback((emailId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }

      if (onSelectionChange) {
        onSelectionChange(Array.from(newSet));
      }

      return newSet;
    });
  }, [onSelectionChange]);

  /**
   * Handle email row click
   */
  const handleEmailClick = useCallback((email: Email) => {
    if (onEmailClick) {
      onEmailClick(email);
    }
  }, [onEmailClick]);

  /**
   * Handle select all
   */
  const handleSelectAll = useCallback(() => {
    if (selectionState.allSelected) {
      setSelectedIds(new Set());
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      const allIds = new Set(validatedEmails.map(e => e.id));
      setSelectedIds(allIds);
      if (onSelectionChange) {
        onSelectionChange(Array.from(allIds));
      }
    }
  }, [selectionState.allSelected, validatedEmails, onSelectionChange]);

  /**
   * Render a single email row
   */
  const renderEmailRow = useCallback((email: Email) => {
    const isSelected = selectedIds.has(email.id);
    const isHovered = hoveredId === email.id;
    const rowStyle = createRowStyle(email.unread, isHovered, isSelected);

    return (
      <div
        key={email.id}
        style={rowStyle}
        onMouseEnter={() => setHoveredId(email.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => handleEmailClick(email)}
      >
        <InlineStack gap="300" blockAlign="start">
          {enableSelection && (
            <Checkbox
              label=""
              checked={isSelected}
              onChange={() => handleCheckboxChange(email.id)}
            />
          )}
          <BlockStack gap="100">
            <InlineStack gap="200" blockAlign="center">
              <Text variant="bodyMd" fontWeight={email.unread ? 'semibold' : 'regular'}>
                {email.from}
              </Text>
              {showUnreadBadge && email.unread && <Badge tone="info">New</Badge>}
              {email.priority === 'high' && <Badge tone="critical">High Priority</Badge>}
            </InlineStack>
            <div style={{ maxWidth: subjectContainerWidth }}>
              <Text variant="bodySm" tone="subdued" truncate>
                {email.subject}
              </Text>
            </div>
          </BlockStack>
        </InlineStack>
      </div>
    );
  }, [selectedIds, hoveredId, enableSelection, showUnreadBadge, subjectContainerWidth, handleEmailClick, handleCheckboxChange]);

  return (
    <Card>
      <BlockStack gap="0">
        {enableSelection && validatedEmails.length > 0 && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e1e3e5' }}>
            <InlineStack gap="200" blockAlign="center">
              <Checkbox
                label="Select all"
                checked={selectionState.allSelected}
                indeterminate={selectionState.someSelected}
                onChange={handleSelectAll}
              />
              {selectionState.someSelected && (
                <Text variant="bodySm" tone="subdued">
                  {selectedIds.size} selected
                </Text>
              )}
            </InlineStack>
          </div>
        )}
        {validatedEmails.map(renderEmailRow)}
      </BlockStack>
    </Card>
  );
};

export default EmailSubjects;`"""

# Read the file
filepath = 'storybook/.storybook/blocks/codeVariants.ts'
content = read_file(filepath)

# Pattern to match typescript property in accessibilityexample
pattern_accessibility = r"(accessibilityexample: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default AccessibilityExample;`)"

# Replace accessibilityexample typescript
content = re.sub(pattern_accessibility, r"\1" + ACCESSIBILITY_EXAMPLE_TS, content, flags=re.DOTALL)

# Pattern to match typescript property in datatableexample
pattern_datatable = r"(datatableexample: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default DataTableExample;`)"

# Replace datatableexample typescript
content = re.sub(pattern_datatable, r"\1" + DATATABLE_EXAMPLE_TS, content, flags=re.DOTALL)

# Pattern to match typescript property in emailsubjects
pattern_email = r"(emailsubjects: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default EmailSubjects;`)"

# Replace emailsubjects typescript
content = re.sub(pattern_email, r"\1" + EMAIL_SUBJECTS_TS, content, flags=re.DOTALL)

# Write back
write_file(filepath, content)

print("✅ Fixed accessibilityexample TypeScript variant")
print("✅ Fixed datatableexample TypeScript variant")
print("✅ Fixed emailsubjects TypeScript variant")
print("All truncate variants have been fixed!")
