import { AppEnvironment } from './environment.types';

/**
 * @file Environment configuration for non-production Angular builds.
 *
 * Manages environment-specific variables for the Angular project,
 * allowing seamless switching between local and proxied API endpoints.
 *
 * @remarks
 * Decouples environment configuration from business logic and enables
 * build-time targeting (development, test, production).
 *
 * Do not hardcode secrets or API keys here. Avoid runtime mutation;
 * use Angular file replacements for production builds.
 *
 * @example
 * ```typescript
 * import { environment } from 'src/environments/environment';
 * const apiUrl: string = environment.apiUrl;
 * ```
 *
 * @see {@link AppEnvironment}
 * @see docs/configuration.md
 */
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
