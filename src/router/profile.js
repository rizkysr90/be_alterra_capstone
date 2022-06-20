const express = require('express');
const router = express.Router();
const userController = require('./../controller/controller.user');
const authJWT = require('./../middleware/passport-jwt');

router.get('/:user_id',authJWT,userController.getProfileById);
router.put('/:user_id',userController.updateProfile);

module.exports = router;