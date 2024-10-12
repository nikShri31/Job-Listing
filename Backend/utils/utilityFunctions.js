const s3 = require('../aws-config')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const cloudinary = require("../cloudinary-config")

module.exports.getDownloadUrl = async (key) => {
  const getFile = {
    Bucket: process.env.BUCKET_NAME,
    Key: key
  }
  const command = new GetObjectCommand(getFile);
  const fileUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return fileUrl;
}


module.exports.uploadToCloudinary = (fileBuffer, username) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: 'profilePic',
      public_id: username,
      resource_type: 'image'
    },
      (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    uploadStream.end(fileBuffer);
  });
};
