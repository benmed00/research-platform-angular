# Mock API

Lightweight Node.js server for local development. **Not for production.**

## Start

```bash
pnpm run mock-api
```

Listens on `http://localhost:3000`.

## Integration with Angular

With `pnpm start` (or `pnpm run serve` alongside `pnpm run mock-api`), the dev server proxies `/api` → `localhost:3000` (see `proxy.conf.json`).

```
POST http://localhost:4200/api/auth/login
  → proxied to
POST http://localhost:3000/api/auth/login
```

## Endpoints

| Method | Path              | Description                       |
| ------ | ----------------- | --------------------------------- |
| `POST` | `/api/auth/login` | Authenticate, returns JWT + user  |
| `GET`  | `/api/health`     | Health check `{ "status": "ok" }` |
| `*`    | other             | `404 { "message": "Not found" }`  |

### Login request

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@research.local",
  "password": "password123"
}
```

### Login response

```json
{
  "token": "<jwt>",
  "user": { "id": "...", "email": "...", "role": "...", "permissions": [...] },
  "expiresIn": 28800
}
```

### Error response

```http
HTTP/1.1 401 Unauthorized

{ "message": "Email ou mot de passe incorrect" }
```

## Test accounts

Password for all: `password123`

| Email                         | Role                        | Permissions                          |
| ----------------------------- | --------------------------- | ------------------------------------ |
| `scientifique@research.local` | `DIRECTEUR_SCIENTIFIQUE`    | READ, WRITE, VALIDATE, ADMIN         |
| `admin@research.local`        | `DIRECTEUR_ADMIN_FINANCIER` | READ, WRITE, VALIDATE, DELETE, ADMIN |
| `botaniste@research.local`    | `BOTANISTE`                 | READ, WRITE                          |

## JWT format

Mock tokens use `alg: "none"` with an `exp` claim (8-hour lifetime). Compatible with `jwt-decode` in `AuthService.isAuthenticated()`.

## Manual testing

```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST -ContentType "application/json" `
  -Body '{"email":"admin@research.local","password":"password123"}'

# curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@research.local","password":"password123"}'
```

## Extending

Edit `mock-api/server.cjs`:

1. Add entries to the `users` array
2. Add route handlers before the 404 fallback
3. Document new endpoints in this file

When the real backend is ready, remove or disable the mock and point `environment.prod.ts` at the production API.
