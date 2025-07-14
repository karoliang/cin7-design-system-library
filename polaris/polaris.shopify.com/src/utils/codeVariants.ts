export interface CodeExampleVariants {
  react: string;
  extjs: string;
  vanilla: string;
  typescript: string;
}

// Button Group Examples
export const buttonGroupExamples = {
  default: {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

function ButtonGroupDefault() {
  return (
    <ButtonGroup>
      <Button onClick={() => console.log('[Action] Cancel clicked')}>Cancel</Button>
      <Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle',
    pack: 'end'
  },
  defaults: {
    margin: '0 0 0 10'
  },
  items: [{
    xtype: 'button',
    text: 'Cancel',
    handler: function() {
      console.log('Cancel clicked');
    }
  }, {
    xtype: 'button',
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

interface ButtonGroupDefaultExampleProps {
  onCancel?: () => void;
  onSave?: () => void;
}

function ButtonGroupDefault({ 
  onCancel, 
  onSave 
}: ButtonGroupDefaultExampleProps): JSX.Element {
  return (
    <ButtonGroup>
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onSave}>
        Save
      </Button>
    </ButtonGroup>
  );
}`
  },
  'with-segmented-buttons': {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

function ButtonGroupWithSegmentedButtons() {
  return (
    <ButtonGroup variant="segmented">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.button.Segmented', {
  items: [{
    text: 'Bold',
    handler: function(btn) {
      console.log('Bold toggled:', btn.pressed);
    }
  }, {
    text: 'Italic',
    handler: function(btn) {
      console.log('Italic toggled:', btn.pressed);
    }
  }, {
    text: 'Underline',
    handler: function(btn) {
      console.log('Underline toggled:', btn.pressed);
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Underline',
  onClick: () => console.log('Underline clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

interface ShipmentItem {
  id: string;
  quantity: number;
  name: string;
}

interface CardWithFooterActionsProps {
  shipmentId: string;
  items: ShipmentItem[];
  onFulfill: () => void;
  onCreateLabel: () => void;
}

function CardWithFooterActions({
  shipmentId,
  items,
  onFulfill,
  onCreateLabel
}: CardWithFooterActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment {shipmentId}
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            {items.map((item) => (
              <List.Item key={item.id}>
                {item.quantity} × {item.name}
              </List.Item>
            ))}
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={onFulfill} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={onCreateLabel}
              accessibilityLabel="Create shipping label"
            >
              Create shipping label
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-header-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

function CardWithHeaderActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            onClick={() => console.log('[Action] Button clicked')}
            accessibilityLabel="Add variant"
            icon={PlusIcon}
          >
            Add variant
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  tbar: [{
    xtype: 'component',
    html: '<h2 class="text-heading-sm">Variants</h2>',
    flex: 1
  }, {
    xtype: 'button',
    text: 'Add variant',
    iconCls: 'x-fa fa-plus',
    handler: function() {
      console.log('Add variant clicked');
    }
  }],
  items: [{
    xtype: 'component',
    html: '<p class="text-body-md">Add variants if this product comes in multiple versions, like different sizes or colors.</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Add variant',
  onClick: () => console.log('Add variant clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import React from 'react';
import {
  BlockStack,
  Card,
  Icon,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {ProductIcon} from '@shopify/polaris-icons';

interface Product {
  id: string;
  name: string;
}

interface CardWithCustomReactNodeTitleProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

function CardWithCustomReactNodeTitle({
  title = "Products",
  subtitle = "New Products",
  products = [
    { id: '1', name: 'Socks' },
    { id: '2', name: 'Super Shoes' }
  ],
  onProductClick
}: CardWithCustomReactNodeTitleProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
        <BlockStack inlineAlign="start">
          <InlineStack gap="400">
            <Icon source={ProductIcon} />
            <Text as="h3" variant="headingSm">
              {subtitle}
            </Text>
          </InlineStack>
        </BlockStack>
        <List>
          {products.map((product) => (
            <List.Item 
              key={product.id}
              onClick={() => onProductClick?.(product)}
            >
              {product.name}
            </List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-flushed-section': {
    react: `import React from 'react';
import {Bleed, Box, Card, Image, Text} from '@shopify/polaris';

function CardWithFlushedSection() {
  return (
    <Card roundedAbove="sm">
      <Bleed marginInline="400" marginBlock="400">
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
        <Box background="bg-surface-secondary" padding="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
        </Box>
      </Bleed>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: false,
  bodyPadding: 0,
  layout: 'fit',
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'image',
      src: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
      alt: 'a sheet with purple and orange stripes',
      height: 200,
      style: 'object-fit: cover;'
    }, {
      xtype: 'container',
      style: {
        backgroundColor: '#f6f6f7',
        padding: '20px'
      },
      html: '<p style="margin: 0; line-height: 1.5;">You can use sales reports to see information about your customers\' orders based on criteria such as sales over time, by channel, or by staff.</p>'
    }]
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import React from 'react';
import {Bleed, Box, Card, Image, Text} from '@shopify/polaris';

interface ImageData {
  source: string;
  alt: string;
}

interface CardWithFlushedSectionProps {
  image?: ImageData;
  content?: string;
  onImageLoad?: () => void;
}

function CardWithFlushedSection({
  image = {
    source: "https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg",
    alt: "a sheet with purple and orange stripes"
  },
  content = "You can use sales reports to see information about your customers' orders based on criteria such as sales over time, by channel, or by staff.",
  onImageLoad
}: CardWithFlushedSectionProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Bleed marginInline="400" marginBlock="400">
        <Image
          source={image.source}
          alt={image.alt}
          onLoad={onImageLoad}
        />
        <Box background="bg-surface-secondary" padding="400">
          <Text as="p" variant="bodyMd">
            {content}
          </Text>
        </Box>
      </Bleed>
    </Card>
  );
}`
  },
  'with-header-icon-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

function CardWithHeaderIconActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            onClick={() => console.log('[Action] Button clicked')}
            accessibilityLabel="Export variants"
            icon={ExportIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Export variants
        </Text>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Variants',
  padding: 20,
  tools: [{
    type: 'save',
    tooltip: 'Export variants',
    handler: function() {
      console.log('Export variants clicked');
    }
  }],
  html: '<p style="margin: 0; line-height: 1.5;">Export variants</p>'
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
}

interface ActionItem {
  content: string;
  destructive?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}

interface CardWithMultipleFooterActionsProps {
  shipmentId?: string;
  items?: ShipmentItem[];
  actions?: ActionItem[];
  onPrimaryAction?: () => void;
  primaryActionText?: string;
}

function CardWithMultipleFooterActions({
  shipmentId = "1234",
  items = [
    { id: '1', name: 'Oasis Glass, 4-Pack', quantity: 1 },
    { id: '2', name: 'Anubis Cup, 2-Pack', quantity: 1 }
  ],
  actions = [
    { content: 'Cancel shipment', destructive: true },
    { content: 'Add another shipment', disabled: true }
  ],
  onPrimaryAction = () => console.log('Add tracking number clicked'),
  primaryActionText = "Add tracking number"
}: CardWithMultipleFooterActionsProps): JSX.Element {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const disclosureButtonActivator = (
    <Button disclosure accessibilityLabel="More actions" onClick={handleToggleAction}>
      More
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={actions} />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment {shipmentId}
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            {items.map((item) => (
              <List.Item key={item.id}>
                {item.quantity} × {item.name}
              </List.Item>
            ))}
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            {disclosureButton}
            <Button
              variant="primary"
              onClick={onPrimaryAction}
              accessibilityLabel={primaryActionText}
            >
              {primaryActionText}
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-multiple-sections': {
    react: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

function CardWithMultipleSections() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlock="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance.
        </Text>
      </Box>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance, including sales,
          visitors, top products, and referrals.
        </Text>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; padding: 10px 0; line-height: 1.5;">View a summary of your online store\\'s performance.</p>',
    style: {
      borderBottom: '1px solid #e1e1e1'
    }
  }, {
    xtype: 'component',
    html: '<p style="margin: 0; padding: 10px 0; line-height: 1.5;">View a summary of your online store\\'s performance, including sales, visitors, top products, and referrals.</p>',
    margin: '10 0 0 0'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

interface Section {
  id: string;
  content: string;
}

interface CardWithMultipleSectionsProps {
  title?: string;
  sections?: Section[];
  onSectionClick?: (section: Section) => void;
}

function CardWithMultipleSections({
  title = "Online store dashboard",
  sections = [
    { id: '1', content: "View a summary of your online store's performance." },
    { id: '2', content: "View a summary of your online store's performance, including sales, visitors, top products, and referrals." }
  ],
  onSectionClick
}: CardWithMultipleSectionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      {sections.map((section, index) => (
        <Box 
          key={section.id}
          paddingBlock={index === 0 ? "200" : undefined}
          paddingBlockStart={index > 0 ? "200" : undefined}
          onClick={() => onSectionClick?.(section)}
        >
          <Text as="p" variant="bodyMd">
            {section.content}
          </Text>
        </Box>
      ))}
    </Card>
  );
}`
  },
  'with-multiple-titled-sections': {
    react: `import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';

function CardWithMultipleTitledSections() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlock="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Reports
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store's performance.
          </Text>
        </BlockStack>
      </Box>
      <Box paddingBlockStart="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Summary
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store's performance, including sales,
            visitors, top products, and referrals.
          </Text>
        </BlockStack>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    padding: '10 0',
    style: {
      borderBottom: '1px solid #e1e1e1'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Reports</h3>'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; line-height: 1.5;">View a summary of your online store\\'s performance.</p>'
    }]
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    padding: '10 0 0 0',
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Summary</h3>'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; line-height: 1.5;">View a summary of your online store\\'s performance, including sales, visitors, top products, and referrals.</p>'
    }]
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`Section clicked: \${title}\`);
  });
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';

interface TitledSection {
  id: string;
  title: string;
  content: string;
}

interface CardWithMultipleTitledSectionsProps {
  title?: string;
  sections?: TitledSection[];
  onSectionClick?: (section: TitledSection) => void;
}

function CardWithMultipleTitledSections({
  title = "Online store dashboard",
  sections = [
    { 
      id: '1', 
      title: "Reports", 
      content: "View a summary of your online store's performance." 
    },
    { 
      id: '2', 
      title: "Summary", 
      content: "View a summary of your online store's performance, including sales, visitors, top products, and referrals." 
    }
  ],
  onSectionClick
}: CardWithMultipleTitledSectionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      {sections.map((section, index) => (
        <Box 
          key={section.id}
          paddingBlock={index === 0 ? "200" : undefined}
          paddingBlockStart={index > 0 ? "200" : undefined}
          onClick={() => onSectionClick?.(section)}
        >
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              {section.title}
            </Text>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        </Box>
      ))}
    </Card>
  );
}`
  },
  'with-responsive-border-radius': {
    react: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

function CardWithResponsiveBorderRadius() {
  return (
    <Card roundedAbove="md" background="bg-surface-secondary">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'card-responsive-radius',
  style: {
    backgroundColor: '#f6f6f7',
    borderRadius: '8px'
  },
  bodyStyle: {
    backgroundColor: 'transparent'
  },
  border: false,
  padding: 20,
  html: '<h2 style="margin: 0; font-size: 14px; font-weight: normal;">Content inside a card</h2>',
  listeners: {
    afterrender: function(panel) {
      // Responsive border radius based on viewport
      const updateRadius = () => {
        const radius = window.innerWidth >= 768 ? '8px' : '4px';
        panel.getEl().setStyle('border-radius', radius);
      };
      updateRadius();
      window.addEventListener('resize', updateRadius);
    }
  }
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

type ResponsiveSize = 'sm' | 'md' | 'lg' | 'xl';
type BackgroundVariant = 'bg-surface' | 'bg-surface-secondary' | 'bg-surface-tertiary';

interface CardWithResponsiveBorderRadiusProps {
  roundedAbove?: ResponsiveSize;
  background?: BackgroundVariant;
  content?: string;
  variant?: 'bodyMd' | 'headingSm' | 'headingMd';
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

function CardWithResponsiveBorderRadius({
  roundedAbove = "md",
  background = "bg-surface-secondary",
  content = "Content inside a card",
  variant = "bodyMd",
  as = "h2"
}: CardWithResponsiveBorderRadiusProps): JSX.Element {
  return (
    <Card roundedAbove={roundedAbove} background={background}>
      <Text as={as} variant={variant}>
        {content}
      </Text>
    </Card>
  );
}`
  },
  'with-sections-and-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';

function CardWithSectionsAndActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Contact Information
            </Text>
            <Button
              icon={EditIcon}
              variant="tertiary"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Edit"
            />
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            john.smith@example.com
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customer',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">John Smith</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        pack: 'justify',
        align: 'middle'
      },
      items: [{
        xtype: 'component',
        html: '<h3 style="margin: 0; font-weight: 600; font-size: 14px;">Contact Information</h3>'
      }, {
        xtype: 'button',
        text: 'Edit',
        iconCls: 'edit',
        ui: 'tertiary',
        handler: function() {
          console.log('Edit contact information');
        }
      }],
      margin: '0 0 10 0'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">john.smith@example.com</p>'
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Edit',
  onClick: () => console.log('Edit clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

interface StaffMember {
  id: string;
  name: string;
  role: 'Member' | 'Admin';
}

interface ActionItem {
  content: string;
  onAction?: () => void;
}

interface CardWithSeparateHeaderProps {
  title?: string;
  staffMembers?: StaffMember[];
  actions?: ActionItem[];
  onPreview?: () => void;
  onAddAccount?: (role: 'Member' | 'Admin') => void;
  onStaffClick?: (staff: StaffMember) => void;
}

function CardWithSeparateHeader({
  title = "Staff accounts",
  staffMembers = [
    { id: '1', name: 'Felix Crafford', role: 'Admin' },
    { id: '2', name: 'Ezequiel Manno', role: 'Member' }
  ],
  actions = [
    { content: 'Member' },
    { content: 'Admin' }
  ],
  onPreview = () => console.log('Preview clicked'),
  onAddAccount = (role) => console.log(\`Add \${role} clicked\`),
  onStaffClick
}: CardWithSeparateHeaderProps): JSX.Element {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const handleActionSelect = (item: ActionItem) => {
    onAddAccount?.(item.content as 'Member' | 'Admin');
    item.onAction?.();
  };

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      Add account
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList 
        items={actions.map(item => ({
          ...item,
          onAction: () => handleActionSelect(item)
        }))} 
      />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <ButtonGroup>
            <Button
              variant="plain"
              onClick={onPreview}
              accessibilityLabel="Preview staff accounts"
            >
              Preview
            </Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <List>
          {staffMembers.map((staff) => (
            <List.Item 
              key={staff.id}
              onClick={() => onStaffClick?.(staff)}
            >
              {staff.name}
            </List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-subdued-section': {
    react: `import React from 'react';
import {Bleed, BlockStack, Box, Card, List, Text} from '@shopify/polaris';

function CardWithSubduedSection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="200">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </BlockStack>
      <Bleed marginBlockEnd="400" marginInline="400">
        <Box background="bg-surface-secondary" padding="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </BlockStack>
        </Box>
      </Bleed>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Staff accounts',
  padding: '20 20 0 20',
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    style: {
      backgroundColor: '#f6f6f7',
      margin: '0 -20px -20px -20px',
      padding: '20px'
    },
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Deactivated staff accounts</h3>'
    }, {
      xtype: 'component',
      html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
    }]
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`\${status} staff member clicked: \${e.target.textContent}\`);
  });
});
</script>`,
    typescript: `import React from 'react';
import {Bleed, BlockStack, Box, Card, List, Text} from '@shopify/polaris';

interface StaffMember {
  id: string;
  name: string;
  active: boolean;
}

interface CardWithSubduedSectionProps {
  title?: string;
  staffMembers?: StaffMember[];
  deactivatedTitle?: string;
  onStaffClick?: (staff: StaffMember) => void;
}

function CardWithSubduedSection({
  title = "Staff accounts",
  staffMembers = [
    { id: '1', name: 'Felix Crafford', active: true },
    { id: '2', name: 'Ezequiel Manno', active: true },
    { id: '3', name: 'Felix Crafford', active: false },
    { id: '4', name: 'Ezequiel Manno', active: false }
  ],
  deactivatedTitle = "Deactivated staff accounts",
  onStaffClick
}: CardWithSubduedSectionProps): JSX.Element {
  const activeStaff = staffMembers.filter(staff => staff.active);
  const deactivatedStaff = staffMembers.filter(staff => !staff.active);

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
        <Box paddingBlockEnd="200">
          <List>
            {activeStaff.map((staff) => (
              <List.Item 
                key={staff.id}
                onClick={() => onStaffClick?.(staff)}
              >
                {staff.name}
              </List.Item>
            ))}
          </List>
        </Box>
      </BlockStack>
      {deactivatedStaff.length > 0 && (
        <Bleed marginBlockEnd="400" marginInline="400">
          <Box background="bg-surface-secondary" padding="400">
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {deactivatedTitle}
              </Text>
              <List>
                {deactivatedStaff.map((staff) => (
                  <List.Item 
                    key={staff.id}
                    onClick={() => onStaffClick?.(staff)}
                  >
                    {staff.name}
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Box>
        </Bleed>
      )}
    </Card>
  );
}`
  },
  'with-subsection': {
    react: `import React from 'react';
import {BlockStack, Card, Text} from '@shopify/polaris';

function CardWithSubsection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <div>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Addresses
            </Text>
            <div>
              <Text as="p" variant="bodyMd">
                123 First St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </div>
            <div>
              <Text as="p" variant="bodyMd">
                123 Second St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </div>
          </BlockStack>
        </div>
        <div>
          <Text as="p" variant="bodyMd">
            A single subsection without a sibling has no visual appearance
          </Text>
        </div>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customer',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">John Smith</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Addresses</h3>'
    }, {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      style: {
        borderBottom: '1px solid #e1e1e1',
        paddingBottom: '10px',
        marginBottom: '10px'
      },
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">123 First St</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">Somewhere</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">The Universe</p>'
      }]
    }, {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">123 Second St</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">Somewhere</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">The Universe</p>'
      }]
    }],
    margin: '0 0 20 0'
  }, {
    xtype: 'component',
    html: '<p style="margin: 0; line-height: 1.5; font-style: italic;">A single subsection without a sibling has no visual appearance</p>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`Address \${index + 1} clicked\`);
  });
  
  // Add visual feedback
  block.style.cursor = 'pointer';
  block.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = '#f6f6f7';
  });
  block.addEventListener('mouseleave', (e) => {
    e.target.style.backgroundColor = '';
  });
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Card, Text} from '@shopify/polaris';

interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
}

interface Customer {
  id: string;
  name: string;
}

interface CardWithSubsectionProps {
  customer?: Customer;
  addresses?: Address[];
  note?: string;
  onCustomerClick?: (customer: Customer) => void;
  onAddressClick?: (address: Address) => void;
}

function CardWithSubsection({
  customer = { id: '1', name: 'John Smith' },
  addresses = [
    { id: '1', street: '123 First St', city: 'Somewhere', country: 'The Universe' },
    { id: '2', street: '123 Second St', city: 'Somewhere', country: 'The Universe' }
  ],
  note = "A single subsection without a sibling has no visual appearance",
  onCustomerClick,
  onAddressClick
}: CardWithSubsectionProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text 
            as="p" 
            variant="bodyMd"
            onClick={() => onCustomerClick?.(customer)}
          >
            {customer.name}
          </Text>
        </BlockStack>
        {addresses.length > 0 && (
          <div>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Addresses
              </Text>
              {addresses.map((address) => (
                <div 
                  key={address.id}
                  onClick={() => onAddressClick?.(address)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text as="p" variant="bodyMd">
                    {address.street}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {address.city}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {address.country}
                  </Text>
                </div>
              ))}
            </BlockStack>
          </div>
        )}
        <div>
          <Text as="p" variant="bodyMd">
            {note}
          </Text>
        </div>
      </BlockStack>
    </Card>
  );
}`
  }
};

// Badge Examples
export const badgeExamples = {
  default: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge>Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge">Fulfilled</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

interface BadgeExampleProps {
  status?: string;
}

function Badge({ status = "Fulfilled" }: BadgeExampleProps): JSX.Element {
  return (
    <Card>
      <Badge>{status}</Badge>
    </Card>
  );
}`
  },
  critical: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge tone="critical">Action required</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--critical">Action required</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'info' | 'success' | 'warning' | 'critical' | 'attention' | undefined;

interface CriticalBadgeProps {
  message?: string;
  tone?: BadgeTone;
}

function CriticalBadge({ 
  message = "Action required",
  tone = "critical" 
}: CriticalBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{message}</Badge>
    </Card>
  );
}`
  },
  success: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge tone="success">Active</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--success">Active</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

interface SuccessBadgeProps {
  isActive?: boolean;
  activeText?: string;
  inactiveText?: string;
}

function SuccessBadge({ 
  isActive = true,
  activeText = "Active",
  inactiveText = "Inactive"
}: SuccessBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={isActive ? "success" : undefined}>
        {isActive ? activeText : inactiveText}
      </Badge>
    </Card>
  );
}`
  },
  attention: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge tone="attention">Open</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--attention">Open</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface AttentionBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function AttentionBadge({ 
  children, 
  tone = "attention" 
}: AttentionBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  complete: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge progress="complete">Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--complete">Fulfilled</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

interface CompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
}

function CompleteBadge({ 
  children, 
  progress = "complete" 
}: CompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress}>{children}</Badge>
    </Card>
  );
}`
  },
  small: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge size="small">Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--small">Fulfilled</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeSize = 'small' | 'medium';

interface SmallBadgeProps {
  children: React.ReactNode;
  size?: BadgeSize;
}

function SmallBadge({ 
  children, 
  size = "small" 
}: SmallBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge size={size}>{children}</Badge>
    </Card>
  );
}`
  },
  incomplete: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge progress="incomplete" tone="attention">
        Unfulfilled
      </Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--incomplete badge--attention">Unfulfilled</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';
type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface IncompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
  tone?: BadgeTone;
}

function IncompleteBadge({ 
  children, 
  progress = "incomplete",
  tone = "attention"
}: IncompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress} tone={tone}>
        {children}
      </Badge>
    </Card>
  );
}`
  },
  informational: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge tone="info">Draft</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--info">Draft</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface InformationalBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function InformationalBadge({ 
  children, 
  tone = "info" 
}: InformationalBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  warning: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge tone="warning">On hold</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--warning">On hold</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface WarningBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function WarningBadge({ 
  children, 
  tone = "warning" 
}: WarningBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  'partially-complete': {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
  return (
    <Card>
      <Badge progress="partiallyComplete" tone="warning">
        Partially fulfilled
      </Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="badge badge--partially-complete badge--warning">Partially fulfilled</span>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';
type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface PartiallyCompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
  tone?: BadgeTone;
}

function PartiallyCompleteBadge({ 
  children, 
  progress = "partiallyComplete",
  tone = "warning"
}: PartiallyCompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress} tone={tone}>
        {children}
      </Badge>
    </Card>
  );
}`
  }
};

// TextField Examples
export const textFieldExamples = {
  default: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextField() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TextFieldProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

function TextField({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  onValueChange
}: TextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`
  },
  'with-validation-error': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ValidationError() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error="Store name is required"
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: '',
  labelWidth: 100,
  width: 320,
  msgTarget: 'under',
  markInvalid: function() {
    this.setActiveError('Store name is required');
  },
  listeners: {
    afterrender: function(field) {
      field.markInvalid();
    },
    change: function(field, newValue) {
      if (newValue) {
        field.clearInvalid();
      } else {
        field.markInvalid();
      }
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  required: true,
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationErrorExampleProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
}

function ValidationError({ 
  label = 'Store name',
  errorMessage = 'Store name is required',
  required = true
}: ValidationErrorExampleProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [error, setError] = useState<string | undefined>(errorMessage);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      if (required && !value) {
        setError(errorMessage);
      } else {
        setError(undefined);
      }
    },
    [required, errorMessage],
  );

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error={error}
      autoComplete="off"
    />
  );
}`
  },
  'with-help-text': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function HelpTextExample() {
  const [textFieldValue, setTextFieldValue] = useState(
    'bernadette.lapresse@jadedpixel.com',
  );

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Account email"
      type="email"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText="We'll use this address if we need to contact you about your account."
      autoComplete="email"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Account email',
  value: 'bernadette.lapresse@jadedpixel.com',
  vtype: 'email',
  labelWidth: 100,
  width: 400,
  afterLabelTextTpl: '<span class="help-text">We\\'ll use this address if we need to contact you about your account.</span>',
  listeners: {
    change: function(field, newValue) {
      console.log('Email changed to:', newValue);
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Account email',
  type: 'email',
  helpText: 'We'll use this address if we need to contact you about your account.',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface HelpTextExampleProps {
  initialEmail?: string;
  helpText?: string;
  onEmailChange?: (email: string) => void;
}

function HelpTextExample({ 
  initialEmail = 'bernadette.lapresse@jadedpixel.com',
  helpText = "We'll use this address if we need to contact you about your account.",
  onEmailChange
}: HelpTextExampleProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialEmail);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onEmailChange?.(value);
    },
    [onEmailChange],
  );

  return (
    <TextField
      label="Account email"
      type="email"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText={helpText}
      autoComplete="email"
    />
  );
}`
  },
  number: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function NumberFieldExample() {
  const [value, setValue] = useState('1');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Quantity"
      type="number"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Number', {
  fieldLabel: 'Quantity',
  value: 1,
  minValue: 0,
  labelWidth: 100,
  width: 200,
  listeners: {
    change: function(field, newValue) {
      console.log('Quantity changed to:', newValue);
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Quantity',
  type: 'number',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface NumberFieldExampleProps {
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
}

function NumberFieldExample({ 
  label = 'Quantity',
  initialValue = 1,
  min = 0,
  max,
  onValueChange
}: NumberFieldExampleProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue.toString());

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue)) {
        onValueChange?.(numValue);
      }
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      min={min}
      max={max}
    />
  );
}`
  },
  disabled: {
    react: `import {TextField} from '@shopify/polaris';
import React from 'react';

function TextField() {
  return <TextField label="Store name" disabled autoComplete="off" />;
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  name: 'storeName',
  disabled: true,
  emptyText: 'Enter store name',
  cls: 'text-field',
  labelAlign: 'top',
  labelCls: 'label',
  width: 300
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import React from 'react';

interface DisabledTextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  autoComplete?: string;
}

function DisabledTextField({ 
  label = "Store name",
  value = "",
  placeholder,
  autoComplete = "off"
}: DisabledTextFieldProps): JSX.Element {
  return (
    <TextField 
      label={label} 
      value={value}
      disabled 
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  );
}`
  },
  email: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function EmailFieldExample() {
  const [value, setValue] = useState('bernadette.lapresse@jadedpixel.com');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Email"
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Email',
  name: 'email',
  inputType: 'email',
  value: 'bernadette.lapresse@jadedpixel.com',
  cls: 'text-field',
  labelAlign: 'top',
  labelCls: 'label',
  width: 300,
  vtype: 'email',
  listeners: {
    change: function(field, newValue) {
      console.log('Email changed to:', newValue);
    },
    blur: function(field) {
      if (!field.isValid()) {
        Ext.Msg.alert('Validation Error', 'Please enter a valid email address');
      }
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Email',
  type: 'email',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface EmailFieldProps {
  label?: string;
  initialValue?: string;
  onEmailChange?: (email: string) => void;
  onValidation?: (isValid: boolean) => void;
  required?: boolean;
}

function EmailFieldExample({ 
  label = "Email",
  initialValue = "bernadette.lapresse@jadedpixel.com",
  onEmailChange,
  onValidation,
  required = false
}: EmailFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onEmailChange?.(newValue);

      // Validate email format
      if (newValue && !validateEmail(newValue)) {
        setError('Please enter a valid email address');
        onValidation?.(false);
      } else if (required && !newValue) {
        setError('Email is required');
        onValidation?.(false);
      } else {
        setError('');
        onValidation?.(true);
      }
    },
    [onEmailChange, onValidation, required, validateEmail],
  );

  return (
    <TextField
      label={label}
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
      error={error}
      required={required}
    />
  );
}`
  },
  multiline: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function MultilineFieldExample() {
  const [value, setValue] = useState('1776 Barnes Street\\nOrlando, FL 32801');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Shipping address"
      value={value}
      onChange={handleChange}
      multiline={4}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.TextArea', {
  fieldLabel: 'Shipping address',
  name: 'shippingAddress',
  value: '1776 Barnes Street\\nOrlando, FL 32801',
  cls: 'text-field',
  labelAlign: 'top',
  labelCls: 'label',
  width: 300,
  height: 100,
  rows: 4,
  listeners: {
    change: function(field, newValue) {
      console.log('Address changed to:', newValue);
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface MultilineTextFieldProps {
  label?: string;
  initialValue?: string;
  rows?: number;
  maxLength?: number;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

function MultilineTextField({ 
  label = "Shipping address",
  initialValue = "1776 Barnes Street\\nOrlando, FL 32801",
  rows = 4,
  maxLength,
  onValueChange,
  placeholder
}: MultilineTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);
  const [characterCount, setCharacterCount] = useState<number>(initialValue.length);

  const handleChange = useCallback(
    (newValue: string) => {
      if (maxLength && newValue.length > maxLength) {
        return; // Don't update if exceeds max length
      }
      
      setValue(newValue);
      setCharacterCount(newValue.length);
      onValueChange?.(newValue);
    },
    [maxLength, onValueChange],
  );

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      multiline={rows}
      autoComplete="off"
      placeholder={placeholder}
      showCharacterCount={maxLength !== undefined}
      maxLength={maxLength}
    />
  );
}`
  },
  'with-auto-size': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AutoSize() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      suffix="in: Your stores"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  autoSize: true,
  suffix: 'in: Your stores',
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface AutoSizeTextFieldProps {
  initialValue?: string;
  label?: string;
  suffix?: string;
  onValueChange?: (value: string) => void;
}

function AutoSize({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  suffix = 'in: Your stores',
  onValueChange
}: AutoSizeTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      suffix={suffix}
    />
  );
}`
  },
  'with-auto-size-and-dynamic-suffix': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AutoSize() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const suffix = value ? 'in: Unfulfilled orders' : null;

  return (
    <TextField
      label="Search view"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      placeholder="Searching in Unfulfilled orders"
      suffix={suffix}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Search view',
  value: '',
  labelWidth: 100,
  autoSize: true,
  emptyText: 'Searching in Unfulfilled orders',
  listeners: {
    change: function(field, newValue) {
      const suffix = newValue ? 'in: Unfulfilled orders' : null;
      if (suffix) {
        field.setFieldStyle('padding-right: 140px;');
        if (!field.suffixEl) {
          field.suffixEl = Ext.DomHelper.append(field.inputWrap, {
            tag: 'span',
            cls: 'field-suffix',
            html: suffix
          });
        } else {
          field.suffixEl.innerHTML = suffix;
        }
      } else if (field.suffixEl) {
        Ext.removeNode(field.suffixEl);
        field.suffixEl = null;
        field.setFieldStyle('');
      }
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Search view',
  type: 'text',
  placeholder: 'Searching in Unfulfilled orders',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface DynamicSuffixTextFieldProps {
  label?: string;
  placeholder?: string;
  suffixText?: string;
  onValueChange?: (value: string) => void;
}

function AutoSize({ 
  label = 'Search view',
  placeholder = 'Searching in Unfulfilled orders',
  suffixText = 'in: Unfulfilled orders',
  onValueChange
}: DynamicSuffixTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  const suffix: string | null = value ? suffixText : null;

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      placeholder={placeholder}
      suffix={suffix}
    />
  );
}`
  },
  'with-character-count': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithCharacterCountExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={20}
      autoComplete="off"
      showCharacterCount
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  maxLength: 20,
  enforceMaxLength: true,
  listeners: {
    change: function(field, newValue) {
      const count = newValue.length;
      const maxLength = field.maxLength;
      
      if (!field.characterCountEl) {
        field.characterCountEl = Ext.DomHelper.append(field.bodyEl, {
          tag: 'div',
          cls: 'character-count',
          html: count + '/' + maxLength
        });
      } else {
        field.characterCountEl.innerHTML = count + '/' + maxLength;
      }
    },
    afterrender: function(field) {
      // Initialize character count
      field.fireEvent('change', field, field.getValue());
    }
  }
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CharacterCountTextFieldProps {
  initialValue?: string;
  label?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void;
}

function TextFieldWithCharacterCountExample({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  maxLength = 20,
  onValueChange
}: CharacterCountTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={maxLength}
      autoComplete="off"
      showCharacterCount
    />
  );
}`
  },
  'with-clear-button': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithClearButtonExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleClearButtonClick = useCallback(() => setTextFieldValue(''), []);

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  triggers: {
    clear: {
      cls: 'clear-trigger',
      handler: function() {
        this.setValue('');
        this.focus();
      },
      hidden: false
    }
  },
  listeners: {
    change: function(field, newValue) {
      // Show/hide clear button based on value
      const clearTrigger = field.getTrigger('clear');
      if (newValue) {
        clearTrigger.show();
      } else {
        clearTrigger.hide();
      }
    },
    afterrender: function(field) {
      // Initialize clear button visibility
      field.fireEvent('change', field, field.getValue());
    }
  }
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, Card, Text, BlockStack} from '@shopify/polaris';
import {ExportIcon, PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

interface PageFullWidthExampleProps {
  onCreateOrder?: () => void;
  onExportOrders?: () => void;
  onNext?: () => void;
}

function PageFullWidthExample({
  onCreateOrder,
  onExportOrders,
  onNext
}: PageFullWidthExampleProps): JSX.Element {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{
        content: 'Create order',
        icon: PlusIcon,
        accessibilityLabel: 'Create order',
        onAction: onCreateOrder
      }}
      secondaryActions={[
        {
          accessibilityLabel: 'Export orders',
          icon: ExportIcon,
          onAction: onExportOrders
        },
      ]}
      pagination={{
        hasNext: true,
        onNext
      }}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
    </Page>
  );
}`
  },
  'narrow-width': {
    react: `import {Page, PageActions, Card, Text, BlockStack} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

function Page() {
  return (
    <Page
      narrowWidth
      backAction={{content: 'Orders', url: '#'}}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
      <PageActions
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[{content: 'Delete', icon: DeleteIcon}]}
      />
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Add payment method',
  width: 600,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Orders',
      handler: function() {
        console.log('Back to orders');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Delete',
      iconCls: 'x-fa fa-trash',
      handler: function() {
        console.log('Delete payment method');
      }
    }, '->', {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save payment method');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<h3>Credit card</h3><p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, PageActions, Card, Text, BlockStack} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

interface PageNarrowWidthExampleProps {
  onBack?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  isValid?: boolean;
}

function PageNarrowWidthExample({
  onBack,
  onSave,
  onDelete,
  isValid = false
}: PageNarrowWidthExampleProps): JSX.Element {
  return (
    <Page
      narrowWidth
      backAction={{content: 'Orders', onAction: onBack}}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
      <PageActions
        primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
        secondaryActions={[{content: 'Delete', icon: DeleteIcon, onAction: onDelete}]}
      />
    </Page>
  );
}`
  },
  'with-action-groups': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      title="Products"
      actionGroups={[
        {
          title: 'Copy',
          onClick: (openActions) => {
            alert('Copy action');
            openActions();
          },
          actions: [{content: 'Copy to clipboard'}],
        },
        {
          title: 'Promote',
          disabled: true,
          actions: [{content: 'Share on Facebook'}],
        },
        {
          title: 'More actions',
          actions: [
            {content: 'Duplicate'},
            {content: 'Print'},
            {content: 'Unarchive'},
            {content: 'Cancel order'},
          ],
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Products',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Copy',
      menu: [{
        text: 'Copy to clipboard',
        handler: function() {
          console.log('Copy to clipboard');
        }
      }]
    }, {
      text: 'Promote',
      disabled: true,
      menu: [{
        text: 'Share on Facebook',
        handler: function() {
          console.log('Share on Facebook');
        }
      }]
    }, {
      text: 'More actions',
      menu: [{
        text: 'Duplicate',
        handler: function() {
          console.log('Duplicate');
        }
      }, {
        text: 'Print',
        handler: function() {
          console.log('Print');
        }
      }, {
        text: 'Unarchive',
        handler: function() {
          console.log('Unarchive');
        }
      }, {
        text: 'Cancel order',
        handler: function() {
          console.log('Cancel order');
        }
      }]
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Cancel order',
  disabled: true,
  onClick: () => console.log('Cancel order clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface ActionGroup {
  title: string;
  disabled?: boolean;
  onClick?: (openActions: () => void) => void;
  actions: Array<{
    content: string;
    onAction?: () => void;
  }>;
}

interface PageWithActionGroupsExampleProps {
  actionGroups?: ActionGroup[];
  onActionClick?: (action: string) => void;
}

function PageWithActionGroupsExample({
  actionGroups = [
    {
      title: 'Copy',
      onClick: (openActions) => {
        alert('Copy action');
        openActions();
      },
      actions: [{content: 'Copy to clipboard'}],
    },
    {
      title: 'Promote',
      disabled: true,
      actions: [{content: 'Share on Facebook'}],
    },
    {
      title: 'More actions',
      actions: [
        {content: 'Duplicate'},
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ],
    },
  ],
  onActionClick
}: PageWithActionGroupsExampleProps): JSX.Element {
  const enhancedActionGroups = actionGroups.map(group => ({
    ...group,
    actions: group.actions.map(action => ({
      ...action,
      onAction: action.onAction || (() => onActionClick?.(action.content))
    }))
  }));

  return (
    <Page
      title="Products"
      actionGroups={enhancedActionGroups}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-content-after-title': {
    react: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Jar With Lock-Lid"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Jar With Lock-Lid',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Products',
      handler: function() {
        console.log('Back to products');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'label',
      text: 'Verified',
      style: 'background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 4px; font-size: 12px;'
    }, '->', {
      text: 'Duplicate',
      handler: function() {
        console.log('Duplicate product');
      }
    }, {
      text: 'View on your store',
      handler: function() {
        console.log('View on store');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save product');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Previous',
      iconCls: 'x-fa fa-arrow-left',
      handler: function() {
        console.log('Previous page');
      }
    }, '->', {
      text: 'Next',
      iconCls: 'x-fa fa-arrow-right',
      iconAlign: 'right',
      handler: function() {
        console.log('Next page');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Next',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('Next clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageWithContentAfterTitleExampleProps {
  title?: string;
  metadataText?: string;
  metadataTone?: 'attention' | 'success' | 'warning' | 'critical';
  onBack?: () => void;
  onSave?: () => void;
  onDuplicate?: () => void;
  onViewOnStore?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isValid?: boolean;
}

function PageWithContentAfterTitleExample({
  title = "Jar With Lock-Lid",
  metadataText = "Verified",
  metadataTone = "attention",
  onBack,
  onSave,
  onDuplicate,
  onViewOnStore,
  onPrevious,
  onNext,
  isValid = false
}: PageWithContentAfterTitleExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Products', onAction: onBack}}
      title={title}
      titleMetadata={<Badge tone={metadataTone}>{metadataText}</Badge>}
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
      secondaryActions={[
        {content: 'Duplicate', onAction: onDuplicate},
        {content: 'View on your store', onAction: onViewOnStore},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
        onPrevious,
        onNext
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-custom-primary-action': {
    react: `import {Page, Button, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={<Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Settings',
      handler: function() {
        console.log('Back to settings');
      }
    }, '->', {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'console.log('[Action] Save clicked')}>Save',
  variant: 'primary',
  onClick: () => console.log('Button clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, Button, LegacyCard} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageWithCustomPrimaryActionExampleProps {
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
  customPrimaryAction?: ReactElement;
}

function PageWithCustomPrimaryActionExample({
  title = "General",
  onBack,
  onSave,
  customPrimaryAction
}: PageWithCustomPrimaryActionExampleProps): JSX.Element {
  const primaryAction = customPrimaryAction || (
    <Button variant="primary" onClick={onSave}>
      Save
    </Button>
  );

  return (
    <Page
      backAction={{content: 'Settings', onAction: onBack}}
      title={title}
      primaryAction={primaryAction}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-custom-secondary-action': {
    react: `import {Page, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page title="General" secondaryActions={<Button>Save</Button>}>
      <p>Page content</p>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      xtype: 'button',
      text: 'Save',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }],
  bodyPadding: 16,
  html: '<p>Page content</p>'
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageWithCustomSecondaryActionExampleProps {
  title?: string;
  onSave?: () => void;
  customSecondaryAction?: ReactElement;
  children?: React.ReactNode;
}

function PageWithCustomSecondaryActionExample({
  title = "General",
  onSave,
  customSecondaryAction,
  children = <p>Page content</p>
}: PageWithCustomSecondaryActionExampleProps): JSX.Element {
  const secondaryAction = customSecondaryAction || (
    <Button onClick={onSave}>Save</Button>
  );

  return (
    <Page title={title} secondaryActions={secondaryAction}>
      {children}
    </Page>
  );
}`
  },
  'with-destructive-secondary-action': {
    react: `import {Page} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

function Page() {
  return (
    <Page
      title="General"
      secondaryActions={[
        {content: 'Delete', destructive: true, icon: DeleteIcon},
      ]}
    >
      <p>Page content</p>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Delete',
      iconCls: 'x-fa fa-trash',
      ui: 'destructive',
      handler: function() {
        console.log('Delete clicked');
      }
    }]
  }],
  bodyPadding: 16,
  html: '<p>Page content</p>'
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Delete',
  onClick: () => console.log('Delete clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

interface PageWithDestructiveSecondaryActionExampleProps {
  title?: string;
  onDelete?: () => void;
  children?: React.ReactNode;
}

function PageWithDestructiveSecondaryActionExample({
  title = "General",
  onDelete,
  children = <p>Page content</p>
}: PageWithDestructiveSecondaryActionExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          icon: DeleteIcon,
          onAction: onDelete
        },
      ]}
    >
      {children}
    </Page>
  );
}`
  },
  'with-external-link': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalIcon} from '@shopify/polaris-icons';
import React from 'react';

function Page() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalIcon,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Jar With Lock-Lid',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Promote',
      iconCls: 'x-fa fa-external-link',
      handler: function() {
        window.open('https://www.facebook.com/business/learn/facebook-page-build-audience', '_blank');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalIcon} from '@shopify/polaris-icons';
import React from 'react';

interface PageWithExternalLinkExampleProps {
  title?: string;
  onSave?: () => void;
  externalUrl?: string;
  isValid?: boolean;
}

function PageWithExternalLinkExample({
  title = "Jar With Lock-Lid",
  onSave,
  externalUrl = "https://www.facebook.com/business/learn/facebook-page-build-audience",
  isValid = false
}: PageWithExternalLinkExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalIcon,
          url: externalUrl,
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-tooltip-action': {
    react: `import {Page} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      title="Product"
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Import',
          disabled: true,
          helpText: 'You need permission to import products.',
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Import',
      disabled: true,
      tooltip: 'You need permission to import products.',
      handler: function() {
        console.log('Import clicked');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page} from '@shopify/polaris';
import React from 'react';

interface PageWithTooltipActionExampleProps {
  title?: string;
  onSave?: () => void;
  onImport?: () => void;
  canImport?: boolean;
  importHelpText?: string;
}

function PageWithTooltipActionExample({
  title = "Product",
  onSave,
  onImport,
  canImport = false,
  importHelpText = "You need permission to import products."
}: PageWithTooltipActionExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
      secondaryActions={[
        {
          content: 'Import',
          disabled: !canImport,
          helpText: importHelpText,
          onAction: onImport
        },
      ]}
    />
  );
}`
  },
  'without-pagination': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={{content: 'Save'}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Settings',
      handler: function() {
        console.log('Back to settings');
      }
    }, '->', {
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageWithoutPaginationExampleProps {
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
}

function PageWithoutPaginationExample({
  title = "General",
  onBack,
  onSave
}: PageWithoutPaginationExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Settings', onAction: onBack}}
      title={title}
      primaryAction={{content: 'Save', onAction: onSave}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'without-primary-action-in-header': {
    react: `import {Page, LegacyCard, LegacyStack, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Orders', url: '#'}}
      title="#1085"
      secondaryActions={[
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button variant="primary">Continue</Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: '#1085',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Orders',
      handler: function() {
        console.log('Back to orders');
      }
    }, '->', {
      text: 'Print',
      handler: function() {
        console.log('Print');
      }
    }, {
      text: 'Unarchive',
      handler: function() {
        console.log('Unarchive');
      }
    }, {
      text: 'Cancel order',
      handler: function() {
        console.log('Cancel order');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Previous',
      iconCls: 'x-fa fa-arrow-left',
      handler: function() {
        console.log('Previous');
      }
    }, '->', {
      text: 'Next',
      iconCls: 'x-fa fa-arrow-right',
      iconAlign: 'right',
      handler: function() {
        console.log('Next');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Fulfill order',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'middle'
      },
      items: [{
        xtype: 'component',
        flex: 1,
        html: '<p>Buy postage and ship remaining 2 items</p>'
      }, {
        xtype: 'button',
        text: 'Continue',
        ui: 'primary',
        handler: function() {
          console.log('Continue clicked');
        }
      }]
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Continue',
  variant: 'primary',
  onClick: () => console.log('Continue clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, LegacyCard, LegacyStack, Button} from '@shopify/polaris';
import React from 'react';

interface PageWithoutPrimaryActionInHeaderExampleProps {
  orderNumber?: string;
  onBack?: () => void;
  onPrint?: () => void;
  onUnarchive?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

function PageWithoutPrimaryActionInHeaderExample({
  orderNumber = "#1085",
  onBack,
  onPrint,
  onUnarchive,
  onCancel,
  onContinue,
  onPrevious,
  onNext
}: PageWithoutPrimaryActionInHeaderExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Orders', onAction: onBack}}
      title={orderNumber}
      secondaryActions={[
        {content: 'Print', onAction: onPrint},
        {content: 'Unarchive', onAction: onUnarchive},
        {content: 'Cancel order', onAction: onCancel},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
        onPrevious,
        onNext
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button variant="primary" onClick={onContinue}>
            Continue
          </Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}`
  },
  'actions-default': {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    text: 'Delete',
    ui: 'destructive',
    handler: function() {
      console.log('Delete clicked');
    }
  }, '->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Continue',
  variant: 'primary',
  onClick: () => console.log('Continue clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {PageActions} from '@shopify/polaris';
import React from 'react';

interface PageActionsDefaultExampleProps {
  onSave?: () => void;
  onDelete?: () => void;
}

function PageActionsDefaultExample({
  onSave,
  onDelete
}: PageActionsDefaultExampleProps): JSX.Element {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          onAction: onDelete
        },
      ]}
    />
  );
}`
  },
  'actions-primary-action-only': {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: ['->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {PageActions} from '@shopify/polaris';
import React from 'react';

interface PageActionsPrimaryActionOnlyExampleProps {
  onSave?: () => void;
}

function PageActionsPrimaryActionOnlyExample({
  onSave
}: PageActionsPrimaryActionOnlyExampleProps): JSX.Element {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
    />
  );
}`
  },
  'actions-with-custom-primary-action': {
    react: `import {PageActions, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={<Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    text: 'Delete',
    ui: 'destructive',
    handler: function() {
      console.log('Delete clicked');
    }
  }, '->', {
    xtype: 'button',
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'console.log('[Action] Save clicked')}>Save',
  variant: 'primary',
  onClick: () => console.log('Button clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {PageActions, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageActionsWithCustomPrimaryActionExampleProps {
  onSave?: () => void;
  onDelete?: () => void;
  customPrimaryAction?: ReactElement;
}

function PageActionsWithCustomPrimaryActionExample({
  onSave,
  onDelete,
  customPrimaryAction
}: PageActionsWithCustomPrimaryActionExampleProps): JSX.Element {
  const primaryAction = customPrimaryAction || (
    <Button variant="primary" onClick={onSave}>Save</Button>
  );

  return (
    <PageActions
      primaryAction={primaryAction}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          onAction: onDelete
        },
      ]}
    />
  );
}`
  },
  'actions-with-custom-secondary-action': {
    react: `import {PageActions, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={<Button>Save</Button>}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    xtype: 'button',
    text: 'Save',
    handler: function() {
      console.log('Secondary save clicked');
    }
  }, '->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Primary save clicked');
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {PageActions, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageActionsWithCustomSecondaryActionExampleProps {
  onPrimarySave?: () => void;
  onSecondarySave?: () => void;
  customSecondaryAction?: ReactElement;
}

function PageActionsWithCustomSecondaryActionExample({
  onPrimarySave,
  onSecondarySave,
  customSecondaryAction
}: PageActionsWithCustomSecondaryActionExampleProps): JSX.Element {
  const secondaryAction = customSecondaryAction || (
    <Button onClick={onSecondarySave}>Save</Button>
  );

  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onPrimarySave
      }}
      secondaryActions={secondaryAction}
    />
  );
}`
  }
};

// Layout Examples
export const layoutExamples = {
  'one-column': {
    react: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Online store dashboard" sectioned>
            <p>View a summary of your online store's performance.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: 'fit',
  items: [{
    xtype: 'panel',
    title: 'Online store dashboard',
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s performance.</p>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LayoutExampleProps {
  fullWidth?: boolean;
  children: React.ReactNode;
}

function Layout({ 
  fullWidth = true,
  children 
}: LayoutExampleProps): JSX.Element {
  return (
    <Page fullWidth={fullWidth}>
      <Layout>
        <Layout.Section>
          {children}
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  },
  'two-columns-with-equal-width': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneHalf">
          <LegacyCard title="Florida" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                455 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '341',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '254',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '256',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '342',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '257',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    flex: 1,
    margin: '0 8 0 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Florida',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Florida');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">455 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '341', name: 'Black & orange scarf', sku: '9234194023', quantity: '254'},
          {id: '256', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Nevada',
    margin: '0 0 0 0',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Nevada');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">301 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '342', name: 'Black & orange scarf', sku: '9234194023', quantity: '100'},
          {id: '257', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Product',
  variant: 'plain',
  onClick: () => console.log('Product clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  url: string;
  name: string;
  sku: string;
  quantity: string;
  media: React.ReactNode;
}

interface LocationData {
  name: string;
  totalUnits: number;
  products: Product[];
}

interface LayoutTwoColumnsExampleProps {
  locations?: LocationData[];
  onManage?: (location: string) => void;
}

function LayoutTwoColumnsExample({
  locations = [
    {
      name: 'Florida',
      totalUnits: 455,
      products: [
        {
          id: '341',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '254',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '256',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Nevada',
      totalUnits: 301,
      products: [
        {
          id: '342',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '100',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '257',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    }
  ],
  onManage
}: LayoutTwoColumnsExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        {locations.map((location, index) => (
          <Layout.Section key={location.name} variant="oneHalf">
            <LegacyCard 
              title={location.name} 
              actions={[{
                content: 'Manage',
                onAction: () => onManage?.(location.name)
              }]}
            >
              <LegacyCard.Section>
                <Text tone="subdued" as="span">
                  {location.totalUnits} units available
                </Text>
              </LegacyCard.Section>
              <LegacyCard.Section title="Items">
                <ResourceList
                  resourceName={{singular: 'product', plural: 'products'}}
                  items={location.products}
                  renderItem={(item) => {
                    const {id, url, name, sku, media, quantity} = item;

                    return (
                      <ResourceList.Item
                        id={id}
                        url={url}
                        media={media}
                        accessibilityLabel={\`View details for \${name}\`}
                      >
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {name}
                        </Text>
                        <div>SKU: {sku}</div>
                        <div>{quantity} available</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}`
  },
  'two-columns-with-primary-and-secondary-widths': {
    react: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Order details" sectioned>
            <p>
              Use to follow a normal section with a secondary section to create
              a 2/3 + 1/3 layout on detail pages (such as individual product or
              order pages). Can also be used on any page that needs to structure
              a lot of content. This layout stacks the columns on small screens.
            </p>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    title: 'Order details',
    flex: 2,
    margin: '0 8 0 0',
    bodyPadding: 16,
    html: '<p>Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens.</p>'
  }, {
    xtype: 'panel',
    title: 'Tags',
    flex: 1,
    bodyPadding: 16,
    html: '<p>Add tags to your order.</p>'
  }]
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LayoutPrimarySecondaryExampleProps {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

function LayoutPrimarySecondaryExample({
  primaryContent = (
    <p>
      Use to follow a normal section with a secondary section to create
      a 2/3 + 1/3 layout on detail pages (such as individual product or
      order pages). Can also be used on any page that needs to structure
      a lot of content. This layout stacks the columns on small screens.
    </p>
  ),
  secondaryContent = <p>Add tags to your order.</p>
}: LayoutPrimarySecondaryExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Order details" sectioned>
            {primaryContent}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Tags" sectioned>
            {secondaryContent}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  },
  'three-columns-with-equal-width': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Florida" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                455 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '343',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '254',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '258',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '344',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '259',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Minneapolis" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                1931 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '345',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '1230',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '260',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '701',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    flex: 1,
    margin: '0 8 0 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Florida',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Florida');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">455 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '343', name: 'Black & orange scarf', sku: '9234194023', quantity: '254'},
          {id: '258', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Nevada',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Nevada');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">301 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '344', name: 'Black & orange scarf', sku: '9234194023', quantity: '100'},
          {id: '259', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Minneapolis',
    margin: '0 0 0 0',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Minneapolis');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">1931 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '345', name: 'Black & orange scarf', sku: '9234194023', quantity: '1230'},
          {id: '260', name: 'Tucan scarf', sku: '9234194010', quantity: '701'}
        ]
      }
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Product',
  variant: 'plain',
  onClick: () => console.log('Product clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  url: string;
  name: string;
  sku: string;
  quantity: string;
  media: React.ReactNode;
}

interface LocationData {
  name: string;
  totalUnits: number;
  products: Product[];
}

interface LayoutThreeColumnsExampleProps {
  locations?: LocationData[];
  onManage?: (location: string) => void;
}

function LayoutThreeColumnsExample({
  locations = [
    {
      name: 'Florida',
      totalUnits: 455,
      products: [
        {
          id: '343',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '254',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '258',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Nevada',
      totalUnits: 301,
      products: [
        {
          id: '344',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '100',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '259',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Minneapolis',
      totalUnits: 1931,
      products: [
        {
          id: '345',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '1230',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '260',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '701',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    }
  ],
  onManage
}: LayoutThreeColumnsExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        {locations.map((location) => (
          <Layout.Section key={location.name} variant="oneThird">
            <LegacyCard 
              title={location.name} 
              actions={[{
                content: 'Manage',
                onAction: () => onManage?.(location.name)
              }]}
            >
              <LegacyCard.Section>
                <Text tone="subdued" as="span">
                  {location.totalUnits} units available
                </Text>
              </LegacyCard.Section>
              <LegacyCard.Section title="Items">
                <ResourceList
                  resourceName={{singular: 'product', plural: 'products'}}
                  items={location.products}
                  renderItem={(item) => {
                    const {id, url, name, sku, media, quantity} = item;

                    return (
                      <ResourceList.Item
                        id={id}
                        url={url}
                        media={media}
                        accessibilityLabel={\`View details for \${name}\`}
                      >
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {name}
                        </Text>
                        <div>SKU: {sku}</div>
                        <div>{quantity} available</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}`
  },
  'annotated': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    flex: 1,
    border: false,
    bodyPadding: 20,
    html: '<h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p>'
  }, {
    xtype: 'panel',
    flex: 2,
    margin: '0 0 0 16',
    items: [{
      xtype: 'form',
      bodyPadding: 16,
      defaults: {
        anchor: '100%',
        labelWidth: 100,
        margin: '0 0 16 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'Store name'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Account email',
        vtype: 'email'
      }]
    }]
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutAnnotatedExampleProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function LayoutAnnotatedExample({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange
}: LayoutAnnotatedExampleProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`
  },
  'annotated-with-sections': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <div style={{marginTop: 'var(--p-space-500)'}}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h2">
                Store details
              </Text>
              <Text tone="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    flex: 1,
    border: false,
    bodyPadding: '20 20 20 0',
    html: '<div style="margin-top:20px;"><h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p></div>'
  }, {
    xtype: 'panel',
    flex: 2,
    items: [{
      xtype: 'form',
      bodyPadding: 16,
      defaults: {
        anchor: '100%',
        labelWidth: 100,
        margin: '0 0 16 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'Store name'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Account email',
        vtype: 'email'
      }]
    }]
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutAnnotatedWithSectionsExampleProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function LayoutAnnotatedWithSectionsExample({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange
}: LayoutAnnotatedWithSectionsExampleProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <div style={{marginTop: 'var(--p-space-500)'}}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h2">
                Store details
              </Text>
              <Text tone="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  },
  'annotated-with-banner-at-the-top': {
    react: `import {
  Page,
  Layout,
  Banner,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => console.log('[Dismiss] Component dismissed')}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    ui: 'warning',
    bodyPadding: 16,
    closable: true,
    title: 'Order archived',
    html: '<p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    flex: 1,
    items: [{
      xtype: 'panel',
      flex: 1,
      border: false,
      bodyPadding: 20,
      html: '<h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p>'
    }, {
      xtype: 'panel',
      flex: 2,
      margin: '0 0 0 16',
      items: [{
        xtype: 'form',
        bodyPadding: 16,
        defaults: {
          anchor: '100%',
          labelWidth: 100,
          margin: '0 0 16 0'
        },
        items: [{
          xtype: 'textfield',
          fieldLabel: 'Store name'
        }, {
          xtype: 'textfield',
          fieldLabel: 'Account email',
          vtype: 'email'
        }]
      }]
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {
  Page,
  Layout,
  Banner,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutWithBannerProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
  bannerDismissed?: boolean;
  onBannerDismiss?: () => void;
}

function LayoutWithBanner({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange,
  bannerDismissed = false,
  onBannerDismiss
}: LayoutWithBannerProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);
  const [showBanner, setShowBanner] = useState(!bannerDismissed);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleBannerDismiss = useCallback(() => {
    setShowBanner(false);
    onBannerDismiss?.();
  }, [onBannerDismiss]);

  return (
    <Page fullWidth>
      <Layout>
        {showBanner && (
          <Layout.Section>
            <Banner title="Order archived" onDismiss={handleBannerDismiss}>
              <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`
  }
};

// FormLayout Examples
export const formLayoutExamples = {
  default: {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <TextField label="Store name" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
      <TextField
        type="email"
        label="Account email"
        onChange={(value) => console.log('[Change] Value:', value)}
        autoComplete="email"
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Store name',
    labelWidth: 100
  }, {
    xtype: 'textfield',
    fieldLabel: 'Account email',
    labelWidth: 100,
    vtype: 'email'
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface FormData {
  storeName: string;
  accountEmail: string;
}

interface FormLayoutProps {
  onSubmit?: (data: FormData) => void;
}

function FormLayout({ onSubmit }: FormLayoutProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    accountEmail: ''
  });

  const handleStoreNameChange = useCallback(
    (value: string) => setFormData(prev => ({...prev, storeName: value})),
    []
  );

  const handleEmailChange = useCallback(
    (value: string) => setFormData(prev => ({...prev, accountEmail: value})),
    []
  );

  return (
    <FormLayout>
      <TextField 
        label="Store name" 
        value={formData.storeName}
        onChange={handleStoreNameChange} 
        autoComplete="off" 
      />
      <TextField
        type="email"
        label="Account email"
        value={formData.accountEmail}
        onChange={handleEmailChange}
        autoComplete="email"
      />
    </FormLayout>
  );
}`
  },
  'field-group': {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          type="number"
          label="Minimum order"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Maximum order"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldcontainer',
    layout: 'hbox',
    defaults: {
      flex: 1,
      margin: '0 8 0 0'
    },
    items: [{
      xtype: 'numberfield',
      fieldLabel: 'Minimum order',
      labelWidth: 100
    }, {
      xtype: 'numberfield',
      fieldLabel: 'Maximum order',
      labelWidth: 100,
      margin: '0 0 0 0'
    }]
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Minimum order',
  type: 'number',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface OrderLimits {
  minimum: string;
  maximum: string;
}

interface FormLayoutFieldGroupExampleProps {
  initialLimits?: OrderLimits;
  onLimitsChange?: (limits: OrderLimits) => void;
}

function FormLayoutFieldGroupExample({
  initialLimits = { minimum: '', maximum: '' },
  onLimitsChange
}: FormLayoutFieldGroupExampleProps): JSX.Element {
  const [limits, setLimits] = useState<OrderLimits>(initialLimits);

  const handleMinimumChange = useCallback((value: string) => {
    const newLimits = {...limits, minimum: value};
    setLimits(newLimits);
    onLimitsChange?.(newLimits);
  }, [limits, onLimitsChange]);

  const handleMaximumChange = useCallback((value: string) => {
    const newLimits = {...limits, maximum: value};
    setLimits(newLimits);
    onLimitsChange?.(newLimits);
  }, [limits, onLimitsChange]);

  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          type="number"
          label="Minimum order"
          value={limits.minimum}
          onChange={handleMinimumChange}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Maximum order"
          value={limits.maximum}
          onChange={handleMaximumChange}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`
  },
  'condensed-field-group': {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField label="Length" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Width" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Height" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Unit" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
      </FormLayout.Group>
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldcontainer',
    layout: {
      type: 'hbox',
      pack: 'start'
    },
    defaults: {
      flex: 1,
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Length',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Width',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Height',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Unit',
      labelWidth: 40,
      margin: '0 0 0 0'
    }]
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Length',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface Dimensions {
  length: string;
  width: string;
  height: string;
  unit: string;
}

interface FormLayoutCondensedExampleProps {
  initialDimensions?: Dimensions;
  onDimensionsChange?: (dimensions: Dimensions) => void;
}

function FormLayoutCondensedExample({
  initialDimensions = { length: '', width: '', height: '', unit: 'cm' },
  onDimensionsChange
}: FormLayoutCondensedExampleProps): JSX.Element {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);

  const handleChange = useCallback((field: keyof Dimensions) => (value: string) => {
    const newDimensions = {...dimensions, [field]: value};
    setDimensions(newDimensions);
    onDimensionsChange?.(newDimensions);
  }, [dimensions, onDimensionsChange]);

  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField 
          label="Length" 
          value={dimensions.length}
          onChange={handleChange('length')} 
          autoComplete="off" 
        />
        <TextField 
          label="Width" 
          value={dimensions.width}
          onChange={handleChange('width')} 
          autoComplete="off" 
        />
        <TextField 
          label="Height" 
          value={dimensions.height}
          onChange={handleChange('height')} 
          autoComplete="off" 
        />
        <TextField 
          label="Unit" 
          value={dimensions.unit}
          onChange={handleChange('unit')} 
          autoComplete="off" 
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`
  },
  'with-help-text': {
    react: `import {FormLayout, TextField, Select} from '@shopify/polaris';
import React from 'react';

function Example() {
  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  return (
    <FormLayout>
      <TextField
        label="Store name"
        onChange={(value) => console.log('[Change] Value:', value)}
        autoComplete="off"
        helpText="This will be displayed on your storefront."
      />
      <TextField
        type="email"
        label="Account email"
        onChange={(value) => console.log('[Change] Value:', value)}
        autoComplete="email"
        helpText="We'll use this email address to inform you on future changes to Polaris."
      />
      <Select
        label="Shipping options"
        options={options}
        onChange={(value) => console.log('[Change] Value:', value)}
        helpText="Select when orders should be fulfilled."
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0',
    labelWidth: 120
  },
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Store name',
    afterLabelTextTpl: '<div class="help-text">This will be displayed on your storefront.</div>'
  }, {
    xtype: 'textfield',
    fieldLabel: 'Account email',
    vtype: 'email',
    afterLabelTextTpl: '<div class="help-text">We\\'ll use this email address to inform you on future changes to Polaris.</div>'
  }, {
    xtype: 'combobox',
    fieldLabel: 'Shipping options',
    store: [
      ['today', 'Today'],
      ['yesterday', 'Yesterday'],
      ['lastWeek', 'Last 7 days']
    ],
    queryMode: 'local',
    afterLabelTextTpl: '<div class="help-text">Select when orders should be fulfilled.</div>'
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  helpText: 'This will be displayed on your storefront.',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField, Select} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface FormData {
  storeName: string;
  accountEmail: string;
  shippingOption: string;
}

interface FormLayoutWithHelpTextExampleProps {
  initialData?: FormData;
  onDataChange?: (data: FormData) => void;
}

function FormLayoutWithHelpTextExample({
  initialData = { storeName: '', accountEmail: '', shippingOption: 'today' },
  onDataChange
}: FormLayoutWithHelpTextExampleProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>(initialData);

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const handleChange = useCallback((field: keyof FormData) => (value: string) => {
    const newData = {...formData, [field]: value};
    setFormData(newData);
    onDataChange?.(newData);
  }, [formData, onDataChange]);

  return (
    <FormLayout>
      <TextField
        label="Store name"
        value={formData.storeName}
        onChange={handleChange('storeName')}
        autoComplete="off"
        helpText="This will be displayed on your storefront."
      />
      <TextField
        type="email"
        label="Account email"
        value={formData.accountEmail}
        onChange={handleChange('accountEmail')}
        autoComplete="email"
        helpText="We'll use this email address to inform you on future changes to Polaris."
      />
      <Select
        label="Shipping options"
        options={options}
        value={formData.shippingOption}
        onChange={handleChange('shippingOption')}
        helpText="Select when orders should be fulfilled."
      />
    </FormLayout>
  );
}`
  },
  'sectioned': {
    react: `import {FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group title="Store details">
        <TextField
          label="Store name"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
        <TextField
          type="email"
          label="Account email"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="email"
        />
      </FormLayout.Group>
      <FormLayout.Group title="Store address">
        <TextField
          label="Address"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="address-line1"
        />
        <FormLayout.Group condensed>
          <TextField
            label="City"
            onChange={(value) => console.log('[Change] Value:', value)}
            autoComplete="address-level2"
          />
          <TextField
            label="Postal code"
            onChange={(value) => console.log('[Change] Value:', value)}
            autoComplete="postal-code"
          />
        </FormLayout.Group>
      </FormLayout.Group>
      <Checkbox
        label="Save this address"
        checked={false}
        onChange={(value) => console.log('[Change] Value:', value)}
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldset',
    title: 'Store details',
    layout: 'anchor',
    defaults: {
      anchor: '100%',
      margin: '0 0 16 0'
    },
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Store name'
    }, {
      xtype: 'textfield',
      fieldLabel: 'Account email',
      vtype: 'email'
    }]
  }, {
    xtype: 'fieldset',
    title: 'Store address',
    layout: 'anchor',
    margin: '16 0 0 0',
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Address',
      anchor: '100%',
      margin: '0 0 16 0'
    }, {
      xtype: 'fieldcontainer',
      layout: 'hbox',
      defaults: {
        flex: 1,
        margin: '0 8 0 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'City'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Postal code',
        margin: '0 0 0 0'
      }]
    }]
  }, {
    xtype: 'checkbox',
    boxLabel: 'Save this address',
    margin: '16 0 0 0'
  }]
});`,
    vanilla: `import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: 'Store name',
  type: 'text',
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});`\${e.target.id || 'checkbox'} changed: \${value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
  address: string;
  city: string;
  postalCode: string;
  saveAddress: boolean;
}

interface FormLayoutSectionedExampleProps {
  initialDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function FormLayoutSectionedExample({
  initialDetails = {
    storeName: '',
    accountEmail: '',
    address: '',
    city: '',
    postalCode: '',
    saveAddress: false
  },
  onDetailsChange
}: FormLayoutSectionedExampleProps): JSX.Element {
  const [details, setDetails] = useState<StoreDetails>(initialDetails);

  const handleChange = useCallback((field: keyof StoreDetails) => (value: string | boolean) => {
    const newDetails = {...details, [field]: value};
    setDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [details, onDetailsChange]);

  return (
    <FormLayout>
      <FormLayout.Group title="Store details">
        <TextField
          label="Store name"
          value={details.storeName}
          onChange={handleChange('storeName')}
          autoComplete="off"
        />
        <TextField
          type="email"
          label="Account email"
          value={details.accountEmail}
          onChange={handleChange('accountEmail')}
          autoComplete="email"
        />
      </FormLayout.Group>
      <FormLayout.Group title="Store address">
        <TextField
          label="Address"
          value={details.address}
          onChange={handleChange('address')}
          autoComplete="address-line1"
        />
        <FormLayout.Group condensed>
          <TextField
            label="City"
            value={details.city}
            onChange={handleChange('city')}
            autoComplete="address-level2"
          />
          <TextField
            label="Postal code"
            value={details.postalCode}
            onChange={handleChange('postalCode')}
            autoComplete="postal-code"
          />
        </FormLayout.Group>
      </FormLayout.Group>
      <Checkbox
        label="Save this address"
        checked={details.saveAddress}
        onChange={handleChange('saveAddress')}
      />
    </FormLayout>
  );
}`
  }
};

// Tabs Examples
export const tabsExamples = {
  default: {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsDefaultExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </Tabs>
  );
}`,
    extjs: `Ext.create('Ext.tab.Panel', {
  items: [{
    title: 'All',
    html: '<p>Tab 0 selected</p>'
  }, {
    title: 'Accepts marketing',
    html: '<p>Tab 1 selected</p>'
  }, {
    title: 'Repeat customers',
    html: '<p>Tab 2 selected</p>'
  }, {
    title: 'Prospects',
    html: '<p>Tab 3 selected</p>'
  }],
  listeners: {
    tabchange: function(tabPanel, newCard, oldCard) {
      console.log('Tab changed to:', newCard.title);
    }
  }
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TabAction {
  type: 'rename' | 'duplicate' | 'edit' | 'delete';
  onAction?: () => void;
  onPrimaryAction?: (value: string) => Promise<boolean>;
}

interface TabsWithActionsProps {
  initialTabs?: string[];
  canCreateNewView?: boolean;
}

function TabsWithActionsExample({ 
  initialTabs = ['All', 'Unpaid', 'Open', 'Closed', 'Local delivery', 'Local pickup'],
  canCreateNewView = true
}: TabsWithActionsProps): JSX.Element {
  const [itemStrings, setItemStrings] = useState<string[]>(initialTabs);
  const [selected, setSelected] = useState<number>(0);

  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const deleteView = useCallback((index: number): void => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  }, [itemStrings]);

  const duplicateView = useCallback(async (name: string): Promise<boolean> => {
    setItemStrings(prev => [...prev, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  }, [itemStrings.length]);

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: \`\${item}-\${index}\`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string) => {
                const newItemsStrings = itemStrings.map((tabItem, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return tabItem;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (name: string) => {
                await sleep(1);
                duplicateView(name);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));

  const onCreateNewView = useCallback(async (value: string): Promise<boolean> => {
    await sleep(500);
    setItemStrings(prev => [...prev, value]);
    setSelected(itemStrings.length);
    return true;
  }, [itemStrings.length]);

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView={canCreateNewView}
        onCreateNewView={onCreateNewView}
      >
        <LegacyCard.Section title={tabs[selected]?.content || ''}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  },
  'with-badge-content': {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsWithBadgeExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted-3',
      content: 'All',
      badge: '10+',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: 'Accepts marketing',
      badge: '4',
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: true,
  items: [{
    xtype: 'tabpanel',
    tabBarPosition: 'top',
    defaults: {
      padding: 20
    },
    items: [{
      title: 'All',
      tabConfig: {
        title: 'All <span class="badge">10+</span>'
      },
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Accepts marketing',
      tabConfig: {
        title: 'Accepts marketing <span class="badge">4</span>'
      },
      html: '<h3>Accepts marketing</h3><p>Tab 1 selected</p>'
    }],
    tabBar: {
      layout: {
        pack: 'stretch'
      }
    },
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';

type IconTone = 'base' | 'subdued' | 'primary' | 'info' | 'success' | 'caution' | 'warning' | 'critical';

interface IconColoredExampleProps {
  onIconClick?: (tone: IconTone) => void;
}

function IconColoredExample({ onIconClick }: IconColoredExampleProps): JSX.Element {
  const tones: IconTone[] = ['base', 'subdued', 'primary', 'info', 'success', 'caution', 'warning', 'critical'];

  return (
    <div>
      {tones.map((tone) => (
        <Icon 
          key={tone}
          source={PlusCircleIcon} 
          tone={tone}
          onClick={() => onIconClick?.(tone)}
        />
      ))}
    </div>
  );
}`
  },
  'with-custom-svg': {
    react: `import {Icon} from '@shopify/polaris';
import React from 'react';

function IconWithCustomSvgExample() {
  return (
    <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
  );
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<span class="icon icon--custom"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0" /></svg></span>',
  listeners: {
    render: function(component) {
      component.getEl().on('click', function() {
        console.log('Custom SVG icon clicked');
      });
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create  component
const component = new Component({
  label: '',
  onClick: () => console.log('click event')
});

// Mount component
component.mount('#app');`,
    typescript: `import {Icon} from '@shopify/polaris';
import React from 'react';

interface IconWithCustomSvgExampleProps {
  onIconClick?: () => void;
  accessibilityLabel?: string;
}

function IconWithCustomSvgExample({ 
  onIconClick,
  accessibilityLabel = 'Download arrow'
}: IconWithCustomSvgExampleProps): JSX.Element {
  const customSvg = "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>";

  return (
    <Icon 
      source={customSvg}
      accessibilityLabel={accessibilityLabel}
      onClick={onIconClick}
    />
  );
}`
  },
  'with-custom-svg-and-color': {
    react: `import {Icon} from '@shopify/polaris';
import React from 'react';

function IconWithCustomSvgAndColorExample() {
  const iconContent = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={iconContent} tone="warning" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<span class="icon icon--warning"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="rebeccapurple" /><circle cx="10" cy="10" r="6" fill="currentColor" /><circle cx="10" cy="10" r="3" /></svg></span>',
  listeners: {
    render: function(component) {
      component.getEl().on('click', function() {
        console.log('Custom colored icon clicked');
      });
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create  component
const component = new Component({
  label: '',
  onClick: () => console.log('click event')
});

// Mount component
component.mount('#app');`,
    typescript: `import {Icon} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface IconWithCustomSvgAndColorExampleProps {
  tone?: 'base' | 'subdued' | 'primary' | 'info' | 'success' | 'caution' | 'warning' | 'critical';
  onIconClick?: () => void;
}

function IconWithCustomSvgAndColorExample({ 
  tone = 'warning',
  onIconClick 
}: IconWithCustomSvgAndColorExampleProps): JSX.Element {
  const iconContent = (): ReactElement => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return (
    <Icon 
      source={iconContent} 
      tone={tone}
      onClick={onIconClick}
    />
  );
}`
  }
};

// Avatar Examples
export const avatarExamples = {
  default: {
    react: `import {Avatar} from '@shopify/polaris';
import React from 'react';

function Avatar() {
  return <Avatar customer name="Farrah" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="avatar avatar--customer" title="Farrah"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></div>',
  cls: 'avatar',
  listeners: {
    afterrender: function(cmp) {
      cmp.getEl().down('.avatar').set({
        'aria-label': 'Farrah',
        'role': 'img'
      });
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {Avatar} from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  name: string;
  customer?: boolean;
  source?: string;
}

function Avatar({ 
  name = "Farrah",
  customer = true,
  source
}: AvatarExampleProps): JSX.Element {
  return (
    <Avatar 
      customer={customer} 
      name={name}
      source={source}
    />
  );
}`
  },
  'extra-small': {
    react: `import {Button, Popover, ActionList, Avatar} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ExtraSmallAvatarExample() {
  const [active, setActive] = useState(true);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Manage staff
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList
          items={[
            {
              content: 'Chet Baker',
              prefix: <Avatar customer size="xs" name="Chet Baker" />,
            },
            {
              content: 'Farrah Fawcett',
              prefix: <Avatar customer size="xs" name="Farrah Fawcett" />,
            },
          ]}
        />
      </Popover>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Manage staff',
  iconCls: 'x-fa fa-caret-down',
  iconAlign: 'right',
  menu: {
    items: [{
      text: 'Chet Baker',
      icon: null,
      cls: 'avatar-menu-item',
      html: '<span class="avatar avatar--xs avatar--customer" title="Chet Baker"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></span> Chet Baker'
    }, {
      text: 'Farrah Fawcett',
      icon: null,
      cls: 'avatar-menu-item',
      html: '<span class="avatar avatar--xs avatar--customer" title="Farrah Fawcett"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></span> Farrah Fawcett'
    }]
  }
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Farrah Fawcett',
  onClick: () => console.log('Farrah Fawcett clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

interface CalloutCardAction {
  content: string;
  url?: string;
  onAction?: () => void;
  external?: boolean;
}

interface CalloutCardProps {
  title?: string;
  illustration?: string;
  children?: React.ReactNode;
  primaryAction?: CalloutCardAction;
}

function Example({
  title = "Customize the style of your checkout",
  illustration = "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
  children = <p>Upload your store's logo, change colors and fonts, and more.</p>,
  primaryAction = {
    content: 'Customize checkout',
    url: '#',
  }
}: CalloutCardProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={primaryAction}
    >
      {children}
    </CalloutCard>
  );
}`
  },
  'dismissable': {
    react: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    >
      <p>Upload your store's logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customize the style of your checkout',
  cls: 'callout-card',
  bodyPadding: 20,
  closable: true,
  closeAction: 'hide',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
    width: 120,
    height: 120,
    margin: '0 20 0 0'
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<p style="margin: 0 0 20px 0; color: #5c6b73;">Upload your store\\'s logo, change colors and fonts, and more.</p>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Customize checkout',
      ui: 'primary',
      handler: function() {
        console.log('Customize checkout clicked');
      }
    }]
  }],
  listeners: {
    close: function() {
      console.log('Callout card dismissed');
    }
  }
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Customize checkout',
  variant: 'primary',
  onClick: () => console.log('Customize checkout clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Tooltip, Text} from '@shopify/polaris';
import React from 'react';

interface TooltipDefaultProps {
  content?: string;
  children?: React.ReactNode;
  active?: boolean;
}

function TooltipDefault({ 
  content = "This order has shipping labels.",
  children,
  active = true 
}: TooltipDefaultProps): JSX.Element {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active={active} content={content}>
        {children || (
          <Text fontWeight="bold" as="span">
            Order #1001
          </Text>
        )}
      </Tooltip>
    </div>
  );
}`
  }
};

// Navigation Examples
export const navigationExamples = {
  default: {
    react: `import {Frame, Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, ProductIcon} from '@shopify/polaris-icons';
import React from 'react';

function NavigationDefault() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrderIcon,
              badge: '15',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductIcon,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}`,
    extjs: `Ext.create('Ext.tree.Panel', {
  title: 'Navigation',
  width: 250,
  height: 400,
  rootVisible: false,
  store: Ext.create('Ext.data.TreeStore', {
    root: {
      expanded: true,
      children: [{
        text: 'Home',
        iconCls: 'x-fa fa-home',
        leaf: true,
        href: '#'
      }, {
        text: 'Orders',
        iconCls: 'x-fa fa-shopping-cart',
        leaf: true,
        href: '#',
        qtip: '15 orders'
      }, {
        text: 'Products',
        iconCls: 'x-fa fa-cube',
        leaf: true,
        href: '#'
      }]
    }
  }),
  listeners: {
    itemclick: function(view, record) {
      if (record.get('href')) {
        console.log('Navigate to:', record.get('text'));
      }
    }
  }
});`,
    vanilla: `import { BadgeComponent } from '@cin7/vanilla-js';

// Create badge component
const badge = new BadgeComponent({
  text: 'Badge Text',
  variant: 'success'
});

// Mount badge
badge.mount('#app');`,
    typescript: `import {Frame, Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, ProductIcon} from '@shopify/polaris-icons';
import React from 'react';

interface NavigationItem {
  url: string;
  label: string;
  icon: React.ComponentType;
  badge?: string;
  excludePaths?: string[];
}

interface NavigationDefaultProps {
  location?: string;
  onItemClick?: (item: NavigationItem) => void;
}

function NavigationDefault({ 
  location = "/",
  onItemClick 
}: NavigationDefaultProps): JSX.Element {
  const items: NavigationItem[] = [
    {
      url: '#',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      url: '#',
      excludePaths: ['#'],
      label: 'Orders',
      icon: OrderIcon,
      badge: '15',
    },
    {
      url: '#',
      excludePaths: ['#'],
      label: 'Products',
      icon: ProductIcon,
    },
  ];

  return (
    <Frame>
      <Navigation location={location}>
        <Navigation.Section
          items={items.map(item => ({
            ...item,
            onAction: () => onItemClick?.(item)
          }))}
        />
      </Navigation>
    </Frame>
  );
}`
  }
};

// Form Examples
export const formExamples = {
  'custom-on-submit': {
    react: `import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FormCustomOnSubmit() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', { email, newsletter });
    setEmail('');
    setNewsletter(false);
  }, [email, newsletter]);

  const handleNewsLetterChange = useCallback(
    (value: boolean) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value: string) => setEmail(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We'll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Newsletter Signup',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'checkboxfield',
    fieldLabel: 'Newsletter',
    boxLabel: 'Sign up for the Polaris newsletter',
    name: 'newsletter',
    inputValue: true
  }, {
    xtype: 'textfield',
    fieldLabel: 'Email',
    name: 'email',
    vtype: 'email',
    allowBlank: false,
    emptyText: 'Enter your email address',
    helpText: 'We\\'ll use this email address to inform you on future changes to Polaris.'
  }],
  buttons: [{
    text: 'Submit',
    formBind: true,
    handler: function() {
      var form = this.up('form').getForm();
      if (form.isValid()) {
        var values = form.getValues();
        console.log('Form submitted:', values);
        form.reset();
      }
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Submit',
  variant: 'primary',
  onClick: () => console.log('Submit clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Frame, Loading} from '@shopify/polaris';
import React from 'react';

interface LoadingDefaultProps {
  height?: string;
}

function LoadingDefault({ height = '100px' }: LoadingDefaultProps): JSX.Element {
  return (
    <div style={{height}}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}`
  }
};

// Link Examples
export const linkExamples = {
  default: {
    react: `import {Link} from '@shopify/polaris';
import React from 'react';

function LinkDefault() {
  return <Link url="https://help.shopify.com/manual">fulfilling orders</Link>;
}`,
    extjs: `Ext.create('Ext.container.Container', {
  html: '<a href="https://help.shopify.com/manual" target="_blank" class="link">fulfilling orders</a>',
  listeners: {
    afterrender: function(container) {
      container.getEl().down('a').on('click', function(e, target) {
        console.log('Link clicked:', target.href);
      });
    }
  }
});`,
    vanilla: `import { LinkComponent } from '@cin7/vanilla-js';

// Create link component
const component = new LinkComponent({
  label: '',
  onClick: () => console.log('click event')
});

// Mount component
component.mount('#app');`,
    typescript: `import {Link} from '@shopify/polaris';
import React from 'react';

interface LinkDefaultProps {
  url?: string;
  children?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

function LinkDefault({ 
  url = "https://help.shopify.com/manual",
  children = "fulfilling orders",
  external = false,
  onClick
}: LinkDefaultProps): JSX.Element {
  return (
    <Link 
      url={url} 
      external={external}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}`
  }
};

// Tag Examples  
export const tagExamples = {
  default: {
    react: `import {Tag} from '@shopify/polaris';
import {useState} from 'react';

function TagDefault() {
  const [tagActive, setTagActive] = useState(true);

  return tagActive ? (
    <Tag onRemove={() => setTagActive(false)}>
      VIP Customer
    </Tag>
  ) : null;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'component',
    html: '<span class="tag">VIP Customer <button class="tag__remove">×</button></span>',
    listeners: {
      afterrender: function(cmp) {
        cmp.getEl().down('.tag__remove').on('click', function() {
          cmp.getEl().down('.tag').setDisplayed(false);
          console.log('Tag removed');
        });
      }
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Click me',
  onClick: () => console.log('Click me clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface RangeSliderDefaultProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  title?: string;
  showOutput?: boolean;
  onChange?: (value: number) => void;
}

function RangeSliderDefault({
  initialValue = 32,
  min = 0,
  max = 100,
  step = 1,
  label = "Opacity percentage",
  title = "Background color",
  showOutput = true,
  onChange
}: RangeSliderDefaultProps): JSX.Element {
  const [rangeValue, setRangeValue] = useState<number>(initialValue);

  const handleRangeSliderChange = useCallback(
    (value: number) => {
      setRangeValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <LegacyCard sectioned title={title}>
      <RangeSlider
        label={label}
        value={rangeValue}
        min={min}
        max={max}
        step={step}
        onChange={handleRangeSliderChange}
        output={showOutput}
      />
    </LegacyCard>
  );
}`
  }
};

// App Provider Examples
export const appProviderExamples = {
  default: {
    react: `import {
  AppProvider,
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';

function AppProviderDefault() {
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
      }}
    >
      <Page>
        <LegacyCard>
          <ResourceList
            showHeader
            items={[
              {
                id: '341',
                url: '#',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: '256',
                url: '#',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media}>
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}`,
    extjs: `Ext.create('Ext.app.Application', {
  name: 'PolarisApp',
  
  // App configuration equivalent to AppProvider
  appConfig: {
    locale: 'en-US',
    i18n: {
      sortingLabel: 'Sort by',
      defaultItemSingular: 'item',
      defaultItemPlural: 'items',
      showing: 'Showing {0} {1}',
      viewItem: 'View details for {0}',
      checkbox: 'checkbox'
    }
  },
  
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'Resource List Demo',
        bodyPadding: 20,
        items: [{
          xtype: 'grid',
          title: 'Customer List',
          height: 400,
          columns: [{
            text: 'Avatar',
            width: 80,
            renderer: function(value, meta, record) {
              return '<div class="customer-avatar">' + 
                     record.get('name').charAt(0) + '</div>';
            }
          }, {
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            renderer: function(value) {
              return '<strong>' + value + '</strong>';
            }
          }, {
            text: 'Location',
            dataIndex: 'location',
            flex: 1
          }],
          store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'location'],
            data: [
              {id: '341', name: 'Mae Jemison', location: 'Decatur, USA'},
              {id: '256', name: 'Ellen Ochoa', location: 'Los Angeles, USA'}
            ]
          }),
          listeners: {
            itemclick: function(view, record) {
              console.log('Selected customer:', record.get('name'));
            }
          }
        }]
      }]
    });
  }
});`,
    vanilla: `import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');`,
    typescript: `import {
  AppProvider,
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface CustomerItem {
  id: string;
  url: string;
  name: string;
  location: string;
}

interface AppProviderDefaultProps {
  customers?: CustomerItem[];
  locale?: string;
  onItemSelect?: (item: CustomerItem) => void;
}

function AppProviderDefault({
  customers = [
    {
      id: '341',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '256',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ],
  locale = 'en-US',
  onItemSelect
}: AppProviderDefaultProps): JSX.Element {
  const handleItemClick = (item: CustomerItem) => {
    onItemSelect?.(item);
  };

  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
      }}
    >
      <Page>
        <LegacyCard>
          <ResourceList
            showHeader
            items={customers}
            renderItem={(item: CustomerItem) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item 
                  id={id} 
                  url={url} 
                  media={media}
                  onClick={() => handleItemClick(item)}
                >
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}`
  }
};

// Contextual Save Bar Examples
export const contextualSaveBarExamples = {
  default: {
    react: `import {Frame, ContextualSaveBar} from '@shopify/polaris';
import React from 'react';

function ContextualSaveBarDefault() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 86,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
        }}
      >
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  height: 250,
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    cls: 'contextual-save-bar',
    height: 60,
    items: [{
      xtype: 'image',
      src: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      width: 86,
      height: 30
    }, {
      xtype: 'tbfill'
    }, {
      xtype: 'displayfield',
      value: 'Unsaved changes',
      cls: 'save-bar-message',
      margin: '0 20 0 0'
    }, {
      xtype: 'button',
      text: 'Discard',
      margin: '0 10 0 0',
      handler: function() {
        console.log('add clear form logic');
      }
    }, {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('add form submit logic');
      }
    }]
  }, {
    region: 'center',
    html: '<div style="padding: 20px;">Page content goes here...</div>'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  disabled: true,
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Page, LegacyCard, DataTable} from '@shopify/polaris';
import React, {useMemo} from 'react';

interface ProductData {
  product: string;
  price: string;
  sku: number;
  quantity: number;
  sales: string;
}

interface DataTableDefaultProps {
  title?: string;
  data?: ProductData[];
  showTotals?: boolean;
  sortable?: boolean;
  onRowClick?: (rowData: ProductData, index: number) => void;
}

function DataTableDefault({
  title = "Sales by product",
  data,
  showTotals = true,
  sortable = false,
  onRowClick
}: DataTableDefaultProps): JSX.Element {
  const defaultData: ProductData[] = [
    {
      product: 'Emerald Silk Gown',
      price: '$875.00',
      sku: 124689,
      quantity: 140,
      sales: '$122,500.00'
    },
    {
      product: 'Mauve Cashmere Scarf',
      price: '$230.00',
      sku: 124533,
      quantity: 83,
      sales: '$19,090.00'
    },
    {
      product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      price: '$445.00',
      sku: 124518,
      quantity: 32,
      sales: '$14,240.00'
    }
  ];

  const tableData = data || defaultData;

  const rows = useMemo(() => 
    tableData.map((item, index) => {
      const row = [item.product, item.price, item.sku, item.quantity, item.sales];
      return onRowClick ? {
        ...row,
        onClick: () => onRowClick(item, index)
      } : row;
    }), [tableData, onRowClick]);

  const totals = useMemo(() => {
    if (!showTotals) return undefined;
    
    const totalQuantity = tableData.reduce((sum, item) => sum + item.quantity, 0);
    const totalSales = tableData.reduce((sum, item) => {
      const salesValue = parseFloat(item.sales.replace(/[$,]/g, ''));
      return sum + salesValue;
    }, 0);
    
    return ['', '', '', totalQuantity, \`$\${totalSales.toLocaleString()}.00\`];
  }, [tableData, showTotals]);

  return (
    <Page title={title}>
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}
          totals={totals}
          sortable={sortable}
        />
      </LegacyCard>
    </Page>
  );
}`
  }
};

// Footer Help Examples
export const footerHelpExamples = {
  default: {
    react: `import {FooterHelp, Link} from '@shopify/polaris';
import React from 'react';

function FooterHelpDefault() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'component',
    cls: 'footer-help',
    html: 'Learn more about <a href="https://help.shopify.com/manual/orders/fulfill-orders" target="_blank">fulfilling orders</a>',
    style: {
      color: '#6D7175',
      fontSize: '14px',
      textAlign: 'center',
      padding: '12px 0',
      borderTop: '1px solid #E1E3E5'
    },
    listeners: {
      afterrender: function(component) {
        // Add click tracking to links
        const links = component.getEl().query('a');
        links.forEach(link => {
          link.addEventListener('click', function(e) {
            console.log('Footer help link clicked:', e.target.href);
          });
        });
      }
    }
  }]
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {FooterHelp, Link} from '@shopify/polaris';
import React from 'react';

interface FooterHelpDefaultProps {
  children?: React.ReactNode;
  helpUrl?: string;
  helpText?: string;
  linkText?: string;
  onLinkClick?: (url: string) => void;
}

function FooterHelpDefault({
  children,
  helpUrl = "https://help.shopify.com/manual/orders/fulfill-orders",
  helpText = "Learn more about",
  linkText = "fulfilling orders",
  onLinkClick
}: FooterHelpDefaultProps): JSX.Element {
  const handleLinkClick = (url: string) => {
    onLinkClick?.(url);
    console.log('Footer help link clicked:', url);
  };

  if (children) {
    return <FooterHelp>{children}</FooterHelp>;
  }

  return (
    <FooterHelp>
      {helpText}{' '}
      <Link 
        url={helpUrl} 
        onClick={() => handleLinkClick(helpUrl)}
        external
      >
        {linkText}
      </Link>
    </FooterHelp>
  );
}`
  }
};

// Frame Examples
export const frameExamples = {
  default: {
    react: `import {
  Frame,
  TopBar,
  Navigation,
  Page,
  LegacyCard,
  AppProvider
} from '@shopify/polaris';
import {HomeIcon, OrderIcon} from '@shopify/polaris-icons';
import React, {useState, useCallback} from 'react';

function FrameDefault() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((active) => !active),
    [],
  );

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((active) => !active),
    [],
  );

  const logo = {
    width: 86,
    topBarSource: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    accessibilityLabel: 'Shopify',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      name="John Doe"
      detail="My Store"
      initials="JD"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[{items: [{content: 'Settings'}, {content: 'Logout'}]}]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Main Navigation"
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
          },
          {
            label: 'Orders',
            icon: OrderIcon,
            url: '/orders',
          },
        ]}
      />
    </Navigation>
  );

  return (
    <div style={{height: '500px'}}>
      <AppProvider i18n={{}}>
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          <Page title="Dashboard">
            <LegacyCard title="Welcome" sectioned>
              <p>This is your admin dashboard.</p>
            </LegacyCard>
          </Page>
        </Frame>
      </AppProvider>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    height: 50,
    cls: 'app-topbar',
    items: [{
      xtype: 'image',
      src: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      width: 86,
      height: 30
    }, {
      xtype: 'tbfill'
    }, {
      xtype: 'button',
      text: 'JD',
      iconCls: 'user-icon',
      menu: [{
        text: 'Settings',
        handler: function() {
          console.log('Settings clicked');
        }
      }, {
        text: 'Logout',
        handler: function() {
          console.log('Logout clicked');
        }
      }]
    }]
  }, {
    region: 'west',
    xtype: 'treepanel',
    title: 'Navigation',
    width: 250,
    collapsible: true,
    rootVisible: false,
    store: Ext.create('Ext.data.TreeStore', {
      root: {
        expanded: true,
        children: [{
          text: 'Dashboard',
          iconCls: 'home-icon',
          leaf: true,
          url: '/dashboard'
        }, {
          text: 'Orders',
          iconCls: 'order-icon',
          leaf: true,
          url: '/orders'
        }]
      }
    }),
    listeners: {
      itemclick: function(view, record) {
        if (record.isLeaf()) {
          console.log('Navigate to:', record.get('url'));
        }
      }
    }
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Dashboard',
    bodyPadding: 20,
    items: [{
      xtype: 'panel',
      title: 'Welcome',
      bodyPadding: 10,
      html: '<p>This is your admin dashboard.</p>'
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Orders',
  onClick: () => console.log('Orders clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {LegacyTabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Tab {
  id: string;
  content: string;
  accessibilityLabel?: string;
  panelID: string;
}

interface LegacyTabsDefaultProps {
  tabs?: Tab[];
  initialSelected?: number;
  onTabChange?: (index: number) => void;
}

function LegacyTabsDefault({
  tabs = [
    {
      id: 'all-customers',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-panel',
    },
    {
      id: 'accepts-marketing',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-panel',
    },
  ],
  initialSelected = 0,
  onTabChange
}: LegacyTabsDefaultProps): JSX.Element {
  const [selected, setSelected] = useState<number>(initialSelected);

  const handleTabChange = useCallback((index: number) => {
    setSelected(index);
    onTabChange?.(index);
  }, [onTabChange]);

  return (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyTabs.Panel id="all-customers-panel">
        All customers content
      </LegacyTabs.Panel>
      <LegacyTabs.Panel id="accepts-marketing-panel">
        Accepts marketing content
      </LegacyTabs.Panel>
    </LegacyTabs>
  );
}`
  }
};

// Page Actions Examples
export const pageActionsExamples = {
  default: {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function PageActionsDefault() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        disabled: false,
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: ['->', {
    xtype: 'button',
    text: 'Delete',
    ui: 'destructive'
  }, {
    xtype: 'button',
    text: 'Save',
    ui: 'primary'
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Save',
  variant: 'primary',
  onClick: () => console.log('Save clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {ProgressBar} from '@shopify/polaris';
import React from 'react';

interface ProgressBarDefaultProps {
  progress?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'critical';
}

function ProgressBarDefault({
  progress = 75,
  size = 'medium',
  color = 'primary'
}: ProgressBarDefaultProps): JSX.Element {
  return (
    <ProgressBar 
      progress={progress} 
      size={size}
      color={color}
    />
  );
}`
  }
};

// Option List Examples
export const optionListExamples = {
  default: {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function OptionListDefault() {
  const [selected, setSelected] = useState([]);

  const options = [
    {value: 'byward_market', label: 'Byward Market'},
    {value: 'centretown', label: 'Centretown'},
    {value: 'hintonburg', label: 'Hintonburg'},
    {value: 'westboro', label: 'Westboro'},
    {value: 'downtown', label: 'Downtown'},
  ];

  return (
    <OptionList
      title="Inventory Location"
      onChange={setSelected}
      options={options}
      selected={selected}
      allowMultiple
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Inventory Location',
  columns: 1,
  items: [{
    boxLabel: 'Byward Market',
    name: 'location',
    inputValue: 'byward_market'
  }, {
    boxLabel: 'Centretown',
    name: 'location',
    inputValue: 'centretown'
  }, {
    boxLabel: 'Hintonburg',
    name: 'location',
    inputValue: 'hintonburg'
  }, {
    boxLabel: 'Westboro',
    name: 'location',
    inputValue: 'westboro'
  }, {
    boxLabel: 'Downtown',
    name: 'location',
    inputValue: 'downtown'
  }],
  listeners: {
    change: function(checkboxgroup, newValue) {
      console.log('Selected locations:', newValue.location);
    }
  }
});`,
    vanilla: `import { CheckboxComponent } from '@cin7/vanilla-js';

// Create checkbox component
const checkbox = new CheckboxComponent({
  label: 'Click me',
  onChange: (checked) => console.log('Checkbox is now:', checked)
});

// Mount to container
checkbox.mount('#app');`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

interface Option {
  value: string;
  label: string;
}

interface OptionListDefaultProps {
  title?: string;
  options?: Option[];
  allowMultiple?: boolean;
  onChange?: (selected: string[]) => void;
}

function OptionListDefault({
  title = "Inventory Location",
  options = [
    {value: 'byward_market', label: 'Byward Market'},
    {value: 'centretown', label: 'Centretown'},
    {value: 'hintonburg', label: 'Hintonburg'},
    {value: 'westboro', label: 'Westboro'},
    {value: 'downtown', label: 'Downtown'},
  ],
  allowMultiple = true,
  onChange
}: OptionListDefaultProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (newSelected: string[]) => {
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <OptionList
      title={title}
      onChange={handleChange}
      options={options}
      selected={selected}
      allowMultiple={allowMultiple}
    />
  );
}`
  }
};

// Color Picker Examples
export const colorPickerExamples = {
  default: {
    react: `import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';

function ColorPickerDefault() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return (
    <ColorPicker onChange={setColor} color={color} />
  );
}`,
    extjs: `Ext.create('Ext.picker.Color', {
  value: '008000',
  listeners: {
    select: function(picker, selColor) {
      console.log('Color selected:', '#' + selColor);
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
}

interface ColorPickerDefaultProps {
  initialColor?: HSBColor;
  onChange?: (color: HSBColor) => void;
}

function ColorPickerDefault({
  initialColor = {
    hue: 120,
    brightness: 1,
    saturation: 1,
  },
  onChange
}: ColorPickerDefaultProps): JSX.Element {
  const [color, setColor] = useState<HSBColor>(initialColor);

  const handleChange = (newColor: HSBColor) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <ColorPicker onChange={handleChange} color={color} />
  );
}`
  }
};

// Date Picker Examples
export const datePickerExamples = {
  default: {
    react: `import {DatePicker} from '@shopify/polaris';
import {useState} from 'react';

function DatePickerDefault() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = (month, year) => setDate({month, year});

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Date', {
  fieldLabel: 'Select Date',
  value: new Date(),
  format: 'Y-m-d',
  listeners: {
    select: function(datefield, date) {
      console.log('Date selected:', Ext.Date.format(date, 'Y-m-d'));
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {DatePicker} from '@shopify/polaris';
import {useState} from 'react';

interface DateRange {
  start: Date;
  end: Date;
}

interface DatePickerDefaultProps {
  initialMonth?: number;
  initialYear?: number;
  initialSelected?: DateRange;
  onChange?: (selected: DateRange) => void;
}

function DatePickerDefault({
  initialMonth = 1,
  initialYear = 2018,
  initialSelected = {
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)'),
  },
  onChange
}: DatePickerDefaultProps): JSX.Element {
  const [{month, year}, setDate] = useState({month: initialMonth, year: initialYear});
  const [selectedDates, setSelectedDates] = useState<DateRange>(initialSelected);

  const handleMonthChange = (month: number, year: number) => setDate({month, year});
  
  const handleChange = (selected: DateRange) => {
    setSelectedDates(selected);
    onChange?.(selected);
  };

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={handleChange}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}`
  }
};

// Drop Zone Examples
export const dropZoneExamples = {
  default: {
    react: `import {DropZone, LegacyStack, Thumbnail, Text} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function DropZoneDefault() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'File Upload',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'filefield',
    name: 'uploadFile',
    fieldLabel: 'Upload File',
    labelWidth: 100,
    msgTarget: 'side',
    allowBlank: false,
    anchor: '100%',
    buttonText: 'Select File...'
  }],
  buttons: [{
    text: 'Upload',
    handler: function() {
      var form = this.up('form').getForm();
      if(form.isValid()){
        form.submit({
          url: '/upload',
          waitMsg: 'Uploading your file...',
          success: function(fp, o) {
            console.log('File uploaded successfully');
          }
        });
      }
    }
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'Upload',
  onClick: () => console.log('Upload clicked')
});

// Mount to container
button.mount('#app');
    typescript: `import {Thumbnail} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';

interface ThumbnailDefaultProps {
  source?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
}

function ThumbnailDefault({
  source = "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
  alt = "Black leather choker necklace",
  size = "medium"
}: ThumbnailDefaultProps): JSX.Element {
  return (
    <Thumbnail
      source={source}
      alt={alt}
      size={size}
    />
  );
}`
  }
};

// Video Thumbnail Examples
export const videoThumbnailExamples = {
  default: {
    react: `import {VideoThumbnail} from '@shopify/polaris';

function VideoThumbnailDefault() {
  return (
    <VideoThumbnail
      videoLength={80}
      thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg"
      onClick={() => console.log('Video clicked')}
    />
  );
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="video-thumbnail" style="position: relative; display: inline-block;"><img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg" style="width: 160px; height: 90px; border-radius: 4px;"><div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: white; padding: 2px 6px; border-radius: 2px; font-size: 12px;">1:20</div><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">▶</div></div>',
  listeners: {
    afterrender: function(cmp) {
      cmp.getEl().on('click', function() {
        console.log('Video clicked');
      });
    }
  }
});`,
    vanilla: `import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');`,
    typescript: `import {VideoThumbnail} from '@shopify/polaris';

interface VideoThumbnailDefaultProps {
  videoLength?: number;
  thumbnailUrl?: string;
  onClick?: () => void;
}

function VideoThumbnailDefault({
  videoLength = 80,
  thumbnailUrl = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg",
  onClick
}: VideoThumbnailDefaultProps): JSX.Element {
  const handleClick = () => {
    console.log('Video clicked');
    onClick?.();
  };

  return (
    <VideoThumbnail
      videoLength={videoLength}
      thumbnailUrl={thumbnailUrl}
      onClick={handleClick}
    />
  );
}`
  }
};

// Account Connection Examples
export const accountConnectionExamples = {
  default: {
    react: `import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AccountConnectionDefault() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'john.smith@merchantstore.com' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, []);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's{' '}
      <Link url="https://merchanthub.com/terms">terms and conditions</Link>. You'll pay a
      commission rate of 2.9% on sales made through Merchant Hub.
    </p>
  );

  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="Merchant Hub"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Account Connection',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'container',
    layout: 'vbox',
    items: [{
      xtype: 'label',
      text: 'Merchant Hub',
      style: 'font-weight: bold; font-size: 16px; margin-bottom: 10px;'
    }, {
      xtype: 'label',
      itemId: 'statusLabel',
      text: 'No account connected',
      style: 'color: #666; margin-bottom: 15px;'
    }, {
      xtype: 'button',
      itemId: 'actionButton',
      text: 'Connect',
      ui: 'primary',
      handler: function() {
        var panel = this.up('panel');
        var statusLabel = panel.down('#statusLabel');
        var isConnected = this.getText() === 'Disconnect';
        
        if (isConnected) {
          this.setText('Connect');
          statusLabel.setText('No account connected');
        } else {
          this.setText('Disconnect');
          statusLabel.setText('Account connected (john.smith@merchantstore.com)');
        }
      }
    }, {
      xtype: 'label',
      itemId: 'termsLabel',
      text: 'By clicking Connect, you agree to accept Merchant Hub\\'s terms and conditions. You\\'ll pay a commission rate of 2.9% on sales made through Merchant Hub.',
      style: 'color: #666; font-size: 12px; margin-top: 15px; line-height: 1.4;'
    }]
  }]
});`,
    vanilla: `import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: 'By clicking Connect, you agree to accept Merchant Hub\\',
  variant: 'primary',
  onClick: () => console.log('By clicking Connect, you agree to accept Merchant Hub\\ clicked')
});

// Mount to container
button.mount('#app');`,
    typescript: `import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface AccountConnectionDefaultProps {
  onConnect?: (connected: boolean) => void;
  initialConnected?: boolean;
}

interface ConnectionState {
  connected: boolean;
  accountName: string;
}

function AccountConnectionDefault({ 
  onConnect,
  initialConnected = false 
}: AccountConnectionDefaultProps): JSX.Element {
  const [state, setState] = useState<ConnectionState>({
    connected: initialConnected,
    accountName: initialConnected ? 'john.smith@merchantstore.com' : ''
  });

  const handleAction = useCallback(() => {
    setState(prevState => {
      const newConnected = !prevState.connected;
      const newState = {
        connected: newConnected,
        accountName: newConnected ? 'john.smith@merchantstore.com' : ''
      };
      
      onConnect?.(newConnected);
      return newState;
    });
  }, [onConnect]);

  const buttonText: string = state.connected ? 'Disconnect' : 'Connect';
  const details: string = state.connected ? 'Account connected' : 'No account connected';
  const terms: JSX.Element | null = state.connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's{' '}
      <Link url="https://merchanthub.com/terms">terms and conditions</Link>. You'll pay a
      commission rate of 2.9% on sales made through Merchant Hub.
    </p>
  );

  return (
    <AccountConnection
      accountName={state.accountName}
      connected={state.connected}
      title="Merchant Hub"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
}`
  }
};

const componentExamples: Record<string, any> = {
  'account-connection': accountConnectionExamples,
  'action-list': actionListExamples,
  'app-provider': appProviderExamples,
  'autocomplete': autocompleteExamples,
  'choice-list': choiceListExamples,
  'collapsible': collapsibleExamples,
  'color-picker': colorPickerExamples,
  'combobox': comboboxExamples,
  'contextual-save-bar': contextualSaveBarExamples,
  'data-table': dataTableExamples,
  'date-picker': datePickerExamples,
  'deprecated-card': deprecatedCardExamples,
  'description-list': descriptionListExamples,
  'drop-zone': dropZoneExamples,
  'exception-list': exceptionListExamples,
  'filters': filtersExamples,
  'footer-help': footerHelpExamples,
  'form': formExamples,
  'frame': frameExamples,
  'fullscreen-bar': fullscreenBarExamples,
  'index-filter': indexFilterExamples,
  'index-filters': indexFiltersExamples,
  'index-table': indexTableExamples,
  'inline-error': inlineErrorExamples,
  'inline-grid': inlineGridExamples,
  'keyboard-key': keyboardKeyExamples,
  'legacy-card': legacyCardExamples,
  'legacy-filters': legacyFiltersExamples,
  'legacy-tabs': legacyTabsExamples,
  'link': linkExamples,
  'listbox': listboxExamples,
  'loading': loadingExamples,
  'navigation': navigationExamples,
  'option-list': optionListExamples,
  'page-actions': pageActionsExamples,
  'pagination': paginationExamples,
  'popover': popoverExamples,
  'progress-bar': progressBarExamples,
  'radio-button': radioButtonExamples,
  'range-slider': rangeSliderExamples,
  'resource-item': resourceItemExamples,
  'resource-list': resourceListExamples,
  'scrollable': scrollableExamples,
  'setting-toggle': settingToggleExamples,
  'sheet': sheetExamples,
  'skeleton-body-text': skeletonBodyTextExamples,
  'skeleton-display-text': skeletonDisplayTextExamples,
  'skeleton-page': skeletonPageExamples,
  'skeleton-tabs': skeletonTabsExamples,
  'skeleton-thumbnail': skeletonThumbnailExamples,
  'tag': tagExamples,
  'text-container': textContainerExamples,
  'thumbnail': thumbnailExamples,
  'toast': toastExamples,
  'tooltip': tooltipExamples,
  'top-bar': topBarExamples,
  'video-thumbnail': videoThumbnailExamples,
  'button-group': buttonGroupExamples,
  'button': buttonExamples,
  'card': cardExamples,
  'badge': badgeExamples,
  'text-field': textFieldExamples,
  'banner': bannerExamples,
  'select': selectExamples,
  'modal': modalExamples,
  'checkbox': checkboxExamples,
  'page': pageExamples,
  'layout': layoutExamples,
  'form-layout': formLayoutExamples,
  'tabs': tabsExamples,
  'list': listExamples,
  'icon': iconExamples,
  'avatar': avatarExamples,
  'bleed': bleedExamples,
  'box': boxExamples,
  'divider': dividerExamples,
  'grid': gridExamples,
  'spinner': spinnerExamples,
  'text': textExamples,
  'block-stack': blockStackExamples,
  'inline-stack': inlineStackExamples,
  'legacy-stack': legacyStackExamples,
  'empty-state': emptyStateExamples,
  'callout-card': calloutCards,
  'media-card': mediaCards,
  // All 56 missing components have been implemented
};

// Helper function to generate examples for a component
export function getCodeExamples(componentName: string, exampleName: string): CodeExampleVariants | null {
  const component = componentExamples[componentName];
  if (!component || !component[exampleName]) {
    return null;
  }

  return component[exampleName];
}

// Helper to extract component and example names from filename
export function parseExampleFileName(fileName: string): { component: string, example: string } | null {
  // Remove .tsx extension
  const nameWithoutExt = fileName.replace('.tsx', '');
  
  // List of known component prefixes (ordered by length to match longest first)
  const componentPrefixes = [
    'button-group',
    'account-connection',
    'page-actions',
    'exception-list',
    'progress-bar',
    'skeleton-body-text',
    'skeleton-display-text',
    'skeleton-page',
    'skeleton-tabs',
    'skeleton-thumbnail',
    'video-thumbnail',
    'keyboard-key',
    'block-stack',
    'callout-card',
    'empty-state',
    'form-layout',
    'inline-grid',
    'inline-stack',
    'media-card',
    'action-list',
    'description-list',
    'option-list',
    'resource-item',
    'resource-list',
    'footer-help',
    'fullscreen-bar',
    'choice-list',
    'color-picker',
    'date-picker',
    'drop-zone',
    'index-filters',
    'index-table',
    'inline-error',
    'radio-button',
    'range-slider',
    'text-field',
    'contextual-save-bar',
    'legacy-card',
    'legacy-filters',
    'legacy-stack',
    'legacy-tabs',
    'setting-toggle',
    'text-container',
    'text-style',
    'visually-hidden',
    'top-bar',
    // Single word components
    'button',
    'badge',
    'banner',
    'avatar',
    'icon',
    'thumbnail',
    'bleed',
    'box',
    'card',
    'divider',
    'grid',
    'layout',
    'page',
    'list',
    'listbox',
    'link',
    'pagination',
    'tabs',
    'popover',
    'tooltip',
    'autocomplete',
    'checkbox',
    'combobox',
    'filters',
    'form',
    'select',
    'tag',
    'spinner',
    'caption',
    'heading',
    'loading',
    'modal',
    'navigation',
    'sheet',
    'subheading',
    'toast',
    'frame',
  ];
  
  // Find matching component
  for (const prefix of componentPrefixes) {
    if (nameWithoutExt.startsWith(prefix + '-')) {
      return {
        component: prefix,
        example: nameWithoutExt.substring(prefix.length + 1)
      };
    }
  }
  
  return null;
}