require ('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const awsBucketName = process.env.AWS_BUCKET_NAME
const awsBucketRegion = process.env.AWS_BUCKET_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    awsBucketRegion,
    awsAccessKey,
    awsSecretKey,
})

//upload selected image to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: awsBucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

//downloads a photo from s3
function getImg(fileKey) {
   const downloadParams = {
    Key: fileKey,
    Bucket: awsBucketName
   }

   return s3.getObject(downloadParams).createReadStream()
}
exports.getImg = getImg