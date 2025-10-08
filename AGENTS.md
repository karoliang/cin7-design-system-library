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
  - Component include snippets in the docs are rendered statically; rely on the generated dataset plus registry coverage tests rather than runtime lookups.
  - Run `pnpm collect:variations` (or `pnpm check:variations` in CI) whenever MDX examples change to keep dataset outputs committed.
  - Keep include coverage aligned with all documented components, including deprecated/internal pages, via the registry + tests.
- Tasks:
  - [ ] Maintain the static include panel in `polaris/polaris.shopify.com/src/components/ComponentExamples/ComponentExamples.tsx` and its styling.
  - [ ] Extend `packages/include-system` registry/test coverage when new examples ship.
  - [ ] Refresh docs (`docs/include-system-guide.mdx`, Getting Started) whenever the include workflow evolves.
  - [ ] Verify `scripts/collect-component-variations.js`, the JSON snapshot, and the TS export are current before submitting changes.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`type: succinct summary`) as seen in history (e.g., `feat: add include system schema`).
- Squash related work into logical commits; include workspace package scope when helpful.
- PRs should describe the change, reference Jira/GitHub issues, list manual test commands, and attach UI screenshots or recordings when altering visuals.
- Ensure lint, typecheck, and test commands pass locally before requesting review.
