import { Component, ComponentOptions, EventListener } from './Component';

export interface ModalOptions extends ComponentOptions {
  title: string;
  content?: string | HTMLElement;
  size?: 'small' | 'medium' | 'large';
  primaryAction?: {
    label: string;
    onClick: () => void | Promise<void>;
    variant?: 'primary' | 'critical';
  };
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
  }>;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  onOpen?: EventListener<void>;
  onClose?: EventListener<void>;
}

/**
 * ModalComponent - A reusable modal dialog component
 * 
 * @example
 * const modal = new ModalComponent({
 *   title: 'Confirm Action',
 *   content: 'Are you sure you want to proceed?',
 *   primaryAction: {
 *     label: 'Confirm',
 *     onClick: async () => {
 *       await performAction();
 *       modal.close();
 *     }
 *   },
 *   secondaryActions: [{
 *     label: 'Cancel',
 *     onClick: () => modal.close()
 *   }]
 * });
 * modal.open();
 */
export class ModalComponent extends Component<boolean> {
  private backdrop: HTMLElement;
  private modal: HTMLElement;
  private titleElement: HTMLElement;
  private contentElement: HTMLElement;
  private footerElement: HTMLElement;
  private isOpen: boolean = false;
  private options: ModalOptions;
  private primaryButton?: HTMLButtonElement;

  constructor(options: ModalOptions) {
    super(options);
    this.options = options;
    
    // Set content
    if (options.content) {
      this.setContent(options.content);
    }
    
    // Register callbacks
    if (options.onOpen) {
      this.on('open', options.onOpen);
    }
    if (options.onClose) {
      this.on('close', options.onClose);
    }
    
    // Setup keyboard handler
    if (options.closeOnEscape !== false) {
      this.setupEscapeHandler();
    }
  }

  protected createElement(): HTMLElement {
    // Create backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';
    this.backdrop.style.display = 'none';
    
    // Create modal container
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'modal-title');
    
    // Apply size
    if (this.options.size) {
      this.modal.classList.add(`modal--${this.options.size}`);
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'modal__header';
    
    this.titleElement = document.createElement('h2');
    this.titleElement.id = 'modal-title';
    this.titleElement.className = 'modal__title';
    this.titleElement.textContent = this.options.title;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'modal__close';
    closeButton.setAttribute('aria-label', 'Close modal');
    closeButton.innerHTML = '×';
    closeButton.onclick = () => this.close();
    
    header.appendChild(this.titleElement);
    header.appendChild(closeButton);
    
    // Create content
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'modal__content';
    
    // Create footer
    this.footerElement = document.createElement('div');
    this.footerElement.className = 'modal__footer';
    this.createFooterButtons();
    
    // Assemble modal
    this.modal.appendChild(header);
    this.modal.appendChild(this.contentElement);
    if (this.options.primaryAction || this.options.secondaryActions?.length) {
      this.modal.appendChild(this.footerElement);
    }
    
    // Add modal to backdrop
    this.backdrop.appendChild(this.modal);
    
    // Handle backdrop click
    if (this.options.closeOnBackdropClick !== false) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) {
          this.close();
        }
      });
    }
    
    return this.backdrop;
  }

  private createFooterButtons(): void {
    // Secondary actions
    if (this.options.secondaryActions) {
      this.options.secondaryActions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'button button--secondary';
        button.textContent = action.label;
        button.onclick = action.onClick;
        this.footerElement.appendChild(button);
      });
    }
    
    // Primary action
    if (this.options.primaryAction) {
      this.primaryButton = document.createElement('button');
      this.primaryButton.className = 'button';
      
      const variant = this.options.primaryAction.variant || 'primary';
      this.primaryButton.classList.add(`button--${variant}`);
      
      this.primaryButton.textContent = this.options.primaryAction.label;
      this.primaryButton.onclick = async () => {
        // Disable button during async operation
        this.primaryButton!.disabled = true;
        try {
          await this.options.primaryAction!.onClick();
        } finally {
          if (this.primaryButton) {
            this.primaryButton.disabled = false;
          }
        }
      };
      
      this.footerElement.appendChild(this.primaryButton);
    }
  }

  private setupEscapeHandler(): void {
    this.keyHandler = this.keyHandler.bind(this);
  }

  private keyHandler(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  /**
   * Open the modal
   */
  open(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.backdrop.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    // Add escape handler
    if (this.options.closeOnEscape !== false) {
      document.addEventListener('keydown', this.keyHandler);
    }
    
    // Focus management
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Focus first focusable element or close button
    setTimeout(() => {
      const focusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      focusable?.focus();
    }, 100);
    
    // Trap focus
    this.trapFocus();
    
    this.emit('open');
  }

  /**
   * Close the modal
   */
  close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.backdrop.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Remove escape handler
    document.removeEventListener('keydown', this.keyHandler);
    
    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
    
    // Remove focus trap
    this.releaseFocus();
    
    this.emit('close');
  }

  private previousActiveElement?: HTMLElement;
  private focusTrapHandler?: (e: KeyboardEvent) => void;

  private trapFocus(): void {
    this.focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = this.modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    document.addEventListener('keydown', this.focusTrapHandler);
  }

  private releaseFocus(): void {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
    }
  }

  /**
   * Get open state
   */
  get(): boolean {
    return this.isOpen;
  }

  /**
   * Set open state
   */
  set(open: boolean): void {
    if (open) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Set modal title
   */
  setTitle(title: string): void {
    this.options.title = title;
    this.titleElement.textContent = title;
  }

  /**
   * Set modal content
   */
  setContent(content: string | HTMLElement): void {
    if (typeof content === 'string') {
      this.contentElement.innerHTML = content;
    } else {
      this.contentElement.innerHTML = '';
      this.contentElement.appendChild(content);
    }
  }

  /**
   * Update primary action
   */
  setPrimaryAction(action: ModalOptions['primaryAction']): void {
    this.options.primaryAction = action;
    
    // Recreate footer buttons
    this.footerElement.innerHTML = '';
    this.createFooterButtons();
    
    // Show/hide footer
    if (action || this.options.secondaryActions?.length) {
      if (!this.footerElement.parentNode) {
        this.modal.appendChild(this.footerElement);
      }
    } else {
      this.footerElement.remove();
    }
  }

  /**
   * Set loading state on primary button
   */
  setLoading(loading: boolean): void {
    if (this.primaryButton) {
      this.primaryButton.disabled = loading;
      if (loading) {
        this.primaryButton.classList.add('button--loading');
      } else {
        this.primaryButton.classList.remove('button--loading');
      }
    }
  }

  /**
   * Override mount to add to body by default
   */
  mount(parent?: HTMLElement | string): void {
    const parentElement = parent ? 
      (typeof parent === 'string' ? document.querySelector(parent) : parent) : 
      document.body;
    
    if (parentElement) {
      parentElement.appendChild(this.element);
    }
  }

  /**
   * Destroy and cleanup
   */
  destroy(): void {
    this.close();
    super.destroy();
  }
}

/**
 * Confirm modal helper
 */
export function confirm(options: {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  dangerous?: boolean;
}): Promise<boolean> {
  return new Promise((resolve) => {
    const modal = new ModalComponent({
      title: options.title,
      content: options.message,
      primaryAction: {
        label: options.confirmLabel || 'Confirm',
        variant: options.dangerous ? 'critical' : 'primary',
        onClick: () => {
          modal.close();
          resolve(true);
        }
      },
      secondaryActions: [{
        label: options.cancelLabel || 'Cancel',
        onClick: () => {
          modal.close();
          resolve(false);
        }
      }]
    });
    
    modal.mount();
    modal.open();
  });
}

/**
 * Alert modal helper
 */
export function alert(options: {
  title: string;
  message: string;
  buttonLabel?: string;
}): Promise<void> {
  return new Promise((resolve) => {
    const modal = new ModalComponent({
      title: options.title,
      content: options.message,
      primaryAction: {
        label: options.buttonLabel || 'OK',
        onClick: () => {
          modal.close();
          resolve();
        }
      }
    });
    
    modal.mount();
    modal.open();
  });
}