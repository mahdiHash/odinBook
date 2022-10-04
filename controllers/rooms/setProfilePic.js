const Room = require('../../models/rooms');
const uploadImgToCloud = require('../../utils/image/uploadImg');
const doesImgExist = require('../../utils/image/doesImgExist');
const delImgFromCloud = require('../../utils/image/delImg');
const storeImageLocally = require('../../config/multer');
const path = require('path');
const fsPromise = require('fs/promises');
const { generateKeySync } = require('crypto');
const { NotFoundErr, BadRequestErr } = require('../../utils/errors/errors');

const controller = [
  storeImageLocally.single('image'),

  async (req, res, next) => {
    if (!req.file) {
      return next(new BadRequestErr('No image uploaded'));
    }

    let room = await Room.findById(req.query.roomId).select('profile_pic').catch(next);

    if (!room) {
      fsPromise.rm(req.file.path);
      return next(new NotFoundErr('No such room'));
    }

    // check for image name duplicate in s3 and if there's one,
    // generate new name until it's unique
    while (true) {
      let doesImgAlreadyExist = await doesImgExist(req.file.filename)
        .catch((err) => {
          fsPromise.rm(req.file.path);
          next(err);
        });

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
        if (room.profile_pic) {
          await delImgFromCloud(room.profile_pic);
        }
        
        room.profile_pic = req.file.filename;
        room.save();
        res.json(req.file.filename);
      })
      .catch(next);
  }
];

module.exports = controller;
