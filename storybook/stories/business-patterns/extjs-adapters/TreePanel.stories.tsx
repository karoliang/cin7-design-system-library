import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, BlockStack, InlineStack, Badge, Button } from '@shopify/polaris';
import { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Mock tree node component
interface TreeNodeProps {
  label: string;
  expanded?: boolean;
  children?: TreeNodeProps[];
  hasCheckbox?: boolean;
  checked?: boolean;
  editable?: boolean;
  draggable?: boolean;
  level?: number;
  icon?: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  label,
  expanded = false,
  children = [],
  hasCheckbox = false,
  checked = false,
  editable = false,
  draggable = false,
  level = 0,
  icon = '📁',
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isChecked, setIsChecked] = useState(checked);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  return (
    <BlockStack gap="200">
      <div style={{ paddingLeft: `${level * 24}px` }}>
        <InlineStack gap="200" align="start" blockAlign="center">
          {children.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {hasCheckbox && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          )}
          {draggable && <span style={{ cursor: 'move' }}>⋮⋮</span>}
          <span>{icon}</span>
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
              style={{ padding: '2px 4px' }}
            />
          ) : (
            <span
              onDoubleClick={() => editable && setIsEditing(true)}
              style={{ cursor: editable ? 'text' : 'default' }}
            >
              {editValue}
            </span>
          )}
        </InlineStack>
      </div>
      {isExpanded &&
        children.map((child, idx) => (
          <TreeNode
            key={idx}
            {...child}
            level={level + 1}
            hasCheckbox={hasCheckbox}
            editable={editable}
            draggable={draggable}
          />
        ))}
    </BlockStack>
  );
};

// Mock ExtJS TreePanel wrapper
const ExtJSTreePanel: React.FC<{
  title: string;
  data: TreeNodeProps[];
  editable?: boolean;
  draggable?: boolean;
  hasCheckbox?: boolean;
}> = ({ title, data, editable, draggable, hasCheckbox }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            {title}
          </Text>
          <InlineStack gap="200">
            <Badge tone="info">ExtJS TreePanel</Badge>
            {editable && <Badge tone="success">Editable</Badge>}
            {draggable && <Badge tone="attention">Draggable</Badge>}
            {hasCheckbox && <Badge>Checkboxes</Badge>}
          </InlineStack>
        </InlineStack>
        <BlockStack gap="300">
          {data.map((node, idx) => (
            <TreeNode
              key={idx}
              {...node}
              editable={editable}
              draggable={draggable}
              hasCheckbox={hasCheckbox}
            />
          ))}
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/06 Enterprise Components/ExtJS - Tree Panel',
  component: ExtJSTreePanel,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('treepanel', 'default'),
    docs: {
      description: {
        component:
          'ExtJS TreePanel provides a hierarchical tree structure for displaying organizational data, file systems, or any nested relationship. Supports expand/collapse, drag-drop, inline editing, and checkbox selection.',
      },
    },
  },
  tags: ['autodocs', 'extjs', 'enterprise'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title',
    },
    editable: {
      control: 'boolean',
      description: 'Enable inline editing',
    },
    draggable: {
      control: 'boolean',
      description: 'Enable drag-drop',
    },
    hasCheckbox: {
      control: 'boolean',
      description: 'Show checkboxes for selection',
    },
  },
} satisfies Meta<typeof ExtJSTreePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const organizationData: TreeNodeProps[] = [
  {
    label: 'Executive',
    icon: '🏢',
    expanded: true,
    children: [
      {
        label: 'CEO',
        icon: '👔',
        children: [
          { label: 'John Smith', icon: '👤' },
        ],
      },
      {
        label: 'COO',
        icon: '👔',
        children: [
          { label: 'Sarah Johnson', icon: '👤' },
        ],
      },
    ],
  },
  {
    label: 'Engineering',
    icon: '⚙️',
    expanded: true,
    children: [
      {
        label: 'Frontend Team',
        icon: '💻',
        expanded: true,
        children: [
          { label: 'Alice Chen - Lead', icon: '👤' },
          { label: 'Bob Martinez', icon: '👤' },
          { label: 'Carol Davis', icon: '👤' },
        ],
      },
      {
        label: 'Backend Team',
        icon: '🔧',
        children: [
          { label: 'David Lee - Lead', icon: '👤' },
          { label: 'Emma Wilson', icon: '👤' },
          { label: 'Frank Brown', icon: '👤' },
        ],
      },
      {
        label: 'DevOps Team',
        icon: '🚀',
        children: [
          { label: 'Grace Taylor', icon: '👤' },
          { label: 'Henry Kim', icon: '👤' },
        ],
      },
    ],
  },
  {
    label: 'Sales & Marketing',
    icon: '📊',
    children: [
      {
        label: 'Sales Team',
        icon: '💼',
        children: [
          { label: 'Irene Rodriguez', icon: '👤' },
          { label: 'Jack Thompson', icon: '👤' },
        ],
      },
      {
        label: 'Marketing Team',
        icon: '📱',
        children: [
          { label: 'Karen White', icon: '👤' },
          { label: 'Leo Garcia', icon: '👤' },
        ],
      },
    ],
  },
];

export const BasicTree: Story = {
  args: {
    title: 'Organization Structure',
    data: organizationData,
  },
};

export const EditableTree: Story = {
  parameters: {
    codeVariants: getCodeVariants('treepanel', 'editable'),
  },
  args: {
    title: 'Editable Organization Chart',
    data: organizationData,
    editable: true,
    draggable: true,
  },
};

export const CheckboxTree: Story = {
  parameters: {
    codeVariants: getCodeVariants('treepanel', 'checkbox'),
  },
  args: {
    title: 'Department Selection',
    data: [
      {
        label: 'All Departments',
        icon: '🏢',
        expanded: true,
        children: [
          {
            label: 'Technology',
            icon: '💻',
            expanded: true,
            children: [
              { label: 'Engineering', icon: '⚙️' },
              { label: 'Product', icon: '📦' },
              { label: 'IT Support', icon: '🛠️' },
            ],
          },
          {
            label: 'Business',
            icon: '💼',
            children: [
              { label: 'Sales', icon: '📈' },
              { label: 'Marketing', icon: '📱' },
              { label: 'Customer Success', icon: '🤝' },
            ],
          },
          {
            label: 'Operations',
            icon: '🔧',
            children: [
              { label: 'Finance', icon: '💰' },
              { label: 'HR', icon: '👥' },
              { label: 'Legal', icon: '⚖️' },
            ],
          },
        ],
      },
    ],
    hasCheckbox: true,
  },
};
