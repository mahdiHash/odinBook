const User = require('../../models/users');
const deleteImgFromCloud = require('../../utils/image/delImg');
const { ForbiddenErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let imageAuthor = req.query.name.slice(0, req.query.name.indexOf('uid'));

  if (imageAuthor !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  if (req.query.name === req.user.profile_pic) {
    let user = await User.findById(req.user._id).select('profile_pic').catch(next);
    user.profile_pic = null;
    user.save();
  }

  await deleteImgFromCloud(req.query.name).catch(next);

  res.end();
}

module.exports = controller;
