const express = require('express')
const router = express.Router()
const controllerProduc = require('../controller/controller.product')
const authJWT = require('./../middleware/passport-jwt');

router.get('/category', authJWT, controllerProduc.getProducByCategory)
router.get('/search', authJWT, controllerProduc.getProducBySerach)
router.get('/', authJWT, controllerProduc.getProductAll)
router.get('/:id', authJWT, controllerProduc.getProducById)


module.exports = router