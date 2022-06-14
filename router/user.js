const express = require('express')
const router = express.Router()
const contorllerUser = require('../controller/constoller.user')

router.get('/', contorllerUser.dataUserAll)


module.exports = router