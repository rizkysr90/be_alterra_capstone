const express = require('express')
const router = express.Router()

const routerUser = require('./user')
const routerProduct = require('./product')
const routerCategories = require('./categories')

router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)
router.use(`${process.env.URL_ROUTER_CATEGORIES}`, routerCategories)


module.exports = router