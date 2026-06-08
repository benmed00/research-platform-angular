# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single-product repo: **Research Platform ERP** — an Angular 17 SPA for environmental/biodiversity research centers. Local development uses a **Node mock API** (`mock-api/`) plus the Angular dev server; there is no Docker Compose or external database.

### Required services

| Service            | Port | Start command       |
| ------------------ | ---- | ------------------- |
| Mock API           | 3000 | `pnpm run mock-api` |
| Angular dev server | 4200 | `pnpm run serve`    |

**Nominal dev stack:** `pnpm start` runs both (via `scripts/start-dev.cjs`). API calls from the browser go to `/api/*` on 4200 and are proxied to port 3000 (`proxy.conf.json`).

### Common commands

See [README.md](./README.md) and [docs/development.md](./docs/development.md). Quick reference:

- Install: `corepack enable && corepack install && pnpm install --frozen-lockfile`
- Dev: `pnpm start`
- Lint: `pnpm run lint`
- Unit tests (CI): `pnpm run test:ci` (requires Chrome/ChromeHeadless)
- Mock API tests: `pnpm run test:mock-api`
- E2E smoke (no browser): `pnpm run test:e2e`
- Build: `pnpm run build`

### Test login

Password for all mock accounts: `password123`

- `admin@research.local` — full admin (users + accounting)
- `scientifique@research.local` — scientific director
- `botaniste@research.local` — limited access

### Gotchas

- **Login network errors:** ensure the mock API is running (`pnpm start` or `pnpm run mock-api` on port 3000).
- **`pnpm start` port reuse:** if a healthy mock API is already on 3000, `start-dev.cjs` skips starting a second instance.
- **Chrome for tests:** `pnpm run test:ci` and `pnpm test` need Chrome/ChromeHeadless installed on the VM.
- **Pre-commit hooks:** Husky runs format check, lint, build, and `test:ci` on commit — can be slow; use `pnpm run validate` to mirror CI locally.
- **External CDNs:** Google Fonts, Material Icons, and Leaflet CSS load from the internet in `src/index.html`; offline dev may show degraded styling.
