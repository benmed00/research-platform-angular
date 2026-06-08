# Architecture (P1)

## Overview

```
┌─────────────────────────────────────────────────────────┐
│  AppModule (eager)                                      │
│  ├── AppRoutingModule                                   │
│  ├── SharedModule                                       │
│  ├── UnauthorizedComponent                              │
│  └── HTTP_INTERCEPTORS → AuthInterceptor                │
└─────────────────────────────────────────────────────────┘
          │
          ├── /login ──────────► AuthModule (lazy)
          ├── /unauthorized ───► UnauthorizedComponent
          └── / ───────────────► LayoutModule (lazy) + AuthGuard
                    │
                    └── MainLayoutComponent
                          ├── /dashboard (lazy)
                          ├── /users (lazy) + RoleGuard
                          ├── /accounting (lazy) + RoleGuard
                          └── /features/* (lazy)
```

## Routing

### `app-routing.module.ts`

Top-level routes only:

- `login` — lazy `AuthModule`
- `unauthorized` — static component
- `''` — lazy `LayoutModule` protected by `AuthGuard`
- `**` — redirect to dashboard

Child feature routes are **not** defined here.

### `layout-routing.module.ts`

All authenticated routes under `MainLayoutComponent`:

| Path                             | Module           | Guard     |
| -------------------------------- | ---------------- | --------- |
| `dashboard`                      | DashboardModule  | —         |
| `users`                          | UsersModule      | RoleGuard |
| `accounting`                     | AccountingModule | RoleGuard |
| `hr`, `equipment`, `missions`, … | Feature modules  | —         |

### Role guard data

```typescript
{
  path: 'users',
  canActivate: [RoleGuard],
  data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
}
```

Failed checks → `/unauthorized`. Missing user → `/login`.

## Lazy loading

`AppModule` does **not** import feature modules. Each route uses:

```typescript
loadChildren: () => import('../features/users/users.module').then((m) => m.UsersModule);
```

This produces separate JS chunks per feature (see build output).

## Core services

### `AuthService`

- `POST ${apiUrl}/auth/login`
- JWT in `localStorage` (`token`, `user`)
- `isAuthenticated()` — JWT `exp` check via `jwt-decode`
- `hasRole()` / `hasPermission()` — client-side only; backend must enforce

### `ApiService`

- Wrapper around `HttpClient`
- Prefixes requests with `environment.apiUrl`
- Attaches `Authorization: Bearer <token>`

### `AuthInterceptor`

Duplicates Bearer header attachment (also in `ApiService`). Both coexist; interceptor catches raw `HttpClient` usage.

## Shared components

| Component                 | Purpose                   |
| ------------------------- | ------------------------- |
| `PageHeaderComponent`     | Page title + subtitle     |
| `StatCardComponent`       | Dashboard metric cards    |
| `DataTableComponent`      | Filterable Material table |
| `LoadingSpinnerComponent` | Loading state             |

Import via `SharedModule` in feature modules.

## Sidebar vs guards

`sidebar.component.ts` hides menu items by role. **Guards enforce access** — hiding alone is not sufficient.

Always add `RoleGuard` when a route is restricted in the sidebar.

## Module checklist for new features

1. `features/<name>/<name>.module.ts`
2. `features/<name>/<name>-routing.module.ts`
3. Route in `layout-routing.module.ts`
4. Sidebar entry in `sidebar.component.ts`
5. Domain model in `models/` if needed
6. Spec files for logic components/services
