import { Component, ComponentOptions, EventListener } from './Component';

export interface CheckboxOptions extends ComponentOptions {
  label: string;
  checked?: boolean;
  onCheck?: EventListener<boolean>;
  onUncheck?: EventListener<boolean>;
}

/**
 * CheckboxComponent - A reusable checkbox component
 * 
 * @example
 * const checkbox = new CheckboxComponent({
 *   label: 'Subscribe to newsletter',
 *   checked: false,
 *   onCheck: () => console.log('Checked!'),
 *   onUncheck: () => console.log('Unchecked!')
 * });
 * checkbox.mount('#app');
 */
export class CheckboxComponent extends Component<boolean> {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private labelText: string;

  constructor(options: CheckboxOptions) {
    super(options);
    this.labelText = options.label;
    
    // Set initial checked state
    if (options.checked !== undefined) {
      this.set(options.checked);
    }
    
    // Register initial callbacks
    if (options.onCheck) {
      this.on('check', options.onCheck);
    }
    if (options.onUncheck) {
      this.on('uncheck', options.onUncheck);
    }
  }

  protected createElement(): HTMLElement {
    // Create container
    const container = document.createElement('div');
    container.className = 'checkbox-field';
    
    // Create unique ID for input-label association
    const id = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create input
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.id = id;
    this.input.className = 'checkbox-field__input';
    
    // Create label
    this.label = document.createElement('label');
    this.label.htmlFor = id;
    this.label.className = 'checkbox-field__label';
    
    // Create checkbox visual
    const box = document.createElement('span');
    box.className = 'checkbox-field__box';
    
    // Create checkmark icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'checkbox-field__icon');
    icon.setAttribute('viewBox', '0 0 16 16');
    icon.setAttribute('aria-hidden', 'true');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M13.527 3.84a1 1 0 0 1 0 1.414l-6.5 6.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414l1.793 1.793 5.793-5.793a1 1 0 0 1 1.414 0Z');
    path.setAttribute('fill', 'currentColor');
    
    icon.appendChild(path);
    box.appendChild(icon);
    
    // Create label text
    const text = document.createElement('span');
    text.className = 'checkbox-field__text';
    text.textContent = this.labelText;
    
    // Assemble elements
    this.label.appendChild(box);
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
    const checked = (event.target as HTMLInputElement).checked;
    
    // Emit generic change event
    this.emit('change', checked);
    
    // Emit specific check/uncheck events
    if (checked) {
      this.emit('check', checked);
    } else {
      this.emit('uncheck', checked);
    }
  }

  /**
   * Get the checkbox checked state
   */
  get(): boolean {
    return this.input.checked;
  }

  /**
   * Set the checkbox checked state
   */
  set(value: boolean): void {
    this.input.checked = value;
    
    // Trigger change event programmatically
    const event = new Event('change', { bubbles: true });
    this.input.dispatchEvent(event);
  }

  /**
   * Subscribe to check event
   */
  onCheck(listener: EventListener<boolean>): () => void {
    return this.on('check', listener);
  }

  /**
   * Subscribe to uncheck event
   */
  onUncheck(listener: EventListener<boolean>): () => void {
    return this.on('uncheck', listener);
  }

  /**
   * Subscribe to change event
   */
  onChange(listener: EventListener<boolean>): () => void {
    return this.on('change', listener);
  }

  /**
   * Update the label text
   */
  setLabel(label: string): void {
    this.labelText = label;
    const textElement = this.element.querySelector('.checkbox-field__text');
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
   * Focus the checkbox
   */
  focus(): void {
    this.input.focus();
  }

  /**
   * Blur the checkbox
   */
  blur(): void {
    this.input.blur();
  }
}