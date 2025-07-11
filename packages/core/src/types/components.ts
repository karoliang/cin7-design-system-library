/**
 * Component-related types for Cin7 DSL framework
 */

import type { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

// Component prop types
export type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T>;

export type PolymorphicProps<T extends ElementType> = ComponentProps<T> & {
  as?: T;
};

// Event handler types
export type EventHandler<T = HTMLElement> = (event: React.SyntheticEvent<T>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type SubmitHandler<T = HTMLFormElement> = (event: React.FormEvent<T>) => void;

// Component lifecycle types
export type ComponentStatus = 'alpha' | 'beta' | 'stable' | 'legacy' | 'deprecated';

export interface ComponentMetadata {
  name: string;
  status: ComponentStatus;
  version: string;
  description?: string;
  examples?: ReactElement[];
}

// ExtJS integration types
export interface ExtJSConfig {
  xtype?: string;
  [key: string]: any;
}

export interface ExtJSComponentProps<T extends ExtJSConfig = ExtJSConfig> {
  config: T;
  onReady?: (component: any) => void;
  onDestroy?: () => void;
}