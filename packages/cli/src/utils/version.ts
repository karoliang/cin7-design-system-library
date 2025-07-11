/**
 * Version utility for CLI
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export function getVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version;
  } catch {
    return '0.0.0';
  }
}