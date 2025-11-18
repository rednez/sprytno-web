# Frontend (`apps/front`)

Next.js 16 app (App Router) for the Sprytno web preview.

Main stacks:

- Next.js 16 + React 19 (App Router)
- Tailwind CSS 4 + HeroUI
- TanStack Query 5 for data fetching/cache
- Supabase

---

## Getting Started

From the monorepo root:

```bash
pnpm install
pnpm dev --filter front
```

By default the app runs on `http://localhost:3000`.

The main entry is `app/page.tsx`; authenticated/private areas live under `app/(private)`.

---

## Local backend (Supabase)

The frontend expects the local Supabase instance defined under `supabase/`.

Basic flow:

```bash
supabase start
pnpm dev --filter front
```

Stop services with:

```bash
supabase stop
```

Database schema and functions are managed through the SQL files in `supabase/schemas` and migrations in `supabase/migrations`.

---

## Project Structure (frontend)

Key directories in `apps/front/src`:

- `app/` – App Router pages, layouts and API routes
	- `app/(private)` – authenticated area (tasks, participations, profile)
	- `app/login` – login flow and callback handling
- `actions/` – server actions for auth, tasks, users, participations
- `components/` – reusable UI components and feature modules
- `hooks/` – React hooks for tasks, users, participations, geolocation
- `lib/` – parsers, repositories, validators and utils
- `providers/` – app-level providers (React Query, themes)
- `styles/` – global styles and Tailwind setup
- `types/` – shared TypeScript types for tasks, users, participations
- `utils/` – generic utilities (coords, formatting, regexps)

---

## Useful Scripts

Run from the monorepo root unless stated otherwise:

```bash
pnpm dev --filter front      # start Next.js dev server (Turbopack)
pnpm build --filter front    # production build
pnpm start --filter front    # start built app
pnpm lint --filter front     # run ESLint
```

---

## Conventions

- Use Zod schemas from `lib/validation-schemas` for validating API data.
- Keep data access in `lib/repositories` and UI in `components`.
- Prefer React Query hooks from `hooks/` instead of calling `fetch` directly.
- Use shared types from `types/` when adding new features.
