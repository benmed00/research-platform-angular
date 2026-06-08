const http = require('http');
const { accounts } = require('./fixtures/accounts.cjs');
const { resourceRoutes } = require('./fixtures/resources.cjs');

const PORT = 3000;
const TOKEN_TTL_SECONDS = 8 * 3600;

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

function isAuthorized(req) {
  const authorization = req.headers.authorization;
  return typeof authorization === 'string' && authorization.startsWith('Bearer ');
}

function listPublicUsers() {
  return accounts.map((account) => account.user);
}

function sendProtectedResource(req, res, pathname) {
  const resource = resourceRoutes[pathname];
  if (!resource) {
    return false;
  }

  if (!isAuthorized(req)) {
    sendJson(res, 401, { message: 'Unauthorized' });
    return true;
  }

  sendJson(res, 200, resource);
  return true;
}

async function handleRequest(req, res, basePort = PORT) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://localhost:${basePort}`);

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    try {
      const body = await readBody(req);
      const account = accounts.find(
        (entry) => entry.email === body.email && entry.password === body.password
      );

      if (!account) {
        sendJson(res, 401, { message: 'Email ou mot de passe incorrect' });
        return;
      }

      const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
      sendJson(res, 200, {
        token: createJwt(exp),
        user: account.user,
        expiresIn: TOKEN_TTL_SECONDS
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

  if (req.method === 'GET' && url.pathname === '/api/users') {
    if (!isAuthorized(req)) {
      sendJson(res, 401, { message: 'Unauthorized' });
      return;
    }

    sendJson(res, 200, listPublicUsers());
    return;
  }

  if (req.method === 'GET' && sendProtectedResource(req, res, url.pathname)) {
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
}

function createServer() {
  const server = http.createServer((req, res) => {
    const address = server.address();
    const port = address && typeof address === 'object' ? address.port : PORT;
    void handleRequest(req, res, port);
  });

  return server;
}

module.exports = {
  PORT,
  TOKEN_TTL_SECONDS,
  accounts,
  createJwt,
  createServer,
  handleRequest,
  isAuthorized,
  listPublicUsers,
  readBody,
  resourceRoutes,
  sendJson
};
