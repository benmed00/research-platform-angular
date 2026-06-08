/**
 * Shared environment contract used by all environment files.
 *
 * @see environment.ts — development defaults
 * @see environment.prod.ts — production build
 * @see environment.test.ts — optional test overrides
 */
export interface AppEnvironment {
  readonly production: boolean;
  readonly apiUrl: string;
}
