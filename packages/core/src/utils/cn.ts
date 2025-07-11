/**
 * Class name utility for conditional class names
 * Similar to clsx but optimized for our use case
 */

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}