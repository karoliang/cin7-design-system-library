import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Card, Text, InlineStack, BlockStack, Button, Banner } from '@shopify/polaris';

const meta = {
  title: 'Cin7 DSL/Business Patterns/Vanilla JS/Form Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form utilities from @cin7/vanilla-js. Comprehensive tools for form validation, serialization, and dynamic field management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Form Validation Story
const FormValidationDemo = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    // Email validation
    const email = formData.get('email') as string;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    const password = formData.get('password') as string;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Name validation
    const name = formData.get('name') as string;
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Age validation
    const age = formData.get('age') as string;
    if (!age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(age) < 18 || parseInt(age) > 120) {
      newErrors.age = 'Age must be between 18 and 120';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Form Validation</Text>
        <Text as="p" tone="subdued">
          Client-side form validation with custom rules and error messages
        </Text>

        {success && (
          <Banner tone="success">
            Form validated successfully!
          </Banner>
        )}

        <form ref={formRef} onSubmit={validateForm}>
          <BlockStack gap="300">
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Name *
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${errors.name ? '#bf0711' : '#ccc'}`
                }}
              />
              {errors.name && (
                <Text as="p" tone="critical" variant="bodySm">{errors.name}</Text>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${errors.email ? '#bf0711' : '#ccc'}`
                }}
              />
              {errors.email && (
                <Text as="p" tone="critical" variant="bodySm">{errors.email}</Text>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Password *
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${errors.password ? '#bf0711' : '#ccc'}`
                }}
              />
              {errors.password && (
                <Text as="p" tone="critical" variant="bodySm">{errors.password}</Text>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Age *
              </label>
              <input
                name="age"
                type="number"
                placeholder="Enter your age"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: `1px solid ${errors.age ? '#bf0711' : '#ccc'}`
                }}
              />
              {errors.age && (
                <Text as="p" tone="critical" variant="bodySm">{errors.age}</Text>
              )}
            </div>

            <Button submit variant="primary">Validate Form</Button>
          </BlockStack>
        </form>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, validate, showError } from '@cin7/vanilla-js';

const form = $('#myForm');

// Validation rules
const rules = {
  email: {
    required: true,
    pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Invalid email format'
  },
  password: {
    required: true,
    minLength: 8,
    message: 'Password must be at least 8 characters'
  },
  name: {
    required: true,
    minLength: 2,
    message: 'Name is required'
  },
  age: {
    required: true,
    min: 18,
    max: 120,
    message: 'Age must be between 18 and 120'
  }
};

// Validate on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const errors = {};

  // Validate each field
  for (const [name, rule] of Object.entries(rules)) {
    const value = formData.get(name);

    if (rule.required && !value) {
      errors[name] = \`\${name} is required\`;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors[name] = rule.message;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[name] = rule.message;
    } else if (rule.min && parseInt(value) < rule.min) {
      errors[name] = rule.message;
    } else if (rule.max && parseInt(value) > rule.max) {
      errors[name] = rule.message;
    }
  }

  // Display errors
  if (Object.keys(errors).length > 0) {
    for (const [field, message] of Object.entries(errors)) {
      showError(field, message);
    }
    return;
  }

  // Form is valid
  console.log('Form is valid!', Object.fromEntries(formData));
});

// Real-time validation
$('input[name="email"]').addEventListener('blur', (e) => {
  const value = e.target.value;
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
    showError('email', 'Invalid email format');
  }
});

// Custom validators
function isValidPhone(phone) {
  return /^\\d{10}$/.test(phone);
}

function isValidZip(zip) {
  return /^\\d{5}(-\\d{4})?$/.test(zip);
}`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const FormValidation: Story = {
  render: () => <FormValidationDemo />,
};

// Form Serialization Story
const FormSerializationDemo = () => {
  const [formData, setFormData] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const serializeForm = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const serialized = Object.fromEntries(data.entries());
    setFormData(serialized);
  };

  const serializeToJSON = () => {
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(data.entries()), null, 2);
    setFormData({ json });
  };

  const serializeToQueryString = () => {
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const params = new URLSearchParams(data as any);
    setFormData({ queryString: params.toString() });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Form Serialization</Text>
        <Text as="p" tone="subdued">
          Collect and serialize form data in various formats
        </Text>

        <form ref={formRef} onSubmit={serializeForm}>
          <BlockStack gap="300">
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Product Name
              </label>
              <input
                name="productName"
                type="text"
                defaultValue="Widget Pro"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Price
              </label>
              <input
                name="price"
                type="number"
                defaultValue="29.99"
                step="0.01"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Category
              </label>
              <select
                name="category"
                defaultValue="electronics"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input name="inStock" type="checkbox" defaultChecked />
                <span>In Stock</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Description
              </label>
              <textarea
                name="description"
                defaultValue="High-quality product"
                rows={3}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <InlineStack gap="200">
              <Button submit variant="primary">Serialize to Object</Button>
              <Button onClick={serializeToJSON}>To JSON</Button>
              <Button onClick={serializeToQueryString}>To Query String</Button>
            </InlineStack>
          </BlockStack>
        </form>

        {formData && (
          <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '4px' }}>
            <Text as="h3" variant="headingSm">Serialized Data:</Text>
            <pre style={{ overflow: 'auto', marginTop: '8px' }}>
              <code>{JSON.stringify(formData, null, 2)}</code>
            </pre>
          </div>
        )}

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, serialize } from '@cin7/vanilla-js';

const form = $('#myForm');

// Serialize to object
const data = serialize(form);
console.log(data);
// { productName: 'Widget Pro', price: '29.99', category: 'electronics', inStock: 'on' }

// Using FormData API
const formData = new FormData(form);
const obj = Object.fromEntries(formData.entries());

// Serialize to JSON
const json = JSON.stringify(obj);
console.log(json);
// '{"productName":"Widget Pro","price":"29.99",...}'

// Serialize to query string
const params = new URLSearchParams(formData);
const queryString = params.toString();
console.log(queryString);
// 'productName=Widget+Pro&price=29.99&category=electronics'

// Handle arrays (multiple select)
const formData = new FormData(form);
const data = {};
for (const [key, value] of formData.entries()) {
  if (data[key]) {
    data[key] = Array.isArray(data[key])
      ? [...data[key], value]
      : [data[key], value];
  } else {
    data[key] = value;
  }
}

// Serialize with nested objects
function serializeNested(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    const keys = key.split('.');
    let current = data;

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  }

  return data;
}

// Example: user.name, user.email -> { user: { name: '...', email: '...' } }

// Send serialized data
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(serialize(form))
});`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const FormSerialization: Story = {
  render: () => <FormSerializationDemo />,
};

// Dynamic Fields Story
const DynamicFieldsDemo = () => {
  const [fieldCount, setFieldCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const addField = () => {
    if (containerRef.current) {
      const newField = document.createElement('div');
      newField.style.cssText = 'display: flex; gap: 8px; margin-bottom: 8px;';
      newField.innerHTML = `
        <input
          type="text"
          name="item[]"
          placeholder="Item ${fieldCount + 1}"
          style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #ccc;"
        />
        <button
          type="button"
          class="remove-field"
          style="padding: 8px 16px; background: #bf0711; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Remove
        </button>
      `;

      // Add event listener to remove button
      const removeBtn = newField.querySelector('.remove-field');
      removeBtn?.addEventListener('click', () => {
        newField.remove();
        setFieldCount(prev => prev - 1);
      });

      containerRef.current.appendChild(newField);
      setFieldCount(prev => prev + 1);
    }
  };

  const removeField = (index: number) => {
    if (containerRef.current) {
      const fields = containerRef.current.querySelectorAll('.field-group');
      if (fields[index]) {
        fields[index].remove();
        setFieldCount(prev => prev - 1);
      }
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Dynamic Fields</Text>
        <Text as="p" tone="subdued">
          Add and remove form fields dynamically
        </Text>

        <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <BlockStack gap="300">
            <div ref={containerRef}>
              <div className="field-group" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  name="item[]"
                  placeholder="Item 1"
                  style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                  type="button"
                  onClick={() => removeField(0)}
                  style={{ padding: '8px 16px', background: '#bf0711', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>

            <Button onClick={addField}>Add Field</Button>

            <Text as="p" variant="bodySm" tone="subdued">
              Total fields: {fieldCount}
            </Text>
          </BlockStack>
        </div>

        <Banner tone="info">
          <p>Click "Add Field" to add more input fields. Each field can be individually removed.</p>
        </Banner>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, on } from '@cin7/vanilla-js';

const container = $('#fields-container');
const addButton = $('#add-field');
let fieldCount = 1;

// Add field
addButton.addEventListener('click', () => {
  fieldCount++;

  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'field-group';
  fieldGroup.innerHTML = \`
    <input
      type="text"
      name="item[]"
      placeholder="Item \${fieldCount}"
    />
    <button type="button" class="remove-field">Remove</button>
  \`;

  container.appendChild(fieldGroup);
});

// Remove field using event delegation
on(container, 'click', (e) => {
  if (e.target.matches('.remove-field')) {
    e.target.closest('.field-group').remove();
    fieldCount--;
  }
});

// Clone existing field
function cloneField(template) {
  const clone = template.cloneNode(true);

  // Clear values
  clone.querySelectorAll('input, textarea, select').forEach(field => {
    field.value = '';
  });

  // Update IDs and names
  clone.querySelectorAll('[id]').forEach(el => {
    el.id = el.id + '-' + Date.now();
  });

  return clone;
}

// Advanced: Dynamic field sets
const addFieldSet = () => {
  const fieldSet = \`
    <div class="field-set">
      <input type="text" name="address[\${fieldCount}][street]" placeholder="Street" />
      <input type="text" name="address[\${fieldCount}][city]" placeholder="City" />
      <input type="text" name="address[\${fieldCount}][zip]" placeholder="ZIP" />
      <button type="button" class="remove-field-set">Remove</button>
    </div>
  \`;

  container.insertAdjacentHTML('beforeend', fieldSet);
  fieldCount++;
};

// Validation for dynamic fields
function validateDynamicFields() {
  const fields = $$('input[name="item[]"]');
  const errors = [];

  fields.forEach((field, index) => {
    if (!field.value.trim()) {
      errors.push(\`Item \${index + 1} is required\`);
    }
  });

  return errors;
}`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const DynamicFields: Story = {
  render: () => <DynamicFieldsDemo />,
};
