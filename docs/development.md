# Development Guide

## Prerequisites

| Tool    | Version                              |
| ------- | ------------------------------------ |
| Node.js | >= 18                                |
| pnpm    | >= 9                                 |
| Chrome  | Latest (for interactive `pnpm test`) |

Enable the pinned pnpm version via Corepack (included with Node.js 18+):

```bash
corepack enable
corepack install
```

## First-time setup

```bash
git clone <repository-url>
cd research-platform
pnpm install
```

## Daily workflow

### 1. Start the mock API

```bash
pnpm run mock-api
```

Runs on `http://localhost:3000`. See [Mock API](./mock-api.md) for accounts and endpoints.

### 2. Start the Angular dev server

```bash
pnpm start
```

- App: `http://localhost:4200`
- API requests to `/api/*` are proxied to the mock server via `proxy.conf.json`

### 3. Run tests before committing

```bash
pnpm run test:ci
pnpm run build
```

## pnpm scripts

| Script                   | Purpose                          |
| ------------------------ | -------------------------------- |
| `pnpm start`             | Dev server with hot reload       |
| `pnpm run mock-api`      | Local mock REST API              |
| `pnpm run build`         | Production build                 |
| `pnpm run watch`         | Dev build in watch mode          |
| `pnpm test`              | Unit tests (watch + Chrome)      |
| `pnpm run test:watch`    | Alias for `pnpm test`            |
| `pnpm run test:ci`       | Headless tests for CI            |
| `pnpm run test:coverage` | Headless tests + coverage report |

## Project layout

```
src/app/
├── core/           # Singleton services, guards, interceptors, pages
├── shared/         # Reusable UI components + Material imports
├── layout/         # App shell (header, sidebar, main layout)
├── auth/           # Login module (lazy)
├── dashboard/      # Dashboard module (lazy)
└── features/       # Domain modules (lazy)
    ├── users/
    ├── hr/
    ├── accounting/
    └── ...
```

## Conventions

### New feature module

1. Create under `src/app/features/<name>/`
2. Add lazy route in `layout-routing.module.ts`
3. Add sidebar entry in `sidebar.component.ts` (with `roles` if restricted)
4. Add `RoleGuard` on the route when role-restricted
5. Use `ApiService` for HTTP — never hardcode `/api` in components
6. Add `*.spec.ts` for services, guards, and non-trivial components

### API calls

```typescript
import { ApiService } from '../../core/services/api.service';

this.apiService.get<User[]>('/users').subscribe(users => { ... });
```

Base URL comes from `environment.apiUrl` — see [Configuration](./configuration.md).

### Auth

- `AuthGuard` — protects the main layout (must be logged in)
- `RoleGuard` — checks `route.data.roles` against `user.role`
- Unauthorized users are sent to `/unauthorized`

## Test accounts

Password for all mock accounts: `password123`

| Email                         | Role                      | `/users` | `/accounting` |
| ----------------------------- | ------------------------- | -------- | ------------- |
| `scientifique@research.local` | Directeur scientifique    | Yes      | No            |
| `admin@research.local`        | Directeur admin/financier | Yes      | Yes           |
| `botaniste@research.local`    | Botaniste                 | No       | No            |

## Troubleshooting

| Problem                        | Fix                                                        |
| ------------------------------ | ---------------------------------------------------------- |
| Login fails with network error | Ensure `pnpm run mock-api` is running                      |
| `EADDRINUSE` on port 3000      | Stop other process or change port in `mock-api/server.cjs` |
| Blank Material styles          | Check `src/styles.scss` includes Material theme            |
| 404 on feature route           | Verify lazy route in `layout-routing.module.ts`            |
