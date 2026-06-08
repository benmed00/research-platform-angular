# Research Platform ERP

Angular 17 frontend for an environmental and biodiversity research center.

## Quick start

Requires [pnpm](https://pnpm.io/) 9+ (`corepack enable && corepack install` uses the version pinned in `package.json`).

```bash
pnpm install
pnpm run mock-api   # terminal 1
pnpm start          # terminal 2
```

Open `http://localhost:4200` — login with `admin@research.local` / `password123`.

## Commands

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `pnpm run mock-api`      | Mock API on port 3000                    |
| `pnpm start`             | Dev server on port 4200 (proxies `/api`) |
| `pnpm run build`         | Production build                         |
| `pnpm test`              | Unit tests (watch)                       |
| `pnpm run test:ci`       | Headless tests for CI                    |
| `pnpm run test:coverage` | Tests + HTML coverage report             |

## Documentation

Full P1 developer guides are in [`docs/`](./docs/README.md):

- [Development](./docs/development.md) — setup, conventions, troubleshooting
- [Testing](./docs/testing.md) — Karma/Jasmine, coverage, CI
- [Configuration](./docs/configuration.md) — environments, proxy, Angular config
- [Architecture](./docs/architecture.md) — routing, guards, lazy loading
- [Mock API](./docs/mock-api.md) — test accounts and endpoints
- [Contributing](./docs/contributing.md) — commit conventions, pre-commit hooks, CI

## Stack

- Angular 17 + Angular Material
- TypeScript (strict)
- Karma + Jasmine
- Leaflet / Chart.js (planned feature use)

## License

[MIT](./LICENSE)
