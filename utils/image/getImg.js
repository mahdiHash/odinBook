const s3 = require('../../config/s3Cloud');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const fsPromise = require('fs/promises');
const os = require('os');
const path = require('path');
const { generateKeySync } = require('crypto');

const controller = (imgCloudName) => {
  let key = generateKeySync('hmac', { length: 128 }).export().toString('hex');
  let filePath = `${os.tmpdir()}\\${key + path.extname(imgCloudName)}`;
  let fileStream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    fileStream.on('finish', () => {
      fileStream.destroy();
      resolve(filePath);
    });

    s3.send(new GetObjectCommand({
      Bucket: process.env.BUCKET,
      Key: imgCloudName,
    }))
      .then((data) => {
        data.Body.pipe(fileStream);
      })
      .catch((err) => {
        fileStream.destroy();
        fsPromise.rm(filePath);
        reject(err);
      })
  });
}

module.exports = controller;
