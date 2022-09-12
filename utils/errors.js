const errors = {};

errors.ServerSideErr = class extends Error {
  constructor(msg = 'An error occured in server', desc) {
    super(msg);
    this.name = 'ServerSide';
    this.statusCode = 500;
    this.description = desc;
  }
}

errors.BadRequestErr = class extends Error {
  constructor(msg, desc) {
    super(msg);
    this.name = 'BadRequest';
    this.statusCode = 400;
    this.description = desc;
  }
}

errors.ForbiddenErr = class extends Error {
  constructor(msg = 'You can not access the resource', desc) {
    super(msg);
    this.name = 'Forbidden';
    this.statusCode = 403;
    this.description = desc;
  
  }
}

errors.UnauthorizedErr = class extends Error {
  constructor(msg = 'You are not authorized to access resource', desc) {
    super(msg);
    this.name = 'Unauthorized';
    this.statusCode = 401;
    this.description = desc;
  }
}

errors.NotFoundErr = class extends Error {
  constructor(msg = 'Not Found', desc) {
    super(msg);
    this.name = 'NotFoundErr';
    this.statusCode = 404;
    this.description = desc;
  }
}

errors.BadGatewayErr = class extends Error {
  constructor(msg = 'Bad Gateway', desc) {
    super(msg);
    this.name = 'BadGatewayErr';
    this.statusCode = 502;
    this.description = desc;
  }
}

module.exports = errors;
