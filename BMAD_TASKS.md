# BMAD Include System Tasks

This brief expands the TODO list from `AGENTS.md` so Bmad can start execution.  
Decisions to observe:
- Keep the existing HTML code tab untouched; include guidance appears in a new section.
- Every documented component variation (including deprecated/internal-only) needs coverage.
- When a mapping is missing, render graceful fallback copy and log the gap for remediation.

## 1. Enhance `ComponentExamples` UI
- **Goal**: Add an Include System panel under each rendered example with tabs for React, ExtJS, Vanilla, and TypeScript include statements, plus fallback messaging.
- **Primary files**:
  - `polaris/polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.tsx`
  - `polaris/polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.module.scss`
  - `polaris/polaris.shopify.com/src/utils/codeVariants.ts` (if helper lives here or new util)
- **Key steps**:
  1. Use `parseExampleFileName` to derive component + variation slugs.
  2. Fetch include snippets via a new helper (e.g., `getIncludeExamples`) that talks to the registry.
  3. Render a dedicated panel (below the existing code block) with Headless UI tabs mirroring the Code component pattern.
  4. Show fallback copy when a language/variation is missing; emit console warning for analytics.
  5. Add unit tests (Vitest) covering happy path + missing mapping scenarios.
- **Verification**: Run `pnpm --filter polaris.shopify.com test`. Manually spot-check a few component pages in dev build to ensure layout remains stable.

## 2. Expand Include Registry Coverage
- **Goal**: Ensure `packages/include-system` resolves every component variation enumerated in the docs across four languages.
- **Primary files**:
  - `packages/include-system/src/registry/ComponentRegistry.ts`
  - Add/adjust tests in `packages/include-system` (create `src/__tests__` if missing).
- **Key steps**:
  1. Use the generated variation dataset (Task 3) to understand the full matrix.
  2. Populate registry entries for React/Vanilla/ExtJS/TypeScript components and their variations; reuse existing import paths or add new ones.
  3. Add a validation test that iterates the dataset and asserts `componentRegistry.isAvailable(...)` returns true; include descriptive failures.
  4. Document any intentional exceptions (e.g., if a variation cannot exist in a language) so fallback copy is expected.
- **Verification**: Run `pnpm --filter @cin7/include-system test`. Ensure TypeScript types compile with `pnpm --filter @cin7/include-system build`.

## 3. Automate Variation Dataset
- **Goal**: Generate a machine-readable list of component → variation slugs directly from MDX frontmatter, consumed by tests and the UI.
- **Primary files**:
  - Create script under `scripts/collect-component-variations.ts` (or similar).
  - Optional JSON artifact (e.g., `polaris/polaris.shopify.com/generated/component-variations.json`) committed to repo.
- **Key steps**:
  1. Traverse `polaris/polaris.shopify.com/content/components/**/**/*.mdx` and parse frontmatter.
  2. Emit slug, component title, variation list, and category.
  3. Expose script via `package.json` (e.g., `pnpm run collect:variations`) so CI can regenerate.
  4. If output is committed, add a lint step to diff and ensure up-to-date; otherwise load on demand at runtime/build.
- **Verification**: Run the script locally, confirm counts (96 components, 490 variations). Update documentation if totals change.

## 4. Documentation Updates
- **Goal**: Communicate the Include System panel addition and registry coverage in public docs.
- **Primary files**:
  - `docs/include-system-guide.mdx`
  - Relevant getting-started pages (`polaris/polaris.shopify.com/content/getting-started/*.mdx`)
  - `CHANGELOG.md`
- **Key steps**:
  1. Describe how to use the new include panel on component pages, with screenshot reference if possible.
  2. Update quick-start instructions to highlight the automatic include snippets.
  3. Add changelog entry (e.g., `docs: expose include snippets per component`).
  4. Cross-link to the automation script if useful for contributors.
- **Verification**: Build docs locally (`cd polaris/polaris.shopify.com && pnpm build`) to ensure MDX compiles.

## Coordination Notes
- Tasks 1 & 2 depend on Task 3’s dataset; prioritize the script first.
- Registry + UI changes likely require synchronized PR or shared feature branch.
- Keep existing analytics (copy tracking) intact and consider logging when fallbacks display to surface gaps.

