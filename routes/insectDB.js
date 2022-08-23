const express = require('express')
const router = express.Router()
const insectDBController = require('../controllers/insectDB') 
//const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', insectDBController.getInsects) //removed "ensureAuth," until it gets activated

router.post('/createInsect', upload.single('insectImg'), insectDBController.createInsect)

router.put('/editInsect', insectDBController.editInsect)

router.delete('/deleteInsect', insectDBController.deleteInsect)

module.exports = router