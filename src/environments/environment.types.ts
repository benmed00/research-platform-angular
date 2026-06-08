/**
 * Shared environment contract used by all environment files.
 *
 * @see environment.ts — development defaults
 * @see environment.prod.ts — production build
 * @see environment.test.ts — optional test overrides
 */
export interface AppEnvironment {
  /** When `true`, enables production optimizations and disables dev tooling. */
  readonly production: boolean;
  /** Base URL prefix for API requests (proxied or absolute). */
  readonly apiUrl: string;
}
