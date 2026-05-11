# A11y Sandbox

An interactive sandbox for comparing accessible and inaccessible web UI patterns. Toggle accessibility features on and off to see how the same interface behaves with and without proper ARIA attributes, semantic markup, and keyboard support.

The app uses [Mantine](https://mantine.dev) as a component library. While Mantine provides accessible primitives, using a component library alone does not substitute for deliberate accessibility implementation — correct ARIA attributes, semantic markup, and labelling still require intentional choices from the developer.

**[Live demo](https://a11y-sandbox-octavcodrea.vercel.app/)**

## What it covers

Each demo section ships two versions of the same UI — one ignoring accessibility, one built with it in mind:

| Demo | What's shown |
|---|---|
| **File list** | `<button>` + `aria-expanded` vs. non-interactive divs; list semantics |
| **Conference controls** | `aria-label` on icon buttons; `aria-live="assertive"` for state announcements |
| **Settings tabs** | `role="tablist"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `aria-labelledby` |
| **Email client** | `role="tab"`, `aria-selected`, labeled checkboxes and actions |
| **Sign-up form** | `aria-invalid`, `aria-describedby`, `role="alert"` for validation errors |
| **Direct message** | `role="log"`, `aria-live="polite"`, sender context via `aria-label` on bubbles |
| **Header / nav** | `<header>`, `<nav>`, `<main>` landmarks; `aria-current` on breadcrumbs |
| **Search** | `<form role="search">`, labeled input |

Additional features:
- **Hover inspector** — hover any element to see its tag and active ARIA attributes in a live panel
- **Live region** — `role="status"` / `aria-live="polite"` announces the toggle state to screen readers
- **Keyboard shortcuts** — Alt+A / Alt+V / Alt+H (⌥+Shift on Mac) for conference controls

## Tech stack

- React 18 + TypeScript
- [Vite](https://vitejs.dev/) (dev server and production build)
- React Router v6
- Mantine (UI components)
- Tailwind CSS + SCSS modules
- Zustand (state)
- Lucide React (icons)
- [Vitest](https://vitest.dev/) + Testing Library (unit tests)

## Local setup

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173` (Vite default). You can also use `npm start`, which runs the same dev server.

### Other commands

| Command | Purpose |
| --- | --- |
| `npm run build` | Typecheck (`tsc`) then production build to `dist/` |
| `npm run preview` | Serve the contents of `dist/` locally |
| `npm test` | Run Vitest in watch mode |
| `npx vitest run` | Run tests once (e.g. in CI) |

Deployment on Vercel uses the Vite preset; production output is written to **`dist/`**.
