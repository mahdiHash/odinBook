require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const passport = require('./config/passport-jwt');
const app = require('./app');
const port = process.env.PORT || 3000;
const registerIoHandlers = require('./socket-io/registerIoHandlers');

app.set('port', port);

const server = http.createServer(app);
const io = new Server(server);
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(passport.initialize()));
io.use(wrap(passport.authenticate('jwt', { session: false })));

io.onlineUsersById = {};
registerIoHandlers(io);

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
