import { Permission, User, UserRole } from '../app/models/user.model';

/**
 * -----------------------------------------------------------------------------
 * Testing Helpers for Angular Research Platform
 * -----------------------------------------------------------------------------
 *
 * File: test-helpers.ts
 * Location: src/testing/
 *
 * Provides reusable utility functions to assist with mocking JWT tokens,
 * user model objects, and roles/permissions for unit and integration testing.
 * Designed for use in unit tests, with a focus on type safety and ease of
 * test setup within the Angular Research Platform ERP.
 *
 * -----------------------------------------------------------------------------
 * Author:    YOUR NAME <your.email@example.com>
 * Created:   2024-XX-XX
 * License:   MIT
 * Version:   1.0.0
 * -----------------------------------------------------------------------------
 *
 * Exports:
 *   - createJwt(exp: number): string
 *       → Creates a mock JSON Web Token containing a provided expiration time.
 *
 *   - createMockUser(overrides?: MockUserOverrides): User
 *       → Returns a mock User object reusing the domain User interface.
 *
 * Usage:
 *   import { createJwt, createMockUser } from '../../testing/test-helpers';
 *
 *   localStorage.setItem('token', createJwt(Math.floor(Date.now() / 1000) + 3600));
 *   const user: User = createMockUser({ email: 'alice@example.com', role: UserRole.BOTANISTE });
 *
 * Dependencies:
 *   - ../app/models/user.model (Permission, User, UserRole)
 *
 * Disclaimer: These utilities are intended for local/test use only and must never
 * be used in production scenarios as the tokens do not carry valid signatures or
 * secure claims.
 * -----------------------------------------------------------------------------
 */

/**
 * Minimal JWT payload shape used by {@link createJwt} and AuthService token checks.
 */
export interface MockJwtPayload {
  readonly exp: number;
}

/**
 * Subset of {@link User} fields commonly overridden in tests.
 * Reuses the domain User interface via Pick + Partial.
 */
export type MockUserOverrides = Partial<
  Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'role'
    | 'permissions'
    | 'isActive'
    | 'lastLogin'
    | 'profile'
  >
>;

/**
 * Creates a mock JSON Web Token (JWT) for use in tests.
 *
 * The resulting JWT string has a properly encoded header and payload, but always uses
 * a static placeholder signature. The only payload claim is the UNIX expiration timestamp.
 *
 * This function is intended solely for testing. It does not produce valid, verifiable,
 * or signed JWTs. Use for simulating authentication/authorization in frontend tests.
 *
 * @param exp - Expiration time in seconds since the UNIX epoch.
 *   E.g., Math.floor(Date.now() / 1000) + 3600 (token valid for 1 hour)
 * @returns A base64-encoded mock JWT string with the requested `exp` property.
 *
 * @example
 * ```typescript
 * localStorage.setItem('token', createJwt(Math.floor(Date.now() / 1000) + 3600));
 * ```
 */
export function createJwt(exp: number): string {
  const header: string = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' } as const));
  const payload: MockJwtPayload = { exp };
  const encodedPayload: string = btoa(JSON.stringify(payload));
  const token: string = `${header}.${encodedPayload}.signature`;
  return token;
}

/**
 * Generates a mock {@link User} object for testing.
 *
 * Default values cover all core user fields, including role and permissions.
 * Partial overrides allow simulating any subset of the User interface.
 *
 * @param overrides - Partial User fields to override default mock values.
 * @returns A new mock User with defaults merged with overrides.
 *
 * @example
 * ```typescript
 * const user: User = createMockUser();
 * const admin: User = createMockUser({
 *   email: 'admin@research.local',
 *   role: UserRole.DIRECTEUR_ADMIN_FINANCIER
 * });
 * const elevated: User = createMockUser({
 *   permissions: [Permission.READ, Permission.WRITE, Permission.DELETE]
 * });
 * ```
 */
export function createMockUser(overrides: MockUserOverrides = {}): User {
  const defaults: User = {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: UserRole.BOTANISTE,
    permissions: [Permission.READ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const user: User = { ...defaults, ...overrides };
  return user;
}
