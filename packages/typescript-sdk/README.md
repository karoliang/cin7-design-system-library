# @cin7/typescript-sdk

TypeScript SDK for business logic patterns in the Cin7 DSL Application Layer. This package provides patterns and utilities for building robust, type-safe business logic separated from UI concerns.

## Philosophy

The Application Layer in Cin7 DSL is where your business logic lives. This package provides patterns to:

- Encapsulate business rules
- Manage data access
- Handle application state
- Transform data between layers
- Validate business operations

## Installation

```bash
pnpm add @cin7/typescript-sdk
```

## Core Patterns

### Repository Pattern

Abstracts data access logic:

```typescript
import { BaseRepository, IRepository } from '@cin7/typescript-sdk/patterns';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

class UserRepository extends BaseRepository<User> {
  async findAll(params?: QueryParams) {
    // Implementation
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }
}
```

### Use Case Pattern

Encapsulates business operations:

```typescript
import { ValidatedUseCase, ValidationError } from '@cin7/typescript-sdk/patterns';
import { z } from '@cin7/typescript-sdk/validation';

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

class CreateUserUseCase extends ValidatedUseCase<
  z.infer<typeof CreateUserSchema>,
  User
> {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {
    super();
  }

  async validate(input: z.infer<typeof CreateUserSchema>) {
    // Check if email already exists
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new ValidationError('Email already in use');
    }
    
    // Validate with schema
    CreateUserSchema.parse(input);
  }

  async performOperation(input: z.infer<typeof CreateUserSchema>) {
    // Create user
    const user = await this.userRepo.create({
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
    });
    
    // Send welcome email
    await this.emailService.sendWelcome(user);
    
    return user;
  }
}
```

### Specification Pattern

Express business rules as reusable specifications:

```typescript
import { Specification, SpecificationBuilder } from '@cin7/typescript-sdk/patterns';

// Define specifications
class ActiveUserSpec extends Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.status === 'active';
  }
}

class VerifiedEmailSpec extends Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.emailVerified === true;
  }
}

// Combine specifications
const canLoginSpec = new ActiveUserSpec()
  .and(new VerifiedEmailSpec());

// Use in business logic
if (canLoginSpec.isSatisfiedBy(user)) {
  // Allow login
}

// Or use the builder
const premiumUserSpec = new SpecificationBuilder<User>()
  .equals('subscription', 'premium')
  .greaterThan('credits', 0)
  .build();
```

### Mapper Pattern

Transform data between layers:

```typescript
import { BaseMapper, PropertyMapper } from '@cin7/typescript-sdk/patterns';

// DTO for API response
interface UserDTO {
  id: string;
  full_name: string;
  email_address: string;
  created_timestamp: string;
}

// Domain model
interface UserModel {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserMapper extends BaseMapper<UserDTO, UserModel> {
  map(dto: UserDTO): UserModel {
    return {
      id: dto.id,
      name: dto.full_name,
      email: dto.email_address,
      createdAt: new Date(dto.created_timestamp),
    };
  }
}

// Or use PropertyMapper for simple cases
const userMapper = new PropertyMapper<UserDTO, UserModel>(() => ({} as UserModel))
  .addMapping('id', 'id')
  .addMapping('full_name', 'name')
  .addMapping('email_address', 'email')
  .addMapping('created_timestamp', 'createdAt', (v) => new Date(v));
```

## API Client

Type-safe HTTP client with interceptors:

```typescript
import { createApiClient, ApiError, withRetry } from '@cin7/typescript-sdk/services';

const api = createApiClient({
  baseUrl: process.env.API_URL,
  headers: {
    'X-API-Key': process.env.API_KEY,
  },
  interceptors: {
    request: async (config) => {
      // Add auth token
      const token = await getAuthToken();
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    error: async (error) => {
      if (error.status === 401) {
        // Refresh token
        await refreshAuthToken();
      }
    },
  },
});

// Use the client
const users = await api.getPaginated<User>('/users', {
  page: 1,
  pageSize: 20,
  filters: [{ field: 'status', operator: 'eq', value: 'active' }],
});

// With retry
const user = await withRetry(
  () => api.get<User>(`/users/${id}`),
  { maxAttempts: 3, backoff: true }
);
```

## State Management

Framework-agnostic state patterns:

```typescript
import { createStore, createAsyncState, createAsyncActions } from '@cin7/typescript-sdk/state';

interface UserState {
  currentUser: User | null;
  users: AsyncState<User[]>;
  setCurrentUser: (user: User | null) => void;
  usersActions: AsyncActions<User[]>;
  reset: () => void;
}

const useUserStore = createStore<UserState>(
  {
    name: 'users',
    persist: true,
    devtools: true,
    initialState: {
      currentUser: null,
      users: createAsyncState<User[]>([]),
    },
  },
  (set, get) => ({
    currentUser: null,
    users: createAsyncState<User[]>([]),
    
    setCurrentUser: (user) => set((state) => {
      state.currentUser = user;
    }),
    
    usersActions: createAsyncActions<User[]>(set, 'users'),
    
    reset: () => set((state) => {
      state.currentUser = null;
      state.users = createAsyncState<User[]>([]);
    }),
  })
);
```

## Validation

Schema validation with Zod:

```typescript
import { schema, CommonSchemas, createFormValidator } from '@cin7/typescript-sdk/validation';

// Define schema
const UserSchema = schema({
  name: z.string().min(2).max(50),
  email: CommonSchemas.email,
  age: z.number().min(18),
  website: CommonSchemas.url.optional(),
})
  .withId()
  .withTimestamps()
  .build();

// Create form validator
const validator = createFormValidator(UserSchema);

// Validate entire form
try {
  const validData = validator.validate(formData);
} catch (error) {
  const errors = formatValidationErrors(error);
}

// Validate single field
const emailError = validator.validateField('email', 'invalid-email');

// Check if data is valid
if (validator.isValid(data)) {
  // TypeScript knows data is valid here
}
```

## Best Practices

1. **Separate Concerns**: Keep business logic in use cases, data access in repositories
2. **Type Safety**: Leverage TypeScript's type system throughout
3. **Testability**: Use dependency injection and interfaces
4. **Error Handling**: Use specific error types for different scenarios
5. **Validation**: Validate at boundaries (API, use cases)

## When to Use

Use the TypeScript SDK when:
- Building complex business logic
- Managing application state
- Integrating with APIs
- Implementing domain-driven design
- Need separation between UI and business logic

Use simpler patterns when:
- Building simple CRUD operations
- Prototyping
- UI-only features

## License

MIT