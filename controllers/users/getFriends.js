const User = require('../../models/users');

const controller = async (req, res, next) => {
  let friends = await User.findById(req.user._id)
  .select('username friends')
  .populate('friends', 'username profile_pic_url')
  .catch(next);

  res.json(friends);
}

module.exports = controller;
