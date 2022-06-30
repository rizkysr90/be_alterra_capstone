const express = require('express')
const router = express.Router()
const controllerProduc = require('../controller/controller.product')

router.get('/', controllerProduc.getProductAll)
router.get('/:id', controllerProduc.getProducById)


module.exports = router