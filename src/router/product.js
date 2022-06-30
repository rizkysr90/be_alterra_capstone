const express = require('express')
const router = express.Router()
const controllerProduc = require('../controller/controller.product')
const authJWT = require('./../middleware/passport-jwt');

// router.get('/category', controllerProduc.getProducByCategory)
router.get('/search', controllerProduc.getProducBySerach)
router.get('/', controllerProduc.getProductAll)
router.get('/:id', controllerProduc.getProducById)


module.exports = router