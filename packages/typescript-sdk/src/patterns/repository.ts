/**
 * Repository pattern for data access abstraction
 * Separates business logic from data access concerns
 */

import type { BaseEntity, PaginatedResponse, QueryParams } from '@cin7/core/types';

/**
 * Base repository interface
 */
export interface IRepository<T extends BaseEntity, CreateDTO = Omit<T, keyof BaseEntity>, UpdateDTO = Partial<CreateDTO>> {
  findAll(params?: QueryParams): Promise<PaginatedResponse<T>>;
  findById(id: string): Promise<T | null>;
  findOne(criteria: Partial<T>): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  count(criteria?: Partial<T>): Promise<number>;
}

/**
 * Abstract base repository implementation
 */
export abstract class BaseRepository<T extends BaseEntity, CreateDTO = Omit<T, keyof BaseEntity>, UpdateDTO = Partial<CreateDTO>>
  implements IRepository<T, CreateDTO, UpdateDTO> {
  
  constructor(protected readonly resourceName: string) {}

  abstract findAll(params?: QueryParams): Promise<PaginatedResponse<T>>;
  abstract findById(id: string): Promise<T | null>;
  abstract findOne(criteria: Partial<T>): Promise<T | null>;
  abstract create(data: CreateDTO): Promise<T>;
  abstract update(id: string, data: UpdateDTO): Promise<T>;
  abstract delete(id: string): Promise<boolean>;

  async exists(id: string): Promise<boolean> {
    const entity = await this.findById(id);
    return entity !== null;
  }

  async count(criteria?: Partial<T>): Promise<number> {
    // Default implementation - override for optimization
    const result = await this.findAll();
    return result.pagination.total;
  }

  /**
   * Batch operations
   */
  async createMany(items: CreateDTO[]): Promise<T[]> {
    return Promise.all(items.map(item => this.create(item)));
  }

  async updateMany(updates: Array<{ id: string; data: UpdateDTO }>): Promise<T[]> {
    return Promise.all(
      updates.map(({ id, data }) => this.update(id, data))
    );
  }

  async deleteMany(ids: string[]): Promise<boolean[]> {
    return Promise.all(ids.map(id => this.delete(id)));
  }
}

/**
 * In-memory repository for testing
 */
export class InMemoryRepository<T extends BaseEntity, CreateDTO = Omit<T, keyof BaseEntity>, UpdateDTO = Partial<CreateDTO>>
  extends BaseRepository<T, CreateDTO, UpdateDTO> {
  
  private data: Map<string, T> = new Map();
  private nextId = 1;

  async findAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
    const items = Array.from(this.data.values());
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: items.slice(start, end),
      pagination: {
        page,
        pageSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pageSize),
      },
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.data.get(id) || null;
  }

  async findOne(criteria: Partial<T>): Promise<T | null> {
    for (const item of this.data.values()) {
      if (this.matches(item, criteria)) {
        return item;
      }
    }
    return null;
  }

  async create(data: CreateDTO): Promise<T> {
    const id = String(this.nextId++);
    const now = new Date();
    const entity = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    } as T;
    
    this.data.set(id, entity);
    return entity;
  }

  async update(id: string, data: UpdateDTO): Promise<T> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error(`Entity with id ${id} not found`);
    }

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    } as T;
    
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.data.delete(id);
  }

  private matches(item: T, criteria: Partial<T>): boolean {
    for (const [key, value] of Object.entries(criteria)) {
      if (item[key as keyof T] !== value) {
        return false;
      }
    }
    return true;
  }

  // Test helpers
  clear(): void {
    this.data.clear();
    this.nextId = 1;
  }

  seed(items: T[]): void {
    items.forEach(item => this.data.set(item.id, item));
  }
}