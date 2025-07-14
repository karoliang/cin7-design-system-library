import { Component, ComponentOptions, EventListener } from './Component';

export interface RadioButtonOptions extends ComponentOptions {
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: EventListener<string>;
}

/**
 * RadioButtonComponent - A reusable radio button component
 * 
 * @example
 * const radio = new RadioButtonComponent({
 *   label: 'Option 1',
 *   value: 'option1',
 *   name: 'options',
 *   checked: true,
 *   onChange: (value) => console.log('Selected:', value)
 * });
 * radio.mount('#app');
 */
export class RadioButtonComponent extends Component<string> {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private labelText: string;
  private value: string;

  constructor(options: RadioButtonOptions) {
    super(options);
    this.labelText = options.label;
    this.value = options.value;
    
    // Set the name attribute
    this.input.name = options.name;
    
    // Set initial checked state
    if (options.checked) {
      this.set(this.value);
    }
    
    // Register initial callback
    if (options.onChange) {
      this.on('change', options.onChange);
    }
  }

  protected createElement(): HTMLElement {
    // Create container
    const container = document.createElement('div');
    container.className = 'radio-field';
    
    // Create unique ID for input-label association
    const id = `radio-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create input
    this.input = document.createElement('input');
    this.input.type = 'radio';
    this.input.id = id;
    this.input.value = this.value;
    this.input.className = 'radio-field__input';
    
    // Create label
    this.label = document.createElement('label');
    this.label.htmlFor = id;
    this.label.className = 'radio-field__label';
    
    // Create radio visual
    const circle = document.createElement('span');
    circle.className = 'radio-field__circle';
    
    // Create inner dot
    const dot = document.createElement('span');
    dot.className = 'radio-field__dot';
    circle.appendChild(dot);
    
    // Create label text
    const text = document.createElement('span');
    text.className = 'radio-field__text';
    text.textContent = this.labelText;
    
    // Assemble elements
    this.label.appendChild(circle);
    this.label.appendChild(text);
    container.appendChild(this.input);
    container.appendChild(this.label);
    
    return container;
  }

  protected init(): void {
    // Add change event listener
    this.input.addEventListener('change', this.handleChange.bind(this));
  }

  private handleChange(event: Event): void {
    if (this.input.checked) {
      // Emit change event with the value
      this.emit('change', this.value);
    }
  }

  /**
   * Get the radio button value if checked, empty string if not
   */
  get(): string {
    return this.input.checked ? this.value : '';
  }

  /**
   * Set the radio button checked state
   */
  set(value: string): void {
    this.input.checked = (value === this.value);
    
    // Trigger change event programmatically if checked
    if (this.input.checked) {
      const event = new Event('change', { bubbles: true });
      this.input.dispatchEvent(event);
    }
  }

  /**
   * Check if this radio button is selected
   */
  isChecked(): boolean {
    return this.input.checked;
  }

  /**
   * Get the radio button's value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Get the radio button's name (group)
   */
  getName(): string {
    return this.input.name;
  }

  /**
   * Update the label text
   */
  setLabel(label: string): void {
    this.labelText = label;
    const textElement = this.element.querySelector('.radio-field__text');
    if (textElement) {
      textElement.textContent = label;
    }
  }

  /**
   * Get the label text
   */
  getLabel(): string {
    return this.labelText;
  }

  /**
   * Override setDisabled to handle input element
   */
  setDisabled(disabled: boolean): void {
    super.setDisabled(disabled);
    this.input.disabled = disabled;
  }

  /**
   * Focus the radio button
   */
  focus(): void {
    this.input.focus();
  }

  /**
   * Blur the radio button
   */
  blur(): void {
    this.input.blur();
  }
}

/**
 * RadioGroupComponent - Manages a group of radio buttons
 * 
 * @example
 * const radioGroup = new RadioGroupComponent({
 *   name: 'options',
 *   options: [
 *     { label: 'Option 1', value: 'opt1' },
 *     { label: 'Option 2', value: 'opt2' },
 *     { label: 'Option 3', value: 'opt3' }
 *   ],
 *   defaultValue: 'opt1',
 *   onChange: (value) => console.log('Selected:', value)
 * });
 * radioGroup.mount('#app');
 */
export interface RadioGroupOptions extends ComponentOptions {
  name: string;
  options: Array<{ label: string; value: string }>;
  defaultValue?: string;
  onChange?: EventListener<string>;
  orientation?: 'vertical' | 'horizontal';
}

export class RadioGroupComponent extends Component<string> {
  private radios: RadioButtonComponent[] = [];
  private currentValue: string = '';
  private name: string;

  constructor(options: RadioGroupOptions) {
    super(options);
    this.name = options.name;
    
    // Create radio buttons
    options.options.forEach(option => {
      const radio = new RadioButtonComponent({
        label: option.label,
        value: option.value,
        name: this.name,
        checked: option.value === options.defaultValue,
        onChange: (value) => this.handleRadioChange(value)
      });
      this.radios.push(radio);
    });
    
    // Set initial value
    if (options.defaultValue) {
      this.currentValue = options.defaultValue;
    }
    
    // Register change callback
    if (options.onChange) {
      this.on('change', options.onChange);
    }
  }

  protected createElement(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'radio-group';
    container.setAttribute('role', 'radiogroup');
    
    // Add orientation class if specified
    const orientation = this.state.get('orientation') || 'vertical';
    container.classList.add(`radio-group--${orientation}`);
    
    return container;
  }

  protected init(): void {
    // Mount all radio buttons
    this.radios.forEach(radio => {
      radio.mount(this.element);
    });
  }

  private handleRadioChange(value: string): void {
    this.currentValue = value;
    this.emit('change', value);
  }

  /**
   * Get the selected value
   */
  get(): string {
    return this.currentValue;
  }

  /**
   * Set the selected value
   */
  set(value: string): void {
    this.radios.forEach(radio => {
      radio.set(value);
    });
    this.currentValue = value;
  }

  /**
   * Enable/disable all radio buttons
   */
  setDisabled(disabled: boolean): void {
    super.setDisabled(disabled);
    this.radios.forEach(radio => radio.setDisabled(disabled));
  }

  /**
   * Get all available options
   */
  getOptions(): Array<{ label: string; value: string }> {
    return this.radios.map(radio => ({
      label: radio.getLabel(),
      value: radio.getValue()
    }));
  }

  /**
   * Focus the first or selected radio button
   */
  focus(): void {
    const selected = this.radios.find(radio => radio.isChecked());
    if (selected) {
      selected.focus();
    } else if (this.radios.length > 0) {
      this.radios[0].focus();
    }
  }

  /**
   * Destroy the component and all child radios
   */
  destroy(): void {
    this.radios.forEach(radio => radio.destroy());
    this.radios = [];
    super.destroy();
  }
}