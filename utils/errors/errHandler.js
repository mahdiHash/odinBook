const {
  ServerSideErr,
  BadGatewayErr,
  BadRequestErr,
  NotFoundErr,
  UnauthorizedErr,
  ForbiddenErr,
} = require('./errors');

const handler = (err, req, res, next) => {
  let resBody = {
    message: err.message,
    reqBody: req.body,
    reqParams: req.params,
    reqQuery: req.query,
    time: new Date(),
  }

  if (err instanceof ServerSideErr) {
    res.status(500);
  }
  else if (err instanceof BadGatewayErr) {
    res.status(502);
  }
  else if (err instanceof BadRequestErr) {
    res.status(400);
  }
  else if (err instanceof NotFoundErr) {
    res.status(404);
  }
  else if (err instanceof UnauthorizedErr) {
    res.status(401);
  }
  else if (err instanceof ForbiddenErr) {
    res.status(403);
  }
  else {
    resBody.message = 'Something went wrong in the server.';
    res.status(500);
  }

  res.json(resBody);
}

module.exports = handler;
