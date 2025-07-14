import { Component, ComponentOptions, EventListener } from './Component';

export interface ButtonOptions extends ComponentOptions {
  label: string;
  variant?: 'primary' | 'secondary' | 'plain' | 'critical';
  size?: 'slim' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: string | HTMLElement;
  iconOnly?: boolean;
  accessibilityLabel?: string;
  submit?: boolean;
  onClick?: EventListener<MouseEvent>;
}

/**
 * ButtonComponent - A reusable button component
 * 
 * @example
 * const button = new ButtonComponent({
 *   label: 'Save',
 *   variant: 'primary',
 *   onClick: () => console.log('Button clicked!')
 * });
 * button.mount('#app');
 */
export class ButtonComponent extends Component<void> {
  private button: HTMLButtonElement;
  private labelElement: HTMLSpanElement;
  private loadingSpinner?: HTMLElement;
  private options: ButtonOptions;

  constructor(options: ButtonOptions) {
    super(options);
    this.options = options;
    
    // Apply initial states
    this.applyVariant(options.variant);
    this.applySize(options.size);
    
    if (options.fullWidth) {
      this.setFullWidth(true);
    }
    
    if (options.loading) {
      this.setLoading(true);
    }
    
    if (options.onClick) {
      this.on('click', options.onClick);
    }
  }

  protected createElement(): HTMLElement {
    // Create button
    this.button = document.createElement('button');
    this.button.className = 'button';
    this.button.type = this.options.submit ? 'submit' : 'button';
    
    // Set accessibility label
    if (this.options.accessibilityLabel) {
      this.button.setAttribute('aria-label', this.options.accessibilityLabel);
    }
    
    // Add icon if provided
    if (this.options.icon) {
      const iconElement = this.createIcon(this.options.icon);
      this.button.appendChild(iconElement);
      
      if (this.options.iconOnly) {
        this.button.classList.add('button--icon-only');
      }
    }
    
    // Add loading spinner (hidden by default)
    this.loadingSpinner = document.createElement('span');
    this.loadingSpinner.className = 'button__spinner';
    this.loadingSpinner.style.display = 'none';
    
    const spinnerIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spinnerIcon.setAttribute('class', 'spinner');
    spinnerIcon.setAttribute('viewBox', '0 0 20 20');
    spinnerIcon.setAttribute('aria-hidden', 'true');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M10 3v3c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1s1 .45 1 1z');
    path.setAttribute('fill', 'currentColor');
    
    spinnerIcon.appendChild(path);
    this.loadingSpinner.appendChild(spinnerIcon);
    this.button.appendChild(this.loadingSpinner);
    
    // Add label
    if (!this.options.iconOnly) {
      this.labelElement = document.createElement('span');
      this.labelElement.className = 'button__text';
      this.labelElement.textContent = this.options.label;
      this.button.appendChild(this.labelElement);
    }
    
    return this.button;
  }

  protected init(): void {
    // Add click event listener
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    if (!this.isDisabled() && !this.options.loading) {
      this.emit('click', event);
    }
  }

  private createIcon(icon: string | HTMLElement): HTMLElement {
    if (typeof icon === 'string') {
      // Create SVG icon from string
      const iconElement = document.createElement('span');
      iconElement.className = 'button__icon';
      iconElement.innerHTML = icon;
      return iconElement;
    } else {
      // Use provided element
      icon.classList.add('button__icon');
      return icon;
    }
  }

  private applyVariant(variant?: string): void {
    // Remove existing variant classes
    this.button.classList.remove('button--primary', 'button--secondary', 'button--plain', 'button--critical');
    
    // Add new variant class
    if (variant) {
      this.button.classList.add(`button--${variant}`);
    }
  }

  private applySize(size?: string): void {
    // Remove existing size classes
    this.button.classList.remove('button--slim', 'button--medium', 'button--large');
    
    // Add new size class
    if (size) {
      this.button.classList.add(`button--${size}`);
    }
  }

  /**
   * Get method (buttons don't have a value)
   */
  get(): void {
    // Buttons don't have a value
  }

  /**
   * Set method (buttons don't have a value)
   */
  set(): void {
    // Buttons don't have a value
  }

  /**
   * Click the button programmatically
   */
  click(): void {
    this.button.click();
  }

  /**
   * Set button label
   */
  setLabel(label: string): void {
    this.options.label = label;
    if (this.labelElement) {
      this.labelElement.textContent = label;
    }
  }

  /**
   * Get button label
   */
  getLabel(): string {
    return this.options.label;
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.options.loading = loading;
    
    if (loading) {
      this.button.classList.add('button--loading');
      this.button.disabled = true;
      if (this.loadingSpinner) {
        this.loadingSpinner.style.display = 'inline-flex';
      }
    } else {
      this.button.classList.remove('button--loading');
      this.button.disabled = false;
      if (this.loadingSpinner) {
        this.loadingSpinner.style.display = 'none';
      }
    }
  }

  /**
   * Check if button is loading
   */
  isLoading(): boolean {
    return this.options.loading || false;
  }

  /**
   * Set variant
   */
  setVariant(variant: 'primary' | 'secondary' | 'plain' | 'critical'): void {
    this.options.variant = variant;
    this.applyVariant(variant);
  }

  /**
   * Set size
   */
  setSize(size: 'slim' | 'medium' | 'large'): void {
    this.options.size = size;
    this.applySize(size);
  }

  /**
   * Set full width
   */
  setFullWidth(fullWidth: boolean): void {
    this.options.fullWidth = fullWidth;
    
    if (fullWidth) {
      this.button.classList.add('button--full-width');
    } else {
      this.button.classList.remove('button--full-width');
    }
  }

  /**
   * Override setDisabled
   */
  setDisabled(disabled: boolean): void {
    super.setDisabled(disabled);
    this.button.disabled = disabled;
  }

  /**
   * Focus the button
   */
  focus(): void {
    this.button.focus();
  }

  /**
   * Blur the button
   */
  blur(): void {
    this.button.blur();
  }
}

/**
 * ButtonGroupComponent - A container for grouping buttons
 * 
 * @example
 * const buttonGroup = new ButtonGroupComponent({
 *   variant: 'segmented',
 *   buttons: [
 *     { label: 'Bold', value: 'bold' },
 *     { label: 'Italic', value: 'italic' },
 *     { label: 'Underline', value: 'underline' }
 *   ],
 *   onChange: (values) => console.log('Selected:', values)
 * });
 * buttonGroup.mount('#app');
 */
export interface ButtonGroupOptions extends ComponentOptions {
  variant?: 'default' | 'segmented';
  buttons: Array<{
    label: string;
    value?: string;
    variant?: 'primary' | 'secondary' | 'plain';
    disabled?: boolean;
  }>;
  allowMultiple?: boolean;
  defaultValues?: string[];
  onChange?: EventListener<string[]>;
}

export class ButtonGroupComponent extends Component<string[]> {
  private buttons: ButtonComponent[] = [];
  private selectedValues: Set<string> = new Set();
  private options: ButtonGroupOptions;

  constructor(options: ButtonGroupOptions) {
    super(options);
    this.options = options;
    
    // Set initial values
    if (options.defaultValues) {
      options.defaultValues.forEach(value => this.selectedValues.add(value));
    }
    
    // Create buttons
    options.buttons.forEach((buttonConfig, index) => {
      const isSegmented = options.variant === 'segmented';
      const value = buttonConfig.value || buttonConfig.label;
      
      const button = new ButtonComponent({
        label: buttonConfig.label,
        variant: isSegmented ? 'secondary' : buttonConfig.variant,
        disabled: buttonConfig.disabled,
        onClick: () => this.handleButtonClick(value, index)
      });
      
      // Apply segmented styles if needed
      if (isSegmented) {
        button.getElement().classList.add('button--segmented');
        if (this.selectedValues.has(value)) {
          button.getElement().classList.add('button--pressed');
          button.getElement().setAttribute('aria-pressed', 'true');
        }
      }
      
      this.buttons.push(button);
    });
    
    // Register change callback
    if (options.onChange) {
      this.on('change', options.onChange);
    }
  }

  protected createElement(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'button-group';
    
    if (this.options.variant === 'segmented') {
      container.classList.add('button-group--segmented');
      container.setAttribute('role', 'group');
    }
    
    return container;
  }

  protected init(): void {
    // Mount all buttons
    this.buttons.forEach(button => {
      button.mount(this.element);
    });
  }

  private handleButtonClick(value: string, index: number): void {
    if (this.options.variant !== 'segmented') {
      // For non-segmented groups, just emit the click
      this.emit('change', [value]);
      return;
    }
    
    // Handle segmented button selection
    const button = this.buttons[index];
    const buttonElement = button.getElement();
    
    if (this.options.allowMultiple) {
      // Toggle selection
      if (this.selectedValues.has(value)) {
        this.selectedValues.delete(value);
        buttonElement.classList.remove('button--pressed');
        buttonElement.setAttribute('aria-pressed', 'false');
      } else {
        this.selectedValues.add(value);
        buttonElement.classList.add('button--pressed');
        buttonElement.setAttribute('aria-pressed', 'true');
      }
    } else {
      // Single selection - clear others first
      this.buttons.forEach((btn, i) => {
        const el = btn.getElement();
        if (i === index) {
          this.selectedValues.clear();
          this.selectedValues.add(value);
          el.classList.add('button--pressed');
          el.setAttribute('aria-pressed', 'true');
        } else {
          el.classList.remove('button--pressed');
          el.setAttribute('aria-pressed', 'false');
        }
      });
    }
    
    this.emit('change', Array.from(this.selectedValues));
  }

  /**
   * Get selected values
   */
  get(): string[] {
    return Array.from(this.selectedValues);
  }

  /**
   * Set selected values
   */
  set(values: string[]): void {
    this.selectedValues.clear();
    values.forEach(value => this.selectedValues.add(value));
    
    // Update button states
    this.buttons.forEach((button, index) => {
      const buttonConfig = this.options.buttons[index];
      const value = buttonConfig.value || buttonConfig.label;
      const buttonElement = button.getElement();
      
      if (this.selectedValues.has(value)) {
        buttonElement.classList.add('button--pressed');
        buttonElement.setAttribute('aria-pressed', 'true');
      } else {
        buttonElement.classList.remove('button--pressed');
        buttonElement.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Enable/disable all buttons
   */
  setDisabled(disabled: boolean): void {
    super.setDisabled(disabled);
    this.buttons.forEach(button => button.setDisabled(disabled));
  }

  /**
   * Destroy the component and all buttons
   */
  destroy(): void {
    this.buttons.forEach(button => button.destroy());
    this.buttons = [];
    super.destroy();
  }
}