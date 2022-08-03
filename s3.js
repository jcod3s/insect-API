require ('dotenv').config()
const S3 = require('aws-sdk/client/s3')
const fs = require('fs')

DB_STRING = 'mongodb+srv://pdiddy:sdiddyCombs@insectcluster.hx7ipsq.mongodb.net/?retryWrites=true&w=majority'

const awsBucketName = "insectimages"
const awsBucketRegion = "us-east-1"
const awsAccessKEy = "AKIA5BW2VVPUSSCXWHOE"
const awsSecretKey = "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"




const s3 = new S3({
    awsBucketRegion,
    awsAccessKEy,
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