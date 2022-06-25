const express = require('express')
const router = express.Router()
const controllerProduct = require('../controller/controller.product')
const upload = require('../middleware/multer')

router.get('/', controllerProduct.dataProductAll)
router.get('/:id', controllerProduct.dataProductById)
router.post('/', upload.array('gambar'), controllerProduct.createDataProduct)
router.put('/:id', upload.array('gambar'), controllerProduct.updateDataProduct)
router.delete('/:id', controllerProduct.deleteDataProductById)

module.exports = router