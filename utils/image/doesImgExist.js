const s3 = require('../../config/s3Cloud.js');
const { HeadObjectCommand } = require('@aws-sdk/client-s3');

const doesImgExist = async (imgName) => {
  try {
    await s3.send(new HeadObjectCommand({
      Bucket: process.env.BUCKET,
      Key: imgName,
    }));
    return true;
  }
  catch (err) {
    let errCode = err['$metadata'].httpStatusCode;

    if (errCode === 404) {
      return false;
    }
    else if (errCode === 403) {
      return true;
    }
    else {
      throw err;
    }
  }
}

module.exports = doesImgExist;
