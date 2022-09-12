const {
  ServerSideErr,
  BadGatewayErr,
} = require('./errors');

const logger = (err, req, res, next) => {
  if (err instanceof ServerSideErr || err instanceof BadGatewayErr) {
    console.log('\x1b[31m%s\x1b[0m', err.name);
    console.log('at: ', req.url);
    console.error(err);
    console.log('Request Body: ', req.body);
    console.log('Request Parameters: ', req.params);
  }

  next(err);
}

module.exports = logger;
