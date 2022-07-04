const { body, param, query } = require('express-validator');
const getAll = () => {
    return [
        query(['status','done']).toInt()
    ]
}
const update = () => {
    return [
        body('status').toInt()
    ]
}

module.exports = {
    getAll,
    update
}
