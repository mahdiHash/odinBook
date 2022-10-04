const Friend_req = require('../../models/friend_req');

const controller = async (req, res, next) => {
  let { page = 1 } = req.query;
  let requests = await Friend_req.find({ to: req.user._id })
    .skip((page - 1) * 10)
    .limit(10)
    .populate('from', 'username profile_pic')
    .catch(next);
  
  res.json(requests);
}

module.exports = controller;
