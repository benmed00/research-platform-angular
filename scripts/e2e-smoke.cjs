/**
 * End-to-end smoke test: mock API startup + full auth/resource flow.
 * Runs in CI without a browser; complements Angular integration specs.
 */
const assert = require('node:assert/strict');
const { createServer } = require('../mock-api/lib.cjs');

async function run() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const health = await fetch(`${baseUrl}/api/health`);
    assert.equal(health.status, 200);

    const login = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'scientifique@research.local',
        password: 'password123'
      })
    });
    assert.equal(login.status, 200);
    const { token, user } = await login.json();
    assert.ok(token);
    assert.equal(user.role, 'DIRECTEUR_SCIENTIFIQUE');

    const headers = { Authorization: `Bearer ${token}` };
    const protectedRoutes = [
      '/api/users',
      '/api/dashboard/stats',
      '/api/missions',
      '/api/species',
      '/api/equipment',
      '/api/documents',
      '/api/employees',
      '/api/accounting/budgets',
      '/api/publishing/publications',
      '/api/environmental-data/readings',
      '/api/gis/layers'
    ];

    for (const route of protectedRoutes) {
      const response = await fetch(`${baseUrl}${route}`, { headers });
      assert.equal(response.status, 200, `Expected 200 for ${route}`);
      const payload = await response.json();
      assert.ok(Array.isArray(payload), `Expected array for ${route}`);
      assert.ok(payload.length > 0, `Expected data for ${route}`);
    }

    console.log('E2E smoke: all protected routes reachable after login');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

run().catch((error) => {
  console.error('E2E smoke failed:', error);
  process.exit(1);
});
