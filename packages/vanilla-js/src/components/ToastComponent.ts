import { Component, ComponentOptions, EventListener } from './Component';

export interface ToastOptions extends ComponentOptions {
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'success' | 'error' | 'warning';
  onDismiss?: EventListener<void>;
}

/**
 * ToastComponent - A reusable toast notification component
 * 
 * @example
 * const toast = new ToastComponent({
 *   message: 'Changes saved successfully',
 *   variant: 'success',
 *   duration: 5000,
 *   action: {
 *     label: 'Undo',
 *     onClick: () => undoChanges()
 *   }
 * });
 * toast.show();
 */
export class ToastComponent extends Component<boolean> {
  private toast: HTMLElement;
  private messageElement: HTMLElement;
  private actionButton?: HTMLButtonElement;
  private progressBar?: HTMLElement;
  private isVisible: boolean = false;
  private hideTimeout?: number;
  private options: ToastOptions;

  constructor(options: ToastOptions) {
    super(options);
    this.options = options;
    
    // Apply variant
    if (options.variant) {
      this.element.classList.add(`toast--${options.variant}`);
    }
    
    // Register callbacks
    if (options.onDismiss) {
      this.on('dismiss', options.onDismiss);
    }
  }

  protected createElement(): HTMLElement {
    // Create toast container
    this.toast = document.createElement('div');
    this.toast.className = 'toast';
    this.toast.setAttribute('role', 'status');
    this.toast.setAttribute('aria-live', 'polite');
    
    // Create content wrapper
    const content = document.createElement('div');
    content.className = 'toast__content';
    
    // Create message
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'toast__message';
    this.messageElement.textContent = this.options.message;
    content.appendChild(this.messageElement);
    
    // Create action button if provided
    if (this.options.action) {
      this.actionButton = document.createElement('button');
      this.actionButton.className = 'toast__action';
      this.actionButton.textContent = this.options.action.label;
      this.actionButton.onclick = () => {
        this.options.action!.onClick();
        this.dismiss();
      };
      content.appendChild(this.actionButton);
    }
    
    // Create dismiss button
    const dismissButton = document.createElement('button');
    dismissButton.className = 'toast__dismiss';
    dismissButton.setAttribute('aria-label', 'Dismiss notification');
    dismissButton.innerHTML = '×';
    dismissButton.onclick = () => this.dismiss();
    
    // Create progress bar if duration is set
    if (this.options.duration && this.options.duration > 0) {
      this.progressBar = document.createElement('div');
      this.progressBar.className = 'toast__progress';
      const progressFill = document.createElement('div');
      progressFill.className = 'toast__progress-fill';
      this.progressBar.appendChild(progressFill);
      this.toast.appendChild(this.progressBar);
    }
    
    // Assemble toast
    this.toast.appendChild(content);
    this.toast.appendChild(dismissButton);
    
    return this.toast;
  }

  /**
   * Show the toast
   */
  show(): void {
    if (this.isVisible) return;
    
    this.isVisible = true;
    this.element.classList.add('toast--visible');
    
    // Auto-hide after duration
    if (this.options.duration && this.options.duration > 0) {
      // Animate progress bar
      if (this.progressBar) {
        const fill = this.progressBar.querySelector('.toast__progress-fill') as HTMLElement;
        fill.style.transition = `width ${this.options.duration}ms linear`;
        fill.style.width = '0%';
      }
      
      this.hideTimeout = window.setTimeout(() => {
        this.hide();
      }, this.options.duration);
    }
  }

  /**
   * Hide the toast
   */
  hide(): void {
    if (!this.isVisible) return;
    
    this.isVisible = false;
    this.element.classList.remove('toast--visible');
    
    // Clear timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
    
    // Remove after animation
    setTimeout(() => {
      if (!this.isVisible) {
        this.unmount();
      }
    }, 300);
  }

  /**
   * Dismiss the toast (hide and emit event)
   */
  dismiss(): void {
    this.hide();
    this.emit('dismiss');
  }

  /**
   * Get visibility state
   */
  get(): boolean {
    return this.isVisible;
  }

  /**
   * Set visibility state
   */
  set(visible: boolean): void {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Update message
   */
  setMessage(message: string): void {
    this.options.message = message;
    this.messageElement.textContent = message;
  }

  /**
   * Update action
   */
  setAction(action: ToastOptions['action']): void {
    this.options.action = action;
    
    if (action && !this.actionButton) {
      // Create action button
      this.actionButton = document.createElement('button');
      this.actionButton.className = 'toast__action';
      const content = this.element.querySelector('.toast__content');
      content?.appendChild(this.actionButton);
    }
    
    if (this.actionButton) {
      if (action) {
        this.actionButton.textContent = action.label;
        this.actionButton.onclick = () => {
          action.onClick();
          this.dismiss();
        };
        this.actionButton.style.display = 'inline-block';
      } else {
        this.actionButton.style.display = 'none';
      }
    }
  }

  /**
   * Override mount to add to toast container
   */
  mount(parent?: HTMLElement | string): void {
    // Create or find toast container
    let toastContainer = document.querySelector('.toast-container') as HTMLElement;
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(this.element);
  }

  /**
   * Destroy and cleanup
   */
  destroy(): void {
    this.hide();
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    super.destroy();
  }
}

/**
 * Toast manager for easier toast creation
 */
export class Toast {
  private static queue: ToastComponent[] = [];
  private static maxVisible = 3;

  /**
   * Show a toast with default styling
   */
  static show(options: ToastOptions | string): ToastComponent {
    const toastOptions: ToastOptions = typeof options === 'string' 
      ? { message: options, duration: 5000 }
      : { duration: 5000, ...options };
    
    const toast = new ToastComponent(toastOptions);
    
    // Manage queue
    this.queue.push(toast);
    if (this.queue.length > this.maxVisible) {
      const oldToast = this.queue.shift();
      oldToast?.dismiss();
    }
    
    // Remove from queue when dismissed
    toast.on('dismiss', () => {
      const index = this.queue.indexOf(toast);
      if (index > -1) {
        this.queue.splice(index, 1);
      }
    });
    
    toast.mount();
    toast.show();
    
    return toast;
  }

  /**
   * Show success toast
   */
  static success(message: string, options?: Partial<ToastOptions>): ToastComponent {
    return this.show({
      message,
      variant: 'success',
      duration: 5000,
      ...options
    });
  }

  /**
   * Show error toast
   */
  static error(message: string, options?: Partial<ToastOptions>): ToastComponent {
    return this.show({
      message,
      variant: 'error',
      duration: 7000,
      ...options
    });
  }

  /**
   * Show warning toast
   */
  static warning(message: string, options?: Partial<ToastOptions>): ToastComponent {
    return this.show({
      message,
      variant: 'warning',
      duration: 6000,
      ...options
    });
  }

  /**
   * Dismiss all toasts
   */
  static dismissAll(): void {
    [...this.queue].forEach(toast => toast.dismiss());
    this.queue = [];
  }
}