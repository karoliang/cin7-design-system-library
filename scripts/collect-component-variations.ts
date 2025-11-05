#!/usr/bin/env node

/**
 * Collect component variation metadata from Polaris MDX frontmatter.
 * Outputs a JSON payload consumed by Include System helpers and tests.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

interface ComponentVariationDetail {
  fileName: string;
  exampleSlug: string;
  title: string | null;
  description: string | null;
}

interface ComponentVariationEntry {
  group: string;
  slug: string;
  title: string;
  path: string;
  variationCount: number;
  variations: ComponentVariationDetail[];
}

interface ComponentVariationDataset {
  generatedAt: string;
  root: string;
  totals: { componentCount: number; variationCount: number };
  components: ComponentVariationEntry[];
}

interface FrontmatterData {
  title?: string;
  examples?: Array<{
    fileName: string;
    title?: string;
    description?: string;
  }>;
}

const ROOT = path.resolve(__dirname, '..');
const IS_CHECK_MODE = process.argv.includes('--check');
const CONTENT_ROOT = path.join(
  ROOT,
  'polaris',
  'polaris.shopify.com',
  'content',
  'components',
);
const OUTPUT_DIR = path.join(
  ROOT,
  'polaris',
  'polaris.shopify.com',
  'generated',
);
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'component-variations.json');
const CONTENT_ROOT_RELATIVE = normalizePath(
  path.relative(ROOT, CONTENT_ROOT),
);
const INCLUDE_SYSTEM_GENERATED_DIR = path.join(
  ROOT,
  'packages',
  'include-system',
  'src',
  'generated',
);
const INCLUDE_SYSTEM_TS_FILE = path.join(
  INCLUDE_SYSTEM_GENERATED_DIR,
  'componentVariations.ts',
);

async function main(): Promise<void> {
  const filePaths = await walkDir(CONTENT_ROOT);
  const components: ComponentVariationEntry[] = [];

  for (const filePath of filePaths) {
    if (!filePath.endsWith('.mdx')) {
      continue;
    }

    const relativePath = path.relative(CONTENT_ROOT, filePath);
    const group = relativePath.split(path.sep)[0];
    const slug = path.basename(filePath, '.mdx');

    if (slug === 'index') {
      continue;
    }

    const raw = await fs.promises.readFile(filePath, 'utf8');
    const frontmatter = extractFrontmatter(raw);

    if (!frontmatter) {
      continue;
    }

    let data: FrontmatterData;
    try {
      data = yaml.load(frontmatter) as FrontmatterData;
    } catch (error) {
      throw new Error(
        `Failed to parse frontmatter for ${relativePath}: ${(error as Error).message}`,
      );
    }

    if (!data || typeof data !== 'object') {
      continue;
    }

    const title = data.title || slug;
    const examples = Array.isArray(data.examples) ? data.examples : [];

    const variations: ComponentVariationDetail[] = examples.map((example) => {
      const fileName = example.fileName || '';
      const exampleSlug = fileName.endsWith('.tsx')
        ? fileName.slice(0, -4)
        : fileName;

      return {
        fileName,
        exampleSlug,
        title: example.title || null,
        description: example.description || null,
      };
    });

    components.push({
      group,
      slug,
      title,
      path: normalizePath(relativePath),
      variationCount: variations.length,
      variations,
    });
  }

  components.sort((a, b) => {
    if (a.group === b.group) {
      return a.slug.localeCompare(b.slug);
    }
    return a.group.localeCompare(b.group);
  });

  const totals = components.reduce(
    (acc, component) => {
      acc.variationCount += component.variationCount;
      acc.componentCount += 1;
      return acc;
    },
    {componentCount: 0, variationCount: 0},
  );

  const payload: ComponentVariationDataset = {
    generatedAt: new Date().toISOString(),
    root: CONTENT_ROOT_RELATIVE,
    totals,
    components,
  };

  const existingPayload = await readExistingJson(OUTPUT_FILE);
  if (existingPayload) {
    const normalizedExisting = normalizeDataset(existingPayload);
    const normalizedCurrent = normalizeDataset(payload);

    if (normalizedExisting === normalizedCurrent) {
      payload.generatedAt = existingPayload.generatedAt;
    }
  }

  if (IS_CHECK_MODE) {
    await runCheck(payload);
    return;
  }

  await fs.promises.mkdir(OUTPUT_DIR, {recursive: true});
  await fs.promises.writeFile(
    OUTPUT_FILE,
    JSON.stringify(payload, null, 2),
    'utf8',
  );

  await fs.promises.mkdir(INCLUDE_SYSTEM_GENERATED_DIR, {recursive: true});
  const tsPayload = buildTsPayload(payload);

  await fs.promises.writeFile(INCLUDE_SYSTEM_TS_FILE, tsPayload, 'utf8');

  console.log(
    [
      `Collected ${totals.componentCount} components`,
      `with ${totals.variationCount} variations`,
      `→ ${normalizePath(OUTPUT_FILE)}`,
    ].join(' '),
  );
}

async function walkDir(dir: string): Promise<string[]> {
  const dirents = await fs.promises.readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return walkDir(res);
      }
      return res;
    }),
  );
  return files.flat();
}

function extractFrontmatter(content: string): string | null {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    return null;
  }
  return frontmatterMatch[1];
}

function normalizePath(targetPath: string): string {
  return targetPath.split(path.sep).join('/');
}

function buildTsPayload(payload: ComponentVariationDataset): string {
  return [
    '/* eslint-disable */',
    '// Auto-generated by scripts/collect-component-variations.ts',
    '// Do not edit manually.',
    '',
    'export interface ComponentVariationDetail {',
    '  fileName: string;',
    '  exampleSlug: string;',
    '  title: string | null;',
    '  description: string | null;',
    '}',
    '',
    'export interface ComponentVariationEntry {',
    '  group: string;',
    '  slug: string;',
    '  title: string;',
    '  path: string;',
    '  variationCount: number;',
    '  variations: ComponentVariationDetail[];',
    '}',
    '',
    'export interface ComponentVariationDataset {',
    '  generatedAt: string;',
    '  root: string;',
    '  totals: { componentCount: number; variationCount: number };',
    '  components: ComponentVariationEntry[];',
    '}',
    '',
    `export const componentVariationDataset: ComponentVariationDataset = ${JSON.stringify(
      payload,
      null,
      2,
    )};`,
    '',
  ].join('\n');
}

async function runCheck(payload: ComponentVariationDataset): Promise<void> {
  try {
    const existingJson = JSON.parse(await fs.promises.readFile(OUTPUT_FILE, 'utf8'));
    const comparablePayload = {...payload, generatedAt: existingJson.generatedAt};
    const normalizedExisting = JSON.stringify(existingJson, null, 2);
    const normalizedNew = JSON.stringify(comparablePayload, null, 2);

    if (normalizedExisting !== normalizedNew) {
      console.error(
        'Component variation dataset is stale. Run "pnpm collect:variations" and commit updated files.',
      );
      process.exit(1);
    }

    const existingTs = (await fs.promises.readFile(INCLUDE_SYSTEM_TS_FILE, 'utf8')).trim();
    const expectedTs = buildTsPayload(comparablePayload).trim();

    if (existingTs !== expectedTs) {
      console.error(
        'Generated TypeScript dataset is out of sync. Run "pnpm collect:variations" and commit updated files.',
      );
      process.exit(1);
    }

    console.log('Component variation dataset is up to date.');
  } catch (error) {
    console.error('Failed to validate component variations:', (error as Error).message);
    process.exit(1);
  }
}

async function readExistingJson(filePath: string): Promise<ComponentVariationDataset | null> {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error && (error as any).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function normalizeDataset(data: ComponentVariationDataset): string {
  return JSON.stringify(
    {
      ...data,
      generatedAt: null,
    },
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});