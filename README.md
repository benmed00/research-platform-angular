# Research Platform ERP

Angular 17 frontend for an environmental and biodiversity research center.

## Quick start

Requires [pnpm](https://pnpm.io/) 9+ (`corepack enable && corepack install` uses the version pinned in `package.json`).

```bash
pnpm install
pnpm start
```

Open `http://localhost:4200` — login with `admin@research.local` / `password123`.

## Commands

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `pnpm start`             | Mock API + dev server (usage nominale) |
| `pnpm run serve`         | Angular dev server only (port 4200)    |
| `pnpm run mock-api`      | Mock API only (port 3000)              |
| `pnpm run build`         | Production build                       |
| `pnpm test`              | Unit tests (watch)                     |
| `pnpm run test:ci`       | Headless tests for CI                  |
| `pnpm run test:coverage` | Tests + HTML coverage report           |

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
