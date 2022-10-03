const mainNamespace = require('./handlers/io/mainNamespace');

const registerHandlers = (io) => {
  // main namespace handlers
  io.on('connection', mainNamespace.connection.bind(null, io));
}

module.exports = registerHandlers;
