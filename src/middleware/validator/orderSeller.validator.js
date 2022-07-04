const { body, param, query } = require('express-validator');

const update = () => {
  return [
    body('status','status tidak boleh kosong').notEmpty(),
    body('status','status harus integer').isInt()
  ];
};


module.exports = {
    update
}