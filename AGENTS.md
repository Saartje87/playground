<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Coding guidelines

### UI: use `@blockle/blocks`

- Before writing or changing any `.tsx`, read `docs/components/README.md` and the guide for what you are building: `forms.md` (inputs, Textarea, Label), `layout.md` (Stack, Inline, Grid, `asChild`), `typography.md` (Text, Heading), `styling.md` (Box props, atoms, `vars` tokens, breakpoints).
- Build UI from `@blockle/blocks` components first.
- If the docs and the installed types (`node_modules/@blockle/blocks*/dist`) disagree, the types win. Fix the docs in the same change.
- Prefer atom props (`Box`, `Text`, `Heading`, `Stack`, `Inline`) over new `.css.ts` classes; see `docs/components/styling.md`. Only fall back to plain HTML plus a vanilla-extract `.css.ts` file when Blocks has no equivalent or atoms cannot express the style. Style with `vars` tokens from `@blockle/blocks`; no hard-coded colours or spacing, no inline `style`.
- In `.css.ts` files use logical CSS properties (`inlineSize`, `paddingBlock`, `marginInline`, `borderInlineStart`), not physical ones (`width`, `padding-top`, `border-left`).
- When upgrading `@blockle/blocks`, check `docs/` against the new package's types and atoms and update them in the same change.
- Blocks feedback: while working, note friction with Blocks, such as a missing component, prop or atom, a workaround that needed custom CSS, an inconsistent API, or a docs gap. At the end of the task, add a short "Blocks feedback" section to your reply with what you hit, the workaround you used, and a suggested improvement. Skip the section if there was nothing. Don't change the library or open issues unless asked.
- Links: use the `AppLink` component (`src/components/app-link/app-link.tsx`), never `next/link` directly.

### Components

- Declare every React component as a typed arrow function: `export const Foo: FC<FooProps> = ({ a }) => ...`, or `FC` when it takes no props. Import `type FC` from `react`. Do not use `function Foo()` declarations or inline-annotated props.
- Define props as a named `type FooProps = { ... }` above the component (or reuse the library's props type). This applies to pages and layouts too: `const Page: FC = ...; export default Page;`.
- Plain helper functions that are not components (e.g. `parse`) stay as normal functions.

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
