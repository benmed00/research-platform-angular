const { after, afterEach, before, describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { createServer, listPublicUsers, resetUserStore } = require('./lib.cjs');

describe('mock-api server', () => {
  /** @type {import('http').Server} */
  let server;
  /** @type {string} */
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => server.listen(0, resolve));
    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  afterEach(() => {
    resetUserStore();
  });

  it('returns health status', async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
  });

  it('authenticates valid credentials', async () => {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'scientifique@research.local',
        password: 'password123'
      })
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(body.token);
    assert.equal(body.user.email, 'scientifique@research.local');
    assert.equal(body.expiresIn, 8 * 3600);
    assert.match(body.token, /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.$/);
  });

  it('rejects invalid credentials', async () => {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@research.local', password: 'bad' })
    });

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: 'Email ou mot de passe incorrect' });
  });

  it('rejects malformed login payloads', async () => {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalid json'
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: 'Requête invalide' });
  });

  it('lists users when authorized', async () => {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@research.local',
        password: 'password123'
      })
    });
    const { token } = await loginResponse.json();

    const usersResponse = await fetch(`${baseUrl}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    assert.equal(usersResponse.status, 200);
    const users = await usersResponse.json();
    assert.equal(users.length, listPublicUsers().length);
    assert.equal(users[0].email, 'scientifique@research.local');
  });

  it('requires authorization for user listing', async () => {
    const response = await fetch(`${baseUrl}/api/users`);
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: 'Unauthorized' });
  });

  it('handles CORS preflight', async () => {
    const response = await fetch(`${baseUrl}/api/users`, { method: 'OPTIONS' });
    assert.equal(response.status, 204);
  });

  it('returns 404 for unknown routes', async () => {
    const response = await fetch(`${baseUrl}/api/unknown`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { message: 'Not found' });
  });

  it('serves dashboard stats when authorized', async () => {
    const token = await loginToken(baseUrl, 'botaniste@research.local');
    const response = await fetch(`${baseUrl}/api/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    assert.equal(response.status, 200);
    const stats = await response.json();
    assert.equal(stats.length, 4);
    assert.equal(stats[0].title, 'Espèces cataloguées');
  });

  it('serves missions, species, equipment, documents, and employees', async () => {
    const token = await loginToken(baseUrl, 'admin@research.local');
    const headers = { Authorization: `Bearer ${token}` };

    const missions = await (await fetch(`${baseUrl}/api/missions`, { headers })).json();
    const species = await (await fetch(`${baseUrl}/api/species`, { headers })).json();
    const equipment = await (await fetch(`${baseUrl}/api/equipment`, { headers })).json();
    const documents = await (await fetch(`${baseUrl}/api/documents`, { headers })).json();
    const employees = await (await fetch(`${baseUrl}/api/employees`, { headers })).json();

    assert.equal(missions.length, 2);
    assert.equal(species.length, 2);
    assert.equal(equipment.length, 2);
    assert.equal(documents.length, 2);
    assert.equal(employees.length, 2);
  });

  it('serves module summary endpoints when authorized', async () => {
    const token = await loginToken(baseUrl, 'admin@research.local');
    const headers = { Authorization: `Bearer ${token}` };

    const accounting = await (await fetch(`${baseUrl}/api/accounting/summary`, { headers })).json();
    const environmental = await (
      await fetch(`${baseUrl}/api/environmental-data/summary`, { headers })
    ).json();
    const gis = await (await fetch(`${baseUrl}/api/gis/summary`, { headers })).json();
    const publishing = await (await fetch(`${baseUrl}/api/publishing/summary`, { headers })).json();

    assert.equal(accounting.budgetTotal, '2 400 000 MAD');
    assert.equal(environmental.waterQualitySites, 18);
    assert.equal(gis.activeLayers, 12);
    assert.equal(publishing.manuscriptsInReview, 5);
  });

  it('supports user CRUD operations', async () => {
    const token = await loginToken(baseUrl, 'admin@research.local');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const createdResponse = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: 'new.user@research.local',
        firstName: 'Nouveau',
        lastName: 'Utilisateur',
        role: 'BOTANISTE',
        isActive: true
      })
    });
    assert.equal(createdResponse.status, 201);
    const created = await createdResponse.json();
    assert.equal(created.email, 'new.user@research.local');

    const fetchedResponse = await fetch(`${baseUrl}/api/users/${created.id}`, { headers });
    assert.equal(fetchedResponse.status, 200);

    const updatedResponse = await fetch(`${baseUrl}/api/users/${created.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ firstName: 'Modifié' })
    });
    assert.equal(updatedResponse.status, 200);
    const updated = await updatedResponse.json();
    assert.equal(updated.firstName, 'Modifié');

    const deletedResponse = await fetch(`${baseUrl}/api/users/${created.id}`, {
      method: 'DELETE',
      headers
    });
    assert.equal(deletedResponse.status, 200);
    assert.equal(
      listPublicUsers().some((user) => user.id === created.id),
      false
    );
  });
});

async function loginToken(baseUrl, email) {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'password123' })
  });
  const body = await response.json();
  return body.token;
}
