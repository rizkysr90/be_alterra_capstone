const express = require('express')
const router = express.Router()
const response = require('../utility/responseModel');
const routerUser = require('./user')
const routerRegister = require('./register');
const routerLogin = require('./login');
const routerProfile = require('./profile');
const routermyProduct = require('./myproducts')
const routerCity = require('./city');
const routerProduct = require('./product')

router.use(`${process.env.URL_ROUTER_REGISTER}`,routerRegister)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_LOGIN}`,routerLogin)
router.use(`${process.env.URL_ROUTER_PROFILE}`,routerProfile)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_MYPRODUCT}`, routermyProduct)
router.use(`${process.env.URL_ROUTER_CITY}`,routerCity)
router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)


router.use('/',(req,res) => {
    res.status(200).json(response.success(200,'Hello World'))
})




module.exports = router