# Documentation

Developer guides for the Research Platform ERP frontend (P1).

| Guide                                   | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| [Development](./development.md)         | Local setup, scripts, workflow              |
| [Testing](./testing.md)                 | Unit tests, coverage, CI                    |
| [Configuration](./configuration.md)     | Environments, proxy, Angular config         |
| [Architecture](./architecture.md)       | Routing, guards, lazy loading               |
| [Mock API](./mock-api.md)               | Local backend substitute                    |
| [Contributing](./contributing.md)       | Commit conventions and quality gates        |
| [JSDoc standards](./jsdoc-standards.md) | In-code API documentation tiers and tags    |
| [API reference](./api/index.html)       | Generated TypeDoc (run `pnpm run docs:api`) |

## Quick start

```bash
pnpm install
pnpm start          # mock API + dev server
pnpm run test:ci    # verify before pushing
```
