const express = require('express')
const router = express.Router()
// const controllerUser = require('../controller/controller.user')

router.get('/', (req,res) => {
    console.log('Hello Word')
    res.status(200).json({
        messenge : "Hello Word"
    })
})


module.exports = router