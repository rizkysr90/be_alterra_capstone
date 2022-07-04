const router = require('express').Router();
const orderSellerController = require('./../controller/controller.orderSeller');
const authJWT = require('./../middleware/passport-jwt');

router.route('/')
    .get(
        authJWT,
        orderSellerController.getAllOrder
    )
router.route('/orders/:order_id')
    .get(
        authJWT,
        orderSellerController.getByIdOrder
    )



module.exports = router;