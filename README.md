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
- `providers/AppProviders.tsx`: React Query provider.
- `hooks/usePlanetsQuery.ts`: planets list query against local `/api/planets` route.
- `store/planetStore.ts`: Zustand store for UI-only state (`searchTerm`) plus selector helpers.
- `lib/solarSystemAPI`: API adapters and mapping functions.
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
- `/api/planets`: planet proxy route (solar API + NASA image enrichment).
- `/api/health`: deployment health check (validates required env vars and external API reachability).

Health check response example:

```json
{
	"ok": true,
	"timestamp": "2026-03-13T13:00:00.000Z",
	"missingEnv": [],
	"dependencies": [
		{
			"name": "solarSystemApi",
			"urlConfigured": true,
			"reachable": true,
			"statusCode": 200,
			"durationMs": 310,
			"error": null
		},
		{
			"name": "nasaImageApi",
			"urlConfigured": true,
			"reachable": true,
			"statusCode": 200,
			"durationMs": 210,
			"error": null
		}
	]
}
```

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

## React Component Standard

Every React component should be created in `TSX`, following the template below.
Do not delete comments, as they are used to separate different React Hooks features.

```tsx
export const ExampleComponent = () => {
	// Hooks

	// Local state

	// Refs

	// Redux

	// Side effects

	// Data and handlers

	return <div>Example</div>;
};
```

Each section represents a different part of the component implementation, and the comments provide visual separation.

- `Hooks`: custom React hooks used by the component (for example, `useSomeCustomHook`, `useTable`, `useRouter`, `useNotification`).
- `Local state`: strict local component state hooks, such as `useState`.
- `Refs`: React refs to DOM elements or component instances, such as `useRef`.
- `Redux`: Redux-related or Context-related logic, such as `useContext` and `useReducer`.
- `Side effects`: side-effect logic, such as API calls, subscriptions, and DOM interactions (`useEffect`, `useLayoutEffect`).
- `Data and handlers`: memoized data and event handlers, such as `useCallback` and `useMemo`.

## Atomic Design File Organization

We keep the following organization for component files using Atomic Design methodology:

```text
/components
|---/atoms
|---/molecules
|---/organisms
|---/templates
|---/MyComponent
|   |---index.ts
|   |---MyComponent.tsx
|   |---MyComponent.stories.tsx
|   |---MyComponent.test.tsx
|   |---MyComponent.styles.scss
|   |---MyComponent.constants.ts
|   |---MyComponent.types.ts
|   |---MyComponent.functions.ts
```

