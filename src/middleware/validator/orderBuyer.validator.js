const { body, param, query} = require('express-validator')

module.exports = {
    create() {
        return [
            body(['seller_id','buyer_id','product_id','price']
            ,'seller_id,buyer_id,product_id,price wajib diisi')
            .notEmpty()
        ]
    },
    getAll() {
        return [
            query('page','page harus integer').isInt()
        ]
    }
}