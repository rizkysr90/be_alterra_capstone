const express = require('express');
const router = express.Router();
const routerUser = require('./user');
const routerRegister = require('./register');
const routerLogin = require('./login');
const routerProfile = require('./profile');
const routermyProduct = require('./myproducts')
const routerCity = require('./city');
const routerProduct = require('./product')
const routerCategories = require('./categories');

router.use(`${process.env.URL_ROUTER_REGISTER}`,routerRegister)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_LOGIN}`,routerLogin)
router.use(`${process.env.URL_ROUTER_PROFILE}`,routerProfile)
router.use(`${process.env.URL_ROUTER_USER}`, routerUser)
router.use(`${process.env.URL_ROUTER_MYPRODUCT}`, routermyProduct)
router.use(`${process.env.URL_ROUTER_CITY}`,routerCity)
router.use(`${process.env.URL_ROUTER_PRODUCT}`, routerProduct)
router.use(`${process.env.URL_ROUTER_CATEGORIES}`, routerCategories);


router.all('*',(req,res) => {
    res.status(404).json({message :"Sorry, page not found"});
});

module.exports = router;
