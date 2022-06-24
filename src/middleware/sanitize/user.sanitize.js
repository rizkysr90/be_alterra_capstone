const { body, param, query } = require('express-validator');

const update = () => {
    return [
        body('city_id').toInt()
    ]
}

module.exports = {
    update
}
