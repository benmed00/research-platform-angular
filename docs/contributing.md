# Contributing Guide

## Commit message convention

This repository follows [Conventional Commits](https://www.conventionalcommits.org/) with enforced scopes.

### Format

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type       | Purpose                               |
| ---------- | ------------------------------------- |
| `feat`     | New feature or user-facing capability |
| `fix`      | Bug fix                               |
| `docs`     | Documentation only                    |
| `style`    | Formatting, no logic change           |
| `refactor` | Code change without feature/fix       |
| `perf`     | Performance improvement               |
| `test`     | Tests only                            |
| `build`    | Build system or dependencies          |
| `ci`       | CI/CD configuration                   |
| `chore`    | Maintenance tasks                     |
| `revert`   | Revert a previous commit              |

### Allowed scopes

`app`, `auth`, `ci`, `core`, `dashboard`, `deps`, `docs`, `domain`, `mock-api`, `pipeline`, `repo`, `shell`, `test`, `toolchain`, `tooling`

### Rules

- Subject: imperative mood, lowercase, no trailing period, max 100 characters
- Body: explain **why** and **what** changed; wrap at 120 characters
- Footer: references (`Refs:`, `Closes:`, `BREAKING CHANGE:`)

### Example

```text
feat(core): add jwt authentication service and route guards

Implement token-based session handling for protected routes.
Persist JWT in localStorage and validate expiration on navigation.

- AuthService: login, logout, getCurrentUser
- AuthGuard: redirect unauthenticated users to /login
- RoleGuard: enforce route.data.roles

Refs: P1-auth-foundation
```

## Local quality gates

Pre-commit hooks run automatically:

1. `lint-staged` (format + lint staged files)
2. `format:check`
3. `lint`
4. `build`
5. `test:ci`

Run the full gate manually:

```bash
pnpm run validate
```

## Pull request checklist

- [ ] Commit messages follow the convention above
- [ ] `pnpm run validate` passes locally
- [ ] New features include unit tests where applicable
- [ ] Documentation updated when behavior changes
