const express = require('express')
const router = express.Router()
const controllerProduct = require('../controller/controller.myproducts')
const upload = require('../middleware/multerMyproducts')
const myproductsValidator = require('../middleware/validator/myProducts.validator')
const validate = require('../middleware/expressValidator')
const sanitationMyProducs = require('../middleware/validator/myProduct.sanitation')

router.get('/', controllerProduct.dataProductAll)
router.get('/:id', controllerProduct.dataProductById)
router.post('/', upload.array('gambar'), sanitationMyProducs.sanitationDataMyProduct, myproductsValidator.create(), validate, controllerProduct.createDataProduct)
router.put('/:id', upload.array('gambar'), sanitationMyProducs.sanitationDataMyProduct, myproductsValidator.create(), validate, controllerProduct.updateDataProduct)
router.delete('/:id', controllerProduct.deleteDataProductById)

module.exports = router


