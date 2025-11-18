# Sprytno Web

Monorepo for the Sprytno web: a Next.js frontend (`apps/front`) connected to a local Supabase stack for data and authentication, powered by Turborepo and pnpm.

## Tech Stack

- Next.js App Router (`apps/front`)
- React, Tailwind CSS 4, HeroUI
- Supabase (Postgres, Auth) via local CLI
- Turborepo for task orchestration
- pnpm as the package manager

## Repository Layout

- `apps/front` – main Next.js application
  - `src/app` – app router pages and layouts
  - `src/components` – shared UI components
  - `src/actions` – server actions (auth, tasks, participations, users)
  - `src/hooks` – React hooks for data fetching and state
  - `src/lib` – parsers, repositories, utils, validation
  - `src/providers` – React providers (theme, query client, etc.)
  - `src/types` – shared TypeScript types
- `supabase` – local Supabase project
  - `config.toml` – Supabase local configuration
  - `schemas/*.sql` – database schema and functions
  - `migrations/*.sql` – generated migration files
  - `seed.sql` – seed data for local development

## Prerequisites

- Node.js >= 18
- `pnpm` (see `packageManager` in `package.json`)
- `supabase` CLI installed and authenticated

Also you have to set the follow env variables:

- `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID` - Google Auth Client ID
- `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` - Google Auth Secret

For apps/front:

- `NEXT_APP_URL` - example http://localhost:3000
- `NEXT_PUBLIC_SUPABASE_URL` - example http://localhost:54321
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase public key
- `GOOGLE_MAPS_API_KEY` - Google Maps API Key
- `GOOGLE_MAPS_MAP_ID` - Google Maps Map ID

The Google's credentials you can find in your Google Console.
The Supabase's credentials you can find in your Supabase Dashboard.

## Install Dependencies

From the repo root:

```bash
pnpm install
```

## Running Locally

```bash
pnpm dev:front
```

This command will start Supabase (if not already running) and then run `front#dev` via Turborepo.

1. Open the app in your browser:

- Frontend: <http://localhost:3000>
- Supabase Studio: <http://localhost:54323>

## Database & Migrations (local)

- Database schemas are defined under `supabase/schemas/*.sql`.
- Migrations live under `supabase/migrations/*.sql` and are managed by the Supabase CLI.
- Seed data for local development is in `supabase/seed.sql`.

To create migration:

```bash
supabase stop
supabase db diff -f MIGRATION_NAME
```

To reset the local database and apply all migrations:

```bash
supabase start
supabase db reset
```
