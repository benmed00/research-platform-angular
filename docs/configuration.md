# Configuration

## Environment files

| File                                    | Used when                                                        | `apiUrl` |
| --------------------------------------- | ---------------------------------------------------------------- | -------- |
| `src/environments/environment.ts`       | Development (`ng serve`, `ng build --configuration development`) | `/api`   |
| `src/environments/environment.prod.ts`  | Production build                                                 | `/api`   |
| `src/environments/environment.test.ts`  | Optional test override                                           | `/api`   |
| `src/environments/environment.types.ts` | Shared `AppEnvironment` interface                                | —        |

### Default dev setup (recommended)

`environment.apiUrl` is `/api`. The dev server proxies to the mock API:

```
Browser  →  /api/auth/login  →  proxy.conf.json  →  localhost:3000
```

Start both:

```bash
pnpm run mock-api
pnpm start
```

### Direct mock API (no proxy)

For debugging without the Angular proxy, use the alternate map in `environment.ts`:

```typescript
import { environments } from '../../../environments/environment';

// Temporary — prefer environment.apiUrl + proxy in normal dev
const apiUrl = environments.local.apiUrl; // http://localhost:3000
```

Or point services at `environments.local` only in isolated tests.

### Production

`angular.json` replaces `environment.ts` with `environment.prod.ts` for production builds:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
  }
]
```

Set production `apiUrl` to your deployed API gateway path.

## Proxy

`proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

Registered in `angular.json` → `serve.options.proxyConfig`.

## Angular (`angular.json`)

| Section                            | Notes                               |
| ---------------------------------- | ----------------------------------- |
| `build.configurations.production`  | File replacements, budgets, hashing |
| `build.configurations.development` | Source maps, no optimization        |
| `serve.options.proxyConfig`        | Dev API proxy                       |
| `test.configurations.ci`           | Headless + coverage                 |
| `test.configurations.coverage`     | Coverage report only                |

### Bundle budgets (production)

| Type             | Warning | Error |
| ---------------- | ------- | ----- |
| Initial          | 1.5 MB  | 2 MB  |
| Component styles | 6 KB    | 10 KB |

## Karma (`karma.conf.cjs`)

| Setting    | Dev              | CI (`CI=true`)     |
| ---------- | ---------------- | ------------------ |
| Browser    | Chrome           | ChromeHeadless     |
| Single run | No               | Yes                |
| Reporters  | progress, kjhtml | progress, coverage |

## TypeScript

| File                 | Scope                         |
| -------------------- | ----------------------------- |
| `tsconfig.json`      | Base — strict mode enabled    |
| `tsconfig.app.json`  | Application build             |
| `tsconfig.spec.json` | Unit tests + `src/testing/**` |

## Git ignore

`.gitignore` excludes `node_modules`, `dist`, `coverage`, `.angular`.
