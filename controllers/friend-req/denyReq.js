const Friend_req = require('../../models/friend_req');
const { NotFoundErr, ForbiddenErr} = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let request = await Friend_req.findById(req.query.id).catch(next);

  if (!request) {
    return next(new NotFoundErr('No such request'));
  }

  if (request.to.toString() !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  request.remove();
  res.end();
}

module.exports = controller;
