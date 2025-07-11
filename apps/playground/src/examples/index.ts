export const examples: Record<string, any> = {
  'product-card': {
    name: 'Product Card',
    type: 'component',
    description: 'A responsive product card mixing vanilla JS for interactions and React for UI',
    technologies: ['Vanilla JS', 'React', 'Polaris'],
    tags: ['Basic', 'E-commerce'],
    code: `component ProductCard {
  props {
    product: Product
    onSelect?: (product: Product) => void
  }
  
  state {
    isHovered: boolean = false
    imageIndex: number = 0
  }
  
  methods {
    nextImage() {
      this.imageIndex = (this.imageIndex + 1) % this.product.images.length
    }
  }
  
  render {
    @vanilla {
      <div class="product-card" 
           onmouseenter={() => this.isHovered = true}
           onmouseleave={() => this.isHovered = false}>
        <div class="image-container" onclick={() => this.nextImage()}>
          <img src={this.product.images[this.imageIndex]} 
               alt={this.product.name} />
        </div>
        @slot details
      </div>
    }
    
    @react {
      <Card highlighted={this.isHovered}>
        <Card.Header>
          <Text variant="headingSm">{this.product.name}</Text>
        </Card.Header>
        <Card.Section>
          <Stack vertical>
            <Text variant="bodyMd">\${this.product.price}</Text>
            <Badge status={this.product.inStock ? 'success' : 'critical'}>
              {this.product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </Stack>
        </Card.Section>
        <Card.Section>
          <Button 
            fullWidth
            primary={this.product.inStock}
            disabled={!this.product.inStock}
            onClick={() => this.onSelect?.(this.product)}>
            {this.product.inStock ? 'Add to Cart' : 'Notify Me'}
          </Button>
        </Card.Section>
      </Card>
    }
  }
}`,
  },

  'data-grid': {
    name: 'Enterprise Data Grid',
    type: 'component',
    description: 'High-performance data grid using ExtJS for large datasets',
    technologies: ['ExtJS', 'TypeScript SDK'],
    tags: ['Advanced', 'Enterprise'],
    code: `component InventoryGrid {
  props {
    storeId: string
    onEdit?: (item: InventoryItem) => void
  }
  
  state {
    items: InventoryItem[] = []
    loading: boolean = true
    filters: InventoryFilters = {}
  }
  
  inject {
    inventoryRepo: InventoryRepository
  }
  
  onMount {
    this.loadInventory()
  }
  
  methods {
    async loadInventory() {
      this.loading = true
      this.items = await this.inventoryRepo.findByStore(
        this.storeId, 
        this.filters
      )
      this.loading = false
    }
    
    async updateQuantity(id: string, quantity: number) {
      await this.inventoryRepo.updateQuantity(id, quantity)
      this.loadInventory()
    }
  }
  
  @extjs {
    grid {
      store: this.items
      loading: this.loading
      
      columns: [
        { text: 'SKU', dataIndex: 'sku', width: 120, locked: true },
        { text: 'Product', dataIndex: 'productName', flex: 1 },
        { text: 'Category', dataIndex: 'category', width: 150,
          filter: { type: 'list' } },
        { text: 'Quantity', dataIndex: 'quantity', width: 100,
          editor: { xtype: 'numberfield', minValue: 0 },
          renderer: (val) => {
            const color = val > 50 ? 'green' : val > 10 ? 'orange' : 'red'
            return \`<span style="color: \${color}">\${val}</span>\`
          }
        },
        { text: 'Reserved', dataIndex: 'reserved', width: 100 },
        { text: 'Available', dataIndex: 'available', width: 100,
          calculate: (data) => data.quantity - data.reserved
        },
        { text: 'Location', dataIndex: 'location', width: 120 },
        { text: 'Last Updated', dataIndex: 'updatedAt', width: 150,
          renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
        }
      ]
      
      features: [
        'filters',
        'grouping',
        'summary',
        {
          ftype: 'rowediting',
          clicksToEdit: 2,
          listeners: {
            edit: (editor, context) => {
              this.updateQuantity(context.record.id, context.newValues.quantity)
            }
          }
        }
      ]
      
      tbar: [
        {
          text: 'Refresh',
          iconCls: 'x-fa fa-refresh',
          handler: () => this.loadInventory()
        },
        {
          text: 'Export',
          iconCls: 'x-fa fa-download',
          menu: [
            { text: 'Excel', handler: () => this.exportExcel() },
            { text: 'CSV', handler: () => this.exportCSV() }
          ]
        },
        '->',
        {
          xtype: 'textfield',
          emptyText: 'Search...',
          listeners: {
            change: (field, value) => {
              this.filters.search = value
              this.loadInventory()
            }
          }
        }
      ]
      
      bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
      }
    }
  }
}`,
  },

  'order-processing': {
    name: 'Order Processing Use Case',
    type: 'logic',
    description: 'Complex business logic for order processing with validation and side effects',
    technologies: ['TypeScript SDK'],
    tags: ['Business Logic', 'Advanced'],
    code: `usecase ProcessOrder {
  inject {
    orderRepo: OrderRepository
    inventoryService: InventoryService
    paymentService: PaymentService
    shippingService: ShippingService
    emailService: EmailService
    eventBus: EventBus
  }
  
  async execute(request: {
    customerId: string
    items: OrderItem[]
    shippingAddress: Address
    paymentMethod: PaymentMethod
  }): Result<Order> {
    // Validation
    const validation = this.validate(request)
    if (validation.hasErrors()) {
      return Result.failure(validation.errors)
    }
    
    // Check inventory
    const availability = await this.checkInventory(request.items)
    if (!availability.allAvailable) {
      return Result.failure('Some items are out of stock', {
        unavailable: availability.unavailable
      })
    }
    
    // Reserve inventory
    const reservations = await this.inventoryService.reserveItems(
      request.items,
      { duration: 30 * 60 * 1000 } // 30 minutes
    )
    
    try {
      // Calculate totals
      const pricing = await this.calculatePricing(request)
      
      // Process payment
      const payment = await this.paymentService.charge({
        amount: pricing.total,
        method: request.paymentMethod,
        customerId: request.customerId
      })
      
      if (!payment.success) {
        throw new PaymentError(payment.error)
      }
      
      // Create order
      const order = await this.orderRepo.create({
        customerId: request.customerId,
        items: request.items,
        pricing: pricing,
        paymentId: payment.id,
        shippingAddress: request.shippingAddress,
        status: 'confirmed'
      })
      
      // Schedule shipping
      const shipment = await this.shippingService.schedule({
        orderId: order.id,
        address: request.shippingAddress,
        items: request.items
      })
      
      // Update order with shipment
      await this.orderRepo.update(order.id, {
        shipmentId: shipment.id,
        estimatedDelivery: shipment.estimatedDelivery
      })
      
      // Confirm inventory reservations
      await this.inventoryService.confirmReservations(reservations)
      
      // Send confirmation email
      await this.emailService.send({
        to: request.customerId,
        template: 'order-confirmation',
        data: { order, shipment }
      })
      
      // Emit events
      this.eventBus.emit('order:created', { order })
      this.eventBus.emit('inventory:reserved', { reservations })
      this.eventBus.emit('payment:processed', { payment })
      
      return Result.success(order)
      
    } catch (error) {
      // Rollback on failure
      await this.rollback(reservations, payment)
      
      if (error instanceof PaymentError) {
        return Result.failure('Payment failed', { reason: error.message })
      }
      
      return Result.failure('Order processing failed')
    }
  }
  
  private async rollback(reservations?: Reservation[], payment?: Payment) {
    if (reservations) {
      await this.inventoryService.releaseReservations(reservations)
    }
    
    if (payment?.success) {
      await this.paymentService.refund(payment.id)
    }
  }
}`,
  },

  'form-wizard': {
    name: 'Multi-Step Form Wizard',
    type: 'component',
    description: 'Complex form with validation, mixing React for UI and vanilla JS for performance',
    technologies: ['React', 'Vanilla JS', 'TypeScript SDK'],
    tags: ['Forms', 'Advanced'],
    code: `component ProductWizard {
  props {
    onComplete: (product: Product) => void
    initialData?: Partial<Product>
  }
  
  state {
    currentStep: number = 0
    formData: ProductFormData = this.initialData || {}
    errors: Record<string, string[]> = {}
    isValidating: boolean = false
  }
  
  computed {
    steps(): WizardStep[] {
      return [
        { id: 'basic', title: 'Basic Info', component: BasicInfoStep },
        { id: 'pricing', title: 'Pricing', component: PricingStep },
        { id: 'inventory', title: 'Inventory', component: InventoryStep },
        { id: 'media', title: 'Media', component: MediaStep },
        { id: 'review', title: 'Review', component: ReviewStep }
      ]
    }
    
    canProceed(): boolean {
      return !this.isValidating && !this.hasErrors(this.currentStep)
    }
    
    progress(): number {
      return ((this.currentStep + 1) / this.steps.length) * 100
    }
  }
  
  methods {
    async validateStep(step: number): boolean {
      this.isValidating = true
      const validator = new ProductValidator()
      const errors = await validator.validateStep(step, this.formData)
      this.errors[step] = errors
      this.isValidating = false
      return errors.length === 0
    }
    
    async nextStep() {
      if (await this.validateStep(this.currentStep)) {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++
        } else {
          this.submit()
        }
      }
    }
    
    async submit() {
      const product = await this.createProduct(this.formData)
      this.onComplete(product)
    }
  }
  
  render {
    @vanilla {
      <!-- Progress bar with smooth animation -->
      <div class="wizard-progress">
        <div class="progress-bar" 
             style="width: {this.progress}%"
             data-progress={this.progress}>
        </div>
        <div class="progress-steps">
          @for (step, index of this.steps) {
            <div class="step {index <= this.currentStep ? 'completed' : ''}"
                 onclick={() => index < this.currentStep && (this.currentStep = index)}>
              <span class="step-number">{index + 1}</span>
              <span class="step-title">{step.title}</span>
            </div>
          }
        </div>
      </div>
    }
    
    @react {
      <Card>
        <Card.Section>
          <Form onSubmit={this.nextStep}>
            @embed {this.steps[this.currentStep].component} {
              data: this.formData
              errors: this.errors[this.currentStep]
              onChange: (field, value) => this.formData[field] = value
            }
          </Form>
        </Card.Section>
        
        <Card.Section>
          <Stack distribution="equalSpacing">
            <Button
              disabled={this.currentStep === 0}
              onClick={() => this.currentStep--}>
              Previous
            </Button>
            
            <Button
              primary
              loading={this.isValidating}
              disabled={!this.canProceed}
              onClick={this.nextStep}>
              {this.currentStep === this.steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </Stack>
        </Card.Section>
      </Card>
    }
  }
}`,
  },

  'user-avatar': {
    name: 'User Avatar',
    type: 'component',
    description: 'Simple avatar component with online status indicator',
    technologies: ['Vanilla JS'],
    tags: ['Basic', 'UI'],
    code: `component UserAvatar {
  props {
    user: User
    size?: 'small' | 'medium' | 'large' = 'medium'
    showStatus?: boolean = true
  }
  
  computed {
    initials(): string {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    }
    
    sizeClass(): string {
      return \`avatar--\${this.size}\`
    }
  }
  
  render {
    @vanilla {
      <div class="user-avatar {this.sizeClass}">
        @if (this.user.avatar) {
          <img src={this.user.avatar} 
               alt={this.user.name}
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="avatar-fallback" style="display: none;">
            {this.initials}
          </div>
        } @else {
          <div class="avatar-fallback">
            {this.initials}
          </div>
        }
        
        @if (this.showStatus && this.user.isOnline) {
          <span class="status-indicator status--online"></span>
        }
      </div>
    }
  }
  
  styles {
    .user-avatar {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      background: var(--p-color-avatar-background);
      
      &.avatar--small {
        width: 32px;
        height: 32px;
        font-size: 12px;
      }
      
      &.avatar--medium {
        width: 48px;
        height: 48px;
        font-size: 16px;
      }
      
      &.avatar--large {
        width: 64px;
        height: 64px;
        font-size: 20px;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .avatar-fallback {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--p-color-text-on-color);
        font-weight: var(--p-font-weight-medium);
      }
      
      .status-indicator {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        
        &.status--online {
          background: var(--p-color-icon-success);
        }
      }
    }
  }
}`,
  },
};