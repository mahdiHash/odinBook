const Hashtag = require('../../models/hashtags');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let { page = 1 } = req.query;
  let skip = (page - 1) * 10;
  let hashtag = await Hashtag.findOne({ tag: req.params.hashtag })
    .select('posts')
    .populate({
      path: 'posts',
      options: { sort: '-date' },
      skip,
      limit: 10,
      populate: {
        path: 'author',
        select: 'username profile_pic',
      }
    })
    .catch(next);

    if (!hashtag) {
      return next(new BadRequestErr('No such hashtag'));
    }

    res.json(hashtag.posts);
}

module.exports = controller;
