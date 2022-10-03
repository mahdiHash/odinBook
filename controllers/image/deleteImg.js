const User = require('../../models/users');
const deleteImgFromCloud = require('../../utils/image/delImg');
const { ForbiddenErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let imageAuthor = req.query.name.slice(0, req.query.name.indexOf('uid'));

  if (imageAuthor !== req.user._id.toString()) {
    return next(new ForbiddenErr());
  }

  if (req.query.name === req.user.profile_pic_url) {
    let user = await User.findById(req.user._id).select('profile_pic_url').catch(next);
    user.profile_pic_url = null;
    user.save();
  }

  await deleteImgFromCloud(req.query.name).catch(next);

  res.end();
}

module.exports = controller;
