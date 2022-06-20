const express = require('express');
const router = express.Router();
const userController = require('./../controller/controller.user');
const authJWT = require('./../middleware/passport-jwt');
const {MulterImgSingle,MulterError} = require('./../middleware/multer');

router.get('/:user_id',authJWT,userController.getProfileById);
router.put('/:user_id',MulterImgSingle.single('profile_picture'),MulterError,userController.updateProfile);

module.exports = router;