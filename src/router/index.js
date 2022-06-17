const express = require('express')
const router = express.Router()
const response = require('../utility/responseModel');
const routerUser = require('./user')
const routerRegister = require('./register');
const routerLogin = require('./login');
const routerProfile = require('./profile');
// const routerProduct = require('./product')
// const routerCategories = require('./categories')
// const routerProductImages = require('./product_images')
// const routerTransactions = require('')
router.use(`${process.env.URL_ROUTER_REGISTER}`,routerRegister)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_LOGIN}`,routerLogin)
router.use(`${process.env.URL_ROUTER_PROFILE}`,routerProfile)
// router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)
// router.use(`${process.env.URL_ROUTER_CATEGORIES}`, routerCategories)
// router.use(`${process.env.URL_ROUTER_PRODUCTIMAGES}`, routerProductImages)
// router.use(`${process.env.URL_ROUTER_TRANSACTIONS}`, routerProductImages)





module.exports = router