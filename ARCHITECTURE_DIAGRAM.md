# Cin7 DSL Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Application Layer"
        A[Business Logic<br/>TypeScript SDK]
        A1[Repositories]
        A2[Use Cases]
        A3[Domain Models]
        A4[API Client]
        A --> A1
        A --> A2
        A --> A3
        A --> A4
    end
    
    subgraph "Component Layer"
        B[React Components<br/>Polaris Adapter]
        C[ExtJS Components<br/>ExtJS Adapters]
        B1[Polaris UI]
        B2[Custom React]
        C1[Grids]
        C2[Forms]
        B --> B1
        B --> B2
        C --> C1
        C --> C2
    end
    
    subgraph "UI Interaction Layer"
        D[Vanilla JS<br/>Utilities]
        D1[DOM Manipulation]
        D2[Event Handling]
        D3[Animations]
        D --> D1
        D --> D2
        D --> D3
    end
    
    subgraph "Design System Layer"
        E[Design Tokens]
        E1[Colors]
        E2[Typography]
        E3[Spacing]
        E4[Themes]
        E --> E1
        E --> E2
        E --> E3
        E --> E4
    end
    
    subgraph "Core Layer"
        F[Core Utilities]
        F1[Types]
        F2[Helpers]
        F3[Event Bus]
        F --> F1
        F --> F2
        F --> F3
    end
    
    A --> B
    A --> C
    B --> D
    C --> D
    D --> E
    E --> F
    
    F3 -.-> A
    F3 -.-> B
    F3 -.-> C
    F3 -.-> D
```

## Layer Communication Flow

```mermaid
sequenceDiagram
    participant User
    participant VanillaJS
    participant React
    participant ExtJS
    participant TypeScript
    participant EventBus
    
    User->>VanillaJS: Click Add Product
    VanillaJS->>React: Update UI State
    React->>TypeScript: Call AddProduct UseCase
    TypeScript->>TypeScript: Validate Business Rules
    TypeScript->>EventBus: Emit product:created
    EventBus-->>ExtJS: Notify Grid
    EventBus-->>React: Update Components
    ExtJS->>ExtJS: Add Row to Grid
    React->>User: Show Success Toast
```

## Package Dependencies

```mermaid
graph LR
    subgraph "Framework Packages"
        CORE[@cin7/core]
        TOKENS[@cin7/design-tokens]
        VANILLA[@cin7/vanilla-js]
        REACT[@cin7/polaris-adapter]
        EXTJS[@cin7/extjs-adapters]
        SDK[@cin7/typescript-sdk]
        CLI[@cin7/cli]
    end
    
    subgraph "External Dependencies"
        POLARIS[Shopify Polaris]
        EXT[ExtJS Framework]
        TS[TypeScript]
        REACTLIB[React]
    end
    
    VANILLA --> CORE
    REACT --> CORE
    REACT --> TOKENS
    REACT --> POLARIS
    REACT --> REACTLIB
    EXTJS --> CORE
    EXTJS --> TOKENS
    EXTJS --> EXT
    SDK --> CORE
    SDK --> TS
    TOKENS --> CORE
    CLI --> CORE
```

## Technology Stack by Layer

| Layer | Technology | Purpose | Package |
|-------|------------|---------|---------|
| **Business Logic** | TypeScript | Type-safe business operations | `@cin7/typescript-sdk` |
| **React Components** | React + Polaris | Modern UI components | `@cin7/polaris-adapter` |
| **ExtJS Components** | ExtJS 7.x | Enterprise grids & forms | `@cin7/extjs-adapters` |
| **UI Interactions** | Vanilla JavaScript | Lightweight DOM manipulation | `@cin7/vanilla-js` |
| **Design System** | CSS Custom Properties | Consistent styling | `@cin7/design-tokens` |
| **Core Utilities** | TypeScript | Shared functionality | `@cin7/core` |

## Event-Driven Architecture

```mermaid
graph TB
    subgraph "Event Bus System"
        EB[Event Bus<br/>@cin7/core]
        
        subgraph "Publishers"
            P1[TypeScript SDK]
            P2[React Components]
            P3[ExtJS Components]
            P4[Vanilla JS]
        end
        
        subgraph "Subscribers"
            S1[Data Stores]
            S2[UI Components]
            S3[Analytics]
            S4[Logging]
        end
        
        P1 -->|product:created| EB
        P2 -->|ui:filter:changed| EB
        P3 -->|grid:sort:changed| EB
        P4 -->|dom:ready| EB
        
        EB -->|*| S1
        EB -->|ui:*| S2
        EB -->|analytics:*| S3
        EB -->|*| S4
    end
```

## Implementation Example Flow

```mermaid
flowchart TB
    Start([User Action])
    
    subgraph "Vanilla JS Layer"
        V1[Event Handler]
        V2[DOM Update]
        V3[Animation]
    end
    
    subgraph "Business Logic Layer"
        B1[Use Case]
        B2[Repository]
        B3[Validation]
        B4[API Call]
    end
    
    subgraph "Component Layer"
        C1{Component Type?}
        C2[React Component]
        C3[ExtJS Grid]
    end
    
    subgraph "State Management"
        S1[Local State]
        S2[Global Store]
        S3[Event Bus]
    end
    
    Start --> V1
    V1 --> B1
    B1 --> B3
    B3 --> B2
    B2 --> B4
    B4 --> S3
    S3 --> C1
    C1 -->|Simple UI| C2
    C1 -->|Data Grid| C3
    C2 --> S1
    C3 --> S2
    S1 --> V2
    S2 --> V2
    V2 --> V3
    V3 --> End([UI Updated])
```

## Benefits of This Architecture

### 1. **Technology Optimization**
- Right tool for each job
- ExtJS for complex enterprise components
- React for modern UI patterns
- Vanilla JS for performance-critical operations

### 2. **Maintainability**
- Clear separation of concerns
- Independent package updates
- Consistent patterns across layers

### 3. **Scalability**
- Modular package structure
- Event-driven communication
- Independent deployment options

### 4. **Developer Experience**
- TypeScript throughout
- Consistent APIs
- Comprehensive tooling

### 5. **Performance**
- Minimal dependencies
- Tree-shakeable packages
- Optimized bundle sizes

## Usage Patterns

### Pattern 1: Simple UI Interaction
```javascript
// Vanilla JS handles simple interactions
import { $, on, addClass } from '@cin7/vanilla-js';

on('#button', 'click', () => {
  addClass('#panel', 'active');
});
```

### Pattern 2: Business Operation
```typescript
// TypeScript handles business logic
import { ProductRepository } from '@cin7/typescript-sdk';

const repo = new ProductRepository();
const products = await repo.findAll({ status: 'active' });
```

### Pattern 3: Enterprise Grid
```javascript
// ExtJS handles complex grids
import { ExtDataGrid } from '@cin7/extjs-adapters';

const grid = ExtDataGrid.create({
  store: productStore,
  features: ['grouping', 'sorting', 'export']
});
```

### Pattern 4: Cross-Layer Communication
```typescript
// Event Bus enables decoupled communication
import { EventBus } from '@cin7/core';

EventBus.on('product:updated', (product) => {
  // All layers can react to this event
});
```