const InsectDB = require('../models/InsectDB')
const InsectImgs = require('../models/InsectImgs')

module.exports = {
    getInsectImg: async (req,res)=>{
        //console.log(req.user) no user data yet, so commented out for now
        try{
            console.log(req.params)
            const key = req.params.key
            const readStream = getImg(key)

            readStream.pipe(res)
        }catch(err){
            console.log(err)
        }
    },
    createInsectImg: async (req, res)=>{
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
    deleteInsectImg: async (req, res)=>{
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