const multer = require('multer');
const path = require('path');
const os = require('os');
const { generateKeySync } = require('crypto');
const { BadRequestErr } = require('../utils/errors/errors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    let name = `${req.user._id}uid` +
      generateKeySync('hmac', { length: 128 }).export().toString('hex') +
      path.extname(file.originalname);

    cb(null, name);
  }
});

const storeImageLocally = multer({
  storage: storage,
  limits: {
    fileSize: 50000000, // 50 MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    let allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    if (!allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
      let err = new BadRequestErr('File extension is not valid. Only .jpg, .jpeg, .png, .gif and .webp are accepted');
      return cb(err, false);
    }

    cb(null, true);
  }
});

module.exports = storeImageLocally;
