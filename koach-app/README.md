# Koach — Training program curation

A faithful implementation of the Koach (Kauvery LMS) **Training program curation**
screen from Figma, built as a fresh CSR app following a strict component-based
architecture and unidirectional data flow.

**Stack:** React + Vite + TypeScript · Tailwind CSS · TanStack Query · Zustand ·
react-hook-form + zod · React Router (lazy routes).

---

## Run it locally

### 1. Prerequisites
- **Node.js 18 or newer** (Vite 5 requires it). Check your version:
  ```bash
  node -v
  ```
  If it prints `v18.x` / `v20.x` / `v22.x` you're good. If `node` is "command not
  found", install it from https://nodejs.org (LTS) and reopen your terminal.

### 2. Get the code on the right branch
```bash
git fetch origin
git checkout koach-design-trail
```

### 3. Install dependencies and start the dev server
```bash
cd koach-app
npm install
npm run dev
```

Vite prints something like:

```
  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173/** in your browser. It opens on the Overview tab.

> Important: the link only works on the machine where `npm run dev` is running.
> A `localhost` URL from a remote/cloud session will not open on your laptop.

### 4. Production build (optional)
```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the built app, prints its own localhost URL
```

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `node`/`npm` not found | Install Node.js LTS from nodejs.org, reopen terminal. |
| Port 5173 already in use | `npm run dev -- --port 3000`, then open that port. |
| Blank page / old build | Hard refresh (Cmd/Ctrl+Shift+R). |
| `npm install` network errors | Check connection/proxy, then re-run `npm install`. |
| Wrong screen | App routes to `/training-program/overview` by default. |

---

## Architecture

```
src/
  components/        atoms · molecules · organisms · templates (presentational shell)
  features/
    training-program/  components · hooks · services · types · index.ts
  pages/             thin, code-split route components (React.lazy)
  routes/            router definition
  store/             Zustand (UI flags, auth, toasts) — client state only
  lib/               query client + mock API layer
  types/             shared types
```

**Data flow:** UI → Hook (TanStack Query) → Service (pure fn) → API (mock) → Hook → UI.
Server data is never put in Zustand and never fetched with `useEffect`.
Data is served from a built-in mock API (`src/lib/api`), so no backend is needed.
