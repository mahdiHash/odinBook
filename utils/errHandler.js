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
    time: new Date(),
  }

  switch (err) {
    case err instanceof ServerSideErr:
      res.status(500);
      break
    case err instanceof BadGatewayErr:
      res.status(502);
      break;
    case err instanceof BadRequestErr:
      res.status(400);
      break;
    case err instanceof NotFoundErr:
      res.status(404);
      break;
    case err instanceof UnauthorizedErr:
      res.status(401);
      break;
    case err instanceof ForbiddenErr:
      res.status(403);
      break;
    default:
      resBody.message = 'Something went wrong in the server.';
      res.status(500);

  }

  res.json(resBody);
}

module.exports = handler;
