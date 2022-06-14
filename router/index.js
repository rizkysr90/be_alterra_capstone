const express = require('express')
const router = express.Router()

const routerUser = require('./user')

router.use(`${process.env.URL_ROUTER_USER}`, routerUser)

module.exports = router