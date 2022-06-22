const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb');
const { response } = require('express');
const PORT = 8000;


//Mongo Declarations
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'insectDb',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('connetcted to database')
        db = client.db(dbName)
        collection = db.collection('insectData')
    })

app.use(express.static('public'))
app.use(cors())

app.get('/',(req,res) => {
    db.collection('insectData').find().toArray()
        .then(results => {
            res.render('index.ejs',{ insects: results})
        })
        .catch(error => {
            console.error(error)
        })
})

app.get('/api/search', async (req,res) => {
    try {
        let result = await collection.aggregate([
            {
                "$Search" : {
                    "autocomplete" : {
                        "query" : `${request.query.query}`,
                        "path" : "commonName",
                        "fuzzy" : {
                           "maxEdits" : 2,
                            "prefixLength" : 3
                        }     
                    }
                }
            }   
        ]).toArray()
        response.send(result)
        .then(results => {
            res.render('index.ejs',{ insects: results})
        })
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.get('/api/:insectName', async (req,res) => {
    try {
        let result = await collection.find({"commonName": ObjectId(request.params.insectName)})
        response.send(result)
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})


// MongoClient.connect(connectionString,{ useUnifiedTopology: true })
//     .then(client => {
//         console.log('connected to database')

//         const db = client.db('insectDb')
//         const insectDataCollection = db.collection('insectData')
        
//         app.set('view engine','ejs')

//         app.use(bodyParser.urlencoded({ extended: true}))

//         app.get('/',(req,res) => {
//             db.collection('insectData').find().toArray()
//                 .then(results => {
//                     res.render('index.ejs',{ insects: results})
//                 })
//                 .catch(error => {
//                     console.error(error)
//                 })
//         })

//         app.get('/api/search/:insectName',(req,res)=> {
//             insectName = insectName.toLowerCase();
            
//             db.collection('insectData').find( { commonName: insectName } ).toArray()
//                 .then(results => {
//                     //res.render('index.ejs',{ insects: results})
//                     console.log(results)
//                 })
//                 .catch(error => {
//                     console.error(error)
//                 }) 
//         })

//         //submits new insect data to DB
//         app.post('/api/submitInsectData',(req,res)=> {
//             insectDataCollection.insertOne(req.body)
//             .then(result => {
//                 res.redirect('/')
//             })
//             .catch(error => console.error(error))
//         })

//         app.listen(process.env.PORT || PORT, (req,res)=> {
//             console.log(`server is running on port ${PORT}`)
//         })

//     })
//     .catch(error => {
//         console.error(error)
//     })