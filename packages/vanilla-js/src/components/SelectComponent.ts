import { Component, ComponentOptions, EventListener } from './Component';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectOptions extends ComponentOptions {
  label: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  onChange?: EventListener<string>;
  onFocus?: EventListener<FocusEvent>;
  onBlur?: EventListener<FocusEvent>;
}

/**
 * SelectComponent - A reusable select dropdown component
 * 
 * @example
 * const select = new SelectComponent({
 *   label: 'Country',
 *   options: [
 *     { label: 'United States', value: 'US' },
 *     { label: 'Canada', value: 'CA' },
 *     { label: 'Mexico', value: 'MX' }
 *   ],
 *   value: 'US',
 *   onChange: (value) => console.log('Selected:', value)
 * });
 * select.mount('#app');
 */
export class SelectComponent extends Component<string> {
  private select: HTMLSelectElement;
  private labelElement: HTMLLabelElement;
  private errorElement?: HTMLElement;
  private helpTextElement?: HTMLElement;
  private options: SelectOptions;

  constructor(options: SelectOptions) {
    super(options);
    this.options = options;
    
    // Populate options
    this.setOptions(options.options);
    
    // Set initial value
    if (options.value !== undefined) {
      this.set(options.value);
    }
    
    // Register callbacks
    if (options.onChange) {
      this.on('change', options.onChange);
    }
    if (options.onFocus) {
      this.on('focus', options.onFocus);
    }
    if (options.onBlur) {
      this.on('blur', options.onBlur);
    }
    
    // Set initial error state
    if (options.error) {
      this.setError(options.error);
    }
  }

  protected createElement(): HTMLElement {
    // Create container
    const container = document.createElement('div');
    container.className = 'select-field';
    
    // Create unique ID
    const id = `select-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create label
    this.labelElement = document.createElement('label');
    this.labelElement.className = 'select-field__label';
    this.labelElement.htmlFor = id;
    this.labelElement.textContent = this.options.label;
    if (this.options.required) {
      const required = document.createElement('span');
      required.className = 'select-field__required';
      required.textContent = ' *';
      required.setAttribute('aria-label', 'required');
      this.labelElement.appendChild(required);
    }
    
    // Create select wrapper
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'select-field__wrapper';
    
    // Create select
    this.select = document.createElement('select');
    this.select.id = id;
    this.select.className = 'select-field__select';
    
    if (this.options.required) {
      this.select.required = true;
      this.select.setAttribute('aria-required', 'true');
    }
    
    // Add placeholder option if provided
    if (this.options.placeholder) {
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = this.options.placeholder;
      placeholderOption.disabled = true;
      if (!this.options.value) {
        placeholderOption.selected = true;
      }
      this.select.appendChild(placeholderOption);
    }
    
    // Create dropdown icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'select-field__icon');
    icon.setAttribute('viewBox', '0 0 20 20');
    icon.setAttribute('aria-hidden', 'true');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z');
    path.setAttribute('fill', 'currentColor');
    
    icon.appendChild(path);
    
    selectWrapper.appendChild(this.select);
    selectWrapper.appendChild(icon);
    
    // Create help text
    if (this.options.helpText) {
      this.helpTextElement = document.createElement('div');
      this.helpTextElement.className = 'select-field__help-text';
      this.helpTextElement.textContent = this.options.helpText;
      this.helpTextElement.id = `${id}-help`;
      this.select.setAttribute('aria-describedby', this.helpTextElement.id);
    }
    
    // Create error element (hidden by default)
    this.errorElement = document.createElement('div');
    this.errorElement.className = 'select-field__error';
    this.errorElement.id = `${id}-error`;
    this.errorElement.setAttribute('role', 'alert');
    this.errorElement.style.display = 'none';
    
    // Assemble elements
    container.appendChild(this.labelElement);
    container.appendChild(selectWrapper);
    if (this.helpTextElement) {
      container.appendChild(this.helpTextElement);
    }
    container.appendChild(this.errorElement);
    
    return container;
  }

  protected init(): void {
    // Add event listeners
    this.select.addEventListener('change', this.handleChange.bind(this));
    this.select.addEventListener('focus', this.handleFocus.bind(this));
    this.select.addEventListener('blur', this.handleBlur.bind(this));
  }

  private handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.emit('change', value);
  }

  private handleFocus(event: FocusEvent): void {
    this.element.classList.add('select-field--focused');
    this.emit('focus', event);
  }

  private handleBlur(event: FocusEvent): void {
    this.element.classList.remove('select-field--focused');
    this.emit('blur', event);
  }

  /**
   * Get the current value
   */
  get(): string {
    return this.select.value;
  }

  /**
   * Set the value
   */
  set(value: string): void {
    this.select.value = value;
    
    // Trigger change event
    const event = new Event('change', { bubbles: true });
    this.select.dispatchEvent(event);
  }

  /**
   * Set options
   */
  setOptions(options: SelectOption[]): void {
    // Clear existing options except placeholder
    const placeholder = this.select.querySelector('option[value=""]');
    this.select.innerHTML = '';
    
    // Re-add placeholder if it existed
    if (placeholder) {
      this.select.appendChild(placeholder);
    }
    
    // Add new options
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      if (option.disabled) {
        optionElement.disabled = true;
      }
      this.select.appendChild(optionElement);
    });
  }

  /**
   * Get all options
   */
  getOptions(): SelectOption[] {
    const options: SelectOption[] = [];
    const optionElements = this.select.querySelectorAll('option');
    
    optionElements.forEach(option => {
      // Skip placeholder option
      if (option.value) {
        options.push({
          label: option.textContent || '',
          value: option.value,
          disabled: option.disabled
        });
      }
    });
    
    return options;
  }

  /**
   * Add an option
   */
  addOption(option: SelectOption, index?: number): void {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    if (option.disabled) {
      optionElement.disabled = true;
    }
    
    if (index !== undefined && index >= 0) {
      const referenceOption = this.select.options[index];
      if (referenceOption) {
        this.select.insertBefore(optionElement, referenceOption);
      } else {
        this.select.appendChild(optionElement);
      }
    } else {
      this.select.appendChild(optionElement);
    }
  }

  /**
   * Remove an option by value
   */
  removeOption(value: string): void {
    const option = this.select.querySelector(`option[value="${value}"]`);
    if (option) {
      option.remove();
    }
  }

  /**
   * Set error message
   */
  setError(error: string | null): void {
    if (error && this.errorElement) {
      this.errorElement.textContent = error;
      this.errorElement.style.display = 'block';
      this.element.classList.add('select-field--error');
      this.select.setAttribute('aria-invalid', 'true');
      this.select.setAttribute('aria-describedby', 
        `${this.errorElement.id} ${this.helpTextElement?.id || ''}`.trim()
      );
    } else if (this.errorElement) {
      this.errorElement.textContent = '';
      this.errorElement.style.display = 'none';
      this.element.classList.remove('select-field--error');
      this.select.removeAttribute('aria-invalid');
      if (this.helpTextElement) {
        this.select.setAttribute('aria-describedby', this.helpTextElement.id);
      } else {
        this.select.removeAttribute('aria-describedby');
      }
    }
  }

  /**
   * Get error message
   */
  getError(): string | null {
    return this.errorElement?.textContent || null;
  }

  /**
   * Clear error
   */
  clearError(): void {
    this.setError(null);
  }

  /**
   * Set help text
   */
  setHelpText(helpText: string | null): void {
    if (this.helpTextElement) {
      if (helpText) {
        this.helpTextElement.textContent = helpText;
        this.helpTextElement.style.display = 'block';
      } else {
        this.helpTextElement.textContent = '';
        this.helpTextElement.style.display = 'none';
      }
    }
  }

  /**
   * Update the label
   */
  setLabel(label: string): void {
    const textNode = this.labelElement.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = label;
    }
  }

  /**
   * Get the label
   */
  getLabel(): string {
    const textNode = this.labelElement.firstChild;
    return textNode?.textContent || '';
  }

  /**
   * Set required state
   */
  setRequired(required: boolean): void {
    this.select.required = required;
    this.select.setAttribute('aria-required', required.toString());
    
    // Update label
    const requiredSpan = this.labelElement.querySelector('.select-field__required');
    if (required && !requiredSpan) {
      const span = document.createElement('span');
      span.className = 'select-field__required';
      span.textContent = ' *';
      span.setAttribute('aria-label', 'required');
      this.labelElement.appendChild(span);
    } else if (!required && requiredSpan) {
      requiredSpan.remove();
    }
  }

  /**
   * Check if field is valid
   */
  isValid(): boolean {
    return this.select.checkValidity();
  }

  /**
   * Validate and show validation message
   */
  validate(): boolean {
    const isValid = this.isValid();
    if (!isValid) {
      this.setError(this.select.validationMessage);
    } else {
      this.clearError();
    }
    return isValid;
  }

  /**
   * Override setDisabled
   */
  setDisabled(disabled: boolean): void {
    super.setDisabled(disabled);
    this.select.disabled = disabled;
  }

  /**
   * Focus the select
   */
  focus(): void {
    this.select.focus();
  }

  /**
   * Blur the select
   */
  blur(): void {
    this.select.blur();
  }

  /**
   * Get selected option details
   */
  getSelectedOption(): SelectOption | null {
    const selectedOption = this.select.selectedOptions[0];
    if (selectedOption && selectedOption.value) {
      return {
        label: selectedOption.textContent || '',
        value: selectedOption.value,
        disabled: selectedOption.disabled
      };
    }
    return null;
  }
}