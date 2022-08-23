const InsectDB = require('../models/InsectDB')
const InsectImgs = require('../models/InsectImgs')

module.exports = {
    getInsects: async (req,res)=>{
        //console.log(req.user) no user data yet, so commented out for now
        try{
            //Do we want to grab all the todos?
            const results = await InsectDB.find()
            //How can we grab our logged in users left to dos?
            res.render('index.ejs', {insects: results})
        }catch(err){
            console.log(err)
        }
    },
    createInsect: async (req, res)=>{
        try{
            await InsecDB.create({ 
                commonName: req.body.commonName,
                sciName: req.body.sciName,
                order: req.body.order,
                lifeSpan: req.body.lifeSpan,
                description: req.body.description,
                imgName: file.filename,
                imgPath: `/insectimages/${result.Key}`
            })
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    editInsect: async (req,res)=>{
        //something something
    },
    deleteInsect: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}