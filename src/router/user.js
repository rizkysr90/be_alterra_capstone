const express = require('express')
const router = express.Router()
const controllerUser = require('../controller/controller.user')
const validate = require('./../middleware/expressValidator');
const userValidator = require('./../middleware/validator/user.validator');

router.get('/', controllerUser.dataUserAll);

module.exports = router