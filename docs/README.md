# Documentation

Developer guides for the Research Platform ERP frontend (P1).

| Guide                               | Description                         |
| ----------------------------------- | ----------------------------------- |
| [Development](./development.md)     | Local setup, scripts, workflow      |
| [Testing](./testing.md)             | Unit tests, coverage, CI            |
| [Configuration](./configuration.md) | Environments, proxy, Angular config |
| [Architecture](./architecture.md)   | Routing, guards, lazy loading       |
| [Mock API](./mock-api.md)           | Local backend substitute            |
| [Contributing](./contributing.md)   | Commit conventions and quality gates |

## Quick start

```bash
pnpm install
pnpm run mock-api   # terminal 1
pnpm start          # terminal 2
pnpm run test:ci    # verify before pushing
```
