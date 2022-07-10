const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const cors = require('cors')
const env = require('dotenv').config()
const PORT = 8000;

app.use(express.static('public'))

app.use(cors())

//Mongo Declarations
const MongoClient = require('mongodb').MongoClient
const connectionString  = 'mongodb+srv://pdiddy:sdiddyCombs@insectcluster.hx7ipsq.mongodb.net/?retryWrites=true&w=majority'
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

        //submits new insect data to DB
        app.post('/api/submitInsectData',(req,res)=> {
            insectDataCollection.insertOne(req.body)
            .then(result => {
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