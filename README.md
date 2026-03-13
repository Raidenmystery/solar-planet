# Solar Planet Explorer

Atomic Design project built with Next.js App Router.

This app renders a solar planet list using card components and navigates to a planet detail view when a card is clicked.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand (UI state)
- TanStack React Query (server data fetching and caching)
- External APIs:
	- `https://api.le-systeme-solaire.net`
	- `https://images-api.nasa.gov`

## Architecture

- `components/atoms`: small reusable UI primitives.
- `components/molecules`: composed UI units such as cards and stat rows.
- `components/organisms`: larger sections such as list grid and detail body.
- `components/templates`: page-level composition wrappers.
- `components/providers/AppProviders.tsx`: React Query provider.
- `hooks/usePlanetsQuery.ts`: planets list query against local `/api/planets` route.
- `store/planetStore.ts`: Zustand store for UI-only state (`searchTerm`) plus selector helpers.
- `lib/solarSystemAPI/solarSystemAPI.ts`: API adapters and mapping functions.
- `app/api/planets/route.ts`: server-side proxy to external APIs (planet data + image enrichment, avoids browser CORS).

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required API URLs:

```bash
SOLAR_SYSTEM_API_URL=https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true
NASA_IMAGE_SEARCH_URL=https://images-api.nasa.gov/search
```

Token for solar API (used only when provided):

```bash
NEXT_PUBLIC_SOLAR_API_TOKEN=
```

## Routes

- `/`: planet list page.
- `/planets/[slug]`: planet detail page.

## Run Locally

```bash
yarn
yarn dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

