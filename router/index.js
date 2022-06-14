const express = require('express')
const router = express.Router()

const routerUser = require('./user')
const routerProduct = require('./product')

router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)

module.exports = router