# JSDoc Standards

In-code API documentation for the Research Platform ERP. Complements the markdown guides in this folder and is enforced gradually via ESLint (`eslint-plugin-jsdoc`).

**Canonical reference:** `src/testing/test-helpers.ts` — follow `createJwt` and `createMockUser` for method-level docs.

## Tiers

| Tier  | Applies to                                                                                  | Required tags                                                                                 |
| ----- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **A** | Exported services, guards, interceptors, helpers, shared components, model interfaces/enums | Summary, `@param`, `@returns` (use `@returns Nothing.` for void methods — no `{Type}` braces) |
| **B** | Angular components with `@Input` / `@Output`                                                | Class summary; document public inputs/outputs                                                 |
| **C** | Modules, routing, stub placeholders                                                         | Optional one-line `@file` header                                                              |
| **D** | Spec files, `main.ts`, private methods                                                      | Excluded from lint                                                                            |

## Allowed tags

Use **standard JSDoc tags only**. Do not invent custom tags.

| Tag                 | When to use                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| `@param`            | Every public method/function parameter                                            |
| `@returns`          | Every public method with a return value; use `@returns Nothing.` for void methods |
| `@template`         | Generic methods (e.g. `ApiService.get<T>`)                                        |
| `@example`          | Non-obvious usage (auth, guards, shared components)                               |
| `@see` / `{@link}`  | Cross-references — see linking rules below                                        |
| `@throws`           | Methods that propagate HTTP or validation errors                                  |
| `@remarks`          | Security notes, client-vs-server enforcement, caveats                             |
| `@deprecated`       | APIs scheduled for removal                                                        |
| `@property`         | Non-obvious interface fields (IDs, units, enum semantics)                         |
| `@enum` / `@member` | Domain enums with abbreviated values (e.g. IUCN codes)                            |
| `@file`             | File-level context for configuration or wiring                                    |

### Banned custom tags

Do **not** use project-specific tags such as `@why`, `@how_to_use`, `@how_not_to_use`, or `@best_practices`. Map them to standard tags:

| Legacy tag        | Use instead                               |
| ----------------- | ----------------------------------------- |
| `@why`            | `@remarks`                                |
| `@how_to_use`     | `@example` + `@see docs/configuration.md` |
| `@how_not_to_use` | `@remarks` (warning)                      |
| `@best_practices` | `@remarks` or a markdown guide            |

### Cross-module linking (TypeDoc)

TypeDoc uses **multiple entry points**, so `{@link OtherClass}` only resolves reliably **within the same file/module**.

| Scope        | Use                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Same file    | `{@link SymbolName}` — e.g. `{@link User}` inside `user.model.ts`                                   |
| Cross-module | Plain `@see SymbolName` or `@see path — Symbol` — e.g. `@see AuthService`, `@see user.model — User` |
| Methods      | `@see ClassName.methodName` — not `ClassName#method`                                                |

Do **not** add `import type` solely for JSDoc links — ESLint flags unused imports.

## Patterns by layer

### Service method (Tier A)

````typescript
/**
 * Authenticates the user and persists the JWT in localStorage.
 *
 * @param credentials - Login email and password
 * @returns Observable emitting token, user, and expiry on success
 * @throws Propagates HTTP errors from the auth endpoint
 *
 * @example
 * ```typescript
 * authService.login({ email, password }).subscribe(res => {
 *   console.log(res.user.role);
 * });
 * ```
 *
 * @remarks Client-side session only; backend must enforce authorization.
 */
login(credentials: LoginRequest): Observable<LoginResponse> { ... }
````

### Guard (Tier A)

```typescript
/**
 * Blocks unauthenticated navigation and redirects to `/login`.
 *
 * @param route - Activated route snapshot (unused)
 * @param state - Router state; `url` is passed as `returnUrl`
 * @returns `true` when a non-expired JWT exists
 * @see {@link AuthService#isAuthenticated}
 */
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { ... }
```

### Generic HTTP helper (Tier A)

```typescript
/**
 * Performs an authenticated GET request.
 *
 * @template T - Expected response body type
 * @param endpoint - Path appended to `environment.apiUrl`
 * @param params - Optional query parameters
 * @returns Observable of the decoded response body
 */
get<T>(endpoint: string, params?: Record<string, string>): Observable<T> { ... }
```

### Domain interface (Tier A)

```typescript
/**
 * Platform user with role-based permissions.
 */
export interface User {
  /** Unique user identifier. */
  id: string;
  /** Assigned platform role; drives {@link RoleGuard} checks. */
  role: UserRole;
  ...
}
```

### Domain enum (Tier A)

```typescript
/**
 * IUCN Red List conservation status codes.
 * @enum {string}
 */
export enum ConservationStatus {
  /** Least Concern */
  LC = 'LC',
  /** Near Threatened */
  NT = 'NT',
  ...
}
```

### Shared component (Tier B)

````typescript
/**
 * Reusable Material table with filtering, pagination, and optional row actions.
 *
 * @example
 * ```html
 * <app-data-table
 *   [data]="users"
 *   [columns]="columnLabels"
 *   [displayedColumns]="cols"
 *   (edit)="onEdit($event)" />
 * ```
 */
@Component({ selector: 'app-data-table', ... })
export class DataTableComponent { ... }
````

### File header (Tier C)

```typescript
/**
 * @file Environment configuration for non-production builds.
 * @see {@link AppEnvironment}
 * @see docs/configuration.md
 */
```

## TypeScript-specific rules

- **Do not duplicate types in JSDoc** — use `@param name - description` without `{Type}`; TypeScript is the source of truth.
- **Prefer `{@link Symbol}`** over plain text when referencing exported symbols.
- **Keep summaries to one line**; put detail in the paragraph below or in `@remarks`.
- **Never remove** existing documentation during refactors — update and improve it.

## ESLint enforcement

Rules run in **warn** mode during Phase 0–2 rollout. Tier A paths will move to **error** after core and model documentation is complete.

Excluded from JSDoc lint (Tier D):

- `*.spec.ts`
- `*.module.ts`, `*-routing.module.ts`
- `main.ts`

Run checks:

```bash
pnpm run lint
pnpm run lint:fix   # auto-fixes formatting-safe JSDoc issues only
```

## Rollout phases

| Phase | Scope                                            | Status                                             |
| ----- | ------------------------------------------------ | -------------------------------------------------- |
| 0     | Standards, ESLint, snippets                      | Done                                               |
| 1     | Core: services, guards, interceptor, environment | Done                                               |
| 2     | Domain models (`src/app/models/`)                | Done                                               |
| 3     | Shared components                                | Done                                               |
| 4     | Feature components (stubs + implemented lists)   | Done                                               |
| 5     | TypeDoc API reference (`docs/api/`)              | Done — run `pnpm run docs:api`                     |
| 6     | ESLint warn → error on Tier A                    | Done — core, models, shared, testing, environments |

Generate the API reference locally:

```bash
pnpm run docs:api
# Output: docs/api/index.html
```

## PR checklist

- [ ] New exported symbols have a one-line summary
- [ ] Public methods include `@param` and `@returns`
- [ ] Generics use `@template`
- [ ] Security-sensitive code includes `@remarks`
- [ ] Cross-module references use `{@link}`
- [ ] No custom/non-standard JSDoc tags
- [ ] `pnpm run lint` passes (no new errors)
