const { body, param, query } = require('express-validator');
module.exports = {
    create() {
        return [
            body(['buyer_id','seller_id','price','product_id']).toInt()
        ]
    }
}