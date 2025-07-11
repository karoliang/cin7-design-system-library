/**
 * Mapper pattern for data transformation
 * Converts between different representations of data
 */

/**
 * Base mapper interface
 */
export interface IMapper<TSource, TDestination> {
  map(source: TSource): TDestination;
  mapArray(sources: TSource[]): TDestination[];
}

/**
 * Bidirectional mapper interface
 */
export interface IBidirectionalMapper<T1, T2> {
  mapForward(source: T1): T2;
  mapBackward(source: T2): T1;
  mapForwardArray(sources: T1[]): T2[];
  mapBackwardArray(sources: T2[]): T1[];
}

/**
 * Abstract base mapper
 */
export abstract class BaseMapper<TSource, TDestination> implements IMapper<TSource, TDestination> {
  abstract map(source: TSource): TDestination;

  mapArray(sources: TSource[]): TDestination[] {
    return sources.map(source => this.map(source));
  }

  /**
   * Map with null safety
   */
  mapNullable(source: TSource | null | undefined): TDestination | null {
    return source ? this.map(source) : null;
  }

  /**
   * Map array with null safety
   */
  mapArrayNullable(sources: TSource[] | null | undefined): TDestination[] {
    return sources ? this.mapArray(sources) : [];
  }
}

/**
 * Abstract bidirectional mapper
 */
export abstract class BidirectionalMapper<T1, T2> implements IBidirectionalMapper<T1, T2> {
  abstract mapForward(source: T1): T2;
  abstract mapBackward(source: T2): T1;

  mapForwardArray(sources: T1[]): T2[] {
    return sources.map(source => this.mapForward(source));
  }

  mapBackwardArray(sources: T2[]): T1[] {
    return sources.map(source => this.mapBackward(source));
  }
}

/**
 * Composite mapper for chaining transformations
 */
export class CompositeMapper<T1, T2, T3> implements IMapper<T1, T3> {
  constructor(
    private mapper1: IMapper<T1, T2>,
    private mapper2: IMapper<T2, T3>
  ) {}

  map(source: T1): T3 {
    const intermediate = this.mapper1.map(source);
    return this.mapper2.map(intermediate);
  }

  mapArray(sources: T1[]): T3[] {
    return sources.map(source => this.map(source));
  }
}

/**
 * Property mapper for selective mapping
 */
export class PropertyMapper<TSource, TDestination> extends BaseMapper<TSource, TDestination> {
  private mappings: Array<{
    from: keyof TSource | ((source: TSource) => any);
    to: keyof TDestination;
    transform?: (value: any) => any;
  }> = [];

  constructor(private createDestination: () => TDestination) {
    super();
  }

  addMapping<K extends keyof TDestination>(
    from: keyof TSource | ((source: TSource) => any),
    to: K,
    transform?: (value: any) => TDestination[K]
  ): this {
    this.mappings.push({ from, to, transform });
    return this;
  }

  map(source: TSource): TDestination {
    const destination = this.createDestination();

    for (const { from, to, transform } of this.mappings) {
      const value = typeof from === 'function' ? from(source) : source[from];
      (destination as any)[to] = transform ? transform(value) : value;
    }

    return destination;
  }
}

/**
 * Auto mapper factory
 */
export class MapperFactory {
  private mappers = new Map<string, IMapper<any, any>>();

  register<TSource, TDestination>(
    key: string,
    mapper: IMapper<TSource, TDestination>
  ): void {
    this.mappers.set(key, mapper);
  }

  get<TSource, TDestination>(key: string): IMapper<TSource, TDestination> {
    const mapper = this.mappers.get(key);
    if (!mapper) {
      throw new Error(`Mapper not found for key: ${key}`);
    }
    return mapper;
  }

  create<TSource, TDestination>(
    sourceType: string,
    destinationType: string
  ): IMapper<TSource, TDestination> {
    const key = `${sourceType}->${destinationType}`;
    return this.get(key);
  }
}

/**
 * Common mapping utilities
 */
export const MappingUtils = {
  /**
   * Copy properties from source to destination
   */
  copyProperties<T extends object>(
    source: T,
    destination: any,
    properties: (keyof T)[]
  ): void {
    properties.forEach(prop => {
      if (prop in source) {
        destination[prop] = source[prop];
      }
    });
  },

  /**
   * Transform and copy properties
   */
  transformProperties<TSource extends object, TDestination extends object>(
    source: TSource,
    destination: TDestination,
    transformations: Record<keyof TDestination, (source: TSource) => any>
  ): void {
    Object.entries(transformations).forEach(([key, transform]) => {
      (destination as any)[key] = transform(source);
    });
  },

  /**
   * Exclude properties from object
   */
  excludeProperties<T extends object, K extends keyof T>(
    source: T,
    exclude: K[]
  ): Omit<T, K> {
    const result = { ...source };
    exclude.forEach(key => delete result[key]);
    return result;
  },
};