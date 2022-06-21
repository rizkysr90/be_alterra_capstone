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
const update = () => {
    return [
        body('name','nama wajib diisi').notEmpty(),
        body('city_id','kota wajib diisi').notEmpty(),
        body('phone_number','no hp wajib diisi').notEmpty(),
        body('address','alamat wajib diisi').notEmpty()

    ]
}

module.exports = {
    create,
    login,
    update
}