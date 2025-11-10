import type { CodeVariant } from './types';

export const modalExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ModalExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Reach more shoppers with Instagram product tags',
  width: 600,
  height: 200,
  modal: true,
  closable: true,
  resizable: false,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>Use Instagram posts to share your products with millions of people. Let shoppers buy from your store without leaving Instagram.</p>'
  }],
  buttons: [{
    text: 'Learn more',
    handler: function() {
      console.log('Learn more clicked');
    }
  }, {
    text: 'Add Instagram',
    ui: 'primary',
    handler: function() {
      this.up('window').close();
    }
  }],
  listeners: {
    show: function() {
      console.log('Modal opened');
    },
    close: function() {
      console.log('Modal closed');
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-modal-backdrop" id="modal-backdrop">
  <div class="polaris-modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <div class="polaris-modal__header">
      <h2 id="modal-title" class="polaris-modal__title">
        Reach more shoppers with Instagram product tags
      </h2>
      <button class="polaris-modal__close" aria-label="Close modal">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div class="polaris-modal__body">
      <p>
        Use Instagram posts to share your products with millions of
        people. Let shoppers buy from your store without leaving
        Instagram.
      </p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--secondary">Learn more</button>
      <button class="button button--primary">Add Instagram</button>
    </div>
  </div>
</div>

<button id="open-modal" class="button">Open</button>


<script>
const modal = document.getElementById('modal-backdrop');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.polaris-modal__close');
const primaryBtn = document.querySelector('.button--primary');
const secondaryBtn = document.querySelector('.button--secondary');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
primaryBtn.addEventListener('click', closeModal);
secondaryBtn.addEventListener('click', () => {
  console.log('Learn more clicked');
});

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
</script>`,
    typescript: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ModalAction {
  content: string;
  onAction: () => void;
  destructive?: boolean;
}

interface ModalProps {
  title: string;
  content: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryActions?: ModalAction[];
  activatorText?: string;
  initialOpen?: boolean;
}

function ModalExample({
  title,
  content,
  primaryAction,
  secondaryActions = [],
  activatorText = 'Open',
  initialOpen = true
}: ModalProps): JSX.Element {
  const [active, setActive] = useState<boolean>(initialOpen);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handlePrimaryAction = useCallback(() => {
    primaryAction?.onAction();
    handleChange();
  }, [primaryAction, handleChange]);

  const activator = <Button onClick={handleChange}>{activatorText}</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title={title}
          primaryAction={primaryAction ? {
            ...primaryAction,
            onAction: handlePrimaryAction
          } : undefined}
          secondaryActions={secondaryActions.map(action => ({
            ...action,
            onAction: () => {
              action.onAction();
              handleChange();
            }
          }))}
        >
          <Modal.Section>
            <TextContainer>
              {content}
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  },
  'sizes': {
    react: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState} from 'react';

function ModalSizesExample() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (size: string) => setActiveModal(size);
  const closeModal = () => setActiveModal(null);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          <Button onClick={() => openModal('small')}>Small</Button>
          <Button onClick={() => openModal('medium')}>Medium</Button>
          <Button onClick={() => openModal('large')}>Large</Button>
        </div>

        <Modal
          open={activeModal === 'small'}
          onClose={closeModal}
          title="Small Modal"
          size="small"
          primaryAction={{content: 'Close', onAction: closeModal}}
        >
          <Modal.Section>
            <Text>A compact modal for simple interactions.</Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeModal === 'medium'}
          onClose={closeModal}
          title="Medium Modal"
          size="medium"
          primaryAction={{content: 'Close', onAction: closeModal}}
        >
          <Modal.Section>
            <Text>A medium-sized modal for moderate content.</Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeModal === 'large'}
          onClose={closeModal}
          title="Large Modal"
          size="large"
          primaryAction={{content: 'Close', onAction: closeModal}}
        >
          <Modal.Section>
            <Text>A large modal for complex content and forms.</Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `// Small modal window
Ext.create('Ext.window.Window', {
  title: 'Small Modal',
  width: 400,
  height: 150,
  modal: true,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>A compact modal for simple interactions.</p>'
  }],
  buttons: [{
    text: 'Close',
    handler: function() {
      this.up('window').close();
    }
  }]
});

// Medium modal window (default size)
Ext.create('Ext.window.Window', {
  title: 'Medium Modal',
  width: 600,
  height: 200,
  modal: true,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>A medium-sized modal for moderate content.</p>'
  }],
  buttons: [{
    text: 'Close',
    handler: function() {
      this.up('window').close();
    }
  }]
});

// Large modal window
Ext.create('Ext.window.Window', {
  title: 'Large Modal',
  width: 900,
  height: 600,
  modal: true,
  maximizable: true,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>A large modal for complex content and forms.</p>'
  }],
  buttons: [{
    text: 'Close',
    handler: function() {
      this.up('window').close();
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<button id="small-btn" class="button">Small</button>
<button id="medium-btn" class="button">Medium</button>
<button id="large-btn" class="button">Large</button>

<div class="polaris-modal-backdrop" id="modal-backdrop">
  <div class="polaris-modal" id="modal-dialog" role="dialog" aria-modal="true">
    <div class="polaris-modal__header">
      <h2 id="modal-title" class="polaris-modal__title"></h2>
      <button class="polaris-modal__close" aria-label="Close modal">×</button>
    </div>
    <div class="polaris-modal__body">
      <p id="modal-content"></p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--primary" id="close-btn">Close</button>
    </div>
  </div>
</div>

<script>
const modalBackdrop = document.getElementById('modal-backdrop');
const modalDialog = document.getElementById('modal-dialog');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-btn');

const sizes = {
  small: {width: '400px', title: 'Small Modal', content: 'A compact modal for simple interactions.'},
  medium: {width: '600px', title: 'Medium Modal', content: 'A medium-sized modal for moderate content.'},
  large: {width: '900px', title: 'Large Modal', content: 'A large modal for complex content and forms.'}
};

function openModal(size) {
  const config = sizes[size];
  modalDialog.style.width = config.width;
  modalTitle.textContent = config.title;
  modalContent.textContent = config.content;
  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('small-btn').addEventListener('click', () => openModal('small'));
document.getElementById('medium-btn').addEventListener('click', () => openModal('medium'));
document.getElementById('large-btn').addEventListener('click', () => openModal('large'));
closeBtn.addEventListener('click', closeModal);
document.querySelector('.polaris-modal__close').addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
</script>`,
    typescript: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

type ModalSize = 'small' | 'medium' | 'large' | null;

interface ModalConfig {
  title: string;
  content: string;
  size: 'small' | 'medium' | 'large';
}

const modalConfigs: Record<string, ModalConfig> = {
  small: {
    title: 'Small Modal',
    content: 'A compact modal for simple interactions.',
    size: 'small'
  },
  medium: {
    title: 'Medium Modal',
    content: 'A medium-sized modal for moderate content.',
    size: 'medium'
  },
  large: {
    title: 'Large Modal',
    content: 'A large modal for complex content and forms.',
    size: 'large'
  }
};

function ModalSizesExample(): JSX.Element {
  const [activeModal, setActiveModal] = useState<ModalSize>(null);

  const openModal = useCallback((size: ModalSize) => setActiveModal(size), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          {Object.keys(modalConfigs).map(size => (
            <Button key={size} onClick={() => openModal(size as ModalSize)}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>
          ))}
        </div>

        {Object.entries(modalConfigs).map(([key, config]) => (
          <Modal
            key={key}
            open={activeModal === key}
            onClose={closeModal}
            title={config.title}
            size={config.size}
            primaryAction={{content: 'Close', onAction: closeModal}}
          >
            <Modal.Section>
              <Text>{config.content}</Text>
            </Modal.Section>
          </Modal>
        ))}
      </Frame>
    </div>
  );
}`
  },
  'form-modal': {
    react: `import {Button, Frame, Modal, TextField, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FormModalExample() {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  }, []);

  const handleSave = useCallback(() => {
    console.log('Form submitted:', formData);
    setActive(false);
    // Reset form
    setFormData({name: '', email: '', company: ''});
  }, [formData]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Create Customer</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Create New Customer"
          primaryAction={{
            content: 'Create Customer',
            onAction: handleSave
          }}
          secondaryActions={[{
            content: 'Cancel',
            onAction: handleChange
          }]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Customer Name"
                value={formData.name}
                onChange={(value) => handleFieldChange('name', value)}
                placeholder="Enter customer name"
                autoComplete="name"
              />
              <TextField
                label="Email Address"
                value={formData.email}
                onChange={(value) => handleFieldChange('email', value)}
                placeholder="customer@example.com"
                type="email"
                autoComplete="email"
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(value) => handleFieldChange('company', value)}
                placeholder="Enter company name"
                autoComplete="organization"
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.define('CustomerFormWindow', {
  extend: 'Ext.window.Window',
  title: 'Create New Customer',
  width: 500,
  modal: true,
  layout: 'fit',

  items: [{
    xtype: 'form',
    bodyPadding: 20,
    defaults: {
      anchor: '100%',
      labelWidth: 120
    },
    items: [{
      xtype: 'textfield',
      name: 'name',
      fieldLabel: 'Customer Name',
      emptyText: 'Enter customer name',
      allowBlank: false
    }, {
      xtype: 'textfield',
      name: 'email',
      fieldLabel: 'Email Address',
      vtype: 'email',
      emptyText: 'customer@example.com',
      allowBlank: false
    }, {
      xtype: 'textfield',
      name: 'company',
      fieldLabel: 'Company',
      emptyText: 'Enter company name'
    }]
  }],

  buttons: [{
    text: 'Cancel',
    handler: function() {
      this.up('window').close();
    }
  }, {
    text: 'Create Customer',
    ui: 'primary',
    formBind: true,
    handler: function() {
      const form = this.up('window').down('form').getForm();
      if (form.isValid()) {
        const values = form.getValues();
        console.log('Form submitted:', values);
        this.up('window').close();
      }
    }
  }]
});

// Show the window
Ext.create('CustomerFormWindow').show();`,
    vanilla: `<!-- HTML Structure -->
<button id="create-customer-btn" class="button">Create Customer</button>

<div class="polaris-modal-backdrop" id="form-modal">
  <div class="polaris-modal" role="dialog" aria-labelledby="form-modal-title">
    <div class="polaris-modal__header">
      <h2 id="form-modal-title" class="polaris-modal__title">Create New Customer</h2>
      <button class="polaris-modal__close" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body">
      <form id="customer-form">
        <div class="form-field">
          <label for="customer-name">Customer Name</label>
          <input type="text" id="customer-name" name="name" placeholder="Enter customer name" required>
        </div>
        <div class="form-field">
          <label for="customer-email">Email Address</label>
          <input type="email" id="customer-email" name="email" placeholder="customer@example.com" required>
        </div>
        <div class="form-field">
          <label for="customer-company">Company</label>
          <input type="text" id="customer-company" name="company" placeholder="Enter company name">
        </div>
      </form>
    </div>
    <div class="polaris-modal__footer">
      <button type="button" class="button button--secondary" id="cancel-btn">Cancel</button>
      <button type="submit" class="button button--primary" id="submit-btn">Create Customer</button>
    </div>
  </div>
</div>

<script>
const modal = document.getElementById('form-modal');
const form = document.getElementById('customer-form');
const openBtn = document.getElementById('create-customer-btn');
const closeBtn = modal.querySelector('.polaris-modal__close');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-btn');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('customer-name').focus();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  form.reset();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    closeModal();
  } else {
    form.reportValidity();
  }
});
</script>`,
    typescript: `import {Button, Frame, Modal, TextField, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CustomerFormData {
  name: string;
  email: string;
  company: string;
}

interface FormFieldConfig {
  key: keyof CustomerFormData;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

const formFields: FormFieldConfig[] = [
  {key: 'name', label: 'Customer Name', placeholder: 'Enter customer name', autoComplete: 'name'},
  {key: 'email', label: 'Email Address', placeholder: 'customer@example.com', type: 'email', autoComplete: 'email'},
  {key: 'company', label: 'Company', placeholder: 'Enter company name', autoComplete: 'organization'}
];

const initialFormData: CustomerFormData = {
  name: '',
  email: '',
  company: ''
};

function FormModalExample(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleFieldChange = useCallback((field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  }, []);

  const handleSave = useCallback(() => {
    console.log('Form submitted:', formData);
    setActive(false);
    setFormData(initialFormData);
  }, [formData]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Create Customer</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Create New Customer"
          primaryAction={{content: 'Create Customer', onAction: handleSave}}
          secondaryActions={[{content: 'Cancel', onAction: handleChange}]}
        >
          <Modal.Section>
            <FormLayout>
              {formFields.map(field => (
                <TextField
                  key={field.key}
                  label={field.label}
                  value={formData[field.key]}
                  onChange={(value) => handleFieldChange(field.key, value)}
                  placeholder={field.placeholder}
                  type={field.type}
                  autoComplete={field.autoComplete}
                />
              ))}
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  },
  'without-actions': {
    react: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ModalWithoutActionsExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Show Terms</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Terms and Conditions"
          limitHeight
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>1. Acceptance of Terms</h4>
              <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

              <h4>2. Use License</h4>
              <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

              <h4>3. Disclaimer</h4>
              <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>

              <h4>4. Limitations</h4>
              <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials.</p>
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Terms and Conditions',
  width: 600,
  height: 400,
  modal: true,
  closable: true,
  maximizable: true,
  layout: 'fit',
  autoScroll: true,

  // No buttons - close button only
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    autoScroll: true,
    html: \`
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

      <h3>2. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

      <h3>3. Disclaimer</h3>
      <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>

      <h3>4. Limitations</h3>
      <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials.</p>
    \`
  }],

  listeners: {
    close: function() {
      console.log('Terms modal closed');
    }
  }
}).show();`,
    vanilla: `<!-- HTML Structure -->
<button id="show-terms-btn" class="button">Show Terms</button>

<div class="polaris-modal-backdrop" id="terms-modal">
  <div class="polaris-modal polaris-modal--scrollable" role="dialog" aria-labelledby="terms-title">
    <div class="polaris-modal__header">
      <h2 id="terms-title" class="polaris-modal__title">Terms and Conditions</h2>
      <button class="polaris-modal__close" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body">
      <div class="terms-content">
        <h4>1. Acceptance of Terms</h4>
        <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h4>2. Use License</h4>
        <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

        <h4>3. Disclaimer</h4>
        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>

        <h4>4. Limitations</h4>
        <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials.</p>
      </div>
    </div>
  </div>
</div>

<script>
const modal = document.getElementById('terms-modal');
const openBtn = document.getElementById('show-terms-btn');
const closeBtn = modal.querySelector('.polaris-modal__close');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
</script>`,
    typescript: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TermsSection {
  title: string;
  content: string;
}

const termsContent: TermsSection[] = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.'
  },
  {
    title: '2. Use License',
    content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.'
  },
  {
    title: '3. Disclaimer',
    content: 'The materials on our website are provided on an \\'as is\\' basis. We make no warranties, expressed or implied.'
  },
  {
    title: '4. Limitations',
    content: 'In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials.'
  }
];

function ModalWithoutActionsExample(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Show Terms</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Terms and Conditions"
          limitHeight
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              {termsContent.map((section, index) => (
                <div key={index}>
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              ))}
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  },
  'with-footer': {
    react: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ModalWithFooterExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Show Details</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Order Details"
          primaryAction={{
            content: 'Process Order',
            onAction: handleChange
          }}
          footer
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>Order Information</h4>
              <p><strong>Order #:</strong> 1001</p>
              <p><strong>Date:</strong> November 5, 2025</p>
              <p><strong>Status:</strong> Pending</p>
              <p><strong>Total:</strong> $299.99</p>
            </Text>
          </Modal.Section>
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
            </Text>
          </Modal.Section>
          <Modal.Section title="Order Items">
            <Text as="div" variant="bodyMd">
              <p>• Premium Widget (x2) - $199.98</p>
              <p>• Standard Widget (x1) - $99.99</p>
              <p><strong>Subtotal:</strong> $299.97</p>
              <p><strong>Tax:</strong> $0.02</p>
              <p><strong>Total:</strong> $299.99</p>
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Order Details',
  width: 600,
  height: 500,
  modal: true,
  layout: 'fit',
  autoScroll: true,

  items: [{
    xtype: 'panel',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    bodyPadding: 20,
    items: [{
      xtype: 'panel',
      title: 'Order Information',
      bodyPadding: 10,
      html: \`
        <p><strong>Order #:</strong> 1001</p>
        <p><strong>Date:</strong> November 5, 2025</p>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Total:</strong> $299.99</p>
      \`
    }, {
      xtype: 'panel',
      title: 'Customer Information',
      bodyPadding: 10,
      margin: '10 0 0 0',
      html: \`
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
      \`
    }, {
      xtype: 'panel',
      title: 'Order Items',
      bodyPadding: 10,
      margin: '10 0 0 0',
      html: \`
        <p>• Premium Widget (x2) - $199.98</p>
        <p>• Standard Widget (x1) - $99.99</p>
        <p><strong>Subtotal:</strong> $299.97</p>
        <p><strong>Tax:</strong> $0.02</p>
        <p><strong>Total:</strong> $299.99</p>
      \`
    }]
  }],

  buttons: [{
    text: 'Process Order',
    ui: 'primary',
    handler: function() {
      console.log('Processing order...');
      this.up('window').close();
    }
  }]
}).show();`,
    vanilla: `<!-- HTML Structure -->
<button id="show-details-btn" class="button">Show Details</button>

<div class="polaris-modal-backdrop" id="details-modal">
  <div class="polaris-modal" role="dialog" aria-labelledby="details-title">
    <div class="polaris-modal__header">
      <h2 id="details-title" class="polaris-modal__title">Order Details</h2>
      <button class="polaris-modal__close" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body">
      <div class="modal-section">
        <h4>Order Information</h4>
        <p><strong>Order #:</strong> 1001</p>
        <p><strong>Date:</strong> November 5, 2025</p>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Total:</strong> $299.99</p>
      </div>
      <div class="modal-section">
        <h4>Customer Information</h4>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
      </div>
      <div class="modal-section">
        <h4>Order Items</h4>
        <p>• Premium Widget (x2) - $199.98</p>
        <p>• Standard Widget (x1) - $99.99</p>
        <p><strong>Subtotal:</strong> $299.97</p>
        <p><strong>Tax:</strong> $0.02</p>
        <p><strong>Total:</strong> $299.99</p>
      </div>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--primary" id="process-btn">Process Order</button>
    </div>
  </div>
</div>

<script>
const modal = document.getElementById('details-modal');
const openBtn = document.getElementById('show-details-btn');
const closeBtn = modal.querySelector('.polaris-modal__close');
const processBtn = document.getElementById('process-btn');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
processBtn.addEventListener('click', () => {
  console.log('Processing order...');
  closeModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
</script>`,
    typescript: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface OrderDetails {
  orderId: number;
  date: string;
  status: string;
  total: string;
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

interface OrderItem {
  description: string;
  price: string;
}

interface OrderData {
  order: OrderDetails;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: string;
  tax: string;
  total: string;
}

const orderData: OrderData = {
  order: {orderId: 1001, date: 'November 5, 2025', status: 'Pending', total: '$299.99'},
  customer: {name: 'John Doe', email: 'john.doe@example.com', phone: '(555) 123-4567'},
  items: [
    {description: 'Premium Widget (x2)', price: '$199.98'},
    {description: 'Standard Widget (x1)', price: '$99.99'}
  ],
  subtotal: '$299.97',
  tax: '$0.02',
  total: '$299.99'
};

function ModalWithFooterExample(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Show Details</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Order Details"
          primaryAction={{content: 'Process Order', onAction: handleChange}}
          footer
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>Order Information</h4>
              <p><strong>Order #:</strong> {orderData.order.orderId}</p>
              <p><strong>Date:</strong> {orderData.order.date}</p>
              <p><strong>Status:</strong> {orderData.order.status}</p>
              <p><strong>Total:</strong> {orderData.order.total}</p>
            </Text>
          </Modal.Section>
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> {orderData.customer.name}</p>
              <p><strong>Email:</strong> {orderData.customer.email}</p>
              <p><strong>Phone:</strong> {orderData.customer.phone}</p>
            </Text>
          </Modal.Section>
          <Modal.Section title="Order Items">
            <Text as="div" variant="bodyMd">
              {orderData.items.map((item, idx) => (
                <p key={idx}>• {item.description} - {item.price}</p>
              ))}
              <p><strong>Subtotal:</strong> {orderData.subtotal}</p>
              <p><strong>Tax:</strong> {orderData.tax}</p>
              <p><strong>Total:</strong> {orderData.total}</p>
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  },
  'nested': {
    react: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function NestedModalsExample() {
  const [activePrimary, setActivePrimary] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState(false);

  const handlePrimary = useCallback(() => setActivePrimary(!activePrimary), [activePrimary]);
  const handleSecondary = useCallback(() => setActiveSecondary(!activeSecondary), [activeSecondary]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handlePrimary}>Open Primary Modal</Button>

        <Modal
          open={activePrimary}
          onClose={handlePrimary}
          title="Primary Modal"
          primaryAction={{
            content: 'Open Secondary',
            onAction: handleSecondary
          }}
          secondaryActions={[{
            content: 'Cancel',
            onAction: handlePrimary
          }]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is the primary modal. You can open a secondary modal from here to demonstrate layering.
            </Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeSecondary}
          onClose={handleSecondary}
          title="Secondary Modal"
          primaryAction={{
            content: 'Confirm',
            onAction: handleSecondary
          }}
          secondaryActions={[{
            content: 'Cancel',
            onAction: handleSecondary
          }]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is a nested modal that appears on top of the primary modal.
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `// Primary modal window
const primaryWindow = Ext.create('Ext.window.Window', {
  title: 'Primary Modal',
  width: 500,
  height: 200,
  modal: true,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>This is the primary modal. You can open a secondary modal from here to demonstrate layering.</p>'
  }],
  buttons: [{
    text: 'Cancel',
    handler: function() {
      this.up('window').close();
    }
  }, {
    text: 'Open Secondary',
    ui: 'primary',
    handler: function() {
      // Create secondary modal
      Ext.create('Ext.window.Window', {
        title: 'Secondary Modal',
        width: 400,
        height: 150,
        modal: true,
        layout: 'fit',
        items: [{
          xtype: 'panel',
          bodyPadding: 20,
          html: '<p>This is a nested modal that appears on top of the primary modal.</p>'
        }],
        buttons: [{
          text: 'Cancel',
          handler: function() {
            this.up('window').close();
          }
        }, {
          text: 'Confirm',
          ui: 'primary',
          handler: function() {
            console.log('Confirmed');
            this.up('window').close();
          }
        }]
      }).show();
    }
  }]
});

primaryWindow.show();`,
    vanilla: `<!-- HTML Structure -->
<button id="open-primary-btn" class="button">Open Primary Modal</button>

<!-- Primary Modal -->
<div class="polaris-modal-backdrop" id="primary-modal">
  <div class="polaris-modal" role="dialog" aria-labelledby="primary-title">
    <div class="polaris-modal__header">
      <h2 id="primary-title" class="polaris-modal__title">Primary Modal</h2>
      <button class="polaris-modal__close" data-modal="primary" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body">
      <p>This is the primary modal. You can open a secondary modal from here to demonstrate layering.</p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--secondary" data-action="cancel-primary">Cancel</button>
      <button class="button button--primary" id="open-secondary-btn">Open Secondary</button>
    </div>
  </div>
</div>

<!-- Secondary Modal -->
<div class="polaris-modal-backdrop" id="secondary-modal" style="z-index: 1001;">
  <div class="polaris-modal" role="dialog" aria-labelledby="secondary-title">
    <div class="polaris-modal__header">
      <h2 id="secondary-title" class="polaris-modal__title">Secondary Modal</h2>
      <button class="polaris-modal__close" data-modal="secondary" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body">
      <p>This is a nested modal that appears on top of the primary modal.</p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--secondary" data-action="cancel-secondary">Cancel</button>
      <button class="button button--primary" data-action="confirm-secondary">Confirm</button>
    </div>
  </div>
</div>

<script>
const primaryModal = document.getElementById('primary-modal');
const secondaryModal = document.getElementById('secondary-modal');

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  if (!primaryModal.classList.contains('active') && !secondaryModal.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

document.getElementById('open-primary-btn').addEventListener('click', () => openModal(primaryModal));
document.getElementById('open-secondary-btn').addEventListener('click', () => openModal(secondaryModal));

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.dataset.modal === 'primary' ? primaryModal : secondaryModal;
    closeModal(modal);
  });
});

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (action.includes('primary')) closeModal(primaryModal);
    if (action.includes('secondary')) {
      if (action === 'confirm-secondary') console.log('Confirmed');
      closeModal(secondaryModal);
    }
  });
});
</script>`,
    typescript: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ModalState {
  primary: boolean;
  secondary: boolean;
}

function NestedModalsExample(): JSX.Element {
  const [modalState, setModalState] = useState<ModalState>({
    primary: false,
    secondary: false
  });

  const toggleModal = useCallback((modal: keyof ModalState) => {
    setModalState(prev => ({...prev, [modal]: !prev[modal]}));
  }, []);

  const openSecondary = useCallback(() => {
    setModalState(prev => ({...prev, secondary: true}));
  }, []);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={() => toggleModal('primary')}>Open Primary Modal</Button>

        <Modal
          open={modalState.primary}
          onClose={() => toggleModal('primary')}
          title="Primary Modal"
          primaryAction={{content: 'Open Secondary', onAction: openSecondary}}
          secondaryActions={[{content: 'Cancel', onAction: () => toggleModal('primary')}]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is the primary modal. You can open a secondary modal from here to demonstrate layering.
            </Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={modalState.secondary}
          onClose={() => toggleModal('secondary')}
          title="Secondary Modal"
          primaryAction={{content: 'Confirm', onAction: () => toggleModal('secondary')}}
          secondaryActions={[{content: 'Cancel', onAction: () => toggleModal('secondary')}]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is a nested modal that appears on top of the primary modal.
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  },
  'iframe': {
    react: `import {Button, Frame, Modal} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function IframeModalExample() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(() => {
    setActive(!active);
    if (!active) {
      setLoading(true);
    }
  }, [active]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Open External Content</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="External Content"
          size="large"
          loading={loading}
          src="https://www.shopify.com"
          iFrameName="external-content"
          onIFrameLoad={handleIframeLoad}
        />
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'External Content',
  width: 900,
  height: 600,
  modal: true,
  maximizable: true,
  layout: 'fit',

  items: [{
    xtype: 'component',
    autoEl: {
      tag: 'iframe',
      src: 'https://www.shopify.com',
      name: 'external-content',
      frameborder: 0,
      style: 'width: 100%; height: 100%; border: none;'
    },
    listeners: {
      afterrender: function(component) {
        const iframe = component.el.dom;

        // Show loading mask
        const mask = new Ext.LoadMask({
          msg: 'Loading...',
          target: component.up('window')
        });
        mask.show();

        // Hide loading mask when iframe loads
        iframe.addEventListener('load', function() {
          mask.hide();
        });
      }
    }
  }],

  buttons: [{
    text: 'Close',
    handler: function() {
      this.up('window').close();
    }
  }]
}).show();`,
    vanilla: `<!-- HTML Structure -->
<button id="open-iframe-btn" class="button">Open External Content</button>

<div class="polaris-modal-backdrop" id="iframe-modal">
  <div class="polaris-modal polaris-modal--large" role="dialog" aria-labelledby="iframe-title">
    <div class="polaris-modal__header">
      <h2 id="iframe-title" class="polaris-modal__title">External Content</h2>
      <button class="polaris-modal__close" aria-label="Close">×</button>
    </div>
    <div class="polaris-modal__body" style="padding: 0;">
      <div class="loading-overlay" id="loading-overlay">
        <div class="spinner">Loading...</div>
      </div>
      <iframe
        id="external-iframe"
        name="external-content"
        src="https://www.shopify.com"
        style="width: 100%; height: 500px; border: none; display: none;"
        title="External Content">
      </iframe>
    </div>
  </div>
</div>

<script>
const modal = document.getElementById('iframe-modal');
const iframe = document.getElementById('external-iframe');
const loading = document.getElementById('loading-overlay');
const openBtn = document.getElementById('open-iframe-btn');
const closeBtn = modal.querySelector('.polaris-modal__close');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  loading.style.display = 'flex';
  iframe.style.display = 'none';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

iframe.addEventListener('load', () => {
  loading.style.display = 'none';
  iframe.style.display = 'block';
});

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
</script>

<style>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
}
</style>`,
    typescript: `import {Button, Frame, Modal} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface IframeModalProps {
  src: string;
  title: string;
  iframeName?: string;
  size?: 'small' | 'medium' | 'large' | 'fullScreen';
}

function IframeModalExample(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const modalConfig: IframeModalProps = {
    src: 'https://www.shopify.com',
    title: 'External Content',
    iframeName: 'external-content',
    size: 'large'
  };

  const handleChange = useCallback(() => {
    setActive(!active);
    if (!active) {
      setLoading(true);
    }
  }, [active]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Open External Content</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title={modalConfig.title}
          size={modalConfig.size}
          loading={loading}
          src={modalConfig.src}
          iFrameName={modalConfig.iframeName}
          onIFrameLoad={handleIframeLoad}
        />
      </Frame>
    </div>
  );
}`
  },
  'accessibility': {
    react: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AccessibilityDemoExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange}>Accessible Modal</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Accessibility Features"
          primaryAction={{
            content: 'Got it',
            onAction: handleChange
          }}
          secondaryActions={[{
            content: 'Skip',
            onAction: handleChange
          }]}
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              <h4>Screen Reader Support</h4>
              <p>This modal is fully accessible with screen readers. It includes:</p>
              <ul>
                <li>Proper ARIA attributes</li>
                <li>Focus management</li>
                <li>Keyboard navigation</li>
                <li>Role announcements</li>
              </ul>

              <h4>Keyboard Navigation</h4>
              <p>• Press <kbd>Tab</kbd> to navigate between focusable elements</p>
              <p>• Press <kbd>Shift + Tab</kbd> to navigate backwards</p>
              <p>• Press <kbd>Escape</kbd> to close the modal</p>
              <p>• Focus is trapped within the modal</p>
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Accessibility Features',
  width: 600,
  height: 400,
  modal: true,
  layout: 'fit',

  // Accessibility attributes
  ariaRole: 'dialog',
  ariaLabel: 'Accessibility Features Modal',

  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    autoScroll: true,
    html: \`
      <h3>Screen Reader Support</h3>
      <p>This modal is fully accessible with screen readers. It includes:</p>
      <ul>
        <li>Proper ARIA attributes</li>
        <li>Focus management</li>
        <li>Keyboard navigation</li>
        <li>Role announcements</li>
      </ul>

      <h3>Keyboard Navigation</h3>
      <p>• Press <kbd>Tab</kbd> to navigate between focusable elements</p>
      <p>• Press <kbd>Shift + Tab</kbd> to navigate backwards</p>
      <p>• Press <kbd>Escape</kbd> to close the modal</p>
      <p>• Focus is trapped within the modal</p>
    \`
  }],

  buttons: [{
    text: 'Skip',
    handler: function() {
      this.up('window').close();
    }
  }, {
    text: 'Got it',
    ui: 'primary',
    handler: function() {
      this.up('window').close();
    }
  }],

  listeners: {
    show: function(win) {
      // Ensure focus is on first button
      const firstButton = win.down('button');
      if (firstButton) {
        firstButton.focus();
      }
    }
  }
}).show();`,
    vanilla: `<!-- HTML Structure with full ARIA support -->
<button id="accessible-modal-btn" class="button" aria-haspopup="dialog">
  Accessible Modal
</button>

<div class="polaris-modal-backdrop" id="accessible-modal" role="dialog" aria-modal="true" aria-labelledby="accessible-title" aria-describedby="accessible-desc">
  <div class="polaris-modal" tabindex="-1">
    <div class="polaris-modal__header">
      <h2 id="accessible-title" class="polaris-modal__title">Accessibility Features</h2>
      <button class="polaris-modal__close" aria-label="Close modal" type="button">×</button>
    </div>
    <div class="polaris-modal__body" id="accessible-desc">
      <h4>Screen Reader Support</h4>
      <p>This modal is fully accessible with screen readers. It includes:</p>
      <ul>
        <li>Proper ARIA attributes</li>
        <li>Focus management</li>
        <li>Keyboard navigation</li>
        <li>Role announcements</li>
      </ul>

      <h4>Keyboard Navigation</h4>
      <p>• Press <kbd>Tab</kbd> to navigate between focusable elements</p>
      <p>• Press <kbd>Shift + Tab</kbd> to navigate backwards</p>
      <p>• Press <kbd>Escape</kbd> to close the modal</p>
      <p>• Focus is trapped within the modal</p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--secondary" type="button">Skip</button>
      <button class="button button--primary" type="button">Got it</button>
    </div>
  </div>
</div>

<script>
const modal = document.getElementById('accessible-modal');
const openBtn = document.getElementById('accessible-modal-btn');
const closeBtn = modal.querySelector('.polaris-modal__close');
const skipBtn = modal.querySelectorAll('button')[1];
const gotItBtn = modal.querySelectorAll('button')[2];
let lastFocusedElement = null;

// Get all focusable elements within modal
function getFocusableElements() {
  return modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
}

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus first button
  const focusable = getFocusableElements();
  if (focusable.length) focusable[0].focus();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Return focus to trigger element
  if (lastFocusedElement) lastFocusedElement.focus();
}

// Trap focus within modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusable = Array.from(getFocusableElements());
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  } else if (e.key === 'Escape') {
    closeModal();
  }
});

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
skipBtn.addEventListener('click', closeModal);
gotItBtn.addEventListener('click', closeModal);
</script>`,
    typescript: `import {Button, Frame, Modal, Text} from '@shopify/polaris';
import {useState, useCallback, useEffect, useRef} from 'react';

interface AccessibilityFeature {
  category: string;
  items: string[];
}

const accessibilityFeatures: AccessibilityFeature[] = [
  {
    category: 'Screen Reader Support',
    items: ['Proper ARIA attributes', 'Focus management', 'Keyboard navigation', 'Role announcements']
  },
  {
    category: 'Keyboard Navigation',
    items: [
      'Press Tab to navigate between focusable elements',
      'Press Shift + Tab to navigate backwards',
      'Press Escape to close the modal',
      'Focus is trapped within the modal'
    ]
  }
];

function AccessibilityDemoExample(): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    if (active) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    } else if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
    }
  }, [active]);

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Button onClick={handleChange} ariaHasPopup="dialog">
          Accessible Modal
        </Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Accessibility Features"
          primaryAction={{content: 'Got it', onAction: handleChange}}
          secondaryActions={[{content: 'Skip', onAction: handleChange}]}
        >
          <Modal.Section>
            <Text as="div" variant="bodyMd">
              {accessibilityFeatures.map((feature, index) => (
                <div key={index}>
                  <h4>{feature.category}</h4>
                  {feature.category === 'Screen Reader Support' ? (
                    <ul>
                      {feature.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    feature.items.map((item, idx) => (
                      <p key={idx}>• {item}</p>
                    ))
                  )}
                </div>
              ))}
            </Text>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  }};

export const cardExamples = {
  default: {
    react: `import { Card, Text } from '@shopify/polaris';
import React from 'react';

function CardExample() {
  return (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Order #1001
      </Text>
      <Text as="p" variant="bodyMd">
        This order has been successfully processed and is ready for shipping.
      </Text>
    </Card>
  );
}

export default CardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h2 class="polaris-heading-md">Order #1001</h2>
    <p class="polaris-body-md">
      This order has been successfully processed and is ready for shipping.
    </p>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, createCard } from '@cin7/vanilla-js';

const card = createCard({
  sectioned: true,
  content: \`
    <h2 class="polaris-heading-md">Order #1001</h2>
    <p class="polaris-body-md">
      This order has been successfully processed and is ready for shipping.
    </p>
  \`
});

document.getElementById('app').appendChild(card);
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-card',
  bodyPadding: 16,
  title: 'Order #1001',
  html: '<p style="color: #616161; line-height: 1.6;">This order has been successfully processed and is ready for shipping.</p>',
  border: true,
  frame: false,
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisCard } from '@cin7/extjs-adapters';

const card = Ext.create('PolarisCard', {
  sectioned: true,
  items: [{
    xtype: 'component',
    html: \`
      <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Order #1001</h2>
      <p style="color: #616161; line-height: 1.6;">
        This order has been successfully processed and is ready for shipping.
      </p>
    \`
  }]
});`,

    typescript: `import { Card, Text } from '@shopify/polaris';
import React from 'react';

interface CardExampleProps {
  orderId?: string;
  message?: string;
  sectioned?: boolean;
}

function CardExample({
  orderId = '#1001',
  message = 'This order has been successfully processed and is ready for shipping.',
  sectioned = true
}: CardExampleProps): JSX.Element {
  return (
    <Card sectioned={sectioned}>
      <Text as="h2" variant="headingMd">
        Order {orderId}
      </Text>
      <Text as="p" variant="bodyMd">
        {message}
      </Text>
    </Card>
  );
}

export default CardExample;`,
  },
  'with-subdued-background': {
    react: `import {BlockStack, Card, List, Text} from '@shopify/polaris';
import React from 'react';

function CardWithSubduedBackground() {
  return (
    <Card background="bg-surface-secondary">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          Deactivated staff accounts
        </Text>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: null,
  bodyPadding: 16,
  cls: 'polaris-card polaris-card--subdued',
  shadow: true,
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    defaults: {
      margin: '0 0 8 0'
    },
    items: [{
      xtype: 'component',
      html: '<h3 class="Polaris-Text--headingSm">Deactivated staff accounts</h3>'
    }, {
      xtype: 'component',
      html: '<ul class="Polaris-List"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card card--subdued">
  <div class="polaris-stack">
    <h3 class="polaris-text-heading-sm">Deactivated staff accounts</h3>
    <ul class="polaris-list">
      <li>Felix Crafford</li>
      <li>Ezequiel Manno</li>
    </ul>
  </div>
</div>
`,
    typescript: `import {BlockStack, Card, List, Text} from '@shopify/polaris';
import React from 'react';

interface StaffAccount {
  name: string;
  id: string;
}

interface CardWithSubduedBackgroundProps {
  title?: string;
  accounts?: StaffAccount[];
}

function CardWithSubduedBackground({ 
  title = "Deactivated staff accounts",
  accounts = [
    { id: '1', name: 'Felix Crafford' },
    { id: '2', name: 'Ezequiel Manno' }
  ]
}: CardWithSubduedBackgroundProps): JSX.Element {
  return (
    <Card background="bg-surface-secondary">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          {title}
        </Text>
        <List>
          {accounts.map((account) => (
            <List.Item key={account.id}>{account.name}</List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-section': {
    react: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

function CardWithSection() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance.
        </Text>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  bodyPadding: '0 16 16 16',
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<p class="Polaris-Text--bodyMd">View a summary of your online store\\'s performance.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <h2 class="polaris-card__title">Online store dashboard</h2>
  <div class="polaris-card__content">
    <p class="polaris-text-body-md">View a summary of your online store's performance.</p>
  </div>
</div>
`,
    typescript: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

interface CardWithSectionProps {
  title: string;
  description: string;
  roundedAbove?: 'xs' | 'sm' | 'md' | 'lg';
}

function CardWithSection({ 
  title,
  description,
  roundedAbove = 'sm'
}: CardWithSectionProps): JSX.Element {
  return (
    <Card roundedAbove={roundedAbove}>
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </Box>
    </Card>
  );
}`
  },
  'with-footer-actions': {
    react: `import React from 'react';
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

function CardWithFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={() => console.log('[Action] Button clicked')} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Create shipping label"
            >
              Create shipping label
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Shipment 1234',
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    html: '<h3 class="Polaris-Text--headingSm">Items</h3>',
    margin: '0 0 8 0'
  }, {
    xtype: 'component',
    html: '<ul class="Polaris-List"><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    ui: 'footer',
    items: ['->', {
      xtype: 'button',
      text: 'Fulfill items',
      handler: function() {
        console.log('Fulfill clicked');
      }
    }, {
      xtype: 'button',
      text: 'Create shipping label',
      iconCls: 'x-fa fa-plus',
      ui: 'primary',
      handler: function() {
        console.log('Create label clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__content">
    <h2 class="polaris-text-heading-sm">Shipment 1234</h2>
    <div class="items-section">
      <h3 class="polaris-text-heading-sm text-medium">Items</h3>
      <ul class="polaris-list">
        <li>1 × Oasis Glass, 4-Pack</li>
        <li>1 × Anubis Cup, 2-Pack</li>
      </ul>
    </div>
  </div>
  <div class="polaris-card__footer">
    <div class="polaris-button-group button-group--end">
      <button class="polaris-button" aria-label="Fulfill items">
        Fulfill items
      </button>
      <button class="polaris-button button--primary" aria-label="Create shipping label">
        <svg class="polaris-icon" viewBox="0 0 20 20">
          <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
        </svg>
        Create shipping label
      </button>
    </div>
  </div>
</div>


<script>
document.querySelectorAll('.polaris-button').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.getAttribute('aria-label');
    console.log(label + ' clicked');
  });
});
</script>`,
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
  cls: 'polaris-card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  tbar: [{
    xtype: 'component',
    html: '<h2 class="Polaris-Text--headingSm">Variants</h2>',
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
    html: '<p class="Polaris-Text--bodyMd">Add variants if this product comes in multiple versions, like different sizes or colors.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <h2 class="polaris-text-heading-sm">Variants</h2>
    <button class="button button--icon-text" aria-label="Add variant">
      <svg class="polaris-icon" viewBox="0 0 20 20">
        <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
      </svg>
      Add variant
    </button>
  </div>
  <p class="polaris-card__description">
    Add variants if this product comes in multiple versions, like
    different sizes or colors.
  </p>
</div>


<script>
document.querySelector('.button').addEventListener('click', () => {
  console.log('Add variant clicked');
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

interface CardWithHeaderActionsProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  actionIcon?: React.ComponentType;
}

function CardWithHeaderActions({
  title,
  description,
  actionText,
  onAction,
  actionIcon = PlusIcon
}: CardWithHeaderActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button
            onClick={onAction}
            accessibilityLabel={actionText + ' ' + title.toLowerCase()}
            icon={actionIcon}
          >
            {actionText}
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-all-elements': {
    react: `import React, {useState} from 'react';
import {
  ActionList,
  Bleed,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Popover,
  ResourceList,
  Text,
} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

function CardWithAllElements() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [{content: 'Gross Sales'}, {content: 'Net Sales'}];

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      View Sales
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={items} />
    </Popover>
  );

  const salesMarkup = (
    <div>
      <ResourceList
        resourceName={{singular: 'sale', plural: 'sales'}}
        items={[
          {
            sales: 'Orders',
            amount: 'USD$0.00',
            url: '#',
          },
          {
            sales: 'Returns',
            amount: '-USD$250.00',
            url: '#',
          },
        ]}
        renderItem={(item) => {
          const {sales, amount, url} = item;
          return (
            <ResourceList.Item
              id={sales}
              url={url}
              accessibilityLabel={'View Sales for ' + sales}
            >
              <InlineStack align="space-between">
                <div>{sales}</div>
                <div>{amount}</div>
              </InlineStack>
            </ResourceList.Item>
          );
        }}
      />
    </div>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Sales
          </Text>
          <ButtonGroup>
            <Button variant="plain">Total Sales</Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <BlockStack gap="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Total Sales Breakdown
          </Text>
        </BlockStack>
        {salesMarkup}
        <Bleed marginInline="400">
          <Box
            background="bg-surface-secondary"
            paddingBlock="300"
            paddingInline="400"
          >
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated reports
              </Text>
              <List>
                <List.Item>Payouts</List.Item>
                <List.Item>Total Sales By Channel</List.Item>
              </List>
            </BlockStack>
          </Box>
        </Bleed>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Note
          </Text>
          <Text as="p" variant="bodyMd">
            The sales reports are available only if your store is on the Shopify
            plan or higher.
          </Text>
          <InlineStack align="end">
            <ButtonGroup>
              <Button onClick={() => console.log('[Action] Button clicked')} accessibilityLabel="Dismiss">
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={() => console.log('[Action] Button clicked')}
                icon={ExportIcon}
                accessibilityLabel="Export Report"
              >
                Export Report
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Sales',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  tools: [{
    type: 'gear',
    tooltip: 'Total Sales',
    handler: function() {
      console.log('Total Sales clicked');
    }
  }, {
    type: 'help',
    tooltip: 'View Sales',
    handler: function() {
      console.log('View Sales clicked');
    }
  }],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p>You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by channel, or by staff.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 16 0;">Total Sales Breakdown</h3>'
  }, {
    xtype: 'grid',
    store: {
      fields: ['sales', 'amount'],
      data: [
        { sales: 'Orders', amount: 'USD$0.00' },
        { sales: 'Returns', amount: '-USD$250.00' }
      ]
    },
    columns: [
      { text: 'Type', dataIndex: 'sales', flex: 1 },
      { text: 'Amount', dataIndex: 'amount', width: 120 }
    ],
    height: 150,
    margin: '0 0 16 0'
  }, {
    xtype: 'panel',
    cls: 'polaris-card-section--subdued',
    bodyPadding: 12,
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Deactivated reports</h3><ul><li>Payouts</li><li>Total Sales By Channel</li></ul>',
    margin: '0 0 16 0'
  }, {
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Note</h3><p>The sales reports are available only if your store is on the Shopify plan or higher.</p>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Dismiss',
      handler: function() {
        console.log('Dismiss clicked');
      }
    }, {
      text: 'Export Report',
      ui: 'primary',
      iconCls: 'export-icon',
      handler: function() {
        console.log('Export Report clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <div class="polaris-card__header-title">
      <h2 class="polaris-text--heading-sm">Sales</h2>
    </div>
    <div class="polaris-button-group">
      <button class="polaris-button polaris-button--plain">Total Sales</button>
      <button class="polaris-button polaris-button--plain polaris-button--disclosure" id="view-sales-btn">
        View Sales
      </button>
    </div>
  </div>
  
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-loose">
      <p class="polaris-text--body-md">
        You can use sales reports to see information about your customers' orders 
        based on criteria such as sales over time, by channel, or by staff.
      </p>
      
      <h3 class="polaris-text--heading-sm">Total Sales Breakdown</h3>
      
      <div class="sales-list">
        <div class="sales-item">
          <span>Orders</span>
          <span>USD$0.00</span>
        </div>
        <div class="sales-item">
          <span>Returns</span>
          <span>-USD$250.00</span>
        </div>
      </div>
      
      <div class="polaris-card__section polaris-card__section--subdued">
        <h3 class="polaris-text--heading-sm">Deactivated reports</h3>
        <ul class="polaris-list">
          <li>Payouts</li>
          <li>Total Sales By Channel</li>
        </ul>
      </div>
      
      <div>
        <h3 class="polaris-text--heading-sm">Note</h3>
        <p class="polaris-text--body-md">
          The sales reports are available only if your store is on the Shopify plan or higher.
        </p>
      </div>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button" id="dismiss-btn">Dismiss</button>
      <button class="polaris-button polaris-button--primary" id="export-btn">
        <span class="polaris-button__icon">📄</span>
        Export Report
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('view-sales-btn').addEventListener('click', () => {
  console.log('View Sales clicked');
  // Show dropdown menu
});

document.getElementById('dismiss-btn').addEventListener('click', () => {
  console.log('Dismiss clicked');
});

document.getElementById('export-btn').addEventListener('click', () => {
  console.log('Export Report clicked');
});
</script>`,
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  Bleed,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Popover,
  ResourceList,
  Text,
} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

interface SalesItem {
  sales: string;
  amount: string;
  url: string;
}

interface ActionItem {
  content: string;
  onAction?: () => void;
}

interface CardWithAllElementsProps {
  title?: string;
  salesItems?: SalesItem[];
  actionItems?: ActionItem[];
  onDismiss?: () => void;
  onExport?: () => void;
}

function CardWithAllElements({
  title = "Sales",
  salesItems = [
    { sales: 'Orders', amount: 'USD$0.00', url: '#' },
    { sales: 'Returns', amount: '-USD$250.00', url: '#' }
  ],
  actionItems = [
    { content: 'Gross Sales' },
    { content: 'Net Sales' }
  ],
  onDismiss,
  onExport
}: CardWithAllElementsProps): JSX.Element {
  const [actionActive, toggleAction] = useState<boolean>(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Export Report clicked');
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Dismiss clicked');
    }
  };

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      View Sales
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={actionItems} />
    </Popover>
  );

  const salesMarkup = (
    <div>
      <ResourceList
        resourceName={{singular: 'sale', plural: 'sales'}}
        items={salesItems}
        renderItem={(item: SalesItem) => {
          const {sales, amount, url} = item;
          return (
            <ResourceList.Item
              id={sales}
              url={url}
              accessibilityLabel={'View Sales for ' + sales}
            >
              <InlineStack align="space-between">
                <div>{sales}</div>
                <div>{amount}</div>
              </InlineStack>
            </ResourceList.Item>
          );
        }}
      />
    </div>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <ButtonGroup>
            <Button variant="plain">Total Sales</Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <BlockStack gap="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Total Sales Breakdown
          </Text>
        </BlockStack>
        {salesMarkup}
        <Bleed marginInline="400">
          <Box
            background="bg-surface-secondary"
            paddingBlock="300"
            paddingInline="400"
          >
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated reports
              </Text>
              <List>
                <List.Item>Payouts</List.Item>
                <List.Item>Total Sales By Channel</List.Item>
              </List>
            </BlockStack>
          </Box>
        </Bleed>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Note
          </Text>
          <Text as="p" variant="bodyMd">
            The sales reports are available only if your store is on the Shopify
            plan or higher.
          </Text>
          <InlineStack align="end">
            <ButtonGroup>
              <Button onClick={handleDismiss} accessibilityLabel="Dismiss">
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={handleExport}
                icon={ExportIcon}
                accessibilityLabel="Export Report"
              >
                Export Report
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-critical-footer-actions': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';

function CardWithCriticalFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              variant="secondary"
              tone="critical"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Cancel shipment"
            >
              Cancel shipment
            </Button>
            <Button
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Shipment 1234',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Items</h3>',
    margin: '0 0 8 0'
  }, {
    xtype: 'component',
    html: '<ul><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Cancel shipment',
      ui: 'critical',
      handler: function() {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to cancel this shipment?', function(choice) {
          if (choice === 'yes') {
            console.log('Shipment cancelled');
          }
        });
      }
    }, {
      text: 'Add tracking number',
      ui: 'primary',
      handler: function() {
        console.log('Add tracking number clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-tight">
      <h2 class="polaris-text--heading-sm">Shipment 1234</h2>
      
      <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-tight">
        <h3 class="polaris-text--heading-sm">Items</h3>
        <ul class="polaris-list">
          <li>1 × Oasis Glass, 4-Pack</li>
          <li>1 × Anubis Cup, 2-Pack</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button polaris-button--secondary polaris-button--critical" id="cancel-btn">
        Cancel shipment
      </button>
      <button class="polaris-button polaris-button--primary" id="tracking-btn">
        Add tracking number
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('cancel-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel this shipment?')) {
    console.log('Shipment cancelled');
  }
});

document.getElementById('tracking-btn').addEventListener('click', () => {
  console.log('Add tracking number clicked');
});
</script>`,
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

interface ShipmentItem {
  id: string;
  quantity: number;
  name: string;
}

interface CardWithCriticalFooterActionsProps {
  shipmentId?: string;
  items?: ShipmentItem[];
  onCancelShipment?: () => void;
  onAddTracking?: () => void;
}

function CardWithCriticalFooterActions({
  shipmentId = "1234",
  items = [
    { id: '1', quantity: 1, name: 'Oasis Glass, 4-Pack' },
    { id: '2', quantity: 1, name: 'Anubis Cup, 2-Pack' }
  ],
  onCancelShipment,
  onAddTracking
}: CardWithCriticalFooterActionsProps): JSX.Element {
  const handleCancelShipment = () => {
    if (onCancelShipment) {
      onCancelShipment();
    } else {
      console.log('Cancel shipment clicked');
    }
  };

  const handleAddTracking = () => {
    if (onAddTracking) {
      onAddTracking();
    } else {
      console.log('Add tracking number clicked');
    }
  };

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
            <Button
              variant="secondary"
              tone="critical"
              onClick={handleCancelShipment}
              accessibilityLabel="Cancel shipment"
            >
              Cancel shipment
            </Button>
            <Button
              variant="primary"
              onClick={handleAddTracking}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-custom-footer-actions': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';

function CardWithCustomFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Secure your account with 2-step authentication
          </Text>
          <Text as="p" variant="bodyMd">
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </Text>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Enable two-step authentication"
            >
              Enable two-step authentication
            </Button>
            <Button variant="plain">Learn more</Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Secure your account with 2-step authentication',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p>Two-step authentication adds an extra layer of security when logging in to your account. A special code will be required each time you log in, ensuring only you can access your account.</p>',
    margin: '0 0 24 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Enable two-step authentication',
      handler: function() {
        console.log('Enable two-step authentication clicked');
      }
    }, {
      text: 'Learn more',
      ui: 'plain',
      handler: function() {
        console.log('Learn more clicked');
        window.open('https://help.shopify.com/en/manual/account/account-security/two-step-authentication');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-loose">
      <h2 class="polaris-text--heading-sm">
        Secure your account with 2-step authentication
      </h2>
      <p class="polaris-text--body-md">
        Two-step authentication adds an extra layer of security when logging
        in to your account. A special code will be required each time you
        log in, ensuring only you can access your account.
      </p>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button" id="enable-2fa-btn">
        Enable two-step authentication
      </button>
      <button class="polaris-button polaris-button--plain" id="learn-more-btn">
        Learn more
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('enable-2fa-btn').addEventListener('click', () => {
  console.log('Enable two-step authentication clicked');
});

document.getElementById('learn-more-btn').addEventListener('click', () => {
  console.log('Learn more clicked');
  window.open('https://help.shopify.com/en/manual/account/account-security/two-step-authentication');
});
</script>`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';

interface SecurityAction {
  content: string;
  onAction?: () => void;
  url?: string;
  variant?: 'primary' | 'secondary' | 'plain';
}

interface CardWithCustomFooterActionsProps {
  title?: string;
  description?: string;
  primaryAction?: SecurityAction;
  secondaryAction?: SecurityAction;
}

function CardWithCustomFooterActions({
  title = "Secure your account with 2-step authentication",
  description = "Two-step authentication adds an extra layer of security when logging in to your account. A special code will be required each time you log in, ensuring only you can access your account.",
  primaryAction = {
    content: "Enable two-step authentication",
    onAction: () => console.log('Enable two-step authentication clicked')
  },
  secondaryAction = {
    content: "Learn more",
    variant: "plain",
    url: "https://help.shopify.com/en/manual/account/account-security/two-step-authentication"
  }
}: CardWithCustomFooterActionsProps): JSX.Element {
  const handlePrimaryAction = () => {
    if (primaryAction?.onAction) {
      primaryAction.onAction();
    }
  };

  const handleSecondaryAction = () => {
    if (secondaryAction?.onAction) {
      secondaryAction.onAction();
    } else if (secondaryAction?.url) {
      window.open(secondaryAction.url);
    }
  };

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Text as="p" variant="bodyMd">
            {description}
          </Text>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              onClick={handlePrimaryAction}
              accessibilityLabel={primaryAction?.content}
              variant={primaryAction?.variant}
            >
              {primaryAction?.content}
            </Button>
            <Button 
              variant={secondaryAction?.variant || "plain"}
              onClick={handleSecondaryAction}
            >
              {secondaryAction?.content}
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-custom-react-node-title': {
    react: `import React from 'react';
import {
  BlockStack,
  Card,
  Icon,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {ProductIcon} from '@shopify/polaris-icons';

function CardWithCustomReactNodeTitle() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Products
        </Text>
        <BlockStack inlineAlign="start">
          <InlineStack gap="400">
            <Icon source={ProductIcon} />
            <Text as="h3" variant="headingSm">
              New Products
            </Text>
          </InlineStack>
        </BlockStack>
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Products',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'middle'
    },
    items: [{
      xtype: 'component',
      html: '<span class="icon">📦</span>',
      margin: '0 10 0 0'
    }, {
      xtype: 'component',
      html: '<h3 style="margin: 0; font-weight: 600;">New Products</h3>'
    }],
    margin: '0 0 15 0'
  }, {
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px;"><li>Socks</li><li>Super Shoes</li></ul>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Products</h2>
      <div class="polaris-block-stack polaris-block-stack--inline-align-start">
        <div class="polaris-inline-stack polaris-inline-stack--gap-400">
          <span class="polaris-icon">📦</span>
          <h3 class="polaris-text polaris-text--variant-heading-sm">New Products</h3>
        </div>
      </div>
      <ul class="polaris-list">
        <li class="polaris-list__item">Socks</li>
        <li class="polaris-list__item">Super Shoes</li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-list__item').forEach(item => {
  item.addEventListener('click', (e) => {
    console.log('Product selected: ' + e.target.textContent);
  });
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__bleed">
    <img 
      src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" 
      alt="a sheet with purple and orange stripes"
      class="polaris-image polaris-image--full-width"
    />
    <div class="polaris-box polaris-box--bg-surface-secondary polaris-box--padding-400">
      <p class="polaris-text polaris-text--variant-body-md">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by channel, or by
        staff.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-image').addEventListener('load', (e) => {
  console.log('Image loaded successfully');
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Variants</h2>
        <button 
          class="polaris-button polaris-button--icon-only" 
          aria-label="Export variants"
          id="export-button"
        >
          <span class="polaris-icon">📤</span>
        </button>
      </div>
      <p class="polaris-text polaris-text--variant-body-md">
        Export variants
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('export-button').addEventListener('click', (e) => {
  console.log('Export variants clicked');
  // Add export functionality here
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

interface CardWithHeaderIconActionsProps {
  title?: string;
  description?: string;
  exportLabel?: string;
  onExport?: () => void;
  exportIcon?: React.ComponentType;
}

function CardWithHeaderIconActions({
  title = "Variants",
  description = "Export variants",
  exportLabel = "Export variants",
  onExport = () => console.log('Export clicked'),
  exportIcon = ExportIcon
}: CardWithHeaderIconActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button
            onClick={onExport}
            accessibilityLabel={exportLabel}
            icon={exportIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-multiple-footer-actions': {
    react: `import React, {useState} from 'react';
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

function CardWithMultipleFooterActions() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [
    {content: 'Cancel shipment', destructive: true},
    {content: 'Add another shipment', disabled: true},
  ];

  const disclosureButtonActivator = (
    <Button disclosure accessibilityLabel="More" onClick={handleToggleAction}>
      More
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={items} />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            {disclosureButton}
            <Button
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Shipment 1234',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Items</h3><ul style="margin: 0; padding-left: 20px;"><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    flex: 1
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      pack: 'end'
    },
    items: [{
      text: 'More',
      menu: [{
        text: 'Cancel shipment',
        iconCls: 'delete',
        handler: function() {
          console.log('Cancel shipment clicked');
        }
      }, {
        text: 'Add another shipment',
        disabled: true
      }]
    }, {
      text: 'Add tracking number',
      ui: 'primary',
      handler: function() {
        console.log('Add tracking number clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Shipment 1234</h2>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">Items</h3>
        <ul class="polaris-list">
          <li class="polaris-list__item">1 × Oasis Glass, 4-Pack</li>
          <li class="polaris-list__item">1 × Anubis Cup, 2-Pack</li>
        </ul>
      </div>
      <div class="polaris-inline-stack polaris-inline-stack--align-end">
        <div class="polaris-button-group">
          <div class="polaris-popover-wrapper">
            <button class="polaris-button polaris-button--disclosure" id="more-button">
              More
            </button>
            <div class="polaris-popover polaris-popover--hidden" id="more-popover">
              <ul class="polaris-action-list">
                <li class="polaris-action-list__item polaris-action-list__item--destructive">
                  <button class="polaris-action-list__button">Cancel shipment</button>
                </li>
                <li class="polaris-action-list__item polaris-action-list__item--disabled">
                  <button class="polaris-action-list__button" disabled>Add another shipment</button>
                </li>
              </ul>
            </div>
          </div>
          <button class="polaris-button polaris-button--primary" id="tracking-button">
            Add tracking number
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const moreButton = document.getElementById('more-button');
const morePopover = document.getElementById('more-popover');
const trackingButton = document.getElementById('tracking-button');

moreButton.addEventListener('click', (e) => {
  morePopover.classList.toggle('polaris-popover--hidden');
});

trackingButton.addEventListener('click', (e) => {
  console.log('Add tracking number clicked');
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    if (!e.target.disabled) {
      console.log('Action clicked: ' + e.target.textContent);
      morePopover.classList.add('polaris-popover--hidden');
    }
  });
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-heading-sm">
      Online store dashboard
    </h2>
    <div class="polaris-box polaris-box--padding-block-200">
      <p class="polaris-text polaris-text--variant-body-md">
        View a summary of your online store's performance.
      </p>
    </div>
    <div class="polaris-box polaris-box--padding-block-start-200">
      <p class="polaris-text polaris-text--variant-body-md">
        View a summary of your online store's performance, including sales,
        visitors, top products, and referrals.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-box').forEach(section => {
  section.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = '#f6f6f7';
  });
  section.addEventListener('mouseleave', (e) => {
    e.target.style.backgroundColor = '';
  });
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-heading-sm">
      Online store dashboard
    </h2>
    <div class="polaris-box polaris-box--padding-block-200">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
          Reports
        </h3>
        <p class="polaris-text polaris-text--variant-body-md">
          View a summary of your online store's performance.
        </p>
      </div>
    </div>
    <div class="polaris-box polaris-box--padding-block-start-200">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
          Summary
        </h3>
        <p class="polaris-text polaris-text--variant-body-md">
          View a summary of your online store's performance, including sales,
          visitors, top products, and referrals.
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-block-stack').forEach(section => {
  section.addEventListener('click', (e) => {
    const title = section.querySelector('h3').textContent;
    console.log('Section clicked: ' + title);
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded-above-md polaris-card--bg-surface-secondary">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-body-md">
      Content inside a card
    </h2>
  </div>
</div>

<script>
// JavaScript behavior for responsive border radius
function updateCardRadius() {
  const cards = document.querySelectorAll('.polaris-card--rounded-above-md');
  cards.forEach(card => {
    if (window.innerWidth >= 768) {
      card.style.borderRadius = '8px';
    } else {
      card.style.borderRadius = '4px';
    }
  });
}

// Apply on load and resize
updateCardRadius();
window.addEventListener('resize', updateCardRadius);
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Contact Information
          </h3>
          <button 
            class="polaris-button polaris-button--tertiary polaris-button--icon-only" 
            aria-label="Edit"
            id="edit-contact-button"
          >
            <span class="polaris-icon">✏️</span>
          </button>
        </div>
        <p class="polaris-text polaris-text--variant-body-md">
          john.smith@example.com
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('edit-contact-button').addEventListener('click', (e) => {
  console.log('Edit contact information clicked');
  // Add edit functionality here
});

// Make email clickable
document.querySelectorAll('.polaris-text').forEach(text => {
  if (text.textContent.includes('@')) {
    text.style.cursor = 'pointer';
    text.addEventListener('click', (e) => {
      window.location.href = 'mailto:' + e.target.textContent;
    });
  }
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  editable?: boolean;
}

interface CardWithSectionsAndActionsProps {
  customer?: Customer;
  sections?: Section[];
  onEdit?: (sectionId: string) => void;
  onCustomerClick?: (customer: Customer) => void;
}

function CardWithSectionsAndActions({
  customer = { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  sections = [
    { id: 'contact', title: 'Contact Information', content: 'john.smith@example.com', editable: true }
  ],
  onEdit,
  onCustomerClick
}: CardWithSectionsAndActionsProps): JSX.Element {
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
        {sections.map((section) => (
          <BlockStack key={section.id} gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {section.title}
              </Text>
              {section.editable && (
                <Button
                  icon={EditIcon}
                  variant="tertiary"
                  onClick={() => onEdit?.(section.id)}
                  accessibilityLabel={'Edit ' + section.title}
                />
              )}
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}`
  },
  'with-sections-and-critical-action': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
} from '@shopify/polaris';
import {DeleteIcon, EditIcon} from '@shopify/polaris-icons';

function CardWithSectionsAndCriticalAction() {
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
            <ButtonGroup>
              <Button
                icon={DeleteIcon}
                variant="tertiary"
                tone="critical"
                onClick={() => console.log('[Action] Button clicked')}
                accessibilityLabel="Delete"
              />
              <Button
                icon={EditIcon}
                variant="tertiary"
                onClick={() => console.log('[Action] Button clicked')}
                accessibilityLabel="Edit"
              />
            </ButtonGroup>
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
        xtype: 'container',
        layout: {
          type: 'hbox'
        },
        items: [{
          xtype: 'button',
          text: 'Delete',
          iconCls: 'delete',
          ui: 'critical',
          handler: function() {
            console.log('Delete contact information');
          }
        }, {
          xtype: 'button',
          text: 'Edit',
          iconCls: 'edit',
          ui: 'tertiary',
          handler: function() {
            console.log('Edit contact information');
          }
        }]
      }],
      margin: '0 0 10 0'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">john.smith@example.com</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Contact Information
          </h3>
          <div class="polaris-button-group">
            <button 
              class="polaris-button polaris-button--tertiary polaris-button--critical polaris-button--icon-only" 
              aria-label="Delete"
              id="delete-contact-button"
            >
              <span class="polaris-icon">🗑️</span>
            </button>
            <button 
              class="polaris-button polaris-button--tertiary polaris-button--icon-only" 
              aria-label="Edit"
              id="edit-contact-button"
            >
              <span class="polaris-icon">✏️</span>
            </button>
          </div>
        </div>
        <p class="polaris-text polaris-text--variant-body-md">
          john.smith@example.com
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('delete-contact-button').addEventListener('click', (e) => {
  if (confirm('Are you sure you want to delete this contact information?')) {
    console.log('Delete contact information confirmed');
    // Add delete functionality here
  }
});

document.getElementById('edit-contact-button').addEventListener('click', (e) => {
  console.log('Edit contact information clicked');
  // Add edit functionality here
});

// Make email clickable
document.querySelectorAll('.polaris-text').forEach(text => {
  if (text.textContent.includes('@')) {
    text.style.cursor = 'pointer';
    text.addEventListener('click', (e) => {
      window.location.href = 'mailto:' + e.target.textContent;
    });
  }
});
</script>`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
} from '@shopify/polaris';
import {DeleteIcon, EditIcon} from '@shopify/polaris-icons';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  editable?: boolean;
  deletable?: boolean;
}

interface CardWithSectionsAndCriticalActionProps {
  customer?: Customer;
  sections?: Section[];
  onEdit?: (sectionId: string) => void;
  onDelete?: (sectionId: string) => void;
  onCustomerClick?: (customer: Customer) => void;
}

function CardWithSectionsAndCriticalAction({
  customer = { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  sections = [
    { 
      id: 'contact', 
      title: 'Contact Information', 
      content: 'john.smith@example.com', 
      editable: true,
      deletable: true 
    }
  ],
  onEdit,
  onDelete,
  onCustomerClick
}: CardWithSectionsAndCriticalActionProps): JSX.Element {
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
        {sections.map((section) => (
          <BlockStack key={section.id} gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {section.title}
              </Text>
              <ButtonGroup>
                {section.deletable && (
                  <Button
                    icon={DeleteIcon}
                    variant="tertiary"
                    tone="critical"
                    onClick={() => onDelete?.(section.id)}
                    accessibilityLabel={'Delete ' + section.title}
                  />
                )}
                {section.editable && (
                  <Button
                    icon={EditIcon}
                    variant="tertiary"
                    onClick={() => onEdit?.(section.id)}
                    accessibilityLabel={'Edit ' + section.title}
                  />
                )}
              </ButtonGroup>
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}`
  },
  'with-separate-header': {
    react: `import React, {useState} from 'react';
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

function CardWithSeparateHeader() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [{content: 'Member'}, {content: 'Admin'}];

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
      <ActionList items={items} />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Staff accounts
          </Text>
          <ButtonGroup>
            <Button
              variant="plain"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Preview"
            >
              Preview
            </Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Staff accounts',
  padding: 20,
  tools: [{
    type: 'gear',
    tooltip: 'Preview',
    handler: function() {
      console.log('Preview clicked');
    }
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    layout: {
      pack: 'end'
    },
    items: [{
      text: 'Preview',
      ui: 'plain',
      handler: function() {
        console.log('Preview clicked');
      }
    }, {
      text: 'Add account',
      ui: 'plain',
      menu: [{
        text: 'Member',
        handler: function() {
          console.log('Add Member clicked');
        }
      }, {
        text: 'Admin',
        handler: function() {
          console.log('Add Admin clicked');
        }
      }]
    }]
  }],
  items: [{
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Staff accounts</h2>
        <div class="polaris-button-group">
          <button class="polaris-button polaris-button--plain" id="preview-button">
            Preview
          </button>
          <div class="polaris-popover-wrapper">
            <button class="polaris-button polaris-button--plain polaris-button--disclosure" id="add-account-button">
              Add account
            </button>
            <div class="polaris-popover polaris-popover--hidden" id="add-account-popover">
              <ul class="polaris-action-list">
                <li class="polaris-action-list__item">
                  <button class="polaris-action-list__button" data-role="Member">Member</button>
                </li>
                <li class="polaris-action-list__item">
                  <button class="polaris-action-list__button" data-role="Admin">Admin</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="polaris-list">
        <li class="polaris-list__item">Felix Crafford</li>
        <li class="polaris-list__item">Ezequiel Manno</li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const previewButton = document.getElementById('preview-button');
const addAccountButton = document.getElementById('add-account-button');
const addAccountPopover = document.getElementById('add-account-popover');

previewButton.addEventListener('click', (e) => {
  console.log('Preview clicked');
});

addAccountButton.addEventListener('click', (e) => {
  addAccountPopover.classList.toggle('polaris-popover--hidden');
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    const role = e.target.dataset.role;
    console.log('Add ' + role + ' clicked');
    addAccountPopover.classList.add('polaris-popover--hidden');
  });
});

// Close popover when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.polaris-popover-wrapper')) {
    addAccountPopover.classList.add('polaris-popover--hidden');
  }
});
</script>`,
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
  onAddAccount = (role) => console.log('Add ' + role + ' clicked'),
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Staff accounts</h2>
      <div class="polaris-box polaris-box--padding-block-end-200">
        <ul class="polaris-list">
          <li class="polaris-list__item">Felix Crafford</li>
          <li class="polaris-list__item">Ezequiel Manno</li>
        </ul>
      </div>
    </div>
    <div class="polaris-bleed polaris-bleed--margin-block-end-400 polaris-bleed--margin-inline-400">
      <div class="polaris-box polaris-box--bg-surface-secondary polaris-box--padding-400">
        <div class="polaris-block-stack polaris-block-stack--gap-200">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Deactivated staff accounts
          </h3>
          <ul class="polaris-list">
            <li class="polaris-list__item">Felix Crafford</li>
            <li class="polaris-list__item">Ezequiel Manno</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-list__item').forEach(item => {
  item.addEventListener('click', (e) => {
    const isDeactivated = e.target.closest('.polaris-box--bg-surface-secondary') !== null;
    const status = isDeactivated ? 'deactivated' : 'active';
    console.log(status + ' staff member clicked: ' + e.target.textContent);
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-subsection">
        <div class="polaris-block-stack polaris-block-stack--gap-200">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Addresses
          </h3>
          <div class="polaris-address-block">
            <p class="polaris-text polaris-text--variant-body-md">123 First St</p>
            <p class="polaris-text polaris-text--variant-body-md">Somewhere</p>
            <p class="polaris-text polaris-text--variant-body-md">The Universe</p>
          </div>
          <div class="polaris-address-block">
            <p class="polaris-text polaris-text--variant-body-md">123 Second St</p>
            <p class="polaris-text polaris-text--variant-body-md">Somewhere</p>
            <p class="polaris-text polaris-text--variant-body-md">The Universe</p>
          </div>
        </div>
      </div>
      <div class="polaris-single-subsection">
        <p class="polaris-text polaris-text--variant-body-md">
          A single subsection without a sibling has no visual appearance
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-address-block').forEach((block, index) => {
  block.addEventListener('click', (e) => {
    console.log('Address ' + (index + 1) + ' clicked');
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

// Backdrop Component Examples - Overlays

export const bannerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner title="Order archived" onDismiss={() => console.log('[Dismiss] Component dismissed')}>
      <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </Banner>
  );
}

export default BannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">Order archived</h3>
    <p class="polaris-banner__message">This order was archived on March 7, 2017 at 3:12pm EDT.</p>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>


<script>
document.querySelector('.polaris-banner__dismiss').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ⓘ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Order archived</h3>'
    }, {
      xtype: 'component',
      html: '<p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>'
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,

    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface BannerProps {
  title: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function BannerExample({
  title,
  children,
  dismissible = true,
  onDismiss
}: BannerProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <Banner
      title={title}
      onDismiss={dismissible ? handleDismiss : undefined}
    >
      {children}
    </Banner>
  );
}

export default BannerExample;`,
  },

  critical: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function CriticalBannerExample() {
  return (
    <Banner
      title="High risk of fraud detected"
      action={{content: 'Review risk analysis'}}
      tone="critical"
    >
      <p>
        Before fulfilling this order or capturing payment, please{' '}
        <Link url="">review the Risk Analysis</Link> and determine if this order
        is fraudulent.
      </p>
    </Banner>
  );
}

export default CriticalBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner banner--critical" role="alert">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-7a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">High risk of fraud detected</h3>
    <p class="polaris-banner__message">
      Before fulfilling this order or capturing payment, please
      <a href="#" class="polaris-banner__link">review the Risk Analysis</a>
      and determine if this order is fraudulent.
    </p>
    <button class="polaris-banner__action">Review risk analysis</button>
  </div>
</div>


<script>
document.querySelector('.polaris-banner__action').addEventListener('click', () => {
  console.log('Review risk analysis clicked');
  window.location.href = '#risk-analysis';
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--critical',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠️</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">High risk of fraud detected</h3>'
    }, {
      xtype: 'component',
      html: '<p>Before fulfilling this order or capturing payment, please <a href="#">review the Risk Analysis</a> and determine if this order is fraudulent.</p>'
    }, {
      xtype: 'button',
      text: 'Review risk analysis',
      margin: '8 0 0 0',
      handler: function() {
        console.log('Review risk analysis clicked');
      }
    }]
  }]
});`,

    typescript: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

type BannerTone = 'info' | 'success' | 'warning' | 'critical';

interface BannerAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

interface CriticalBannerProps {
  title: string;
  message: React.ReactNode;
  action?: BannerAction;
  tone?: BannerTone;
}

function CriticalBanner({
  title,
  message,
  action,
  tone = 'critical'
}: CriticalBannerProps): JSX.Element {
  const handleAction = () => {
    if (action?.onAction) {
      action.onAction();
    } else if (action?.url) {
      window.location.href = action.url;
    }
  };

  return (
    <Banner
      title={title}
      action={action ? {
        content: action.content,
        onAction: handleAction
      } : undefined}
      tone={tone}
    >
      {message}
    </Banner>
  );
}

export default CriticalBanner;`
  },

  success: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function SuccessBannerExample() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      tone="success"
      action={{content: 'Print label'}}
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    />
  );
}

export default SuccessBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner banner--success" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <div class="polaris-banner__header">
      <h3 class="polaris-banner__title">Your shipping label is ready to print.</h3>
      <button class="polaris-banner__action">Print label</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>


<script>
document.querySelector('.polaris-banner__action').addEventListener('click', () => {
  console.log('Print label clicked');
  window.print();
});

document.querySelector('.polaris-banner__dismiss').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--success',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">✓</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'hbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Your shipping label is ready to print.</h3>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Print label',
      handler: function() {
        console.log('Print label clicked');
      }
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,

    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface SuccessBannerProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function SuccessBanner({
  title,
  actionText,
  onAction,
  dismissible = true,
  onDismiss
}: SuccessBannerProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleAction = () => {
    onAction?.();
  };

  if (!isVisible) return null;

  return (
    <Banner
      title={title}
      tone="success"
      action={actionText ? {
        content: actionText,
        onAction: handleAction
      } : undefined}
      onDismiss={dismissible ? handleDismiss : undefined}
    />
  );
}

export default SuccessBanner;`
  },

  warning: {
    react: `import {Banner, List} from '@shopify/polaris';
import React from 'react';

function WarningBannerExample() {
  return (
    <Banner
      title="Before you can purchase a shipping label, this change needs to be made:"
      action={{content: 'Edit address'}}
      tone="warning"
    >
      <List>
        <List.Item>
          The name of the city you're shipping to has characters that aren't
          allowed. City name can only include spaces and hyphens.
        </List.Item>
      </List>
    </Banner>
  );
}

export default WarningBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--warning" role="alert" aria-live="assertive">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2L2 18h16L10 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 8v4M10 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">Before you can purchase a shipping label, this change needs to be made:</h3>
    <ul class="polaris-list">
      <li>
        The name of the city you're shipping to has characters that aren't
        allowed. City name can only include spaces and hyphens.
      </li>
    </ul>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="edit-address-btn">Edit address</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('edit-address-btn').addEventListener('click', () => {
  console.log('Edit address clicked');
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--warning',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Before you can purchase a shipping label, this change needs to be made:</h3>'
    }, {
      xtype: 'component',
      html: '<ul><li>The name of the city you\\'re shipping to has characters that aren\\'t allowed. City name can only include spaces and hyphens.</li></ul>'
    }, {
      xtype: 'button',
      text: 'Edit address',
      handler: function() {
        console.log('Edit address clicked');
      }
    }]
  }]
});`,

    typescript: `import {Banner, List} from '@shopify/polaris';
import React from 'react';

interface ValidationIssue {
  id: string;
  message: string;
}

interface WarningBannerProps {
  title?: string;
  issues?: ValidationIssue[];
  actionText?: string;
  onAction?: () => void;
}

function WarningBanner({
  title = "Before you can purchase a shipping label, this change needs to be made:",
  issues = [{
    id: '1',
    message: "The name of the city you're shipping to has characters that aren't allowed. City name can only include spaces and hyphens."
  }],
  actionText = "Edit address",
  onAction
}: WarningBannerProps): JSX.Element {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      console.log('Warning action clicked');
    }
  };

  return (
    <Banner
      title={title}
      action={{ content: actionText, onAction: handleAction }}
      tone="warning"
    >
      <List>
        {issues.map((issue) => (
          <List.Item key={issue.id}>
            {issue.message}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
}

export default WarningBanner;`
  },

  informational: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function InformationalBannerExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      tone="info"
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export default InformationalBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--info" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">USPS has updated their rates</h3>
    <p>Make sure you know how these changes affect your store.</p>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="update-rates-btn">Update rates</button>
      <button class="polaris-button polaris-button--plain" id="learn-more-btn">Learn more</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-info-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('update-rates-btn').addEventListener('click', () => {
  console.log('Update rates clicked');
});

document.getElementById('learn-more-btn').addEventListener('click', () => {
  console.log('Learn more clicked');
});

document.getElementById('dismiss-info-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--info',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ℹ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">USPS has updated their rates</h3>'
    }, {
      xtype: 'component',
      html: '<p>Make sure you know how these changes affect your store.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Update rates',
        handler: function() {
          console.log('Update rates clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'plain',
        handler: function() {
          console.log('Learn more clicked');
        }
      }]
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,

    typescript: `import {Banner} from '@shopify/polaris';
import React from 'react';

interface BannerAction {
  content: string;
  url?: string;
  onAction?: () => void;
}

interface InformationalBannerProps {
  title?: string;
  message?: string;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  onDismiss?: () => void;
  tone?: 'success' | 'info' | 'warning' | 'critical';
}

function InformationalBanner({
  title = "USPS has updated their rates",
  message = "Make sure you know how these changes affect your store.",
  primaryAction = { content: 'Update rates', url: '' },
  secondaryAction = { content: 'Learn more' },
  onDismiss,
  tone = "info"
}: InformationalBannerProps): JSX.Element {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <Banner
      title={title}
      action={primaryAction}
      secondaryAction={secondaryAction}
      tone={tone}
      onDismiss={handleDismiss}
    >
      <p>{message}</p>
    </Banner>
  );
}

export default InformationalBanner;`
  },

  dismissible: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function DismissibleBannerExample() {
  return (
    <Banner onDismiss={() => console.log('[Dismiss] Component dismissed')}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export default DismissibleBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <p>
      Use your finance report to get detailed information about your business.
      <a href="#" class="polaris-banner__link">Let us know what you think</a>
    </p>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('dismiss-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ℹ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    html: '<p>Use your finance report to get detailed information about your business. <a href="#" class="banner-link">Let us know what you think</a></p>'
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,

    typescript: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

interface DismissibleBannerProps {
  message?: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
  onDismiss?: () => void;
}

function DismissibleBanner({
  message = "Use your finance report to get detailed information about your business.",
  linkText = "Let us know what you think",
  linkUrl = "",
  onDismiss
}: DismissibleBannerProps): JSX.Element {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <Banner onDismiss={handleDismiss}>
      <p>
        {message}{' '}
        <Link url={linkUrl}>{linkText}</Link>
      </p>
    </Banner>
  );
}

export default DismissibleBanner;`
  },

  'with-actions': {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerWithActionsExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      tone="info"
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export default BannerWithActionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--info" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">USPS has updated their rates</h3>
    <p>Make sure you know how these changes affect your store.</p>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="update-rates-action">Update rates</button>
      <button class="polaris-button polaris-button--plain" id="learn-more-action">Learn more</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-action-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
document.getElementById('update-rates-action').addEventListener('click', () => {
  console.log('Update rates clicked');
});

document.getElementById('learn-more-action').addEventListener('click', () => {
  console.log('Learn more clicked');
});

document.getElementById('dismiss-action-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--info',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ℹ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">USPS has updated their rates</h3>'
    }, {
      xtype: 'component',
      html: '<p>Make sure you know how these changes affect your store.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Update rates',
        handler: function() {
          console.log('Update rates clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'plain',
        margin: '0 0 0 8',
        handler: function() {
          console.log('Learn more clicked');
        }
      }]
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,

    typescript: `import {Banner} from '@shopify/polaris';
import React from 'react';

interface BannerAction {
  content: string;
  url?: string;
  onAction?: () => void;
}

interface BannerWithActionsProps {
  title?: string;
  message?: string;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  tone?: 'success' | 'info' | 'warning' | 'critical';
  onDismiss?: () => void;
}

function BannerWithActions({
  title = "USPS has updated their rates",
  message = "Make sure you know how these changes affect your store.",
  primaryAction = { content: 'Update rates', url: '' },
  secondaryAction = { content: 'Learn more' },
  tone = "info",
  onDismiss
}: BannerWithActionsProps): JSX.Element {
  return (
    <Banner
      title={title}
      action={primaryAction}
      secondaryAction={secondaryAction}
      tone={tone}
      onDismiss={onDismiss}
    >
      <p>{message}</p>
    </Banner>
  );
}

export default BannerWithActions;`
  },

  'status-variants': {
    react: `import { Banner } from '@shopify/polaris';
import React from 'react';

function StatusVariantsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Banner
        title="Success"
        status="success"
        dismissible
      >
        Payment was processed successfully. Order confirmation has been sent to your email.
      </Banner>

      <Banner
        title="Information"
        status="info"
        dismissible
      >
        New features have been added to your dashboard. Check out the latest updates.
      </Banner>

      <Banner
        title="Warning"
        status="warning"
        dismissible
      >
        Your subscription will expire in 3 days. Renew now to avoid interruption.
      </Banner>

      <Banner
        title="Critical Error"
        status="critical"
        dismissible
      >
        Payment method declined. Please update your billing information to continue service.
      </Banner>
    </div>
  );
}

export default StatusVariantsExample;`,

    vanilla: `<!-- HTML Structure for multiple status banners -->
<div id="banners-container" style="display: flex; flex-direction: column; gap: 16px;">
  <!-- Success Banner -->
  <div class="polaris-banner polaris-banner--success" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Success</h3>
      <p>Payment was processed successfully. Order confirmation has been sent to your email.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss">×</button>
  </div>

  <!-- Info Banner -->
  <div class="polaris-banner polaris-banner--info" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Information</h3>
      <p>New features have been added to your dashboard. Check out the latest updates.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss">×</button>
  </div>

  <!-- Warning Banner -->
  <div class="polaris-banner polaris-banner--warning" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Warning</h3>
      <p>Your subscription will expire in 3 days. Renew now to avoid interruption.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss">×</button>
  </div>

  <!-- Critical Banner -->
  <div class="polaris-banner polaris-banner--critical" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Critical Error</h3>
      <p>Payment method declined. Please update your billing information to continue service.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss">×</button>
  </div>
</div>

<script>
// Add dismiss handlers for all banners
document.querySelectorAll('.polaris-banner__dismiss').forEach(button => {
  button.addEventListener('click', (e) => {
    e.target.closest('.polaris-banner').remove();
  });
});
</script>`,

    extjs: `// Create a container with multiple banner panels
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0',
    bodyPadding: 16
  },
  items: [{
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--success',
    layout: 'hbox',
    items: [{
      xtype: 'container',
      flex: 1,
      html: '<h3>Success</h3><p>Payment was processed successfully. Order confirmation has been sent to your email.</p>'
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--info',
    layout: 'hbox',
    items: [{
      xtype: 'container',
      flex: 1,
      html: '<h3>Information</h3><p>New features have been added to your dashboard. Check out the latest updates.</p>'
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--warning',
    layout: 'hbox',
    items: [{
      xtype: 'container',
      flex: 1,
      html: '<h3>Warning</h3><p>Your subscription will expire in 3 days. Renew now to avoid interruption.</p>'
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--critical',
    layout: 'hbox',
    items: [{
      xtype: 'container',
      flex: 1,
      html: '<h3>Critical Error</h3><p>Payment method declined. Please update your billing information to continue service.</p>'
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Banner } from '@shopify/polaris';
import React from 'react';

type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

interface StatusBanner {
  id: string;
  title: string;
  status: BannerStatus;
  message: string;
}

const statusBanners: StatusBanner[] = [
  {
    id: 'success',
    title: 'Success',
    status: 'success',
    message: 'Payment was processed successfully. Order confirmation has been sent to your email.'
  },
  {
    id: 'info',
    title: 'Information',
    status: 'info',
    message: 'New features have been added to your dashboard. Check out the latest updates.'
  },
  {
    id: 'warning',
    title: 'Warning',
    status: 'warning',
    message: 'Your subscription will expire in 3 days. Renew now to avoid interruption.'
  },
  {
    id: 'critical',
    title: 'Critical Error',
    status: 'critical',
    message: 'Payment method declined. Please update your billing information to continue service.'
  }
];

function StatusVariantsExample(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {statusBanners.map((banner) => (
        <Banner
          key={banner.id}
          title={banner.title}
          status={banner.status}
          dismissible
        >
          {banner.message}
        </Banner>
      ))}
    </div>
  );
}

export default StatusVariantsExample;`,
  },

  minimal: {
    react: `import { Banner } from '@shopify/polaris';
import React from 'react';

function MinimalBannersExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Banner status="success">
        Changes saved successfully
      </Banner>

      <Banner status="info">
        New features available in settings
      </Banner>

      <Banner status="warning">
        Connection lost. Retrying...
      </Banner>

      <Banner status="critical">
        Failed to save changes. Please try again.
      </Banner>
    </div>
  );
}

export default MinimalBannersExample;`,

    vanilla: `<!-- Minimal banners without titles -->
<div id="minimal-banners" style="display: flex; flex-direction: column; gap: 16px;">
  <div class="polaris-banner polaris-banner--success" role="status">
    <div class="polaris-banner__content">
      <p>Changes saved successfully</p>
    </div>
  </div>

  <div class="polaris-banner polaris-banner--info" role="status">
    <div class="polaris-banner__content">
      <p>New features available in settings</p>
    </div>
  </div>

  <div class="polaris-banner polaris-banner--warning" role="alert">
    <div class="polaris-banner__content">
      <p>Connection lost. Retrying...</p>
    </div>
  </div>

  <div class="polaris-banner polaris-banner--critical" role="alert">
    <div class="polaris-banner__content">
      <p>Failed to save changes. Please try again.</p>
    </div>
  </div>
</div>`,

    extjs: `// Minimal banners without titles or actions
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0',
    bodyPadding: 12
  },
  items: [{
    xtype: 'component',
    cls: 'polaris-banner polaris-banner--success',
    html: '<p>Changes saved successfully</p>'
  }, {
    xtype: 'component',
    cls: 'polaris-banner polaris-banner--info',
    html: '<p>New features available in settings</p>'
  }, {
    xtype: 'component',
    cls: 'polaris-banner polaris-banner--warning',
    html: '<p>Connection lost. Retrying...</p>'
  }, {
    xtype: 'component',
    cls: 'polaris-banner polaris-banner--critical',
    html: '<p>Failed to save changes. Please try again.</p>'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Banner } from '@shopify/polaris';
import React from 'react';

interface MinimalBannerData {
  id: string;
  status: 'success' | 'info' | 'warning' | 'critical';
  message: string;
}

const minimalBanners: MinimalBannerData[] = [
  { id: '1', status: 'success', message: 'Changes saved successfully' },
  { id: '2', status: 'info', message: 'New features available in settings' },
  { id: '3', status: 'warning', message: 'Connection lost. Retrying...' },
  { id: '4', status: 'critical', message: 'Failed to save changes. Please try again.' }
];

function MinimalBannersExample(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {minimalBanners.map((banner) => (
        <Banner key={banner.id} status={banner.status}>
          {banner.message}
        </Banner>
      ))}
    </div>
  );
}

export default MinimalBannersExample;`,
  },

  interactive: {
    react: `import { Banner, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractiveBannerExample() {
  const [showBanner, setShowBanner] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowBanner(false);
    // Reset after delay
    setTimeout(() => {
      setShowBanner(true);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      {showBanner && (
        <Banner
          title="Action required"
          status="warning"
          action={{
            content: isProcessing ? 'Processing...' : 'Complete action',
            onAction: handleAction,
            loading: isProcessing,
            disabled: isProcessing,
          }}
          dismissible={!isProcessing}
          onDismiss={() => setShowBanner(false)}
        >
          Please complete the required action to continue using this feature.
        </Banner>
      )}

      {!showBanner && (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Button onClick={() => setShowBanner(true)}>Show banner again</Button>
        </div>
      )}
    </div>
  );
}

export default InteractiveBannerExample;`,

    vanilla: `<!-- Interactive banner with state management -->
<div id="banner-wrapper">
  <div id="interactive-banner" class="polaris-banner polaris-banner--warning" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Action required</h3>
      <p>Please complete the required action to continue using this feature.</p>
      <button class="polaris-button" id="action-button">Complete action</button>
    </div>
    <button class="polaris-banner__dismiss" id="dismiss-button" aria-label="Dismiss">×</button>
  </div>

  <div id="show-banner-section" style="display: none; padding: 16px; text-align: center;">
    <button class="polaris-button" id="show-banner-button">Show banner again</button>
  </div>
</div>

<script>
const banner = document.getElementById('interactive-banner');
const actionButton = document.getElementById('action-button');
const dismissButton = document.getElementById('dismiss-button');
const showBannerSection = document.getElementById('show-banner-section');
const showBannerButton = document.getElementById('show-banner-button');

let isProcessing = false;

actionButton.addEventListener('click', async () => {
  if (isProcessing) return;

  isProcessing = true;
  actionButton.textContent = 'Processing...';
  actionButton.disabled = true;
  dismissButton.disabled = true;

  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 2000));

  banner.style.display = 'none';
  showBannerSection.style.display = 'block';

  // Reset after delay
  setTimeout(() => {
    isProcessing = false;
    actionButton.textContent = 'Complete action';
    actionButton.disabled = false;
    dismissButton.disabled = false;
  }, 1000);
});

dismissButton.addEventListener('click', () => {
  banner.style.display = 'none';
  showBannerSection.style.display = 'block';
});

showBannerButton.addEventListener('click', () => {
  banner.style.display = '';
  showBannerSection.style.display = 'none';
});
</script>`,

    extjs: `// Interactive banner with loading state
Ext.define('InteractiveBanner', {
  extend: 'Ext.container.Container',

  layout: 'card',

  initComponent: function() {
    this.items = [{
      itemId: 'banner',
      xtype: 'panel',
      cls: 'polaris-banner polaris-banner--warning',
      bodyPadding: 16,
      layout: 'hbox',
      items: [{
        xtype: 'container',
        flex: 1,
        layout: 'vbox',
        items: [{
          xtype: 'component',
          html: '<h3>Action required</h3>'
        }, {
          xtype: 'component',
          html: '<p>Please complete the required action to continue using this feature.</p>'
        }, {
          xtype: 'button',
          itemId: 'actionButton',
          text: 'Complete action',
          margin: '8 0 0 0',
          handler: this.handleAction,
          scope: this
        }]
      }, {
        xtype: 'button',
        itemId: 'dismissButton',
        text: '×',
        handler: this.handleDismiss,
        scope: this
      }]
    }, {
      itemId: 'placeholder',
      xtype: 'container',
      padding: 16,
      layout: {
        type: 'vbox',
        align: 'center'
      },
      items: [{
        xtype: 'button',
        text: 'Show banner again',
        handler: function() {
          this.up().up().getLayout().setActiveItem(0);
        }
      }]
    }];

    this.callParent(arguments);
  },

  handleAction: function() {
    var actionBtn = this.down('#actionButton');
    var dismissBtn = this.down('#dismissButton');

    actionBtn.setText('Processing...');
    actionBtn.setDisabled(true);
    dismissBtn.setDisabled(true);

    Ext.defer(function() {
      this.getLayout().setActiveItem(1);

      Ext.defer(function() {
        actionBtn.setText('Complete action');
        actionBtn.setDisabled(false);
        dismissBtn.setDisabled(false);
      }, 1000, this);
    }, 2000, this);
  },

  handleDismiss: function() {
    this.getLayout().setActiveItem(1);
  }
});

Ext.create('InteractiveBanner', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Banner, Button } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface InteractiveBannerState {
  showBanner: boolean;
  isProcessing: boolean;
}

function InteractiveBannerExample(): JSX.Element {
  const [state, setState] = useState<InteractiveBannerState>({
    showBanner: true,
    isProcessing: false
  });

  const handleAction = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isProcessing: true }));

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setState({ showBanner: false, isProcessing: false });

    // Reset after delay
    setTimeout(() => {
      setState({ showBanner: true, isProcessing: false });
    }, 1000);
  }, []);

  const handleDismiss = useCallback((): void => {
    setState(prev => ({ ...prev, showBanner: false }));
  }, []);

  const handleShowBanner = useCallback((): void => {
    setState({ showBanner: true, isProcessing: false });
  }, []);

  return (
    <div style={{ maxWidth: '600px' }}>
      {state.showBanner && (
        <Banner
          title="Action required"
          status="warning"
          action={{
            content: state.isProcessing ? 'Processing...' : 'Complete action',
            onAction: handleAction,
            loading: state.isProcessing,
            disabled: state.isProcessing,
          }}
          dismissible={!state.isProcessing}
          onDismiss={handleDismiss}
        >
          Please complete the required action to continue using this feature.
        </Banner>
      )}

      {!state.showBanner && (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Button onClick={handleShowBanner}>Show banner again</Button>
        </div>
      )}
    </div>
  );
}

export default InteractiveBannerExample;`,
  },

  'real-world': {
    react: `import { Banner } from '@shopify/polaris';
import React from 'react';

function RealWorldScenariosExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Banner
        title="Order processing"
        status="info"
        action={{
          content: 'Track order',
          onAction: () => console.log('Track order'),
        }}
      >
        Your order #1001 is being processed. You will receive a notification when it ships.
      </Banner>

      <Banner
        title="Inventory alert"
        status="warning"
        action={{
          content: 'View inventory',
          onAction: () => console.log('View inventory'),
        }}
        secondaryAction={{
          content: 'Set restock alert',
          onAction: () => console.log('Set alert'),
        }}
      >
        5 items are running low on stock. Consider restocking soon to avoid fulfillment delays.
      </Banner>

      <Banner
        title="Integration successful"
        status="success"
        dismissible
      >
        Your Shopify store has been successfully connected. Product sync will begin automatically.
      </Banner>

      <Banner
        title="API rate limit exceeded"
        status="critical"
        action={{
          content: 'Upgrade plan',
          onAction: () => console.log('Upgrade plan'),
        }}
        secondaryAction={{
          content: 'View usage',
          onAction: () => console.log('View usage'),
        }}
      >
        You've exceeded your API quota. Upgrade your plan or wait for the limit to reset.
      </Banner>
    </div>
  );
}

export default RealWorldScenariosExample;`,

    vanilla: `<!-- Real-world scenario banners -->
<div id="real-world-banners" style="display: flex; flex-direction: column; gap: 16px;">
  <!-- Order Processing -->
  <div class="polaris-banner polaris-banner--info" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Order processing</h3>
      <p>Your order #1001 is being processed. You will receive a notification when it ships.</p>
      <button class="polaris-button" onclick="console.log('Track order')">Track order</button>
    </div>
  </div>

  <!-- Inventory Alert -->
  <div class="polaris-banner polaris-banner--warning" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Inventory alert</h3>
      <p>5 items are running low on stock. Consider restocking soon to avoid fulfillment delays.</p>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button class="polaris-button" onclick="console.log('View inventory')">View inventory</button>
        <button class="polaris-button polaris-button--plain" onclick="console.log('Set alert')">Set restock alert</button>
      </div>
    </div>
  </div>

  <!-- Integration Success -->
  <div class="polaris-banner polaris-banner--success" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">Integration successful</h3>
      <p>Your Shopify store has been successfully connected. Product sync will begin automatically.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss" onclick="this.parentElement.remove()">×</button>
  </div>

  <!-- API Rate Limit -->
  <div class="polaris-banner polaris-banner--critical" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">API rate limit exceeded</h3>
      <p>You've exceeded your API quota. Upgrade your plan or wait for the limit to reset.</p>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button class="polaris-button" onclick="console.log('Upgrade plan')">Upgrade plan</button>
        <button class="polaris-button polaris-button--plain" onclick="console.log('View usage')">View usage</button>
      </div>
    </div>
  </div>
</div>`,

    extjs: `// Real-world scenario banners
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--info',
    bodyPadding: 16,
    layout: 'vbox',
    items: [{
      html: '<h3>Order processing</h3><p>Your order #1001 is being processed. You will receive a notification when it ships.</p>'
    }, {
      xtype: 'button',
      text: 'Track order',
      margin: '8 0 0 0',
      handler: function() { console.log('Track order'); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--warning',
    bodyPadding: 16,
    layout: 'vbox',
    items: [{
      html: '<h3>Inventory alert</h3><p>5 items are running low on stock. Consider restocking soon to avoid fulfillment delays.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      margin: '8 0 0 0',
      items: [{
        xtype: 'button',
        text: 'View inventory',
        handler: function() { console.log('View inventory'); }
      }, {
        xtype: 'button',
        text: 'Set restock alert',
        margin: '0 0 0 8',
        handler: function() { console.log('Set alert'); }
      }]
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--success',
    bodyPadding: 16,
    layout: 'hbox',
    items: [{
      flex: 1,
      html: '<h3>Integration successful</h3><p>Your Shopify store has been successfully connected. Product sync will begin automatically.</p>'
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--critical',
    bodyPadding: 16,
    layout: 'vbox',
    items: [{
      html: '<h3>API rate limit exceeded</h3><p>You\\'ve exceeded your API quota. Upgrade your plan or wait for the limit to reset.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      margin: '8 0 0 0',
      items: [{
        xtype: 'button',
        text: 'Upgrade plan',
        handler: function() { console.log('Upgrade plan'); }
      }, {
        xtype: 'button',
        text: 'View usage',
        margin: '0 0 0 8',
        handler: function() { console.log('View usage'); }
      }]
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Banner } from '@shopify/polaris';
import React from 'react';

interface RealWorldBanner {
  id: string;
  title: string;
  status: 'success' | 'info' | 'warning' | 'critical';
  message: string;
  action?: {
    content: string;
    onAction: () => void;
  };
  secondaryAction?: {
    content: string;
    onAction: () => void;
  };
  dismissible?: boolean;
}

const realWorldBanners: RealWorldBanner[] = [
  {
    id: 'order-processing',
    title: 'Order processing',
    status: 'info',
    message: 'Your order #1001 is being processed. You will receive a notification when it ships.',
    action: {
      content: 'Track order',
      onAction: () => console.log('Track order')
    }
  },
  {
    id: 'inventory-alert',
    title: 'Inventory alert',
    status: 'warning',
    message: '5 items are running low on stock. Consider restocking soon to avoid fulfillment delays.',
    action: {
      content: 'View inventory',
      onAction: () => console.log('View inventory')
    },
    secondaryAction: {
      content: 'Set restock alert',
      onAction: () => console.log('Set alert')
    }
  },
  {
    id: 'integration-success',
    title: 'Integration successful',
    status: 'success',
    message: 'Your Shopify store has been successfully connected. Product sync will begin automatically.',
    dismissible: true
  },
  {
    id: 'api-limit',
    title: 'API rate limit exceeded',
    status: 'critical',
    message: "You've exceeded your API quota. Upgrade your plan or wait for the limit to reset.",
    action: {
      content: 'Upgrade plan',
      onAction: () => console.log('Upgrade plan')
    },
    secondaryAction: {
      content: 'View usage',
      onAction: () => console.log('View usage')
    }
  }
];

function RealWorldScenariosExample(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {realWorldBanners.map((banner) => (
        <Banner
          key={banner.id}
          title={banner.title}
          status={banner.status}
          action={banner.action}
          secondaryAction={banner.secondaryAction}
          dismissible={banner.dismissible}
        >
          {banner.message}
        </Banner>
      ))}
    </div>
  );
}

export default RealWorldScenariosExample;`,
  },

  'with-icons': {
    react: `import { Banner } from '@shopify/polaris';
import React from 'react';

function BannersWithIconsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Banner
        title="🚀 Performance improved"
        status="success"
        dismissible
      >
        Your store is now loading 40% faster after recent optimizations.
      </Banner>

      <Banner
        title="🔒 Security update"
        status="info"
        action={{
          content: 'Review changes',
          onAction: () => console.log('Review security'),
        }}
      >
        New security features have been added to protect your account.
      </Banner>

      <Banner
        title="⚠️ Storage almost full"
        status="warning"
        action={{
          content: 'Manage storage',
          onAction: () => console.log('Manage storage'),
        }}
      >
        You're using 90% of your storage capacity. Consider upgrading or removing unused files.
      </Banner>
    </div>
  );
}

export default BannersWithIconsExample;`,

    vanilla: `<!-- Banners with emoji icons in titles -->
<div id="icon-banners" style="display: flex; flex-direction: column; gap: 16px;">
  <!-- Performance Banner -->
  <div class="polaris-banner polaris-banner--success" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">🚀 Performance improved</h3>
      <p>Your store is now loading 40% faster after recent optimizations.</p>
    </div>
    <button class="polaris-banner__dismiss" aria-label="Dismiss" onclick="this.parentElement.remove()">×</button>
  </div>

  <!-- Security Update Banner -->
  <div class="polaris-banner polaris-banner--info" role="status">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">🔒 Security update</h3>
      <p>New security features have been added to protect your account.</p>
      <button class="polaris-button" onclick="console.log('Review security')">Review changes</button>
    </div>
  </div>

  <!-- Storage Warning Banner -->
  <div class="polaris-banner polaris-banner--warning" role="alert">
    <div class="polaris-banner__content">
      <h3 class="polaris-banner__title">⚠️ Storage almost full</h3>
      <p>You're using 90% of your storage capacity. Consider upgrading or removing unused files.</p>
      <button class="polaris-button" onclick="console.log('Manage storage')">Manage storage</button>
    </div>
  </div>
</div>`,

    extjs: `// Banners with emoji icons
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0',
    bodyPadding: 16
  },
  items: [{
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--success',
    layout: 'hbox',
    items: [{
      xtype: 'container',
      flex: 1,
      layout: 'vbox',
      items: [{
        html: '<h3>🚀 Performance improved</h3>'
      }, {
        html: '<p>Your store is now loading 40% faster after recent optimizations.</p>'
      }]
    }, {
      xtype: 'button',
      text: '×',
      handler: function() { this.up('panel').destroy(); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--info',
    layout: 'vbox',
    items: [{
      html: '<h3>🔒 Security update</h3>'
    }, {
      html: '<p>New security features have been added to protect your account.</p>'
    }, {
      xtype: 'button',
      text: 'Review changes',
      margin: '8 0 0 0',
      handler: function() { console.log('Review security'); }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-banner polaris-banner--warning',
    layout: 'vbox',
    items: [{
      html: '<h3>⚠️ Storage almost full</h3>'
    }, {
      html: '<p>You\\'re using 90% of your storage capacity. Consider upgrading or removing unused files.</p>'
    }, {
      xtype: 'button',
      text: 'Manage storage',
      margin: '8 0 0 0',
      handler: function() { console.log('Manage storage'); }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Banner } from '@shopify/polaris';
import React from 'react';

interface IconBanner {
  id: string;
  icon: string;
  title: string;
  status: 'success' | 'info' | 'warning' | 'critical';
  message: string;
  action?: {
    content: string;
    onAction: () => void;
  };
  dismissible?: boolean;
}

const iconBanners: IconBanner[] = [
  {
    id: 'performance',
    icon: '🚀',
    title: 'Performance improved',
    status: 'success',
    message: 'Your store is now loading 40% faster after recent optimizations.',
    dismissible: true
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Security update',
    status: 'info',
    message: 'New security features have been added to protect your account.',
    action: {
      content: 'Review changes',
      onAction: () => console.log('Review security')
    }
  },
  {
    id: 'storage',
    icon: '⚠️',
    title: 'Storage almost full',
    status: 'warning',
    message: "You're using 90% of your storage capacity. Consider upgrading or removing unused files.",
    action: {
      content: 'Manage storage',
      onAction: () => console.log('Manage storage')
    }
  }
];

function BannersWithIconsExample(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {iconBanners.map((banner) => (
        <Banner
          key={banner.id}
          title={\`\\\${banner.icon} \\\${banner.title}\`}
          status={banner.status}
          action={banner.action}
          dismissible={banner.dismissible}
        >
          {banner.message}
        </Banner>
      ))}
    </div>
  );
}

export default BannersWithIconsExample;`,
  }
};

export const calloutcardExamples: Record<string, CodeVariant> = {
  layout: {
    react: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

function CalloutCardExample() {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg"
      primaryAction={{
        content: 'Start selling',
        onAction: () => console.log('Start selling clicked'),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: '#',
      }}
    >
      Create a online store and start selling to customers right away.
      Shopify provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default CalloutCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__illustration">
    <img src="https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg"
         alt="Illustration" />
  </div>
  <div class="polaris-callout-card__content">
    <h2 class="polaris-callout-card__title">Get more sales with Shopify</h2>
    <p class="polaris-callout-card__description">
      Create a online store and start selling to customers right away.
      Shopify provides everything you need to start, run, and grow your business.
    </p>
    <div class="polaris-callout-card__actions">
      <button class="polaris-button polaris-button--primary">Start selling</button>
      <a href="#" class="polaris-link">Learn more</a>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-callout-card__actions .polaris-button', 'click', (event) => {
  event.preventDefault();
  console.log('Start selling clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-callout-card',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  bodyPadding: 20,
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg',
    width: 200,
    height: 200
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    padding: '0 0 0 20',
    items: [{
      xtype: 'component',
      html: '<h2>Get more sales with Shopify</h2>'
    }, {
      xtype: 'component',
      html: '<p>Create a online store and start selling to customers right away. Shopify provides everything you need to start, run, and grow your business.</p>',
      flex: 1
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Start selling',
        ui: 'primary',
        handler: function() {
          console.log('Start selling clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'link',
        margin: '0 0 0 12',
        handler: function() {
          window.location.href = '#';
        }
      }]
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

interface CalloutCardExampleProps {
  title: string;
  description: string;
  illustration?: string;
  primaryActionText: string;
  secondaryActionText?: string;
  onPrimaryAction: () => void;
  secondaryActionUrl?: string;
}

function CalloutCardExample({
  title,
  description,
  illustration,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  secondaryActionUrl
}: CalloutCardExampleProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={{
        content: primaryActionText,
        onAction: onPrimaryAction,
      }}
      secondaryAction={
        secondaryActionText && secondaryActionUrl
          ? {
              content: secondaryActionText,
              url: secondaryActionUrl,
            }
          : undefined
      }
    >
      {description}
    </CalloutCard>
  );
}

export default CalloutCardExample;`,
  },

  default: {
    react: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

function DefaultCalloutCard() {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      primaryAction={{
        content: 'Start selling',
        onAction: () => console.log('Start selling clicked'),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: '#',
      }}
    >
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default DefaultCalloutCard;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__content">
    <h2 class="polaris-callout-card__title">Get more sales with Shopify</h2>
    <p class="polaris-callout-card__description">
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </p>
    <div class="polaris-callout-card__actions">
      <button class="polaris-button polaris-button--primary">Start selling</button>
      <a href="#" class="polaris-link">Learn more</a>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Start selling clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-callout-card',
  bodyPadding: 20,
  layout: 'vbox',
  items: [{
    xtype: 'component',
    html: '<h2>Get more sales with Shopify</h2>'
  }, {
    xtype: 'component',
    html: '<p>Create a online store and start selling to customers right away. Shopify provides everything you need to start, run, and grow your business.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'button',
      text: 'Start selling',
      ui: 'primary',
      handler: function() {
        console.log('Start selling clicked');
      }
    }, {
      xtype: 'button',
      text: 'Learn more',
      ui: 'link',
      margin: '0 0 0 12',
      handler: function() {
        window.location.href = '#';
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

interface DefaultCalloutCardProps {
  onStartSelling?: () => void;
  learnMoreUrl?: string;
}

function DefaultCalloutCard({
  onStartSelling,
  learnMoreUrl = '#'
}: DefaultCalloutCardProps): JSX.Element {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      primaryAction={{
        content: 'Start selling',
        onAction: onStartSelling || (() => console.log('Start selling clicked')),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: learnMoreUrl,
      }}
    >
      Create a online store and start selling to customers right away. Shopify
      provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default DefaultCalloutCard;`
  }
};

// EmptyState Component Examples

export const emptystateExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <EmptyState
      heading="No products found"
      action={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    />
  );
}

export default EmptyStateExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No products found" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No products found</h2>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Add product</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Add product clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No products found</h2>'
  }, {
    xtype: 'button',
    text: 'Add product',
    ui: 'primary',
    handler: function() {
      console.log('Add product clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateProps {
  heading: string;
  image?: string;
  onAction: () => void;
}

function EmptyStateExample({ heading, image, onAction }: EmptyStateProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Add product',
        onAction: onAction,
      }}
    />
  );
}

export default EmptyStateExample;`,
  },

  withDescription: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateWithDescription() {
  return (
    <EmptyState
      heading="Manage your inventory"
      action={{
        content: 'Add products',
        onAction: () => console.log('Add products clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      Add products to your store to start selling and tracking inventory.
    </EmptyState>
  );
}

export default EmptyStateWithDescription;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Manage your inventory" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Manage your inventory</h2>
    <p class="polaris-empty-state__description">
      Add products to your store to start selling and tracking inventory.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Add products</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Add products clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Manage your inventory</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Add products to your store to start selling and tracking inventory.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Add products',
    ui: 'primary',
    handler: function() {
      console.log('Add products clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateWithDescriptionProps {
  heading: string;
  description: string;
  image?: string;
  actionText: string;
  onAction: () => void;
}

function EmptyStateWithDescription({
  heading,
  description,
  image,
  actionText,
  onAction
}: EmptyStateWithDescriptionProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: actionText,
        onAction: onAction,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateWithDescription;`
  },

  withSecondaryAction: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateWithSecondaryAction() {
  return (
    <EmptyState
      heading="No orders yet"
      action={{
        content: 'Create order',
        onAction: () => console.log('Create order clicked'),
      }}
      secondaryAction={{
        content: 'Import orders',
        onAction: () => console.log('Import orders clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      Once you start making sales, you'll see your order history here.
    </EmptyState>
  );
}

export default EmptyStateWithSecondaryAction;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No orders yet" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No orders yet</h2>
    <p class="polaris-empty-state__description">
      Once you start making sales, you'll see your order history here.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Create order</button>
      <button class="polaris-button">Import orders</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Create order clicked');
});

on('.polaris-button:not(.polaris-button--primary)', 'click', () => {
  console.log('Import orders clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No orders yet</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Once you start making sales, you\\'ll see your order history here.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'center'
    },
    items: [{
      xtype: 'button',
      text: 'Create order',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Create order clicked');
      }
    }, {
      xtype: 'button',
      text: 'Import orders',
      handler: function() {
        console.log('Import orders clicked');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateWithSecondaryActionProps {
  heading: string;
  description?: string;
  image?: string;
  primaryAction: {
    content: string;
    onAction: () => void;
  };
  secondaryAction: {
    content: string;
    onAction: () => void;
  };
}

function EmptyStateWithSecondaryAction({
  heading,
  description,
  image,
  primaryAction,
  secondaryAction
}: EmptyStateWithSecondaryActionProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={primaryAction}
      secondaryAction={secondaryAction}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateWithSecondaryAction;`
  },

  noAction: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateNoAction() {
  return (
    <EmptyState
      heading="All caught up!"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      There are no tasks that need your attention right now.
    </EmptyState>
  );
}

export default EmptyStateNoAction;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="All caught up!" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">All caught up!</h2>
    <p class="polaris-empty-state__description">
      There are no tasks that need your attention right now.
    </p>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
// No action button needed for this state
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">All caught up!</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">There are no tasks that need your attention right now.</p>'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateNoActionProps {
  heading: string;
  description?: string;
  image?: string;
}

function EmptyStateNoAction({
  heading,
  description,
  image
}: EmptyStateNoActionProps): JSX.Element {
  return (
    <EmptyState heading={heading} image={image}>
      {description}
    </EmptyState>
  );
}

export default EmptyStateNoAction;`
  },

  fullWidth: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateFullWidth() {
  return (
    <EmptyState
      heading="No data available"
      action={{
        content: 'Configure settings',
        onAction: () => console.log('Configure clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      fullWidth
    >
      Set up your preferences to start seeing data here.
    </EmptyState>
  );
}

export default EmptyStateFullWidth;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--full-width">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No data available" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No data available</h2>
    <p class="polaris-empty-state__description">
      Set up your preferences to start seeing data here.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Configure settings</button>
    </div>
  </div>
</div>

<style>
.polaris-empty-state--full-width {
  width: 100%;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Configure clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  width: '100%',
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No data available</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Set up your preferences to start seeing data here.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Configure settings',
    ui: 'primary',
    handler: function() {
      console.log('Configure clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateFullWidthProps {
  heading: string;
  description?: string;
  image?: string;
  actionText: string;
  onAction: () => void;
}

function EmptyStateFullWidth({
  heading,
  description,
  image,
  actionText,
  onAction
}: EmptyStateFullWidthProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: actionText,
        onAction: onAction,
      }}
      fullWidth
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateFullWidth;`
  },

  searchResults: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateSearchResults() {
  return (
    <EmptyState
      heading="No results found"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Clear search',
        onAction: () => console.log('Clear search clicked'),
      }}
    >
      Try checking your spelling or using more general terms
    </EmptyState>
  );
}

export default EmptyStateSearchResults;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="No results found" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No results found</h2>
    <p class="polaris-empty-state__description">
      Try checking your spelling or using more general terms
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Clear search</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Clear search clicked');
  // Clear search input and refresh results
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No results found</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Try checking your spelling or using more general terms</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Clear search',
    ui: 'primary',
    handler: function() {
      console.log('Clear search clicked');
      // Clear search field and refresh
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateSearchResultsProps {
  heading: string;
  description?: string;
  image?: string;
  onClearSearch: () => void;
}

function EmptyStateSearchResults({
  heading,
  description,
  image,
  onClearSearch
}: EmptyStateSearchResultsProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Clear search',
        onAction: onClearSearch,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateSearchResults;`
  },

  errorState: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateError() {
  return (
    <EmptyState
      heading="Something went wrong"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Try again',
        onAction: () => console.log('Try again clicked'),
      }}
      secondaryAction={{
        content: 'Contact support',
        onAction: () => console.log('Contact support clicked'),
      }}
    >
      There was an error loading your data. Please try again.
    </EmptyState>
  );
}

export default EmptyStateError;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--error">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Something went wrong" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Something went wrong</h2>
    <p class="polaris-empty-state__description">
      There was an error loading your data. Please try again.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Try again</button>
      <button class="polaris-button">Contact support</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Try again clicked');
  // Reload data
});

on('.polaris-button:not(.polaris-button--primary)', 'click', () => {
  console.log('Contact support clicked');
  // Open support dialog
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state polaris-empty-state--error',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Something went wrong</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">There was an error loading your data. Please try again.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'center'
    },
    items: [{
      xtype: 'button',
      text: 'Try again',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Try again clicked');
      }
    }, {
      xtype: 'button',
      text: 'Contact support',
      handler: function() {
        console.log('Contact support clicked');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateErrorProps {
  heading: string;
  description?: string;
  image?: string;
  onRetry: () => void;
  onContactSupport: () => void;
}

function EmptyStateError({
  heading,
  description,
  image,
  onRetry,
  onContactSupport
}: EmptyStateErrorProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Try again',
        onAction: onRetry,
      }}
      secondaryAction={{
        content: 'Contact support',
        onAction: onContactSupport,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateError;`
  },

  maintenanceMode: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateMaintenance() {
  return (
    <EmptyState
      heading="Under maintenance"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: 'Get notified',
        onAction: () => console.log('Get notified clicked'),
      }}
    >
      This section is temporarily unavailable while we make improvements. Check back soon.
    </EmptyState>
  );
}

export default EmptyStateMaintenance;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state polaris-empty-state--maintenance">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Under maintenance" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">Under maintenance</h2>
    <p class="polaris-empty-state__description">
      This section is temporarily unavailable while we make improvements. Check back soon.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Get notified</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('Get notified clicked');
  // Subscribe to notifications
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state polaris-empty-state--maintenance',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">Under maintenance</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">This section is temporarily unavailable while we make improvements. Check back soon.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Get notified',
    ui: 'primary',
    handler: function() {
      console.log('Get notified clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateMaintenanceProps {
  heading: string;
  description?: string;
  image?: string;
  onGetNotified: () => void;
}

function EmptyStateMaintenance({
  heading,
  description,
  image,
  onGetNotified
}: EmptyStateMaintenanceProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: 'Get notified',
        onAction: onGetNotified,
      }}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateMaintenance;`
  }
};

// Loading Component Examples

export const loadingExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Loading } from '@shopify/polaris';
import React from 'react';

function LoadingExample() {
  return (
    <Loading
      size="medium"
      accessibilityLabel="Loading content"
    />
  );
}

export default LoadingExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner polaris-spinner--size-medium" role="status" aria-label="Loading content">
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="10"
      cy="10"
      r="7.5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="47 47"
      class="polaris-spinner__circle"
    />
  </svg>
</div>

<style>
.polaris-spinner {
  display: inline-block;
  animation: polaris-spinner-rotation 1s linear infinite;
}

.polaris-spinner--size-small svg {
  width: 20px;
  height: 20px;
}

.polaris-spinner--size-medium svg {
  width: 40px;
  height: 40px;
}

.polaris-spinner--size-large svg {
  width: 60px;
  height: 60px;
}

@keyframes polaris-spinner-rotation {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createSpinner } from '@cin7/vanilla-js';

const spinner = createSpinner({
  size: 'medium',
  accessibilityLabel: 'Loading content'
});

document.getElementById('app').appendChild(spinner);
</script>`,

    extjs: `// ExtJS Loading Mask using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Loading Example',
  width: 400,
  height: 300,
  bodyPadding: 20,
  html: '<p>Content will load here...</p>',
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: function(panel) {
      // Show loading mask
      panel.setLoading({
        msg: 'Loading content...',
        useMsg: true
      });

      // Simulate async operation
      setTimeout(function() {
        panel.setLoading(false);
        panel.update('<p>Content loaded successfully!</p>');
      }, 2000);
    }
  }
});

// Or standalone spinner
Ext.create('Ext.Component', {
  cls: 'polaris-loading-spinner',
  html: '<div class="spinner-medium" role="status" aria-label="Loading"></div>',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Loading } from '@shopify/polaris';
import React from 'react';

type LoadingSize = 'small' | 'medium' | 'large';

interface LoadingExampleProps {
  size?: LoadingSize;
  accessibilityLabel?: string;
  hasFocusableElements?: boolean;
}

function LoadingExample({
  size = 'medium',
  accessibilityLabel = 'Loading',
  hasFocusableElements = false
}: LoadingExampleProps): JSX.Element {
  return (
    <Loading
      size={size}
      accessibilityLabel={accessibilityLabel}
      hasFocusableElements={hasFocusableElements}
    />
  );
}

export default LoadingExample;`,
  },

  sizeVariants: {
    react: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function SizeVariantsExample() {
  return (
    <Card>
      <BlockStack gap="400">
        <div style={{ textAlign: 'center' }}>
          <Text variant="headingSm" as="h3">Small</Text>
          <Loading size="small" accessibilityLabel="Small spinner" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Text variant="headingSm" as="h3">Medium</Text>
          <Loading size="medium" accessibilityLabel="Medium spinner" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Text variant="headingSm" as="h3">Large</Text>
          <Loading size="large" accessibilityLabel="Large spinner" />
        </div>
      </BlockStack>
    </Card>
  );
}

export default SizeVariantsExample;`,

    vanilla: `<!-- HTML Structure for Size Variants -->
<div class="loading-sizes-container">
  <div class="size-demo">
    <h3>Small</h3>
    <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Small spinner">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
  </div>

  <div class="size-demo">
    <h3>Medium</h3>
    <div class="polaris-spinner polaris-spinner--size-medium" role="status" aria-label="Medium spinner">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
  </div>

  <div class="size-demo">
    <h3>Large</h3>
    <div class="polaris-spinner polaris-spinner--size-large" role="status" aria-label="Large spinner">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
  </div>
</div>

<style>
.loading-sizes-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.size-demo {
  text-align: center;
}

.polaris-spinner--size-small svg { width: 20px; height: 20px; }
.polaris-spinner--size-medium svg { width: 40px; height: 40px; }
.polaris-spinner--size-large svg { width: 60px; height: 60px; }
</style>

<script>
import { createSpinner } from '@cin7/vanilla-js';

const sizes = ['small', 'medium', 'large'];
const container = document.getElementById('app');

sizes.forEach(size => {
  const wrapper = document.createElement('div');
  wrapper.className = 'size-demo';
  wrapper.innerHTML = \`<h3>\${size.charAt(0).toUpperCase() + size.slice(1)}</h3>\`;

  const spinner = createSpinner({
    size: size,
    accessibilityLabel: \`\${size} spinner\`
  });

  wrapper.appendChild(spinner);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Loading Sizes Example
Ext.create('Ext.panel.Panel', {
  title: 'Loading Size Variants',
  width: 400,
  height: 400,
  layout: {
    type: 'vbox',
    align: 'center',
    pack: 'center'
  },
  bodyPadding: 20,
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      html: '<h3>Small</h3>',
      margin: '0 0 10 0'
    },
    {
      xtype: 'component',
      cls: 'polaris-spinner polaris-spinner--size-small',
      html: '<div class="spinner-animation" role="status"></div>',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      html: '<h3>Medium</h3>',
      margin: '0 0 10 0'
    },
    {
      xtype: 'component',
      cls: 'polaris-spinner polaris-spinner--size-medium',
      html: '<div class="spinner-animation" role="status"></div>',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      html: '<h3>Large</h3>',
      margin: '0 0 10 0'
    },
    {
      xtype: 'component',
      cls: 'polaris-spinner polaris-spinner--size-large',
      html: '<div class="spinner-animation" role="status"></div>'
    }
  ]
});`,

    typescript: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

type LoadingSize = 'small' | 'medium' | 'large';

interface SizeVariantProps {
  size: LoadingSize;
  label: string;
}

const SizeVariant: React.FC<SizeVariantProps> = ({ size, label }) => (
  <div style={{ textAlign: 'center' }}>
    <Text variant="headingSm" as="h3">{label}</Text>
    <Loading size={size} accessibilityLabel={\`\${label} spinner\`} />
  </div>
);

function SizeVariantsExample(): JSX.Element {
  const sizes: Array<{ size: LoadingSize; label: string }> = [
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' }
  ];

  return (
    <Card>
      <BlockStack gap="400">
        {sizes.map(({ size, label }) => (
          <SizeVariant key={size} size={size} label={label} />
        ))}
      </BlockStack>
    </Card>
  );
}

export default SizeVariantsExample;`,
  },

  withBackgrounds: {
    react: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function WithBackgroundsExample() {
  const backgrounds = [
    { color: 'white', label: 'White', border: '1px solid #e1e3e5', textColor: 'black' },
    { color: '#f8f9fa', label: 'Light Gray', textColor: 'black' },
    { color: '#1a1a1a', label: 'Dark', textColor: 'white' },
    { color: '#5c6ac4', label: 'Primary', textColor: 'white' }
  ];

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Loading with Different Backgrounds</Text>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {backgrounds.map(({ color, label, border, textColor }) => (
            <div
              key={label}
              style={{
                padding: '20px',
                backgroundColor: color,
                border: border || 'none',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}
            >
              <Text variant="bodySm" style={{ color: textColor }}>{label}</Text>
              <div style={{ marginTop: '8px' }}>
                <Loading size="small" accessibilityLabel={\`Loading on \${label.toLowerCase()}\`} />
              </div>
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export default WithBackgroundsExample;`,

    vanilla: `<!-- HTML Structure for Background Variants -->
<div class="backgrounds-container">
  <h2>Loading with Different Backgrounds</h2>

  <div class="backgrounds-grid">
    <div class="bg-demo bg-white">
      <p>White</p>
      <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading on white">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
    </div>

    <div class="bg-demo bg-light-gray">
      <p>Light Gray</p>
      <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading on light gray">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
    </div>

    <div class="bg-demo bg-dark">
      <p class="text-white">Dark</p>
      <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading on dark">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="white" stroke-width="2" />
        </svg>
      </div>
    </div>

    <div class="bg-demo bg-primary">
      <p class="text-white">Primary</p>
      <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading on primary">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="white" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>
</div>

<style>
.backgrounds-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.bg-demo {
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  min-width: 120px;
}

.bg-white { background-color: white; border: 1px solid #e1e3e5; }
.bg-light-gray { background-color: #f8f9fa; }
.bg-dark { background-color: #1a1a1a; }
.bg-primary { background-color: #5c6ac4; }
.text-white { color: white; }
</style>`,

    extjs: `// ExtJS Loading on Different Backgrounds
Ext.create('Ext.panel.Panel', {
  title: 'Loading with Different Backgrounds',
  width: 600,
  height: 300,
  layout: {
    type: 'hbox',
    align: 'stretch',
    pack: 'center'
  },
  bodyPadding: 20,
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      flex: 1,
      style: 'background-color: white; border: 1px solid #e1e3e5; text-align: center;',
      padding: 20,
      margin: '0 10 0 0',
      html: '<p>White</p><div class="polaris-spinner polaris-spinner--size-small"></div>'
    },
    {
      xtype: 'container',
      flex: 1,
      style: 'background-color: #f8f9fa; text-align: center;',
      padding: 20,
      margin: '0 10 0 0',
      html: '<p>Light Gray</p><div class="polaris-spinner polaris-spinner--size-small"></div>'
    },
    {
      xtype: 'container',
      flex: 1,
      style: 'background-color: #1a1a1a; color: white; text-align: center;',
      padding: 20,
      margin: '0 10 0 0',
      html: '<p>Dark</p><div class="polaris-spinner polaris-spinner--size-small" style="color: white;"></div>'
    },
    {
      xtype: 'container',
      flex: 1,
      style: 'background-color: #5c6ac4; color: white; text-align: center;',
      padding: 20,
      html: '<p>Primary</p><div class="polaris-spinner polaris-spinner--size-small" style="color: white;"></div>'
    }
  ]
});`,

    typescript: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

interface BackgroundVariant {
  color: string;
  label: string;
  border?: string;
  textColor: string;
}

function WithBackgroundsExample(): JSX.Element {
  const backgrounds: BackgroundVariant[] = [
    { color: 'white', label: 'White', border: '1px solid #e1e3e5', textColor: 'black' },
    { color: '#f8f9fa', label: 'Light Gray', textColor: 'black' },
    { color: '#1a1a1a', label: 'Dark', textColor: 'white' },
    { color: '#5c6ac4', label: 'Primary', textColor: 'white' }
  ];

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Loading with Different Backgrounds</Text>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {backgrounds.map(({ color, label, border, textColor }: BackgroundVariant) => (
            <div
              key={label}
              style={{
                padding: '20px',
                backgroundColor: color,
                border: border || 'none',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}
            >
              <Text variant="bodySm" style={{ color: textColor }}>{label}</Text>
              <div style={{ marginTop: '8px' }}>
                <Loading size="small" accessibilityLabel={\`Loading on \${label.toLowerCase()}\`} />
              </div>
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export default WithBackgroundsExample;`,
  },

  interactiveLoading: {
    react: `import { Loading, Button, Card, Text, BlockStack, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractiveLoadingExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSize, setLoadingSize] = useState<'small' | 'medium' | 'large'>('medium');

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Interactive Loading Demo</Text>

        <div style={{ textAlign: 'center', padding: '40px' }}>
          {isLoading ? (
            <div>
              <Loading size={loadingSize} accessibilityLabel="Processing request" />
              <div style={{ marginTop: '16px' }}>
                <Text variant="bodySm" tone="subdued">
                  Processing your request...
                </Text>
              </div>
            </div>
          ) : (
            <div>
              <Text variant="bodySm" tone="subdued">
                Click the button to see loading state
              </Text>
              <div style={{ marginTop: '16px' }}>
                <Button onClick={startLoading}>Start Loading</Button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <Text variant="bodySm">Size:</Text>
          <InlineStack gap="200">
            <Button size="small" pressed={loadingSize === 'small'} onClick={() => setLoadingSize('small')}>
              Small
            </Button>
            <Button size="small" pressed={loadingSize === 'medium'} onClick={() => setLoadingSize('medium')}>
              Medium
            </Button>
            <Button size="small" pressed={loadingSize === 'large'} onClick={() => setLoadingSize('large')}>
              Large
            </Button>
          </InlineStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default InteractiveLoadingExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="interactive-loading-container">
  <div class="card">
    <h2>Interactive Loading Demo</h2>

    <div id="loading-display" class="loading-display">
      <p class="instruction">Click the button to see loading state</p>
      <button id="start-loading-btn" class="button-primary">Start Loading</button>
    </div>

    <div class="size-controls">
      <p>Size:</p>
      <div class="button-group">
        <button class="size-btn active" data-size="small">Small</button>
        <button class="size-btn" data-size="medium">Medium</button>
        <button class="size-btn" data-size="large">Large</button>
      </div>
    </div>
  </div>
</div>

<script>
import { createSpinner, on, fadeIn, fadeOut } from '@cin7/vanilla-js';

let isLoading = false;
let currentSize = 'medium';

const displayArea = document.getElementById('loading-display');
const startBtn = document.getElementById('start-loading-btn');

on('#start-loading-btn', 'click', () => {
  if (isLoading) return;

  isLoading = true;
  displayArea.innerHTML = '';

  const spinner = createSpinner({
    size: currentSize,
    accessibilityLabel: 'Processing request'
  });

  const message = document.createElement('p');
  message.textContent = 'Processing your request...';
  message.style.marginTop = '16px';

  displayArea.appendChild(spinner);
  displayArea.appendChild(message);

  setTimeout(() => {
    isLoading = false;
    displayArea.innerHTML = \`
      <p class="instruction">Click the button to see loading state</p>
      <button id="start-loading-btn" class="button-primary">Start Loading</button>
    \`;
  }, 3000);
});

document.querySelectorAll('.size-btn').forEach(btn => {
  on(btn, 'click', (e) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentSize = e.target.dataset.size;
  });
});
</script>`,

    extjs: `// ExtJS Interactive Loading Example
Ext.define('InteractiveLoadingPanel', {
  extend: 'Ext.panel.Panel',
  title: 'Interactive Loading Demo',
  width: 500,
  height: 400,
  bodyPadding: 20,

  initComponent: function() {
    var me = this;

    me.loadingSize = 'medium';
    me.isLoading = false;

    me.items = [
      {
        xtype: 'container',
        itemId: 'displayArea',
        style: 'text-align: center; padding: 40px;',
        html: '<p>Click the button to see loading state</p>'
      },
      {
        xtype: 'button',
        itemId: 'startBtn',
        text: 'Start Loading',
        handler: me.startLoading,
        scope: me
      },
      {
        xtype: 'container',
        margin: '20 0 0 0',
        layout: 'hbox',
        items: [
          { xtype: 'label', text: 'Size: ', margin: '0 10 0 0' },
          {
            xtype: 'segmentedbutton',
            items: [
              { text: 'Small', pressed: false, handler: function() { me.setLoadingSize('small'); } },
              { text: 'Medium', pressed: true, handler: function() { me.setLoadingSize('medium'); } },
              { text: 'Large', pressed: false, handler: function() { me.setLoadingSize('large'); } }
            ]
          }
        ]
      }
    ];

    me.callParent(arguments);
  },

  startLoading: function() {
    var me = this,
        displayArea = me.down('#displayArea'),
        startBtn = me.down('#startBtn');

    if (me.isLoading) return;

    me.isLoading = true;
    startBtn.disable();

    displayArea.update('<div class="polaris-spinner polaris-spinner--size-' + me.loadingSize + '"></div><p>Processing your request...</p>');

    setTimeout(function() {
      me.isLoading = false;
      startBtn.enable();
      displayArea.update('<p>Click the button to see loading state</p>');
    }, 3000);
  },

  setLoadingSize: function(size) {
    this.loadingSize = size;
  }
});

Ext.create('InteractiveLoadingPanel', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Loading, Button, Card, Text, BlockStack, InlineStack } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type LoadingSize = 'small' | 'medium' | 'large';

interface LoadingState {
  isActive: boolean;
  size: LoadingSize;
}

function InteractiveLoadingExample(): JSX.Element {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isActive: false,
    size: 'medium'
  });

  const startLoading = useCallback(() => {
    setLoadingState(prev => ({ ...prev, isActive: true }));
    setTimeout(() => {
      setLoadingState(prev => ({ ...prev, isActive: false }));
    }, 3000);
  }, []);

  const updateSize = useCallback((size: LoadingSize) => {
    setLoadingState(prev => ({ ...prev, size }));
  }, []);

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Interactive Loading Demo</Text>

        <div style={{ textAlign: 'center', padding: '40px' }}>
          {loadingState.isActive ? (
            <div>
              <Loading size={loadingState.size} accessibilityLabel="Processing request" />
              <div style={{ marginTop: '16px' }}>
                <Text variant="bodySm" tone="subdued">
                  Processing your request...
                </Text>
              </div>
            </div>
          ) : (
            <div>
              <Text variant="bodySm" tone="subdued">
                Click the button to see loading state
              </Text>
              <div style={{ marginTop: '16px' }}>
                <Button onClick={startLoading}>Start Loading</Button>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <Text variant="bodySm">Size:</Text>
          <InlineStack gap="200">
            {(['small', 'medium', 'large'] as LoadingSize[]).map(size => (
              <Button
                key={size}
                size="small"
                pressed={loadingState.size === size}
                onClick={() => updateSize(size)}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </InlineStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default InteractiveLoadingExample;`,
  },

  inlineLoading: {
    react: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function InlineLoadingExample() {
  const loadingStates = [
    { message: 'Saving changes...', bgColor: '#f8f9fa' },
    { message: 'Uploading file...', bgColor: '#f0f9ff' },
    { message: 'Processing payment...', bgColor: '#fef3c7' },
    { message: 'Syncing data...', bgColor: '#f0fdf4' }
  ];

  return (
    <Card>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h2">Inline Loading States</Text>

        {loadingStates.map(({ message, bgColor }, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: bgColor,
              borderRadius: '4px'
            }}
          >
            <Loading size="small" accessibilityLabel={message} />
            <Text style={{ marginLeft: '12px' }}>{message}</Text>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default InlineLoadingExample;`,

    vanilla: `<!-- HTML Structure for Inline Loading -->
<div class="inline-loading-container">
  <h2>Inline Loading States</h2>

  <div class="loading-item" style="background-color: #f8f9fa;">
    <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Saving">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
    <span class="loading-text">Saving changes...</span>
  </div>

  <div class="loading-item" style="background-color: #f0f9ff;">
    <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Uploading">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
    <span class="loading-text">Uploading file...</span>
  </div>

  <div class="loading-item" style="background-color: #fef3c7;">
    <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Processing">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
    <span class="loading-text">Processing payment...</span>
  </div>

  <div class="loading-item" style="background-color: #f0fdf4;">
    <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Syncing">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>
    <span class="loading-text">Syncing data...</span>
  </div>
</div>

<style>
.inline-loading-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.loading-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
}

.loading-text {
  margin-left: 12px;
}

.polaris-spinner--size-small svg {
  width: 20px;
  height: 20px;
}
</style>

<script>
import { createSpinner } from '@cin7/vanilla-js';

const loadingStates = [
  { message: 'Saving changes...', bgColor: '#f8f9fa' },
  { message: 'Uploading file...', bgColor: '#f0f9ff' },
  { message: 'Processing payment...', bgColor: '#fef3c7' },
  { message: 'Syncing data...', bgColor: '#f0fdf4' }
];

const container = document.getElementById('app');

loadingStates.forEach(({ message, bgColor }) => {
  const item = document.createElement('div');
  item.className = 'loading-item';
  item.style.backgroundColor = bgColor;

  const spinner = createSpinner({
    size: 'small',
    accessibilityLabel: message
  });

  const text = document.createElement('span');
  text.className = 'loading-text';
  text.textContent = message;

  item.appendChild(spinner);
  item.appendChild(text);
  container.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Inline Loading States
Ext.create('Ext.panel.Panel', {
  title: 'Inline Loading States',
  width: 500,
  height: 300,
  bodyPadding: 20,
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      style: 'background-color: #f8f9fa; padding: 12px; border-radius: 4px;',
      margin: '0 0 8 0',
      html: '<div style="display: flex; align-items: center;"><div class="polaris-spinner polaris-spinner--size-small"></div><span style="margin-left: 12px;">Saving changes...</span></div>'
    },
    {
      xtype: 'container',
      style: 'background-color: #f0f9ff; padding: 12px; border-radius: 4px;',
      margin: '0 0 8 0',
      html: '<div style="display: flex; align-items: center;"><div class="polaris-spinner polaris-spinner--size-small"></div><span style="margin-left: 12px;">Uploading file...</span></div>'
    },
    {
      xtype: 'container',
      style: 'background-color: #fef3c7; padding: 12px; border-radius: 4px;',
      margin: '0 0 8 0',
      html: '<div style="display: flex; align-items: center;"><div class="polaris-spinner polaris-spinner--size-small"></div><span style="margin-left: 12px;">Processing payment...</span></div>'
    },
    {
      xtype: 'container',
      style: 'background-color: #f0fdf4; padding: 12px; border-radius: 4px;',
      html: '<div style="display: flex; align-items: center;"><div class="polaris-spinner polaris-spinner--size-small"></div><span style="margin-left: 12px;">Syncing data...</span></div>'
    }
  ]
});`,

    typescript: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

interface LoadingStateItem {
  message: string;
  bgColor: string;
}

const InlineLoadingItem: React.FC<LoadingStateItem> = ({ message, bgColor }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: bgColor,
      borderRadius: '4px'
    }}
  >
    <Loading size="small" accessibilityLabel={message} />
    <Text style={{ marginLeft: '12px' }}>{message}</Text>
  </div>
);

function InlineLoadingExample(): JSX.Element {
  const loadingStates: LoadingStateItem[] = [
    { message: 'Saving changes...', bgColor: '#f8f9fa' },
    { message: 'Uploading file...', bgColor: '#f0f9ff' },
    { message: 'Processing payment...', bgColor: '#fef3c7' },
    { message: 'Syncing data...', bgColor: '#f0fdf4' }
  ];

  return (
    <Card>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h2">Inline Loading States</Text>

        {loadingStates.map((state, index) => (
          <InlineLoadingItem key={index} {...state} />
        ))}
      </BlockStack>
    </Card>
  );
}

export default InlineLoadingExample;`,
  },

  loadingInForms: {
    react: `import { Loading, Button, Card, Text, BlockStack } from '@shopify/polaris';
import React, { useState } from 'react';

function LoadingInFormsExample() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <Card>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h2">Form with Loading State</Text>

        <div
          style={{
            padding: '16px',
            border: '1px solid #e1e3e5',
            borderRadius: '4px',
            backgroundColor: isSubmitting ? '#f8f9fa' : 'white'
          }}
        >
          <BlockStack gap="300">
            <div>
              <Text variant="bodySm" fontWeight="bold">Product Name</Text>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                Sample Product
              </div>
            </div>

            <div>
              <Text variant="bodySm" fontWeight="bold">Description</Text>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  minHeight: '80px'
                }}
              >
                Product description goes here
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              {isSubmitting ? (
                <div>
                  <Loading size="medium" accessibilityLabel="Submitting form" />
                  <div style={{ marginTop: '12px' }}>
                    <Text variant="bodySm" tone="subdued">
                      Submitting form...
                    </Text>
                  </div>
                </div>
              ) : (
                <Button onClick={handleSubmit} variant="primary">
                  Submit Form
                </Button>
              )}
            </div>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default LoadingInFormsExample;`,

    vanilla: `<!-- HTML Structure for Form with Loading -->
<div class="form-loading-container">
  <h2>Form with Loading State</h2>

  <form id="product-form" class="form-container">
    <div class="form-field">
      <label>Product Name</label>
      <input type="text" value="Sample Product" disabled />
    </div>

    <div class="form-field">
      <label>Description</label>
      <textarea disabled>Product description goes here</textarea>
    </div>

    <div id="submit-area" class="submit-area">
      <button type="button" id="submit-btn" class="button-primary">Submit Form</button>
    </div>
  </form>
</div>

<style>
.form-container {
  padding: 16px;
  border: 1px solid #e1e3e5;
  border-radius: 4px;
  background-color: white;
}

.form-container.submitting {
  background-color: #f8f9fa;
}

.form-field {
  margin-bottom: 16px;
}

.form-field label {
  font-weight: bold;
  font-size: 14px;
}

.form-field input,
.form-field textarea {
  width: 100%;
  margin-top: 4px;
  padding: 8px 12px;
  border: 1px solid #e1e3e5;
  border-radius: 4px;
  background-color: white;
}

.submit-area {
  text-align: center;
  padding: 20px;
}
</style>

<script>
import { createSpinner, on } from '@cin7/vanilla-js';

const form = document.getElementById('product-form');
const submitArea = document.getElementById('submit-area');
const submitBtn = document.getElementById('submit-btn');

on('#submit-btn', 'click', () => {
  form.classList.add('submitting');

  submitArea.innerHTML = '';

  const spinner = createSpinner({
    size: 'medium',
    accessibilityLabel: 'Submitting form'
  });

  const message = document.createElement('p');
  message.textContent = 'Submitting form...';
  message.style.marginTop = '12px';
  message.style.color = '#6b7280';

  submitArea.appendChild(spinner);
  submitArea.appendChild(message);

  setTimeout(() => {
    form.classList.remove('submitting');
    submitArea.innerHTML = '<button type="button" id="submit-btn" class="button-primary">Submit Form</button>';
  }, 2000);
});
</script>`,

    extjs: `// ExtJS Form with Loading State
Ext.define('LoadingFormPanel', {
  extend: 'Ext.form.Panel',
  title: 'Form with Loading State',
  width: 500,
  bodyPadding: 20,

  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Product Name',
      name: 'productName',
      value: 'Sample Product',
      anchor: '100%'
    },
    {
      xtype: 'textareafield',
      fieldLabel: 'Description',
      name: 'description',
      value: 'Product description goes here',
      anchor: '100%',
      height: 80
    }
  ],

  buttons: [
    {
      text: 'Submit Form',
      formBind: true,
      handler: function(btn) {
        var form = btn.up('form');

        // Show loading mask
        form.setLoading({
          msg: 'Submitting form...',
          useMsg: true
        });

        // Simulate form submission
        setTimeout(function() {
          form.setLoading(false);
          Ext.Msg.alert('Success', 'Form submitted successfully!');
        }, 2000);
      }
    }
  ]
});

Ext.create('LoadingFormPanel', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Loading, Button, Card, Text, BlockStack } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface FormData {
  productName: string;
  description: string;
}

interface FormState {
  isSubmitting: boolean;
  data: FormData;
}

function LoadingInFormsExample(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    data: {
      productName: 'Sample Product',
      description: 'Product description goes here'
    }
  });

  const handleSubmit = useCallback(() => {
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }, 2000);
  }, []);

  return (
    <Card>
      <BlockStack gap="300">
        <Text variant="headingMd" as="h2">Form with Loading State</Text>

        <div
          style={{
            padding: '16px',
            border: '1px solid #e1e3e5',
            borderRadius: '4px',
            backgroundColor: formState.isSubmitting ? '#f8f9fa' : 'white'
          }}
        >
          <BlockStack gap="300">
            <div>
              <Text variant="bodySm" fontWeight="bold">Product Name</Text>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                {formState.data.productName}
              </div>
            </div>

            <div>
              <Text variant="bodySm" fontWeight="bold">Description</Text>
              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  minHeight: '80px'
                }}
              >
                {formState.data.description}
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              {formState.isSubmitting ? (
                <div>
                  <Loading size="medium" accessibilityLabel="Submitting form" />
                  <div style={{ marginTop: '12px' }}>
                    <Text variant="bodySm" tone="subdued">
                      Submitting form...
                    </Text>
                  </div>
                </div>
              ) : (
                <Button onClick={handleSubmit} variant="primary">
                  Submit Form
                </Button>
              )}
            </div>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
}

export default LoadingInFormsExample;`,
  },

  loadingSteps: {
    react: `import { Loading, Button, Card, Text, BlockStack } from '@shopify/polaris';
import React, { useState } from 'react';

function LoadingStepsExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    'Validating data',
    'Processing payment',
    'Updating inventory',
    'Sending confirmation',
    'Complete!'
  ];

  const startProcess = () => {
    setIsLoading(true);
    setCurrentStep(0);

    steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }, (index + 1) * 1000);
    });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Multi-Step Loading Process</Text>

        <div style={{ textAlign: 'center' }}>
          {!isLoading ? (
            <Button onClick={startProcess} variant="primary">
              Start Process
            </Button>
          ) : (
            <div style={{ padding: '20px' }}>
              <Loading size="large" accessibilityLabel="Processing order" />
              <div style={{ marginTop: '16px' }}>
                <Text variant="bodySm" tone="subdued">
                  {steps[currentStep]}
                </Text>
              </div>
            </div>
          )}
        </div>

        <div>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: index < currentStep ? '#f0fdf4' :
                                index === currentStep ? '#eff6ff' : '#f8f9fa',
                marginBottom: '4px'
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: index < currentStep ? '#16a34a' :
                                    index === currentStep ? '#2563eb' : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}
              >
                {index < currentStep ? (
                  <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                ) : (
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>
                    {index + 1}
                  </span>
                )}
              </div>
              <Text variant="bodySm">{step}</Text>
              {index === currentStep && isLoading && (
                <Loading size="small" accessibilityLabel="Current step" />
              )}
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export default LoadingStepsExample;`,

    vanilla: `<!-- HTML Structure for Multi-Step Loading -->
<div class="loading-steps-container">
  <h2>Multi-Step Loading Process</h2>

  <div id="control-area" class="control-area">
    <button id="start-process-btn" class="button-primary">Start Process</button>
  </div>

  <div id="steps-container" class="steps-list"></div>
</div>

<style>
.loading-steps-container {
  padding: 24px;
}

.control-area {
  text-align: center;
  margin: 20px 0;
}

.steps-list {
  margin-top: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.step-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 12px;
}

.step-completed { background-color: #f0fdf4; }
.step-active { background-color: #eff6ff; }
.step-pending { background-color: #f8f9fa; }

.indicator-completed { background-color: #16a34a; color: white; }
.indicator-active { background-color: #2563eb; color: white; }
.indicator-pending { background-color: #e5e7eb; color: #6b7280; }
</style>

<script>
import { createSpinner } from '@cin7/vanilla-js';

const steps = [
  'Validating data',
  'Processing payment',
  'Updating inventory',
  'Sending confirmation',
  'Complete!'
];

let currentStep = 0;
let isLoading = false;

const controlArea = document.getElementById('control-area');
const stepsContainer = document.getElementById('steps-container');

function renderSteps() {
  stepsContainer.innerHTML = '';

  steps.forEach((step, index) => {
    const item = document.createElement('div');
    item.className = 'step-item';

    if (index < currentStep) {
      item.classList.add('step-completed');
    } else if (index === currentStep) {
      item.classList.add('step-active');
    } else {
      item.classList.add('step-pending');
    }

    const indicator = document.createElement('div');
    indicator.className = 'step-indicator';

    if (index < currentStep) {
      indicator.classList.add('indicator-completed');
      indicator.textContent = '✓';
    } else if (index === currentStep) {
      indicator.classList.add('indicator-active');
      indicator.textContent = index + 1;
    } else {
      indicator.classList.add('indicator-pending');
      indicator.textContent = index + 1;
    }

    const text = document.createElement('span');
    text.textContent = step;

    item.appendChild(indicator);
    item.appendChild(text);

    if (index === currentStep && isLoading) {
      const spinner = createSpinner({
        size: 'small',
        accessibilityLabel: 'Current step'
      });
      item.appendChild(spinner);
    }

    stepsContainer.appendChild(item);
  });
}

document.getElementById('start-process-btn').addEventListener('click', () => {
  if (isLoading) return;

  isLoading = true;
  currentStep = 0;

  controlArea.innerHTML = '<div class="polaris-spinner polaris-spinner--size-large"></div><p>Processing order...</p>';

  steps.forEach((_, index) => {
    setTimeout(() => {
      currentStep = index;
      renderSteps();

      if (index === steps.length - 1) {
        setTimeout(() => {
          isLoading = false;
          controlArea.innerHTML = '<button id="start-process-btn" class="button-primary">Start Process</button>';
        }, 1000);
      }
    }, (index + 1) * 1000);
  });

  renderSteps();
});

renderSteps();
</script>`,

    extjs: `// ExtJS Multi-Step Loading Process
Ext.define('LoadingStepsPanel', {
  extend: 'Ext.panel.Panel',
  title: 'Multi-Step Loading Process',
  width: 500,
  height: 500,
  bodyPadding: 20,

  initComponent: function() {
    var me = this;

    me.steps = [
      'Validating data',
      'Processing payment',
      'Updating inventory',
      'Sending confirmation',
      'Complete!'
    ];

    me.currentStep = 0;
    me.isLoading = false;

    me.items = [
      {
        xtype: 'container',
        itemId: 'controlArea',
        style: 'text-align: center; margin: 20px 0;',
        items: [
          {
            xtype: 'button',
            text: 'Start Process',
            cls: 'button-primary',
            handler: me.startProcess,
            scope: me
          }
        ]
      },
      {
        xtype: 'container',
        itemId: 'stepsContainer',
        margin: '20 0 0 0'
      }
    ];

    me.callParent(arguments);
    me.on('afterrender', me.renderSteps, me);
  },

  startProcess: function() {
    var me = this;

    if (me.isLoading) return;

    me.isLoading = true;
    me.currentStep = 0;

    var controlArea = me.down('#controlArea');
    controlArea.removeAll();
    controlArea.add({
      xtype: 'component',
      html: '<div class="polaris-spinner polaris-spinner--size-large"></div><p>Processing order...</p>'
    });

    me.steps.forEach(function(step, index) {
      setTimeout(function() {
        me.currentStep = index;
        me.renderSteps();

        if (index === me.steps.length - 1) {
          setTimeout(function() {
            me.isLoading = false;
            controlArea.removeAll();
            controlArea.add({
              xtype: 'button',
              text: 'Start Process',
              handler: me.startProcess,
              scope: me
            });
          }, 1000);
        }
      }, (index + 1) * 1000);
    });

    me.renderSteps();
  },

  renderSteps: function() {
    var me = this,
        stepsContainer = me.down('#stepsContainer');

    stepsContainer.removeAll();

    me.steps.forEach(function(step, index) {
      var bgColor = index < me.currentStep ? '#f0fdf4' :
                    index === me.currentStep ? '#eff6ff' : '#f8f9fa';

      var indicatorColor = index < me.currentStep ? '#16a34a' :
                           index === me.currentStep ? '#2563eb' : '#e5e7eb';

      var indicatorText = index < me.currentStep ? '✓' : (index + 1);

      var html = '<div style="display: flex; align-items: center;">' +
                 '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ' + indicatorColor + '; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white; font-size: 12px;">' +
                 indicatorText +
                 '</div>' +
                 '<span>' + step + '</span>';

      if (index === me.currentStep && me.isLoading) {
        html += '<div class="polaris-spinner polaris-spinner--size-small" style="margin-left: 12px;"></div>';
      }

      html += '</div>';

      stepsContainer.add({
        xtype: 'container',
        style: 'background-color: ' + bgColor + '; padding: 8px 12px; border-radius: 4px; margin-bottom: 4px;',
        html: html
      });
    });
  }
});

Ext.create('LoadingStepsPanel', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Loading, Button, Card, Text, BlockStack } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ProcessStep {
  label: string;
  status: 'pending' | 'active' | 'completed';
}

interface ProcessState {
  currentStep: number;
  isLoading: boolean;
}

function LoadingStepsExample(): JSX.Element {
  const [processState, setProcessState] = useState<ProcessState>({
    currentStep: 0,
    isLoading: false
  });

  const stepLabels: string[] = [
    'Validating data',
    'Processing payment',
    'Updating inventory',
    'Sending confirmation',
    'Complete!'
  ];

  const getStepStatus = useCallback((index: number): 'pending' | 'active' | 'completed' => {
    if (index < processState.currentStep) return 'completed';
    if (index === processState.currentStep) return 'active';
    return 'pending';
  }, [processState.currentStep]);

  const startProcess = useCallback(() => {
    setProcessState({ currentStep: 0, isLoading: true });

    stepLabels.forEach((_, index) => {
      setTimeout(() => {
        setProcessState(prev => ({ ...prev, currentStep: index }));

        if (index === stepLabels.length - 1) {
          setTimeout(() => {
            setProcessState(prev => ({ ...prev, isLoading: false }));
          }, 1000);
        }
      }, (index + 1) * 1000);
    });
  }, [stepLabels]);

  const getBackgroundColor = (status: string): string => {
    switch (status) {
      case 'completed': return '#f0fdf4';
      case 'active': return '#eff6ff';
      default: return '#f8f9fa';
    }
  };

  const getIndicatorColor = (status: string): string => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'active': return '#2563eb';
      default: return '#e5e7eb';
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Multi-Step Loading Process</Text>

        <div style={{ textAlign: 'center' }}>
          {!processState.isLoading ? (
            <Button onClick={startProcess} variant="primary">
              Start Process
            </Button>
          ) : (
            <div style={{ padding: '20px' }}>
              <Loading size="large" accessibilityLabel="Processing order" />
              <div style={{ marginTop: '16px' }}>
                <Text variant="bodySm" tone="subdued">
                  {stepLabels[processState.currentStep]}
                </Text>
              </div>
            </div>
          )}
        </div>

        <div>
          {stepLabels.map((step: string, index: number) => {
            const status = getStepStatus(index);

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: getBackgroundColor(status),
                  marginBottom: '4px'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: getIndicatorColor(status),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}
                >
                  {status === 'completed' ? (
                    <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                  ) : (
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <Text variant="bodySm">{step}</Text>
                {status === 'active' && processState.isLoading && (
                  <Loading size="small" accessibilityLabel="Current step" />
                )}
              </div>
            );
          })}
        </div>
      </BlockStack>
    </Card>
  );
}

export default LoadingStepsExample;`,
  },

  accessibilityDemo: {
    react: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function AccessibilityDemoExample() {
  const accessibilityExamples = [
    {
      size: 'small' as const,
      label: 'Loading small items',
      description: 'With aria-label'
    },
    {
      size: 'medium' as const,
      label: 'Processing your request, please wait',
      description: 'Descriptive label'
    },
    {
      size: 'large' as const,
      label: 'System initializing, this may take a moment',
      description: 'Detailed context'
    }
  ];

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Accessibility Features</Text>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}
        >
          <Text variant="bodySm">
            The Loading component includes proper accessibility features:
          </Text>
          <ul style={{ marginTop: '12px', marginLeft: '20px' }}>
            <li>Screen reader announcements via aria-label</li>
            <li>Proper focus management</li>
            <li>High contrast visibility</li>
            <li>Reduced motion support</li>
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center'
          }}
        >
          {accessibilityExamples.map(({ size, label, description }) => (
            <div key={size}>
              <Loading size={size} accessibilityLabel={label} />
              <div style={{ marginTop: '8px' }}>
                <Text variant="bodySm">{description}</Text>
              </div>
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export default AccessibilityDemoExample;`,

    vanilla: `<!-- HTML Structure for Accessibility Demo -->
<div class="accessibility-demo-container">
  <h2>Accessibility Features</h2>

  <div class="info-box">
    <p>The Loading component includes proper accessibility features:</p>
    <ul>
      <li>Screen reader announcements via aria-label</li>
      <li>Proper focus management</li>
      <li>High contrast visibility</li>
      <li>Reduced motion support</li>
    </ul>
  </div>

  <div class="examples-grid">
    <div class="example-item">
      <div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading small items">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <p>With aria-label</p>
    </div>

    <div class="example-item">
      <div class="polaris-spinner polaris-spinner--size-medium" role="status" aria-label="Processing your request, please wait">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <p>Descriptive label</p>
    </div>

    <div class="example-item">
      <div class="polaris-spinner polaris-spinner--size-large" role="status" aria-label="System initializing, this may take a moment">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <p>Detailed context</p>
    </div>
  </div>
</div>

<style>
.accessibility-demo-container {
  padding: 24px;
}

.info-box {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 20px 0;
}

.info-box ul {
  margin-top: 12px;
  margin-left: 20px;
}

.examples-grid {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 20px;
}

.example-item p {
  margin-top: 8px;
  font-size: 14px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .polaris-spinner {
    animation: none;
  }

  .polaris-spinner circle {
    animation: polaris-spinner-pulse 1.5s ease-in-out infinite;
  }
}

@keyframes polaris-spinner-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

<script>
import { createSpinner } from '@cin7/vanilla-js';

const examples = [
  { size: 'small', label: 'Loading small items', description: 'With aria-label' },
  { size: 'medium', label: 'Processing your request, please wait', description: 'Descriptive label' },
  { size: 'large', label: 'System initializing, this may take a moment', description: 'Detailed context' }
];

const container = document.querySelector('.examples-grid');

examples.forEach(({ size, label, description }) => {
  const item = document.createElement('div');
  item.className = 'example-item';

  const spinner = createSpinner({
    size: size,
    accessibilityLabel: label
  });

  const text = document.createElement('p');
  text.textContent = description;

  item.appendChild(spinner);
  item.appendChild(text);
  container.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Accessibility Demo
Ext.create('Ext.panel.Panel', {
  title: 'Accessibility Features',
  width: 700,
  height: 400,
  bodyPadding: 20,
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      style: 'padding: 16px; background-color: #f8f9fa; border-radius: 4px;',
      margin: '0 0 20 0',
      html: '<p style="margin-bottom: 12px;">The Loading component includes proper accessibility features:</p>' +
            '<ul style="margin-left: 20px;">' +
            '<li>Screen reader announcements via aria-label</li>' +
            '<li>Proper focus management</li>' +
            '<li>High contrast visibility</li>' +
            '<li>Reduced motion support</li>' +
            '</ul>'
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'space-around'
      },
      items: [
        {
          xtype: 'container',
          style: 'text-align: center;',
          html: '<div class="polaris-spinner polaris-spinner--size-small" role="status" aria-label="Loading small items"></div>' +
                '<p style="margin-top: 8px;">With aria-label</p>'
        },
        {
          xtype: 'container',
          style: 'text-align: center;',
          html: '<div class="polaris-spinner polaris-spinner--size-medium" role="status" aria-label="Processing your request, please wait"></div>' +
                '<p style="margin-top: 8px;">Descriptive label</p>'
        },
        {
          xtype: 'container',
          style: 'text-align: center;',
          html: '<div class="polaris-spinner polaris-spinner--size-large" role="status" aria-label="System initializing, this may take a moment"></div>' +
                '<p style="margin-top: 8px;">Detailed context</p>'
        }
      ]
    }
  ]
});

// Add CSS for reduced motion support
Ext.util.CSS.createStyleSheet(
  '@media (prefers-reduced-motion: reduce) {' +
  '  .polaris-spinner { animation: none; }' +
  '  .polaris-spinner circle { animation: polaris-spinner-pulse 1.5s ease-in-out infinite; }' +
  '}' +
  '@keyframes polaris-spinner-pulse {' +
  '  0%, 100% { opacity: 1; }' +
  '  50% { opacity: 0.5; }' +
  '}'
);`,

    typescript: `import { Loading, Card, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

type LoadingSize = 'small' | 'medium' | 'large';

interface AccessibilityExample {
  size: LoadingSize;
  label: string;
  description: string;
}

function AccessibilityDemoExample(): JSX.Element {
  const accessibilityExamples: AccessibilityExample[] = [
    {
      size: 'small',
      label: 'Loading small items',
      description: 'With aria-label'
    },
    {
      size: 'medium',
      label: 'Processing your request, please wait',
      description: 'Descriptive label'
    },
    {
      size: 'large',
      label: 'System initializing, this may take a moment',
      description: 'Detailed context'
    }
  ];

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Accessibility Features</Text>

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}
        >
          <Text variant="bodySm">
            The Loading component includes proper accessibility features:
          </Text>
          <ul style={{ marginTop: '12px', marginLeft: '20px' }}>
            <li>Screen reader announcements via aria-label</li>
            <li>Proper focus management</li>
            <li>High contrast visibility</li>
            <li>Reduced motion support</li>
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center'
          }}
        >
          {accessibilityExamples.map(({ size, label, description }: AccessibilityExample) => (
            <div key={size}>
              <Loading size={size} accessibilityLabel={label} />
              <div style={{ marginTop: '8px' }}>
                <Text variant="bodySm">{description}</Text>
              </div>
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export default AccessibilityDemoExample;`,
  }
};

// SkeletonPage Component Examples

export const skeletonPageExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { SkeletonPage, SkeletonBodyText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function SkeletonPageExample() {
  return (
    <SkeletonPage title="Products">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonBodyText />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-skeleton-page" role="status" aria-label="Loading page">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-body-text">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-skeleton-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.polaris-skeleton-page__header {
  margin-bottom: 24px;
}

.polaris-skeleton-display-text {
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 2s infinite;
  border-radius: 4px;
  max-width: 200px;
}

.polaris-skeleton-body-text__line {
  height: 16px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 2s infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createSkeletonPage } from '@cin7/vanilla-js';

const skeletonPage = createSkeletonPage({
  title: 'Products',
  sections: [
    {
      type: 'card',
      content: { bodyLines: 3 }
    }
  ]
});

document.getElementById('app').appendChild(skeletonPage);
</script>`,

    extjs: `// ExtJS Loading Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Products',
  width: '100%',
  height: 600,
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    cls: 'skeleton-card',
    bodyPadding: 16,
    html: [
      '<div class="skeleton-text" style="height: 20px; width: 100%; margin-bottom: 12px;"></div>',
      '<div class="skeleton-text" style="height: 20px; width: 90%; margin-bottom: 12px;"></div>',
      '<div class="skeleton-text" style="height: 20px; width: 80%;"></div>'
    ].join(''),
    style: {
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e1e3e5'
    }
  }],
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: function(panel) {
      // Add shimmer animation
      Ext.util.CSS.createStyleSheet([
        '.skeleton-text {',
        '  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);',
        '  background-size: 200% 100%;',
        '  animation: skeleton-shimmer 2s infinite;',
        '  border-radius: 4px;',
        '}',
        '@keyframes skeleton-shimmer {',
        '  0% { background-position: 200% 0; }',
        '  100% { background-position: -200% 0; }',
        '}'
      ].join('\\n'));
    }
  }
});

// Or using Polaris adapter
import { PolarisSkeletonPage } from '@cin7/extjs-adapters';

const skeletonPage = Ext.create('PolarisSkeletonPage', {
  title: 'Products',
  sections: [{
    type: 'card',
    bodyLines: 3
  }]
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface SkeletonPageExampleProps {
  title?: string;
  sectionsCount?: number;
}

function SkeletonPageExample({
  title = 'Products',
  sectionsCount = 1
}: SkeletonPageExampleProps): JSX.Element {
  return (
    <SkeletonPage title={title}>
      <Layout>
        {Array.from({ length: sectionsCount }).map((_, index) => (
          <Layout.Section key={index}>
            <Card>
              <BlockStack gap="400">
                <SkeletonBodyText />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageExample;`,
  },

  withprimaryaction: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function SkeletonPageWithPrimaryAction() {
  return (
    <SkeletonPage
      title="Products"
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithPrimaryAction;`,

    vanilla: `<!-- HTML Structure with Primary Action -->
<div class="polaris-skeleton-page" role="status" aria-label="Loading page">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
        <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-skeleton-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.polaris-skeleton-button {
  width: 100px;
  height: 36px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 2s infinite;
  border-radius: 4px;
}
</style>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const skeletonPage = createSkeletonPage({
  title: 'Products',
  primaryAction: true,
  sections: [
    {
      type: 'card',
      content: {
        displayText: 'small',
        bodyLines: 3
      }
    }
  ]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Products',
  width: '100%',
  height: 600,
  bodyPadding: 20,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36,
        html: '<div class="skeleton-shimmer"></div>'
      }
    ]
  }],
  items: [{
    xtype: 'panel',
    cls: 'skeleton-card',
    bodyPadding: 16,
    html: [
      '<div class="skeleton-text skeleton-display-small" style="height: 24px; width: 40%; margin-bottom: 16px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 100%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 90%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 80%;"></div>'
    ].join('')
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface SkeletonPageWithActionsProps {
  title: string;
  showPrimaryAction?: boolean;
  displayTextSize?: 'small' | 'medium' | 'large';
  bodyTextLines?: number;
}

function SkeletonPageWithPrimaryAction({
  title,
  showPrimaryAction = true,
  displayTextSize = 'small',
  bodyTextLines = 3
}: SkeletonPageWithActionsProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      primaryAction={showPrimaryAction}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size={displayTextSize} />
              <SkeletonBodyText lines={bodyTextLines} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithPrimaryAction;`
  },

  withbackaction: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function SkeletonPageWithBackAction() {
  return (
    <SkeletonPage
      title="Product details"
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={5} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithBackAction;`,

    vanilla: `<!-- HTML Structure with Back Action -->
<div class="polaris-skeleton-page" role="status" aria-label="Loading page">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__back-action">
      <div class="polaris-skeleton-icon"></div>
    </div>
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
        <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-skeleton-page__back-action {
  margin-right: 16px;
}

.polaris-skeleton-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 2s infinite;
  border-radius: 4px;
}
</style>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const skeletonPage = createSkeletonPage({
  title: 'Product details',
  backAction: true,
  sections: [{
    type: 'card',
    content: {
      displayText: 'small',
      bodyLines: 5
    }
  }]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product details',
  width: '100%',
  height: 600,
  bodyPadding: 20,
  tools: [{
    type: 'left',
    cls: 'skeleton-back-action',
    handler: function() {
      // Back action handler
    }
  }],
  items: [{
    xtype: 'panel',
    cls: 'skeleton-card',
    bodyPadding: 16,
    html: [
      '<div class="skeleton-text skeleton-display-small" style="height: 24px; width: 40%; margin-bottom: 16px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 100%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 95%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 90%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 85%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 75%;"></div>'
    ].join('')
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface DetailPageSkeletonProps {
  title: string;
  hasBackAction?: boolean;
  contentLines?: number;
}

function SkeletonPageWithBackAction({
  title,
  hasBackAction = true,
  contentLines = 5
}: DetailPageSkeletonProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      backAction={hasBackAction}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={contentLines} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithBackAction;`
  },

  withallactions: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function SkeletonPageWithAllActions() {
  return (
    <SkeletonPage
      title="Product details"
      primaryAction
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithAllActions;`,

    vanilla: `<!-- HTML Structure with All Actions -->
<div class="polaris-skeleton-page" role="status" aria-label="Loading page">
  <div class="polaris-skeleton-page__header">
    <div style="display: flex; align-items: center;">
      <div class="polaris-skeleton-page__back-action">
        <div class="polaris-skeleton-icon"></div>
      </div>
      <div class="polaris-skeleton-page__title">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
      </div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--medium"></div>
        <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const skeletonPage = createSkeletonPage({
  title: 'Product details',
  primaryAction: true,
  backAction: true,
  sections: [{
    type: 'card',
    content: {
      displayText: 'medium',
      bodyLines: 4
    }
  }]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product details',
  width: '100%',
  height: 600,
  bodyPadding: 20,
  tools: [{
    type: 'left',
    cls: 'skeleton-back-action'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36,
        html: '<div class="skeleton-shimmer"></div>'
      }
    ]
  }],
  items: [{
    xtype: 'panel',
    cls: 'skeleton-card',
    bodyPadding: 16,
    html: [
      '<div class="skeleton-text skeleton-display-medium" style="height: 28px; width: 50%; margin-bottom: 16px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 100%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 95%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 90%; margin-bottom: 8px;"></div>',
      '<div class="skeleton-text" style="height: 16px; width: 85%;"></div>'
    ].join('')
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface FullFeaturedSkeletonPageProps {
  title: string;
  displayTextSize?: 'small' | 'medium' | 'large';
  bodyLines?: number;
  showPrimaryAction?: boolean;
  showBackAction?: boolean;
}

function SkeletonPageWithAllActions({
  title,
  displayTextSize = 'medium',
  bodyLines = 4,
  showPrimaryAction = true,
  showBackAction = true
}: FullFeaturedSkeletonPageProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      primaryAction={showPrimaryAction}
      backAction={showBackAction}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size={displayTextSize} />
              <SkeletonBodyText lines={bodyLines} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithAllActions;`
  },

  fullwidth: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function FullWidthSkeletonPage() {
  return (
    <SkeletonPage
      title="Dashboard"
      fullWidth
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default FullWidthSkeletonPage;`,

    vanilla: `<!-- Full Width Skeleton Page -->
<div class="polaris-skeleton-page polaris-skeleton-page--full-width" role="status">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-layout">
      <div class="polaris-layout__section">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 12px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section polaris-layout__section--one-third">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 12px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section polaris-layout__section--one-third">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 12px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section polaris-layout__section--one-third">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 12px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-skeleton-page--full-width {
  max-width: 100%;
  padding: 20px 40px;
}

.polaris-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.polaris-layout__section {
  grid-column: span 12;
}

.polaris-layout__section--one-third {
  grid-column: span 4;
}
</style>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const dashboardSkeleton = createSkeletonPage({
  title: 'Dashboard',
  fullWidth: true,
  primaryAction: true,
  sections: [
    { type: 'card', content: { displayText: 'small', bodyLines: 2 } },
    { type: 'card', width: 'oneThird', content: { displayText: 'small', bodyLines: 2 } },
    { type: 'card', width: 'oneThird', content: { displayText: 'small', bodyLines: 2 } },
    { type: 'card', width: 'oneThird', content: { displayText: 'small', bodyLines: 2 } }
  ]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Dashboard',
  width: '100%',
  height: 600,
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36
      }
    ]
  }],
  items: [
    {
      xtype: 'container',
      cls: 'skeleton-card',
      margin: '0 0 20 0',
      html: [
        '<div class="skeleton-text skeleton-display-small"></div>',
        '<div class="skeleton-text" style="margin-top: 12px;"></div>',
        '<div class="skeleton-text" style="width: 90%;"></div>'
      ].join('')
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      defaults: {
        flex: 1,
        margin: '0 10 0 0'
      },
      items: [
        {
          xtype: 'container',
          cls: 'skeleton-card',
          html: [
            '<div class="skeleton-text skeleton-display-small"></div>',
            '<div class="skeleton-text" style="margin-top: 12px;"></div>',
            '<div class="skeleton-text"></div>'
          ].join('')
        },
        {
          xtype: 'container',
          cls: 'skeleton-card',
          html: [
            '<div class="skeleton-text skeleton-display-small"></div>',
            '<div class="skeleton-text" style="margin-top: 12px;"></div>',
            '<div class="skeleton-text"></div>'
          ].join('')
        },
        {
          xtype: 'container',
          cls: 'skeleton-card',
          margin: 0,
          html: [
            '<div class="skeleton-text skeleton-display-small"></div>',
            '<div class="skeleton-text" style="margin-top: 12px;"></div>',
            '<div class="skeleton-text"></div>'
          ].join('')
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface DashboardSkeletonProps {
  title?: string;
  showPrimaryAction?: boolean;
  widgetCount?: number;
}

function FullWidthSkeletonPage({
  title = 'Dashboard',
  showPrimaryAction = true,
  widgetCount = 3
}: DashboardSkeletonProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      fullWidth
      primaryAction={showPrimaryAction}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        {Array.from({ length: widgetCount }).map((_, index) => (
          <Layout.Section key={index} variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default FullWidthSkeletonPage;`
  },

  narrowwidth: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function NarrowWidthSkeletonPage() {
  return (
    <SkeletonPage
      title="Settings"
      narrowWidth
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default NarrowWidthSkeletonPage;`,

    vanilla: `<!-- Narrow Width Skeleton Page -->
<div class="polaris-skeleton-page polaris-skeleton-page--narrow-width" role="status">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card" style="margin-bottom: 20px;">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
        <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
    <div class="polaris-card">
      <div class="polaris-card__section">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
        <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
          <div class="polaris-skeleton-body-text__line"></div>
          <div class="polaris-skeleton-body-text__line"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-skeleton-page--narrow-width {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const settingsSkeleton = createSkeletonPage({
  title: 'Settings',
  narrowWidth: true,
  primaryAction: true,
  sections: [
    { type: 'card', content: { displayText: 'small', bodyLines: 3 } },
    { type: 'card', content: { displayText: 'small', bodyLines: 2 } }
  ]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Settings',
  width: 600,
  height: 600,
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36
      }
    ]
  }],
  items: [
    {
      xtype: 'panel',
      cls: 'skeleton-card',
      bodyPadding: 16,
      margin: '0 0 20 0',
      html: [
        '<div class="skeleton-text skeleton-display-small"></div>',
        '<div class="skeleton-text" style="margin-top: 16px;"></div>',
        '<div class="skeleton-text" style="width: 95%;"></div>',
        '<div class="skeleton-text" style="width: 90%;"></div>'
      ].join('')
    },
    {
      xtype: 'panel',
      cls: 'skeleton-card',
      bodyPadding: 16,
      html: [
        '<div class="skeleton-text skeleton-display-small"></div>',
        '<div class="skeleton-text" style="margin-top: 16px;"></div>',
        '<div class="skeleton-text" style="width: 90%;"></div>'
      ].join('')
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface SettingsSkeletonProps {
  title?: string;
  sectionCount?: number;
  showPrimaryAction?: boolean;
}

function NarrowWidthSkeletonPage({
  title = 'Settings',
  sectionCount = 2,
  showPrimaryAction = true
}: SettingsSkeletonProps): JSX.Element {
  const sections = Array.from({ length: sectionCount }).map((_, index) => ({
    lines: index === 0 ? 3 : 2
  }));

  return (
    <SkeletonPage
      title={title}
      narrowWidth
      primaryAction={showPrimaryAction}
    >
      <Layout>
        {sections.map((section, index) => (
          <Layout.Section key={index}>
            <Card>
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={section.lines} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default NarrowWidthSkeletonPage;`
  },

  complexlayout: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

function ComplexLayoutSkeletonPage() {
  return (
    <SkeletonPage
      title="Product management"
      primaryAction
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default ComplexLayoutSkeletonPage;`,

    vanilla: `<!-- Complex Layout Skeleton Page -->
<div class="polaris-skeleton-page" role="status">
  <div class="polaris-skeleton-page__header">
    <div style="display: flex; align-items: center;">
      <div class="polaris-skeleton-page__back-action">
        <div class="polaris-skeleton-icon"></div>
      </div>
      <div class="polaris-skeleton-page__title">
        <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
      </div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-layout">
      <div class="polaris-layout__section">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--medium"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section polaris-layout__section--one-half">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section polaris-layout__section--one-half">
        <div class="polaris-card">
          <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small"></div>
          <div class="polaris-skeleton-body-text" style="margin-top: 16px;">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
      <div class="polaris-layout__section">
        <div class="polaris-card">
          <div class="polaris-skeleton-body-text">
            <div class="polaris-skeleton-body-text__line"></div>
            <div class="polaris-skeleton-body-text__line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.polaris-layout__section--one-half {
  grid-column: span 6;
}
</style>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const complexSkeleton = createSkeletonPage({
  title: 'Product management',
  primaryAction: true,
  backAction: true,
  sections: [
    { type: 'card', content: { displayText: 'medium', bodyLines: 3 } },
    { type: 'card', width: 'oneHalf', content: { displayText: 'small', bodyLines: 4 } },
    { type: 'card', width: 'oneHalf', content: { displayText: 'small', bodyLines: 4 } },
    { type: 'card', content: { bodyLines: 2 } }
  ]
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product management',
  width: '100%',
  height: 700,
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  tools: [{
    type: 'left',
    cls: 'skeleton-back-action'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36
      }
    ]
  }],
  items: [
    {
      xtype: 'panel',
      cls: 'skeleton-card',
      bodyPadding: 16,
      margin: '0 0 20 0',
      html: [
        '<div class="skeleton-text skeleton-display-medium"></div>',
        '<div class="skeleton-text" style="margin-top: 16px;"></div>',
        '<div class="skeleton-text" style="width: 95%;"></div>',
        '<div class="skeleton-text" style="width: 90%;"></div>'
      ].join('')
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      margin: '0 0 20 0',
      defaults: {
        flex: 1,
        cls: 'skeleton-card',
        bodyPadding: 16
      },
      items: [
        {
          xtype: 'panel',
          margin: '0 10 0 0',
          html: [
            '<div class="skeleton-text skeleton-display-small"></div>',
            '<div class="skeleton-text" style="margin-top: 16px;"></div>',
            '<div class="skeleton-text"></div>',
            '<div class="skeleton-text"></div>',
            '<div class="skeleton-text"></div>'
          ].join('')
        },
        {
          xtype: 'panel',
          html: [
            '<div class="skeleton-text skeleton-display-small"></div>',
            '<div class="skeleton-text" style="margin-top: 16px;"></div>',
            '<div class="skeleton-text"></div>',
            '<div class="skeleton-text"></div>',
            '<div class="skeleton-text"></div>'
          ].join('')
        }
      ]
    },
    {
      xtype: 'panel',
      cls: 'skeleton-card',
      bodyPadding: 16,
      html: [
        '<div class="skeleton-text"></div>',
        '<div class="skeleton-text" style="width: 90%;"></div>'
      ].join('')
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack } from '@shopify/polaris';
import React from 'react';

interface ComplexLayoutSection {
  displayTextSize?: 'small' | 'medium' | 'large';
  bodyLines: number;
  width?: 'full' | 'oneHalf' | 'oneThird';
}

interface ComplexSkeletonPageProps {
  title: string;
  sections?: ComplexLayoutSection[];
  showPrimaryAction?: boolean;
  showBackAction?: boolean;
}

function ComplexLayoutSkeletonPage({
  title,
  sections = [
    { displayTextSize: 'medium', bodyLines: 3, width: 'full' },
    { displayTextSize: 'small', bodyLines: 4, width: 'oneHalf' },
    { displayTextSize: 'small', bodyLines: 4, width: 'oneHalf' },
    { bodyLines: 2, width: 'full' }
  ],
  showPrimaryAction = true,
  showBackAction = true
}: ComplexSkeletonPageProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      primaryAction={showPrimaryAction}
      backAction={showBackAction}
    >
      <Layout>
        {sections.map((section, index) => (
          <Layout.Section
            key={index}
            variant={section.width === 'oneHalf' ? 'oneHalf' : undefined}
          >
            <Card>
              <BlockStack gap="400">
                {section.displayTextSize && (
                  <SkeletonDisplayText size={section.displayTextSize} />
                )}
                <SkeletonBodyText lines={section.bodyLines} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default ComplexLayoutSkeletonPage;`
  },

  withmultiplecards: {
    react: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack, InlineStack } from '@shopify/polaris';
import React from 'react';

function SkeletonPageWithMultipleCards() {
  return (
    <SkeletonPage
      title="Orders"
      primaryAction
    >
      <Layout>
        {[1, 2, 3, 4].map((item) => (
          <Layout.Section key={item}>
            <Card>
              <BlockStack gap="400">
                <InlineStack gap="400" align="space-between">
                  <SkeletonDisplayText size="small" />
                  <div style={{ width: '60px' }}>
                    <SkeletonBodyText lines={1} />
                  </div>
                </InlineStack>
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithMultipleCards;`,

    vanilla: `<!-- Skeleton Page with Multiple Cards -->
<div class="polaris-skeleton-page" role="status">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title">
      <div class="polaris-skeleton-display-text polaris-skeleton-display-text--large"></div>
    </div>
    <div class="polaris-skeleton-page__actions">
      <div class="polaris-skeleton-button polaris-skeleton-button--primary"></div>
    </div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-layout">
      <div class="polaris-layout__section">
        <div class="polaris-card" style="margin-bottom: 16px;">
          <div class="polaris-card__section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small" style="width: 150px;"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 60px;"></div>
            </div>
            <div class="polaris-skeleton-body-text">
              <div class="polaris-skeleton-body-text__line"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 85%;"></div>
            </div>
          </div>
        </div>
        <div class="polaris-card" style="margin-bottom: 16px;">
          <div class="polaris-card__section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small" style="width: 150px;"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 60px;"></div>
            </div>
            <div class="polaris-skeleton-body-text">
              <div class="polaris-skeleton-body-text__line"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 85%;"></div>
            </div>
          </div>
        </div>
        <div class="polaris-card" style="margin-bottom: 16px;">
          <div class="polaris-card__section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small" style="width: 150px;"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 60px;"></div>
            </div>
            <div class="polaris-skeleton-body-text">
              <div class="polaris-skeleton-body-text__line"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 85%;"></div>
            </div>
          </div>
        </div>
        <div class="polaris-card">
          <div class="polaris-card__section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div class="polaris-skeleton-display-text polaris-skeleton-display-text--small" style="width: 150px;"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 60px;"></div>
            </div>
            <div class="polaris-skeleton-body-text">
              <div class="polaris-skeleton-body-text__line"></div>
              <div class="polaris-skeleton-body-text__line" style="width: 85%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
import { createSkeletonPage } from '@cin7/vanilla-js';

const ordersSkeleton = createSkeletonPage({
  title: 'Orders',
  primaryAction: true,
  sections: Array.from({ length: 4 }).map(() => ({
    type: 'card',
    content: {
      header: { displayText: 'small', badge: true },
      bodyLines: 2
    }
  }))
});
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Orders',
  width: '100%',
  height: 700,
  bodyPadding: 20,
  autoScroll: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbfill' },
      {
        xtype: 'component',
        cls: 'skeleton-button-primary',
        width: 100,
        height: 36
      }
    ]
  }],
  items: Array.from({ length: 4 }).map(function(_, index) {
    return {
      xtype: 'panel',
      cls: 'skeleton-card',
      bodyPadding: 16,
      margin: index < 3 ? '0 0 16 0' : 0,
      html: [
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">',
        '  <div class="skeleton-text skeleton-display-small" style="width: 150px;"></div>',
        '  <div class="skeleton-text" style="width: 60px; height: 16px;"></div>',
        '</div>',
        '<div class="skeleton-text" style="height: 16px; margin-bottom: 8px;"></div>',
        '<div class="skeleton-text" style="height: 16px; width: 85%;"></div>'
      ].join('')
    };
  }),
  renderTo: Ext.getBody()
});`,

    typescript: `import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack, InlineStack } from '@shopify/polaris';
import React from 'react';

interface OrderListSkeletonProps {
  title?: string;
  itemCount?: number;
  showPrimaryAction?: boolean;
}

function SkeletonPageWithMultipleCards({
  title = 'Orders',
  itemCount = 4,
  showPrimaryAction = true
}: OrderListSkeletonProps): JSX.Element {
  return (
    <SkeletonPage
      title={title}
      primaryAction={showPrimaryAction}
    >
      <Layout>
        {Array.from({ length: itemCount }).map((_, index) => (
          <Layout.Section key={index}>
            <Card>
              <BlockStack gap="400">
                <InlineStack gap="400" align="space-between">
                  <SkeletonDisplayText size="small" />
                  <div style={{ width: '60px' }}>
                    <SkeletonBodyText lines={1} />
                  </div>
                </InlineStack>
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonPageWithMultipleCards;`
  }
};


// FullscreenBar Component Examples

export const progressbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ProgressBar } from '@shopify/polaris';
import React from 'react';

function ProgressBarExample() {
  return <ProgressBar progress={65} size="medium" />;
}

export default ProgressBarExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="polaris-progress-bar__indicator" style="width: 65%;"></div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const progressBar = createProgressBar({
  progress: 65,
  size: 'medium',
  onChange: (value) => {
    console.log('Progress updated:', value);
  }
});

document.getElementById('app').appendChild(progressBar);
</script>`,

    extjs: `// ExtJS ProgressBar
Ext.create('Ext.ProgressBar', {
  value: 0.65,  // 65% as decimal
  text: '65%',
  width: 400,
  renderTo: Ext.getBody()
});

// Or using custom implementation
Ext.create('Ext.Component', {
  html: '<div class="polaris-progress-bar">' +
        '<div class="polaris-progress-bar__indicator" style="width: 65%;"></div>' +
        '</div>',
  width: 400,
  renderTo: Ext.getBody()
});`,

    typescript: `import { ProgressBar } from '@shopify/polaris';
import React from 'react';

interface ProgressBarExampleProps {
  progress: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'critical';
  animated?: boolean;
}

function ProgressBarExample({
  progress,
  size = 'medium',
  color = 'primary',
  animated = false
}: ProgressBarExampleProps): JSX.Element {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBar
      progress={normalizedProgress}
      size={size}
      color={color}
      animated={animated}
    />
  );
}

export default ProgressBarExample;`,
  },

  sizes: {
    react: `import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

function ProgressBarSizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">Small Progress</Text>
        <ProgressBar progress={75} size="small" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Medium Progress</Text>
        <ProgressBar progress={75} size="medium" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Large Progress</Text>
        <ProgressBar progress={75} size="large" />
      </div>
    </div>
  );
}

export default ProgressBarSizes;`,

    vanilla: `<!-- HTML Structure -->
<div class="progress-sizes-container">
  <div class="progress-item">
    <p class="progress-label">Small Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--small" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Medium Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--medium" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>

  <div class="progress-item">
    <p class="progress-label">Large Progress</p>
    <div class="polaris-progress-bar polaris-progress-bar--large" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="polaris-progress-bar__indicator" style="width: 75%;"></div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const sizes = ['small', 'medium', 'large'];
const container = document.querySelector('.progress-sizes-container');

sizes.forEach(size => {
  const wrapper = document.createElement('div');
  wrapper.className = 'progress-item';

  const label = document.createElement('p');
  label.textContent = size.charAt(0).toUpperCase() + size.slice(1) + ' Progress';
  label.className = 'progress-label';

  const progressBar = createProgressBar({
    progress: 75,
    size: size
  });

  wrapper.appendChild(label);
  wrapper.appendChild(progressBar);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS ProgressBar with different sizes
Ext.create('Ext.panel.Panel', {
  title: 'Progress Bar Sizes',
  width: 400,
  bodyPadding: 10,
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<p>Small Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 20,
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Medium Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 30,
      margin: '0 0 20 0'
    },
    {
      xtype: 'component',
      html: '<p>Large Progress</p>'
    },
    {
      xtype: 'progressbar',
      value: 0.75,
      text: '75%',
      height: 40
    }
  ]
});`,

    typescript: `import { ProgressBar, Text } from '@shopify/polaris';
import React from 'react';

type ProgressBarSize = 'small' | 'medium' | 'large';

interface ProgressBarSizeItem {
  size: ProgressBarSize;
  label: string;
}

function ProgressBarSizes(): JSX.Element {
  const sizes: ProgressBarSizeItem[] = [
    { size: 'small', label: 'Small Progress' },
    { size: 'medium', label: 'Medium Progress' },
    { size: 'large', label: 'Large Progress' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      {sizes.map(({ size, label }) => (
        <div key={size}>
          <Text as="p" variant="bodySm">{label}</Text>
          <ProgressBar progress={75} size={size} />
        </div>
      ))}
    </div>
  );
}

export default ProgressBarSizes;`
  },
};

// Spinner Component Examples - Feedback

export const spinnerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Spinner } from '@shopify/polaris';
import React from 'react';

function SpinnerExample() {
  return <Spinner size="medium" accessibilityLabel="Loading content" />;
}

export default SpinnerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner" role="status">
  <span class="polaris-spinner__svg">
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" />
    </svg>
  </span>
  <span class="polaris-visually-hidden">Loading content</span>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createSpinner } from '@cin7/vanilla-js';

const spinner = createSpinner({
  size: 'medium',
  accessibilityLabel: 'Loading content'
});

document.getElementById('app').appendChild(spinner);
</script>`,

    extjs: `// ExtJS LoadMask for loading indicator
const panel = Ext.create('Ext.panel.Panel', {
  width: 400,
  height: 200,
  html: 'Content loading...',
  renderTo: Ext.getBody()
});

// Show loading mask
panel.setLoading({
  msg: 'Loading content...',
  msgCls: 'polaris-spinner-message'
});

// Hide after 3 seconds
setTimeout(() => {
  panel.setLoading(false);
}, 3000);`,

    typescript: `import { Spinner } from '@shopify/polaris';
import React from 'react';

interface SpinnerExampleProps {
  size?: 'small' | 'medium' | 'large';
  accessibilityLabel?: string;
  hasFocusableParent?: boolean;
}

function SpinnerExample({
  size = 'medium',
  accessibilityLabel = 'Loading',
  hasFocusableParent = false
}: SpinnerExampleProps): JSX.Element {
  return (
    <Spinner
      size={size}
      accessibilityLabel={accessibilityLabel}
      hasFocusableParent={hasFocusableParent}
    />
  );
}

export default SpinnerExample;`,
  }
};

// Toast Component Examples - Feedback

export const toastExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Toast, Frame } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function ToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Frame>
      <button onClick={toggleActive}>Show Toast</button>
      {active && (
        <Toast content="Message sent" onDismiss={toggleActive} />
      )}
    </Frame>
  );
}

export default ToastExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="show-toast">Show Toast</button>

<div class="polaris-toast-wrapper" style="display: none;">
  <div class="polaris-toast">
    <div class="polaris-toast__content">Message sent</div>
    <button class="polaris-toast__close">×</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createToast } from '@cin7/vanilla-js';

const button = document.getElementById('show-toast');
let toast;

button.addEventListener('click', () => {
  if (toast) {
    toast.remove();
  }

  toast = createToast({
    content: 'Message sent',
    duration: 5000,
    onDismiss: () => {
      console.log('Toast dismissed');
      toast = null;
    }
  });

  document.body.appendChild(toast);
});
</script>`,

    extjs: `// ExtJS Toast notification
Ext.toast({
  html: 'Message sent',
  title: 'Success',
  width: 300,
  align: 'br',
  autoCloseDelay: 5000
});

// Or using custom implementation
function showToast(message) {
  const toast = Ext.create('Ext.window.Toast', {
    html: message,
    title: 'Notification',
    width: 300,
    align: 'br',
    slideInDuration: 400,
    autoCloseDelay: 5000,
    closable: true
  });

  toast.show();
}

showToast('Message sent');`,

    typescript: `import { Toast, Frame } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ToastExampleProps {
  defaultMessage?: string;
  duration?: number;
  error?: boolean;
}

function ToastExample({
  defaultMessage = 'Message sent',
  duration = 5000,
  error = false
}: ToastExampleProps): JSX.Element {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Frame>
      <button onClick={toggleActive}>Show Toast</button>
      {active && (
        <Toast
          content={defaultMessage}
          onDismiss={toggleActive}
          duration={duration}
          error={error}
        />
      )}
    </Frame>
  );
}

export default ToastExample;`,
  },

  error: {
    react: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function ErrorToastExample() {
  const [active, setActive] = useState(false);

  return (
    <Frame>
      <Button onClick={() => setActive(true)}>Show Error Toast</Button>
      {active && (
        <Toast
          content="Failed to save changes"
          error
          onDismiss={() => setActive(false)}
        />
      )}
    </Frame>
  );
}

export default ErrorToastExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="show-error-toast">Show Error Toast</button>

<div class="polaris-toast-wrapper polaris-toast--error" style="display: none;">
  <div class="polaris-toast">
    <div class="polaris-toast__icon">⚠️</div>
    <div class="polaris-toast__content">Failed to save changes</div>
    <button class="polaris-toast__close">×</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createToast } from '@cin7/vanilla-js';

const button = document.getElementById('show-error-toast');

button.addEventListener('click', () => {
  const toast = createToast({
    content: 'Failed to save changes',
    error: true,
    duration: 5000,
    onDismiss: () => {
      console.log('Error toast dismissed');
    }
  });

  document.body.appendChild(toast);
});
</script>`,

    extjs: `// ExtJS Error Toast notification
Ext.toast({
  html: 'Failed to save changes',
  title: 'Error',
  width: 300,
  align: 'br',
  autoCloseDelay: 5000,
  cls: 'error-toast',
  iconCls: 'fa fa-exclamation-triangle'
});

// Or using Ext.Msg for errors
Ext.Msg.show({
  title: 'Error',
  message: 'Failed to save changes',
  buttons: Ext.Msg.OK,
  icon: Ext.Msg.ERROR,
  fn: function() {
    console.log('Error acknowledged');
  }
});`,

    typescript: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

interface ErrorToastProps {
  errorMessage?: string;
  onRetry?: () => void;
}

function ErrorToastExample({
  errorMessage = 'Failed to save changes',
  onRetry
}: ErrorToastProps): JSX.Element {
  const [active, setActive] = useState(false);

  const handleDismiss = () => {
    setActive(false);
  };

  return (
    <Frame>
      <Button onClick={() => setActive(true)}>Show Error Toast</Button>
      {active && (
        <Toast
          content={errorMessage}
          error
          action={onRetry ? {
            content: 'Retry',
            onAction: onRetry
          } : undefined}
          onDismiss={handleDismiss}
        />
      )}
    </Frame>
  );
}

export default ErrorToastExample;`,
  },

  withAction: {
    react: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function ToastWithActionExample() {
  const [active, setActive] = useState(false);

  return (
    <Frame>
      <Button onClick={() => setActive(true)}>Show Toast with Action</Button>
      {active && (
        <Toast
          content="Image uploaded successfully"
          action={{
            content: 'View image',
            onAction: () => console.log('View image clicked'),
          }}
          onDismiss={() => setActive(false)}
        />
      )}
    </Frame>
  );
}

export default ToastWithActionExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="show-action-toast">Upload Image</button>

<div class="polaris-toast-wrapper" style="display: none;">
  <div class="polaris-toast">
    <div class="polaris-toast__content">Image uploaded successfully</div>
    <button class="polaris-toast__action">View image</button>
    <button class="polaris-toast__close">×</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createToast } from '@cin7/vanilla-js';

const button = document.getElementById('show-action-toast');

button.addEventListener('click', () => {
  const toast = createToast({
    content: 'Image uploaded successfully',
    action: {
      label: 'View image',
      onClick: () => {
        console.log('View image clicked');
        window.open('/images/uploaded.jpg', '_blank');
      }
    },
    duration: 6000,
    onDismiss: () => {
      console.log('Toast dismissed');
    }
  });

  document.body.appendChild(toast);
});
</script>`,

    extjs: `// ExtJS Toast with action button
const toast = Ext.create('Ext.window.Toast', {
  html: 'Image uploaded successfully',
  title: 'Success',
  width: 350,
  align: 'br',
  autoCloseDelay: 6000,
  closable: true,
  tools: [{
    type: 'search',
    tooltip: 'View image',
    handler: function() {
      console.log('View image clicked');
      window.open('/images/uploaded.jpg', '_blank');
    }
  }]
});

toast.show();

// Or using buttons
Ext.toast({
  html: 'Image uploaded successfully',
  title: 'Success',
  width: 350,
  align: 'br',
  autoCloseDelay: 6000,
  buttons: [{
    text: 'View image',
    handler: function() {
      console.log('View image clicked');
      window.open('/images/uploaded.jpg', '_blank');
    }
  }]
});`,

    typescript: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

interface ToastAction {
  content: string;
  onAction: () => void;
}

interface ToastWithActionProps {
  message?: string;
  action?: ToastAction;
}

function ToastWithActionExample({
  message = 'Image uploaded successfully',
  action = {
    content: 'View image',
    onAction: () => console.log('View image clicked')
  }
}: ToastWithActionProps): JSX.Element {
  const [active, setActive] = useState(false);

  return (
    <Frame>
      <Button onClick={() => setActive(true)}>Show Toast with Action</Button>
      {active && (
        <Toast
          content={message}
          action={action}
          onDismiss={() => setActive(false)}
        />
      )}
    </Frame>
  );
}

export default ToastWithActionExample;`,
  },

  customDuration: {
    react: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function CustomDurationToastExample() {
  const [quickActive, setQuickActive] = useState(false);
  const [slowActive, setSlowActive] = useState(false);
  const [persistentActive, setPersistentActive] = useState(false);

  return (
    <Frame>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => setQuickActive(true)}>Quick (2s)</Button>
        <Button onClick={() => setSlowActive(true)}>Slow (8s)</Button>
        <Button onClick={() => setPersistentActive(true)}>Persistent</Button>
      </div>

      {quickActive && (
        <Toast
          content="Quick notification"
          duration={2000}
          onDismiss={() => setQuickActive(false)}
        />
      )}

      {slowActive && (
        <Toast
          content="This will stay for 8 seconds"
          duration={8000}
          onDismiss={() => setSlowActive(false)}
        />
      )}

      {persistentActive && (
        <Toast
          content="This won't auto-dismiss"
          duration={0}
          action={{
            content: 'Dismiss',
            onAction: () => setPersistentActive(false),
          }}
          onDismiss={() => setPersistentActive(false)}
        />
      )}
    </Frame>
  );
}

export default CustomDurationToastExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; gap: 8px;">
  <button id="quick-toast">Quick (2s)</button>
  <button id="slow-toast">Slow (8s)</button>
  <button id="persistent-toast">Persistent</button>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createToast } from '@cin7/vanilla-js';

// Quick toast - 2 seconds
document.getElementById('quick-toast').addEventListener('click', () => {
  const toast = createToast({
    content: 'Quick notification',
    duration: 2000,
    onDismiss: () => console.log('Quick toast dismissed')
  });
  document.body.appendChild(toast);
});

// Slow toast - 8 seconds
document.getElementById('slow-toast').addEventListener('click', () => {
  const toast = createToast({
    content: 'This will stay for 8 seconds',
    duration: 8000,
    onDismiss: () => console.log('Slow toast dismissed')
  });
  document.body.appendChild(toast);
});

// Persistent toast - doesn't auto-dismiss
document.getElementById('persistent-toast').addEventListener('click', () => {
  const toast = createToast({
    content: "This won't auto-dismiss",
    duration: 0, // 0 means no auto-dismiss
    action: {
      label: 'Dismiss',
      onClick: () => toast.remove()
    },
    onDismiss: () => console.log('Persistent toast dismissed')
  });
  document.body.appendChild(toast);
});
</script>`,

    extjs: `// Quick toast - 2 seconds
Ext.toast({
  html: 'Quick notification',
  title: 'Info',
  width: 300,
  align: 'br',
  autoCloseDelay: 2000
});

// Slow toast - 8 seconds
Ext.toast({
  html: 'This will stay for 8 seconds',
  title: 'Info',
  width: 300,
  align: 'br',
  autoCloseDelay: 8000
});

// Persistent toast - doesn't auto-close
const persistentToast = Ext.create('Ext.window.Toast', {
  html: "This won't auto-dismiss",
  title: 'Persistent',
  width: 300,
  align: 'br',
  autoCloseDelay: 0, // 0 means no auto-close
  closable: true,
  buttons: [{
    text: 'Dismiss',
    handler: function() {
      persistentToast.close();
    }
  }]
});

persistentToast.show();`,

    typescript: `import { Toast, Frame, Button } from '@shopify/polaris';
import React, { useState } from 'react';

type ToastDuration = 2000 | 5000 | 8000 | 0;

interface DurationToastProps {
  quickDuration?: number;
  slowDuration?: number;
}

function CustomDurationToastExample({
  quickDuration = 2000,
  slowDuration = 8000
}: DurationToastProps): JSX.Element {
  const [quickActive, setQuickActive] = useState(false);
  const [slowActive, setSlowActive] = useState(false);
  const [persistentActive, setPersistentActive] = useState(false);

  return (
    <Frame>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => setQuickActive(true)}>
          Quick ({quickDuration / 1000}s)
        </Button>
        <Button onClick={() => setSlowActive(true)}>
          Slow ({slowDuration / 1000}s)
        </Button>
        <Button onClick={() => setPersistentActive(true)}>
          Persistent
        </Button>
      </div>

      {quickActive && (
        <Toast
          content="Quick notification"
          duration={quickDuration}
          onDismiss={() => setQuickActive(false)}
        />
      )}

      {slowActive && (
        <Toast
          content={\`This will stay for \${slowDuration / 1000} seconds\`}
          duration={slowDuration}
          onDismiss={() => setSlowActive(false)}
        />
      )}

      {persistentActive && (
        <Toast
          content="This won't auto-dismiss"
          duration={0}
          action={{
            content: 'Dismiss',
            onAction: () => setPersistentActive(false),
          }}
          onDismiss={() => setPersistentActive(false)}
        />
      )}
    </Frame>
  );
}

export default CustomDurationToastExample;`,
  }
};



// Navigation Component Examples

export const popoverExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function PopoverExample() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((active) => !active),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ActionList
        items={[
          { content: 'Import', onAction: () => console.log('Import') },
          { content: 'Export', onAction: () => console.log('Export') },
        ]}
      />
    </Popover>
  );
}

export default PopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="popover-activator" id="popoverActivator">
    More actions ▼
  </button>
  <div class="popover-content" id="popoverContent" style="display: none;">
    <button class="action-item">Import</button>
    <button class="action-item">Export</button>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 200px; background: white;
  border: 1px solid #ccc; border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 8px;
}
.action-item {
  display: block; width: 100%; padding: 8px 12px;
  border: none; background: transparent; text-align: left;
  cursor: pointer; border-radius: 4px;
}
.action-item:hover { background: #f5f5f5; }
</style>

<script>
const activator = document.getElementById('popoverActivator');
const content = document.getElementById('popoverContent');

activator.addEventListener('click', () => {
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!activator.contains(e.target) && !content.contains(e.target)) {
    content.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Menu
Ext.create('Ext.button.Button', {
  text: 'More actions',
  menu: {
    items: [
      { text: 'Import', handler: () => console.log('Import') },
      { text: 'Export', handler: () => console.log('Export') }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverExampleProps {
  activatorLabel?: string;
  actions?: ActionListItemDescriptor[];
}

function PopoverExample({
  activatorLabel = 'More actions',
  actions = [
    { content: 'Import' },
    { content: 'Export' },
  ]
}: PopoverExampleProps): JSX.Element {
  const [active, setActive] = useState(false);
  const toggle = useCallback(() => setActive((a) => !a), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggle} disclosure>{activatorLabel}</Button>}
      onClose={toggle}
    >
      <ActionList items={actions} />
    </Popover>
  );
}

export default PopoverExample;`,
  }
,

  buttonActivator: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function ButtonActivatorExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Open Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover is triggered by a button click. It contains simple text content.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default ButtonActivatorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="popoverBtn">Open Popover</button>
  <div class="popover-content" id="popoverContent" style="display: none;">
    <div class="popover-section">
      <p>This popover is triggered by a button click. It contains simple text content.</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 300px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section { padding: 16px; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('popoverBtn');
const content = document.getElementById('popoverContent');

button.addEventListener('click', () => togglePopover(content));
onClickOutside([button, content], () => content.style.display = 'none');
</script>`,

    extjs: `// ExtJS Button with Popover Panel
const popoverPanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 300,
  bodyPadding: 16,
  html: 'This popover is triggered by a button click. It contains simple text content.',
  border: true,
  shadow: true
});

Ext.create('Ext.button.Button', {
  text: 'Open Popover',
  handler: function(btn) {
    popoverPanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ButtonActivatorPopoverProps {
  buttonLabel?: string;
  content: string;
  preferredPosition?: PopoverProps['preferredPosition'];
}

function ButtonActivatorPopover({
  buttonLabel = 'Open Popover',
  content,
  preferredPosition = 'below'
}: ButtonActivatorPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{buttonLabel}</Button>}
      onClose={toggleActive}
      preferredPosition={preferredPosition}
    >
      <Popover.Section>
        <Text as="p">{content}</Text>
      </Popover.Section>
    </Popover>
  );
}

export default ButtonActivatorPopover;`
  },

  textLinkActivator: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function TextLinkActivatorExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button plain onClick={toggleActive}>
      View details
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover is triggered by a text link. It's useful for showing
          additional context or options without disrupting the flow.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default TextLinkActivatorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <a href="#" class="text-link" id="textLink">View details</a>
  <div class="popover-content" id="linkPopover" style="display: none;">
    <div class="popover-section">
      <p>This popover is triggered by a text link. It's useful for showing
      additional context or options without disrupting the flow.</p>
    </div>
  </div>
</div>

<style>
.text-link { color: #2c6ecb; text-decoration: none; cursor: pointer; }
.text-link:hover { text-decoration: underline; }
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 300px; max-width: 400px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section { padding: 16px; }
</style>

<script>
import { createPopover } from '@cin7/vanilla-js';

const link = document.getElementById('textLink');
const popover = document.getElementById('linkPopover');

link.addEventListener('click', (e) => {
  e.preventDefault();
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!link.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Text Link with Tip
const tip = Ext.create('Ext.tip.ToolTip', {
  width: 300,
  html: 'This popover is triggered by a text link. It\\'s useful for showing additional context.',
  dismissDelay: 0,
  anchor: 'top'
});

Ext.create('Ext.Component', {
  html: '<a href="#" class="text-link">View details</a>',
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: function(cmp) {
      const link = cmp.el.down('a');
      link.on('click', function(e) {
        e.preventDefault();
        tip.showBy(link);
      });
    }
  }
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface TextLinkPopoverProps {
  linkText: string;
  content: string;
  maxWidth?: number;
}

function TextLinkPopover({
  linkText,
  content,
  maxWidth = 400
}: TextLinkPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button plain onClick={toggleActive}>{linkText}</Button>}
      onClose={toggleActive}
    >
      <Popover.Section>
        <div style={{ maxWidth: \`\${maxWidth}px\` }}>
          <Text as="p">{content}</Text>
        </div>
      </Popover.Section>
    </Popover>
  );
}

export default TextLinkPopover;`
  },

  positions: {
    react: `import { Popover, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverPositionsExample() {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = (popoverName: string) => {
    setActivePopover(activePopover === popoverName ? null : popoverName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Popover
          active={activePopover === 'above-left'}
          activator={<Button onClick={() => togglePopover('above-left')}>Above Left</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="left"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, aligned left</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'above-center'}
          activator={<Button onClick={() => togglePopover('above-center')}>Above Center</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="center"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, centered</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'above-right'}
          activator={<Button onClick={() => togglePopover('above-right')}>Above Right</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="right"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, aligned right</Popover.Section>
        </Popover>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Popover
          active={activePopover === 'below-left'}
          activator={<Button onClick={() => togglePopover('below-left')}>Below Left</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="left"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, aligned left</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'below-center'}
          activator={<Button onClick={() => togglePopover('below-center')}>Below Center</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="center"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, centered</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'below-right'}
          activator={<Button onClick={() => togglePopover('below-right')}>Below Right</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="right"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, aligned right</Popover.Section>
        </Popover>
      </div>
    </div>
  );
}

export default PopoverPositionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="positions-demo">
  <div class="button-row">
    <div class="popover-wrapper" data-position="above-left">
      <button class="polaris-button">Above Left</button>
      <div class="popover-content popover-above align-left" style="display: none;">
        Appears above, aligned left
      </div>
    </div>
    <div class="popover-wrapper" data-position="above-center">
      <button class="polaris-button">Above Center</button>
      <div class="popover-content popover-above align-center" style="display: none;">
        Appears above, centered
      </div>
    </div>
    <div class="popover-wrapper" data-position="above-right">
      <button class="polaris-button">Above Right</button>
      <div class="popover-content popover-above align-right" style="display: none;">
        Appears above, aligned right
      </div>
    </div>
  </div>

  <div class="button-row" style="margin-top: 100px;">
    <div class="popover-wrapper" data-position="below-left">
      <button class="polaris-button">Below Left</button>
      <div class="popover-content popover-below align-left" style="display: none;">
        Appears below, aligned left
      </div>
    </div>
    <div class="popover-wrapper" data-position="below-center">
      <button class="polaris-button">Below Center</button>
      <div class="popover-content popover-below align-center" style="display: none;">
        Appears below, centered
      </div>
    </div>
    <div class="popover-wrapper" data-position="below-right">
      <button class="polaris-button">Below Right</button>
      <div class="popover-content popover-below align-right" style="display: none;">
        Appears below, aligned right
      </div>
    </div>
  </div>
</div>

<style>
.positions-demo { padding: 40px; }
.button-row { display: flex; gap: 20px; justify-content: center; }
.popover-wrapper { position: relative; }
.popover-content {
  position: absolute; z-index: 1000; padding: 12px 16px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 200px; white-space: nowrap;
}
.popover-above { bottom: 100%; margin-bottom: 8px; }
.popover-below { top: 100%; margin-top: 8px; }
.align-left { left: 0; }
.align-center { left: 50%; transform: translateX(-50%); }
.align-right { right: 0; }
</style>

<script>
import { positionPopover, onClickOutside } from '@cin7/vanilla-js';

document.querySelectorAll('.popover-wrapper').forEach(wrapper => {
  const button = wrapper.querySelector('button');
  const popover = wrapper.querySelector('.popover-content');

  button.addEventListener('click', () => {
    document.querySelectorAll('.popover-content').forEach(p => {
      if (p !== popover) p.style.display = 'none';
    });
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  });
});

onClickOutside(document.querySelectorAll('.popover-wrapper'), () => {
  document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
});
</script>`,

    extjs: `// ExtJS Popover with Different Alignments
const positions = [
  { text: 'Above Left', align: 'tl-bl', content: 'Appears above, aligned left' },
  { text: 'Above Center', align: 't-b', content: 'Appears above, centered' },
  { text: 'Above Right', align: 'tr-br', content: 'Appears above, aligned right' },
  { text: 'Below Left', align: 'bl-tl', content: 'Appears below, aligned left' },
  { text: 'Below Center', align: 'b-t', content: 'Appears below, centered' },
  { text: 'Below Right', align: 'br-tr', content: 'Appears below, aligned right' }
];

positions.forEach(pos => {
  const tip = Ext.create('Ext.tip.ToolTip', {
    html: pos.content,
    anchor: pos.align,
    dismissDelay: 0
  });

  Ext.create('Ext.button.Button', {
    text: pos.text,
    margin: '10 10 10 10',
    handler: function(btn) {
      tip.showBy(btn, pos.align);
    },
    renderTo: Ext.getBody()
  });
});`,

    typescript: `import { Popover, Button, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type PopoverPosition = {
  id: string;
  label: string;
  alignment: PopoverProps['preferredAlignment'];
  position: PopoverProps['preferredPosition'];
  description: string;
};

function PopoverPositionsExample(): JSX.Element {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = useCallback((popoverId: string) => {
    setActivePopover((current) => current === popoverId ? null : popoverId);
  }, []);

  const positions: PopoverPosition[] = [
    { id: 'above-left', label: 'Above Left', alignment: 'left', position: 'above', description: 'Appears above, aligned left' },
    { id: 'above-center', label: 'Above Center', alignment: 'center', position: 'above', description: 'Appears above, centered' },
    { id: 'above-right', label: 'Above Right', alignment: 'right', position: 'above', description: 'Appears above, aligned right' },
    { id: 'below-left', label: 'Below Left', alignment: 'left', position: 'below', description: 'Appears below, aligned left' },
    { id: 'below-center', label: 'Below Center', alignment: 'center', position: 'below', description: 'Appears below, centered' },
    { id: 'below-right', label: 'Below Right', alignment: 'right', position: 'below', description: 'Appears below, aligned right' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
      {[positions.slice(0, 3), positions.slice(3, 6)].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {row.map((pos) => (
            <Popover
              key={pos.id}
              active={activePopover === pos.id}
              activator={<Button onClick={() => togglePopover(pos.id)}>{pos.label}</Button>}
              onClose={() => setActivePopover(null)}
              preferredAlignment={pos.alignment}
              preferredPosition={pos.position}
            >
              <Popover.Section>{pos.description}</Popover.Section>
            </Popover>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PopoverPositionsExample;`,
  },

  withActionList: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverWithActionListExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Actions
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'View product details',
            icon: 'ViewIcon',
            onAction: toggleActive,
          },
          {
            content: 'Edit product',
            icon: 'EditIcon',
            onAction: toggleActive,
          },
          {
            content: 'Duplicate product',
            icon: 'DuplicateIcon',
            onAction: toggleActive,
          },
          {
            content: 'Delete product',
            icon: 'DeleteIcon',
            destructive: true,
            onAction: toggleActive,
          },
        ]}
      />
    </Popover>
  );
}

export default PopoverWithActionListExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="actionsBtn">Actions ▼</button>
  <div class="popover-content" id="actionsPopover" style="display: none;">
    <div class="action-list">
      <button class="action-item" data-action="view">
        <span class="icon">👁️</span> View product details
      </button>
      <button class="action-item" data-action="edit">
        <span class="icon">✏️</span> Edit product
      </button>
      <button class="action-item" data-action="duplicate">
        <span class="icon">📋</span> Duplicate product
      </button>
      <div class="action-divider"></div>
      <button class="action-item destructive" data-action="delete">
        <span class="icon">🗑️</span> Delete product
      </button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 220px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.action-list { padding: 8px; }
.action-item {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 10px 12px; border: none; background: transparent;
  text-align: left; cursor: pointer; border-radius: 6px;
  font-size: 14px; transition: background 0.2s;
}
.action-item:hover { background: #f6f6f7; }
.action-item.destructive { color: #d72c0d; }
.action-item.destructive:hover { background: #fef3f2; }
.action-divider {
  height: 1px; background: #e1e3e5; margin: 8px 0;
}
.icon { font-size: 16px; }
</style>

<script>
import { createActionList, togglePopover } from '@cin7/vanilla-js';

const button = document.getElementById('actionsBtn');
const popover = document.getElementById('actionsPopover');

button.addEventListener('click', () => togglePopover(popover));

document.querySelectorAll('.action-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const action = e.currentTarget.dataset.action;
    console.log('Action selected:', action);
    popover.style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!button.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Button with Action Menu
Ext.create('Ext.button.Button', {
  text: 'Actions',
  iconCls: 'x-fa fa-chevron-down',
  menu: {
    items: [
      {
        text: 'View product details',
        iconCls: 'x-fa fa-eye',
        handler: function() {
          console.log('View product details');
        }
      },
      {
        text: 'Edit product',
        iconCls: 'x-fa fa-edit',
        handler: function() {
          console.log('Edit product');
        }
      },
      {
        text: 'Duplicate product',
        iconCls: 'x-fa fa-copy',
        handler: function() {
          console.log('Duplicate product');
        }
      },
      '-', // Separator
      {
        text: 'Delete product',
        iconCls: 'x-fa fa-trash',
        cls: 'destructive-action',
        handler: function() {
          Ext.Msg.confirm('Delete', 'Are you sure you want to delete this product?', function(btn) {
            if (btn === 'yes') {
              console.log('Product deleted');
            }
          });
        }
      }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverWithActionListProps {
  activatorLabel?: string;
  actions?: ActionListItemDescriptor[];
  onActionSelect?: (actionId: string) => void;
}

function PopoverWithActionList({
  activatorLabel = 'Actions',
  actions = [
    { content: 'View product details', icon: 'ViewIcon', id: 'view' },
    { content: 'Edit product', icon: 'EditIcon', id: 'edit' },
    { content: 'Duplicate product', icon: 'DuplicateIcon', id: 'duplicate' },
    { content: 'Delete product', icon: 'DeleteIcon', destructive: true, id: 'delete' },
  ],
  onActionSelect
}: PopoverWithActionListProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const handleAction = useCallback((actionId: string) => {
    if (onActionSelect) {
      onActionSelect(actionId);
    }
    toggleActive();
  }, [onActionSelect, toggleActive]);

  const itemsWithHandlers = actions.map(action => ({
    ...action,
    onAction: () => handleAction(action.id || action.content)
  }));

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive} disclosure>{activatorLabel}</Button>}
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={itemsWithHandlers}
      />
    </Popover>
  );
}

export default PopoverWithActionList;`
  },

  withSections: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverWithSectionsExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Account Settings
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      sectioned
    >
      <Popover.Section title="Profile">
        <Text as="p">
          Manage your profile information and preferences.
        </Text>
      </Popover.Section>
      <Popover.Section title="Security">
        <Text as="p">
          Configure security settings and two-factor authentication.
        </Text>
      </Popover.Section>
      <Popover.Section title="Notifications">
        <Text as="p">
          Choose how you want to be notified about important events.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default PopoverWithSectionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="settingsBtn">Account Settings</button>
  <div class="popover-content sectioned" id="settingsPopover" style="display: none;">
    <div class="popover-section">
      <h3 class="section-title">Profile</h3>
      <p>Manage your profile information and preferences.</p>
    </div>
    <div class="popover-section">
      <h3 class="section-title">Security</h3>
      <p>Configure security settings and two-factor authentication.</p>
    </div>
    <div class="popover-section">
      <h3 class="section-title">Notifications</h3>
      <p>Choose how you want to be notified about important events.</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content.sectioned {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; max-width: 400px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.section-title {
  margin: 0 0 8px 0; font-size: 14px;
  font-weight: 600; color: #202223;
}
.popover-section p {
  margin: 0; font-size: 14px;
  color: #6d7175; line-height: 1.5;
}
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('settingsBtn');
const popover = document.getElementById('settingsPopover');

button.addEventListener('click', () => togglePopover(popover));
onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Panel with Sections
const settingsPanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 350,
  title: false,
  bodyPadding: 0,
  border: true,
  shadow: true,
  items: [
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Profile</h3>' +
            '<p style="margin: 0; color: #6d7175;">Manage your profile information and preferences.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Security</h3>' +
            '<p style="margin: 0; color: #6d7175;">Configure security settings and two-factor authentication.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Notifications</h3>' +
            '<p style="margin: 0; color: #6d7175;">Choose how you want to be notified about important events.</p>'
    }
  ]
});

Ext.create('Ext.button.Button', {
  text: 'Account Settings',
  handler: function(btn) {
    settingsPanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverSection {
  title: string;
  content: string;
}

interface PopoverWithSectionsProps {
  activatorLabel?: string;
  sections: PopoverSection[];
  sectioned?: boolean;
}

function PopoverWithSections({
  activatorLabel = 'Account Settings',
  sections,
  sectioned = true
}: PopoverWithSectionsProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      sectioned={sectioned}
    >
      {sections.map((section, index) => (
        <Popover.Section key={index} title={section.title}>
          <Text as="p">{section.content}</Text>
        </Popover.Section>
      ))}
    </Popover>
  );
}

// Usage example
const defaultSections: PopoverSection[] = [
  { title: 'Profile', content: 'Manage your profile information and preferences.' },
  { title: 'Security', content: 'Configure security settings and two-factor authentication.' },
  { title: 'Notifications', content: 'Choose how you want to be notified about important events.' }
];

export default PopoverWithSections;`
  },

  withForm: {
    react: `import { Popover, Button, FormLayout, TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function PopoverWithFormExample() {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const toggleActive = () => setActive(!active);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', formData);
    toggleActive();
  }, [formData]);

  const activator = (
    <Button onClick={toggleActive}>
      Quick Add Customer
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      sectioned
    >
      <FormLayout>
        <TextField
          label="Customer Name"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          placeholder="Enter name"
          autoComplete="off"
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="customer@example.com"
          type="email"
          autoComplete="off"
        />
        <Button primary onClick={handleSubmit} fullWidth>
          Add Customer
        </Button>
      </FormLayout>
    </Popover>
  );
}

export default PopoverWithFormExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="addCustomerBtn">Quick Add Customer</button>
  <div class="popover-content" id="formPopover" style="display: none;">
    <form id="customerForm" class="popover-form">
      <div class="form-field">
        <label for="customerName">Customer Name</label>
        <input type="text" id="customerName" placeholder="Enter name" />
      </div>
      <div class="form-field">
        <label for="customerEmail">Email</label>
        <input type="email" id="customerEmail" placeholder="customer@example.com" />
      </div>
      <button type="submit" class="polaris-button primary full-width">
        Add Customer
      </button>
    </form>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-form { padding: 16px; }
.form-field { margin-bottom: 16px; }
.form-field label {
  display: block; margin-bottom: 4px;
  font-size: 14px; font-weight: 500; color: #202223;
}
.form-field input {
  width: 100%; padding: 8px 12px; border: 1px solid #c9cccf;
  border-radius: 6px; font-size: 14px;
}
.form-field input:focus {
  outline: none; border-color: #2c6ecb;
  box-shadow: 0 0 0 1px #2c6ecb;
}
.polaris-button.primary.full-width {
  width: 100%; background: #2c6ecb; color: white;
  padding: 10px; border: none; border-radius: 6px;
  cursor: pointer; font-weight: 500;
}
.polaris-button.primary:hover { background: #1f5199; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('addCustomerBtn');
const popover = document.getElementById('formPopover');
const form = document.getElementById('customerForm');

button.addEventListener('click', () => togglePopover(popover));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById('customerName').value,
    email: document.getElementById('customerEmail').value
  };
  console.log('Form submitted:', formData);
  popover.style.display = 'none';
  form.reset();
});

onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Form in Popover Window
const formWindow = Ext.create('Ext.window.Window', {
  title: 'Quick Add Customer',
  width: 350,
  modal: false,
  floating: true,
  closable: true,
  closeAction: 'hide',
  layout: 'fit',
  items: [{
    xtype: 'form',
    bodyPadding: 16,
    defaults: {
      xtype: 'textfield',
      anchor: '100%',
      labelAlign: 'top'
    },
    items: [{
      fieldLabel: 'Customer Name',
      name: 'name',
      emptyText: 'Enter name',
      allowBlank: false
    }, {
      fieldLabel: 'Email',
      name: 'email',
      vtype: 'email',
      emptyText: 'customer@example.com',
      allowBlank: false
    }],
    buttons: [{
      text: 'Add Customer',
      formBind: true,
      ui: 'primary',
      handler: function() {
        const form = this.up('form').getForm();
        if (form.isValid()) {
          const values = form.getValues();
          console.log('Form submitted:', values);
          formWindow.hide();
          form.reset();
        }
      }
    }]
  }]
});

Ext.create('Ext.button.Button', {
  text: 'Quick Add Customer',
  handler: function(btn) {
    formWindow.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, FormLayout, TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface CustomerFormData {
  name: string;
  email: string;
}

interface PopoverWithFormProps {
  activatorLabel?: string;
  onSubmit: (data: CustomerFormData) => void;
  initialValues?: Partial<CustomerFormData>;
}

function PopoverWithForm({
  activatorLabel = 'Quick Add Customer',
  onSubmit,
  initialValues = { name: '', email: '' }
}: PopoverWithFormProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialValues.name || '',
    email: initialValues.email || '',
  });

  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const handleFieldChange = useCallback((field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (formData.name && formData.email) {
      onSubmit(formData);
      setFormData({ name: '', email: '' });
      toggleActive();
    }
  }, [formData, onSubmit, toggleActive]);

  const isFormValid = formData.name.length > 0 && formData.email.includes('@');

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      sectioned
    >
      <FormLayout>
        <TextField
          label="Customer Name"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          placeholder="Enter name"
          autoComplete="off"
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="customer@example.com"
          type="email"
          autoComplete="off"
        />
        <Button
          primary
          onClick={handleSubmit}
          disabled={!isFormValid}
          fullWidth
        >
          Add Customer
        </Button>
      </FormLayout>
    </Popover>
  );
}

export default PopoverWithForm;`
  },

  dismissible: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function DismissiblePopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Dismissible Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover can be dismissed by:
        </Text>
        <ul>
          <li>Clicking outside the popover</li>
          <li>Pressing the Escape key</li>
          <li>Clicking the close button</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Button plain onClick={toggleActive}>
          Close
        </Button>
      </Popover.Section>
    </Popover>
  );
}

export default DismissiblePopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="dismissibleBtn">Dismissible Popover</button>
  <div class="popover-content" id="dismissiblePopover" style="display: none;">
    <div class="popover-section">
      <p>This popover can be dismissed by:</p>
      <ul>
        <li>Clicking outside the popover</li>
        <li>Pressing the Escape key</li>
        <li>Clicking the close button</li>
      </ul>
    </div>
    <div class="popover-section">
      <button class="plain-button" id="closePopover">Close</button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section ul {
  margin: 8px 0 0 0; padding-left: 20px;
}
.popover-section li {
  margin-bottom: 4px; color: #6d7175;
}
.plain-button {
  background: none; border: none; color: #2c6ecb;
  cursor: pointer; font-size: 14px; padding: 0;
}
.plain-button:hover { text-decoration: underline; }
</style>

<script>
import { togglePopover, onClickOutside, onEscape } from '@cin7/vanilla-js';

const button = document.getElementById('dismissibleBtn');
const popover = document.getElementById('dismissiblePopover');
const closeBtn = document.getElementById('closePopover');

function hidePopover() {
  popover.style.display = 'none';
}

button.addEventListener('click', () => togglePopover(popover));
closeBtn.addEventListener('click', hidePopover);

// Click outside to dismiss
onClickOutside([button, popover], hidePopover);

// Escape key to dismiss
onEscape(hidePopover);
</script>`,

    extjs: `// ExtJS Dismissible Popover
const dismissiblePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 350,
  bodyPadding: 16,
  closable: true,
  closeAction: 'hide',
  border: true,
  shadow: true,
  html: '<p>This popover can be dismissed by:</p>' +
        '<ul>' +
        '<li>Clicking outside the popover</li>' +
        '<li>Pressing the Escape key</li>' +
        '<li>Clicking the close button</li>' +
        '</ul>',
  buttons: [{
    text: 'Close',
    handler: function() {
      dismissiblePanel.hide();
    }
  }],
  listeners: {
    show: function(panel) {
      // Handle Escape key
      Ext.getDoc().on('keydown', function(e) {
        if (e.getKey() === Ext.event.Event.ESC) {
          panel.hide();
        }
      }, null, { single: true });
    }
  }
});

Ext.create('Ext.button.Button', {
  text: 'Dismissible Popover',
  handler: function(btn) {
    dismissiblePanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';

interface DismissiblePopoverProps {
  activatorLabel?: string;
  content?: React.ReactNode;
  onDismiss?: () => void;
}

function DismissiblePopover({
  activatorLabel = 'Dismissible Popover',
  content,
  onDismiss
}: DismissiblePopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setActive(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && active) {
        handleClose();
      }
    };

    if (active) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [active, handleClose]);

  const defaultContent = (
    <>
      <Popover.Section>
        <Text as="p">This popover can be dismissed by:</Text>
        <ul>
          <li>Clicking outside the popover</li>
          <li>Pressing the Escape key</li>
          <li>Clicking the close button</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Button plain onClick={handleClose}>
          Close
        </Button>
      </Popover.Section>
    </>
  );

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={handleClose}
    >
      {content || defaultContent}
    </Popover>
  );
}

export default DismissiblePopover;`
  },

  customWidth: {
    react: `import { Popover, Button, Text, FormLayout } from '@shopify/polaris';
import React, { useState } from 'react';

function CustomWidthPopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Wide Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      fullWidth
      fluidContent
    >
      <Popover.Section>
        <Text as="p">
          This popover uses fullWidth and fluidContent to expand to its natural width.
        </Text>
      </Popover.Section>
      <Popover.Section>
        <FormLayout>
          <Text as="p">
            It's useful for content that needs more space, like forms or detailed information.
          </Text>
          <Button onClick={toggleActive}>Example Button</Button>
        </FormLayout>
      </Popover.Section>
    </Popover>
  );
}

export default CustomWidthPopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="wideBtn">Wide Popover</button>
  <div class="popover-content wide" id="widePopover" style="display: none;">
    <div class="popover-section">
      <p>This popover uses custom width to expand to its natural width.</p>
    </div>
    <div class="popover-section">
      <p>It's useful for content that needs more space, like forms or detailed information.</p>
      <button class="polaris-button">Example Button</button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-content.wide {
  min-width: 400px; max-width: 600px;
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section p {
  margin: 0 0 12px 0; color: #202223; line-height: 1.5;
}
.popover-section p:last-child { margin-bottom: 0; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('wideBtn');
const popover = document.getElementById('widePopover');

button.addEventListener('click', () => togglePopover(popover));
onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Wide Popover Panel
const widePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 500,
  maxWidth: 600,
  bodyPadding: 0,
  border: true,
  shadow: true,
  items: [
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<p>This popover uses custom width to expand to its natural width.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'component',
          html: '<p>It\\'s useful for content that needs more space, like forms or detailed information.</p>',
          margin: '0 0 12 0'
        },
        {
          xtype: 'button',
          text: 'Example Button'
        }
      ]
    }
  ]
});

Ext.create('Ext.button.Button', {
  text: 'Wide Popover',
  handler: function(btn) {
    widePanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, FormLayout, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback, CSSProperties } from 'react';

interface CustomWidthPopoverProps {
  activatorLabel?: string;
  fullWidth?: boolean;
  fluidContent?: boolean;
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
}

function CustomWidthPopover({
  activatorLabel = 'Wide Popover',
  fullWidth = true,
  fluidContent = true,
  minWidth = 400,
  maxWidth = 600,
  children
}: CustomWidthPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const contentStyle: CSSProperties = {
    minWidth: \`\${minWidth}px\`,
    maxWidth: \`\${maxWidth}px\`
  };

  const defaultContent = (
    <>
      <Popover.Section>
        <Text as="p">
          This popover uses fullWidth and fluidContent to expand to its natural width.
        </Text>
      </Popover.Section>
      <Popover.Section>
        <FormLayout>
          <Text as="p">
            It's useful for content that needs more space, like forms or detailed information.
          </Text>
          <Button onClick={toggleActive}>Example Button</Button>
        </FormLayout>
      </Popover.Section>
    </>
  );

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      fullWidth={fullWidth}
      fluidContent={fluidContent}
    >
      <div style={contentStyle}>
        {children || defaultContent}
      </div>
    </Popover>
  );
}

export default CustomWidthPopover;`
  },

  interactiveExamples: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractivePopoverExamples() {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const togglePopover = (popoverName: string) => {
    setActivePopover(activePopover === popoverName ? null : popoverName);
  };

  const handleAction = (action: string) => {
    setMessage(\`Action selected: \${action}\`);
    setActivePopover(null);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f1f2f4',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Popover
          active={activePopover === 'share'}
          activator={<Button onClick={() => togglePopover('share')}>Share</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'Copy link', icon: 'LinkIcon', onAction: () => handleAction('Copy link') },
              { content: 'Email', icon: 'EmailIcon', onAction: () => handleAction('Email') },
              { content: 'Facebook', icon: 'FacebookIcon', onAction: () => handleAction('Facebook') },
              { content: 'Twitter', icon: 'TwitterIcon', onAction: () => handleAction('Twitter') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'filter'}
          activator={<Button onClick={() => togglePopover('filter')}>Filter</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'All orders', onAction: () => handleAction('All orders') },
              { content: 'Pending', onAction: () => handleAction('Pending') },
              { content: 'Completed', onAction: () => handleAction('Completed') },
              { content: 'Cancelled', onAction: () => handleAction('Cancelled') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'sort'}
          activator={<Button onClick={() => togglePopover('sort')}>Sort</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'Date (newest)', onAction: () => handleAction('Date (newest)') },
              { content: 'Date (oldest)', onAction: () => handleAction('Date (oldest)') },
              { content: 'Name (A-Z)', onAction: () => handleAction('Name (A-Z)') },
              { content: 'Name (Z-A)', onAction: () => handleAction('Name (Z-A)') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'more'}
          activator={<Button onClick={() => togglePopover('more')} disclosure>More</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'View details', icon: 'ViewIcon', onAction: () => handleAction('View details') },
              { content: 'Edit', icon: 'EditIcon', onAction: () => handleAction('Edit') },
              { content: 'Duplicate', icon: 'DuplicateIcon', onAction: () => handleAction('Duplicate') },
              { content: 'Delete', icon: 'DeleteIcon', destructive: true, onAction: () => handleAction('Delete') },
            ]}
          />
        </Popover>
      </div>
    </div>
  );
}

export default InteractivePopoverExamples;`,

    vanilla: `<!-- HTML Structure -->
<div class="interactive-demo">
  <div id="messageBox" class="message-box" style="display: none;"></div>

  <div class="popover-group">
    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="share">Share</button>
      <div class="popover-content" id="sharePopover" style="display: none;">
        <button class="action-item" data-action="Copy link">🔗 Copy link</button>
        <button class="action-item" data-action="Email">📧 Email</button>
        <button class="action-item" data-action="Facebook">👥 Facebook</button>
        <button class="action-item" data-action="Twitter">🐦 Twitter</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="filter">Filter</button>
      <div class="popover-content" id="filterPopover" style="display: none;">
        <button class="action-item" data-action="All orders">All orders</button>
        <button class="action-item" data-action="Pending">Pending</button>
        <button class="action-item" data-action="Completed">Completed</button>
        <button class="action-item" data-action="Cancelled">Cancelled</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="sort">Sort</button>
      <div class="popover-content" id="sortPopover" style="display: none;">
        <button class="action-item" data-action="Date (newest)">Date (newest)</button>
        <button class="action-item" data-action="Date (oldest)">Date (oldest)</button>
        <button class="action-item" data-action="Name (A-Z)">Name (A-Z)</button>
        <button class="action-item" data-action="Name (Z-A)">Name (Z-A)</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="more">More ▼</button>
      <div class="popover-content" id="morePopover" style="display: none;">
        <button class="action-item" data-action="View details">👁️ View details</button>
        <button class="action-item" data-action="Edit">✏️ Edit</button>
        <button class="action-item" data-action="Duplicate">📋 Duplicate</button>
        <button class="action-item destructive" data-action="Delete">🗑️ Delete</button>
      </div>
    </div>
  </div>
</div>

<style>
.interactive-demo { display: flex; flex-direction: column; gap: 20px; }
.message-box {
  padding: 12px; background: #f1f2f4; border-radius: 4px;
  text-align: center; font-size: 14px;
}
.popover-group { display: flex; gap: 12px; flex-wrap: wrap; }
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 200px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 8px;
}
.action-item {
  display: block; width: 100%; padding: 10px 12px;
  border: none; background: transparent; text-align: left;
  cursor: pointer; border-radius: 6px; font-size: 14px;
}
.action-item:hover { background: #f6f6f7; }
.action-item.destructive { color: #d72c0d; }
.action-item.destructive:hover { background: #fef3f2; }
</style>

<script>
import { managePopovers } from '@cin7/vanilla-js';

const messageBox = document.getElementById('messageBox');

function showMessage(text) {
  messageBox.textContent = \`Action selected: \${text}\`;
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}

// Setup popover toggles
document.querySelectorAll('[data-popover]').forEach(button => {
  const popoverId = button.dataset.popover + 'Popover';
  const popover = document.getElementById(popoverId);

  button.addEventListener('click', () => {
    // Close all other popovers
    document.querySelectorAll('.popover-content').forEach(p => {
      if (p !== popover) p.style.display = 'none';
    });
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  });
});

// Setup action handlers
document.querySelectorAll('.action-item').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    showMessage(action);
    document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
  });
});

// Click outside to close
document.addEventListener('click', (e) => {
  if (!e.target.closest('.popover-wrapper')) {
    document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
  }
});
</script>`,

    extjs: `// ExtJS Interactive Popovers Example
Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      itemId: 'messageBox',
      hidden: true,
      padding: 12,
      style: 'background: #f1f2f4; border-radius: 4px; text-align: center;',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      defaults: { margin: '0 12 0 0' },
      items: [
        {
          xtype: 'button',
          text: 'Share',
          menu: {
            items: [
              { text: 'Copy link', iconCls: 'x-fa fa-link', handler: function() { showMessage('Copy link'); } },
              { text: 'Email', iconCls: 'x-fa fa-envelope', handler: function() { showMessage('Email'); } },
              { text: 'Facebook', iconCls: 'x-fa fa-facebook', handler: function() { showMessage('Facebook'); } },
              { text: 'Twitter', iconCls: 'x-fa fa-twitter', handler: function() { showMessage('Twitter'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'Filter',
          menu: {
            items: [
              { text: 'All orders', handler: function() { showMessage('All orders'); } },
              { text: 'Pending', handler: function() { showMessage('Pending'); } },
              { text: 'Completed', handler: function() { showMessage('Completed'); } },
              { text: 'Cancelled', handler: function() { showMessage('Cancelled'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'Sort',
          menu: {
            items: [
              { text: 'Date (newest)', handler: function() { showMessage('Date (newest)'); } },
              { text: 'Date (oldest)', handler: function() { showMessage('Date (oldest)'); } },
              { text: 'Name (A-Z)', handler: function() { showMessage('Name (A-Z)'); } },
              { text: 'Name (Z-A)', handler: function() { showMessage('Name (Z-A)'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'More',
          iconCls: 'x-fa fa-chevron-down',
          menu: {
            items: [
              { text: 'View details', iconCls: 'x-fa fa-eye', handler: function() { showMessage('View details'); } },
              { text: 'Edit', iconCls: 'x-fa fa-edit', handler: function() { showMessage('Edit'); } },
              { text: 'Duplicate', iconCls: 'x-fa fa-copy', handler: function() { showMessage('Duplicate'); } },
              '-',
              { text: 'Delete', iconCls: 'x-fa fa-trash', cls: 'destructive', handler: function() { showMessage('Delete'); } }
            ]
          }
        }
      ]
    }
  ]
});

function showMessage(action) {
  const msgBox = Ext.ComponentQuery.query('#messageBox')[0];
  msgBox.setHtml('Action selected: ' + action);
  msgBox.show();
  Ext.defer(function() {
    msgBox.hide();
  }, 3000);
}`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type PopoverConfig = {
  id: string;
  label: string;
  items: ActionListItemDescriptor[];
  disclosure?: boolean;
};

function InteractivePopoverExamples(): JSX.Element {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const togglePopover = useCallback((popoverId: string) => {
    setActivePopover((current) => current === popoverId ? null : popoverId);
  }, []);

  const handleAction = useCallback((action: string) => {
    setMessage(\`Action selected: \${action}\`);
    setActivePopover(null);
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, []);

  const popovers: PopoverConfig[] = [
    {
      id: 'share',
      label: 'Share',
      items: [
        { content: 'Copy link', icon: 'LinkIcon', onAction: () => handleAction('Copy link') },
        { content: 'Email', icon: 'EmailIcon', onAction: () => handleAction('Email') },
        { content: 'Facebook', icon: 'FacebookIcon', onAction: () => handleAction('Facebook') },
        { content: 'Twitter', icon: 'TwitterIcon', onAction: () => handleAction('Twitter') },
      ]
    },
    {
      id: 'filter',
      label: 'Filter',
      items: [
        { content: 'All orders', onAction: () => handleAction('All orders') },
        { content: 'Pending', onAction: () => handleAction('Pending') },
        { content: 'Completed', onAction: () => handleAction('Completed') },
        { content: 'Cancelled', onAction: () => handleAction('Cancelled') },
      ]
    },
    {
      id: 'sort',
      label: 'Sort',
      items: [
        { content: 'Date (newest)', onAction: () => handleAction('Date (newest)') },
        { content: 'Date (oldest)', onAction: () => handleAction('Date (oldest)') },
        { content: 'Name (A-Z)', onAction: () => handleAction('Name (A-Z)') },
        { content: 'Name (Z-A)', onAction: () => handleAction('Name (Z-A)') },
      ]
    },
    {
      id: 'more',
      label: 'More',
      disclosure: true,
      items: [
        { content: 'View details', icon: 'ViewIcon', onAction: () => handleAction('View details') },
        { content: 'Edit', icon: 'EditIcon', onAction: () => handleAction('Edit') },
        { content: 'Duplicate', icon: 'DuplicateIcon', onAction: () => handleAction('Duplicate') },
        { content: 'Delete', icon: 'DeleteIcon', destructive: true, onAction: () => handleAction('Delete') },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f1f2f4',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {popovers.map((popover) => (
          <Popover
            key={popover.id}
            active={activePopover === popover.id}
            activator={
              <Button
                onClick={() => togglePopover(popover.id)}
                disclosure={popover.disclosure}
              >
                {popover.label}
              </Button>
            }
            onClose={() => setActivePopover(null)}
          >
            <ActionList items={popover.items} />
          </Popover>
        ))}
      </div>
    </div>
  );
}

export default InteractivePopoverExamples;`
  },

  accessibility: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function AccessibilityPopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive} ariaLabel="Open accessibility features menu">
      Accessibility Options
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      preferredPosition="below"
      autofocusTarget="first-node"
    >
      <Popover.Section>
        <Text as="p">
          This popover includes accessibility features:
        </Text>
        <ul>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Focus management</li>
          <li>Screen reader announcements</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Text as="p">
          <strong>Keyboard shortcuts:</strong><br />
          Tab/Shift+Tab: Navigate<br />
          Enter/Space: Select<br />
          Escape: Close popover
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default AccessibilityPopoverExample;`,

    vanilla: `<!-- HTML Structure with Accessibility -->
<div class="popover-wrapper">
  <button
    class="polaris-button"
    id="a11yBtn"
    aria-label="Open accessibility features menu"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Accessibility Options
  </button>
  <div
    class="popover-content"
    id="a11yPopover"
    role="dialog"
    aria-label="Accessibility options"
    style="display: none;"
  >
    <div class="popover-section">
      <p>This popover includes accessibility features:</p>
      <ul>
        <li>Proper ARIA attributes</li>
        <li>Keyboard navigation support</li>
        <li>Focus management</li>
        <li>Screen reader announcements</li>
      </ul>
    </div>
    <div class="popover-section">
      <p><strong>Keyboard shortcuts:</strong></p>
      <p>Tab/Shift+Tab: Navigate<br />
      Enter/Space: Select<br />
      Escape: Close popover</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 350px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section ul { margin: 8px 0 0 0; padding-left: 20px; }
.popover-section li { margin-bottom: 4px; }
</style>

<script>
import {
  togglePopover,
  onClickOutside,
  manageFocus,
  announceToScreenReader
} from '@cin7/vanilla-js';

const button = document.getElementById('a11yBtn');
const popover = document.getElementById('a11yPopover');

let isOpen = false;

function openPopover() {
  popover.style.display = 'block';
  button.setAttribute('aria-expanded', 'true');
  manageFocus(popover); // Focus first focusable element
  announceToScreenReader('Accessibility options menu opened');
  isOpen = true;
}

function closePopover() {
  popover.style.display = 'none';
  button.setAttribute('aria-expanded', 'false');
  button.focus(); // Return focus to activator
  announceToScreenReader('Accessibility options menu closed');
  isOpen = false;
}

button.addEventListener('click', () => {
  if (isOpen) {
    closePopover();
  } else {
    openPopover();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!isOpen) return;

  if (e.key === 'Escape') {
    closePopover();
  } else if (e.key === 'Tab') {
    // Trap focus within popover
    const focusable = popover.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

onClickOutside([button, popover], closePopover);
</script>`,

    extjs: `// ExtJS Accessible Popover
const accessiblePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 380,
  bodyPadding: 16,
  border: true,
  shadow: true,
  focusOnToFront: true,
  ariaLabel: 'Accessibility options',
  html: '<p>This popover includes accessibility features:</p>' +
        '<ul>' +
        '<li>Proper ARIA attributes</li>' +
        '<li>Keyboard navigation support</li>' +
        '<li>Focus management</li>' +
        '<li>Screen reader announcements</li>' +
        '</ul>' +
        '<hr style="margin: 16px 0; border: none; border-top: 1px solid #e1e3e5;" />' +
        '<p><strong>Keyboard shortcuts:</strong></p>' +
        '<p>Tab/Shift+Tab: Navigate<br />' +
        'Enter/Space: Select<br />' +
        'Escape: Close popover</p>',
  listeners: {
    show: function(panel) {
      // Focus management
      panel.focus();

      // Keyboard handler
      panel.getEl().on('keydown', function(e) {
        if (e.getKey() === Ext.event.Event.ESC) {
          panel.hide();
        }
      });
    },
    hide: function() {
      // Return focus to activator
      Ext.getCmp('a11yButton').focus();
    }
  }
});

Ext.create('Ext.button.Button', {
  id: 'a11yButton',
  text: 'Accessibility Options',
  ariaLabel: 'Open accessibility features menu',
  handler: function(btn) {
    if (accessiblePanel.isVisible()) {
      accessiblePanel.hide();
    } else {
      accessiblePanel.showBy(btn, 'tl-bl?');
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface AccessibilityPopoverProps {
  activatorLabel?: string;
  ariaLabel?: string;
  preferredPosition?: PopoverProps['preferredPosition'];
  autofocusTarget?: PopoverProps['autofocusTarget'];
}

function AccessibilityPopover({
  activatorLabel = 'Accessibility Options',
  ariaLabel = 'Open accessibility features menu',
  preferredPosition = 'below',
  autofocusTarget = 'first-node'
}: AccessibilityPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const activatorRef = useRef<HTMLButtonElement>(null);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  // Announce to screen readers
  useEffect(() => {
    if (active) {
      announceToScreenReader('Accessibility options menu opened');
    } else if (activatorRef.current && !active) {
      // Return focus to activator when closed
      activatorRef.current.focus();
      announceToScreenReader('Accessibility options menu closed');
    }
  }, [active]);

  // Screen reader announcement helper
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <Popover
      active={active}
      activator={
        <Button
          ref={activatorRef}
          onClick={toggleActive}
          ariaLabel={ariaLabel}
        >
          {activatorLabel}
        </Button>
      }
      onClose={toggleActive}
      preferredPosition={preferredPosition}
      autofocusTarget={autofocusTarget}
    >
      <Popover.Section>
        <Text as="p">This popover includes accessibility features:</Text>
        <ul>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Focus management</li>
          <li>Screen reader announcements</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Text as="p">
          <strong>Keyboard shortcuts:</strong><br />
          Tab/Shift+Tab: Navigate<br />
          Enter/Space: Select<br />
          Escape: Close popover
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default AccessibilityPopover;`
  },
};

// Tooltip Component Examples

export const tooltipExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

function TooltipExample() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip content="This is helpful tooltip text">
        <Button>Hover over me</Button>
      </Tooltip>
    </div>
  );
}

export default TooltipExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="padding: 40px;">
  <div class="tooltip-wrapper">
    <button id="tooltipTrigger" class="polaris-button">Hover over me</button>
    <div class="tooltip" id="tooltip">
      This is helpful tooltip text
    </div>
  </div>
</div>

<style>
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; bottom: 100%; left: 50%;
  transform: translateX(-50%); margin-bottom: 8px;
  padding: 8px 12px; background: #333; color: white;
  font-size: 14px; border-radius: 4px; white-space: nowrap;
  pointer-events: none; z-index: 1000; opacity: 0;
  visibility: hidden; transition: opacity 0.2s, visibility 0.2s;
}
.tooltip.visible { opacity: 1; visibility: visible; }
.tooltip::after {
  content: ''; position: absolute; top: 100%; left: 50%;
  transform: translateX(-50%); border: 4px solid transparent;
  border-top-color: #333;
}
</style>

<script>
import { on, addClass, removeClass } from '@cin7/vanilla-js';

const trigger = document.getElementById('tooltipTrigger');
const tooltip = document.getElementById('tooltip');

on(trigger, 'mouseenter', () => addClass(tooltip, 'visible'));
on(trigger, 'mouseleave', () => removeClass(tooltip, 'visible'));
on(trigger, 'focus', () => addClass(tooltip, 'visible'));
on(trigger, 'blur', () => removeClass(tooltip, 'visible'));
</script>`,

    extjs: `// ExtJS Tooltip with Button
Ext.create('Ext.button.Button', {
  text: 'Hover over me',
  tooltip: 'This is helpful tooltip text',
  renderTo: Ext.getBody(),
  margin: '40'
});

// Advanced tooltip with custom configuration
Ext.create('Ext.button.Button', {
  text: 'Hover over me',
  renderTo: Ext.getBody(),
  margin: '40',
  listeners: {
    render: function(btn) {
      Ext.create('Ext.tip.ToolTip', {
        target: btn.el,
        html: 'This is helpful tooltip text',
        anchor: 'bottom',
        showDelay: 100,
        dismissDelay: 5000
      });
    }
  }
});`,

    typescript: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

interface TooltipExampleProps {
  content: string;
  children?: React.ReactNode;
  preferredPosition?: 'above' | 'below' | 'mostSpace';
  preferredAlignment?: 'left' | 'center' | 'right';
}

function TooltipExample({
  content = 'This is helpful tooltip text',
  children = <Button>Hover over me</Button>,
  preferredPosition = 'above',
  preferredAlignment = 'center'
}: TooltipExampleProps): JSX.Element {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip
        content={content}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
      >
        {children}
      </Tooltip>
    </div>
  );
}

export default TooltipExample;`,
  },

  withText: {
    react: `import { Tooltip } from '@shopify/polaris';
import React from 'react';

function TextTooltipExample() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip content="Click here to view detailed order information and tracking status">
        <span style={{
          textDecoration: 'underline',
          cursor: 'help',
          color: '#007ace'
        }}>
          Order details
        </span>
      </Tooltip>
    </div>
  );
}

export default TextTooltipExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="padding: 40px;">
  <div class="tooltip-wrapper">
    <span id="orderDetails" class="tooltip-text-trigger">
      Order details
    </span>
    <div class="tooltip" id="orderTooltip">
      Click here to view detailed order information and tracking status
    </div>
  </div>
</div>

<style>
.tooltip-text-trigger {
  text-decoration: underline; cursor: help; color: #007ace;
}
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; bottom: 100%; left: 50%;
  transform: translateX(-50%); margin-bottom: 8px;
  padding: 8px 12px; background: #333; color: white;
  font-size: 14px; border-radius: 4px; max-width: 300px;
  pointer-events: none; z-index: 1000; opacity: 0;
  visibility: hidden; transition: opacity 0.2s;
}
.tooltip.visible { opacity: 1; visibility: visible; }
</style>

<script>
import { on, addClass, removeClass } from '@cin7/vanilla-js';

const trigger = document.getElementById('orderDetails');
const tooltip = document.getElementById('orderTooltip');

on(trigger, 'mouseenter', () => addClass(tooltip, 'visible'));
on(trigger, 'mouseleave', () => removeClass(tooltip, 'visible'));
</script>`,

    extjs: `// ExtJS Tooltip on Text Element
Ext.onReady(function() {
  const container = Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    padding: 40,
    html: '<span id="orderDetails" style="text-decoration: underline; cursor: help; color: #007ace;">Order details</span>'
  });

  Ext.create('Ext.tip.ToolTip', {
    target: 'orderDetails',
    html: 'Click here to view detailed order information and tracking status',
    anchor: 'bottom',
    width: 300
  });
});`,

    typescript: `import { Tooltip } from '@shopify/polaris';
import React from 'react';

interface TextTooltipProps {
  content: string;
  text: string;
  href?: string;
}

function TextTooltipExample({
  content = 'Click here to view detailed order information and tracking status',
  text = 'Order details',
  href
}: TextTooltipProps): JSX.Element {
  const textStyle: React.CSSProperties = {
    textDecoration: 'underline',
    cursor: 'help',
    color: '#007ace'
  };

  return (
    <div style={{ padding: '40px' }}>
      <Tooltip content={content}>
        {href ? (
          <a href={href} style={textStyle}>{text}</a>
        ) : (
          <span style={textStyle}>{text}</span>
        )}
      </Tooltip>
    </div>
  );
}

export default TextTooltipExample;`,
  },

  withIcon: {
    react: `import { Tooltip } from '@shopify/polaris';
import React from 'react';

function IconTooltipExample() {
  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="This product is currently out of stock">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>⚠️</span>
        </div>
      </Tooltip>

      <Tooltip content="Information verified and confirmed">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>✅</span>
        </div>
      </Tooltip>

      <Tooltip content="Requires immediate attention">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>🔔</span>
        </div>
      </Tooltip>

      <Tooltip content="Help and documentation">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>❓</span>
        </div>
      </Tooltip>
    </div>
  );
}

export default IconTooltipExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="padding: 40px; display: flex; gap: 20px; align-items: center;">
  <div class="tooltip-wrapper">
    <div class="icon-wrapper" data-tooltip="out-of-stock">⚠️</div>
    <div class="tooltip" id="tooltip-1">This product is currently out of stock</div>
  </div>

  <div class="tooltip-wrapper">
    <div class="icon-wrapper" data-tooltip="verified">✅</div>
    <div class="tooltip" id="tooltip-2">Information verified and confirmed</div>
  </div>

  <div class="tooltip-wrapper">
    <div class="icon-wrapper" data-tooltip="attention">🔔</div>
    <div class="tooltip" id="tooltip-3">Requires immediate attention</div>
  </div>

  <div class="tooltip-wrapper">
    <div class="icon-wrapper" data-tooltip="help">❓</div>
    <div class="tooltip" id="tooltip-4">Help and documentation</div>
  </div>
</div>

<style>
.icon-wrapper { display: flex; align-items: center; cursor: help; }
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; bottom: 100%; left: 50%;
  transform: translateX(-50%); margin-bottom: 8px;
  padding: 8px 12px; background: #333; color: white;
  font-size: 14px; border-radius: 4px; white-space: nowrap;
  pointer-events: none; z-index: 1000; opacity: 0;
  visibility: hidden; transition: opacity 0.2s;
}
.tooltip.visible { opacity: 1; visibility: visible; }
</style>

<script>
import { on, addClass, removeClass } from '@cin7/vanilla-js';

document.querySelectorAll('.icon-wrapper').forEach((icon, index) => {
  const tooltip = document.getElementById(\`tooltip-\${index + 1}\`);
  on(icon, 'mouseenter', () => addClass(tooltip, 'visible'));
  on(icon, 'mouseleave', () => removeClass(tooltip, 'visible'));
});
</script>`,

    extjs: `// ExtJS Icon Tooltips
Ext.onReady(function() {
  const icons = [
    { html: '⚠️', tooltip: 'This product is currently out of stock' },
    { html: '✅', tooltip: 'Information verified and confirmed' },
    { html: '🔔', tooltip: 'Requires immediate attention' },
    { html: '❓', tooltip: 'Help and documentation' }
  ];

  const container = Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: 'hbox',
    padding: 40,
    defaults: { margin: '0 10 0 0' },
    items: icons.map((icon, index) => ({
      xtype: 'component',
      itemId: 'icon' + index,
      html: \`<div style="display: flex; align-items: center; cursor: help;">\${icon.html}</div>\`,
      listeners: {
        render: function(cmp) {
          Ext.create('Ext.tip.ToolTip', {
            target: cmp.el,
            html: icon.tooltip
          });
        }
      }
    }))
  });
});`,

    typescript: `import { Tooltip } from '@shopify/polaris';
import React from 'react';

interface IconTooltipItem {
  icon: string;
  content: string;
}

interface IconTooltipExampleProps {
  icons?: IconTooltipItem[];
}

function IconTooltipExample({
  icons = [
    { icon: '⚠️', content: 'This product is currently out of stock' },
    { icon: '✅', content: 'Information verified and confirmed' },
    { icon: '🔔', content: 'Requires immediate attention' },
    { icon: '❓', content: 'Help and documentation' }
  ]
}: IconTooltipExampleProps): JSX.Element {
  return (
    <div style={{
      padding: '40px',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}>
      {icons.map((item, index) => (
        <Tooltip key={index} content={item.content}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{item.icon}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

export default IconTooltipExample;`,
  }
};

// Sheet Component Examples

export const sheetExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Sheet, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function SheetExample() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <>
      <Button onClick={toggle}>Open sheet</Button>
      <Sheet open={open} onClose={toggle} accessibilityLabel="Filter products">
        <div style={{ padding: '20px' }}>
          <Text as="h2" variant="headingMd">Sheet content</Text>
          <Text as="p">Slide-in panel for forms, filters, or other content.</Text>
        </div>
      </Sheet>
    </>
  );
}

export default SheetExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="openSheet">Open sheet</button>
<div class="sheet-backdrop" id="backdrop" style="display: none;"></div>
<div class="sheet" id="sheet" style="display: none;">
  <div class="sheet-header">
    <h2>Sheet content</h2>
    <button id="closeSheet">×</button>
  </div>
  <div class="sheet-body">
    <p>Slide-in panel for forms, filters, or other content.</p>
  </div>
</div>

<style>
.sheet-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 999;
}
.sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
  background: white; box-shadow: -2px 0 8px rgba(0,0,0,0.2);
  z-index: 1000; animation: slideIn 0.3s;
}
.sheet-header {
  display: flex; justify-content: space-between;
  padding: 16px; border-bottom: 1px solid #ccc;
}
.sheet-body { padding: 20px; overflow-y: auto; }
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>

<script>
const openBtn = document.getElementById('openSheet');
const closeBtn = document.getElementById('closeSheet');
const sheet = document.getElementById('sheet');
const backdrop = document.getElementById('backdrop');

function open() {
  sheet.style.display = 'block';
  backdrop.style.display = 'block';
}

function close() {
  sheet.style.display = 'none';
  backdrop.style.display = 'none';
}

openBtn.addEventListener('click', open);
closeBtn.addEventListener('click', close);
backdrop.addEventListener('click', close);
</script>`,

    extjs: `// ExtJS Sliding Panel
const sheet = Ext.create('Ext.panel.Panel', {
  title: 'Sheet content',
  floating: true,
  closable: true,
  width: 400,
  height: '100%',
  bodyPadding: 20,
  html: 'Slide-in panel for forms, filters, or other content.',
  x: Ext.Element.getViewportWidth(),
  y: 0,
  listeners: {
    beforeshow: function(panel) {
      panel.animate({
        duration: 300,
        to: { x: Ext.Element.getViewportWidth() - 400 }
      });
    }
  }
});

Ext.create('Ext.button.Button', {
  text: 'Open sheet',
  handler: () => sheet.show(),
  renderTo: Ext.getBody()
});`,

    typescript: `import { Sheet, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface SheetExampleProps {
  title?: string;
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

function SheetExample({
  title = 'Sheet content',
  children,
  onOpen,
  onClose
}: SheetExampleProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    const newState = !open;
    setOpen(newState);
    if (newState && onOpen) onOpen();
    if (!newState && onClose) onClose();
  }, [open, onOpen, onClose]);

  return (
    <>
      <Button onClick={toggle}>Open sheet</Button>
      <Sheet open={open} onClose={toggle} accessibilityLabel="Sheet panel">
        <div style={{ padding: '20px' }}>
          <Text as="h2" variant="headingMd">{title}</Text>
          {children || <Text as="p">Slide-in panel for forms, filters, or other content.</Text>}
        </div>
      </Sheet>
    </>
  );
}

export default SheetExample;`,
  }
};

// Basic Components Examples
