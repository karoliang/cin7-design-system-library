import { Component, ComponentOptions, EventListener } from './Component';

export interface TextFieldOptions extends ComponentOptions {
  label: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  required?: boolean;
  autoComplete?: string;
  helpText?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  onChange?: EventListener<string>;
  onFocus?: EventListener<FocusEvent>;
  onBlur?: EventListener<FocusEvent>;
  onInput?: EventListener<string>;
}

/**
 * TextFieldComponent - A reusable text input component
 * 
 * @example
 * const textField = new TextFieldComponent({
 *   label: 'Email',
 *   type: 'email',
 *   placeholder: 'you@example.com',
 *   required: true,
 *   onChange: (value) => console.log('Value:', value)
 * });
 * textField.mount('#app');
 */
export class TextFieldComponent extends Component<string> {
  private input: HTMLInputElement | HTMLTextAreaElement;
  private labelElement: HTMLLabelElement;
  private errorElement?: HTMLElement;
  private helpTextElement?: HTMLElement;
  private options: TextFieldOptions;

  constructor(options: TextFieldOptions) {
    super(options);
    this.options = options;
    
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
    if (options.onInput) {
      this.on('input', options.onInput);
    }
    
    // Set initial error state
    if (options.error) {
      this.setError(options.error);
    }
  }

  protected createElement(): HTMLElement {
    // Create container
    const container = document.createElement('div');
    container.className = 'text-field';
    
    // Create unique ID
    const id = `text-field-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create label
    this.labelElement = document.createElement('label');
    this.labelElement.className = 'text-field__label';
    this.labelElement.htmlFor = id;
    this.labelElement.textContent = this.options.label;
    if (this.options.required) {
      const required = document.createElement('span');
      required.className = 'text-field__required';
      required.textContent = ' *';
      required.setAttribute('aria-label', 'required');
      this.labelElement.appendChild(required);
    }
    
    // Create input wrapper
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'text-field__input-wrapper';
    
    // Add prefix if provided
    if (this.options.prefix) {
      const prefix = document.createElement('span');
      prefix.className = 'text-field__prefix';
      prefix.textContent = this.options.prefix;
      inputWrapper.appendChild(prefix);
    }
    
    // Create input or textarea
    if (this.options.multiline) {
      this.input = document.createElement('textarea');
      this.input.rows = this.options.rows || 4;
    } else {
      this.input = document.createElement('input');
      this.input.type = this.options.type || 'text';
    }
    
    this.input.id = id;
    this.input.className = 'text-field__input';
    
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    }
    
    if (this.options.required) {
      this.input.required = true;
      this.input.setAttribute('aria-required', 'true');
    }
    
    if (this.options.autoComplete) {
      this.input.setAttribute('autocomplete', this.options.autoComplete);
    }
    
    if (this.options.maxLength) {
      this.input.maxLength = this.options.maxLength;
    }
    
    inputWrapper.appendChild(this.input);
    
    // Add suffix if provided
    if (this.options.suffix) {
      const suffix = document.createElement('span');
      suffix.className = 'text-field__suffix';
      suffix.textContent = this.options.suffix;
      inputWrapper.appendChild(suffix);
    }
    
    // Create help text
    if (this.options.helpText) {
      this.helpTextElement = document.createElement('div');
      this.helpTextElement.className = 'text-field__help-text';
      this.helpTextElement.textContent = this.options.helpText;
      this.helpTextElement.id = `${id}-help`;
      this.input.setAttribute('aria-describedby', this.helpTextElement.id);
    }
    
    // Create error element (hidden by default)
    this.errorElement = document.createElement('div');
    this.errorElement.className = 'text-field__error';
    this.errorElement.id = `${id}-error`;
    this.errorElement.setAttribute('role', 'alert');
    this.errorElement.style.display = 'none';
    
    // Assemble elements
    container.appendChild(this.labelElement);
    container.appendChild(inputWrapper);
    if (this.helpTextElement) {
      container.appendChild(this.helpTextElement);
    }
    container.appendChild(this.errorElement);
    
    return container;
  }

  protected init(): void {
    // Add event listeners
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('change', this.handleChange.bind(this));
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
  }

  private handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.emit('input', value);
  }

  private handleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.emit('change', value);
  }

  private handleFocus(event: FocusEvent): void {
    this.element.classList.add('text-field--focused');
    this.emit('focus', event);
  }

  private handleBlur(event: FocusEvent): void {
    this.element.classList.remove('text-field--focused');
    this.emit('blur', event);
  }

  /**
   * Get the current value
   */
  get(): string {
    return this.input.value;
  }

  /**
   * Set the value
   */
  set(value: string): void {
    this.input.value = value;
    
    // Trigger input event
    const event = new Event('input', { bubbles: true });
    this.input.dispatchEvent(event);
  }

  /**
   * Set error message
   */
  setError(error: string | null): void {
    if (error && this.errorElement) {
      this.errorElement.textContent = error;
      this.errorElement.style.display = 'block';
      this.element.classList.add('text-field--error');
      this.input.setAttribute('aria-invalid', 'true');
      this.input.setAttribute('aria-describedby', 
        `${this.errorElement.id} ${this.helpTextElement?.id || ''}`.trim()
      );
    } else if (this.errorElement) {
      this.errorElement.textContent = '';
      this.errorElement.style.display = 'none';
      this.element.classList.remove('text-field--error');
      this.input.removeAttribute('aria-invalid');
      if (this.helpTextElement) {
        this.input.setAttribute('aria-describedby', this.helpTextElement.id);
      } else {
        this.input.removeAttribute('aria-describedby');
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
   * Set placeholder
   */
  setPlaceholder(placeholder: string): void {
    this.input.placeholder = placeholder;
  }

  /**
   * Set required state
   */
  setRequired(required: boolean): void {
    this.input.required = required;
    this.input.setAttribute('aria-required', required.toString());
    
    // Update label
    const requiredSpan = this.labelElement.querySelector('.text-field__required');
    if (required && !requiredSpan) {
      const span = document.createElement('span');
      span.className = 'text-field__required';
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
    return this.input.checkValidity();
  }

  /**
   * Validate and show validation message
   */
  validate(): boolean {
    const isValid = this.isValid();
    if (!isValid) {
      this.setError(this.input.validationMessage);
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
    this.input.disabled = disabled;
  }

  /**
   * Focus the input
   */
  focus(): void {
    this.input.focus();
  }

  /**
   * Blur the input
   */
  blur(): void {
    this.input.blur();
  }

  /**
   * Select all text
   */
  select(): void {
    this.input.select();
  }

  /**
   * Set selection range
   */
  setSelectionRange(start: number, end: number): void {
    this.input.setSelectionRange(start, end);
  }
}