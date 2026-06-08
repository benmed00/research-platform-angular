const { PORT, accounts, createServer } = require('./lib.cjs');

const server = createServer();

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Mock API port ${PORT} is already in use.`);
    console.error('If another mock-api instance is running, use `pnpm start` (Angular only).');
    console.error('Otherwise free the port: netstat -ano | findstr :3000');
    process.exit(1);
  }

  console.error('Mock API failed to start:', error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
  console.log('Test accounts (password: password123):');
  accounts.forEach((account) => console.log(`  - ${account.email} (${account.user.role})`));
});
