import type { Meta, StoryObj } from '@storybook/react';
import { Tag, Card, Text, InlineStack, BlockStack, Button } from '@shopify/polaris';
import {
  XSmallIcon,
  InfoIcon,
  CheckIcon,
  AlertCircleIcon
} from '@shopify/polaris-icons';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Utilities/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tags are compact elements that represent attributes, categories, or metadata. They can be removable, clickable, and used for filtering, categorization, or status indication.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Tag content',
    },
    onRemove: {
      control: 'function',
      description: 'Callback when tag is removed',
    },
    onClick: {
      control: 'function',
      description: 'Callback when tag is clicked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tag',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    clickable: {
      control: 'boolean',
      description: 'Make tag clickable',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tag size',
    },
    tone: {
      control: 'select',
      options: ['base', 'critical', 'highlight', 'success', 'warning', 'info'],
      description: 'Tag color tone',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Sample Tag',
  },
  parameters: {
    codeVariants: getCodeVariants('tag', 'default'),
  },
};

export const BasicTags: Story = {
  render: () => (
    <InlineStack gap="300">
      <Tag>Default</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="critical">Critical</Tag>
      <Tag tone="info">Info</Tag>
      <Tag tone="highlight">Highlight</Tag>
    </InlineStack>
  ),
};

export const RemovableTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState([
      { id: '1', text: 'Electronics' },
      { id: '2', text: 'Books' },
      { id: '3', text: 'Clothing' },
      { id: '4', text: 'Home & Garden' },
      { id: '5', text: 'Sports' },
    ]);

    const handleRemove = (tagId: string) => {
      setTags(prev => prev.filter(tag => tag.id !== tagId));
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Product Categories</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Click the × to remove tags
        </Text>
        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="200" wrap>
            {tags.map(tag => (
              <Tag
                key={tag.id}
                onRemove={() => handleRemove(tag.id)}
                removable
              >
                {tag.text}
              </Tag>
            ))}
            {tags.length === 0 && (
              <Text as="p" variant="bodySm" tone="subdued">
                No categories selected
              </Text>
            )}
          </InlineStack>
        </div>
      </Card>
    );
  },
};

export const ClickableTags: Story = {
  render: () => {
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

    const tags = [
      { id: 'all', text: 'All Products' },
      { id: 'active', text: 'Active' },
      { id: 'archived', text: 'Archived' },
      { id: 'draft', text: 'Draft' },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Filter Products</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Click tags to filter (selected: {selectedTag || 'none'})
        </Text>
        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="200">
            {tags.map(tag => (
              <Tag
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                clickable
                tone={selectedTag === tag.id ? 'highlight' : 'base'}
              >
                {tag.text}
              </Tag>
            ))}
          </InlineStack>
        </div>
      </Card>
    );
  },
};

export const TagSizes: Story = {
  render: () => {
    const sizes = [
      { size: 'small' as const, label: 'Small' },
      { size: 'medium' as const, label: 'Medium' },
      { size: 'large' as const, label: 'Large' },
    ];

    return (
      <BlockStack gap="400">
        {sizes.map(({ size, label }) => (
          <div key={size}>
            <Text as="h4" variant="headingSm">{label} Tags</Text>
            <div style={{ marginTop: '8px' }}>
              <InlineStack gap="300">
                <Tag size={size}>Default</Tag>
                <Tag size={size} tone="success">Success</Tag>
                <Tag size={size} tone="warning" removable onRemove={() => console.log('removed')}>
                  Warning
                </Tag>
                <Tag size={size} tone="critical" clickable onClick={() => console.log('clicked')}>
                  Critical
                </Tag>
              </InlineStack>
            </div>
          </div>
        ))}
      </BlockStack>
    );
  },
};

export const StatusTags: Story = {
  render: () => {
    const orderStatuses = [
      { status: 'pending', label: 'Pending', tone: 'warning' as const },
      { status: 'processing', label: 'Processing', tone: 'info' as const },
      { status: 'shipped', label: 'Shipped', tone: 'success' as const },
      { status: 'delivered', label: 'Delivered', tone: 'base' as const },
      { status: 'cancelled', label: 'Cancelled', tone: 'critical' as const },
      { status: 'refunded', label: 'Refunded', tone: 'highlight' as const },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Order Statuses</Text>
        <div style={{ marginTop: '16px' }}>
          <BlockStack gap="200">
            {orderStatuses.map(({ status, label, tone }) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '120px' }}>
                  <Text as="p" variant="bodySm">{status}</Text>
                </div>
                <Tag tone={tone}>{label}</Tag>
                <Tag tone={tone} removable onRemove={() => console.log(`Removed ${status}`)}>
                  {label} (removable)
                </Tag>
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const TagInputSystem: Story = {
  render: () => {
    const [tags, setTags] = React.useState(['React', 'TypeScript', 'Polaris']);
    const [inputValue, setInputValue] = React.useState('');
    const [showInput, setShowInput] = React.useState(false);

    const handleAddTag = () => {
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAddTag();
      } else if (e.key === 'Escape') {
        setShowInput(false);
        setInputValue('');
      }
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Skill Tags</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Add your technical skills
        </Text>

        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="200" wrap>
            {tags.map(tag => (
              <Tag
                key={tag}
                onRemove={() => handleRemoveTag(tag)}
                removable
                tone="info"
              >
                {tag}
              </Tag>
            ))}

            {showInput ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleAddTag}
                onKeyDown={handleKeyPress}
                onKeyPress={handleKeyPress}
                placeholder="Add skill..."
                autoFocus
                style={{
                  padding: '4px 8px',
                  border: '1px solid var(--p-color-border)',
                  borderRadius: '4px',
                  fontSize: "14px",
                  minWidth: '100px'
                }}
              />
            ) : (
              <Button
                size="small"
                onClick={() => setShowInput(true)}
              >
                + Add Skill
              </Button>
            )}
          </InlineStack>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Text as="h4" variant="headingSm">Popular Skills:</Text>
          <div style={{ marginTop: '8px' }}>
            <InlineStack gap="200" wrap>
              {['JavaScript', 'CSS', 'HTML', 'Node.js', 'Python'].map(skill => (
                <Tag
                  key={skill}
                  clickable
                  onClick={() => {
                    if (!tags.includes(skill)) {
                      setTags([...tags, skill]);
                    }
                  }}
                  tone={tags.includes(skill) ? 'success' : 'base'}
                  disabled={tags.includes(skill)}
                >
                  {skill}
                </Tag>
              ))}
            </InlineStack>
          </div>
        </div>
      </Card>
    );
  },
};

export const FilterTags: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
    const [filterGroups, setFilterGroups] = React.useState({
      category: ['Electronics', 'Clothing'],
      price: ['Under $50', '$50-$100'],
      brand: ['Apple', 'Samsung', 'Nike'],
      rating: ['4+ Stars', '3+ Stars'],
    });

    const availableFilters = {
      category: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'],
      price: ['Under $50', '$50-$100', '$100-$200', 'Over $200'],
      brand: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'],
      rating: ['4+ Stars', '3+ Stars', '2+ Stars'],
    };

    const toggleFilter = (filter: string) => {
      setActiveFilters(prev =>
        prev.includes(filter)
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    };

    const clearAllFilters = () => {
      setActiveFilters([]);
    };

    const getFilterCount = (group: string) => {
      return availableFilters[group as keyof typeof availableFilters].filter(filter =>
        activeFilters.includes(filter)
      ).length;
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Product Filters</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Click tags to apply filters
        </Text>

        {activeFilters.length > 0 && (
          <div style={{
            margin: '16px 0',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text as="h4" variant="headingSm">
                Active Filters ({activeFilters.length})
              </Text>
              <Button size="small" plain onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <InlineStack gap="200" wrap>
              {activeFilters.map(filter => (
                <Tag
                  key={filter}
                  onRemove={() => toggleFilter(filter)}
                  removable
                  tone="highlight"
                >
                  {filter}
                </Tag>
              ))}
            </InlineStack>
          </div>
        )}

        <BlockStack gap="300">
          {Object.entries(availableFilters).map(([group, filters]) => (
            <div key={group}>
              <Text as="h4" variant="headingSm">
                {group.charAt(0).toUpperCase() + group.slice(1)}
                {getFilterCount(group) > 0 && (
                  <Text as="span" tone="subdued"> ({getFilterCount(group)})</Text>
                )}
              </Text>
              <div style={{ marginTop: '8px' }}>
                <InlineStack gap="200" wrap>
                  {filters.map(filter => (
                    <Tag
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      clickable
                      tone={activeFilters.includes(filter) ? 'highlight' : 'base'}
                    >
                      {filter}
                    </Tag>
                  ))}
                </InlineStack>
              </div>
            </div>
          ))}
        </BlockStack>
      </Card>
    );
  },
};

export const InteractiveTagCloud: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [hoveredTag, setHoveredTag] = React.useState<string | null>(null);

    const tagCloud = [
      { tag: 'Design', count: 45, tone: 'success' as const },
      { tag: 'Development', count: 38, tone: 'info' as const },
      { tag: 'Marketing', count: 32, tone: 'warning' as const },
      { tag: 'Sales', count: 28, tone: 'highlight' as const },
      { tag: 'Support', count: 25, tone: 'base' as const },
      { tag: 'Analytics', count: 22, tone: 'info' as const },
      { tag: 'Research', count: 18, tone: 'success' as const },
      { tag: 'Testing', count: 15, tone: 'warning' as const },
      { tag: 'Documentation', count: 12, tone: 'base' as const },
      { tag: 'Security', count: 10, tone: 'critical' as const },
    ];

    const handleTagClick = (tag: string) => {
      setSelectedTags(prev =>
        prev.includes(tag)
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
    };

    const getTagSize = (count: number) => {
      if (count >= 35) return 'large';
      if (count >= 20) return 'medium';
      return 'small';
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Topic Cloud</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Click tags to select (Size represents popularity)
        </Text>

        <div style={{ margin: '20px 0' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px'
          }}>
            {tagCloud.map(({ tag, count, tone }) => (
              <div
                key={tag}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                <Tag
                  size={getTagSize(count)}
                  tone={selectedTags.includes(tag) ? 'highlight' : tone}
                  clickable
                  onClick={() => handleTagClick(tag)}
                  style={{
                    transform: hoveredTag === tag ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {tag} ({count})
                </Tag>
              </div>
            ))}
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div style={{
            padding: '12px',
            backgroundColor: 'var(--p-color-bg-surface-selected)',
            borderRadius: '4px'
          }}>
            <Text as="h4" variant="headingSm">Selected Topics:</Text>
            <div style={{ marginTop: '8px' }}>
              <InlineStack gap="200" wrap>
                {selectedTags.map(tag => (
                  <Tag
                    key={tag}
                    onRemove={() => handleTagClick(tag)}
                    removable
                    tone="highlight"
                  >
                    {tag}
                  </Tag>
                ))}
              </InlineStack>
            </div>
          </div>
        )}

        {hoveredTag && (
          <div style={{ marginTop: '12px' }}>
            <Text as="p" variant="bodySm" tone="subdued">
              Hovering: <strong>{hoveredTag}</strong>
            </Text>
          </div>
        )}
      </Card>
    );
  },
};

export const TagGroups: Story = {
  render: () => {
    const tagGroups = [
      {
        title: 'Priority',
        tags: [
          { text: 'Urgent', tone: 'critical' as const, removable: true },
          { text: 'High', tone: 'warning' as const, removable: true },
          { text: 'Medium', tone: 'info' as const, removable: true },
          { text: 'Low', tone: 'base' as const, removable: true },
        ]
      },
      {
        title: 'Department',
        tags: [
          { text: 'Engineering', tone: 'success' as const, clickable: true },
          { text: 'Design', tone: 'highlight' as const, clickable: true },
          { text: 'Marketing', tone: 'info' as const, clickable: true },
          { text: 'Sales', tone: 'warning' as const, clickable: true },
        ]
      },
      {
        title: 'Status',
        tags: [
          { text: 'Active', tone: 'success' as const },
          { text: 'In Review', tone: 'warning' as const },
          { text: 'Blocked', tone: 'critical' as const },
          { text: 'Completed', tone: 'base' as const },
        ]
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
        {tagGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <div style={{ padding: '16px' }}>
              <Text as="h3" variant="headingSm">{group.title}</Text>
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="200" wrap>
                  {group.tags.map((tag, tagIndex) => (
                    <Tag
                      key={`${groupIndex}-${tagIndex}`}
                      tone={tag.tone}
                      removable={tag.removable}
                      clickable={tag.clickable}
                      onRemove={tag.removable ? () => console.log(`Removed ${tag.text}`) : undefined}
                      onClick={tag.clickable ? () => console.log(`Clicked ${tag.text}`) : undefined}
                    >
                      {tag.text}
                    </Tag>
                  ))}
                </InlineStack>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const DisabledTags: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Disabled States</Text>
        <div style={{ marginTop: '16px' }}>
          <BlockStack gap="300">
            <div>
              <Text as="h4" variant="headingSm">Disabled Tags</Text>
              <div style={{ marginTop: '8px' }}>
                <InlineStack gap="300">
                  <Tag disabled>Disabled Tag</Tag>
                  <Tag disabled tone="success">Disabled Success</Tag>
                  <Tag disabled tone="warning">Disabled Warning</Tag>
                  <Tag disabled tone="critical">Disabled Critical</Tag>
                </InlineStack>
              </div>
            </div>

            <div>
              <Text as="h4" variant="headingSm">Disabled Interactive Tags</Text>
              <div style={{ marginTop: '8px' }}>
                <InlineStack gap="300">
                  <Tag disabled clickable onClick={() => console.log('This wont fire')}>
                    Disabled Clickable
                  </Tag>
                  <Tag disabled removable onRemove={() => console.log('This wont fire')}>
                    Disabled Removable
                  </Tag>
                </InlineStack>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};