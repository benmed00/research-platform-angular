import { AppEnvironment } from './environment.types';

/**
 * @file Environment configuration file for Angular application environments.
 * @name environment.ts
 * @path src/environments/environment.ts
 *
 * @description
 * Manages environment-specific variables for the Angular project,
 * allowing seamless switching between local and proxied API endpoints.
 *
 * @why
 * Decouples environment configuration from business logic,
 * improving maintainability and enabling simple environment targeting
 * (development, test, production).
 *
 * @how_to_use
 * - Import `environment` in services/components:
 *   `import { environment } from 'src/environments/environment';`
 *   `const apiUrl: string = environment.apiUrl;`
 * - For direct mock API access (no proxy), use `environments.local`.
 * - For CLI production builds, Angular file replacements swap this file
 *   with `environment.prod.ts`.
 *
 * @how_not_to_use
 * - Do NOT hardcode secrets or API keys in this file.
 * - Avoid modifying from runtime code; use build-time file replacements.
 *
 * @best_practices
 * - Only define configuration/static values — no runtime logic.
 * - Keep property naming consistent across all environment files.
 * - Document new environment fields in docs/configuration.md.
 */

/** Active dev config — used by services and Angular build (non-production). */
export const environment: AppEnvironment = {
  production: false,
  apiUrl: '/api'
};

/** Named dev targets for alternate local workflows (see docs/configuration.md). */
export const environments: Readonly<Record<'local' | 'proxy', AppEnvironment>> = {
  local: {
    production: false,
    apiUrl: 'http://localhost:3000'
  },
  proxy: {
    production: false,
    apiUrl: '/api'
  }
} as const;
