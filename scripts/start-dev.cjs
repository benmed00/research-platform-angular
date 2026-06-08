/**
 * Starts the nominal local dev stack (mock API + Angular).
 * If the mock API is already listening on port 3000, only starts `ng serve`.
 */
const http = require('http');
const net = require('net');
const { spawn } = require('child_process');

const MOCK_PORT = 3000;
const MOCK_HEALTH_URL = `http://127.0.0.1:${MOCK_PORT}/api/health`;

/**
 * Returns true when something accepts TCP connections on the port.
 *
 * @param {number} port
 * @returns {Promise<boolean>}
 */
function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host: '127.0.0.1' });

    socket.setTimeout(1000);

    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.once('error', () => resolve(false));
  });
}

/**
 * @returns {Promise<boolean>}
 */
function isMockApiHealthy() {
  return new Promise((resolve) => {
    const request = http.get(MOCK_HEALTH_URL, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });

    request.setTimeout(2000, () => {
      request.destroy();
      resolve(false);
    });

    request.on('error', () => resolve(false));
  });
}

/**
 * @param {string} command
 * @returns {void}
 */
function run(command) {
  const child = spawn(command, {
    stdio: 'inherit',
    shell: true
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

/**
 * @returns {Promise<void>}
 */
async function main() {
  const portBusy = await isPortInUse(MOCK_PORT);

  if (portBusy) {
    const healthy = await isMockApiHealthy();

    if (healthy) {
      console.log(
        `[start] Mock API already running at http://localhost:${MOCK_PORT} — starting Angular only.`
      );
      run('pnpm run serve');
      return;
    }

    console.error(`[start] Port ${MOCK_PORT} is in use but /api/health did not respond.`);
    console.error('[start] Stop the process on that port, then run `pnpm start` again.');
    console.error('[start] Windows: netstat -ano | findstr :3000');
    console.error('[start]         taskkill /PID <pid> /F');
    process.exit(1);
  }

  run('pnpm exec concurrently -k -n mock,web -c blue,green "pnpm run mock-api" "pnpm run serve"');
}

main().catch((error) => {
  console.error('[start] Failed to start dev stack:', error);
  process.exit(1);
});
