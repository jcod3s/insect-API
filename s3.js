require ('dotenv').config()
const S3 = require('aws-sdk/client/s3')
const fs = require('fs')

DB_STRING = 'mongodb+srv://pdiddy:sdiddyCombs@insectcluster.hx7ipsq.mongodb.net/?retryWrites=true&w=majority'

const awsBucketName = process.env.awsBucketName
const awsBucketRegion = process.env.awsBucketRegion
const awsAccessKey = process.env.awsAccessKey
const awsSecretKey = process.env.awsSecretKey




const s3 = new S3({
    awsBucketRegion,
    awsAccessKey,
    awsSecretKey,
})

//upload selected image to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        bucket: awsBucketName,
        body: fileStream,
        key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

//downloads a photo from s3