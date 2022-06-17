const express = require('express')
const router = express.Router()
const response = require('../utility/responseModel');
const routerUser = require('./user')
const routerRegister = require('./register');
// const routerProduct = require('./product')
// const routerCategories = require('./categories')
// const routerProductImages = require('./product_images')
// const routerTransactions = require('')
router.use(`${process.env.URL_ROUTER_REGISTER}`,routerRegister)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
// router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)
// router.use(`${process.env.URL_ROUTER_CATEGORIES}`, routerCategories)
// router.use(`${process.env.URL_ROUTER_PRODUCTIMAGES}`, routerProductImages)
// router.use(`${process.env.URL_ROUTER_TRANSACTIONS}`, routerProductImages)
router.use('/',(req,res) => {
    res.status(200).json(response.success(200,'Hello World'))
})




module.exports = router