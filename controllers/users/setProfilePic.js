const User = require('../../models/users');
const uploadImgToCloud = require('../../utils/image/uploadImg');
const doesImgExist = require('../../utils/image/doesImgExist');
const deleteImgFromCloud = require('../../utils/image/delImg');
const storeImageLocally = require('../../config/multer');
const path = require('path');
const { generateKeySync } = require('crypto');
const { BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  storeImageLocally.single('image'),

  async (req, res, next) => {
    if (!req.file) {
      return next(new BadRequestErr('No image uploaded'));
    }

    let user = await User.findById(req.user._id).catch(next);

    // check for image name duplicate in s3 and if there's one,
    // generate new name until it's unique
    while (true) {
      let doesImgAlreadyExist = await doesImgExist(req.file.filename).catch(next);

      if (doesImgAlreadyExist) {
        req.file.filename = `${req.user._id}uid` +
          generateKeySync('hmac', { length: 128 }).export().toString('hex') +
          path.extname(req.file.filename);
      }
      else {
        break;
      }
    }
    
    await uploadImgToCloud(req.file.path, req.file.filename)
    .then(async () => {
        if (user.profile_pic) {
          await deleteImgFromCloud(user.profile_pic).catch(next);
        }

        user.profile_pic = req.file.filename;
        user.save();
        res.json(req.file.filename);
      })
      .catch(next);
  }
];

module.exports = controller;
