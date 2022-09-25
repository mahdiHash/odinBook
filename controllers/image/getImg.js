const getImgFromCloudAndStoreLocally = require('../../utils/image/getImg');
const fsPromise = require('fs/promises');
const { NotFoundErr } = require('../../utils/errors/errors');

const controller = async (req, res, next) => {
  let storedFilePath = await getImgFromCloudAndStoreLocally(req.params.imgName)
    .catch((err) => {
      if (err.$metadata?.httpStatusCode == 404) {
        return next(new NotFoundErr('No such image'));
      }

      next(err);
    });

  if (storedFilePath) {
    res.sendFile(storedFilePath, null, () => {
      fsPromise.rm(storedFilePath);
    });
  }
}

module.exports = controller;
