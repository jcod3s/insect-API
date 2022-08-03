const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const cors = require('cors')
const env = require('dotenv').config()
const PORT = 8000;

const multer  = require('multer');
const { response } = require('express');
const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('./s3')

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

        //submits new insect data to DB -working original
        // app.post('/api/submitInsectData',(req,res)=> {
        //     insectDataCollection.insertOne(req.body)
        //     .then(result => {
        //         res.redirect('/')
        //     })
        //     .catch(error => console.error(error))
        // })

        //uploads new insect data to server
        app.post('/api/submitInsectData', upload.none(), function (req, res, next) {
            // req.body contains the text fields
            const commonName = req.body.commonName;
            const sciName = req.body.sciName;
            const order = req.body.order;
            const lifeSpan = req.body.lifeSpan;
            const description = req.body.description;
          })

        //uploads images to db
        app.post('/api/submitInsectImg', upload.single('insectImg'), async function (req, res, next) {
            // create a variable to store the uploaded file
            const file = req.file;
            const fileName = file.filename;
            const path = file.path;
            
            const result = await uploadFile(file)
            console.log(result)
            
            const imgLink = 'rustysautobody.com'


            
        })

        app.listen(process.env.PORT || PORT, (req,res)=> {
            console.log(`server is running on port ${PORT}`)
        })

    })
    .catch(error => {
        console.error(error)
    })