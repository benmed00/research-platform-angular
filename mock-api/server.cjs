const http = require('http');

const PORT = 3000;

const users = [
  {
    email: 'scientifique@research.local',
    password: 'password123',
    user: {
      id: '1',
      email: 'scientifique@research.local',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'DIRECTEUR_SCIENTIFIQUE',
      permissions: ['READ', 'WRITE', 'VALIDATE', 'ADMIN'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'admin@research.local',
    password: 'password123',
    user: {
      id: '2',
      email: 'admin@research.local',
      firstName: 'Jean',
      lastName: 'Martin',
      role: 'DIRECTEUR_ADMIN_FINANCIER',
      permissions: ['READ', 'WRITE', 'VALIDATE', 'DELETE', 'ADMIN'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'botaniste@research.local',
    password: 'password123',
    user: {
      id: '3',
      email: 'botaniste@research.local',
      firstName: 'Sophie',
      lastName: 'Bernard',
      role: 'BOTANISTE',
      permissions: ['READ', 'WRITE'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
];

function createJwt(exp) {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ exp, sub: 'mock-user' })).toString('base64url');
  return `${header}.${payload}.`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    try {
      const body = await readBody(req);
      const account = users.find((u) => u.email === body.email && u.password === body.password);

      if (!account) {
        sendJson(res, 401, { message: 'Email ou mot de passe incorrect' });
        return;
      }

      const exp = Math.floor(Date.now() / 1000) + 8 * 3600;
      sendJson(res, 200, {
        token: createJwt(exp),
        user: account.user,
        expiresIn: 8 * 3600
      });
      return;
    } catch {
      sendJson(res, 400, { message: 'Requête invalide' });
      return;
    }
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
  console.log('Test accounts (password: password123):');
  users.forEach((u) => console.log(`  - ${u.email} (${u.user.role})`));
});
