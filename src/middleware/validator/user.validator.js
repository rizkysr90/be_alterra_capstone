const { body, param, query } = require('express-validator');

const create = () => {
    return [
        body('email','Email wajib diisi').notEmpty(),
        body('password','Password wajib diisi').notEmpty(),
        body('name','Nama wajib diisi').notEmpty(),
        body('email','Email tidak valid').isEmail()
    ]
}
const login = () => {
    return [
        body('email','email wajib diisi').notEmpty(),
        body('password','password wajib diisi').notEmpty(),
        body('email','email tidak valid').isEmail()
    ]
}

module.exports = {
    create,
    login
}