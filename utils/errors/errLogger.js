const {
  ServerSideErr,
  BadGatewayErr,
  BadRequestErr,
  UnauthorizedErr,
  ForbiddenErr,
  NotFoundErr,
} = require('./errors');

const logger = (err, req, res, next) => {
  if (
    err instanceof ServerSideErr || err instanceof BadGatewayErr ||
    !(err instanceof BadRequestErr || err instanceof UnauthorizedErr ||
      err instanceof ForbiddenErr, err instanceof NotFoundErr)
  ) {
    console.log('\x1b[31m%s\x1b[0m', err.name);
    console.log('at: ', req.url);
    console.error(err);
    console.log('Request Body: ', req.body);
    console.log('Request Parameters: ', req.params);
    console.log('Request Query: ', req.query);
  }

  next(err);
}

module.exports = logger;
