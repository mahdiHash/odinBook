require('dotenv').config();

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('listening', () => {
  console.log('Listening on ', port);
});
server.on('error', (err) => {
  if (err.syscall !== 'listen') {
    throw err;
  }

  switch (err.code) {
    case 'EACCESS':
      console.error(`Port ${port} requires elavated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
    default:
      throw err;
  }
});
