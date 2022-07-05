const { body, param, query } = require('express-validator');

const update = () => {
  return [
    body('status','status tidak boleh kosong').notEmpty(),
    body('status','status harus integer dan minimal 0,maksimal 1').isInt({
      min:0,max:1
    })
  ];
};


module.exports = {
    update,
}