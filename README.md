# Playground

A collection of small experiments and tools. The current project is **JSON
Diff**, a browser-based tool for comparing two JSON documents. Edit either
document to see additions, removals, and replacements update as you type.
Invalid JSON is reported without discarding the last valid comparison.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm test` | Run the tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run ts` | Check TypeScript types |
| `npm run lint` | Check the code with Biome |
| `npm run check` | Run lint, type checking, and tests |

## Project structure

- `src/app/` contains the routes and shared app layout.
- `src/app/json-diff/` contains the JSON Diff tool.
- `src/config/projects.ts` lists the experiments shown on the home page.
- `src/components/` contains shared UI components.
- `docs/` contains project setup notes and component guides.

To add an experiment to the home page, implement its route under `src/app/`
and add its title, description, and route to `src/config/projects.ts`.

## Tech stack

The app uses Next.js with the App Router, React, and TypeScript. Its interface
uses [Blockle Blocks](https://www.npmjs.com/package/@blockle/blocks) with the
Momotaro theme and Vanilla Extract for styles.
