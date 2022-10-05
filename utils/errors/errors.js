const errors = {};

errors.ServerSideErr = class extends Error {
  constructor(msg = 'An error occured in server') {
    super(msg);
    this.name = 'ServerSide';
    this.statusCode = 500;
  }
}

errors.BadRequestErr = class extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'BadRequest';
    this.statusCode = 400;
  }
}

errors.ForbiddenErr = class extends Error {
  constructor(msg = 'You can not access the resource') {
    super(msg);
    this.name = 'Forbidden';
    this.statusCode = 403;
  
  }
}

errors.UnauthorizedErr = class extends Error {
  constructor(msg = 'You are not authorized to access resource') {
    super(msg);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
}

errors.NotFoundErr = class extends Error {
  constructor(msg = 'Not Found') {
    super(msg);
    this.name = 'NotFoundErr';
    this.statusCode = 404;
  }
}

errors.BadGatewayErr = class extends Error {
  constructor(msg = 'Bad Gateway') {
    super(msg);
    this.name = 'BadGatewayErr';
    this.statusCode = 502;
  }
}

module.exports = errors;
