const router = require('express').Router();
const orderSellerController = require('./../controller/controller.orderSeller');

router.route('/')
    .get(
        orderSellerController.getAllOrder
    )



module.exports = router;