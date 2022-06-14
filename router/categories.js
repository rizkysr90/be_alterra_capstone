const express = require('express')
const router = express.Router()
const controllerCategories = require('../controller/controller.categories')

router.get('/', controllerCategories.dataCategoriesAll)


module.exports = router