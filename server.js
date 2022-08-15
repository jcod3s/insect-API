
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const cors = require('cors')
const env = require('dotenv').config()
const PORT = 8000;

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer  = require('multer');
//const { response } = require('express');
const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getImg } = require('./s3');
const { request } = require('http');
const { ConnectionCheckOutFailedEvent } = require('mongodb');
const { response } = require('express');

app.use(express.static('public'))

app.use(cors())

//Mongo Declarations
const MongoClient = require('mongodb').MongoClient
const connectionString  = process.env.DB_STRING
MongoClient.connect(connectionString,{ useUnifiedTopology: true })
    .then(client => {
        console.log('connected to database')

        const db = client.db('insectDb')
        const insectDataCollection = db.collection('insectData')
        
        app.set('view engine','ejs')

        app.use(bodyParser.urlencoded({ extended: true}))

        app.get('/',(req,res) => {
            insectDataCollection.find().toArray()
                .then(results => {
                    res.render('index.ejs',{ insects: results})
                })
                .catch(error => {
                    console.error(error)
                })
        })

        app.get('/api/searchInsect/',async (req,res)=> {
            const name = req.query.insectName.toLowerCase();
            const performSearch = await insectDataCollection.find( { commonName: name } ).toArray()
            .then(results => {
                res.render('index.ejs',{ insects: results })
            })
            .catch(error => {
                console.error(error)
            })
        })

        //uses the imported getImg function from s3.js and the key provided in the image tag to download the img from s3
        app.get('/insectimages/:key', (req, res) => {
            console.log(req.params)
            const key = req.params.key
            const readStream = getImg(key)

            readStream.pipe(res)
        })

        //uploads images to db
        app.post('/api/submitNewInsect', upload.single('insectImg'), async function (req, res, next) {
            //create a variable to store auto-generated filename from multer
            const file = req.file;
            
            //upload image to s3 and save the response object as a constant
            const result = await uploadFile(file)
            await unlinkFile(file.path)

            //send insect data to mongodb using the file and result object to newly created image data
            insectDataCollection.insertOne({ 
                commonName: req.body.commonName,
                sciName: req.body.sciName,
                order: req.body.order,
                lifeSpan: req.body.lifeSpan,
                description: req.body.description,
                imgName: file.filename,
                imgPath: `/insectimages/${result.Key}`
            })
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })

        app.delete('/api/deleteItem', (request, response) => {
            insectDataCollection.deleteOne({commonName: request.body.itemFromJS})
            .then(result => {
                console.log('Todo Deleted')
                response.json('Todo Deleted')
                res.redirect('/')
            })
            .catch(error => console.error(error))
        
        })

        app.listen(process.env.PORT || PORT, (req,res)=> {
            console.log(`server is running on port ${PORT}`)
        })

    })
    .catch(error => {
        console.error(error)
    })