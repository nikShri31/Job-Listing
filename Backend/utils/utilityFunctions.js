const s3 = require('../aws-config')
const {GetObjectCommand} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports.getDownloadUrl = async(key) => {
    const getFile = {   
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }
  const command = new GetObjectCommand(getFile);
  const fileUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return fileUrl;
}
