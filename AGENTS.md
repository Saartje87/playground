<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Coding guidelines

### UI: use `@blockle/blocks`

- Build UI from `@blockle/blocks` components first. Check `docs/components/README.md` before writing a custom element.
- Only fall back to plain HTML plus a vanilla-extract `.css.ts` file when Blocks has no equivalent. Style with `vars` tokens from `@blockle/blocks`; no hard-coded colours or spacing, no inline `style`.
- Links: use the `AppLink` component (`src/components/app-link/app-link.tsx`), never `next/link` directly.

### Structure

- Each sub-project is one folder in `src/app/<name>/`: `page.tsx`, `components/`, and `lib/` for pure logic. Register it in `src/config/projects.ts` and give its page a `metadata` title.
- Every component lives in its own folder, grouped by domain/feature: `components/<name>/{<name>.tsx, <name>.css.ts, <name>.test.tsx}`. Import the component file directly (e.g. `../app-link/app-link.tsx`).
- No barrel files: never add `index.ts` files that re-export from other modules.
- `src/components/` is only for code used by two or more projects or by the shell. Keep single-use components in the project's own `components/` folder.
- Always use relative imports (`../../lib/format-path.ts`), including across feature folders. The `@/` alias is not used.

### Tests

- Every new or changed behaviour gets a test in the same change, written test-first (see the `tdd` skill). Pure logic: unit tests in `lib/`. Components: render and behaviour tests with Testing Library via `renderWithTheme` from `src/test/render.tsx`.
- Exempt: pure styling or copy changes.
- Test runner is Vitest (`npm test`). Do not add a second runner.

### Before finishing

Run `npm run check` (Biome, typecheck, tests). It must pass. A pre-commit hook runs the same checks.
