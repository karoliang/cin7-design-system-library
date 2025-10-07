# Repository Guidelines

## Project Structure & Module Organization
- Use `packages/*` for publishable modules: `core` hosts shared TS utilities, `design-tokens` surfaces styling primitives, `polaris-adapter`, `extjs-adapters`, `cli`, `include-system`, `typescript-sdk`, `vanilla-js`.
- `apps/` contains integration sandboxes (`playground`) and end-to-end demos (`example-dashboard`, `examples`) that pull the packages via workspace aliases.
- `docs/` stores reference architecture and process notes; update it when behaviour changes.
- `polaris/` mirrors the upstream Shopify Polaris site; treat it as a read-only submodule and rely on `update-polaris.sh` for refreshes.

## Build, Test, and Development Commands
- `pnpm install` (root): install workspace dependencies; rerun after adding packages.
- `pnpm run dev`: start watch mode for all `@cin7/*` packages (ideal while editing utilities or adapters).
- `pnpm run build`: produce TS outputs through `tsup` in each package.
- `pnpm run test`: execute Vitest suites across the workspace.
- `pnpm run lint` / `pnpm run typecheck`: enforce ESLint + TypeScript rules.
- `npm run build:all`: build Polaris docs and stage artifacts into `dist/` for deployment previews.

## Coding Style & Naming Conventions
- TypeScript is the default; keep modules under `src/` and export from `index.ts`.
- Follow ESLint defaults with TypeScript plugin; prefer single quotes, trailing commas, and 2-space indentation.
- Name React components and classes with PascalCase, hooks with `use*`, and utilities/constants with camelCase or UPPER_SNAKE_CASE respectively.
- Co-locate styles and tokens under `design-tokens`; reference them via explicit import paths instead of relative backtracking.

## Testing Guidelines
- Use Vitest (`*.test.ts` alongside the code) for unit coverage; mock DOM APIs with `happy-dom` when needed.
- Validate adapters inside the relevant `apps/*` sandbox before submitting.
- New features must include regression tests covering both happy paths and failure states; keep tests deterministic.

## BMAD Agent
- Decisions:
  - Keep the existing HTML code tab unchanged; include guidance will live in a new dedicated section.
  - Apply include coverage to every documented component and variation, including deprecated and internal-only pages.
  - Surface graceful fallback copy in the UI when an include mapping is missing, while logging gaps for follow-up.
- Tasks:
  - [ ] Extend `polaris/polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.tsx` (and related styles/utilities) to render an Include System panel per example with React, ExtJS, Vanilla, and TypeScript include snippets derived from `parseExampleFileName`.
  - [ ] Expand the include registry in `packages/include-system/src/registry/ComponentRegistry.ts` (and supporting tests) so every documented component variation in the MDX frontmatter resolves across all four languages.
  - [ ] Create an automated data source (script or generated JSON under `scripts/`) that exports the component→variation matrix from the MDX frontmatter and use it to validate registry coverage in CI.
  - [ ] Update documentation (`docs/include-system-guide.mdx`, relevant getting-started pages, and `CHANGELOG.md`) to describe the new include panels and workflow.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`type: succinct summary`) as seen in history (e.g., `feat: add include system schema`).
- Squash related work into logical commits; include workspace package scope when helpful.
- PRs should describe the change, reference Jira/GitHub issues, list manual test commands, and attach UI screenshots or recordings when altering visuals.
- Ensure lint, typecheck, and test commands pass locally before requesting review.
