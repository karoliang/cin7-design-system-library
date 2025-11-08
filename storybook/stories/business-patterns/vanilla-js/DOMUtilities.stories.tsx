import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import { Card, Text, InlineStack, BlockStack, Button } from '@shopify/polaris';

const meta = {
  title: 'Cin7 DSL/Business Patterns/Vanilla JS/DOM Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vanilla JavaScript DOM manipulation utilities from @cin7/vanilla-js. These utilities provide a jQuery-like API for common DOM operations without the overhead of a library.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Element Selection Story
const ElementSelectionDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Vanilla JS implementation
    const container = containerRef.current;

    // Select single element
    const firstItem = container.querySelector('.demo-item');
    if (firstItem) {
      firstItem.classList.add('selected');
    }

    // Select multiple elements
    const allItems = container.querySelectorAll('.demo-item');
    allItems.forEach((item, index) => {
      item.textContent = `Item ${index + 1}`;
    });
  }, []);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Element Selection</Text>
        <Text as="p" tone="subdued">
          Demonstrates querySelector and querySelectorAll for element selection
        </Text>
        <div ref={containerRef} style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <div className="demo-item" style={{ padding: '8px', margin: '4px', background: 'white', borderRadius: '4px' }}></div>
          <div className="demo-item" style={{ padding: '8px', margin: '4px', background: 'white', borderRadius: '4px' }}></div>
          <div className="demo-item" style={{ padding: '8px', margin: '4px', background: 'white', borderRadius: '4px' }}></div>
        </div>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, $$ } from '@cin7/vanilla-js';

// Select single element (returns first match)
const firstItem = $('.demo-item');
firstItem.classList.add('selected');

// Select multiple elements (returns NodeList)
const allItems = $$('.demo-item');
allItems.forEach((item, index) => {
  item.textContent = \`Item \${index + 1}\`;
});

// Advanced selection
const container = $('#container');
const childItems = container.querySelectorAll('.demo-item');`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const ElementSelection: Story = {
  render: () => <ElementSelectionDemo />,
};

// Class Management Story
const ClassManagementDemo = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const toggleClass = () => {
    if (boxRef.current) {
      boxRef.current.classList.toggle('active');
    }
  };

  const addClass = () => {
    if (boxRef.current) {
      boxRef.current.classList.add('highlight');
    }
  };

  const removeClass = () => {
    if (boxRef.current) {
      boxRef.current.classList.remove('highlight');
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Class Management</Text>
        <Text as="p" tone="subdued">
          Add, remove, and toggle CSS classes dynamically
        </Text>
        <div
          ref={boxRef}
          className="demo-box"
          style={{
            padding: '24px',
            background: '#f6f6f7',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
        >
          Interact with the buttons below
        </div>
        <InlineStack gap="200">
          <Button onClick={toggleClass}>Toggle Active</Button>
          <Button onClick={addClass}>Add Highlight</Button>
          <Button onClick={removeClass}>Remove Highlight</Button>
        </InlineStack>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, addClass, removeClass, toggleClass } from '@cin7/vanilla-js';

const box = $('.demo-box');

// Toggle class (add if not present, remove if present)
toggleClass(box, 'active');

// Add class
addClass(box, 'highlight');

// Remove class
removeClass(box, 'highlight');

// Check if class exists
const hasClass = box.classList.contains('active');

// Add multiple classes
addClass(box, 'class1', 'class2', 'class3');

// Replace all classes
box.className = 'new-class';`}</code>
          </pre>
        </details>
        <style>{`
          .demo-box.active {
            background: #008060 !important;
            color: white;
          }
          .demo-box.highlight {
            border: 3px solid #005ea3;
            box-shadow: 0 0 20px rgba(0, 94, 163, 0.5);
          }
        `}</style>
      </BlockStack>
    </Card>
  );
};

export const ClassManagement: Story = {
  render: () => <ClassManagementDemo />,
};

// Attribute Manipulation Story
const AttributeManipulationDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const setPlaceholder = () => {
    if (inputRef.current) {
      inputRef.current.setAttribute('placeholder', 'Custom placeholder text');
    }
  };

  const toggleDisabled = () => {
    if (inputRef.current) {
      const isDisabled = inputRef.current.hasAttribute('disabled');
      if (isDisabled) {
        inputRef.current.removeAttribute('disabled');
      } else {
        inputRef.current.setAttribute('disabled', 'true');
      }
    }
  };

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.setAttribute('src', 'https://via.placeholder.com/150/0000FF/FFFFFF');
      imageRef.current.setAttribute('alt', 'Blue placeholder');
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Attribute Manipulation</Text>
        <Text as="p" tone="subdued">
          Get, set, and remove HTML attributes dynamically
        </Text>
        <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Original placeholder"
            style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <img
            ref={imageRef}
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            style={{ display: 'block', margin: '12px auto', borderRadius: '8px' }}
          />
        </div>
        <InlineStack gap="200">
          <Button onClick={setPlaceholder}>Set Placeholder</Button>
          <Button onClick={toggleDisabled}>Toggle Disabled</Button>
          <Button onClick={changeImage}>Change Image</Button>
        </InlineStack>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, attr, removeAttr } from '@cin7/vanilla-js';

const input = $('input');
const image = $('img');

// Set attribute
attr(input, 'placeholder', 'Custom placeholder text');
input.setAttribute('placeholder', 'Custom placeholder text');

// Get attribute
const placeholder = attr(input, 'placeholder');
const src = image.getAttribute('src');

// Remove attribute
removeAttr(input, 'disabled');
input.removeAttribute('disabled');

// Check if attribute exists
const hasDisabled = input.hasAttribute('disabled');

// Set multiple attributes
attr(image, {
  src: 'new-image.jpg',
  alt: 'New image description',
  width: '300'
});

// Data attributes
attr(input, 'data-user-id', '12345');
const userId = input.dataset.userId; // '12345'`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const AttributeManipulation: Story = {
  render: () => <AttributeManipulationDemo />,
};

// Content Manipulation Story
const ContentManipulationDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setInnerHTML = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '<strong>New HTML content</strong> with <em>formatting</em>';
    }
  };

  const setTextContent = () => {
    if (containerRef.current) {
      containerRef.current.textContent = 'Plain text content (no HTML formatting)';
    }
  };

  const appendElement = () => {
    if (containerRef.current) {
      const newItem = document.createElement('div');
      newItem.textContent = `Item ${containerRef.current.children.length + 1}`;
      newItem.style.padding = '8px';
      newItem.style.margin = '4px';
      newItem.style.background = 'white';
      newItem.style.borderRadius = '4px';
      containerRef.current.appendChild(newItem);
    }
  };

  const clearContent = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Content Manipulation</Text>
        <Text as="p" tone="subdued">
          Modify element content using innerHTML, textContent, and DOM methods
        </Text>
        <div
          ref={containerRef}
          style={{
            minHeight: '100px',
            padding: '12px',
            background: '#f6f6f7',
            borderRadius: '8px'
          }}
        >
          Initial content
        </div>
        <InlineStack gap="200" wrap>
          <Button onClick={setInnerHTML}>Set innerHTML</Button>
          <Button onClick={setTextContent}>Set textContent</Button>
          <Button onClick={appendElement}>Append Element</Button>
          <Button onClick={clearContent}>Clear Content</Button>
        </InlineStack>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, html, text } from '@cin7/vanilla-js';

const container = $('#container');

// Set HTML content (parses HTML)
html(container, '<strong>New HTML</strong> content');
container.innerHTML = '<strong>New HTML</strong> content';

// Set text content (escapes HTML)
text(container, 'Plain text content');
container.textContent = 'Plain text content';

// Append element
const newItem = document.createElement('div');
newItem.textContent = 'New item';
container.appendChild(newItem);

// Insert at beginning
container.insertBefore(newItem, container.firstChild);

// Remove element
container.removeChild(newItem);

// Clear all content
html(container, '');
container.innerHTML = '';

// Clone element
const clone = container.cloneNode(true);

// Replace element
const newElement = document.createElement('div');
container.parentNode.replaceChild(newElement, container);`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const ContentManipulation: Story = {
  render: () => <ContentManipulationDemo />,
};
