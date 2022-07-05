const { body, param, query } = require('express-validator');
const getAll = () => {
    return [
        query(['status','done','page','row']).toInt()
    ]
}
const update = () => {
    return [
        param('order_id').toInt(),
        body('status').toInt()
    ]
}
const getById = () => {
    return [
        param('order)id').toInt()
    ]
}

module.exports = {
    getAll,
    update,
    getById
}
