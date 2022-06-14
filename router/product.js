const express = require('express')
const router = express.Router()
const controllerProduct = require('../controller/controller.product')

router.get('/', controllerProduct.dataProductAll)


module.exports = router