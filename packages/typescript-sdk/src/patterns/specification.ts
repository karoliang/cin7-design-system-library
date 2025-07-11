/**
 * Specification pattern for business rules
 * Encapsulates business rules that can be combined and reused
 */

/**
 * Base specification interface
 */
export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}

/**
 * Abstract base specification
 */
export abstract class Specification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, other);
  }

  or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, other);
  }

  not(): ISpecification<T> {
    return new NotSpecification(this);
  }

  /**
   * Check if all items satisfy the specification
   */
  allSatisfy(candidates: T[]): boolean {
    return candidates.every(candidate => this.isSatisfiedBy(candidate));
  }

  /**
   * Check if any item satisfies the specification
   */
  anySatisfy(candidates: T[]): boolean {
    return candidates.some(candidate => this.isSatisfiedBy(candidate));
  }

  /**
   * Filter items that satisfy the specification
   */
  filter(candidates: T[]): T[] {
    return candidates.filter(candidate => this.isSatisfiedBy(candidate));
  }

  /**
   * Find first item that satisfies the specification
   */
  findFirst(candidates: T[]): T | undefined {
    return candidates.find(candidate => this.isSatisfiedBy(candidate));
  }
}

/**
 * Composite specifications
 */
class AndSpecification<T> extends Specification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends Specification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends Specification<T> {
  constructor(private spec: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

/**
 * Common specifications
 */
export class PropertySpecification<T, K extends keyof T> extends Specification<T> {
  constructor(
    private property: K,
    private predicate: (value: T[K]) => boolean
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.predicate(candidate[this.property]);
  }
}

export class ComparisonSpecification<T, K extends keyof T> extends Specification<T> {
  constructor(
    private property: K,
    private operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte',
    private value: T[K]
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    const candidateValue = candidate[this.property];
    
    switch (this.operator) {
      case 'eq': return candidateValue === this.value;
      case 'ne': return candidateValue !== this.value;
      case 'gt': return candidateValue > this.value;
      case 'gte': return candidateValue >= this.value;
      case 'lt': return candidateValue < this.value;
      case 'lte': return candidateValue <= this.value;
      default: return false;
    }
  }
}

export class RangeSpecification<T, K extends keyof T> extends Specification<T> {
  constructor(
    private property: K,
    private min: T[K],
    private max: T[K],
    private inclusive = true
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    const value = candidate[this.property];
    
    if (this.inclusive) {
      return value >= this.min && value <= this.max;
    } else {
      return value > this.min && value < this.max;
    }
  }
}

export class InSpecification<T, K extends keyof T> extends Specification<T> {
  constructor(
    private property: K,
    private values: T[K][]
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.values.includes(candidate[this.property]);
  }
}

/**
 * Specification builder for fluent API
 */
export class SpecificationBuilder<T> {
  private specs: ISpecification<T>[] = [];

  where<K extends keyof T>(
    property: K,
    predicate: (value: T[K]) => boolean
  ): this {
    this.specs.push(new PropertySpecification(property, predicate));
    return this;
  }

  equals<K extends keyof T>(property: K, value: T[K]): this {
    this.specs.push(new ComparisonSpecification(property, 'eq', value));
    return this;
  }

  notEquals<K extends keyof T>(property: K, value: T[K]): this {
    this.specs.push(new ComparisonSpecification(property, 'ne', value));
    return this;
  }

  greaterThan<K extends keyof T>(property: K, value: T[K]): this {
    this.specs.push(new ComparisonSpecification(property, 'gt', value));
    return this;
  }

  lessThan<K extends keyof T>(property: K, value: T[K]): this {
    this.specs.push(new ComparisonSpecification(property, 'lt', value));
    return this;
  }

  between<K extends keyof T>(property: K, min: T[K], max: T[K], inclusive = true): this {
    this.specs.push(new RangeSpecification(property, min, max, inclusive));
    return this;
  }

  in<K extends keyof T>(property: K, values: T[K][]): this {
    this.specs.push(new InSpecification(property, values));
    return this;
  }

  build(): ISpecification<T> {
    if (this.specs.length === 0) {
      throw new Error('No specifications defined');
    }
    
    return this.specs.reduce((acc, spec) => acc.and(spec));
  }
}