# Testing Guide

Unit tests use **Jasmine** + **Karma** + **Chrome** (or ChromeHeadless in CI).

## Commands

```bash
# Interactive — opens Chrome, re-runs on file changes
pnpm test

# CI / pre-push — single run, headless
pnpm run test:ci

# Coverage report
pnpm run test:coverage
```

Coverage output:

- HTML: `coverage/research-platform/index.html`
- LCOV: `coverage/research-platform/lcov.info` (for CI tools)

## Configuration files

| File                              | Role                                      |
| --------------------------------- | ----------------------------------------- |
| `karma.conf.cjs`                  | Browser, reporters, coverage output       |
| `tsconfig.spec.json`              | TypeScript config for specs               |
| `angular.json` → `architect.test` | Angular test builder, CI/coverage configs |
| `src/testing/test-helpers.ts`     | Shared JWT/user factories                 |

### CI behaviour

`karma.conf.cjs` reads `process.env.CI`:

- `CI=true` → ChromeHeadless, single run, coverage reporter
- Otherwise → Chrome, watch mode, HTML reporter

`pnpm run test:ci` uses Angular configuration `ci` which enables `codeCoverage`.

## Writing tests

### File naming

Place specs next to source files:

```
auth.service.ts
auth.service.spec.ts
```

### Service with HTTP

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MyService]
  });
});

afterEach(() => {
  httpMock.verify();
});
```

### Component with Material

```typescript
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared.module';

await TestBed.configureTestingModule({
  imports: [SharedModule, NoopAnimationsModule]
}).compileComponents();
```

### Guards

Spy `AuthService` and `Router`:

```typescript
authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
router = jasmine.createSpyObj('Router', ['navigate']);
```

### Shared helpers

```typescript
import { createJwt, createMockUser } from '../../../testing/test-helpers';

localStorage.setItem('token', createJwt(Math.floor(Date.now() / 1000) + 3600));
```

## Current coverage

| Area             | Spec file                      | Tests  |
| ---------------- | ------------------------------ | ------ |
| App bootstrap    | `app.component.spec.ts`        | 2      |
| Authentication   | `auth.service.spec.ts`         | 8      |
| Auth route guard | `auth.guard.spec.ts`           | 2      |
| Role route guard | `role.guard.spec.ts`           | 4      |
| Data table       | `data-table.component.spec.ts` | 7      |
| **Total**        |                                | **23** |

Current coverage (approx.): **88%** statements, **73%** branches, **86%** functions, **89%** lines.

### Coverage targets (P1)

| Metric     | Target |
| ---------- | ------ |
| Statements | 50%    |
| Branches   | 40%    |
| Functions  | 50%    |
| Lines      | 50%    |

Add specs for new features to maintain these targets. Threshold enforcement can be enabled later in `karma.conf.cjs` under `coverageReporter.check`.

## CI pipeline

GitHub Actions workflow: `.github/workflows/ci.yml`

Runs on push/PR to `main` and `develop`:

1. `pnpm install --frozen-lockfile`
2. `pnpm run format:check`
3. `pnpm run lint`
4. `pnpm run build`
5. `pnpm run test:ci`

CD workflow (`.github/workflows/cd.yml`) runs on version tags (`v*.*.*`) or manual dispatch and publishes a production tarball artifact.

## Debugging failing tests

```bash
# Run a single spec file (Angular 17+)
pnpm test -- --include=src/app/core/services/auth.service.spec.ts

# Disable headless to see browser
pnpm test -- --browsers=Chrome
```

Common issues:

- **Material errors** — import `NoopAnimationsModule` and required Material modules (or `SharedModule`)
- **Router errors** — import `RouterTestingModule`
- **HTTP leaks** — call `httpMock.verify()` in `afterEach`
